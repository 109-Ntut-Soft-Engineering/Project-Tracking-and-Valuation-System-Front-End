import React from 'react';
import {Container, Breadcrumb} from 'rsuite';
import Sidenavbar from './tool/Sidenavbar';
import {Link}  from "react-router-dom";
import ExpandedTable from './tool/ExpandedTable'
import MainHeader from './tool/MainHeader'
import { requestProjectIssueMessage } from './api/projectAPI';
import fakeIssueMessage from '../test_data/fakeIssueMessage.json'
import { Panel, PanelGroup } from 'rsuite';

const newDataList = []

class IssueDashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            proName: this.props.match.params.pro_name,
            data: undefined,
        }
    } 
    createIssueMessagesTable = (name, issue) => {
        console.log(issue)
        return (
            <Panel header={name} collapsible bordered>
                <div style={{marginTop:"30px"}}>
                    <ExpandedTable data={issue} height={window.innerHeight*0.65}></ExpandedTable>
                </div>
            </Panel>
        )
    }
    createIssueMessagesPanel = () => {
        if (this.state.data === undefined) {
            return (<div>loading....</div>)
        }
        else{
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
        if(newDataList.length == 0){
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
    setIssueMessage = (name) => {
        requestProjectIssueMessage({ name: name })
            .then(res => res.data)
            .then(data => {
                console.log('data', data)
                this.setState({ data: data.issues })
                return data.issues
            })
    }

    render(){
        if(this.state.data === undefined){
            this.setIssueMessage(this.state.proName)
        }
        return(
            <Container style={{height:"100%"}}>
                <MainHeader/>
                <Container style={{backgroundColor:"white",width:"100%",paddingLeft:"10%", paddingRight:"10%"}}>
                    <Breadcrumb style={{marginBottom:"20px", marginTop:"20px"}}>
                        <Breadcrumb.Item><Link to="/home">Projects</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>{this.state.proName}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Sidenavbar contact={{pro_name:this.state.proName}}/>
                    {this.createIssueMessagesPanel()}
                </Container>
            </Container>
        )
    }
}

export default IssueDashboard;