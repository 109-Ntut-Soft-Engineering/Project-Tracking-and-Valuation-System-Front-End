import React from 'react';
import {Container, Breadcrumb} from 'rsuite';
import Sidenavbar from './tool/Sidenavbar';
import {Link}  from "react-router-dom";
import ExpandedTable from './tool/ExpandedTable'
import MainHeader from './tool/MainHeader'
import { requestProjectIssueMessage } from './api/projectAPI';
import fakeIssueMessage from '../test_data/fakeIssueMessage.json'

const newDataList = []

class IssueDashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            proName: this.props.match.params.pro_name,
            data: undefined,
        }
    } 
    createIssueMessagesTable = () => {
        if (this.state.data === undefined) {
            return (<div>loading....</div>)
        }
        return (
                <div style={{marginTop:"30px"}}>
                    <ExpandedTable data={this.mapJsonToData()} height={window.innerHeight*0.65}></ExpandedTable>
                </div>
            )
    }
    mapJsonToData = () => {
        if(newDataList.length == 0){
            var counter = 1;
            console.log(this.state)
            this.state.data.forEach(value => {
                var newData = {};
                newData['id'] = counter++;
                newData['title'] = value.title;
                newData['date'] = value.time;
                newData['labels'] = value.labels;
                newData['comments'] = value.comments;
                newDataList.push(newData);
            });
        }
        return newDataList
    }
    setIssueMessage = (name) => {
        requestProjectIssueMessage({ name: name })
            .then(res => res.data)
            .then(data => {
                console.log('data', data)
                this.setState({ data: data.issue })
                return data.issue
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
                    {this.createIssueMessagesTable()}
                </Container>
            </Container>
        )
    }
}

export default IssueDashboard;