import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, Modal, message } from 'antd';
import moment from 'moment';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import ValidationView from './validationView';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);
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

  onValidateProcess = (validate, workProcess, workSeq, taskSeq, orginTaskSeq) => {
    const { id, submitHandlerBySaga } = this.props;
    let isByPass = true;
    const { DRAFT_PROCESS } = workProcess;
    const { DRAFT_PROCESS_STEP } = DRAFT_PROCESS;

    if (validate === 1) {
      const ruleCheckList = DRAFT_PROCESS_STEP.filter(rule => rule.ISREQUIRED === 1);
      if (ruleCheckList.length > 0) {
        ruleCheckList.forEach(rule => {
          if (rule.APPV_MEMBER.length === 0) {
            isByPass = false;
            message.error(`${rule.NODE_NAME_KOR} 단계의 결재를 선택해 주세요`);
          }
        });
      }
      const DARFT_DATA = { validateType: validate };
      const nWorkProcess = { ...DRAFT_PROCESS, DARFT_DATA };
      if (isByPass) {
        const fixUrl = '/api/workflow/v1/common/workprocess/draft';
        submitHandlerBySaga(id, 'POST', fixUrl, { DRAFT_PROCESS: nWorkProcess }, this.onCompleteProc);
      }
    } else {
      const checkType = validate === 2 ? 'R' : 'O';
      const param = { PARAM: { WORK_SEQ: workSeq, TASK_SEQ: taskSeq, TASK_ORIGIN_SEQ: orginTaskSeq, DRAFT_ID: 0, CHECKTYPE: checkType, STATUS: 0 } };
      const fixUrl = '/api/mdcs/v1/common/ValidationHandler';
      submitHandlerBySaga(id, 'POST', fixUrl, param, this.onCompleteProc);
    }
  };

  onCompleteProc = () => {
    const { getCustomDataBind } = this.props;
    this.onModalClose();
    const rtnUrl = '/api/mdcs/v1/common/MdcsDocValidationListHandler';
    getCustomDataBind('POST', rtnUrl, {});
    message.success('유효성 결재 요청완료');
  };

  render() {
    const { visible, workSeq, taskSeq, taskOrginSeq, title, isShowProcess } = this.state;
    const { customDataList } = this.props;
    return (
      <>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 유효성 점검리스트
            </p>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          <AntdTable
            columns={this.getTableColumns()}
            dataSource={customDataList}
            onRow={(record, rowIndex) => ({
              onClick: e => this.onRowClick(record, rowIndex, e),
            })}
            bordered
          />
          <AntdModal title="유효성 점검" visible={visible} width={680} destroyOnClose onCancel={this.onModalClose} footer={[]}>
            <ValidationView
              {...this.props}
              WORK_SEQ={workSeq}
              TASK_SEQ={taskSeq}
              TASK_ORIGIN_SEQ={taskOrginSeq}
              TITLE={title}
              onShowProces={isShowProcess}
              onValidateProcess={this.onValidateProcess}
              onModalClose={this.onModalClose}
            />
          </AntdModal>
        </StyledContentsWrapper>
      </>
    );
  }
}

CheckListComp.propTypes = {};

export default CheckListComp;
