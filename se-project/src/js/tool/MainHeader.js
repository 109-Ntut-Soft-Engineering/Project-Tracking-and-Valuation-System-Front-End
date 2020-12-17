import React from "react";
import { Header, Dropdown, IconButton, Icon } from 'rsuite';
import { Link } from "react-router-dom";
// import { getUserInfo } from '../api/userAPI';

class MainHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "寫到一半"
        };

        // this.getUserName();
    }

    // getUserName(){
    //     getUserInfo()
    //         .then(result => {
    //             console.log(result.data.name);
    //             this.setState({ userName: result.data.name});
    //             return result.data.name;
    //         })
    // }
    render() {
        const { userName } = this.state;
        var userNameText = userName + " 用戶，您好";

        return (

            <Header className="homeHeader" style={{ marginBottom: '50px', boxShadow: '-10px 4px 12px -3px rgba(20%,20%,40%,0.5)' }}>
                <h1 style={{ color: "white" }}>專案管理追蹤系統</h1>
                <div className="UserBox">
                    <h5 className="UserAccount">{userNameText}</h5>
                    <Dropdown renderTitle={children => { return <IconButton icon={<Icon icon="user" />} />; }}>
                        <Link style={{ textDecoration: "none" }} to="/Setting">
                            <Dropdown.Item>Setting</Dropdown.Item>
                        </Link>
                        <Link style={{ textDecoration: "none" }} to="/">
                            <Dropdown.Item>Log Out</Dropdown.Item>
                        </Link>
                    </Dropdown>
                </div>
            </Header>

        )
    }
}
export default MainHeader;