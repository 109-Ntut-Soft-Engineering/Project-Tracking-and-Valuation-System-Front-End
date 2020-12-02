import React from "react";
import Sidenavbar from "./tool/Sidenavbar";
import { Container ,Breadcrumb} from 'rsuite';
import {Link}  from "react-router-dom";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import black from '../img/black.png';
import MainHeader from './tool/MainHeader'

const data = [
    { user: "Tony", c1: 5, c2: 11, c3: 7, c4: 0, c5: 3, c6: 4, c7: 2 },
    { user: "Ken", c1: 7, c2: 21, c3: 13, c4: 7, c5: 6, c6: 5, c7: 2 },
    { user: "Bob", c1: 11, c2: 3, c3: 7, c4: 9, c5: 15, c6: 17, c7: 19 },
    { user: "Ancle", c1: 19, c2: 4, c3: 6, c4: 7, c5: 8, c6: 9, c7: 11 }
]

const weekday = ["Monday", "Thusday", "Wendesday", "Thursday", "Friday", "Saturday", "Sunday"]

var ImageCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0}}>
        <img src = {black} alt = {dataKey} width={40}/>
    </Cell>
);

class ContributionCommit extends React.Component {
    render() {
        var proName = this.props.match.params.pro_name;
        return (
            <Container style={{ height: "100%"}}>
                <MainHeader/>
                <Container style={{backgroundColor:"white",width:"100%",paddingLeft:"10%", paddingRight:"10%"}}>
                    <Breadcrumb style={{marginBottom:"20px", marginTop:"20px"}}>
                        <Breadcrumb.Item><Link to="/home">Projects</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>{proName}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Sidenavbar contact={{repo_name:proName}}/>

                    <div style={{width:"80%",marginLeft:"10%",marginRight:"10%",marginBottom:"100px"}}>
                        <h5 style={{marginTop:"25px", marginBottom:"25px"}}>ThisWeek</h5>                    
                        <Table data={data} autoHeight>
                            <Column width={80}>
                                <HeaderCell>Name</HeaderCell>
                                <Cell dataKey="user" />
                            </Column>
                            <Column width={100}>
                                <HeaderCell>{weekday[0]}</HeaderCell>
                                <ImageCell dataKey="c1" />
                            </Column>
                            <Column width={100}>
                                <HeaderCell>{weekday[1]}</HeaderCell>
                                <ImageCell dataKey="c2" />
                            </Column>
                            <Column width={100}>
                                <HeaderCell>{weekday[2]}</HeaderCell>
                                <ImageCell dataKey="c3" />
                            </Column>
                            <Column width={100}>
                                <HeaderCell>{weekday[3]}</HeaderCell>
                                <ImageCell dataKey="c4" />
                            </Column>
                            <Column width={100}>
                                <HeaderCell>{weekday[4]}</HeaderCell>
                                <ImageCell dataKey="c5" />
                            </Column>
                            <Column width={100}>
                                <HeaderCell>{weekday[5]}</HeaderCell>
                                <ImageCell dataKey="c6" />
                            </Column>
                            <Column width={100}>
                                <HeaderCell>{weekday[6]}</HeaderCell>
                                <ImageCell dataKey="c7" />
                            </Column>
                        </Table>
                    </div>
                </Container>
            </Container>
        )
    }
}
export default ContributionCommit;