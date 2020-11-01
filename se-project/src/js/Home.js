import React from "react";
import Sidenavbar from "./tool/Sidenavbar";
import { Container,Content} from 'rsuite';

class Home extends React.Component{
    render(){
        return (
            <Container style={{height:"100%", display:"flex", flexDirection:"row"}}>
                <Sidenavbar style={{height:"100%"}}/>
                <Container>
                    <h1>首頁</h1>
                    <Content>Content</Content>
                </Container>
            </Container>
        )
    }
}
export default Home;