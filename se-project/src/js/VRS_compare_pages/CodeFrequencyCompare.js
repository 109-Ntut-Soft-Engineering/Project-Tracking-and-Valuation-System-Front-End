import React, {Component} from 'react'
import HeaderNavbarCompare from "../tool/NavbarCompare";
import { Container, Breadcrumb, Content } from 'rsuite';
import { Link } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, Legend, CartesianGrid, Tooltip} from 'recharts'
import MainHeader from '../tool/MainHeader'
import { requestProjectCompareCodeFreq } from '../api/projectAPI';
import { getCurrentCompareProjects } from '../tool/CommonTool';


class CodeFrequencyCompare extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentCompareProjects: getCurrentCompareProjects(),
            data: undefined,
        }
    }
    createCodeFreqChart = () => {
        const chartWidth = window.innerWidth * 0.7
        const chartHeight = window.innerHeight * 0.6
        if (this.state.data === undefined) {
            return (<div>loading....</div>)
        }
        else {
            
            return (
                <div id="chart_region" style={{ display: "flex", justifyContent: "center", marginTop: "25px", marginBottom: "100px" }}>
                    <AreaChart width={chartWidth} height={chartHeight} data={this.state.data}>
                         <CartesianGrid strokeDasharray="3 3" />
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
                        <Area type="monotone" dataKey={this.state.currentCompareProjects.id1} stroke="#82ca9d" 
                                fullOpacity={1} fill="url(#line1ColorCode)" name={this.state.currentCompareProjects.name1}/>
                        <Area type="monotone" dataKey={this.state.currentCompareProjects.id2} stroke="#8884d8" 
                                fullOpacity={1} fill="url(#line2ColorCode)" name={this.state.currentCompareProjects.name2}/>
                        <XAxis dataKey='date' />
                        <YAxis />
                        <Legend />
                    </AreaChart>
                </div>
            )
        }
    }
    setData = (pid1, pid2) => {
        console.log('request!!!')
        return requestProjectCompareCodeFreq(pid1, pid2)
            .then(res => res.data)
            .then(data => {
                console.log("Data", data)
                this.setState({ data: data.code_freq })
                return data.code_freq
            })
    }
    

    render() {
        const { currentCompareProjects } = this.state
        var projectsNameText = currentCompareProjects.name1 + ' － ' + currentCompareProjects.name2;
        // 這裡只有先拿其中一個專案的id，還可以拿id2
        if (this.state.data === undefined)
            this.setData(currentCompareProjects.id1, currentCompareProjects.id2)
        return (
            <Container style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
                <MainHeader />
                <Content style={{ paddingLeft: "20%", paddingRight: "20%" }}>
                    <div style={{ margin: 20 }}>
                        <Breadcrumb style={{ display: 'inline' }} separator={React.createElement('h4', {}, '/')}>
                            <Breadcrumb.Item><Link to="/projects"><h4>Projects Compare</h4></Link></Breadcrumb.Item>
                            <Breadcrumb.Item active><h4>{projectsNameText}</h4></Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <HeaderNavbarCompare />
                    {this.createCodeFreqChart()}
                </Content>
            </Container>

        )
    }
}
export default CodeFrequencyCompare;