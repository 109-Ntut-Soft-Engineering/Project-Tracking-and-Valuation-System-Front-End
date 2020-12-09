import React from "react";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import {Container, Breadcrumb, Button, Modal, Input, IconButton, Icon} from 'rsuite';
import {Link}  from "react-router-dom";
import MainHeader from './tool/MainHeader'
import Sidenavbar from "./tool/Sidenavbar";
import fakeRepoData from '../test_data/fakeRepoData.json'
import '../css/Home&Repo.css';

const chart_width = window.innerWidth * 0.7
class Repository extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          backdrop: true,
          show: false,
          datas: fakeRepoData.repos_data
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.changeData = this.changeData.bind(this)
    }
    
    close() {
        this.setState({ show: false });
    }
    
    open() {
        this.setState({ show: true });
    }

    changeData(){
        // this.setState({ datas: fakeRepoData.repos_data2 });
    }

    render(){
        var proName = this.props.match.params.pro_name;
        const { backdrop, show ,datas} = this.state;
        return (
            <Container style={{width:"100%",backgroundColor:"white"}}>
                <MainHeader/>
                <div style={{display:"flex", flexDirection:'row',justifyContent:"space-around"}}>
                    <Breadcrumb style={{marginBottom:"20px", marginTop:"20px"}}>
                        <Breadcrumb.Item><Link to="/home">Projects</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>{proName}</Breadcrumb.Item>
                    </Breadcrumb>     
                    <Button color="blue" className="creteButton" onClick={this.open}>Create</Button>
                </div>

                <Container id="main" style={{backgroundColor:"white",width:"100%",paddingLeft:"10%", paddingRight:"10%"}}>
                    <Sidenavbar contact={{pro_name:proName}}/>

					<div className="reposTable">
                        <Table bordered={true} width={chart_width} height={375} data={datas} rowHeight={60}>
                                <Column width={chart_width*0.3} align="center">
                                    <HeaderCell className="haederCell">Repository Name</HeaderCell>
                                    <Cell dataKey="name"></Cell>
                                </Column>
                                <Column width={chart_width*0.4} align="center">
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
				</Container>

                <Modal backdrop={backdrop} show={show} onHide={this.close} size="xs">
                    <Modal.Header>
                        <Modal.Title>新增 Repository</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div >
                            <p style={{paddingTop:"6px",marginLeft:"20px",marginBottom:"15px"}}>要新增的第三方 Repository URL</p>
                            <Input style={{ width:300,marginLeft:"20px"}} placeholder="My Repository URL" />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close} appearance="primary">確認</Button>
                        <Button onClick={this.close} appearance="subtle">取消</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }
}
export default Repository;