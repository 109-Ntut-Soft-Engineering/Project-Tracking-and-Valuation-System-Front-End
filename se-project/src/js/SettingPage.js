import React from 'react';
import HeaderNavbar from "./tool/Navbar";
import { Container, Breadcrumb } from 'rsuite';
import { Link } from "react-router-dom";
import {
    InputGroup, TagGroup, Tag, Icon, Input, FlexboxGrid, Alert
} from 'rsuite';
import '../css/ProjectSetting.css';
import MainHeader from './tool/MainHeader'
import { getCurrentProject, setCurrentProject } from './tool/CommonTool'
import { updateProject, getProjectSetting } from './api/projectAPI';
function oAuth() {

    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight

    const systemZoom = width / window.screen.availWidth;
    const left = (width - 600) / 2 / systemZoom + dualScreenLeft
    const top = (height - 700) / 2 / systemZoom + dualScreenTop
    window.open(`https://github.com/login/oauth/authorize?client_id=4fc83f8cb4d05b3684de&scope=repo`,
        null, `width = ${600 / systemZoom},height = ${700 / systemZoom},top = ${top},left = ${left}`)

}
// {/* <Button color='default' onClick={oAuth} style={{ marginLeft: 10 }}>
//     授權 GitHub
//                 </Button> */}
// functoin handleAddContributor(){

// }
const styles = {
    width: 50,
    marginBottom: 10
}

class SettingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProject: getCurrentProject(),
            showConfirm: false,
            showAdd: false,
            tags: [],
            searchEmail: '',
            projectName: ''
        };
        this.addCollaborator = this.addCollaborator.bind(this);
        this.changeProjectName = this.changeProjectName.bind(this);
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
        const { currentProject, tags, searchEmail, showConfirm, showAdd, projectName } = this.state
        return (

            <Container style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
                <MainHeader />

                <div style={{ margin: 20, paddingLeft: "20%", paddingRight: "20%" }}>

                    <Breadcrumb style={{ display: 'inline' }} separator={React.createElement('h4', {}, '/')}>
                        <Breadcrumb.Item><Link to="/projects"><h4>Projects</h4></Link></Breadcrumb.Item>
                        <Breadcrumb.Item active><h4>{this.state.currentProject.name}</h4></Breadcrumb.Item>
                    </Breadcrumb>


                </div>
                <Container id="main" style={{ backgroundColor: "white", width: "100%", paddingLeft: "10%", paddingRight: "10%" }}>


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
                    </FlexboxGrid>



                </Container>
            </Container>
        )
    }
};

export default SettingPage