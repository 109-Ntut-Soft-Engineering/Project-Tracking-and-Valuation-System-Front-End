import React from 'react';
import Sidenavbar from "./tool/Sidenavbar";
import {Container,Breadcrumb, Button} from 'rsuite'; 
import {Link}  from "react-router-dom";
import {AreaChart, Area, XAxis, YAxis, Legend} from 'recharts'
import MainHeader from './tool/MainHeader'
import {requestProjectCodeFreq} from './api/Api';

class CodeFrequency extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            proName: this.props.match.params.pro_name,
            data: undefined,
        }
    }
    createCodeFreqChart = () => {
        const chart_width = window.innerWidth * 0.7
        const chart_height = window.innerHeight * 0.6
        if (this.state.data === undefined){
            return (<div>loading....</div>)
        }
        else{
            return (
                <div id="chart_region" style={{display:"flex",justifyContent:"center",marginTop:"25px",marginBottom:"100px"}}>
                    <AreaChart width={chart_width} height={chart_height} data={this.state.data}>
                        <defs>
                            <linearGradient id="colorCode" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="code" stroke="#82ca9d" fullOpacity={1} fill="url(#colorCode)"/>
                        <XAxis dataKey='date'/>
                        <YAxis/> 
                        <Legend/>
                    </AreaChart>
                </div> 
            )
        }
    }
    setCodeFrequency = (name) =>{
        requestProjectCodeFreq({name: name})
        .then(res => res.data)
        .then(data  => {
            console.log('data', data)
            this.setState({data: data.code_freq})
            return data.code_freq
        })
    }
    render(){
        if (this.state.data === undefined)
            this.setCodeFrequency(this.state.proName)
        return (
            <Container style={{height:"100%"}}>
                <MainHeader/>

				<Container id="main" style={{backgroundColor:"white",width:"100%",paddingLeft:"10%", paddingRight:"10%"}}>
                    <Breadcrumb style={{marginBottom:"20px", marginTop:"20px"}}>
                        <Breadcrumb.Item><Link to="/home">Projects</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>{this.state.proName}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Sidenavbar contact={{repo_name: this.stateproName}}/>
                    {this.createCodeFreqChart()}
				</Container>
            </Container>
        )
    }
}

export default CodeFrequency;   