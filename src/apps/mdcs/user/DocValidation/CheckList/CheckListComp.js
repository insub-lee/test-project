import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, Modal, Spin } from 'antd';
import moment from 'moment';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import ValidationView from './validationView';
import BatchValidationView from './batchValidationView';
import SearchBar from '../SearchBar';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);
class CheckListComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalObj: {
        visible: false,
        title: '',
        content: [],
      },
      searchParam: {},
      selectedRowKeys: [],
      selectedRows: [],
      loading: false,
      pageSize: 10,
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
      width: '5%',
      align: 'center',
    },
    {
      title: '제목',
      dataIndex: 'TITLE',
      key: 'TITLE',
      ellipsis: true,
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
      width: '20%',
      align: 'center',
      ellipsis: true,
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
    this.getList();
  }

  getList = (params = this.state?.searchParam) => {
    const { getCustomDataBind } = this.props;
    const rtnUrl = '/api/mdcs/v1/common/MdcsDocValidationListHandler';
    this.spinningOn();
    getCustomDataBind('POST', rtnUrl, { PARAM: params }, () => this.setState({ searchParam: params }, this.spinningOff));
  };

  spinningOn = () => this.setState({ loading: true });

  spinningOff = () => this.setState({ loading: false });

  onRowClick = (record, rowIndex, e) =>
    this.handleModal(true, '유효성 점검', [
      <ValidationView
        {...this.props}
        WORK_SEQ={record?.WORK_SEQ}
        TASK_SEQ={record?.TASK_SEQ}
        TASK_ORIGIN_SEQ={record?.TASK_ORIGIN_SEQ}
        TITLE={record?.TITLE}
        onShowProces={this.state.isShowProcess}
        onValidateProcess={this.onValidateProcess}
        onModalClose={() => this.handleModal()}
      />,
    ]);

  handleModal = (visible = false, title = '', content = []) =>
    this.setState({
      modalObj: {
        visible,
        title,
        content,
      },
    });

  onValidateProcess = (validate, revDate, workProcess, callBack) => {
    const { id, submitHandlerBySaga } = this.props;
    let isByPass = true;
    const { DRAFT_PROCESS } = workProcess;
    const { DRAFT_PROCESS_STEP } = DRAFT_PROCESS;

    const ruleCheckList = DRAFT_PROCESS_STEP.filter(rule => rule.ISREQUIRED === 1);
    if (validate === 1 && ruleCheckList.length > 0) {
      ruleCheckList.forEach(rule => {
        if (rule.APPV_MEMBER.length === 0) {
          isByPass = false;
          message.error(`${rule.NODE_NAME_KOR} 단계의 결재를 선택해 주세요`);
        }
      });
    }
    const { DRAFT_DATA } = DRAFT_PROCESS;
    const nDraftData = { ...DRAFT_DATA, validateType: validate, revDate };
    const nWorkProcess = { ...DRAFT_PROCESS, DRAFT_DATA: nDraftData };
    if (isByPass) {
      const fixUrl = '/api/workflow/v1/common/workprocess/draft';
      submitHandlerBySaga(id, 'POST', fixUrl, { DRAFT_PROCESS: nWorkProcess }, typeof callBack === 'function' ? callBack() : this.onCompleteProc());
    }
  };

  onCompleteProc = () => {
    this.handleModal();
    this.getList();
    this.showMessage('유효성 결재 요청완료');
  };

  showMessage = text => message.info(<MessageContent>{text}</MessageContent>);

  render() {
    const { modalObj } = this.state;
    const { customDataList } = this.props;
    return (
      <Spin spinning={this.state.loading}>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 유효성 점검리스트
            </p>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          <SearchBar
            getList={params => this.getList(params)}
            customButtons={[
              <StyledButton
                className="btn-primary btn-sm mr5"
                key="BATCHVALIDATIONVIEW"
                onClick={() => {
                  if (0 in this.state?.selectedRows) {
                    return this.handleModal(true, '유효성 점검 일괄 결재', [
                      <BatchValidationView
                        {...this.props}
                        onShowProces={this.state.isShowProcess}
                        onValidateProcess={this.onValidateProcess}
                        onCompleteProc={this.onCompleteProc}
                        onModalClose={() => this.handleModal()}
                        selectedRows={this.state?.selectedRows}
                      />,
                    ]);
                  }
                  return this.showMessage('선택된 결재건이 없습니다.');
                }}
              >
                일괄 결재
              </StyledButton>,
            ]}
            onChangePageSize={pageSize => this.setState({ pageSize })}
            typeSearch={false}
          />
          <AntdTable
            columns={this.getTableColumns()}
            dataSource={customDataList}
            rowKey="TASK_SEQ"
            onRow={(record, rowIndex) => ({
              onClick: e => this.onRowClick(record, rowIndex, e),
            })}
            rowSelection={{
              columnWidth: '3%',
              selectedRowKeys: this.state?.selectedRowKeys || [],
              onChange: (selectedRowKeys, selectedRows) => this.setState({ selectedRowKeys, selectedRows }),
            }}
            bordered
            pagination={{ pageSize: this.state?.pageSize }}
          />
          <AntdModal title={modalObj?.title} visible={modalObj?.visible} width={680} destroyOnClose onCancel={() => this.handleModal()} footer={[]}>
            {modalObj?.content}
          </AntdModal>
        </StyledContentsWrapper>
      </Spin>
    );
  }
}

CheckListComp.propTypes = {
  customDataList: PropTypes.array,
};

export default CheckListComp;
