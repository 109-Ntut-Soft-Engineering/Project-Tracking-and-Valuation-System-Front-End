import React from "react";
import { Header, Dropdown ,IconButton,Icon} from 'rsuite';
import {Link}  from "react-router-dom";

class MainHeader extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Header className="homeHeader">
                <h1 style={{color:"white"}}>專案管理追蹤系統</h1>
                <div className="UserBox"> 
                    <h5 className="UserAccount">will8456835用戶，您好</h5>
                    <Dropdown   renderTitle={children => {return <IconButton icon={<Icon icon="user" />} />;}}>
                        <Link style={{textDecoration:"none"}} to="/">
                            <Dropdown.Item>Log Out</Dropdown.Item>
                        </Link>
                    </Dropdown>
                </div>
            </Header>
        )
    }
}
export default MainHeader;