import React from "react";
import { HashRouter as Router, Route} from "react-router-dom";
import Home from './js/Home';
import Login from './js/Login';
import CodeVariation from './js/Codevariation'
import IssueDashboard from './js/IssueDashboard'
import ContributionCommit from './js/ContributionCommit'


class App extends React.Component{
    render(){
        return (
            <Router>
                <div style={{height:"100%"}}> 
                    <Route exact path="/" component={Login}/>

                    <Route path="/home" component={Home}/>

                    <Route path="/committeam" component={ContributionCommit}/>

                    <Route path="/code" component={CodeVariation}/>
                    <Route path="/issue" component={IssueDashboard}/>
                </div>
            </Router>
        )
    }
}
export default App;

