import React from "react";
import { Nav, Icon, Navbar } from 'rsuite';
import { NavLink, Link } from "react-router-dom";

class HeaderNavbar extends React.Component {
    render() {
        return (
            <Navbar style={{ marginBottom: "30px", paddingLeft: "15%", paddingRight: "15%", display: "flex", justifyContent: "space-around" }}>
                <Navbar.Body>
                    <Nav>
                        <NavLink to={'/project/repository'}>
                            <Nav.Item icon={<Icon icon="project" />}>ALL Repositories</Nav.Item>
                        </NavLink>
                        <Link to={"/project/codeBase"}>
                            <Nav.Item icon={<Icon icon="line-chart" />}>Code Base</Nav.Item>
                        </Link>
                        <Link to={"/project/commit"}>
                            <Nav.Item icon={<Icon icon="attribution" />}>Total Commit</Nav.Item>
                        </Link>
                        <Link to={"/project/weekCommit"}>
                            <Nav.Item icon={<Icon icon="circle" />}>Week Commit</Nav.Item>
                        </Link>
                        <Link to={"/project/issue"}>
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