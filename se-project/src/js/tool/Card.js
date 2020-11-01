import React from "react";
import { FlexboxGrid, Panel} from 'rsuite';
import {Link}  from "react-router-dom";

class Card extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        var go_to_place ="";

        if(this.props.contact.from_where == "home") go_to_place = "/repository";
        else if(this.props.contact.from_where == "repo") go_to_place = "/code";

        return (
            <FlexboxGrid.Item style={{width:"20%",margin:"2.5%"}}>
                <Link style={{textDecoration:"none"}} to={go_to_place}>
                    <Panel bordered shaded className="Card">{this.props.contact.name}</Panel>         
                </Link>
            </FlexboxGrid.Item>
        )
    }
}
export default Card;