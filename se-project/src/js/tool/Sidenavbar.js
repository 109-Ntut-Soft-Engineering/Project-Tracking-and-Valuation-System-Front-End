import React from "react";
import { Sidenav, Nav, Icon} from 'rsuite';
import {Link}  from "react-router-dom";
class Sidenavbar extends React.Component{
    render(){
        return (
            <div style={{ width: 250, height:"100%" }}>
                <Sidenav style={{height:"100%" }}>
                    <Sidenav.Body>
                        <Nav>
                            <Link to="/code">
                                <Nav.Item icon={<Icon icon="dashboard" />}>Code Base</Nav.Item>
                            </Link>
                            <Link to="/commit">
                                <Nav.Item icon={<Icon icon="dashboard" />}>Total Commit</Nav.Item>
                            </Link>
                            <Link to="/committeam">
                                <Nav.Item icon={<Icon icon="dashboard" />}>Week Commit</Nav.Item>
                            </Link>
                            <Link to="/issue">
                                <Nav.Item icon={<Icon icon="dashboard" />}>Issue</Nav.Item>
                            </Link>
                            <Link to="/repository">
                                <Nav.Item icon={<Icon icon="angle-left" />}>Leave Repo</Nav.Item>
                            </Link>
                            <Link to="/">
                                <Nav.Item icon={<Icon icon="user" />}>Log Out</Nav.Item>
                            </Link>
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </div>
        )
    }
}
export default Sidenavbar;