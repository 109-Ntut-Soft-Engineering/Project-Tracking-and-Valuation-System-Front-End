import React from "react";
import { Header, Dropdown, Icon, Avatar } from 'rsuite';
import { Link } from "react-router-dom";
import { getCurrentUser, setCurrentUser, clearCurrentUser } from '../tool/CommonTool'
import { getUserInfo } from '../api/userAPI';

class MainHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ''
        };

        // this.getUserName();
    }
    componentDidMount() {
        if (getCurrentUser() === null) {
            getUserInfo()
                .then(result => {
                    console.log(result.data.name);
                    setCurrentUser({ user: result.data.name })
                    this.setState({ userName: result.data.name });
                })
        } else {
            this.setState({ userName: getCurrentUser().user });
        }
    }

    render() {
        const { userName } = this.state;
        var userNameText = userName + " 用戶，您好";

        return (

            <Header className="homeHeader" style={{ marginBottom: '50px', boxShadow: '-10px 4px 12px -3px rgba(20%,20%,40%,0.5)' }}>
                <h1 style={{ color: "white" }}>專案管理追蹤系統</h1>
                <div className="UserBox">
                    <h5 className="UserAccount">{userNameText}</h5>

                    <Dropdown renderTitle={() => {
                        return <Avatar circle><Icon icon="user" /></Avatar>
                    }}>

                        <Link style={{ textDecoration: "none" }} to="/user/setting">
                            <Dropdown.Item>Setting</Dropdown.Item>
                        </Link>
                        <Link style={{ textDecoration: "none" }} to="/">
                            <Dropdown.Item onClick={() => { clearCurrentUser()}}>Log Out</Dropdown.Item>
                        </Link>
                    </Dropdown>

                </div>
            </Header>

        )
    }
}
export default MainHeader;