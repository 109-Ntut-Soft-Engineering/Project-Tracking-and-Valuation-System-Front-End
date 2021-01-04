import React, {Component} from 'react';
import { getCurrentCompareProjects } from '../tool/CommonTool';
import { requestCompareTotalCommit } from '../api/projectAPI'
import { Container, Breadcrumb, Content, FlexboxGrid, Icon, SelectPicker} from 'rsuite';
import { Link } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, Legend, CartesianGrid, Tooltip} from 'recharts'
import HeaderNavbarCompare from "../tool/NavbarCompare";
import MainHeader from '../tool/MainHeader'

var startDate = undefined;
var endDate = undefined;
var disableStartDateArray = undefined;
var disableEndDateArray = undefined;

class CommitCompare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currCmpProjs: getCurrentCompareProjects(), 
            oriData: undefined, 
            curData: undefined,
            oriTimes: undefined
        }
    }

    //初始設定
    setData = (pid1, pid2) => {
        return requestCompareTotalCommit(pid1, pid2)
            .then(res => res.data)
            .then(data => {
                
                var timesArray = [];
                for (var i = 0; i < data[0]['commit_times'].length; i++)
                    timesArray.push({ label: data[0]['commit_times'][i].time, value: data[0]['commit_times'][i].time});

                this.setState({
                    oriData: data[0], 
                    curData: data[0],
                    oriTimes: timesArray
                })
                console.log(data[0]);
                console.log(data[0]['commit_times']);
                return data
            })
    }

    //取得compareCommit曲線圖
    createCompareTotalCommit = () => {
        const width = window.innerWidth * 0.6;
        const height = window.innerHeight * 0.5;

        if (this.state.curData == undefined) {
            return (
                <div style={{display:"flex",justifyContent:"center",marginTop:"100px"}}>
                    <Icon icon="spinner" spin size="lg"/>
                    <p style={{marginLeft:"10px"}}>loading.... </p>
                </div>
            )
        }
        else {
            const data = this.state.curData['commit_times'];
            
            return (
                <FlexboxGrid.Item colspan={24} style={{marginBottom:"30px"}}>
                    <AreaChart width={width} height={height} data={data}>
                        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" fill="#ECF5FF" />
                        <Tooltip />
                        <defs>
                            <linearGradient id="line1ColorCode" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <defs>
                            <linearGradient id="line2ColorCode" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey={this.state.currCmpProjs.id1} stroke="#82ca9d" 
                                fullOpacity={1} fill="url(#line1ColorCode)" name={this.state.currCmpProjs.name1}/>
                        <Area type="monotone" dataKey={this.state.currCmpProjs.id2} stroke="#8884d8" 
                                fullOpacity={1} fill="url(#line2ColorCode)" name={this.state.currCmpProjs.name2}/>
                        <XAxis dataKey='time' />
                        <YAxis />
                        <Legend />
                    </AreaChart>
                </FlexboxGrid.Item>
            )
        }
    }

    //取得時間選取器
    createTimePicker = () => {
        var startDate = Object.assign([], this.state.oriTimes);
        var endDate = Object.assign([], this.state.oriTimes);
        endDate.reverse().pop();
        startDate.pop();
        return (
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "center", marginBottom: "30px" }}>
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

    //變更compareCommit曲線圖時間
    changeChartDate(newStartDate, newEndDate) {
        if (newStartDate != null) startDate = newStartDate;
        if (newEndDate != null) endDate = newEndDate;

        if (startDate != undefined && endDate != undefined) {
            var newCommitTimes = Object.assign([], this.state.oriData['commit_times']);
            disableStartDateArray = [];
            disableEndDateArray = [];

            while (newCommitTimes[0].time != startDate) {
                newCommitTimes.reverse();
                disableEndDateArray.push(newCommitTimes.pop().time);
                newCommitTimes.reverse();
            }
            disableEndDateArray.push(newCommitTimes[0].time);

            var finalIndex = newCommitTimes.length - 1;
            while (newCommitTimes[finalIndex].time != endDate) {
                disableStartDateArray.push(newCommitTimes.pop().time);
                finalIndex = finalIndex - 1;
            }
            disableStartDateArray.push(newCommitTimes[finalIndex].time);

            var newData = Object.assign({}, this.state.oriData);
            newData['commit_times'] = newCommitTimes;
            this.setState({ curData: newData });
        }
    }

    //渲染畫面
    render() {
        const { currCmpProjs } = this.state;
        var projsNameText = currCmpProjs.name1 + ' － ' + currCmpProjs.name2;

        if (this.state.oriData == undefined)
            this.setData(currCmpProjs.id1, currCmpProjs.id2);

        return (
            <Container style={{ width: "100%", minHeight: "100%", height:"auto", backgroundColor: "white" }}>
                <MainHeader />
                <Content style={{ paddingLeft: "20%", paddingRight: "20%" }}>
                    <div style={{ margin: 20 }}>
                        <Breadcrumb style={{ display: 'inline' }} separator={React.createElement('h4', {}, '/')}>
                            <Breadcrumb.Item><Link to="/projects"><h4>Projects Compare</h4></Link></Breadcrumb.Item>
                            <Breadcrumb.Item active><h4>{projsNameText}</h4></Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <HeaderNavbarCompare />
                    {this.createTimePicker()}
                    {this.createCompareTotalCommit()}
                </Content>
            </Container>
        )
    }
}

export default CommitCompare;