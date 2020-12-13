import React from "react";
import '../css/Login.css';
import 'rsuite/dist/styles/rsuite-default.css';
import axios from 'axios';
import {
    Message, Button, Panel, Form, FormGroup, ControlLabel, FormControl, ButtonToolbar, Schema
} from 'rsuite';

import { userSignUp, saveUserInfo } from './api/userAPI';

const { StringType } = Schema.Types;
const model = Schema.Model({
    email: StringType()
        .isEmail('請輸入正確Email')
        .isRequired('請輸入Email'),
    password: StringType()
        .isRequired('請輸入密碼')
        .minLength(6, '密碼至少6位數'),
    verifyPassword: StringType()
        .addRule((value, data) => {
            if (value !== data.password) {
                return false;
            }
            return true;
        }, '密碼不相符')
        .isRequired('請再次輸入密碼')
});
const errorPlacement = "bottomEnd"

class SingUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formValue: {
                email: '',
                password: '',
                verifyPassword: ''
            },
            correct: true,
            errMsg: ''
        };
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(value) {
        this.setState({
            formValue: value
        });
    }
    register(formValue) {
        if (this.form.check()) {
            userSignUp({
                email: formValue.email,
                password: formValue.password,
                returnSecureToken: true
            }).then(response => {
                const data = response.data
                window.localStorage.setItem('token',
                    JSON.stringify({
                        idToken: data.idToken,
                        refreshToken: data.refreshToken
                    }))
                saveUserInfo({
                    'name': formValue.email.split('@')[0],
                    'email': formValue.email
                }).then(response => {
                    console.log(response)
                }).catch(err => {
                    console.log(err)
                })
                this.props.history.push("/projects");
            }).catch(err => {
                if (err.response) {
                    const data = err.response.data
                    if (data.error.message === "EMAIL_EXISTS") {
                        this.setState({ errMsg: "此EMail已存在" })
                    } else if (data.error.message.includes("TOO_MANY_ATTEMPTS_TRY_LATER")) {
                        this.setState({ errMsg: "請稍後再試" })
                    }
                    this.setState({ correct: false })
                }
            })
        }
    }

    render() {
        return (
            <Panel header={<h3>註冊</h3>} shaded style={{ backgroundColor: "white" }}>
                <Form ref={ref => (this.form = ref)} model={model} onChange={this.handleChange}
                    formValue={this.state.formValue} fluid>
                    {!this.state.correct && <FormGroup>
                        <Message
                            showIcon
                            type="error"
                            description={this.state.errMsg}
                        />
                    </FormGroup>}
                    <FormGroup>
                        <ControlLabel>電子郵件</ControlLabel>
                        <FormControl name="email" errorPlacement={errorPlacement} />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>密碼</ControlLabel>
                        <FormControl name="password" type="password" errorPlacement={errorPlacement} />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>確認密碼</ControlLabel>
                        <FormControl name="verifyPassword" type="password" errorPlacement={errorPlacement} />
                    </FormGroup>
                    <FormGroup>
                        <ButtonToolbar>
                            <Button appearance="primary" onClick={() => this.register(this.state.formValue)}>註冊</Button>
                            <Button appearance="default" onClick={this.props.switch}>已有帳號?</Button>
                        </ButtonToolbar>
                    </FormGroup>
                </Form>

            </Panel>

        )
    }
}
export default SingUp;