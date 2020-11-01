import React from 'react';
import { Icon, IconButton, Table } from 'rsuite';

const { Column, HeaderCell, Cell} = Table;
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

class ExpandedTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          data: props.data,
          expandedRowKeys: []
        };
        this.handleExpanded = this.handleExpanded.bind(this);
    }
    handleExpanded(rowData){
        const {expandedRowKeys} = this.state
        const nextExpandedRowKeys = [];
        let open = false; 

        expandedRowKeys.forEach(key => {
            if (key=== rowData[rowKey]){
                open = true
            }
            else{
                nextExpandedRowKeys.push(key)
            }
        });

        if (!open){
            nextExpandedRowKeys.push(rowData[rowKey]);
        }
        this.setState({
            expandedRowKeys: nextExpandedRowKeys
        });
    }
    render(){
        const { expandedRowKeys, data } = this.state;
        return(
            <Table
             height={this.props.height}
             data={data} 
             rowKey={rowKey} 
             expandedRowKeys={expandedRowKeys}
             renderRowExpanded={rowData => {
                return (
                  <div>
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        float: 'left',
                        marginRight: 10,
                        background: '#eee'
                      }}
                    >
                    </div>
                    <p>{rowData.discription}</p>
                    <p>{rowData.date}</p>
                  </div>
                );
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
                    <HeaderCell>User</HeaderCell>
                    <Cell dataKey="user" />
                </Column>

                <Column width={130}>
                    <HeaderCell>Date</HeaderCell>
                    <Cell dataKey="date" />
                </Column>

            </Table>
        )
    }
}



export default ExpandedTable