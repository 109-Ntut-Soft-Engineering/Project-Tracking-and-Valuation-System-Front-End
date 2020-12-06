import React from 'react';
import Sidenavbar from "./tool/Sidenavbar";
import { Container, Breadcrumb, Alert } from 'rsuite';
import { Grid, Row, Col } from 'rsuite';
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, ButtonToolbar, Button } from 'rsuite';
import { Link } from "react-router-dom";
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

function SettingForm(props) {
    return (
        <Form layout="inline">
            <FormGroup>
                <ControlLabel style={{ width: 100 }}>ProjectName</ControlLabel>
                <FormControl name="username" value={props.proName} style={{ width: 350 }} />
                <HelpBlock tooltip>Required</HelpBlock>
            </FormGroup>
            <FormGroup>
                <ControlLabel style={{ width: 100 }}>Token</ControlLabel>
                <FormControl name="token" style={{ width: 350 }} />
                <HelpBlock tooltip>Required</HelpBlock>
            </FormGroup>
            <FormGroup>
                <ControlLabel style={{ width: 100 }}>owner</ControlLabel>
                <FormControl name="token" style={{ width: 350 }} />

                <HelpBlock tooltip>owner</HelpBlock>
            </FormGroup>
            <FormGroup>
                <Button color='default' onClick={oAuth}>
                    授權 GitHub
                </Button>
            </FormGroup>
            <ButtonToolbar>
                <Button color='primary'>
                    Save
                </Button>
                <Button color='red'>
                    Delete
                </Button>
            </ButtonToolbar>
        </Form>
    )
}

function SettingPage(props) {
    var proName = props.match.params.pro_name

    return (
        <Container style={{ height: "100%" }}>
            <MainHeader />

            <Container id="main" style={{ backgroundColor: "white", width: "100%", paddingLeft: "10%", paddingRight: "10%" }}>
                <Breadcrumb style={{ marginBottom: "20px", marginTop: "20px" }}>
                    <Breadcrumb.Item><Link to="/home">Projects</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>{proName}</Breadcrumb.Item>
                </Breadcrumb>

                <Sidenavbar contact={{ repo_name: proName }} />
                <Grid style={{ marginTop: 30 }}>
                    <Row>
                        <Col xs={7} />
                        <Col xs={12}>
                            <SettingForm proName={proName} />
                        </Col>
                        <Col xs={3} />
                    </Row>
                </Grid>

            </Container>
        </Container>
    )
};

export default SettingPage