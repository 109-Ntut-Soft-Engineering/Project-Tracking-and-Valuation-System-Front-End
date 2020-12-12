import React, {useState} from 'react';
import Sidenavbar from "./tool/Sidenavbar";
import { Container, Breadcrumb } from 'rsuite';
import { Grid, Row, Col } from 'rsuite';
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, ButtonToolbar, Button,
     IconButton, Icon, Modal, Input} from 'rsuite';
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

// functoin handleAddContributor(){

// }

function SettingForm(props) {
    const creator = '陳俊偉'
    const [isOpen, setIsOpen]= useState(false)

    function renderContributor(){
        const names = ['test', 'test2', 'test3', 'test4', 'test5', 'test6']
        console.log('names', names)
        var row = []
        var col = []
        for(var i=0; i<names.length; i++){
            col.push(
                <div style={{width: 100, marginLeft: 20}}><p>{names[i]}</p></div>
            )
            if (col.length === 3){
                row.push(
                    <div style={{display:'flex', justifyContent: 'flex-start'}}>
                        {col}
                    </div>
                )
                col = []
            }
            else if (i === names.length-1){
                row.push(
                    <div style={{display:'flex', justifyContent: 'flex-start'}}>
                        {col}
                    </div>
                )
                col = []
            }
        }
        return (
            <div style={{marginTop: 10}}>
                {row}
            </div>
        )
    }
    
    return (
        <Form layout="inline">
            <FormGroup>
                <ControlLabel style={{ width: 100 }}>ProjectName</ControlLabel>
                <FormControl name="username" value={props.proName} style={{ width: 350 }} />
                <HelpBlock tooltip>Required</HelpBlock>
            </FormGroup>
            <FormGroup>
                <ControlLabel style={{ width: 100 }}>Creator</ControlLabel>
                <FormControl name="token" style={{ width: 350 }} disabled={true} value={creator}/>
            </FormGroup>
            <FormGroup>
                <ControlLabel style={{ width: 100}}>GitHub串連</ControlLabel>
                <Button color='default' onClick={oAuth} style={{marginLeft: 10}}>
                    授權 GitHub
                </Button>
            </FormGroup>

            <FormGroup>
                <FormGroup>
                    <ControlLabel style={{ width: 100 }}>Contributor</ControlLabel>
                    <IconButton icon={<Icon icon='plus'/>} color='default' 
                                style={{marginLeft: 10}} onClick={()=>{setIsOpen(true)}}/>
                </FormGroup>
                {renderContributor()}
            </FormGroup>
            <ButtonToolbar>
                <Button color='primary'>
                    Save
                </Button>
                <Button color='red'>
                    Delete
                </Button>
            </ButtonToolbar>
            <Modal backdrop={true} show={isOpen} size="xs">
                    <Modal.Header>
                        <Modal.Title>新增 Contributor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div >
                            <p style={{paddingTop:"6px",marginLeft:"20px",marginBottom:"15px"}}>輸入要加入的contributor</p>
                            <Input style={{ width:300,marginLeft:"20px"}} placeholder="New contributor name" />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={()=>{setIsOpen(false)}} appearance="primary">確認</Button>
                        <Button onClick={()=>{setIsOpen(false)}} appearance="subtle">取消</Button>
                    </Modal.Footer>
            </Modal>
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