import React from "react";

import { BrowserRouter, Route, Router } from "react-router-dom";
import Home from './js/Home';
import Login from './js/Login';
import CommitPage from './js/CommitPage'
import CodeFrequency from './js/CodeFreqency'
import IssueDashboard from './js/IssueDashboard'
import Repository from './js/Repository'
import SettingPage from './js/SettingPage'
import Redirect from './js/Redirect'
import WeekCommit from "./js/WeekCommit";
class App extends React.Component {
    render() {
        return (
            <BrowserRouter >
                <div style={{ height: "100%" }}>
                    <Route path='/redirect/' component={Redirect} />
                    <Route exact path="/" component={Login} />
                    <Route path="/home" component={Home} />

                    <Route path="/repository" component={Repository} />
                    <Route path="/code/:pro_name" component={CodeFrequency} />

                    <Route path="/commit/:pro_name" component={CommitPage} />
                    <Route path="/weekcommit/:pro_name" component={WeekCommit} />
                    <Route path="/issue/:pro_name" component={IssueDashboard} />
                    <Route path='/setting/:pro_name' component={SettingPage} />

                </div>
            </BrowserRouter>
        )
    }
}
export default App;
