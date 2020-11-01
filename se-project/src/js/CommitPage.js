import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Header, Button } from 'rsuite';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import { AreaChart, XAxis, YAxis, CartesianGrid, Area } from 'recharts';
import Sidenavbar from './tool/Sidenavbar'

import '../css/commitPage.css'

import fakeCommitMessage from '../test_data/fakeCommitMessage.json'

const repoName = fakeCommitMessage.repoName;
const members = fakeCommitMessage.member;
const datas = fakeCommitMessage.data;

class CommitPage extends React.Component {
    render() {
        return (
            <Container style={{height:"100%", display:"flex", flexDirection:"row"}}>
                <Sidenavbar />
                <Container>

                    <h1 className="repository-name">{repoName}</h1>

                    <Header style={{display:"flex", flexDirection:"row", marginLeft:"25px", marginTop:"25px", marginBottom:"25px"}}>
                        {members.map(member => 
                            <Button className="member-button">{member}</Button>
                        )}
                    </Header>

                    <AreaChart className="horizontal-center component-margin" width={1000} height={300} data={datas} >
                        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" fill="#ECF5FF" />
                        <XAxis dataKey="time" stroke="#000000" />
                        <YAxis width={40} dataKey="lines" stroke="#000000" />
                        <Area type="monotone" dataKey="lines" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                    
                    <Container className="horizontal-center component-margin">
                        <Table width={1000} height={375} data={datas}>
                            <Column width={200}>
                                <HeaderCell>Name</HeaderCell>
                                <Cell dataKey="name" />
                            </Column>
                            <Column width={600}>
                                <HeaderCell>Message</HeaderCell>
                                <Cell dataKey="message" />
                            </Column>
                            <Column width={100}>
                                <HeaderCell>Lines</HeaderCell>
                                <Cell dataKey="lines" />
                            </Column>
                            <Column width={100}>
                                <HeaderCell>Time</HeaderCell>
                                <Cell dataKey="time" />
                            </Column>
                        </Table>
                    </Container>

                </Container>
            </Container>
        )
    }
}

export default CommitPage;