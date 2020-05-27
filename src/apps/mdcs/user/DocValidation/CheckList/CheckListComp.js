import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, Modal, message } from 'antd';
import moment from 'moment';

import ContentsWrapper from 'commonStyled/MdcsStyled/Wrapper/ContentsWrapper';
import StyledLineTable from 'commonStyled/MdcsStyled/Table/StyledLineTable';
import StyledContentsModal from 'commonStyled/MdcsStyled/Modal/StyledContentsModal';
import ValidationView from './validationView';

const AntdLineTable = StyledLineTable(Table);
const AntdModal = StyledContentsModal(Modal);
class CheckListComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  getTableColumns = () => [
    {
      title: 'No',
      dataIndex: 'DOCNUMBER',
      key: 'DOCNUMBER',
      width: '10%',
      align: 'center',
    },
    {
      title: 'Rev',
      dataIndex: 'VERSION',
      key: 'VERSION',
      width: '6%',
      align: 'center',
    },
    {
      title: '제목',
      dataIndex: 'TITLE',
      key: 'TITLE',
    },
    {
      title: '상태',
      dataIndex: 'STATUS',
      key: 'STATUS',
      align: 'center',
      width: '10%',
      render: (text, record) => (text === 9 ? '부결' : '점검대기'),
    },
    {
      title: 'Effect Date',
      dataIndex: 'END_DTTM',
      key: 'END_DTTM',
      width: '10%',
      align: 'center',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: '기안부서',
      dataIndex: 'REG_DEPT_NAME',
      key: 'REG_DEPT_NAME',
      width: '16%',
      align: 'center',
    },
    {
      title: '기안자',
      dataIndex: 'REG_USER_NAME',
      key: 'REG_USER_NAME',
      width: '10%',
      align: 'center',
    },
  ];

  componentDidMount() {
    const { getCustomDataBind } = this.props;
    const rtnUrl = '/api/mdcs/v1/common/MdcsDocValidationListHandler';
    getCustomDataBind('POST', rtnUrl, {});
  }

  onRowClick = (record, rowIndex, e) => {
    this.setState({ visible: true, workSeq: record.WORK_SEQ, taskSeq: record.TASK_SEQ, taskOrginSeq: record.TASK_ORIGIN_SEQ, title: record.TITLE });
  };

  onModalClose = () => {
    this.setState({ visible: false });
  };

  onValidateProcess = (vadildate, workProcess, workSeq, taskSeq, orginTaskSeq) => {
    console.debug('onValidateProcess', workProcess);
    const { id, submitHandlerBySaga } = this.props;
    const prefixUrl = '/api/workflow/v1/common/workprocess/draft';
    submitHandlerBySaga(id, 'POST', prefixUrl, workProcess, this.onCompleteProc);
  };

  onCompleteProc = () => {
    const { getCustomDataBind } = this.props;
    this.onModalClose();
    const rtnUrl = '/api/mdcs/v1/common/MdcsDocValidationListHandler';
    getCustomDataBind('POST', rtnUrl, {});
    message.success('유효성 결재 요청완료');
  };

  render() {
    const { visible, workSeq, taskSeq, taskOrginSeq, title } = this.state;
    const { customDataList } = this.props;
    return (
      <ContentsWrapper>
        <div className="pageTitle">
          <p>
            <Icon type="form" /> 유효성 점검리스트
          </p>
        </div>
        <AntdLineTable
          columns={this.getTableColumns()}
          dataSource={customDataList}
          onRow={(record, rowIndex) => ({
            onClick: e => this.onRowClick(record, rowIndex, e),
          })}
          bordered
          className="tableWrapper"
        />
        <AntdModal title="유효성 점검" visible={visible} width={680} destroyOnClose onCancel={this.onModalClose} footer={[]}>
          <ValidationView
            {...this.props}
            WORK_SEQ={workSeq}
            TASK_SEQ={taskSeq}
            TASK_ORIGIN_SEQ={taskOrginSeq}
            TITLE={title}
            onValidateProcess={this.onValidateProcess}
            onModalClose={this.onModalClose}
          />
        </AntdModal>
      </ContentsWrapper>
    );
  }
}

CheckListComp.propTypes = {};

export default CheckListComp;
