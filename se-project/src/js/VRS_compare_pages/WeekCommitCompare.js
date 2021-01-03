import React, {Component} from 'react'
import HeaderNavbarCompare from "../tool/NavbarCompare";
import { Container, Breadcrumb, Content, Icon} from 'rsuite';
import { Link } from "react-router-dom";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import MainHeader from '../tool/MainHeader'
import { requestProjectCompareWeekCommit } from '../api/projectAPI';
import { getCurrentCompareProjects } from '../tool/CommonTool';
import black from '../../img/black.svg';

function GetImageWidth(data) {
    if (data <= 5)
        return data * 9
    else
        return 45
}

var ImageCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={black} alt={dataKey} width={GetImageWidth(rowData[dataKey])} />
    </Cell>
);

class WeekCommitCompare extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentCompareProjects: getCurrentCompareProjects(),
            data: undefined,
        }
    }

    createWeekCommitChart = () => {
        const chartWidth = window.innerWidth * 0.7
        const chartHeight = window.innerHeight * 0.6
        if (this.state.data === undefined) {
            return (
                <div style={{display:"flex",justifyContent:"center",marginTop:"100px"}}>
                    <Icon icon="spinner" spin size="lg"/>
                    <p style={{marginLeft:"10px"}}>loading.... </p>
                </div>
            )
        }
        else {
            return (
                <div>
                    {this.CreateWeekCommitTable(0, this.state.currentCompareProjects.name1)}
                    {this.CreateWeekCommitTable(1, this.state.currentCompareProjects.name2)}
                </div>
            )
        }
    }

    GetTime = (num) => {
        if (num >= 12) {
            if (num === 12)
                return "12PM"
            return (num - 12) + "PM"
        }
        else {
            if (num == 0)
                return "12AM"
            return num + "AM"
        }
    }

    padLeadingZeros = (num, size) => {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    CreateWeekCommitTable = (index, name) => {
        var table_list = []
        var info = this.state.data.commit_info[index]
        var nameText = "Project：" + name;
        table_list.push(
            <h6 style={{ marginTop: "25px", marginBottom: "25px" }}>{nameText}</h6>
        )
        table_list.push(
            <Table data={info.commit} autoHeight >
                <Column align="center" fixed>
                    <HeaderCell></HeaderCell>
                    <Cell dataKey="week_day" />
                </Column>
                {this.CreateWeekCommitColumn()}
            </Table>
        )    
        return table_list
    }

    CreateWeekCommitColumn = () => {
        var column_list = []
        for (let index = 0; index < 24; index++) {
            column_list.push(
                <Column align="center" flexGrow>
                    <HeaderCell>{this.GetTime(index)}</HeaderCell>
                    <ImageCell dataKey={this.padLeadingZeros(index, 2)} />
                </Column>
            )
        }
        return column_list
    }

    setData = (pid1, pid2) => {
        console.log('request!!!')
        return requestProjectCompareWeekCommit(pid1, pid2)
            .then(res => res.data)
            .then(data => {
                console.log("Data", data)
                this.setState({ data: data.week_commit })
                return data.week_commit
            })
    }
    
    render() {
        const { currentCompareProjects } = this.state
        var projectsNameText = currentCompareProjects.name1 + ' － ' + currentCompareProjects.name2;
        
        if (this.state.data === undefined)
            this.setData(currentCompareProjects.id1, currentCompareProjects.id2)
        return(
            <Container style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
                <MainHeader />
                <Content style={{ paddingLeft: "20%", paddingRight: "20%" }}>
                    <div style={{ margin: 20 }}>
                        <Breadcrumb style={{ display: 'inline' }} separator={React.createElement('h4', {}, '/')}>
                            <Breadcrumb.Item><Link to="/projects"><h4>Projects Compare</h4></Link></Breadcrumb.Item>
                            <Breadcrumb.Item active><h4>{projectsNameText}</h4></Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <HeaderNavbarCompare />
                    {this.createWeekCommitChart()}
                </Content>
            </Container>
        )
    }
}
export default WeekCommitCompare;