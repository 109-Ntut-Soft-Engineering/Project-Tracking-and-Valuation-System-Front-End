import React from 'react';
import Sidenavbar from "./tool/Sidenavbar";
import {Container,Breadcrumb} from 'rsuite'; 
import {Link}  from "react-router-dom";
import {AreaChart, Area, XAxis, YAxis, Legend} from 'recharts'
import MainHeader from './tool/MainHeader'

class CodeVariation extends React.Component{
    constructor(props){
        super(props);
    }
	
    render(){
        const data = [
            {
              date: '2020/10/20', code: 300, commit:200
            },
            {
              date: '2020/10/21', code: 400, commit:200
            },
            {
              date: '2020/10/22', code: 100, commit:200
            },
            {
                date: '2020/10/23', code: 150, commit:200
            },
            {
                date: '2020/10/24', code: 0, commit:200       
            },
            {
                date: '2020/10/25', code: 500, commit:200
            },
            {
                date: '2020/10/26', code: 300, commit:200
			},
			{
                date: '2020/10/27', code: 0, commit:200
            },
          ];
        
		const chart_width = window.innerWidth * 0.7
		const chart_height = window.innerHeight * 0.6
		var proName = this.props.match.params.pro_name;
        return (
            <Container style={{height:"100%"}}>
                <MainHeader/>

				<Container id="main" style={{backgroundColor:"white",width:"100%",paddingLeft:"10%", paddingRight:"10%"}}>
                    <Breadcrumb style={{marginBottom:"20px", marginTop:"20px"}}>
                        <Breadcrumb.Item><Link to="/home">Projects</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>{proName}</Breadcrumb.Item>
                    </Breadcrumb>

                    <Sidenavbar contact={{pro_name:proName}}/>

					<div id="chart_region" style={{display:"flex",justifyContent:"center",marginTop:"25px",marginBottom:"100px"}}>
						<AreaChart width={chart_width} height={chart_height} data={data}>
                            <defs>
                                <linearGradient id="colorCode" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
							<Area type="monotone" dataKey="code" stroke="#82ca9d" fullOpacity={1} fill="url(#colorCode)"/>
							<XAxis dataKey='date'/>
							<YAxis/> 
                            <Legend/>
						</AreaChart>
					</div> 
				</Container>
            </Container>
        )
    }
}

export default CodeVariation;   