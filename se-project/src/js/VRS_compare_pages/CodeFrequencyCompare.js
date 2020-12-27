import React, {Component} from 'react'
import { getCurrentCompareProjects } from '../tool/CommonTool';

class CodeFrequencyCompare extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentCompareProjects: getCurrentCompareProjects(),
            data: undefined,
        }
    }
    render(){
        return (
            <div>
                <h1> Code Frequency Compare</h1>
                <h4> project1 id : {this.state.currentCompareProjects.id1} </h4>
                <h4> project1 nmae : {this.state.currentCompareProjects.name1} </h4>
                <h4> project2 id : {this.state.currentCompareProjects.id2} </h4>
                <h4> project1 nmae2 : {this.state.currentCompareProjects.name2} </h4>
            </div>
        )
    }
}
export default CodeFrequencyCompare;