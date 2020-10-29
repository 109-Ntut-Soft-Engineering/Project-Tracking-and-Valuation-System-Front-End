import React from 'react';
import {Container} from 'rsuite';
import Sidenavbar from './tool/Sidenavbar';


class IssueDashboard extends React.Component{
    render(){
        return(
            <Container style={{height:"100%", display:"flex", flexDirection:"row"}}>
                <Sidenavbar />
            </Container>
        )
    }
}

export default IssueDashboard;