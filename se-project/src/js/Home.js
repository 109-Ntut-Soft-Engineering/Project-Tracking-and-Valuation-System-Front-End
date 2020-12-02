import React from "react";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import { Container, FlexboxGrid , Panel} from 'rsuite';
import {Link}  from "react-router-dom";
import MainHeader from './tool/MainHeader'
import fakeProjectData from '../test_data/fakeProjectData.json'
import '../css/Home&Repo.css';
const chart_width = window.innerWidth * 0.7
const datas = fakeProjectData.data;
class Home extends React.Component{
    
    render(){
        return (
            <Container style={{backgroundColor:"white"}}>
                <MainHeader/>

                <div className="SubTitle">Projects /</div>

                <div className="projectsTable">
                    <Table bordered={true} width={chart_width} height={375} data={datas}>
                            <Column width={chart_width*0.6} align="center">
                                <HeaderCell className="haederCell">Project Name</HeaderCell>
                                <Cell>
                                    {rowData => {
                                        var pro_path = "/code/" + rowData.name
                                        return <Link to={pro_path} className="cell">{rowData.name}</Link>
                                    }}
                                </Cell>
                            </Column>
                            <Column width={chart_width*0.2} align="center">
                                <HeaderCell className="haederCell">Last Update Time</HeaderCell>
                                <Cell dataKey="updateTime"></Cell>
                            </Column>
                    </Table>
                </div>
            </Container>
        )
    }
}
export default Home;