import React from 'react';
import HeaderNavbar from "../tool/Navbar";
import { Container, Breadcrumb, Content , SelectPicker, Icon} from 'rsuite';
import { Link, Redirect } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, Legend, CartesianGrid, Tooltip} from 'recharts'
import MainHeader from '../tool/MainHeader'
import { requestProjectCodeFreq } from '../api/projectAPI';
import { getCurrentProject, isLoggedIn } from '../tool/CommonTool';

var startDate = undefined;
var endDate = undefined;
var disableStartDateArray = undefined;
var disableEndDateArray = undefined;

class CodeFrequency extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProject: getCurrentProject(),
            originData: undefined,
            originDataDates: [],
            data: undefined
        };
    }

    //取得codeFreq曲線圖
    createCodeFreqChart = () => {
        const chartWidth = window.innerWidth * 0.6
        const chartHeight = window.innerHeight * 0.5
        const { data } = this.state
        if (data === undefined) {
            return (
                <div style={{display:"flex",justifyContent:"center",marginTop:"100px"}}>
                    <Icon icon="spinner" spin size="lg"/>
                    <p style={{marginLeft:"10px"}}>loading.... </p>
                </div>
            )
        }
       
        return (
            <div id="chart_region" style={{ display: "flex", justifyContent: "center", marginTop: "25px", marginBottom: "40px" }}>
                <AreaChart width={chartWidth} height={chartHeight} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <defs>
                        <linearGradient id="colorCode" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="code" stroke="#82ca9d" fullOpacity={1} fill="url(#colorCode)" />
                    <XAxis dataKey='date' />
                    <YAxis />
                    <Legend />
                </AreaChart>
            </div>
        )
    }

    //取得時間選取器
    createTimePicker = () => {
        var startDate = Object.assign([], this.state.originDataDates);
        var endDate = Object.assign([], this.state.originDataDates);
        endDate.reverse().pop();
        startDate.pop();
        return (
            <div style={{display:'flex',flexDirection:'row', alignItems:"center", justifyContent:"center",marginBottom:"30px"}}>
                <h5>開始時間</h5>
                <SelectPicker data={startDate} 
                    onChange={(value) => this.changeChartDate(value, null)}
                    searchable={false} 
                    cleanable={false}
                    disabledItemValues={disableStartDateArray}
                    style={{ width: 224, marginLeft:"10px", marginRight:"50px"}}/>

                <h5>結束時間</h5>
                <SelectPicker data={endDate} 
                    onChange={(value) => this.changeChartDate(null, value)}
                    searchable={false} 
                    cleanable={false}
                    disabledItemValues={disableEndDateArray}
                    style={{ width: 224, marginLeft:"10px", marginRight:"10px"}}/>
            </div>
        )
    }
    
    //取得codefreq資訊
    setData = (id) => {
        return requestProjectCodeFreq(id)
            .then(res => res.data)
            .then(data => {
                var datas = data.code_freq;
                var dataSize = datas.length;
                var dateArray = [];
                for(var i = 0; i < dataSize; i++)
                    dateArray.push({label:datas[i].date, value:datas[i].date});
                
                this.setState({ data: datas})
                this.setState({ originData: datas})
                this.setState({ originDataDates: dateArray})
                return data.code_freq
            })
    }

    //變更CodeFreq曲線圖時間
    changeChartDate(newStartDate, newEndDate){
        if(newStartDate != null) startDate = newStartDate;
        if(newEndDate != null) endDate = newEndDate;

        if(startDate != undefined && endDate != undefined){
            var newData = Object.assign([], this.state.originData);
            disableStartDateArray = [];
            disableEndDateArray = [];
            
            while(newData[0].date != startDate){
                newData.reverse();
                disableEndDateArray.push(newData.pop().date);
                newData.reverse();
            }
            disableEndDateArray.push(newData[0].date);

            var finalIndex = newData.length - 1;
            while(newData[finalIndex].date != endDate) {
                disableStartDateArray.push(newData.pop().date);
                finalIndex = finalIndex - 1;
            }
            disableStartDateArray.push(newData[finalIndex].date);

            this.setState({data:newData});
        }
    }
    
    //渲染畫面
    render() {
        if (!isLoggedIn()) {
            return <Redirect to="/" />;
        } else if (this.state.currentProject === null) {
            return <Redirect to="/projects" />;
        }
        const { currentProject } = this.state
        if (this.state.data === undefined)
            this.setData(currentProject.id)
        
        return (
            <Container style={{ width: "100%", height: "auto", minHeight:"100%", backgroundColor: "white" }}>
                <MainHeader />
                <Content style={{ paddingLeft: "20%", paddingRight: "20%" }}>
                    <div style={{ margin: 20 }}>
                        <Breadcrumb style={{ display: 'inline' }} separator={React.createElement('h4', {}, '/')}>
                            <Breadcrumb.Item><Link to="/projects"><h4>Projects</h4></Link></Breadcrumb.Item>
                            <Breadcrumb.Item active><h4>{currentProject.name}</h4></Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <HeaderNavbar />
                    
                    {this.createTimePicker()}
                    {this.createCodeFreqChart()}
                </Content>
            </Container>
        )
    }
}

export default CodeFrequency;