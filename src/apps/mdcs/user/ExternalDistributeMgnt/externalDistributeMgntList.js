import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Input, Modal } from 'antd';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import DragAntdModal from 'components/DragAntdModal';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import DistributeCompany from './DistributeCompany';

const AntdTable = StyledAntdTable(Table);
const AntdInput = StyledInput(Input);

class ExternalDistributeMgntList extends Component {
  state = {
    isShow: false,
    selectedRow: {},
    searchInfo: {},
  };

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    const { sagaKey, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const apiAry = [
      {
        key: 'externalDistributeMgntList',
        url: '/api/mdcs/v1/common/externalDistributeMgntList',
        type: 'POST',
        params: {
          PARAM: { ...this.state.searchInfo }
        },
      },
    ];
    spinningOn();
    getCallDataHandler(sagaKey, apiAry, () => {
      spinningOff();
    });
  };

  // 외부배포 재배포
  onClickMail = row => {

    const recvUserList = [];
    let referrer = '';
    
    recvUserList.push({
      DEPT_ID: row.RECV_DEPT_ID,
      DEPT_NAME_KOR: row.RECV_DEPT_NAME,
      USER_ID: row.RECV_USER_ID1,
      NAME_KOR: row.RECV_USER_NAME1,
      DIST_USER_ID: row.DIST_USER_ID,
      DIST_USER_NAME: row.DIST_USER_NAME,
    });
    if (row.RECV_USER_ID2 && row.RECV_USER_ID2 !== '') {
      recvUserList.push({
        DEPT_ID: row.RECV_DEPT_ID,
        DEPT_NAME_KOR: row.RECV_DEPT_NAME,
        USER_ID: row.RECV_USER_ID2,
        NAME_KOR: row.RECV_USER_NAME2,
        DIST_USER_ID: row.DIST_USER_ID,
        DIST_USER_NAME: row.DIST_USER_NAME,
      });
    }
    if (row.REFERRER_EMAIL1 && row.REFERRER_EMAIL1 !== '') {
      referrer = row.REFERRER_EMAIL1;
    }
    if (row.REFERRER_EMAIL2 && row.REFERRER_EMAIL2 !== '') {
      referrer = `${referrer};${row.REFERRER_EMAIL2}`;
    }

    const submitData = {
      PARAM: {
        ctrlType: row.CTRL_TYPE,
        docList: [
          {
            DOCNUMBER: row.DOCNUMBER,
            VERSION: row.VERSION,
            TITLE: row.TITLE,
            WORK_SEQ: row.WORK_SEQ,
            TASK_SEQ: row.TASK_SEQ,
          }
        ],
        selectedUserList: recvUserList,
        referrer,
        distribute_reason: row.COMMENT,
        comment: row.COMMENT,
      },
    };

    const { sagaKey, submitHandlerBySaga, spinningOn, spinningOff } = this.props;
    Modal.confirm({
      title: '재배포 하시겠습니까?',
      okText: '확인',
      cancelText: '취소',
      onOk() {
        spinningOn();
        submitHandlerBySaga(sagaKey, 'POST', `/api/mdcs/v1/common/externalDistribute`, submitData, (id, res) => {
          spinningOff();
          if (res && res.result > 0) {
            message.success(<MessageContent>재배포 하였습니다.</MessageContent>);
          } else {
            message.error(<MessageContent>재배포에 실패하였습니다.</MessageContent>);
          }
        });
      }
    });
  };

  onClickNew = row => {
    this.setState({
      isShow: true,
      selectedRow: {
        ...row,
        RECV_DEPT_ID: -1,
        RECV_DEPT_NAME: '',
      },
    });
  };

  onClickDept = row => {
    this.setState({
      isShow: true,
      selectedRow: row,
    });
  };

  onCancelPopup = () => {
    this.setState({
      isShow: false,
      selectedRow: {},
    });
  };

  onSaveAfter = () => {
    this.setState({
      isShow: false,
      selectedRow: {},
    });
    this.getList();
  };

  onChangeSearchInfo = (key, val) => {
    this.setState(prevState => {
      const { searchInfo } = prevState;
      searchInfo[key] = val;
      return { searchInfo }
    });
  };

  columns = [
    {
      title: 'No.',
      dataIndex: 'DOCNUMBER',
      key: 'DOCNUMBER',
      align: 'center',
      width: '9%',
    },
    {
      title: 'Rev',
      dataIndex: 'VERSION',
      key: 'VERSION',
      align: 'center',
      width: '4%',
    },
    {
      title: 'Title',
      dataIndex: 'TITLE',
      key: 'TITLE',
      ellipsis: true,
    },
    {
      title: '업체명',
      dataIndex: 'RECV_DEPT_NAME',
      key: 'RECV_DEPT_NAME',
      width: '13%',
      ellipsis: true,
      render: (text, record) => (
        <StyledButton className="btn-link btn-xs" onClick={() => this.onClickDept(record)}>
          {text}
        </StyledButton>
      ),
    },
    {
      title: '수신자',
      dataIndex: 'RECV_USER_NAME',
      key: 'RECV_USER_NAME',
      width: '10%',
      align: 'center',
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
      title: '배포일(횟수)',
      dataIndex: 'REG_DATE',
      key: 'REG_DATE',
      width: '10%',
      render: (text, record) => record.REG_DATE && `${record.REG_DATE}(${record.DISTRIBUTE_CNT})`,
    },
    {
      title: '구매담당자',
      dataIndex: 'PURCHASE_USER_NAME',
      key: 'PURCHASE_USER_NAME',
      width: '10%',
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'New Supplier',
      dataIndex: 'DOCNUMBER',
      key: 'new',
      width: '7%',
      align: 'center',
      render: (text, record) => (
        <StyledButton className="btn-primary btn-xxs" onClick={() => this.onClickNew(record)}>
          추가
        </StyledButton>
      ),
    },
    {
      title: 'Mail',
      dataIndex: 'DOCNUMBER',
      key: 'mail',
      width: '4%',
      align: 'center',
      render: (text, record) => (
        <StyledButton className="btn-link btn-xs" onClick={() => this.onClickMail(record)}>
          <Icon type="mail" />
        </StyledButton>
      ),
    },
  ];

  render() {
    const {
      result: { externalDistributeMgntList },
    } = this.props;
    let list = [];
    if (externalDistributeMgntList && externalDistributeMgntList !== undefined) {
      if (externalDistributeMgntList.list !== undefined) {
        list = externalDistributeMgntList.list;
      }
    }

    return (
      <>
        <DragAntdModal
          width={700}
          visible={this.state.isShow}
          title="외부배포 회사"
          onCancel={this.onCancelPopup}
          destroyOnClose
          footer={null}
        >
          <DistributeCompany selectedRow={this.state.selectedRow} onCancelPopup={this.onCancelPopup} onSaveAfter={this.onSaveAfter} />
        </DragAntdModal>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 외부배포 관리
            </p>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <AntdInput
                className="ant-input-sm mr5" allowClear placeholder="문서번호" style={{ width: 130 }}
                onChange={e => this.onChangeSearchInfo('DOCNUMBER', e.target.value)}
                onPressEnter={this.getList}
              />
              <AntdInput
                className="ant-input-sm mr5" allowClear placeholder="Title" style={{ width: 150 }}
                onChange={e => this.onChangeSearchInfo('TITLE', e.target.value)}
                onPressEnter={this.getList}
              />
              <AntdInput
                className="ant-input-sm mr5" allowClear placeholder="업체명" style={{ width: 150 }}
                onChange={e => this.onChangeSearchInfo('RECV_DEPT_NAME', e.target.value)}
                onPressEnter={this.getList}
              />
              <StyledButton className="btn-gray btn-sm" onClick={this.getList}>검색</StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <AntdTable
            dataSource={list.map(item => ({ ...item, key: `${item.DOCNUMBER}_${item.RECV_DEPT_ID}` }))}
            columns={this.columns}
            bordered
          />
        </StyledContentsWrapper>
      </>
    );
  }
}

ExternalDistributeMgntList.propTypes = {
  sagaKey: PropTypes.string,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
};

ExternalDistributeMgntList.defaultProps = {
  sagaKey: 'externalDistributeMgnt',
  result: {
    externalDistributeMgntList: {
      list: [],
    },
  },
  getCallDataHandler: () => {},
};

export default ExternalDistributeMgntList;
