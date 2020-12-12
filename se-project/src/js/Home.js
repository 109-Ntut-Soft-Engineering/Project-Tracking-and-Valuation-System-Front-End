import React from "react";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import { Container, Button, Modal, Input, Icon} from 'rsuite';
import { Link } from "react-router-dom";
import MainHeader from './tool/MainHeader'
import fakeProjectData from '../test_data/fakeProjectData.json'
import '../css/Home&Repo.css';
import { requestUserProjects} from './api/projectAPI';

const chart_width = window.innerWidth * 0.7
const datas = fakeProjectData.projects_data;
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backdrop: true,
            show: false,
            datas: undefined
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
        // addNewProject({ name: "kkkkkkkkkkkkkkk" })
    }

    //發API取得使用者的所有projects
    getUserProjects() {
        requestUserProjects()
        .then(result => result.data.projects)
        .then(projects => {
            console.log('projects', projects)
            this.setState({ datas: projects})
        })
    }

    //projectsTable元件
    getProjectTable(datas){
        return (
            <div className="projectsTable">
                <Table bordered={true} width={chart_width} height={375} data={datas}>
                    <Column width={chart_width * 0.6} align="center">
                        <HeaderCell className="haederCell">Project Name</HeaderCell>
                        <Cell>
                            {rowData => {
                                var pro_path = "/repository/" + rowData.name
                                return <Link to={pro_path} className="cell">{rowData.name}</Link>
                            }}
                        </Cell>
                    </Column>
                    <Column width={chart_width * 0.2} align="center">
                        <HeaderCell className="haederCell">Last Update Time</HeaderCell>
                        <Cell dataKey="updateTime"></Cell>
                    </Column>
                </Table>
            </div>
        )
    }

    render() {
        const { backdrop, show, datas} = this.state;
        var projectTable;

        //Table 顯示緩衝設定
        if (this.state.datas === undefined){
            this.getUserProjects();
            projectTable = (
                <div style={{height:"400px", backgroundColor:"white"}}>
                    <p style={{ padding: 4, color: '#999', textAlign: 'center',marginTop:"100px"}}>
                    <Icon icon="spinner" spin /> 請稍後...</p>)
                </div>
            )
        }else projectTable = this.getProjectTable(datas);
        
            
        return (
            <Container style={{ backgroundColor: "white" }}>
                <MainHeader />

                <div style={{ display: "flex", flexDirection: 'row', justifyContent: "space-around" }}>
                    <div className="SubTitle">Projects /</div>
                    <Button color="blue" className="creteButton" onClick={this.open}>Create</Button>
                </div>
                {projectTable}

                <Modal backdrop={backdrop} show={show} onHide={this.close} size="xs">
                    <Modal.Header>
                        <Modal.Title>新增 Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div >
                            <p style={{ paddingTop: "6px", marginLeft: "20px", marginBottom: "15px" }}>要新增的專案名稱</p>
                            <Input style={{ width: 300, marginLeft: "20px" }} placeholder="My project name" />
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