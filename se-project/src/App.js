import React from "react";

import { BrowserRouter, Route } from "react-router-dom";
import Home from './js/Home';
import Login from './js/Login';
import ContributionCommit from './js/ContributionCommit'
import CommitPage from './js/CommitPage'
import CodeVariation from './js/Codevariation'
import IssueDashboard from './js/IssueDashboard'
import Repository from './js/Repository'
import SettingPage from './js/SettingPage'
import Redirect from './js/Redirect'
class App extends React.Component {
    render() {
        return (
            <BrowserRouter >
                <div style={{ height: "100%" }}>
                    <Route path='/redirect/' component={Redirect} />
                    <Route exact path="/" component={Login} />
                    <Route path="/home" component={Home} />
                    <Route path="/repository/:pro_name" component={Repository} />
                    <Route path="/code/:pro_name" component={CodeVariation} />
                    <Route path="/commit/:pro_name" component={CommitPage} />
                    <Route path="/committeam/:pro_name" component={ContributionCommit} />
                    <Route path="/issue/:pro_name" component={IssueDashboard} />
                    <Route path='/setting/:pro_name' component={SettingPage} />

                </div>
            </BrowserRouter>
        )
    }
}
export default App;
