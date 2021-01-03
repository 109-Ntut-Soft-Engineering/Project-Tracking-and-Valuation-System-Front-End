import React, {Component} from 'react';
import { getCurrentCompareProjects } from '../tool/CommonTool';
import { requestCompareTotalCommit } from '../api/projectAPI'
import { Container, Breadcrumb, Content, FlexboxGrid, Icon} from 'rsuite';
import { Link } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, Legend, CartesianGrid, Tooltip} from 'recharts'
import HeaderNavbarCompare from "../tool/NavbarCompare";
import MainHeader from '../tool/MainHeader'

class CommitCompare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currCmpProjs: getCurrentCompareProjects(), 
            oriData: undefined, 
            curData: undefined
        }
    }

    setData = (pid1, pid2) => {
        return requestCompareTotalCommit(pid1, pid2)
            .then(res => res.data)
            .then(data => {
                this.setState({
                    oriData: data, 
                    curData: data
                })
                return data
            })
    }

    createCompareTotalCommit = () => {
        const width = window.innerWidth * 0.6;
        const height = window.innerHeight * 0.5;

        if (this.state.curData == undefined) {
            return (
                <div style={{display:"flex",justifyContent:"center",marginTop:"100px"}}>
                    <Icon icon="spinner" spin size="lg"/>
                    <p style={{marginLeft:"10px"}}>loading.... </p>
                </div>
            )
        }
        else {
            const data = this.state.curData['commit_times'];

            return (
                <FlexboxGrid.Item colspan={24} style={{marginBottom:"30px"}}>
                    <AreaChart width={width} height={height} data={data}>
                        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" fill="#ECF5FF" />
                        <Tooltip />
                        <XAxis dataKey="time" stroke="#000000" />
                        <YAxis />
                        <Area type="monotone" dataKey={this.state.currCmpProjs.id1} name={this.state.currCmpProjs.name1} stroke="#82ca9d" fill="#82ca9d" />
                        <Area type="monotone" dataKey={this.state.currCmpProjs.id2} name={this.state.currCmpProjs.name2}stroke="#8884d8" fill="#8884d8" />
                        <Legend/>
                    </AreaChart>
                </FlexboxGrid.Item>
            )
        }
    }

    render() {
        const { currCmpProjs } = this.state;
        var projsNameText = currCmpProjs.name1 + ' － ' + currCmpProjs.name2;

        if (this.state.oriData == undefined)
            this.setData(currCmpProjs.id1, currCmpProjs.id2);

        return (
            <Container style={{ width: "100%", minHeight: "100%", height:"auto", backgroundColor: "white" }}>
                <MainHeader />
                <Content style={{ paddingLeft: "20%", paddingRight: "20%" }}>
                    <div style={{ margin: 20 }}>
                        <Breadcrumb style={{ display: 'inline' }} separator={React.createElement('h4', {}, '/')}>
                            <Breadcrumb.Item><Link to="/projects"><h4>Projects Compare</h4></Link></Breadcrumb.Item>
                            <Breadcrumb.Item active><h4>{projsNameText}</h4></Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <HeaderNavbarCompare />
                    {this.createCompareTotalCommit()}
                </Content>
            </Container>
        )
    }
}

export default CommitCompare;