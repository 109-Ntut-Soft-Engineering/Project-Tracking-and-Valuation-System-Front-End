import React from 'react';
import HeaderNavbar from "../tool/Navbar";
import { Container, Breadcrumb, Content } from 'rsuite';
import { Link, Redirect } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, Legend } from 'recharts'
import MainHeader from '../tool/MainHeader'
import { requestProjectCodeFreq } from '../api/projectAPI';
import { getCurrentProject, isLoggedIn } from '../tool/CommonTool';

class CodeFrequency extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProject: getCurrentProject(),
            data: undefined,
        }
    }
    createCodeFreqChart = () => {
        const chartWidth = window.innerWidth * 0.6
        const chartHeight = window.innerHeight * 0.5
        if (this.state.data === undefined) {
            return (<div>loading....</div>)
        }
        else {
            return (
                <div id="chart_region" style={{ display: "flex", justifyContent: "center", marginTop: "25px", marginBottom: "100px" }}>
                    <AreaChart width={chartWidth} height={chartHeight} data={this.state.data}>
                        <defs>
                            <linearGradient id="colorCode" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="code" stroke="#82ca9d" fullOpacity={1} fill="url(#colorCode)" />
                        <XAxis dataKey='date' />
                        <YAxis />
                        <Legend />
                    </AreaChart>
                </div>
            )
        }
    }
    setData = (id) => {

        return requestProjectCodeFreq(id)
            .then(res => res.data)
            .then(data => {
                this.setState({ data: data.code_freq })
                return data.code_freq
            })
    }
    render() {
        if (!isLoggedIn()) {
            return <Redirect to="/" />;
        } else if (this.state.currentProject === null) {
            return <Redirect to="/projects" />;
        }
        const { currentProject } = this.state
        if (this.state.data === undefined)
            this.setData(currentProject.id)
        return (
            <Container style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
                <MainHeader />
                <Content style={{ paddingLeft: "20%", paddingRight: "20%" }}>
                    <div style={{ margin: 20 }}>
                        <Breadcrumb style={{ display: 'inline' }} separator={React.createElement('h4', {}, '/')}>
                            <Breadcrumb.Item><Link to="/projects"><h4>Projects</h4></Link></Breadcrumb.Item>
                            <Breadcrumb.Item active><h4>{currentProject.name}</h4></Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <HeaderNavbar />
                    {this.createCodeFreqChart()}
                </Content>
            </Container>

        )
    }
}

export default CodeFrequency;