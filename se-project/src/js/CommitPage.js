import React, { Component } from 'react';
import { Container, Button, Breadcrumb, Content } from 'rsuite';
import { Link } from "react-router-dom";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import { AreaChart, XAxis, YAxis, CartesianGrid, Area } from 'recharts';
import HeaderNavbar from './tool/Navbar'
import MainHeader from './tool/MainHeader'
import { getCurrentProject } from './tool/CommonTool'
import { requestTotalCommit } from './api/projectAPI'

import '../css/commitPage.css'

class CommitPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProject: getCurrentProject(),
            originData: undefined, 
            data: undefined, 
            members: undefined, 
        };
        this.clickMemberBox = this.clickMemberBox.bind(this);
    }

    setTotalCommit = (id) => {
        return requestTotalCommit(id)
            .then(res => res.data)
            .then(data => {
                this.setState({ 
                    originData: data.commits, 
                    data: data.commits,
                    members: data.commits['member']
                })
                return data.commits
            })
    }

    clickMemberBox(e) {
        var memberChks = document.getElementsByName("memberCheckbox");
        var selMembers = [];
        for (var i = 0; i < memberChks.length; i++) {
            if (memberChks[i].checked)
                selMembers.push(this.state.members[i]);
        }
        
        var newData = Object.assign({}, this.state.originData);
        var filteredMsgs = this.state.originData['commit_list'];
        filteredMsgs = filteredMsgs.filter(commit => selMembers.includes(commit['author']));
        newData['commit_list'] = filteredMsgs;

        this.setState({
            data: newData
        })
    }

    createTotalCommit = () => {
        const chart_width = window.innerWidth * 0.7
        const chart_height = window.innerHeight * 0.6

        if (this.state.data == undefined) {
            return (<div>loading...</div>)
        }

        const members = this.state.data['member']
        const datas = this.state.data['commit_list']

        return (
            <Container style={{ backgroundColor: "white", width: "100%"}}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginLeft: "25px", marginTop: "25px", marginBottom: "25px" }}>
                    {members.map(member =>
                        <label className="member">
                            <input name="memberCheckbox" type="checkbox" defaultChecked="true" onClick={ this.clickMemberBox } />
                            {member}
                        </label>
                    )}
                </div>

                <div style={{ display: "flex", justifyContent: "center", marginTop: "25px", marginBottom: "25px" }}>
                    <AreaChart width={chart_width} height={chart_height} data={datas}>
                        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" fill="#ECF5FF" />
                        <XAxis dataKey="time" stroke="#000000" />
                        <YAxis width={40} dataKey="lines" stroke="#000000" />
                        <Area type="monotone" dataKey="lines" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                </div>

                <div style={{ display: "flex", justifyContent: "center", marginBottom: "50px" }}>
                    <Table width={chart_width} height={375} data={datas}>
                        <Column width={chart_width * 0.2}>
                            <HeaderCell>Name</HeaderCell>
                            <Cell dataKey="author" />
                        </Column>
                        <Column width={chart_width * 0.55}>
                            <HeaderCell>Message</HeaderCell>
                            <Cell dataKey="message" />
                        </Column>
                        <Column width={chart_width * 0.1}>
                            <HeaderCell>Lines</HeaderCell>
                            <Cell dataKey="lines" />
                        </Column>
                        <Column width={chart_width * 0.15}>
                            <HeaderCell>Time</HeaderCell>
                            <Cell dataKey="time" />
                        </Column>
                    </Table>
                </div>
            </Container>
        )
    }

    render() {
        const { currentProject } = this.state
        if (this.state.data == undefined)
            this.setTotalCommit(currentProject.id)

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

                    { this.createTotalCommit() }
                </Content>
            </Container>

        )
    }
}

export default CommitPage;