import React from "react";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import { Container, Breadcrumb, Button, Modal, CheckPicker, IconButton, Icon } from 'rsuite';
import { Link } from "react-router-dom";
import MainHeader from './tool/MainHeader'
import Sidenavbar from "./tool/Sidenavbar";
import fakeRepoData from '../test_data/fakeRepoData.json'
import '../css/Home&Repo.css';
import { getUserRepos } from "./api/userAPI";

const chart_width = window.innerWidth * 0.7
class Repository extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backdrop: true,
            show: false,
            datas: fakeRepoData.repos_data,
            repos: []
        };

        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.changeData = this.changeData.bind(this)
        this.updateRepos = this.updateRepos.bind(this);
    }

    close() {
        this.setState({ show: false });
    }

    open() {
        this.setState({ show: true });
    }

    changeData() {
        // this.setState({ datas: fakeRepoData.repos_data2 });
    }
    updateRepos() {
        getUserRepos('Github')
            .then(response => {
                const repos = response.data.repos
                this.setState({ repos: repos });
            }).catch(err => {
                console.log(err)
            })

    }
    render() {
        var proName = this.props.match.params.pro_name;
        const { backdrop, show, datas } = this.state;
        return (
            <Container style={{ width: "100%", backgroundColor: "white" }}>
                <MainHeader />
                <div style={{ display: "flex", flexDirection: 'row', justifyContent: "space-around" }}>
                    <Breadcrumb style={{ marginBottom: "20px", marginTop: "20px" }}>
                        <Breadcrumb.Item><Link to="/home">Projects</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>{proName}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Button color="blue" className="creteButton" onClick={this.open}>Create</Button>
                </div>

                <Container id="main" style={{ backgroundColor: "white", width: "100%", paddingLeft: "10%", paddingRight: "10%" }}>
                    <Sidenavbar contact={{ pro_name: proName }} />

                    <div className="reposTable">
                        <Table bordered={true} width={chart_width} height={375} data={datas} rowHeight={60}>
                            <Column width={chart_width * 0.3} align="center">
                                <HeaderCell className="haederCell">Repository Name</HeaderCell>
                                <Cell dataKey="name"></Cell>
                            </Column>
                            <Column width={chart_width * 0.4} align="center">
                                <HeaderCell className="haederCell">Last Update Time</HeaderCell>
                                <Cell dataKey="updateTime"></Cell>
                            </Column>
                            <Column width={chart_width * 0.3} align="center">
                                <HeaderCell className="haederCell">Delete Repository</HeaderCell>
                                <Cell>
                                    {rowData => {
                                        function handleAction() {
                                            //alert(`刪除Repo：${rowData.name} (還沒做)`);
                                            window.confirm(`確定要刪除${rowData.name}嗎`);
                                        }
                                        return (
                                            <IconButton icon={<Icon icon="trash-o" />} onClick={handleAction} />
                                        );
                                    }}
                                </Cell>
                            </Column>
                        </Table>
                    </div>
                </Container>

                <Modal backdrop={backdrop} show={show} onHide={this.close} size="sm">
                    <Modal.Header>
                        <Modal.Title>新增 Repository</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CheckPicker
                            data={this.state.repos}
                            searchable={false}
                            style={{ width: 224 }}
                            onOpen={this.updateRepos}
                            renderMenu={menu => {
                                if (this.state.repos.length === 0) {
                                    return (
                                        <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
                                            <Icon icon="spinner" spin /> 請稍後...
                                        </p>
                                    );
                                }
                                return menu;
                            }}
                            block />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close} appearance="primary">確認</Button>
                        <Button onClick={this.close} appearance="subtle">取消</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }
}
export default Repository;