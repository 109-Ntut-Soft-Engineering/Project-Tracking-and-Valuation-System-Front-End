import React from 'react';
import { Container, Breadcrumb } from 'rsuite';
import Sidenavbar from './tool/Sidenavbar';
import { Link } from "react-router-dom";
import ExpandedTable from './tool/ExpandedTable'
import MainHeader from './tool/MainHeader'

const data = [{
    id: "001", title: "issue_test001", user: "Tony@gmail.com", date: "2020-10-21", discription: "This is test issue 001"
}, {
    id: "002", title: "issue_test002", user: "Ken@gmail.com", date: "2020-10-22", discription: "This is test issue 002"
}, {
    id: "003", title: "issue_test003", user: "Bob@gmail.com", date: "2020-11-01", discription: "This is test issue 003"
}, {
    id: "004", title: "issue_test004", user: "Ancle@gmail.com", date: "2020-10-10", discription: "This is test issue 004"
}]

class IssueDashboard extends React.Component {

    render() {
        var proName = this.props.match.params.pro_name;
        return (
            <Container style={{ height: "100%" }}>
                <MainHeader />
                <Container style={{ backgroundColor: "white", width: "100%", paddingLeft: "10%", paddingRight: "10%" }}>
                    <Breadcrumb style={{ marginBottom: "20px", marginTop: "20px" }}>
                        <Breadcrumb.Item><Link to="/projects">Projects</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>{proName}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Sidenavbar contact={{ pro_name: proName }} />
                    <div style={{ marginTop: "30px" }}>
                        <ExpandedTable data={data} height={window.innerHeight * 0.65}></ExpandedTable>
                    </div>
                </Container>
            </Container>
        )
    }
}

export default IssueDashboard;