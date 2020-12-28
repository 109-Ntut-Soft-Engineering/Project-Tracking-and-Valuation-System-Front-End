import React from "react";
import HeaderNavbar from "../tool/Navbar";
import { Container, Breadcrumb, Content } from 'rsuite';
import { Link, Redirect } from "react-router-dom";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import black from '../../img/black.svg';
import MainHeader from '../tool/MainHeader'
import { requestProjectWeekCommit } from "../api/projectAPI";
import { getCurrentProject, isLoggedIn } from '../tool/CommonTool'
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

class WeekCommit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProject: getCurrentProject(),
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
                    <h5 style={{ marginTop: "25px", marginBottom: "25px" }}>{this.state.data.start_time} To {this.state.data.end_time}</h5>
                    <Table data={this.state.data.commit_info} autoHeight >
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

    setWeekCommitData = (id) => {
        console.log(id)
        requestProjectWeekCommit(id)
            .then(res => res.data)
            .then(data => {
                console.log('data', data)
                this.setState({ data: data.WeekCommit })
                return data.WeekCommit
            })
    }

    render() {
        if (!isLoggedIn()) {
            return <Redirect to="/" />;
        } else if (this.state.currentProject === null) {
            return <Redirect to="/projects" />;
        }
        const { currentProject } = this.state
        if (this.state.data === undefined)
            this.setWeekCommitData(currentProject.id)
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
                    {this.createWeekCommitChart()}

                </Content>
            </Container>
        )
    }
}
export default WeekCommit;