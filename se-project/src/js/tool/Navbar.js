import React from "react";
import { Nav, Icon, Navbar } from 'rsuite';
import { NavLink, Link } from "react-router-dom";
class HeaderNavbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var proName = this.props.contact.pro_name;
        return (
            <Navbar style={{ paddingLeft: "10%", paddingRight: "15%", display: "flex", justifyContent: "space-around" }}>
                <Navbar.Body>
                    <Nav>
                        <NavLink to={'/project/repository'}>
                            <Nav.Item icon={<Icon icon="project" />}>ALL Repositories</Nav.Item>
                        </NavLink>
                        <Link to={"/code/" + proName}>
                            <Nav.Item icon={<Icon icon="line-chart" />}>Code Base</Nav.Item>
                        </Link>
                        <Link to={"/commit/" + proName}>
                            <Nav.Item icon={<Icon icon="attribution" />}>Total Commit</Nav.Item>
                        </Link>
                        <Link to={"/committeam/" + proName}>
                            <Nav.Item icon={<Icon icon="circle" />}>Week Commit</Nav.Item>
                        </Link>
                        <Link to={"/issue/" + proName}>
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