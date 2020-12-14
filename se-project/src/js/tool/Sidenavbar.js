import React from "react";
import { Nav, Icon, Navbar } from 'rsuite';
import { NavLink, Link } from "react-router-dom";
class Sidenavbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var proName = this.props.contact.pro_name;
        return (
            <Navbar style={{ width: "100%", paddingLeft: "10%", paddingRight: "15%", display: "flex", justifyContent: "space-around" }}>
                <Navbar.Body>
                    <Nav>
                        <NavLink to={'/repository'}>
                            <Nav.Item icon={<Icon icon="dashboard" />}>ALL Repositories</Nav.Item>
                        </NavLink>
                        <Link to={"/code/" + proName}>
                            <Nav.Item icon={<Icon icon="dashboard" />}>Code Base</Nav.Item>
                        </Link>
                        <Link to={"/commit/" + proName}>
                            <Nav.Item icon={<Icon icon="dashboard" />}>Total Commit</Nav.Item>
                        </Link>
                        <Link to={"/committeam/" + proName}>
                            <Nav.Item icon={<Icon icon="dashboard" />}>Week Commit</Nav.Item>
                        </Link>
                        <Link to={"/issue/" + proName}>
                            <Nav.Item icon={<Icon icon="dashboard" />}>Issue</Nav.Item>
                        </Link>
                        <Link to={"/setting/" + proName}>
                            <Nav.Item icon={<Icon icon="dashboard" />}>Setting</Nav.Item>
                        </Link>
                    </Nav>
                </Navbar.Body>
            </Navbar>
        )
    }
}
export default Sidenavbar;