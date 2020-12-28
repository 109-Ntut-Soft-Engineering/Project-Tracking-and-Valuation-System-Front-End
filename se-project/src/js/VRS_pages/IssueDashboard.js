import React from 'react';
import { Container, Breadcrumb } from 'rsuite';
import HeaderNavbar from "../tool/Navbar";
import { Link, Redirect } from "react-router-dom";
import ExpandedTable from '../tool/ExpandedTable'
import MainHeader from '../tool/MainHeader'
import { requestProjectIssueMessage } from '../api/projectAPI';
import { Panel, Content } from 'rsuite';
import { getCurrentProject, isLoggedIn } from '../tool/CommonTool';

const newDataList = []

class IssueDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProject: getCurrentProject(),
            data: undefined,
        }
    }
    createIssueMessagesTable = (name, issue) => {
        console.log(issue)
        return (
            <Panel header={name} collapsible bordered>
                <div style={{ marginTop: "30px" }}>
                    <ExpandedTable data={issue} autoHeight></ExpandedTable>
                </div>
            </Panel>
        )
    }
    createIssueMessagesPanel = () => {
        if (this.state.data === undefined) {
            return (<div>loading....</div>)
        }
        else {
            this.mapJsonToData(this.state.data)
            console.log('list', newDataList);
            var result = []
            newDataList.forEach(value => {
                result.push(this.createIssueMessagesTable(value.name, value.issue))
            })
            return (result)
        }
    }
    mapJsonToData = (data) => {
        if (newDataList.length == 0) {
            var counter = 1;
            data.forEach(repo_value => {
                var repo = {};
                repo['name'] = repo_value.name;
                repo['issue'] = []
                repo_value.issue.forEach(issue_value => {
                    var issue_info = {};
                    issue_info['id'] = counter++;
                    issue_info['title'] = issue_value.title;
                    issue_info['date'] = issue_value.time;
                    issue_info['labels'] = issue_value.labels;
                    issue_info['comments'] = issue_value.comments;
                    repo['issue'].push(issue_info);
                });
                newDataList.push(repo)
            });
        }
        return newDataList
    }
    setIssueMessage = (id) => {

        requestProjectIssueMessage(id)
            .then(res => res.data)
            .then(data => {
                console.log('data', data)
                this.setState({ data: data.issues })
                return data.issues
            })
    }

    render() {
        if (!isLoggedIn()) {
            return <Redirect to="/" />;
        } else if (this.state.currentProject === null) {
            return <Redirect to="/projects" />;
        }
        const { currentProject } = this.state
        if (this.state.data === undefined) {
            this.setIssueMessage(currentProject.id)
        }
        return (
            <Container style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
                <MainHeader />
                <Content style={{ paddingLeft: '20%', paddingRight: '20%' }}>
                    <div style={{ margin: 20 }}>

                        <Breadcrumb style={{ display: 'inline' }} separator={React.createElement('h4', {}, '/')}>
                            <Breadcrumb.Item><Link to="/projects"><h4>Projects</h4></Link></Breadcrumb.Item>
                            <Breadcrumb.Item active><h4>{currentProject.name}</h4></Breadcrumb.Item>
                        </Breadcrumb>

                    </div>
                    <HeaderNavbar />
                    {this.createIssueMessagesPanel()}
                </Content>
            </Container>

        )
    }
}

export default IssueDashboard;