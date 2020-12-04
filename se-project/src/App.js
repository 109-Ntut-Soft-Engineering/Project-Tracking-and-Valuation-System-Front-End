import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from './js/Home';
import Login from './js/Login';
import ContributionCommit from './js/ContributionCommit'
import CommitPage from './js/CommitPage'
import CodeFrequency from './js/CodeFreqency'
import IssueDashboard from './js/IssueDashboard'
import Repository from './js/Repository'
import SettingPage from './js/SettingPage'
class App extends React.Component {
    render() {
        return (
            <Router>
                <div style={{ height: "100%" }}>
                    <Route exact path="/" component={Login} />
                    <Route path="/home" component={Home} />

                    <Route path="/repository" component={Repository} />
                    <Route path="/code/:pro_name" component={CodeFrequency} />

                    <Route path="/commit/:pro_name" component={CommitPage} />
                    <Route path="/committeam/:pro_name" component={ContributionCommit} />
                    <Route path="/issue/:pro_name" component={IssueDashboard} />
                    <Route path='/setting/:pro_name' component={SettingPage} />
                </div>
            </Router>
        )
    }
}
export default App;
