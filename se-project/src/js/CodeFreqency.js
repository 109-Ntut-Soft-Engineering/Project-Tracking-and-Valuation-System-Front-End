import React from 'react';
import HeaderNavbar from "./tool/Navbar";
import { Container, Breadcrumb } from 'rsuite';
import { Link } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, Legend } from 'recharts'
import MainHeader from './tool/MainHeader'
import { requestProjectCodeFreq } from './api/projectAPI';
import {getCurrentProject} from './tool/CommonTool';

class CodeFrequency extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            proName: this.props.match.params.pro_name,
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
    setCodeFrequency = () => {
        const project = getCurrentProject()
        console.log('pid:', project.id)
        return requestProjectCodeFreq(project.id)
            .then(res => res.data)
            .then(data => {
                this.setState({ data: data.code_freq })
                return data.code_freq
        })
    }
    render() {
        if (this.state.data === undefined)
            this.setCodeFrequency()
        return (
            <Container style={{ height: "100%" }}>
                <MainHeader />

                <Container id="main" style={{ backgroundColor: "white", width: "100%", paddingLeft: "10%", paddingRight: "10%" }}>
                    <Breadcrumb style={{ marginBottom: "20px", marginTop: "20px" }}>
                        <Breadcrumb.Item><Link to="/projects">Projects</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>{this.state.proName}</Breadcrumb.Item>
                    </Breadcrumb>
                    <HeaderNavbar contact={{ repo_name: this.stateproName }} />
                    {this.createCodeFreqChart()}
                </Container>
            </Container>
        )
    }
}

export default CodeFrequency;