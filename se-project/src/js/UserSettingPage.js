import React from 'react';
import { Container, Divider, FlexboxGrid, Alert } from 'rsuite';

import '../css/ProjectSetting.css';
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
// {/* <Button color='default' onClick={oAuth} style={{ marginLeft: 10 }}>
//     授權 GitHub
//                 </Button> */}
// functoin handleAddContributor(){

// }

class UserSettingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        Alert.config({ top: 100 });

    }


    componentDidMount() {


    }


    render() {
        // const {  } = this.state
        return (

            <Container style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
                <MainHeader />

                <div style={{ margin: 20, paddingLeft: "20%", paddingRight: "20%" }}>
                    <h4>個人設定</h4>
                </div>
                <FlexboxGrid style={{ paddingLeft: '20%', paddingRight: '20%' }}>
                    <FlexboxGrid.Item >
                        <Divider />
                    </FlexboxGrid.Item>
                </FlexboxGrid>
                <Divider />




            </Container>

        )
    }
};

export default UserSettingPage