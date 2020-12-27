import React from "react";
import { Nav, Icon, Navbar } from 'rsuite';
import { NavLink, Link } from "react-router-dom";

class HeaderNavbarCompare extends React.Component {
    render() {
        return (
            <Navbar style={{ marginBottom: "30px", paddingLeft: "15%", paddingRight: "15%", display: "flex", justifyContent: "space-around" }}>
                <Navbar.Body>
                    <Nav>
                        <Link to={"/projectsCompare/codeBase"}>
                            <Nav.Item icon={<Icon icon="line-chart" />} style={{marginRight:"25px"}}>Code Base</Nav.Item>
                        </Link>
                        <Link to={"/projectsCompare/codeBase"}>
                            <Nav.Item icon={<Icon icon="attribution" />} style={{marginLeft:"25px", marginRight:"25px"}}>Total Commit</Nav.Item>
                        </Link>
                        <Link to={"/projectsCompare/codeBase"}>
                            <Nav.Item icon={<Icon icon="circle" />} style={{marginLeft:"25px"}}>Week Commit</Nav.Item>
                        </Link>
                    </Nav>
                </Navbar.Body>
            </Navbar>
        )
    }
}
export default HeaderNavbarCompare;