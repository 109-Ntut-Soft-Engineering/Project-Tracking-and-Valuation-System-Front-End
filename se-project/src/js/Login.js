import React from "react";
import '../css/Login.css';
import 'rsuite/dist/styles/rsuite-default.css';
import bk from '../img/background.png';

import { FlexboxGrid } from 'rsuite';
import SingUp from "./SingupForm";
import SingIn from "./SingInForm";


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: true
    };
    this.switch = this.switch.bind(this);

  }

  switch() {
    this.setState({ showLogin: !this.state.showLogin })
  }

  render() {
    return (
      <FlexboxGrid justify="space-around" align="middle" style={{ height: "100%", padding: "7%" }}>
        <FlexboxGrid.Item >
          <img src={bk} alt="Background" style={{ height: "60vh", width: "auto" }} />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={7}>
          <h2 style={{ color: "white", marginBottom: "20px", justifySelf: "center" }}>專案管理追蹤系統</h2>
          {!this.state.showLogin && <SingUp history={this.props.history} switch={this.switch} />}
          {this.state.showLogin && <SingIn history={this.props.history} switch={this.switch} />}
        </FlexboxGrid.Item>
      </FlexboxGrid>
    )
  }
}
export default Login;