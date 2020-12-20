import React from "react";
import Sidenavbar from "./tool/Sidenavbar";
import { Container ,Breadcrumb} from 'rsuite';
import {Link}  from "react-router-dom";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import black from '../img/black.svg';
import MainHeader from './tool/MainHeader'
import { requestProjectWeekCommit } from "./api/projectAPI";
import { fakeData } from '../test_data/fakeWeekCommit.json'

function GetImageWidth(data){
    if(data <= 5)
        return data * 9
    else
        return 45
}

var ImageCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0, display: "flex", alignItems: "center", justifyContent: "center"}}>
        <img src = {black} alt = {dataKey} width={GetImageWidth(rowData[dataKey])}/>
    </Cell>
);

class WeekCommit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            proName: this.props.match.params.pro_name,
            data: undefined,
        }
    }

    createWeekCommitChart = () => {
        if (this.state.data === undefined) {
            return (<div>loading....</div>)
        }
        else {
            console.log(this.state.data)
            return (
                <div>
                    <h5 style={{marginTop:"25px", marginBottom:"25px"}}>{this.state.data.start_time} To {this.state.data.end_time}</h5>                    
                    <Table data={this.state.data.commit_info} autoHeight width={"100%"}>
                        <Column align="center" fixed>
                            <HeaderCell></HeaderCell>
                            <Cell dataKey="week_day" />
                        </Column>
                        {this.CreateWeekCommitColumn()}
                    </Table>
                </div>
            )
        }
    }

    GetTime = (num) => {
        if(num >= 12){
            if(num == 12)
                return "12PM"
            return (num - 12) + "PM"
        }
        else{
            if(num == 0)
                return "12AM"
            return num + "AM"
        }
    }

    padLeadingZeros = (num, size) => {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    CreateWeekCommitColumn = () => {
        var column_list = []
        for (let index = 0; index < 24; index++) {
            column_list.push(
                <Column align="center" flexGrow>
                    <HeaderCell>{this.GetTime(index)}</HeaderCell>
                    <ImageCell dataKey={this.padLeadingZeros(index, 2)}/>
                </Column>
            )
        }
        return column_list
    }

    setWeekCommitData = (name) => {
        requestProjectWeekCommit({ name: name })
            .then(res => res.data)
            .then(data => {
                console.log('data', data)
                this.setState({ data: data.WeekCommit })
                return data.WeekCommit
            })
    }

    render() {
        if (this.state.data === undefined)
            this.setWeekCommitData(this.state.proName)
        return (
            <Container style={{ height: "100%"}}>
                <MainHeader/>
                <Container style={{backgroundColor:"white",width:"100%",paddingLeft:"10%", paddingRight:"10%"}}>
                    <Breadcrumb style={{marginBottom:"20px", marginTop:"20px"}}>
                        <Breadcrumb.Item><Link to="/home">Projects</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>{this.state.proName}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Sidenavbar contact={{pro_name:this.state.proName}}/>
                    {this.createWeekCommitChart()}
                </Container>
            </Container>
        )
    }
}
export default WeekCommit;