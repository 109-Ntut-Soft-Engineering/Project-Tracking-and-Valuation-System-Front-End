import React from "react";
import '../css/Login.css';
import 'rsuite/dist/styles/rsuite-default.css';
import bk from '../img/background.png';

import {
  FlexboxGrid, Button, Panel, Form, FormGroup, ControlLabel, FormControl, ButtonToolbar, Schema
} from 'rsuite';

const { StringType } = Schema.Types;
const model = Schema.Model({
  password: StringType().isRequired('請輸入密碼'),
  email: StringType()
    .isEmail('請輸入正確Email')
    .isRequired('請輸入Email')
});


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        email: '',
        password: ''
      },
      show: true
    };
    this.handleChange = this.handleChange.bind(this);

  }
  handleChange(value) {
    this.setState({
      formValue: value
    });
  }
  login(formValue) {
    //console.log(formValue)
    const req = new Request('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSx_sJAvz0AmmffTDwODGAioXfyqP4Foc'
      , {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'text/json'
        }),
        body: JSON.stringify(
          {
            email: formValue.email,
            password: formValue.password,
            returnSecureToken: true
          }
        )
      })

    fetch(req)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response.json()
            .then(e => {
              return e.error.message
            })
        }
      })
      .then(responseJson => {
        //console.log(responseJson)
        window.localStorage.setItem('token', JSON.stringify(responseJson))
      })
      .catch(err => {
        err.then(msg => {
          console.log(msg)
        })
      })
  }

  render() {
    return (
      <FlexboxGrid justify="space-around" align="middle" style={{ height: "100%", padding: "7%" }}>
        <FlexboxGrid.Item >
          <img src={bk} alt="Background" style={{ height: "60vh", width: "auto" }} />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={6}>
          <h2 style={{ color: "white", marginBottom: "20px", justifySelf: "center" }}>專案管理追蹤系統</h2>
          <Panel header={<h3>登入</h3>} shaded style={{ backgroundColor: "white" }}>
            {this.state.show && <Form model={model} onChange={this.handleChange}
              formValue={this.state.formValue} fluid>
              <FormGroup>
                <ControlLabel>電子郵件</ControlLabel>
                <FormControl name="email" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>密碼</ControlLabel>
                <FormControl name="password" type="password" />
              </FormGroup>
              <FormGroup>
                <ButtonToolbar>
                  <Button appearance="primary" onClick={() => this.login(this.state.formValue)}>登入</Button>
                  <Button appearance="second" onClick={() => this.setState({ show: false })}>註冊</Button>
                </ButtonToolbar>
              </FormGroup>
            </Form>
            }
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    )
  }
}
export default Login;