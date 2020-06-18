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

import DocView from './DocView';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);
const AntdInput = StyledInput(Input);
const AntdRangePicker = StyledDatePicker(DatePicker.RangePicker);

class HistoryList extends Component {
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
  };

  getList = () => {
    const { id, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const apiAry = [
      {
        key: 'distributeDocList',
        url: '/api/edds/v1/common/distributeDocList',
        type: 'POST',
        params: {
          PARAM: {
            ...this.state.searchInfo,
            isAdmin: 'Y',
          }
        },
      },
    ];
    spinningOn();
    getCallDataHandler(id, apiAry, () => {
      spinningOff();
    });
  };

  onClickRow = (row, rowIndex) => {
    this.setState({
      selectedRow: row,
      isShow: true,
    });
  };

  onCancelPopup = () => {
    this.setState({ isShow: false });
  };

  columns = [
    {
      title: '발송번호',
      dataIndex: 'TRANS_NO',
      key: 'TRANS_NO',
      align: 'center',
      width: '10%',
    },
    {
      title: 'No.',
      dataIndex: 'DOCNUMBER',
      key: 'DOCNUMBER',
      align: 'center',
      width: '10%',
    },
    {
      title: 'Rev',
      dataIndex: 'VERSION',
      key: 'VERSION',
      align: 'center',
      width: '5%',
    },
    {
      title: 'Title',
      dataIndex: 'TITLE',
      key: 'TITLE',
      ellipsis: true,
    },
    {
      title: '배포자',
      dataIndex: 'DIST_USER_NAME',
      key: 'DIST_USER_NAME',
      width: '7%',
      align: 'center',
    },
    {
      title: '수신자',
      dataIndex: 'EMAIL',
      key: 'EMAIL',
      width: '13%',
      align: 'center',
    },
    {
      title: '배포일',
      dataIndex: 'TRANS_DATE',
      key: 'TRANS_DATE',
      width: '10%',
      align: 'center',
    },
    {
      title: '다운로드',
      dataIndex: 'STATUS',
      key: 'STATUS',
      width: '10%',
      align: 'center',
      render: (text, record) => (record.STATUS === 0 ? '  In progress' : 'Completed'),
    },
  ];

  render() {
    const {
      result: { distributeDocList },
    } = this.props;
    let list = [];
    if (distributeDocList && distributeDocList !== undefined) {
      if (distributeDocList.list !== undefined) {
        list = distributeDocList.list;
      }
    }

    return (
      <>
        <AntdModal
          width={700}
          visible={this.state.isShow}
          title="배포문서 상세"
          onCancel={this.onCancelPopup}
          destroyOnClose
          footer={[<StyledButton className="btn-light btn-sm" onClick={this.onCancelPopup}>닫기</StyledButton>]}
        >
          <DocView selectedRow={this.state.selectedRow} onCancelPopup={this.onCancelPopup} />
        </AntdModal>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <AntdInput
                className="ant-input-sm mr5" allowClear placeholder="문서제목" style={{ width: 150 }}
                onChange={e => this.setState({ searchInfo: { ...this.state.searchInfo, TITLE: e.target.value } })}
                onPressEnter={this.getList}
              />
              <AntdInput
                className="ant-input-sm mr5" allowClear placeholder="발송자" style={{ width: 100 }}
                onChange={e => this.setState({ searchInfo: { ...this.state.searchInfo, DIST_USER_NAME: e.target.value } })}
                onPressEnter={this.getList}
              />
              <span className="text-label">발송기간</span>
              <AntdRangePicker
                defaultValue={[moment(this.state.searchInfo.FROM_DT), moment(this.state.searchInfo.TO_DT)]}
                className="ant-picker-sm mr5" style={{ width: 220 }} format="YYYY-MM-DD" allowClear={false}
                onChange={(val1, val2) => this.setState({ searchInfo: { ...this.state.searchInfo, FROM_DT: val2[0], TO_DT: val2[1] } })}
              />
              <StyledButton className="btn-gray btn-sm" onClick={this.getList}>검색</StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <AntdTable
            dataSource={list.map(item => ({ ...item, key: item.TRANS_NO }))}
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

HistoryList.propTypes = {
  id: PropTypes.string,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
};

HistoryList.defaultProps = {
  id: 'distributeHistory',
  result: {
    distributeDoc: {
      list: [],
    },
  },
  getCallDataHandler: () => {},
};

export default HistoryList;
