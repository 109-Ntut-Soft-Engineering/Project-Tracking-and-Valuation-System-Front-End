import React from "react";
import ReactDOM from 'react-dom';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import { Container, Button, Modal, Input,  IconButton, Icon} from 'rsuite';
import {Link}  from "react-router-dom";
import MainHeader from './tool/MainHeader'
import fakeProjectData from '../test_data/fakeProjectData.json'
import '../css/Home&Repo.css';

const chart_width = window.innerWidth * 0.7
const datas = fakeProjectData.projects_data;
class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          backdrop: true,
          show: false,
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.createProject = this.createProject.bind(this);
    }
    
    close() {
        this.setState({ show: false });
    }
    
    open() {
        this.setState({ show: true });
    }

    createProject() {
        this.setState({ show: false });
        alert(`新增Project：(還沒做)`);
    }

    render(){
        const { backdrop, show} = this.state;
        return (
            <Container style={{backgroundColor:"white"}}>
                <MainHeader/>

                <div style={{display:"flex", flexDirection:'row',justifyContent:"space-around"}}>
                    <div className="SubTitle">Projects /</div>
                    <Button color="blue" className="creteButton" onClick={this.open}>Create</Button>
                </div>
                

                <div className="projectsTable">
                    <Table bordered={true} width={chart_width} height={375} data={datas}>
                            <Column width={chart_width*0.5} align="center">
                                <HeaderCell className="haederCell">Project Name</HeaderCell>
                                <Cell>
                                    {rowData => {
                                        var pro_path = "/repository/" + rowData.name
                                        return <Link to={pro_path} className="cell">{rowData.name}</Link>
                                    }}
                                </Cell>
                            </Column>
                            <Column width={chart_width*0.2} align="center">
                                <HeaderCell className="haederCell">Last Update Time</HeaderCell>
                                <Cell dataKey="updateTime"></Cell>
                            </Column>
                            <Column width={chart_width*0.3} align="center">
                                <HeaderCell className="haederCell">Delete Repository</HeaderCell>
                                <Cell>
                                {rowData => {
                                    function handleAction() {
                                        //alert(`刪除Repo：${rowData.name} (還沒做)`);
                                        window.confirm(`確定要刪除${rowData.name}嗎`);
                                    }
                                    return (
                                    <IconButton icon={<Icon icon="trash-o"/>} onClick={handleAction}/>
                                    );
                                }}
                                </Cell>
                            </Column>
                    </Table>
                </div>


                <Modal backdrop={backdrop} show={show} onHide={this.close} size="xs">
                    <Modal.Header>
                        <Modal.Title>新增 Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div >
                            <p style={{paddingTop:"6px",marginLeft:"20px",marginBottom:"15px"}}>要新增的專案名稱</p>
                            <Input style={{ width:300,marginLeft:"20px"}} placeholder="My project name" />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.createProject} appearance="primary">確認</Button>
                        <Button onClick={this.close} appearance="subtle">取消</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }
}
export default Home;