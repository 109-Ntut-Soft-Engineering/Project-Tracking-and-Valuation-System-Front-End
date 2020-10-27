import React from "react";
import { Sidenav, Nav, Icon} from 'rsuite'
import {Link}  from "react-router-dom";
class Sidenavbar extends React.Component{
    render(){
        return (
            <div style={{ width: 250, height:"100%" }}>
                <Sidenav style={{height:"100%" }}>
                    <Sidenav.Body>
                        <Nav>
                            <Link to="/">
                                <Nav.Item icon={<Icon icon="group" />}>Log Out</Nav.Item>
                            </Link>
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </div>
        )
    }
}
export default Sidenavbar;