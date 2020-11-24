import React from "react";
import '../css/Login.css';
import 'rsuite/dist/styles/rsuite-default.css';

import {
    Button, Panel, Form, FormGroup, ControlLabel, FormControl, ButtonToolbar, Schema, Message
} from 'rsuite';
import { APIKey } from "./tool/Token";
const { StringType } = Schema.Types;
const model = Schema.Model({
    password: StringType()
        .isRequired('請輸入密碼'),
    email: StringType()
        .isEmail('請輸入正確Email')
        .isRequired('請輸入Email')
});
const errorPlacement = "bottomEnd"

class SingIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formValue: {
                email: '',
                password: ''
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
    login(formValue) {
        if (this.form.check()) {
            const req = new Request('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + APIKey
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
                        throw response
                    }
                })
                .then(responseJson => {
                    //console.log(responseJson)
                    window.localStorage.setItem('token', JSON.stringify(responseJson))
                    this.props.history.push("/home");
                    this.setState({ correct: true })

                })
                .catch(err => {
                    err.json().then(msg => {
                        console.log(msg)
                        if (msg.error.message === "INVALID_PASSWORD") {
                            this.setState({ errMsg: "密碼錯誤" })
                        } else if (msg.error.message.includes("TOO_MANY_ATTEMPTS_TRY_LATER")) {
                            this.setState({ errMsg: "請稍後再試" })
                        } else if (msg.error.message === "EMAIL_NOT_FOUND") {
                            this.setState({ errMsg: "此帳號不存在" })
                        }
                        this.setState({ correct: false })

                    })
                })
        }
    }

    render() {
        return (
            <Panel header={<h3>登入</h3>} shaded style={{ backgroundColor: "white" }}>
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
                        <FormControl checkAsync name="password" type="password" errorPlacement={errorPlacement} />
                    </FormGroup>
                    <FormGroup>
                        <ButtonToolbar>
                            <Button appearance="primary" onClick={() => this.login(this.state.formValue)}>登入</Button>
                            <Button appearance="default" onClick={this.props.switch}>註冊</Button>
                        </ButtonToolbar>
                    </FormGroup>
                </Form>

            </Panel>

        )
    }
}
export default SingIn;