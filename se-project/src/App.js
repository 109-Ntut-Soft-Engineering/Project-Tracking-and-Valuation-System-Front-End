import React from "react";
import { HashRouter as Router, Route} from "react-router-dom";
import Home from './js/Home';
import Login from './js/Login';

class App extends React.Component{
    render(){
        return (
            <Router>
                <div style={{height:"100%"}}> 
                    <Route exact path="/" component={Login}/>

                    <Route path="/home" component={Home}/>
                </div>
            </Router>
        )
    }
}
export default App;

