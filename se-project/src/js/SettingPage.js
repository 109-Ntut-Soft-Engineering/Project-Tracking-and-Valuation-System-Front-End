import React from 'react';
import Sidenavbar from "./tool/Sidenavbar";
import {Container, Breadcrumb} from 'rsuite'; 
import { Grid, Row, Col } from 'rsuite';
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, ButtonToolbar, Button } from 'rsuite';
import {Link}  from "react-router-dom";
import MainHeader from './tool/MainHeader'

function SettingForm(props){
    return(
        <Form layout="inline">
            <FormGroup>
                <ControlLabel style={{width: 100}}>ProjectName</ControlLabel>
                <FormControl name="username" value={props.proName} style={{ width: 300}} />
                <HelpBlock tooltip>Required</HelpBlock>
            </FormGroup>
            <FormGroup>
                <ControlLabel style={{width: 100}}>Token</ControlLabel>                              
                <FormControl name="token"  style={{width: 300}} />
                <HelpBlock tooltip>Required</HelpBlock>
            </FormGroup>
            <ButtonToolbar>
                <Button>
                    Save
                </Button>
            </ButtonToolbar>
        </Form>
    )
}

function SettingPage(props){
    var proName = props.match.params.pro_name

    return (
        <Container style={{height:"100%"}}>
                <MainHeader/>

				<Container id="main" style={{backgroundColor:"white",width:"100%",paddingLeft:"10%", paddingRight:"10%"}}>
                    <Breadcrumb style={{marginBottom:"20px", marginTop:"20px"}}>
                        <Breadcrumb.Item><Link to="/home">Projects</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>{proName}</Breadcrumb.Item>
                    </Breadcrumb>

                    <Sidenavbar contact={{repo_name:proName}}/>
                    <Grid style={{marginTop: 30}}>
                        <Row>
                            <Col xs={8}/>
                            <Col xs={10}>
                                <SettingForm proName={proName}/>
                            </Col>
                            <Col xs={3} />
                        </Row>
                    </Grid>
                    
				</Container>
            </Container>
    )
};

export default SettingPage