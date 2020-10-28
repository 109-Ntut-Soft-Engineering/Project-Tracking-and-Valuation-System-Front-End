import React from 'react';
import Sidenavbar from "./tool/Sidenavbar";
import {Container} from 'rsuite'; 
import {LineChart, Line} from 'recharts'

class Codevariation extends React.Component{
    render(){
        const data = [{"time": '2020/10/20', "value": 400},
                      {"time": '2020/10/21', "value": 200},
                      {"time": '2020/10/22', "value": 300}]
        return (
            <Container style={{height:"100%", display:"flex", flexDirection:"row"}}>
                <Sidenavbar style={{height:"100%"}}/>
                <LineChart width={400} height={400} data={data}>
                    <Line type="monotone" dataKey='value'/>
                </LineChart>
            </Container>
        )
    }
}

export default Codevariation;