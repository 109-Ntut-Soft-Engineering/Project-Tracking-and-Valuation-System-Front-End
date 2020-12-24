import React from 'react';
import { Container, Divider, FlexboxGrid, Alert, Content, InputGroup, Input, Icon, Button } from 'rsuite';
import { getUserInfo, updateUserInfo } from './api/userAPI';
import MainHeader from './tool/MainHeader'

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


class UserSettingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showUserNameConfirm: false,
            showEmailConfirm: false,
            showPasswordConfirm: false,
            userInfo: {},
            userSetting: {}
        };

        Alert.config({ top: 100 });
        this.updateInfo = this.updateInfo.bind(this);
    }
    deepCopy(object) {
        return JSON.parse(JSON.stringify(object))
    }

    componentDidMount() {
        getUserInfo()
            .then(response => {
                this.setState({ userInfo: this.deepCopy(response.data), userSetting: this.deepCopy(response.data) })
            })
    }
    updateInfo() {
        updateUserInfo(this.state.userSetting)
            .then(response => {
                Alert.success('修改成功！')
                this.setState({
                    showUserNameConfirm: false,
                    showEmailConfirm: false,
                    userInfo: this.deepCopy(this.state.userSetting)
                })

            })
            .catch(err => {
                const error = err.response.data.error
                Alert.error(error)
            })

    }

    render() {
        var { showUserNameConfirm, showEmailConfirm, showPasswordConfirm, userSetting, userInfo } = this.state
        return (

            <Container style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
                <MainHeader />


                <Content style={{ paddingLeft: "20%", paddingRight: "20%" }}>
                    <div style={{ marginBottom: 20 }}>
                        <h1>設定</h1>
                    </div>
                    <FlexboxGrid >
                        <FlexboxGrid.Item colspan={24}>
                            <h4>個人資料</h4>
                            <Divider />
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={10} style={{ textAlign: 'right', paddingRight: '10px' }}>
                            <h5>使用者名稱</h5>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={14} >
                            <InputGroup size='sm' style={{ width: '300px' }}>
                                <Input value={userSetting.name} onChange={(value) => {
                                    userSetting.name = value
                                    this.setState({ showUserNameConfirm: true, userSetting: userSetting })
                                }} />
                                {showUserNameConfirm && <InputGroup.Button onClick={() => {
                                    console.log(this.state.userSetting)
                                    this.updateInfo()
                                }}>
                                    <Icon style={{ 'color': '#2F93FC' }} icon="check" />
                                </InputGroup.Button>}
                                {showUserNameConfirm && <InputGroup.Button onClick={() => {
                                    this.setState({ showUserNameConfirm: false, userSetting: this.deepCopy(userInfo) })
                                }}>
                                    <Icon icon="close" />
                                </InputGroup.Button>}
                            </InputGroup>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={10} style={{ textAlign: 'right', paddingRight: '10px' }}>
                            <h5>E-Mail</h5>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={14} >
                            <InputGroup size='sm' style={{ width: '300px' }}>
                                <Input value={userSetting.email} onChange={(value) => {
                                    userSetting.email = value
                                    this.setState({ showEmailConfirm: true })
                                }} />
                                {showEmailConfirm && <InputGroup.Button onClick={() => {
                                    console.log(this.state.userSetting)
                                    this.updateInfo()
                                }}>
                                    <Icon style={{ 'color': '#2F93FC' }} icon="check" />
                                </InputGroup.Button>}
                                {showEmailConfirm && <InputGroup.Button onClick={() => {
                                    this.setState({ showEmailConfirm: false, userSetting: this.deepCopy(userInfo) })
                                }}>
                                    <Icon icon="close" />
                                </InputGroup.Button>}
                            </InputGroup>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={10} style={{ textAlign: 'right', paddingRight: '10px' }}>
                            <h5>新密碼</h5>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={14} >
                            <InputGroup size='sm' style={{ width: '300px' }}>
                                <Input />
                            </InputGroup>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={10} style={{ textAlign: 'right', paddingRight: '10px' }}>
                            <h5>再次輸入新密碼</h5>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={14} >
                            <InputGroup size='sm' style={{ width: '300px' }}>
                                <Input onChange={(value) => this.setState({ showPasswordConfirm: true })} />
                                {showPasswordConfirm && <InputGroup.Button>
                                    <Icon style={{ 'color': '#2F93FC' }} icon="check" />
                                </InputGroup.Button>}
                                {showPasswordConfirm && <InputGroup.Button onClick={() => { this.setState({ showPasswordConfirm: false }) }}>
                                    <Icon icon="close" />
                                </InputGroup.Button>}
                            </InputGroup>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={24}>
                            <h4>平台連結</h4>
                            <Divider />
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={10} style={{ textAlign: 'right', paddingRight: '10px' }}>
                            <h5>Github</h5>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={14} >
                            <Button color='default' onClick={oAuth} >
                                授權
                            </Button>

                        </FlexboxGrid.Item>
                    </FlexboxGrid>


                </Content>


            </Container>

        )
    }
};

export default UserSettingPage