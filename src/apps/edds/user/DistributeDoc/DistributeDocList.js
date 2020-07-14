import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Modal, Input, DatePicker } from 'antd';
import moment from 'moment';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal'
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';

import DocView from './DocView';
import Redistribute from './Redistribute';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);
const AntdInput = StyledInput(Input);
const AntdRangePicker = StyledDatePicker(DatePicker.RangePicker);

class DistributeDocList extends Component {
  state = {
    isShow: false,
    isRedistShow: false,
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
          PARAM: { ...this.state.searchInfo },
        },
      },
    ];
    spinningOn();
    getCallDataHandler(id, apiAry, () => {
      spinningOff();
    });
  };

  onClickRow = row => {
    this.setState({
      selectedRow: row,
      isShow: true,
    });
  };

  onCancelPopup = () => {
    this.getList();
    this.setState({
      isShow: false,
      isRedistShow: false,
    });
  };

  onClickMail = row => {
    this.setState({
      selectedRow: row,
      isRedistShow: true,
    });
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
      title: '문서제목',
      dataIndex: 'TITLE',
      key: 'TITLE',
      ellipsis: true,
      render: (text, record) => <StyledButton className="btn-link" onClick={() => this.onClickRow(record)}>{text}</StyledButton>
    },
    {
      title: '발송자',
      dataIndex: 'DIST_USER_NAME',
      key: 'DIST_USER_NAME',
      width: '10%',
      align: 'center',
    },
    {
      title: '발송일',
      dataIndex: 'TRANS_DATE',
      key: 'TRANS_DATE',
      width: '10%',
      align: 'center',
    },
    {
      title: '다운로드',
      dataIndex: 'DOWNLOAD_COUNT',
      key: 'DOWNLOAD_COUNT',
      width: '10%',
      align: 'center',
      render: text => text === 0 ? '  In progress' : 'Completed',
    },
    {
      title: '재배포요청',
      dataIndex: 'TRANS_NO',
      key: 'RE_DIST',
      width: '10%',
      align: 'center',
      render: (text, record) => <Icon type="mail" style={{ cursor: 'pointer' }} onClick={() => this.onClickMail(record)} />,
    },
  ]

  render() {
    const { result: { distributeDocList } } = this.props;
    let list = [];
    if (distributeDocList && distributeDocList !== undefined) {
      if (distributeDocList.list !== undefined) {
        list = distributeDocList.list;
      }
    }

    return (
      <>
        <AntdModal
          width={750}
          visible={this.state.isShow}
          title="배포문서 다운로드"
          onCancel={this.onCancelPopup}
          destroyOnClose
          footer={[<StyledButton className="btn-light btn-sm" onClick={this.onCancelPopup}>닫기</StyledButton>]}
        >
          <DocView selectedRow={this.state.selectedRow} onCancelPopup={this.onCancelPopup} />
        </AntdModal>
        <AntdModal
          width={500}
          visible={this.state.isRedistShow}
          title="재배포 요청"
          onCancel={this.onCancelPopup}
          destroyOnClose
          footer={null}
        >
          <Redistribute selectedRow={this.state.selectedRow} onCancelPopup={this.onCancelPopup} />
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
          />
        </StyledContentsWrapper>
      </>
    );
  }
}

DistributeDocList.propTypes = {
  id: PropTypes.string,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
};

DistributeDocList.defaultProps = {
  id: 'distributeDoc',
  result: {
    distributeDoc: {
      list: [],
    },
  },
  getCallDataHandler: () => {},
};

export default DistributeDocList;