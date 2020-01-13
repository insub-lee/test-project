import React, { Component } from 'react';
import { Button, Table, Row, Col, Icon } from 'antd';
import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import * as columData from './columData';

const AntdTable = StyledAntdTable(Table);
export default class TableSelection extends Component {
  state = {
    leftSelectedRows: [],
    rightSelectedRows: [],
    rightDataSource: [],
  };

  leftRowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(selectedRows, '선택됨');
      this.setState({
        leftSelectedRows: selectedRows,
      });
    },
  };

  rightRowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(selectedRows, '선택됨');
      this.setState({
        rightSelectedRows: selectedRows,
      });
    },
  };

  onRightClick = () => {
    const { tempSave } = this.props;
    const { leftSelectedRows, rightDataSource } = this.state;

    const mergeData = [];
    rightDataSource.map(item => {
      mergeData.push({ ...item, disabled: false, checked: false });
    });

    leftSelectedRows.map(item => {
      const fobj = mergeData.find(x => x.key === item.key);
      if (fobj === undefined) {
        mergeData.push({ ...item, disabled: false, checked: false });
      }
    });
    this.setState({ rightDataSource: mergeData }, tempSave(mergeData));
  };

  onLeftClick = () => {
    const { rightSelectedRows, rightDataSource } = this.state;
    const mergeData = rightDataSource;
    rightSelectedRows.map(item => {
      const fobj = rightDataSource.findIndex(x => x.key === item.key);
      if (fobj > -1) {
        mergeData.splice(fobj, 1);
      }
    });
    this.setState({ rightDataSource: mergeData });
  };

  componentDidMount() {}

  render() {
    const { dataList, view } = this.props;
    const { rightDataSource } = this.state;
    let leftDataSource = [];
    if (view === 'spec') {
      if (dataList && dataList.specData && dataList.specData.length > 0) {
        dataList.specData.map(item =>
          leftDataSource.push({ key: item.TASK_SEQ, sp_id: item.SP_ID, sp_rev: item.SP_REV, title: item.TITLE, disabled: false, checked: false }),
        );
      }
    } else if (view === 'dw') {
      if (dataList && dataList.dwData && dataList.dwData.length > 0) {
        dataList.dwData.map(item =>
          leftDataSource.push({ key: item.TASK_SEQ, sp_id: item.SP_ID, sp_rev: item.SP_REV, title: item.TITLE, disabled: false, checked: false }),
        );
      }
    }
    return (
      <div style={{ marginTop: '10px' }}>
        <Col span={11}>
          <AntdTable rowSelection={this.leftRowSelection} columns={columData.leftTableColumns} dataSource={leftDataSource} />
        </Col>
        <Col span={2} style={{ top: '80px', padding: '10px' }}>
          <Button size="small" onClick={this.onRightClick} style={{ border: 'none', marginBottom: '10px' }}>
            <span>
              <Icon type="right" />
            </span>
          </Button>
          <Button size="small" onClick={this.onLeftClick} style={{ border: 'none' }}>
            {
              <span>
                <Icon type="left" />
              </span>
            }
          </Button>
        </Col>
        <Col span={11}>
          <AntdTable rowSelection={this.rightRowSelection} columns={columData.rightTableColumns} dataSource={rightDataSource} />
        </Col>
      </div>
    );
  }
}
