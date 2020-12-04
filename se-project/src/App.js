import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from './js/Home';
import Login from './js/Login';
import ContributionCommit from './js/ContributionCommit'
import CommitPage from './js/CommitPage'
import CodeVariation from './js/Codevariation'
import IssueDashboard from './js/IssueDashboard'
import Repository from './js/Repository'

class App extends React.Component {
    render() {
        return (
            <Router>
                <div style={{ height: "100%" }}>
                    <Route exact path="/" component={Login} />
                    <Route path="/home" component={Home} />
                    <Route path="/repository/:pro_name" component={Repository} />
                    <Route path="/code/:pro_name" component={CodeVariation} />
                    <Route path="/commit/:pro_name" component={CommitPage} />
                    <Route path="/committeam/:pro_name" component={ContributionCommit} />
                    <Route path="/issue/:pro_name" component={IssueDashboard} />
                </div>
            </Router>
        )
    }
}
export default App;
