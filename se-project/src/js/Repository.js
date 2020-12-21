import React from "react";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import { Header, Alert, Container, Breadcrumb, Button, Modal, TagPicker, IconButton, Icon, Content, FlexboxGrid } from 'rsuite';
import { Link } from "react-router-dom";
import MainHeader from './tool/MainHeader'
import HeaderNavbar from "./tool/Navbar";
import '../css/Home&Repo.css';
import { saveUserProjectRepos, getUserProjectRepos, removeUserProjectRepos, getUserRepos } from "./api/projectAPI";
import { getCurrentProject } from './tool/CommonTool'
const chart_width = window.innerWidth * 0.5
class Repository extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backdrop: true,
            show: false,
            data: [],
            currentProject: getCurrentProject(),
            repos: [],
            loading: true,
            menuLoading: true,
            selectedRepos: {
                repositories:
                {
                    Github: [],
                    action: 'update'
                }
            },
            showConfirmDel: false,
            delRepo: {},
            tableHeight: 200

        };

        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.closeConfirmDel = this.closeConfirmDel.bind(this);
        this.openConfirmDel = this.openConfirmDel.bind(this);
        this.setProjectRepos = this.setProjectRepos.bind(this)
        this.removeProjectRepo = this.removeProjectRepo.bind(this)
        this.getUserRepos = this.getUserRepos.bind(this);

    }

    close() {
        this.setState({ show: false });
    }

    open() {
        this.setState({ show: true });
    }

    openConfirmDel() {
        this.setState({ showConfirmDel: true });
    }
    closeConfirmDel() {
        this.setState({ showConfirmDel: false });
    }
    getProjectRepos() {
        getUserProjectRepos(this.state.currentProject.id)
            .then(result => {
                const repos = result.data.repos
                this.setState({ data: repos })
                this.setState({ loading: false })
            })
    }
    removeProjectRepo() {
        const data = {
            repositories:
            {
                Github: [this.state.delRepo.id],
                action: 'remove'
            }
        }
        removeUserProjectRepos(this.state.currentProject.id, data).then(response => {
            Alert.success('刪除成功！')
            this.getProjectRepos()
        }).catch(err => {
            Alert.error('發生錯誤！')
        })
        this.closeConfirmDel()

    }
    setProjectRepos() {


        Alert.config({ top: 100 });
        saveUserProjectRepos(this.state.currentProject.id, this.state.selectedRepos).then(response => {
            Alert.success('新增成功！')
        }).catch(err => {
            Alert.error('發生錯誤！')
        })
        this.close()
        this.getProjectRepos()
    }
    getUserRepos() {
        getUserRepos(this.state.currentProject.id)
            .then(response => {
                const repos = response.data.repos
                this.setState({ repos: repos, menuLoading: false });
            }).catch(err => {
                console.log(err)
            })

    }


    componentDidMount() {
        const height = document.getElementById('reposTable').clientHeight * 0.9;
        this.setState({ tableHeight: height })
        this.getProjectRepos()
    }

    render() {
        var projName = this.state.currentProject.name;
        const { backdrop, show, data, loading, delRepo, selectedRepos, menuLoading, tableHeight } = this.state;
        return (
            <Container style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
                <MainHeader />
                <div style={{ margin: 20, paddingLeft: "20%", paddingRight: "20%" }}>

                    <Breadcrumb style={{ display: 'inline' }} separator={React.createElement('h4', {}, '/')}>
                        <Breadcrumb.Item><Link to="/projects"><h4>Projects</h4></Link></Breadcrumb.Item>
                        <Breadcrumb.Item active><h4>{projName}</h4></Breadcrumb.Item>
                    </Breadcrumb>

                    <Button style={{ float: 'right' }} color="blue" className="creteButton" onClick={this.open}>Create</Button>

                </div>



                <HeaderNavbar />

                <Content id="reposTable">

                    <Table loading={loading} bordered={true} width={chart_width} data={data} rowHeight={60} height={tableHeight} >
                        <Column width={chart_width * 0.3} verticalAlign="middle" align="center" >
                            <HeaderCell className="haederCell">Repository Name</HeaderCell>
                            <Cell dataKey="name"></Cell>
                        </Column>
                        <Column width={chart_width * 0.4} verticalAlign="middle" align="center">
                            <HeaderCell className="haederCell">Source</HeaderCell>
                            <Cell >
                                {rowData => {
                                    return <Icon size="2x" icon={rowData.source} />
                                }}
                            </Cell>
                        </Column>
                        <Column width={chart_width * 0.3} verticalAlign="middle" align="center" fixed="right">
                            <HeaderCell className="haederCell">Delete Repository</HeaderCell>
                            <Cell>
                                {rowData => {
                                    return <IconButton icon={<Icon size="2x" icon="trash" />} onClick={() => {
                                        this.openConfirmDel()
                                        this.setState({ delRepo: rowData })
                                    }} />

                                }}
                            </Cell>
                        </Column>
                    </Table>

                </Content>


                <Modal backdrop={backdrop} show={show} onHide={this.close} size="sm">
                    <Modal.Header>
                        <Modal.Title>新增 Repository</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TagPicker
                            data={this.state.repos}
                            onChange={(value) => {
                                selectedRepos.repositories.Github = value
                                this.setState({ selectedRepos: selectedRepos })
                            }}
                            onOpen={this.getUserRepos}
                            onClose={() => this.setState({ menuLoading: true })}
                            placeholder="選擇 Repository"
                            groupBy="type"
                            labelKey="name"
                            valueKey="id"
                            renderMenu={menu => {
                                if (menuLoading) {
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
                        <Button onClick={this.setProjectRepos} appearance="primary">確認</Button>
                        <Button onClick={this.close} appearance="subtle">取消</Button>
                    </Modal.Footer>
                </Modal>

                <Modal backdrop="static" show={this.state.showConfirmDel} onHide={this.closeConfirmDel} size="xs">

                    <Modal.Body>
                        <Icon
                            icon="remind"
                            style={{
                                color: '#ffb300',
                                fontSize: 30
                            }}
                        /> <h5 style={{ display: 'inline' }}>確定移除 {delRepo.name}？</h5>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.removeProjectRepo} appearance="primary">
                            Ok
                        </Button>
                        <Button onClick={this.closeConfirmDel} appearance="subtle">
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container >
        )
    }
}
export default Repository;