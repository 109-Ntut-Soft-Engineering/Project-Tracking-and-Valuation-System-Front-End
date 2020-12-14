import React from "react";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import { Alert, Container, Breadcrumb, Button, Modal, CheckPicker, IconButton, Icon, h3 } from 'rsuite';
import { Link } from "react-router-dom";
import MainHeader from './tool/MainHeader'
import Sidenavbar from "./tool/Sidenavbar";
import '../css/Home&Repo.css';
import { getUserRepos } from "./api/userAPI";
import { saveUserProjectRepos, getUserProjectRepos, removeUserProjectRepos } from "./api/projectAPI";
const chart_width = window.innerWidth * 0.5
class Repository extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backdrop: true,
            show: false,
            data: [],
            proName: this.props.match.params.pro_name,
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
            delRepo: {}

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
    getRepos() {
        getUserProjectRepos()
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
        removeUserProjectRepos(data).then(response => {
            Alert.success('刪除成功！')
            this.getRepos()
        }).catch(err => {
            Alert.error('發生錯誤！')
        })
        this.closeConfirmDel()

    }
    setProjectRepos() {


        Alert.config({ top: 100 });
        saveUserProjectRepos(this.state.selectedRepos).then(response => {
            Alert.success('新增成功！')
        }).catch(err => {
            Alert.error('發生錯誤！')
        })
        this.close()
        this.getRepos()
    }
    getUserRepos() {
        getUserRepos()
            .then(response => {
                const repos = response.data.repos
                this.setState({ repos: repos, menuLoading: false });
            }).catch(err => {
                console.log(err)
            })

    }

    componentDidMount() {
        this.setState({ loading: true })
        this.getRepos()
    }
    render() {
        var proName = window.currentProject.name;
        const { backdrop, show, data, loading, delRepo, selectedRepos, menuLoading } = this.state;
        return (
            <Container style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
                <MainHeader />
                <div style={{ display: "flex", flexDirection: 'row', justifyContent: "space-around" }}>

                    <Breadcrumb style={{ marginBottom: "20px", marginTop: "20px" }}>
                        <Breadcrumb.Item><Link to="/projects">Projects</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>{proName}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Button color="blue" className="creteButton" onClick={this.open}>Create</Button>
                </div>


                <Container id="main" style={{ backgroundColor: "white", width: "100%", paddingLeft: "10%", paddingRight: "10%" }}>
                    <Sidenavbar contact={{ pro_name: proName }} />

                    <div className="reposTable">
                        <Table loading={loading} bordered={true} width={chart_width} data={data} rowHeight={60} autoHeight >
                            <Column width={chart_width * 0.3} verticalAlign="middle" align="center" >
                                <HeaderCell className="haederCell">Repository Name</HeaderCell>
                                <Cell dataKey="name"></Cell>
                            </Column>
                            <Column width={chart_width * 0.4} verticalAlign="middle" align="center">
                                <HeaderCell className="haederCell">Source</HeaderCell>
                                <Cell dataKey="source"></Cell>
                            </Column>
                            <Column width={chart_width * 0.3} verticalAlign="middle" align="center" fixed="right">
                                <HeaderCell className="haederCell">Delete Repository</HeaderCell>
                                <Cell>
                                    {rowData => {
                                        return <IconButton icon={<Icon icon="trash" />} onClick={() => {
                                            this.openConfirmDel()
                                            this.setState({ delRepo: rowData })
                                        }} />

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
                            onChange={(value) => {
                                selectedRepos.repositories.Github = value
                                this.setState({ selectedRepos: selectedRepos })
                            }}
                            onOpen={this.getUserRepos}
                            onClose={() => this.setState({ menuLoading: true })}
                            sticky={true}
                            placeholder="選擇 Repository"
                            groupBy="source"
                            labelKey="name"
                            virtualized={true}
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
            </Container>
        )
    }
}
export default Repository;