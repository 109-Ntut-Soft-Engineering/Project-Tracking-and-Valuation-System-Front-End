import React from "react";
import Sidenavbar from "./tool/Sidenavbar";
import { Container } from 'rsuite';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import black from '../img/black.png';

const data = [
    { user: "Tony", c1: 5, c2: 11, c3: 7, c4: 0, c5: 3, c6: 4, c7: 2 },
    { user: "Ken", c1: 7, c2: 21, c3: 13, c4: 7, c5: 6, c6: 5, c7: 2 },
    { user: "Bob", c1: 11, c2: 3, c3: 7, c4: 9, c5: 15, c6: 17, c7: 19 },
    { user: "Ancle", c1: 19, c2: 4, c3: 6, c4: 7, c5: 8, c6: 9, c7: 11 }
]

const weekday = ["Monday", "Thusday", "Wendesday", "Thursday", "Friday", "Saturday", "Sunday"]

var ImageCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0}}>
        <img src = {black} alt = {dataKey} width={40}/>
    </Cell>
);

class ContributionCommit extends React.Component {
    render() {
        var repoName = this.props.match.params.repo_name;
        return (
            <Container style={{ height: "100%", display: "flex", flexDirection: "row" }}>
                <Sidenavbar contact={{repo_name:repoName}}/>
                <Container>
                    <div style={{width:"100%", marginTop:"30px",marginBottom:"40px",color:"white",textAlign: "center"}}>
                        <h1>{repoName}</h1>
                    </div>
                    <div style={{
                        width: "90%", backgroundColor: "white",
                        marginLeft: "5%", marginRight: "5%",marginBottom:"300px"}}>
                        <div>
                            <h3>ThisWeek</h3>
                        </div>
                        <Table data={data} autoHeight>
                            <Column width={100}>
                                <HeaderCell>Name</HeaderCell>
                                <Cell dataKey="user" />
                            </Column>
                            <Column width={100}>
                                <HeaderCell>{weekday[0]}</HeaderCell>
                                <ImageCell dataKey="c1" />
                            </Column>
                            <Column width={100}>
                                <HeaderCell>{weekday[1]}</HeaderCell>
                                <ImageCell dataKey="c2" />
                            </Column>
                            <Column width={100}>
                                <HeaderCell>{weekday[2]}</HeaderCell>
                                <ImageCell dataKey="c3" />
                            </Column>
                            <Column width={100}>
                                <HeaderCell>{weekday[3]}</HeaderCell>
                                <ImageCell dataKey="c4" />
                            </Column>
                            <Column width={100}>
                                <HeaderCell>{weekday[4]}</HeaderCell>
                                <ImageCell dataKey="c5" />
                            </Column>
                            <Column width={100}>
                                <HeaderCell>{weekday[5]}</HeaderCell>
                                <ImageCell dataKey="c6" />
                            </Column>
                            <Column width={100}>
                                <HeaderCell>{weekday[6]}</HeaderCell>
                                <ImageCell dataKey="c7" />
                            </Column>
                        </Table>
                    </div>
                </Container>
            </Container>
        )
    }
}
export default ContributionCommit;