import React from "react";
import '../css/Login.css';
import 'rsuite/dist/styles/rsuite-default.css';
import bk from '../img/background.png';
import { Link } from "react-router-dom";
import {
  FlexboxGrid, Button, Panel, Form, FormGroup, ControlLabel, FormControl, ButtonToolbar
} from 'rsuite';


class Login extends React.Component {
  render() {
    return (
      <FlexboxGrid justify="space-around" align="middle" style={{ height: "100%", padding: "7%" }}>
        <FlexboxGrid.Item >
          <img src={bk} alt="Background" style={{ height: "60vh", width: "auto" }} />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={8}>
          <h2 style={{ color: "white", marginBottom: "20px", justifySelf: "center" }}>專案管理追蹤系統</h2>
          <Panel header={<h3>登入</h3>} shaded style={{ backgroundColor: "white" }}>
            <Form fluid>
              <FormGroup>
                <ControlLabel>電子郵件</ControlLabel>
                <FormControl name="name" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>密碼</ControlLabel>
                <FormControl name="password" type="password" />
              </FormGroup>
              <FormGroup>
                <ButtonToolbar>
                  <Link to="/home">
                    <Button appearance="primary">登入</Button>
                  </Link>
                  <Button appearance="link">忘記密碼?</Button>
                </ButtonToolbar>
              </FormGroup>
            </Form>
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    )
  }
}
export default Login;