import './Login.css';
import 'rsuite/dist/styles/rsuite-default.css';
import bk from './img/background.png'

//import { Container, Header, Content, Footer, Sidebar } from 'rsuite';
import {
  FlexboxGrid, Button, Panel, Form, FormGroup, ControlLabel, FormControl, ButtonToolbar
} from 'rsuite';



const instance = (

  <FlexboxGrid justify="space-around" align="middle" style={{ height: "100%" }}>
    <FlexboxGrid.Item >
      <img src={bk} alt="Background" style={{ height: "400px", width: "auto" }} />
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
              <Button appearance="primary">登入</Button>
              <Button appearance="link">忘記密碼?</Button>
            </ButtonToolbar>
          </FormGroup>
        </Form>
      </Panel>
    </FlexboxGrid.Item>
  </FlexboxGrid>

);
function App() {
  return instance;
}

export default App;
