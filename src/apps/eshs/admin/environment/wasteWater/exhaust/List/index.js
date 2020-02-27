import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Input, message } from 'antd';

import StyledButton from 'apps/mdcs/styled/StyledButton';

import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import { CustomStyledAntdTable as StyledAntdTable } from 'components/CommonStyled/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exhuast_nm: '',
      exhuast_cd: '',
    };
  }

  componentDidMount() {
    this.listDataApi();
  }

  changeInputValue = value => {
    this.setState({ exhuast_nm: value });
  };

  callBackApi = () => {
    this.listDataApi();
  };

  listDataApi = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'eshsexhaust',
        url: '/api/eshs/v1/common/eshsexhaust',
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry);
    this.renderTable();
  };

  onChangeData = value => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;

    const submitData = {
      PARAM: { EXHAUST_CD: this.state.exhuast_cd, EXHAUST_NM: this.state.exhuast_nm },
    };
    if (this.state.exhuast_nm) {
      if (value === 'U') {
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsexhaust', submitData, this.callBackApi);
      } else if (value === 'D') {
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsexhaust', submitData, this.callBackApi);
      } else {
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsexhaust', submitData, this.callBackApi);
      }
    } else {
      message.warning('배출시설명을 올바르게 입력하시오.');
    }

    this.onCancel();
  };

  onCancel() {
    this.setState({
      exhuast_nm: '',
      exhuast_cd: '',
    });
  }

  selectedRecord = record => {
    if (typeof record.EXHAUST_NM === 'string') {
      this.setState({
        exhuast_nm: record.EXHAUST_NM,
        exhuast_cd: record.EXHAUST_CD,
      });
    }
  };

  renderTable() {
    const { result, columns } = this.props;
    let renderList = [
      {
        EXHAUST_CD: this.state.exhuast_cd,
        EXHAUST_NM: <Input style={{ width: '300px' }} value={this.state.exhuast_nm} onChange={e => this.changeInputValue(e.target.value)} />,
      },
    ];
    renderList = [...renderList, ...((result && result.eshsexhaust && result.eshsexhaust.list) || [])];
    return (
      <AntdTable
        style={{ cursor: 'pointer' }}
        rowKey={renderList.EXHAUST_CD}
        key={renderList.EXHAUST_CD}
        columns={columns}
        dataSource={renderList}
        bordered
        onRow={record => ({
          onClick: () => {
            this.selectedRecord(record);
          },
        })}
        pagination={{ pageSize: 100 }}
        scroll={{ y: 800 }}
        footer={() => <div style={{ textAlign: 'center' }}>{`${renderList.length - 1} 건`}</div>}
      />
    );
  }

  render() {
    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white' }}>
        <StyledViewDesigner>
          <Sketch>
            <Group>
              <StyledButton className="btn-primary btn-first" onClick={() => this.onChangeData('I')}>
                추가
              </StyledButton>
              <StyledButton className="btn-primary btn-first" onClick={() => this.onChangeData('U')}>
                수정
              </StyledButton>
              <StyledButton className="btn-primary btn-first" onClick={() => this.onChangeData('D')}>
                삭제
              </StyledButton>
              <StyledButton className="btn-primary btn-first" onClick={() => this.onCancel()}>
                Reset
              </StyledButton>
              {this.renderTable()}
            </Group>
          </Sketch>
        </StyledViewDesigner>
      </div>
    );
  }
}

List.propTypes = {};

List.defaultProps = {
  getCallDataHandler: () => {},
  formData: {},
  columns: [
    {
      title: '코드',
      dataIndex: 'EXHAUST_CD',
      align: 'center',
      width: 150,
    },
    {
      title: '배출시설명',
      dataIndex: 'EXHAUST_NM',
      align: 'left',
    },
  ],
};

export default List;
