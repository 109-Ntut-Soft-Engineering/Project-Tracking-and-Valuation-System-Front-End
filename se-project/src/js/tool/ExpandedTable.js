import React from 'react';
import { Icon, IconButton, Table } from 'rsuite';
import '../../css/IssuePage.css'


const { Column, HeaderCell, Cell } = Table;
const rowKey = "id";
const ExpandCell = ({ rowData, dataKey, expandedRowKeys, onChange, ...props }) => (
    <Cell {...props}>
        <IconButton
            size="xs"
            appearance="subtle"
            onClick={() => {
                onChange(rowData);
            }}
            icon={
                <Icon
                    icon={
                        expandedRowKeys.some(key => key === rowData[rowKey])
                            ? 'minus-square-o'
                            : 'plus-square-o'
                    }
                />
            }
        />
    </Cell>
);
function CreateLabel(name, color) {
    var label = <p className='label' style={{ backgroundColor: '#' + color.toString() }}>{name}</p>;
    return label;
}

function GetLabelsData(list) {
    var data = [];
    list.forEach(value => {
        data.push(CreateLabel(value['name'], value['color']));
    });
    return (<div>{data}</div>)
}

const LabelCell = ({ rowData, dataKey, expandedRowKeys, onChange, ...props }) => (
    <Cell {...props}>
        {
            GetLabelsData(rowData[dataKey])
        }
    </Cell>
);

class ExpandedTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            expandedRowKeys: []
        };
        this.handleExpanded = this.handleExpanded.bind(this);
    }

    CreateCommentDiv(body, user, time) {
        var result = [];
        result.push((<p>{user}  Commented at  {time}</p>))
        result.push((<p>{body}</p>))
        result.push((<br />))
        return result
    }

    GetComments(comments) {
        var data = [];
        comments.forEach(value => {
            data.push(this.CreateCommentDiv(value['body'], value['user'], value['time']));
        });
        return (<div style={{ margin: "8px"}}>{data}</div>)
    }

    handleExpanded(rowData) {
        const { expandedRowKeys } = this.state
        const nextExpandedRowKeys = [];
        let open = false;

        expandedRowKeys.forEach(key => {
            if (key === rowData[rowKey]) {
                open = true
            }
            else {
                nextExpandedRowKeys.push(key)
            }
        });

        if (!open) {
            nextExpandedRowKeys.push(rowData[rowKey]);
        }
        this.setState({
            expandedRowKeys: nextExpandedRowKeys
        });
    }
    render() {
        const { expandedRowKeys, data } = this.state;
        return (
            <Table
                autoHeight
                width={800}
                data={data}
                rowKey={rowKey}
                expandedRowKeys={expandedRowKeys}
                rowExpandedHeight={250}
                renderRowExpanded={rowData => {
                    return (
                        this.GetComments(rowData['comments'])
                    )
                }}
            >
                <Column width={50}>
                    <HeaderCell>#</HeaderCell>
                    <ExpandCell
                        dataKey="id"
                        expandedRowKeys={expandedRowKeys}
                        onChange={this.handleExpanded}
                    />
                </Column>
                <Column width={130}>
                    <HeaderCell>Title</HeaderCell>
                    <Cell dataKey="title" />
                </Column>

                <Column width={130}>
                    <HeaderCell>Date</HeaderCell>
                    <Cell dataKey="date" />
                </Column>

                <Column width={600}>
                    <HeaderCell>Labels</HeaderCell>
                    <LabelCell dataKey="labels" />
                </Column>
            </Table>
        )
    }
}

export default ExpandedTable