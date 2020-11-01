import React from "react";
import { HashRouter as Router, Route} from "react-router-dom";
import Home from './js/Home';
import Login from './js/Login';
<<<<<<< HEAD
import Codevariation from './js/Codevariation'
import CommitPage from './js/CommitPage'
=======
import CodeVariation from './js/Codevariation'
import IssueDashboard from './js/IssueDashboard'

>>>>>>> 4722a921c80a6043738f73b9a45045e216fb3d02

class App extends React.Component{
    render(){
        return (
            <Router>
                <div style={{height:"100%"}}> 
                    <Route exact path="/" component={Login}/>

                    <Route path="/home" component={Home}/>

<<<<<<< HEAD
                    <Route path="/code" component={Codevariation}/>
                    
                    <Route path="/commit" component={CommitPage} />
=======
                    <Route path="/code" component={CodeVariation}/>
                    <Route path="/issues" component={IssueDashboard}/>
>>>>>>> 4722a921c80a6043738f73b9a45045e216fb3d02
                </div>
            </Router>
        )
    }
}
export default App;

