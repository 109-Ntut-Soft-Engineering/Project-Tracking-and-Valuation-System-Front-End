import React from 'react';
import {Container} from 'rsuite';
import Sidenavbar from './tool/Sidenavbar';
import ExpandedTable from './tool/ExpandedTable'

const data =  [{
    id: "001", title: "issue_test001", user: "Tony@gmail.com", date:"2020-10-21", discription: "This is test issue 001"
},{
    id: "002", title: "issue_test002", user: "Ken@gmail.com", date:"2020-10-22", discription: "This is test issue 002"
},{
    id: "003", title: "issue_test003", user: "Bob@gmail.com", date:"2020-11-01", discription: "This is test issue 003"
},{
    id: "004", title: "issue_test004", user: "Ancle@gmail.com", date:"2020-10-10", discription: "This is test issue 004"
}]

class IssueDashboard extends React.Component{
    
    render(){
        var repoName = this.props.match.params.repo_name;
        return(
            <Container style={{height:"100%", display:"flex", flexDirection:"row"}}>
                <Sidenavbar contact={{repo_name:repoName}}/>
                <Container style={{height:"100%", width:"100%", flexDirection:"col"}}>
                    <div style={{width:"100%", paddingTop:"30px", paddingBottom:"40px", backgroundImage: "linear-gradient(-225deg, #22E1FF 0%, #1D8FE1 48%, #625EB1 100%)", color:"white", textAlign:"center"}}>
                        <h1>{repoName}</h1>    
                    </div>
                    <div>
                        <ExpandedTable data={data} height={window.innerHeight*0.85}></ExpandedTable>
                    </div>
                </Container>
            </Container>
        )
    }
}

export default IssueDashboard;