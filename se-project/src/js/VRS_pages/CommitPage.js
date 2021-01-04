import React, { Component } from 'react';
import { Container, CheckboxGroup, Checkbox, Breadcrumb, Content, FlexboxGrid, Icon, SelectPicker } from 'rsuite';
import { Link, Redirect } from "react-router-dom";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import { AreaChart, XAxis, YAxis, CartesianGrid, Area, Tooltip, Legend } from 'recharts';
import HeaderNavbar from '../tool/Navbar'
import MainHeader from '../tool/MainHeader'
import { getCurrentProject, isLoggedIn } from '../tool/CommonTool'
import { requestTotalCommit } from '../api/projectAPI'
import '../../css/commitPage.css'

//filter用變數
var startDate = undefined;
var endDate = undefined;
var disableStartDateArray = undefined;
var disableEndDateArray = undefined;
var timeFilterCommitList = undefined;
var memberFilterCommitList = undefined;

class CommitPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProject: getCurrentProject(),
            oriData: undefined,
            curData: undefined,
            members: undefined,
            oriTimes: undefined,
            height: 300,
            width: 200
        };
        this.clickMemberBox = this.clickMemberBox.bind(this);
        this.createTotalCommit = this.createTotalCommit.bind(this);
    }
    componentDidMount() {
        if (isLoggedIn() && this.state.currentProject !== null) {
            const height = document.getElementById('chart').clientHeight * 0.4;
            const width = document.getElementById('chart').clientWidth * 0.6;
            this.setState({ height: height, width: width })
        }
    }

    //取得totalCommit初始資料
    setTotalCommit = (id) => {
        return requestTotalCommit(id)
            .then(res => res.data)
            .then(data => {
                var datas = data.commits;
                var timesArray = [];
                var selectTimesArray = [];
                //取出全部時間
                for (var i = 0; i < datas['commit_list'].length; i++)
                    timesArray.push(datas['commit_list'][i].time);

                //取出不重複的時間並放入selectTimesArray
                timesArray.filter(function (element, index, self) {
                    if (self.indexOf(element) === index) selectTimesArray.push({ label: element, value: element });
                });

                this.setState({
                    oriData: datas,
                    curData: datas,
                    members: datas['member'],
                    oriTimes: selectTimesArray
                })
                return datas
            })
    }

    //變更選取成員
    clickMemberBox(value) {
        var newData = Object.assign({}, this.state.oriData);
        var filteredMsgs = this.state.oriData['commit_list'];
        filteredMsgs = filteredMsgs.filter(commit => value.includes(commit['author']));
        newData['commit_list'] = filteredMsgs;
        memberFilterCommitList = filteredMsgs;

        //與TimeFilter的結果整合
        if (timeFilterCommitList != undefined) {
            var resultNewCommitList = memberFilterCommitList.filter((e) => { return timeFilterCommitList.indexOf(e) > -1 })
            console.log(resultNewCommitList);
            newData['commit_list'] = resultNewCommitList;
            this.setState({ curData: newData })
        } else {
            this.setState({ curData: newData })
        }
    }

    makeCommitTimes(data) {
        if (data.length == 0)
            return [];
        var cmtTimes = {
            'times': 1,
            'time': data[0]['time']
        };
        var cmtTimesList = [cmtTimes];
        for (var i = 1; i < data.length; i++) {
            var lstIdx = cmtTimesList.length - 1;
            if (cmtTimesList[lstIdx]['time'] == data[i]['time']) {
                cmtTimesList[lstIdx]['times'] += 1;
            }
            else {
                var cmtTimes = {
                    'times': 1,
                    'time': data[i]['time']
                };
                var startDate = new Date(
                    cmtTimesList[lstIdx]['time'].split('/')[0],
                    cmtTimesList[lstIdx]['time'].split('/')[1],
                    cmtTimesList[lstIdx]['time'].split('/')[2]
                );
                var endDate = new Date(
                    cmtTimes['time'].split('/')[0],
                    cmtTimes['time'].split('/')[1],
                    cmtTimes['time'].split('/')[2]
                );
                var intervalDates = this.getIntervalCmtTimes(startDate, endDate);
                cmtTimesList.push.apply(cmtTimesList, intervalDates);
                cmtTimesList.push(cmtTimes);
            }
        }

        return cmtTimesList;
    }

    getIntervalCmtTimes(startDate, endDate) {
        var dayMilliSeconds = 1000 * 60 * 60 * 24;
        var startDateMs = startDate.getTime();
        var endDateMs = endDate.getTime();
        var intervalDates = [];
        for (var curDateMs = startDateMs + dayMilliSeconds;
            curDateMs < endDateMs; curDateMs += dayMilliSeconds) {
            var date = new Date(curDateMs);
            var dateString = date.getFullYear().toString() + '/';
            if (date.getMonth() < 10)
                dateString += '0';
            dateString += date.getMonth().toString() + '/' +
                date.getDate().toString();
            intervalDates.push({
                'times': 0,
                'time': dateString
            });
        }
        return intervalDates;
    }

    //取得時間選取器
    createTimePicker = () => {
        var startDate = Object.assign([], this.state.oriTimes);
        var endDate = Object.assign([], this.state.oriTimes);
        endDate.reverse().pop();
        startDate.pop();
        return (
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "center", marginBottom: "25px", marginTop: "25px" }}>
                <h5>開始時間</h5>
                <SelectPicker data={startDate}
                    onChange={(value) => this.changeChartDate(value, null)}
                    searchable={false}
                    cleanable={false}
                    disabledItemValues={disableStartDateArray}
                    style={{ width: 224, marginLeft: "10px", marginRight: "50px" }} />

                <h5>結束時間</h5>
                <SelectPicker data={endDate}
                    onChange={(value) => this.changeChartDate(null, value)}
                    searchable={false}
                    cleanable={false}
                    disabledItemValues={disableEndDateArray}
                    style={{ width: 224, marginLeft: "10px", marginRight: "10px" }} />
            </div>
        )
    }

    //變更時間區間
    changeChartDate(newStartDate, newEndDate) {
        if (newStartDate != null) startDate = newStartDate;
        if (newEndDate != null) endDate = newEndDate;

        if (startDate != undefined && endDate != undefined) {
            var newCommitList = Object.assign([], this.state.oriData['commit_list']);
            disableStartDateArray = [];
            disableEndDateArray = [];

            while (newCommitList[0].time != startDate) {
                newCommitList.reverse();
                disableEndDateArray.push(newCommitList.pop().time);
                newCommitList.reverse();
            }
            disableEndDateArray.push(newCommitList[0].time);

            var finalIndex = newCommitList.length - 1;
            while (newCommitList[finalIndex].time != endDate) {
                disableStartDateArray.push(newCommitList.pop().time);
                finalIndex = finalIndex - 1;
            }
            disableStartDateArray.push(newCommitList[finalIndex].time);

            var newData = Object.assign({}, this.state.oriData);
            newData['commit_list'] = newCommitList;
            timeFilterCommitList = newCommitList;

            //與memberFilter的結果整合
            if (memberFilterCommitList != undefined) {
                var resultNewCommitList = timeFilterCommitList.filter((e) => { return memberFilterCommitList.indexOf(e) > -1 })
                console.log(resultNewCommitList);
                newData['commit_list'] = resultNewCommitList;
                this.setState({ curData: newData })
            } else {
                this.setState({ curData: newData });
            }
        }
    }

    //創造整個commit頁面
    createTotalCommit = () => {
        const { width, height } = this.state
        if (this.state.curData === undefined) {
            return (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
                    <Icon icon="spinner" spin size="lg" />
                    <p style={{ marginLeft: "10px" }}>loading.... </p>
                </div>
            )
        }

        const members = this.state.curData['member'];
        const curData = this.state.curData['commit_list'];
        const cmtTimes = this.makeCommitTimes(curData);
        const tableWidth = window.innerWidth * 0.48;
        return (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "flex", flexDirection: "row", width: "100%", marginTop: "10px" }}>
                    <div style={{ width: "20%" }}>
                        <h6>Author</h6>
                        <CheckboxGroup onChange={(value) => this.clickMemberBox(value)}>
                            {members.map(member =>
                                <Checkbox defaultChecked value={member}> {member}</Checkbox>
                            )}
                        </CheckboxGroup>
                    </div>

                    <div style={{ width: "80%" }}>
                        <h6>Issue</h6>
                        <Table data={curData} width={tableWidth}>
                            <Column width={tableWidth * 0.2} align="center">
                                <HeaderCell>Name</HeaderCell>
                                <Cell dataKey="author" />
                            </Column>
                            <Column width={tableWidth * 0.5} >
                                <HeaderCell>Message</HeaderCell>
                                <Cell dataKey="message" />
                            </Column>
                            <Column width={tableWidth * 0.1} align="center">
                                <HeaderCell>Lines</HeaderCell>
                                <Cell dataKey="lines" />
                            </Column>
                            <Column width={tableWidth * 0.2} align="center">
                                <HeaderCell>Time</HeaderCell>
                                <Cell dataKey="time" />
                            </Column>
                        </Table>
                    </div>
                </div>

                {this.createTimePicker()}

                <AreaChart width={width} height={height} data={cmtTimes} style={{ marginBottom: "30px" }}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" fill="#ECF5FF" />
                    <Tooltip />
                    <XAxis dataKey="time" stroke="#000000" />
                    <YAxis dataKey="times" stroke="#000000" />
                    <Area type="monotone" dataKey="times" stroke="#82ca9d" fill="#82ca9d" />
                    <Legend />
                </AreaChart>
            </div>
        )
    }

    //渲染畫面
    render() {
        if (!isLoggedIn()) {
            return <Redirect to="/" />;
        } else if (this.state.currentProject === null) {
            return <Redirect to="/projects" />;
        }

        const { currentProject } = this.state;
        if (this.state.oriData === undefined)
            this.setTotalCommit(currentProject.id)

        return (
            <Container style={{ width: "100%", height: "auto", minHeight: "100%", backgroundColor: "white" }}>
                <MainHeader />
                <Content style={{ paddingLeft: "20%", paddingRight: "20%" }} id='chart'>
                    <div style={{ margin: 20 }}>
                        <Breadcrumb style={{ display: 'inline' }} separator={React.createElement('h4', {}, '/')}>
                            <Breadcrumb.Item><Link to="/projects"><h4>Projects</h4></Link></Breadcrumb.Item>
                            <Breadcrumb.Item active><h4>{currentProject.name}</h4></Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <HeaderNavbar />

                    {this.createTotalCommit()}
                </Content>
            </Container>
        )
    }
}

export default CommitPage;