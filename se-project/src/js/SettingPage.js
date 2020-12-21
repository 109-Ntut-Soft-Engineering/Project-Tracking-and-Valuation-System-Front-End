import React from 'react';
import HeaderNavbar from "./tool/Navbar";
import { Container, Breadcrumb } from 'rsuite';
import { Link, Redirect } from "react-router-dom";
import {
    InputGroup, TagGroup, Tag, Icon, Input, FlexboxGrid, Alert, Modal, Button, Content
} from 'rsuite';
import '../css/ProjectSetting.css';
import MainHeader from './tool/MainHeader'
import { getCurrentProject, setCurrentProject } from './tool/CommonTool'
import { updateProject, getProjectSetting, delProject } from './api/projectAPI';


class SettingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProject: getCurrentProject(),
            showConfirm: false,
            showAdd: false,
            tags: [],
            searchEmail: '',
            projectName: '',
            showConfirmDel: false
        };
        this.addCollaborator = this.addCollaborator.bind(this);
        this.changeProjectName = this.changeProjectName.bind(this);
        this.deleteProject = this.deleteProject.bind(this);

        Alert.config({ top: 100 });

    }
    // randomColor() {
    //     const color = "hsl(" + 360 * Math.random() + ',' +

    //         (90 + 70 * Math.random()) + '%,' +

    //         (30 + 10 * Math.random()) + '%)';
    //     return color
    // }

    addCollaborator() {
        const data = {
            collaborator: this.state.searchEmail.replace(/ /g, ''),
            collabAction: 'add'
        }
        updateProject(this.state.currentProject.id, data)
            .then(response => {
                const user = response.data
                console.log(user)
                const { tags } = this.state;
                const nextTags = [...tags, user]
                this.setState({
                    tags: nextTags,
                    searchEmail: '',
                    showAdd: false
                });
                Alert.success('新增成功！')
            })
            .catch(err => {
                const msg = err.response.data.msg
                console.log(msg)
                Alert.error(msg)
            })
    }
    removeCollaborator(tag) {
        const data = {
            collaborator: tag,
            collabAction: 'remove'
        }
        updateProject(this.state.currentProject.id, data)
            .then(response => {
                const { tags } = this.state;
                const nextTags = tags.filter(user => user.uid !== tag);
                this.setState({
                    tags: nextTags
                });
                Alert.success('刪除成功！')
            })
            .catch(err => {
                const msg = err.response.data.msg

                Alert.error(msg)
            })
    }
    changeProjectName() {
        const { projectName, currentProject } = this.state
        const data = {
            name: projectName,
        }
        updateProject(currentProject.id, data)
            .then(response => {
                Alert.success('修改成功！')
                setCurrentProject({ 'id': currentProject.id, 'name': projectName })
                this.setState({ showConfirm: false, currentProject: getCurrentProject() })

            })
            .catch(err => {
                const msg = err.response.data.msg
                Alert.error(msg)
            })
    }
    deleteProject() {
        delProject(this.state.currentProject.id)
            .then(response => {
                this.props.history.push('/projects')
            })
            .catch(err => {
                Alert.error('發生錯誤！')
            })
    }
    componentDidMount() {
        getProjectSetting(this.state.currentProject.id)
            .then(response => {
                this.setState({
                    projectName: this.state.currentProject.name,
                    tags: response.data.collaborator
                });
            })
            .catch(err => {
                console.log(err.response)
            })

    }


    render() {
        const { currentProject, tags, searchEmail, showConfirm, showAdd, showConfirmDel } = this.state
        return (

            <Container style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
                <MainHeader />
                <Content style={{ paddingLeft: "20%", paddingRight: "20%" }}>
                    <div style={{ margin: 20 }}>

                        <Breadcrumb style={{ display: 'inline' }} separator={React.createElement('h4', {}, '/')}>
                            <Breadcrumb.Item><Link to="/projects"><h4>Projects</h4></Link></Breadcrumb.Item>
                            <Breadcrumb.Item active><h4>{this.state.currentProject.name}</h4></Breadcrumb.Item>
                        </Breadcrumb>

                    </div>

                    <HeaderNavbar />

                    <FlexboxGrid justify="center" align="middle" style={{ marginTop: '50px' }}>

                        <FlexboxGrid.Item colspan={10} style={{ textAlign: 'right', paddingRight: '10px' }}>
                            <h5>專案名稱</h5>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={14} >
                            <InputGroup size='sm' style={{ width: '300px' }}>
                                <Input id='projectName' defaultValue={currentProject.name} onChange={(value) => this.setState({ showConfirm: true, projectName: value })} />
                                {showConfirm && <InputGroup.Button>
                                    <Icon style={{ 'color': '#2F93FC' }} icon="check" onClick={this.changeProjectName} />
                                </InputGroup.Button>}
                                {showConfirm && <InputGroup.Button onClick={() => { this.setState({ showConfirm: false }); document.getElementById('projectName').value = currentProject.name }}>
                                    <Icon icon="close" />
                                </InputGroup.Button>}
                            </InputGroup>
                        </FlexboxGrid.Item>

                        <FlexboxGrid.Item colspan={10} style={{ textAlign: 'right', paddingRight: '10px' }}>
                            <h5>新增協作者</h5>
                        </FlexboxGrid.Item>

                        <FlexboxGrid.Item colspan={14} >
                            <InputGroup inside size='sm' style={{ width: '300px' }}>
                                <Input
                                    placeholder='請輸入協作者E-mail'
                                    value={searchEmail}
                                    onChange={(value) => {
                                        if (value !== '')
                                            this.setState({ searchEmail: value, showAdd: true });
                                        else
                                            this.setState({ searchEmail: value, showAdd: false });
                                    }} />
                                {showAdd && <InputGroup.Button onClick={this.addCollaborator} >
                                    <Icon icon="plus" />
                                </InputGroup.Button>}
                            </InputGroup>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={10} ></FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={14} >

                            <TagGroup style={{ width: '300px' }}>
                                {tags.map((user, index) => (
                                    <Tag
                                        key={user.uid}
                                        closable
                                        // style={{ backgroundColor: this.randomColor(), color: 'white' }}
                                        onClose={() => {
                                            this.removeCollaborator(user.uid);
                                        }}
                                    >
                                        {user.name}
                                    </Tag>
                                ))}
                            </TagGroup>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={24} >

                            <Button color="red" style={{ float: 'right', marginRight: '40%' }} onClick={() => this.setState({ showConfirmDel: true })} >刪除專案</Button>

                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Content>
                <Modal show={showConfirmDel} onHide={() => this.setState({ showConfirmDel: false })} size="xs">

                    <Modal.Body style={{ textAlign: 'center' }} >
                        <Icon
                            icon="remind"
                            style={{
                                color: '#ffb300',
                                fontSize: 30
                            }}
                        />
                        <h5 style={{ display: 'inline' }}>確定刪除專案？</h5>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.deleteProject} appearance="subtle">
                            確認
                        </Button>
                        <Button onClick={() => this.setState({ showConfirmDel: false })} appearance="primary">
                            取消
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>

        )
    }
};

export default SettingPage