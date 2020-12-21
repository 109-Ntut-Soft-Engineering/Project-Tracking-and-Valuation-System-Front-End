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
            data: undefined, 
        }
    }

    setTotalCommit = (id) => {
        return requestTotalCommit(id)
            .then(res => res.data)
            .then(data => {
                this.setState({ data: data.commits })
                return data.commits
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
                        <Button className="member-button">{member}</Button>
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