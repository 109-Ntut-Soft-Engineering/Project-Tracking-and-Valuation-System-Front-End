import React, { Component } from 'react';
import { Container, Button ,Breadcrumb} from 'rsuite';
import {Link}  from "react-router-dom";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import { AreaChart, XAxis, YAxis, CartesianGrid, Area } from 'recharts';
import Sidenavbar from './tool/Sidenavbar'
import MainHeader from './tool/MainHeader'

import '../css/commitPage.css'

import fakeCommitMessage from '../test_data/fakeCommitMessage.json'


const members = fakeCommitMessage.member;
const datas = fakeCommitMessage.data;

class CommitPage extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        var proName = this.props.match.params.pro_name;
        const chart_width = window.innerWidth * 0.7
		const chart_height = window.innerHeight * 0.6
        return (
            <Container style={{height:"100%"}}>
                <MainHeader/>

                <Container style={{backgroundColor:"white",width:"100%",paddingLeft:"10%", paddingRight:"10%"}}>
                    <Breadcrumb style={{marginBottom:"20px", marginTop:"20px"}}>
                        <Breadcrumb.Item><Link to="/home">Projects</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>{proName}</Breadcrumb.Item>
                    </Breadcrumb>

                    <Sidenavbar contact={{repo_name:proName}}/>

                    <div style={{display:"flex", flexDirection:"row",justifyContent:"center", marginLeft:"25px", marginTop:"25px", marginBottom:"25px"}}>
                        {members.map(member => 
                            <Button className="member-button">{member}</Button>
                        )}
                    </div>
                    
                    <div style={{display:"flex",justifyContent:"center",marginTop:"25px",marginBottom:"25px"}}>
                        <AreaChart width={chart_width} height={chart_height} data={datas}>
                            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" fill="#ECF5FF" />
                            <XAxis dataKey="time" stroke="#000000" />
                            <YAxis width={40} dataKey="lines" stroke="#000000" />
                            <Area type="monotone" dataKey="lines" stroke="#82ca9d" fill="#82ca9d" />
                        </AreaChart>
                    </div>
                    
                    <div style={{display:"flex",justifyContent:"center",marginBottom:"50px"}}>
                        <Table width={chart_width} height={375} data={datas}>
                            <Column width={chart_width*0.2}>
                                <HeaderCell>Name</HeaderCell>
                                <Cell dataKey="name" />
                            </Column>
                            <Column width={chart_width*0.55}>
                                <HeaderCell>Message</HeaderCell>
                                <Cell dataKey="message" />
                            </Column>
                            <Column width={chart_width*0.1}>
                                <HeaderCell>Lines</HeaderCell>
                                <Cell dataKey="lines" />
                            </Column>
                            <Column width={chart_width*0.15}>
                                <HeaderCell>Time</HeaderCell>
                                <Cell dataKey="time" />
                            </Column>
                        </Table>
                    </div>
                </Container>
            </Container>
        )
    }
}

export default CommitPage;