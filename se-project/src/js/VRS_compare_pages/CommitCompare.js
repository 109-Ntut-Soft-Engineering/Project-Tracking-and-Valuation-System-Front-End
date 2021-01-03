import React, {Component} from 'react';
import { getCurrentCompareProjects } from '../tool/CommonTool';
import { requestCompareTotalCommit } from '../api/projectAPI'
import { Container, Breadcrumb, Content, FlexboxGrid } from 'rsuite';
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
        const width = window.innerWidth * 0.7;
        const height = window.innerHeight * 0.6;

        if (this.state.curData == undefined) {
            return (<div>loading....</div>)
        }
        else {
            const data = this.state.curData['commit_times'];

            return (
                <FlexboxGrid.Item colspan={24}>
                    <AreaChart width={width} height={height} data={data}>
                        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" fill="#ECF5FF" />
                        <XAxis dataKey="time" stroke="#000000" />
                        <YAxis />
                        <Area type="monotone" dataKey={this.state.currCmpProjs.id1} stroke="#82ca9d" fill="#82ca9d" />
                        <Area type="monotone" dataKey={this.state.currCmpProjs.id2} stroke="#8884d8" fill="#8884d8" />
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
            <Container style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
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