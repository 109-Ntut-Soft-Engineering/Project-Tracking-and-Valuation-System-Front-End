import React from "react";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import { Container, Button, Modal, Input, Breadcrumb ,FlexboxGrid, Alert} from 'rsuite';
import { Link } from "react-router-dom";
import MainHeader from './tool/MainHeader'
import { setCurrentProject } from './tool/CommonTool'
import '../css/Home&Repo.css';
import { requestUserProjects , addNewProject} from './api/projectAPI';

const chart_width = window.innerWidth * 0.7

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backdrop: true,
            show: false,
            datas: undefined,
            loading: true
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

    //建立新的project
    createProject() {
        this.setState({ show: false });
        const projectInput = document.getElementById("projctInput");
        const projectName = projectInput.value;
        if(projectName == "")
            Alert.error("您新增的專案名稱為空")
        else{
            addNewProject({ name: projectName })
            .then(result => {
                console.log(result);
                if(result.status == 200){
                    Alert.success('專案新增成功，重新讀取中');
                    this.componentDidMount();
                }
            }).catch(err => {
                Alert.error('此專案名稱已存在');
            })
        }
    }

    //讀取使用者的projects
    componentDidMount() {
        this.setState({ loading: true })
        requestUserProjects()
            .then(result => {
                const projects = result.data.projects
                this.setState({ datas: projects })
                this.setState({ loading: false })
            })
    }
    //projectsTable元件
    getProjectTable(datas) {
        return (
            <div className="projectsTable">
                <Table loading={this.state.loading} bordered={true} width={chart_width} height={375} data={datas}>
                    <Column width={chart_width * 0.6} align="center">
                        <HeaderCell className="haederCell">Project Name</HeaderCell>
                        <Cell>
                            {rowData => {
                                var pro_path = '/project/repository'
                                return <Link to={pro_path} className="cell" onClick={() => setCurrentProject({ id: rowData.id, name: rowData.name })}>{rowData.name}</Link>
                            }}
                        </Cell>
                    </Column>
                    <Column width={chart_width * 0.2} align="center">
                        <HeaderCell className="haederCell">Last Update Time</HeaderCell>
                        <Cell>
                            {rowData => {
                                const time = new Date(rowData.updated)
                                return time.toLocaleDateString() + time.toLocaleTimeString()
                            }}
                        </Cell>
                    </Column>
                </Table>
            </div>
        )
    }

    render() {
        const { backdrop, show, datas } = this.state;

        return (
            <Container style={{ backgroundColor: "white", height: "100%" }}>
                <MainHeader />
               <FlexboxGrid align="middle" justify="space-around" style={{ margin: "20px" }}>
                    <FlexboxGrid.Item >
                        <Breadcrumb style={{ marginBottom: "0" }} >
                            <Breadcrumb.Item active>Projects</Breadcrumb.Item>
                        </Breadcrumb>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item >
                        <Button color="blue" className="creteButton" onClick={this.open}>Create</Button>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
                
                {this.getProjectTable(datas)}

                <Modal backdrop={backdrop} show={show} onHide={this.close} size="xs">
                    <Modal.Header>
                        <Modal.Title>新增 Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div >
                            <p style={{ paddingTop: "6px", marginLeft: "20px", marginBottom: "15px" }}>要新增的專案名稱</p>
                            <Input style={{ width: 300, marginLeft: "20px" }} placeholder="My project name" id="projctInput"/>
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