import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Input, DatePicker } from 'antd';
import moment from 'moment';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';

import RequesterView from './RequesterView';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);
const AntdInput = StyledInput(Input);
const AntdRangePicker = StyledDatePicker(DatePicker.RangePicker);

class RequesterList extends Component {
  state = {
    isShow: false,
    selectedRow: {},
    searchInfo: {},
  };

  componentWillMount() {
    const today = new Date();
    
    this.setState(prevState => {
      const { searchInfo } = prevState;
      searchInfo.TO_DT = moment(today).format('YYYY-MM-DD');
      today.setMonth(today.getMonth() - 1);
      searchInfo.FROM_DT = moment(today).format('YYYY-MM-DD');
      return { searchInfo }
    });
  };

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    const { id, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const apiAry = [
      {
        key: 'requesterList',
        url: '/api/edds/v1/common/requesterList',
        type: 'POST',
        params: {
          PARAM: { ...this.state.searchInfo }
        },
      },
    ];
    spinningOn();
    getCallDataHandler(id, apiAry, () => {
      spinningOff();
    });
  };

  onClickRow = (record, rowIndex) => {
    this.setState({
      selectedRow: record,
      isShow: true,
    });
  };

  onCancelPopup = () => {
    this.setState({ isShow: false }, () => {
      this.getList();
    });
  };

  columns = [
    {
      title: '요청ID',
      dataIndex: 'REQUEST_ID',
      key: 'REQUEST_ID',
      align: 'center',
      width: '15%',
    },
    {
      title: '요청자명',
      dataIndex: 'REQUESTER_NAME',
      key: 'REQUESTER_NAME',
      align: 'center',
      width: '10%',
    },
    {
      title: '업체명',
      dataIndex: 'COMPANY_NAME',
      key: 'COMPANY_NAME',
      align: 'center',
      width: '20%',
    },

    {
      title: '부서명',
      dataIndex: 'DEPT_NAME',
      key: 'DEPT_NAME',
      align: 'center',
      width: '15%',
    },
    {
      title: '전화번호',
      dataIndex: 'PHONE',
      key: 'PHONE',
      align: 'center',
      width: '10%',
    },
    {
      title: '이메일',
      dataIndex: 'EMAIL',
      key: 'EMAIL',
      align: 'center',
    },
    {
      title: '요청일자',
      dataIndex: 'REG_DATE',
      key: 'REG_DATE',
      align: 'center',
      width: '10%',
    },
  ];

  render() {
    const {
      result: { requesterList },
    } = this.props;
    let list = [];
    if (requesterList && requesterList !== undefined) {
      if (requesterList.list !== undefined) {
        list = requesterList.list;
      }
    }

    return (
      <>
        <AntdModal
          width={700}
          visible={this.state.isShow}
          title="요청 상세"
          onCancel={this.onCancelPopup}
          destroyOnClose
          footer={null}
        >
          <RequesterView selectedRow={this.state.selectedRow} onCancelPopup={this.onCancelPopup} />
        </AntdModal>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <AntdInput
                className="ant-input-sm mr5" allowClear placeholder="업체명" style={{ width: 120 }}
                onChange={e => this.setState({ searchInfo: { ...this.state.searchInfo, COMPANY_NAME: e.target.value } })}
                onPressEnter={this.getList}
              />
              <AntdInput
                className="ant-input-sm mr5" allowClear placeholder="요청자명" style={{ width: 100 }}
                onChange={e => this.setState({ searchInfo: { ...this.state.searchInfo, REQUESTER_NAME: e.target.value } })}
                onPressEnter={this.getList}
              />
              <span className="text-label">요청기간</span>
              <AntdRangePicker
                defaultValue={[moment(this.state.searchInfo.FROM_DT), moment(this.state.searchInfo.TO_DT)]}
                className="ant-picker-sm mr5" style={{ width: 220 }} format="YYYY-MM-DD" allowClear={false}
                onChange={(val1, val2) => this.setState({ searchInfo: { ...this.state.searchInfo, FROM_DT: val2[0], TO_DT: val2[1] } })}
              />
              <StyledButton className="btn-gray btn-sm" onClick={this.getList}>검색</StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <AntdTable
            dataSource={list.map(item => ({ ...item, key: `KEY_${item.REQUEST_ID}` }))}
            columns={this.columns}
            onRow={(record, rowIndex) => ({
              onClick: event => {
                this.onClickRow(record, rowIndex);
              },
            })}
            bordered
          />
        </StyledContentsWrapper>
      </>
    );
  }
}

RequesterList.propTypes = {
  id: PropTypes.string,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
};

RequesterList.defaultProps = {
  id: 'requesterList',
  result: {
    requesterList: {
      list: [],
    },
  },
  getCallDataHandler: () => {},
};

export default RequesterList;
