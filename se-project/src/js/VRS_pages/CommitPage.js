import React, { Component } from 'react';
import { Container, CheckboxGroup, Checkbox, Breadcrumb, Content, FlexboxGrid, Panel } from 'rsuite';
import { Link, Redirect } from "react-router-dom";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import { AreaChart, XAxis, YAxis, CartesianGrid, Area, Line } from 'recharts';
import HeaderNavbar from '../tool/Navbar'
import MainHeader from '../tool/MainHeader'
import { getCurrentProject, isLoggedIn } from '../tool/CommonTool'
import { requestTotalCommit } from '../api/projectAPI'
import '../../css/commitPage.css'

class CommitPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProject: getCurrentProject(),
            oriData: undefined,
            curData: undefined,
            members: undefined,
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
    setTotalCommit = (id) => {
        return requestTotalCommit(id)
            .then(res => res.data)
            .then(data => {
                this.setState({
                    oriData: data.commits,
                    curData: data.commits,
                    members: data.commits['member']
                })
                return data.commits
            })
    }

    clickMemberBox(value) {
        var newData = Object.assign({}, this.state.oriData);
        var filteredMsgs = this.state.oriData['commit_list'];
        filteredMsgs = filteredMsgs.filter(commit => value.includes(commit['author']));
        newData['commit_list'] = filteredMsgs;
        console.log(newData)
        this.setState({
            curData: newData
        })
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
        console.log(data);
        console.log(cmtTimesList);
        return cmtTimesList;
    }

    getIntervalCmtTimes(startDate, endDate) {
        var dayMilliSeconds = 1000*60*60*24;
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

    createTotalCommit = () => {
        const { width, height } = this.state;
        if (this.state.curData === undefined) {
            return (<div>loading...</div>)
        }

        const members = this.state.curData['member'];
        const curData = this.state.curData['commit_list'];
        const cmtTimes = this.makeCommitTimes(curData);
        console.log(cmtTimes);

        return (
            <FlexboxGrid justify="space-between" align="top" style={{ marginTop: '-20px' }}>
                <FlexboxGrid.Item colspan={3}>
                    <h6>Author</h6>
                    <CheckboxGroup onChange={(value) => this.clickMemberBox(value)}>
                        {members.map(member =>
                            <Checkbox defaultChecked value={member}> {member}</Checkbox>
                        )}
                    </CheckboxGroup>

                </FlexboxGrid.Item>

                <FlexboxGrid.Item colspan={20}>

                    <h6>Issue</h6>
                    <Table data={curData}>
                        <Column >
                            <HeaderCell>Name</HeaderCell>
                            <Cell dataKey="author" />
                        </Column>
                        <Column >
                            <HeaderCell>Message</HeaderCell>
                            <Cell dataKey="message" />
                        </Column>
                        <Column >
                            <HeaderCell>Lines</HeaderCell>
                            <Cell dataKey="lines" />
                        </Column>
                        <Column >
                            <HeaderCell>Time</HeaderCell>
                            <Cell dataKey="time" />
                        </Column>
                    </Table>

                </FlexboxGrid.Item >

                <FlexboxGrid.Item colspan={24}>
                    <AreaChart width={width} height={height} data={cmtTimes}>
                        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" fill="#ECF5FF" />
                        <XAxis dataKey="time" stroke="#000000" />
                        <YAxis dataKey="times" stroke="#000000" />
                        <Area type="monotone" dataKey="times" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                </FlexboxGrid.Item>

            </FlexboxGrid >
        )
    }

    render() {
        if (!isLoggedIn()) {
            return <Redirect to="/" />;
        } else if (this.state.currentProject === null) {
            return <Redirect to="/projects" />;
        }
        const { currentProject } = this.state;
        if (this.state.data === undefined)
            this.setTotalCommit(currentProject.id)

        return (
            <Container style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
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