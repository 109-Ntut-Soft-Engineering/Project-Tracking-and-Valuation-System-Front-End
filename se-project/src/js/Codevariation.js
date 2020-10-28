import React from 'react';
import Sidenavbar from "./tool/Sidenavbar";
import {Container, Grid, Row, Col} from 'rsuite'; 
import {LineChart, Line, CartesianGrid, AreaChart, Area, Tooltip,
    XAxis, YAxis, Legend} from 'recharts'

class CodeVariation extends React.Component{
	// get_withd(){
	// 	return document.getElementById('chart_region').getAttribute('width')
	// }
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
        
		const chart_width = window.innerWidth * 0.8
		const chart_height = window.innerHeight * 0.5
		
        return (
            <Container style={{height:"100%", display:"flex", flexDirection:"row"}}>
                <Sidenavbar style={{height:"100%"}}/>
				<Container id="main" style={{height:"100%", display:"flex", flexDirection:"col"}}>
					<div style={{width:"100%", height:"300px"}}>
						<h2>{chart_width},{chart_height}</h2>
					</div>
					<div id="chart_region" style={{width:"90%", height:{chart_height}, backgroundColor: "white",
						marginLeft:window.innerWidth * 0.05, marginRight:window.innerWidth * 0.05}}>
						<AreaChart width={chart_width} height={chart_height} data={data}>
							<Area type="monotone" dataKey="code" stroke="#8884d8" fill="#8884d8" />
							<XAxis dataKey='date'/>
							<YAxis/> 
						</AreaChart>
					</div> 
				</Container>
            </Container>
        )
    }
}

export default CodeVariation;   