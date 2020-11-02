import React from "react";
import { Container} from 'rsuite';
import { FlexboxGrid ,Header, Panel, Dropdown, Icon, IconButton} from 'rsuite';
import '../css/Home&Repo.css';
import Card from './tool/Card.js';
import {Link}  from "react-router-dom";

class Repository extends React.Component{
    render(){
        var r_name=["Repository frontEnd","Repository backEnd","Repository database"];

        // 將四張卡片放入cards
        var cards = [];
        for (let i = 0; i <= 2; i++) {
            cards.push(
                <Card contact={{name:r_name[i], from_where:"repo"}}/>
            );
        }
        return (
            <Container>
                <Header className="homeHeader">
                    <div className="TitleBox">
                        <Link to="/home"><Icon inverse='true' size='5x' icon='angle-left'/></Link>
                        <h1 style={{color:"white",marginLeft:"20px"}}>  專案管理追蹤系統</h1>
                    </div>
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
                    <h3>您的 Repository：</h3>
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
export default Repository;