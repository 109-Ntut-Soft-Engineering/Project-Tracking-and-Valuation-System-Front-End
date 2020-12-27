import React from "react";

import { BrowserRouter, Route, Router } from "react-router-dom";
import Home from './js/Home';
import Login from './js/Login';
import SettingPage from './js/SettingPage'
import Redirect from './js/Redirect'
import UserSettingPage from './js/UserSettingPage'

import CommitPage from './js/VRS_pages/CommitPage'
import CodeFrequency from './js/VRS_pages/CodeFreqency'
import IssueDashboard from './js/VRS_pages/IssueDashboard'
import Repository from './js/VRS_pages/Repository'
import WeekCommit from "./js/VRS_pages/WeekCommit";


import CodeFrequencyCompare from './js/VRS_compare_pages/CodeFrequencyCompare'

class App extends React.Component {

    render() {
        return (
            <BrowserRouter >
                <div style={{ height: "100%" }}>
                    <Route path='/redirect/' component={Redirect} />
                    <Route exact path="/" component={Login} />
                    <Route path="/projects" component={Home} />
                    <Route path="/project/repository" component={Repository} />
                    <Route path="/project/codeBase" component={CodeFrequency} />

                    <Route path="/project/commit" component={CommitPage} />
                    <Route path="/project/weekCommit" component={WeekCommit} />
                    <Route path="/project/issue" component={IssueDashboard} />
                    <Route path='/project/setting' component={SettingPage} />
                    <Route path='/user/setting' component={UserSettingPage} />

                    <Route path='/projectsCompare/codeBase' component={CodeFrequencyCompare} />
                </div>
            </BrowserRouter>
        )
    }
}
export default App;
