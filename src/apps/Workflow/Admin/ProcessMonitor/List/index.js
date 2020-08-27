import React, { Component } from 'react';
import { Input, Table, Modal, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

import UserSelect from 'components/UserSelect';
import WorkProcess from 'apps/Workflow/WorkProcess';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledAntdModalPad from 'components/BizBuilder/styled/Modal/StyledAntdModalPad';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);
const AntdModalPad = StyledAntdModalPad(Modal);
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isShow: false,
      selectedRow: {},
      isPrcShow: false,
      processRule: {},
      searchInfo: {
        APPV_USER_NAME: '',
        STATUS_CD: '',
      },
    };
  }

  componentDidMount() {
    // const { sagaKey, submitHandlerBySaga } = this.props;
    // const prefixUrl = '/api/workflow/v1/common/process/ProcessMonitorHandler';
    // submitHandlerBySaga(sagaKey, 'GET', prefixUrl, {}, this.initData);
    this.getList();
  }

  getList = () => {
    const { sagaKey, submitHandlerBySaga, spinningOn } = this.props;
    const { searchInfo } = this.state;
    const prefixUrl = `/api/workflow/v1/common/process/ProcessMonitorHandler?APPV_USER_NAME=${searchInfo.APPV_USER_NAME}&STATUS_CD=${searchInfo.STATUS_CD}`;
    spinningOn();
    submitHandlerBySaga(sagaKey, 'GET', prefixUrl, {}, this.initData);
  };

  initData = (id, response) => {
    const { spinningOff } = this.props;
    const { list } = response;
    spinningOff();
    this.setState({ list });
  };

  onChangeAppvUser = row => {
    this.setState({
      isShow: true,
      selectedRow: row,
    });
  };

  onChangeAppvUserAfter = result => {
    const { selectedRow } = this.state;
    this.setState({ isShow: false }, () => {
      if (result && result.length > 0) {
        if (result.length == 1) {
          const { sagaKey, submitHandlerBySaga, spinningOn, spinningOff } = this.props;
          const confirmMsg = `결재자를 [${selectedRow.APPV_USER_NAME}]에서 [${result[0].NAME_KOR}]으로 변경하시겠습니까?`;
          const submitData = {
            PARAM: {
              QUE_ID: selectedRow.QUE_ID,
              DRAFT_PRC_ID: selectedRow.DRAFT_PRC_ID,
              APPV_USER_ID: result[0].USER_ID,
              APPV_USER_NAME: result[0].NAME_KOR,
              DEPT_ID: result[0].DEPT_ID,
              DEPT_NAME_KOR: result[0].DEPT_NAME_KOR,
              PSTN_NAME_KOR: result[0].PSTN_NAME_KOR,
              ORG_APPV_USER_ID: selectedRow.APPV_USER_ID,
              DOCNUMBER: selectedRow.DOCNUMBER,
            }
          }
  
          const callBackFunc = this.getList;
          Modal.confirm({
            title: confirmMsg,
            icon: <ExclamationCircleOutlined />,
            okText: '변경',
            cancelText: '취소',
            onOk() {
              spinningOn();
              submitHandlerBySaga(sagaKey, 'POST', `/api/workflow/v1/common/process/ChangeAppvUser`, submitData, (id, res) => {
                spinningOff();
                if (res && res.result == 2) {
                  message.success(<MessageContent>결재자를 변경하였습니다.</MessageContent>);
                  callBackFunc();
                } else {
                  message.error(<MessageContent>결재자 변경에 실패하였습니다.</MessageContent>);
                }
              });
            }
          });
        } else {
          message.info(<MessageContent>한명만 선택해 주세요.</MessageContent>);
        }
      }
    });
  };

  onCancelPopup = () => {
    this.setState({ isShow: false, isPrcShow: false });
  };

  onChangeDraftProcess = row => {
    const { sagaKey, getCallDataHandlerReturnRes, spinningOn, spinningOff } = this.props;
    const draftData = row.DRAFT_DATA ? JSON.parse(row.DRAFT_DATA) : {};
    const apiInfo = {
      key: 'prcRule',
      type: 'POST',
      url: '/api/workflow/v1/common/workprocess/defaultPrcRuleModifyHanlder',
      params: {
        PARAM: {
          PRC_ID: row.PRC_ID,
          DRAFT_INFO: {
            DRAFT_ID: row.DRAFT_ID,
          },
          DRAFT_DATA: {
            ...draftData,
          },
        }
      }
    };
    spinningOn();
    getCallDataHandlerReturnRes(sagaKey, apiInfo, (id, res) => {
      spinningOff();
      this.setState({
        isPrcShow: true,
        processRule: res.DRAFT_PROCESS,
        selectedRow: row,
      });
    });
  };

  onChangeDraftProcessAfter = (sagaKey, processRule) => {
    this.setState({
      processRule,
    });
  };

  onSaveDraftProcess = () => {
    const { processRule, selectedRow } = this.state;
    this.setState({ isPrcShow: false }, () => {
      const { sagaKey, submitHandlerBySaga, spinningOn, spinningOff } = this.props;
      const submitData = {
        DRAFT_PROCESS: {
          PRC_ID: selectedRow.PRC_ID,
          DRAFT_DATA: JSON.parse(selectedRow.DRAFT_DATA),
          ...processRule,
        }
      }
      Modal.confirm({
        title: '결재선을 반영하시겠습니까?',
        icon: <ExclamationCircleOutlined />,
        okText: '반영',
        cancelText: '취소',
        onOk() {
          spinningOn();
          submitHandlerBySaga(sagaKey, 'POST', `/api/workflow/v1/common/workprocess/draft`, submitData, (id, res) => {
            spinningOff();
            if (res) {
              message.success(<MessageContent>결재선을 반영하였습니다.</MessageContent>);
            } else {
              message.error(<MessageContent>결재선 반영에 실패하였습니다.</MessageContent>);
            }
          });
        }
      });
    });
  };

  // 재시작
  onReRequest = row => {
    const { sagaKey, submitHandlerBySaga, spinningOn, spinningOff } = this.props;
    const submitData = {
      PARAM: {
        ...row
      }
    };

    Modal.confirm({
      title: '해당 결재건을 재시작 하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      okText: '확인',
      cancelText: '취소',
      onOk() {
        spinningOn();
        submitHandlerBySaga(sagaKey, 'POST', `/api/workflow/v1/common/workprocess/quepushtest`, submitData, (id, res) => {
          spinningOff();
          if (res) {
            message.success(<MessageContent>해당 결재건을 재시작하였습니다.</MessageContent>);
          } else {
            message.error(<MessageContent>해당 결재건을 재시작에 실패하였습니다.</MessageContent>);
          }
        });
      }
    });
  };

  getTableColumns = () => [
    {
      title: '결재자',
      dataIndex: 'APPV_USER_NAME',
      key: 'APPV_USER_NAME',
      width: '15%',
      align: 'center',
      render: (text, record) => (
        <>
          {`${text} ${record.PSTN_NAME_KOR}`}
          <StyledButton className="btn-light btn-xxs ml5" onClick={() => this.onChangeAppvUser(record)}>변경</StyledButton>
        </>
      ),
    },
    {
      title: '재직상태',
      dataIndex: 'STATUS_NAME',
      key: 'STATUS_NAME',
      width: '6%',
      align: 'center'
    },
    {
      title: '결재유형',
      dataIndex: 'NODE_NAME',
      key: 'NODE_NAME',
      width: '10%',
      align: 'center'
    },
    {
      title: '문서종류',
      dataIndex: 'DRAFT_TYPE_NAME',
      key: 'DRAFT_TYPE_NAME',
      width: '10%',
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'No.',
      dataIndex: 'DOCNUMBER',
      key: 'DOCNUMBER',
      width: '22%',
      align: 'center',
      render: (text, record) => (
        <>
          {text}
          <StyledButton className="btn-light btn-xxs ml5" onClick={() => this.onChangeDraftProcess(record)}>결재선 반영</StyledButton>
          <StyledButton className="btn-light btn-xxs ml5" onClick={() => this.onReRequest(record)}>재시작</StyledButton>
        </>
      ),
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
      dataIndex: 'DRAFT_TITLE',
      key: 'DRAFT_TITLE',
      ellipsis: true,
    },
    {
      title: '기안일',
      dataIndex: 'DRAFT_DTTM',
      key: 'DRAFT_DTTM',
      align: 'center',
      width: '8%',
      render: text => moment(text).format('YYYY-MM-DD'),
    },
  ];

  // getTableColumns = () => [
  //   {
  //     title: '상태',
  //     dataIndex: 'STATUS',
  //     key: 'STATUS',
  //     width: '5%',
  //     align: 'center',
  //     render: (text, record) => {
  //       const { APPV_MEMBER, quecnt, resultcnt, STEP } = record;
  //       const jsonAppv = JSON.parse(APPV_MEMBER);
  //       return jsonAppv.length === Number(quecnt) + Number(resultcnt) && STEP !== 1 ? '정상' : '오류';
  //     },
  //   },
  //   {
  //     title: 'ID',
  //     dataIndex: 'DRAFT_ID',
  //     key: 'DRAFT_ID',
  //     ellipsis: true,
  //     width: '7%',
  //     align: 'center',
  //   },
  //   {
  //     title: '상태',
  //     dataIndex: 'STATUS',
  //     key: 'STATUS',
  //     width: '5%',
  //     align: 'center',
  //     render: (text, record) => {
  //       const { APPV_MEMBER, quecnt, resultcnt, STATUS, STEP } = record;
  //       const jsonAppv = JSON.parse(APPV_MEMBER);
  //       return jsonAppv.length !== quecnt + resultcnt || (STEP === 1 && <ExclamationCircleFilled style={{ color: '#eb2f96' }} />);
  //     },
  //   },
  //   {
  //     title: '단계',
  //     dataIndex: 'STEP',
  //     key: 'STEP',
  //     width: '5%',
  //     align: 'center',
  //   },
  //   {
  //     title: '결재유형',
  //     dataIndex: 'NODE_NAME',
  //     key: 'NODE_NAME',
  //     width: '10%',
  //     align: 'center',
  //   },
  //   {
  //     title: '상태메시지',
  //     dataIndex: 'MESSAGE',
  //     key: 'MESSAGE',
  //     width: '24%',
  //     render: (text, record) => {
  //       let message = '';
  //       const { APPV_MEMBER, quecnt, resultcnt, STEP } = record;
  //       const jsonAppv = JSON.parse(APPV_MEMBER);
  //       if (jsonAppv.length !== quecnt + resultcnt) {
  //         message = '결재시 오류 발생 (Queue 데이터 문제)';
  //       } else if (quecnt === 0 && jsonAppv.length !== resultcnt) {
  //         message = '다음 심사프로세스 진행 도중 오류 발생';
  //       } else if (STEP === 1) {
  //         message = '기안시 오류 발생 (Queue 데이터 문제)';
  //       }
  //       return message;
  //     },
  //   },
  //   {
  //     title: '프로세스 종류',
  //     dataIndex: 'PRC_NAME',
  //     key: 'PRC_NAME',
  //     ellipsis: true,
  //     width: '10%',
  //     align: 'center',
  //   },
  //   {
  //     title: '기안제목',
  //     dataIndex: 'DRAFT_TITLE',
  //     key: 'DRAFT_TITLE',
  //     ellipsis: true,
  //   },
  //   {
  //     title: '기안일',
  //     dataIndex: 'REG_DTTM',
  //     key: 'REG_DTTM',
  //     width: '11%',
  //     align: 'center',
  //     render: (text, record) => moment(text).format('YYYY-MM-DD'),
  //   },
  // ];

  render() {
    const { list, selectedRow, processRule } = this.state;

    return (
      <>
        <AntdModal
          width={1000}
          visible={this.state.isShow}
          title="결재자 변경"
          onCancel={this.onCancelPopup}
          destroyOnClose
          footer={null}
        >
          <UserSelect
            onUserSelectedComplete={this.onChangeAppvUserAfter}
            onCancel={this.onCancelPopup}
          />
        </AntdModal>
        <AntdModalPad
          width={1000}
          visible={this.state.isPrcShow}
          title="결재선"
          onCancel={this.onCancelPopup}
          destroyOnClose
          footer={[
            <StyledButton className="btn-light btn-sm" onClick={this.onCancelPopup}>취소</StyledButton>,
            <StyledButton className="btn-primary btn-sm" onClick={this.onSaveDraftProcess}>확인</StyledButton>
          ]}
        >
          <WorkProcess
            id={this.props.sagaKey}
            // CustomWorkProcess={CustomWorkProcess}
            // CustomWorkProcessModal={CustomWorkProcessModal}
            PRC_ID={selectedRow.PRC_ID}
            processRule={processRule}
            setProcessRule={this.onChangeDraftProcessAfter}
          />
        </AntdModalPad>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <AntdInput
                className="ant-input-sm mr5" style={{ width: 100 }} allowClear placeholder="결재자"
                onChange={e => this.setState({ searchInfo: { ...this.state.searchInfo, APPV_USER_NAME: e.target.value }})}
                onPressEnter={this.getList}
              />
              <AntdSelect
                className="select-sm mr5" style={{ width: 100 }} allowClear placeholder="재직상태"
                onChange={val => this.setState({ searchInfo: { ...this.state.searchInfo, STATUS_CD: val }})}
              >
                <AntdSelect.Option value="C">재직</AntdSelect.Option>
                <AntdSelect.Option value="T">퇴직</AntdSelect.Option>
              </AntdSelect>
              <StyledButton className="btn-gray btn-sm" onClick={this.getList}>검색</StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <AntdTable
            columns={this.getTableColumns()}
            dataSource={list}
            // onRow={(record, rowIndex) => ({
            //   onClick: e => this.onRowClick(record, rowIndex, e),
            // })}
            bordered
          />
        </StyledContentsWrapper>
      </>
    );
  }
}

export default List;
