import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Select, Input, message } from 'antd';

import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import StyledButton from 'apps/mdcs/styled/StyledButton';

import { debounce } from 'lodash';

const AntdTable = StyledAntdTable(Table);
const { Option } = Select;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeSelectValue: '',
      inputValue: '',
    };
    this.debounceList = debounce(this.changeInputValue, 300);
  }

  componentDidMount() {
    const { formData } = this.props;
    console.log(formData, '%%%%%%%%');
  }

  getTableColumns = () => [
    {
      title: '상태',
      dataIndex: 'IS_DEL',
      align: 'center',
      render: dataIndex => <span>{dataIndex === 0 ? '사용' : '삭제'}</span>,
    },
    {
      title: '코드',
      dataIndex: 'CODE',
      align: 'center',
    },
    {
      title: '코드명',
      dataIndex: 'NAME',
      align: 'center',
    },
  ];

  changeSelectValue = value => {
    this.setState({ changeSelectValue: value });
  };

  changeInputValue = value => {
    this.setState({ inputValue: value });
  };

  selectCodeApi() {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'proposalOfficer',
        url: `/api/eshs/v1/common/eshsbascicode/GUBUN=${this.state.changeSelectValue}`,
        type: 'GET',
        params: {},
      },
    ];
    getCallDataHandler(id, apiAry);
  }

  warning = () => {
    message.warning('값이 올바르지 않습니다');
  };

  onComplete = id => {
    const { getCallDataHandler, apiAry } = this.props;
    getCallDataHandler(id, apiAry);
  };

  onSaveComplete = id => {
    const { getCallDataHandler, apiAry, removeStorageReduxState, changeFormData, sagaKey } = this.props;
    removeStorageReduxState(id, 'result');
    getCallDataHandler(id, apiAry);
    removeStorageReduxState(id, 'formData');
    changeFormData(sagaKey, 'actionType', 'I');
  };

  onSave = value => {
    const { sagaKey: id, submitHandlerBySaga, formData, changeFormData } = this.props;

    const submitData = {
      PARAM: { formData },
    };
    if (this.state.inputValue) {
      if (value === 'U') {
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsbascicode', submitData, this.onSaveComplete);
      } else {
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsbascicode', submitData, this.onSaveComplete);
      }
    } else {
      this.warning();
    }

    this.onCancel();
  };

  onRemoveDo = record => {
    const { id, submitHandlerBySaga } = this.props;
    const param = { PARAM: { ...record } };
    submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsbascicode', param, this.onComplete);
  };

  onCancel() {
    this.setState({
      changeSelectValue: '',
      inputValue: '',
    });
  }

  render() {
    const { result } = this.props;

    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white' }}>
        <>
          <Select onChange={value => this.changeSelectValue(value)}>
            <Option value="DISCHARGE">방구류</Option>
            <Option value="MEDICINE">약품</Option>
            <Option value="FILTER_PLANT">정수장</Option>
            <Option value="TREATMENT_PLANT">처리장</Option>
            <Option value="CHK_VALUE_TYPE">측정값 종류</Option>
          </Select>
          <Input value={this.state.inputValue} onChange={value => this.changeInputValue(value)}></Input>
          <StyledButton className="btn-primary btn-first" onClick={() => this.onSave('I')}>
            추가
          </StyledButton>
          <StyledButton className="btn-primary btn-first" onClick={() => this.onSave('U')}>
            수정
          </StyledButton>
          <StyledButton className="btn-primary btn-first" onClick={() => this.onRemoveDo()}>
            삭제
          </StyledButton>
          <StyledButton className="btn-primary btn-first" onClick={() => this.onCancel()}>
            Reset
          </StyledButton>
        </>
        <AntdTable pagination={false} dataSource={result} columns={this.getTableColumns()}></AntdTable>
      </div>
    );
  }
}

List.propTypes = {};

List.defaultProps = {
  id: 'eshsSafetyOfficial',
  apiAry: [
    {
      key: 'proposalOfficer',
      url: '/api/eshs/v1/common/eshsproposalofficer',
      type: 'GET',
      params: {},
    },
  ],
  getCallDataHandler: () => {},
  formData: {},
};

export default List;
