import React from "react";
import '../css/Login.css';
import 'rsuite/dist/styles/rsuite-default.css';
import { userLogin } from './api/userAPI';

import {
    Button, Panel, Form, FormGroup, ControlLabel, FormControl, ButtonToolbar, Schema, Message
} from 'rsuite';

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
            console.log(formValue)
            userLogin({
                email: formValue.email,
                password: formValue.password
                // returnSecureToken: true
            }).then(response => {

                const data = response.data
                window.localStorage.setItem('token',
                    JSON.stringify({
                        idToken: data.idToken,
                        refreshToken: data.refreshToken
                    }))
                this.props.history.push("/projects");
                this.setState({ correct: true })

            }).catch(err => {
                if (err.response) {
                    const error = err.response.data.error
                    this.setState({ errMsg: error, correct: false })
                }
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
