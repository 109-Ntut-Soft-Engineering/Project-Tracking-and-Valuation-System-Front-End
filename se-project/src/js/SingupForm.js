import React from "react";
import '../css/Login.css';
import 'rsuite/dist/styles/rsuite-default.css';

import {
    Message, Button, Panel, Form, FormGroup, ControlLabel, FormControl, ButtonToolbar, Schema
} from 'rsuite';
import { APIKey } from "./tool/Token";

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
            const req = new Request('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + APIKey
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
                })
                .catch(err => {
                    err.json().then(msg => {
                        console.log(msg)
                        if (msg.error.message === "EMAIL_EXISTS") {
                            this.setState({ errMsg: "此EMail已存在" })
                        } else if (msg.error.message.includes("TOO_MANY_ATTEMPTS_TRY_LATER")) {
                            this.setState({ errMsg: "請稍後再試" })
                        }
                        this.setState({ correct: false })
                    })
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