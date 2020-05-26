import React, { Component } from 'react';
import { Input, Select, message, Table } from 'antd';
import PropTypes from 'prop-types';

import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledSelect from 'commonStyled/Form/StyledSelect';

const { Option } = Select;
const AntdLineTable = StyledLineTable(Table);
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);

class DeptModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDept: {},
      renderTable: [],
    };
  }

  componentDidMount = () => {
    const { id, getCallDataHandler } = this.props;

    const apiAry = [
      {
        key: 'deptList',
        type: 'GET',
        url: '/api/eshs/v1/common/eshsHstCmpnyDept?CMPNY_CD=02',
      },
    ];
    getCallDataHandler(id, apiAry, () => this.tableRender({ HST_CMPNY_CD: '02' }));
  };

  renderColumns = record => [
    {
      title: (
        <>
          <span>부서코드</span>
          <AntdInput
            className="ant-input-inline"
            style={{ width: '100%' }}
            name="DEPT_CD"
            value={(record && record.DEPT_CD) || ''}
            onChange={this.handleInputChange}
            placeholder="부서코드"
          />
        </>
      ),
      dataIndex: 'DEPT_CD',
      width: 250,
    },
    {
      title: (
        <>
          <span>부서명</span>
          <br />
          <AntdInput
            className="ant-input-inline"
            name="DEPT_NM"
            style={{ width: '350px' }}
            value={(record && record.DEPT_NM) || ''}
            onChange={this.handleInputChange}
            placeholder="부서명"
          />
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-primary btn-first" onClick={this.handleDeptAdd}>
              추가
            </StyledButton>
            <StyledButton className="btn-primary btn-first" onClick={this.handleDeptUpdate}>
              저장
            </StyledButton>
            <StyledButton className="btn-primary " onClick={this.handleDeptDelete}>
              삭제
            </StyledButton>
          </StyledButtonWrapper>
        </>
      ),
      dataIndex: 'DEPT_NM',
      width: 550,
    },
  ];

  tableRender = selectedDept => {
    const { result } = this.props;
    const renderList = (result && result.deptList && result.deptList.eshsHstCmpnyDeptListByCmpny) || [];
    const columns = this.renderColumns(selectedDept);
    this.setState({
      selectedDept,
      renderTable: [
        <AntdLineTable
          key="renderTable"
          className="tableWrapper"
          style={{ cursor: 'pointer' }}
          rowKey={renderList.DEPT_CD}
          columns={columns}
          dataSource={renderList}
          bordered
          onRow={record => ({
            onClick: () => {
              this.tableRender(record);
            },
          })}
          pagination={{ pageSize: 100 }}
          scroll={{ y: 800 }}
          footer={() => <div style={{ textAlign: 'center' }}>{`${renderList.length} 건`}</div>}
        />,
      ],
    });
  };

  handleSearchDept = e => {
    const { id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'deptList',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsHstCmpnyDept?CMPNY_CD=${e}`,
      },
    ];
    getCallDataHandler(id, apiAry, () => this.tableRender({ HST_CMPNY_CD: e }));
  };

  handleInputChange = e => {
    const { selectedDept } = this.state;
    this.tableRender({ ...selectedDept, [e.target.name]: e.target.value });
  };

  handleDeptAdd = () => {
    const { id, getCallDataHandler } = this.props;
    const {
      selectedDept: { HST_CMPNY_CD = '', DEPT_CD = '', DEPT_NM = '' },
    } = this.state;
    if (!DEPT_CD) {
      return message.warning('부서코드를 입력하세요');
    }
    if (!DEPT_NM) {
      return message.warning('부서명을 입력하세요');
    }
    const apiAry = [
      {
        key: 'deptCnt',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsHstCmpnyDeptOverLap?HST_CMPNY_CD=${HST_CMPNY_CD}&&DEPT_CD=${DEPT_CD}`,
      },
    ];

    return getCallDataHandler(id, apiAry, this.handleDeptOverLab);
  };

  handleDeptOverLab = () => {
    const { id, submitHandlerBySaga, result } = this.props;
    const { selectedDept } = this.state;
    const HST_CMPNY_CD = (selectedDept && selectedDept.HST_CMPNY_CD) || '';
    const cntOk = (result && result.deptCnt && result.deptCnt.deptCnt) || 0;
    if (!cntOk) {
      return submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsHstCmpnyDept', selectedDept, () => this.handleSearchDept(HST_CMPNY_CD));
    }
    return message.warning('이전에 사용되었던 코드는 다시 사용할 수 없습니다!');
  };

  handleDeptUpdate = () => {
    const { id, submitHandlerBySaga } = this.props;
    const {
      selectedDept,
      selectedDept: { HST_CMPNY_CD = '', DEPT_CD = '', DEPT_NM = '' },
    } = this.state;
    if (!DEPT_CD) {
      return message.warning('부서코드를 입력하세요');
    }
    if (!DEPT_NM) {
      return message.warning('부서명을 입력하세요');
    }
    return submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsHstCmpnyDept', selectedDept, () => this.handleSearchDept(HST_CMPNY_CD));
  };

  handleDeptDelete = () => {
    const { id, getCallDataHandler } = this.props;
    const {
      selectedDept: { HST_CMPNY_CD = '', DEPT_CD = '' },
    } = this.state;
    const apiAry = [
      {
        key: 'isDeleted',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsHstCmpnyDeptDelete?HST_CMPNY_CD=${HST_CMPNY_CD}&&DEPT_CD=${DEPT_CD}`,
      },
    ];

    getCallDataHandler(id, apiAry, this.handleIsDeleted);
  };

  handleIsDeleted = () => {
    const { id, submitHandlerBySaga, result } = this.props;
    const {
      selectedDept,
      selectedDept: { HST_CMPNY_CD = '' },
    } = this.state;
    const isDel = result && result.isDeleted && result.isDeleted.isDeleted;
    if (!isDel) {
      return submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsHstCmpnyDeptDelete', selectedDept, () => this.handleSearchDept(HST_CMPNY_CD));
    }
    return message.warning('해당 부서에 등록된 직원이 있습니다. 직원 삭제후 시도해 주십시오.');
  };

  handleDwExcel = () => {
    message.warning('미구현');
  };

  render() {
    const { result } = this.props;
    const { renderTable, selectedDept } = this.state;
    const cmpnyList = (result && result.cmpnyList && result.cmpnyList.eshsHstCmpnyList) || [];
    const dfValue = cmpnyList.length ? cmpnyList[0].HST_CMPNY_CD : ' ';
    return (
      <>
        <div>
          <AntdSelect className="select-mid mr5" defaultValue={dfValue} style={{ width: 180, padding: 3 }} onChange={this.handleSearchDept}>
            {cmpnyList.map(c => (
              <Option key={c.HST_CMPNY_CD} style={{ height: 30 }}>
                {c.HST_CMPNY_NM}
              </Option>
            ))}
          </AntdSelect>
          <StyledButton className="btn-primary" onClick={this.handleDwExcel}>
            엑셀받기
          </StyledButton>
          {renderTable}
        </div>
      </>
    );
  }
}

DeptModal.propTypes = {
  result: PropTypes.object,
  id: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
};

DeptModal.defaultProps = {
  result: {},
  id: '',
  getCallDataHandler: () => {},
  submitHandlerBySaga: () => {},
};

export default DeptModal;
