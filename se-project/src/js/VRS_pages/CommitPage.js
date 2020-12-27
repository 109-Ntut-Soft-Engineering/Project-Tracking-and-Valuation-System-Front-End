import React, { Component } from 'react';
import { Container, CheckboxGroup, Checkbox, Breadcrumb, Content, FlexboxGrid, Panel } from 'rsuite';
import { Link } from "react-router-dom";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import { AreaChart, XAxis, YAxis, CartesianGrid, Area } from 'recharts';
import HeaderNavbar from '../tool/Navbar'
import MainHeader from '../tool/MainHeader'
import { getCurrentProject } from '../tool/CommonTool'
import { requestTotalCommit } from '../api/projectAPI'
import '../../css/commitPage.css'

class CommitPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProject: getCurrentProject(),
            originData: undefined,
            data: undefined,
            members: undefined,
            height: 300,
            width: 200
        };
        this.clickMemberBox = this.clickMemberBox.bind(this);
        this.createTotalCommit = this.createTotalCommit.bind(this);
    }
    componentDidMount() {
        const height = document.getElementById('chart').clientHeight * 0.4;
        const width = document.getElementById('chart').clientWidth * 0.6;
        this.setState({ height: height, width: width })

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

    clickMemberBox(value) {


        var newData = Object.assign({}, this.state.originData);
        var filteredMsgs = this.state.originData['commit_list'];
        filteredMsgs = filteredMsgs.filter(commit => value.includes(commit['author']));
        newData['commit_list'] = filteredMsgs;
        console.log(newData)
        this.setState({
            data: newData
        })
    }

    createTotalCommit = () => {
        const { width, height } = this.state
        if (this.state.data === undefined) {
            return (<div>loading...</div>)
        }

        const members = this.state.data['member']
        const data = this.state.data['commit_list']

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
                    <Table data={data}>
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
                    <AreaChart width={width} height={height} data={data}>
                        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" fill="#ECF5FF" />
                        <XAxis dataKey="time" stroke="#000000" />
                        <YAxis dataKey="lines" stroke="#000000" />
                        <Area type="monotone" dataKey="lines" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                </FlexboxGrid.Item>

            </FlexboxGrid >
        )
    }

    render() {
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