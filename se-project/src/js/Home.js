import React from "react";
import { Container} from 'rsuite';
import { FlexboxGrid ,Header, Panel, Dropdown, Icon, IconButton} from 'rsuite';
import '../css/Home&Repo.css';
import Card from './tool/Card.js';
import {Link}  from "react-router-dom";

class Home extends React.Component{
    render(){
        var p_name=["Project Name_106590017","Project Name_106590022","Project Name_106590045","Project Name_106590055"];

        // 將四張卡片放入cards
        var cards = [];
        for (let i = 0; i <= 3; i++) {
            cards.push(
                <Card contact={{name:p_name[i], from_where:"home"}}/>
            );
        }
        return (
            <Container>
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

                <div className="SubTitle">
                    <h3>您的 Project：</h3>
                </div>

                <FlexboxGrid justify="start" className="FlexBox">
                     {/* 四張卡片 */}
                    {cards}

                    {/* 新增專案的卡片 */}
                    <FlexboxGrid.Item style={{width:"20%",margin:"2.5%"}}>
                            <Panel bordered shaded id="Card_AddNew" className="Card">十</Panel>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Container>
        )
    }
}
export default Home;