import React from "react";
import {Nav, Icon,Navbar, Dropdown, IconButton, } from 'rsuite';
import {Link}  from "react-router-dom";
class Sidenavbar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        var repoName = this.props.contact.repo_name;
        return (
            <Navbar style={{width:"100%",paddingLeft:"10%",paddingRight:"15%",display:"flex",justifyContent:"space-around"}}>
                <Navbar.Body>
                <Nav>
                    {/* <Link to="/home">
                        <Nav.Item icon={<Icon icon="angle-left" />}>Leave Project</Nav.Item>
                    </Link> */}
                    <Link to={"/code/" + repoName}>
                        <Nav.Item icon={<Icon icon="dashboard" />}>ALL Repositories</Nav.Item>
                    </Link>
                    <Link to={"/code/" + repoName}>
                        <Nav.Item icon={<Icon icon="dashboard" />}>Code Base</Nav.Item>
                    </Link>
                    <Link to={"/commit/" + repoName}>
                        <Nav.Item icon={<Icon icon="dashboard" />}>Total Commit</Nav.Item>
                    </Link>
                    <Link to={"/committeam/" + repoName}>
                        <Nav.Item icon={<Icon icon="dashboard" />}>Week Commit</Nav.Item>
                    </Link>
                    <Link to={"/issue/" + repoName}>
                        <Nav.Item icon={<Icon icon="dashboard" />}>Issue</Nav.Item>
                    </Link>
                    <Link to={ "/setting/" + repoName}>
                        <Nav.Item icon={<Icon icon="cog" />}>Setting</Nav.Item>
                    </Link>
                </Nav>
                </Navbar.Body>
            </Navbar>
        )
    }
}
export default Sidenavbar;