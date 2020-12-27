import React from "react";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import { Container, Button, Modal, Input, Breadcrumb, Panel, Alert, Content, Checkbox} from 'rsuite';
import { Link } from "react-router-dom";
import MainHeader from './tool/MainHeader'
import { setCurrentProject , setCurrentCompareProjects} from './tool/CommonTool'
import '../css/Home&Repo.css';
import { requestUserProjects, addNewProject } from './api/projectAPI';

const chart_width = window.innerWidth * 0.55

const CheckCell = ({ rowData, onChange, checkedKeys, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
      <div style={{ lineHeight: '46px' }}>
        <Checkbox value={rowData} inline onChange={onChange} checked={checkedKeys.some(item => item === rowData)}/>
      </div>
    </Cell>
  );

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backdrop: true,
            show: false,
            data: undefined,
            loading: true,
            tableHeight: 200,
            canCompareProject: false,
            checkedKeys: [],
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.createProject = this.createProject.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.changeCanCompareStatus = this.changeCanCompareStatus.bind(this);
    }

    //讀取使用者的projects
    componentDidMount() {
        const height = document.getElementById('projectTable').clientHeight * 0.6;

        requestUserProjects()
            .then(result => {
                const projects = result.data.projects
                this.setState({ data: projects, loading: false, tableHeight: height })
            })
    }

    //關閉彈出對話窗
    close() {
        this.setState({ show: false });
    }

    //開啟彈出對話窗
    open() {
        this.setState({ show: true });
    }

     //顯示Project CheckBox
    changeCanCompareStatus() {
        var comparValue = !this.state.canCompareProject;
        this.setState({ canCompareProject: comparValue });
        if(this.state.checkedKeys.length!=0) this.setState({ checkedKeys: []});
    }

    //建立新的project
    createProject() {
        this.setState({ show: false });
        const projectInput = document.getElementById("projctInput");
        const projectName = projectInput.value;
        if (projectName === "")
            Alert.error("您新增的專案名稱為空")
        else {
            addNewProject({ name: projectName })
                .then(result => {
                    console.log(result);
                    if (result.status === 200) {
                        Alert.success('專案新增成功，重新讀取中');
                        this.componentDidMount();
                    }
                }).catch(err => {
                    Alert.error('此專案名稱已存在');
                })
        }
    }

    //動態儲存勾選的checkBox
    handleCheck(value, checked) {
        const { checkedKeys } = this.state;
        const nextCheckedKeys = checked
            ? [...checkedKeys, value]
            : checkedKeys.filter(item => item !== value);
    
        this.setState({checkedKeys: nextCheckedKeys});
        console.log(nextCheckedKeys);
    }

    //projectsTable元件
    getProjectTable() {
        const {data, checkedKeys, canCompareProject} = this.state;
        var checkColumnWidth;

        if(canCompareProject == true) checkColumnWidth = 50;
        else checkColumnWidth = 0;

        return (
            <div className="projectsTable">
                <Table loading={this.state.loading} bordered={true} width={chart_width} rowHeight={60} height={this.state.tableHeight} data={data}>
                    <Column width={checkColumnWidth} align="center">
                    <HeaderCell className="haederCell"></HeaderCell>
                        <CheckCell checkedKeys={checkedKeys} onChange={this.handleCheck}/>
                     </Column>
                    <Column width={chart_width * 0.3} verticalAlign="middle" align="center">
                        <HeaderCell className="haederCell">Project Name</HeaderCell>
                        <Cell>
                            {rowData => {
                                var pro_path = '/project/repository'
                                return <Link to={pro_path} className="cell" onClick={() => setCurrentProject({ id: rowData.id, name: rowData.name })}>{rowData.name}</Link>
                            }}
                        </Cell>
                    </Column>
                    <Column width={chart_width * 0.3} verticalAlign="middle" align="center">
                        <HeaderCell className="haederCell">Owner</HeaderCell>
                        <Cell >
                            {rowData => {
                                return rowData.owner.name
                            }}
                        </Cell>
                    </Column>
                    <Column width={chart_width * 0.3} verticalAlign="middle" align="center">
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

    //取得要顯示的buttons
    getButtonGroup() {
        const {canCompareProject, checkedKeys} = this.state;
        
        if(canCompareProject == false){
            return (
                <div>
                    <Button style={{ float: 'right' }} color="blue" onClick={this.open}>新增專案</Button>
                    <Button style={{ float: 'right', marginRight:'20px'}} color="green" onClick={this.changeCanCompareStatus}>比較不同專案</Button>
                </div>
            )
        }else{
            var btDisable = true;
            var reminderText;
            var compareProjects;
            if(checkedKeys.length == 2){
                btDisable = false;
                reminderText = "提醒：您可以開始進行專案比較";
                compareProjects = {
                    id1 : checkedKeys[0].id,
                    name1 : checkedKeys[0].name,
                    id2 : checkedKeys[1].id,
                    name2 : checkedKeys[1].name
                };
            }else{
                btDisable = true;
                reminderText = "提醒：請選擇2個要比較的專案";
            } 

            return (
                <div>
                    <h5 style={{float: 'left', marginLeft:"270px", color:"#8E8E93"}}>{reminderText}</h5>
                    <Button style={{ float: 'right' ,marginRight:"30px"}} color="red" onClick={this.changeCanCompareStatus}>取消</Button>
                    <Link to={"/projectsCompare/codeBase"} className="cell" onClick={() => setCurrentCompareProjects(compareProjects)}>
                        <Button style={{ float: 'right', marginRight:'20px'}} disabled={btDisable} color="green">開始比較</Button>
                    </Link>
                </div>
            )
        }
    }

    //畫面渲染
    render() {
        const { backdrop, show} = this.state;
        
        return (
            <Container id='projectTable' style={{ backgroundColor: "white", height: "100%" }}>
                <MainHeader />

                <div style={{ margin: 20, paddingLeft: "20%", paddingRight: "20%" }}>
                    <Breadcrumb style={{ display: 'inline' }} separator={React.createElement('h4', {}, '/')}>
                        <Breadcrumb.Item active><h4>Projects</h4></Breadcrumb.Item>
                    </Breadcrumb>

                    {this.getButtonGroup()}
                </div>

                <Content>
                    {this.getProjectTable()}
                </Content>
                
                <Modal backdrop={backdrop} show={show} onHide={this.close} size="xs">
                    <Modal.Header>
                        <Modal.Title>新增 Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div >
                            <p style={{ paddingTop: "6px", marginLeft: "20px", marginBottom: "15px" }}>要新增的專案名稱</p>
                            <Input style={{ width: 300, marginLeft: "20px" }} placeholder="My project name" id="projctInput" />
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