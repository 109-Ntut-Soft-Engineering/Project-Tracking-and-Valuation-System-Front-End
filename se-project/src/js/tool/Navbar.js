import React from "react";
import { Nav, Icon, Navbar } from 'rsuite';
import { NavLink, Link } from "react-router-dom";
import { getCurrentProject } from './CommonTool'
class HeaderNavbar extends React.Component {


    render() {
        var projName = getCurrentProject().name;
        return (
            <Navbar style={{ marginLeft: "20%", marginRight: "20%", marginBottom: "30px", paddingLeft: "15%", paddingRight: "15%", display: "flex", justifyContent: "space-around" }}>
                <Navbar.Body>
                    <Nav>
                        <NavLink to={'/project/repository'}>
                            <Nav.Item icon={<Icon icon="project" />}>ALL Repositories</Nav.Item>
                        </NavLink>
                        <Link to={"/code/" + projName}>
                            <Nav.Item icon={<Icon icon="line-chart" />}>Code Base</Nav.Item>
                        </Link>
                        <Link to={"/commit/" + projName}>
                            <Nav.Item icon={<Icon icon="attribution" />}>Total Commit</Nav.Item>
                        </Link>
                        <Link to={"/committeam/" + projName}>
                            <Nav.Item icon={<Icon icon="circle" />}>Week Commit</Nav.Item>
                        </Link>
                        <Link to={"/issue/" + projName}>
                            <Nav.Item icon={<Icon icon="exclamation-circle2" />}>Issue</Nav.Item>
                        </Link>
                        <Link to={"/project/setting"}>
                            <Nav.Item icon={<Icon icon="cog" />}>Setting</Nav.Item>
                        </Link>
                    </Nav>
                </Navbar.Body>
            </Navbar>
        )
    }
}
export default HeaderNavbar;