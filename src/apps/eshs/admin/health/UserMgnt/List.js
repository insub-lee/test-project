import React, { Component } from 'react';
import { Input, Select, Table, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

const AntdTable = StyledAntdTable(Table);
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);

class List extends Component {
  state = {
    list: [],
    selectedRowKeys: [],
    userName: '',
    deptName: '',
  }

  componentDidMount() {
    const { sagaKey, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const apiAry = [
      {
        key: 'hospitalList',
        url: '/api/eshs/v1/common/health/healthChkHospital',
        type: 'GET',
      },
    ];
    getCallDataHandler(sagaKey, apiAry, () => {
      this.getList();
    });
  }

  getList = () => {
    const { sagaKey, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const { userName, deptName } = this.state;
    const apiAry = [
      {
        key: 'extUserList',
        url: `/api/eshs/v1/common/health/healthChkHospitalUserMgnt?USER_NAME=${userName}&DEPT_NAME=${deptName}`,
        type: 'GET',
      },
    ];
    spinningOn();
    getCallDataHandler(sagaKey, apiAry, () => {
      spinningOff();
      this.initList();
    });
  };

  initList = () => {
    const { result } = this.props;
    this.setState({
      list: result && result.extUserList && result.extUserList.list ? result.extUserList.list : [],
    });
  }

  onChangeHospital = (val, record) => {
    this.setState(prevState => {
      const { list } = prevState;
      return {
        list: list.map(item => {
          if (item.USER_ID === record.USER_ID) {
            item.HOSPITAL_CODE = val;
          }

          return { ...item }
        })
      }
    })
  };

  onClickCheckbox = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  onSave = () => {
    const { sagaKey, submitHandlerBySaga, spinningOn, spinningOff } = this.props;
    const submitData = {
      PARAM: { 
        list: this.state.list,
      }
    };

    Modal.confirm({
      title: '저장하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      okText: '저장',
      cancelText: '취소',
      onOk() {
        spinningOn();
        submitHandlerBySaga(sagaKey, 'POST', `/api/eshs/v1/common/health/healthChkHospitalUserMgnt`, submitData, (id, res) => {
          spinningOff();
          if (res && res.result > 0) {
            message.info(<MessageContent>저장하였습니다.</MessageContent>);
          } else {
            message.info(<MessageContent>저장에 실패하였습니다.</MessageContent>);
          }
        });
      }
    });
  };

  getColumns = () => {
    const { result } = this.props;
    const columns = [
      {
        title: '사용자명(국문)',
        dataIndex: 'NAME_KOR',
        key: 'NAME_KOR',
        width: '15%',
        align: 'center',
      },
      {
        title: '사용자명(영문)',
        dataIndex: 'NAME_ENG',
        key: 'NAME_ENG',
        width: '20%',
        align: 'center',
      },
      {
        title: '업체명(국문)',
        dataIndex: 'DEPT_NAME_KOR',
        key: 'DEPT_NAME_KOR',
        width: '25%',
      },
      {
        title: '업체명(영문)',
        dataIndex: 'DEPT_NAME_ENG',
        key: 'DEPT_NAME_ENG',
        width: '25%',
        ellipsis: true,
      },
      {
        title: '검진기관',
        dataIndex: 'HOSPITAL_CODE',
        key: 'HOSPITAL_CODE',
        width: '15%',
        align: 'center',
        render: (text, record) => (
          <AntdSelect
            value={text || undefined}
            className="select-xs" allowClear placeholder="검진기관" style={{ width: '100%' }}
            onChange={val => this.onChangeHospital(val, record)}
          >
          {result.hospitalList.list.map(item => (
            <AntdSelect.Option value={item.HOSPITAL_CODE}>{item.HOSPITAL_NAME}</AntdSelect.Option>
          ))}
          </AntdSelect>
        )
      },
    ];

    return columns;
  };

  render() {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onClickCheckbox,
    }

    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper>
          <div className="search-input-area">
            <AntdInput
              className="ant-input-sm mr5" allowClear placeholder="사용자명" style={{ width: 100 }}
              onChange={e => this.setState({ userName: e.target.value })}
              onPressEnter={this.getList}
            />
            <AntdInput
              className="ant-input-sm mr5" allowClear placeholder="업체명" style={{ width: 100 }}
              onChange={e => this.setState({ deptName: e.target.value })}
              onPressEnter={this.getList}
            />
            <StyledButton className="btn-gray btn-sm" onClick={this.getList}>검색</StyledButton>
          </div>
        </StyledCustomSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <StyledButton className="btn-primary btn-sm" onClick={this.onSave}>저장</StyledButton>
        </StyledButtonWrapper>
        <AntdTable
          columns={this.getColumns()}
          dataSource={this.state.list}
          bordered
          // rowSelection={rowSelection}
        />
      </StyledContentsWrapper>
    );
  }
}

export default List;