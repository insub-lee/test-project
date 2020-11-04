/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Radio, Input, Button, Icon, Select, message, Modal, Table } from 'antd';

import BizBuilderBase from 'components/BizBuilderBase';
import UserSelect from 'components/UserSelect';
import AbrogationMultiModifyDraft from 'apps/Workflow/User/CommonView/abrogationMultiModifyDraft';
import StyledInputView from 'apps/mdcs/styled/StyledInput';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledTagDraft from 'components/BizBuilder/styled/Tag/StyledTagDraft';
import WorkProcessModal from 'apps/Workflow/WorkProcess/WorkProcessModal';

const AntdModal = StyledAntdModal(Modal);
const { Option } = Select;
const { TextArea } = Input;
const AntdTextArea = StyledTextarea(Input.TextArea);
const AntdLineTable = StyledAntdTable(Table);

class SafetyAppCopyView extends Component {
  // eslint-disable-next-line react/state-in-constructor
  constructor(props) {
    super(props);
    this.state = {
      modalWidth: 800,
      userInfo: [],
      selectedUser: undefined,
      nextApprover: [],
      coverView: {
        visible: false,
        workSeq: undefined,
        taskSeq: undefined,
        viewMetaSeq: undefined,
      },
      isUserSelect: false,
      procResult: [],
      holdHistoryList: [],
      isMultiSelect: true,
      workPrcProps: undefined,
      isDcc: false,
      opinion: undefined,
      isAbrogationMultiShow: false,
      workseq: undefined,
      taskSeq: undefined,
      isObsCheck: undefined,
    };
  }

  componentDidMount() {
    const { id, selectedRow, setSelectedRow, APPV_STATUS, submitHandlerBySaga, profile } = this.props;
    const { WORK_SEQ, TASK_SEQ, DRAFT_PRC_ID, QUE_ID, STEP, DRAFT_ID } = selectedRow;
    const appvStatus = selectedRow && selectedRow.CURRENT_STATUS && selectedRow.CURRENT_STATUS == 10 ? 20 : 2;
    const nSelectRow = { ...selectedRow, APPV_STATUS: appvStatus };
    setSelectedRow(nSelectRow);

    const strVgroup = profile && profile.ACCOUNT_IDS_DETAIL && profile.ACCOUNT_IDS_DETAIL.V;
    const vList = strVgroup.split(',').findIndex(x => x === '1221');
    if (vList !== -1 && STEP === 2) {
      this.setState({ isDCC: true });
    }
    const prefixUrl = '/api/workflow/v1/common/workprocess/draftprocresult';
    const param = {
      PARAM: {
        WORK_SEQ,
        TASK_SEQ,
        PARENT_DRAFT_PRC_ID: DRAFT_PRC_ID,
        DRAFT_ID,
        QUE_ID,
        STEP,
      },
    };
    submitHandlerBySaga(id, 'POST', prefixUrl, param, this.initDataDelegate);
  }

  initDataDelegate = (id, response) => {
    const { procResult, holdHistoryList } = response;
    this.setState({ procResult, holdHistoryList });
  };

  onChange = e => {
    const { selectedRow, setSelectedRow, APPV_STATUS } = this.props;
    const isMultiSelect = APPV_STATUS !== 10;
    const nSelectRow = { ...selectedRow, APPV_STATUS: e.target.value };
    setSelectedRow(nSelectRow);
    if (e.target.value === 5 || e.target.value === 10) {
      this.setState({ nextApprover: [], userList: [] });
    }
    this.setState({ isMultiSelect });
  };

  handleReqApprove = (e, appvStatus) => {
    const { opinion, nextApprover } = this.state;
    const { id, selectedRow, submitHandlerBySaga } = this.props;

    if (appvStatus === 9 && !opinion) {
      message.info('부결사유를 입력 해주세요.');
      return;
    }
    if (selectedRow?.STEP === 2) {
      submitHandlerBySaga(id, 'GET', `/api/eshs/v1/common/eshsSafetyImproveApproveBeforeCheck?REQ_NO=${selectedRow?.REL_KEY2}`, {}, (_, res) => {
        const { detail, flags } = res;

        if (detail?.DA_REG_NO && flags?.endChk === 'N') return message.info('위험성평가 재평가 실시 되지 않았습니다. 재평가 실시 후 결재가 가능합니다.');
        if (detail?.SAVE_STATUS !== '1') return message.info('조치후 정보가 저장되지 않았습니다. 저장후 결재가 가능합니다.');

        this.props.setOpinion(opinion);
        this.props.reqApprove(appvStatus);
        this.props.setOpinionVisible(false);
        return this.onModalClose();
      });
    } else {
      this.props.setOpinion(opinion);
      this.props.reqApprove(appvStatus);
      this.props.setOpinionVisible(false);
      this.onModalClose();
    }
  };

  onModalClose = () => {
    const { getUnApproveList } = this.props;
    const prefixUrl = '/api/workflow/v1/common/approve/unApproveList';
    getUnApproveList(prefixUrl);
    this.props.setViewVisible(false);
  };

  clickCoverView = (workSeq, taskSeq, viewMetaSeq) => {
    const { selectedRow } = this.props;
    if (selectedRow.REL_TYPE === 99) {
      this.setState({ isObsCheck: true });
    } else {
      this.setState({ isObsCheck: false });
    }
    const coverView = { workSeq, taskSeq, viewMetaSeq, visible: true, viewType: 'VIEW' };
    this.setState({ coverView });
  };

  onCloseCoverView = () => {
    const { coverView } = this.state;
    const tempCoverView = { ...coverView, visible: false };
    this.setState({ coverView: tempCoverView });
  };

  getTableColumns = () => [
    {
      title: '문서번호',
      dataIndex: 'DOCNUMBER',
      key: 'DOCNUMBER',
      width: '15%',
      align: 'center',
    },
    {
      title: '개정번호',
      dataIndex: 'VERSION',
      key: 'VERSION',
      width: '13%',
      align: 'center',
      render: text => (text.split('.').length > 0 ? text.split('.')[0] : text),
    },
    {
      title: 'Title',
      dataIndex: 'TITLE',
      key: 'TITLE',
      ellipsis: true,
    },
    {
      title: 'Effective Date',
      dataIndex: 'REG_DTTM',
      key: 'REG_DTTM',
      width: '15%',
      align: 'center',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
  ];

  onUserSelectedComplete = result => {
    const { selectedRow, setSelectedRow } = this.props;
    const userList = result.map(item => item.USER_ID);
    this.setState(
      {
        userList,
        nextApprover: result,
        isUserSelect: false,
      },
      () => {
        const nRuleConfig = selectedRow.RULE_CONFIG;
        const nSelectedRow = {
          ...selectedRow,
          RULE_CONFIG: {
            ...nRuleConfig,
            NEXT_APPV_USER_ID: this.state.nextApprover,
          },
        };
        setSelectedRow(nSelectedRow);
      },
    );
  };

  onClickUserSelect = () => {
    this.setState({ isUserSelect: true });
  };

  onCancelUserSelect = () => {
    this.setState({ isUserSelect: false });
  };

  onClickModify = () => {
    const { selectedRow } = this.props;
    const { REL_TYPE } = selectedRow;

    if (REL_TYPE === 999) {
      this.setState({ isAbrogationMultiShow: true, workPrcProps: { ...selectedRow, draftMethod: 'MODIFY' } });
    } else {
      const coverView = { workSeq: selectedRow.WORK_SEQ, taskSeq: selectedRow.TASK_SEQ, visible: true, viewType: 'MODIFY' };
      this.setState(prevState => {
        const { workPrcProps } = prevState;
        const nWorkPrcProps = { ...selectedRow, draftMethod: 'MODIFY', darft_id: selectedRow.DRAFT_ID };
        return { ...prevState, coverView, workPrcProps: { ...nWorkPrcProps } };
      });
    }
  };

  onChangeOpinion = e => {
    this.setState({ opinion: e.target.value });
  };

  onCloseAbrogationMultiModal = () => {
    this.setState({ isAbrogationMultiShow: false });
  };

  onAbrogationMultiProcess = workPrcProps => {
    const { id, submitHandlerBySaga } = this.props;
    const prefixUrl = '/api/workflow/v1/common/workprocess/draft';
    submitHandlerBySaga(id, 'POST', prefixUrl, { DRAFT_PROCESS: workPrcProps }, this.onCompleteProc);
  };

  onCompleteProc = () => {
    this.setState({
      isAbrogationMultiShow: false,
    });
  };

  onAbrogClick = (record, rowIndex, e) => {
    console.debug(record, rowIndex, e);
  };

  render() {
    const { selectedRow } = this.props;
    const { DRAFT_DATA, REL_TYPE, REL_KEY } = selectedRow;
    const {
      modalWidth,
      coverView,
      isUserSelect,
      nextApprover,
      procResult,
      holdHistoryList,
      userList,
      isMultiSelect,
      workPrcProps,
      isDCC,
      isAbrogationMultiShow,
      isObsCheck,
    } = this.state;

    return (
      <>
        <StyledHtmlTable style={{ padding: '20px 20px 0' }}>
          <table>
            <tbody>
              <tr>
                <th style={{ width: '150px' }}>결재방법 </th>
                <td colSpan={3}>
                  <Radio.Group onChange={this.onChange} defaultValue={selectedRow?.CURRENT_STATUS === 10 ? 20 : 2}>
                    <Radio value={selectedRow?.CURRENT_STATUS === 10 ? 20 : 2}>승인</Radio>
                    {selectedRow?.RULE_CONFIG?.RejectBtn && <Radio value={selectedRow?.STEP === 2 ? 9 : 999}>부결</Radio>}
                    {/* NodeEshsSafetyApprover otherProcess 실행 */}
                  </Radio.Group>
                </td>
              </tr>
              {selectedRow.REL_TYPE === 999 && (
                <tr>
                  <th>폐기사유</th>
                  <td colSpan={3}>
                    <pre>{DRAFT_DATA.descOfChange}</pre>
                  </td>
                </tr>
              )}
              <tr style={{ display: procResult && procResult.length > 0 ? 'table-row' : 'none' }}>
                <td colSpan={4} style={{ padding: 0, border: 0 }}>
                  <table style={{ width: '100%', borderTop: 0 }}>
                    <colgroup>
                      <col width="10%" />
                      <col width="10%" />
                      <col width="10%" />
                      <col width="55%" />
                      <col width="15%" />
                    </colgroup>
                    <tr>
                      <th>실무자</th>
                      <th>직급</th>
                      <th>결과</th>
                      <th>검토의견</th>
                      <th style={{ borderRight: 0 }}>검토일</th>
                    </tr>
                    {procResult &&
                      procResult.map(item => (
                        <tr>
                          <td style={{ textAlign: 'center' }}>{item.APPV_USER_NAME}</td>
                          <td style={{ textAlign: 'center' }}>{item.APPV_PSTN_NAME}</td>
                          <td style={{ textAlign: 'center' }}>{item.APPV_STATUS === 2 ? '승인' : '부결'}</td>
                          <td>{item.OPINION}</td>
                          <td style={{ textAlign: 'center' }}>{item.APPV_DTTM ? moment(item.APPV_DTTM).format('YYYY-MM-DD') : ''}</td>
                        </tr>
                      ))}
                  </table>
                </td>
              </tr>
              <tr style={{ display: holdHistoryList.length > 0 ? 'table-row' : 'none' }}>
                <td colSpan={4} style={{ padding: 0, border: 0 }}>
                  <table style={{ width: '100%', borderTop: 0 }}>
                    <colgroup>
                      <col width="10%" />
                      <col width="10%" />
                      <col width="20%" />
                      <col width="45%" />
                      <col width="15%" />
                    </colgroup>
                    <tr>
                      <th>이름</th>
                      <th>직급</th>
                      <th>부서</th>
                      <th>홀드해제의견</th>
                      <th style={{ borderRight: 0 }}>해제일</th>
                    </tr>
                    {holdHistoryList.map(item => (
                      <tr>
                        <td style={{ textAlign: 'center' }}>{item.APPV_USER_NAME}</td>
                        <td style={{ textAlign: 'center' }}>{item.APPV_PSTN_NAME}</td>
                        <td style={{ textAlign: 'center' }}>{item.APPV_DEPT_NAME}</td>
                        <td>{item.OPINION}</td>
                        <td style={{ textAlign: 'center' }}>{moment(item.APPV_DTTM).format('YYYY-MM-DD')}</td>
                      </tr>
                    ))}
                  </table>
                </td>
              </tr>
              <tr
                style={{
                  display: selectedRow?.APPV_STATUS === 9 || selectedRow?.APPV_STATUS === 999 ? 'table-row' : 'none',
                }}
              >
                <th>부결 의견</th>
                <td colSpan={3}>
                  <AntdTextArea rows={4} onChange={this.onChangeOpinion} />
                </td>
              </tr>
            </tbody>
          </table>

          <StyledButtonWrapper className="btn-wrap-center" style={{ marginTop: '10px' }}>
            <StyledButton
              key="ok"
              className="btn-primary mr5 btn-sm"
              onClick={e => {
                this.handleReqApprove(e, selectedRow.APPV_STATUS);
              }}
            >
              승인
            </StyledButton>
            <StyledButton key="close" className="btn-light btn-sm" onClick={this.onModalClose}>
              닫기
            </StyledButton>
          </StyledButtonWrapper>
        </StyledHtmlTable>
      </>
    );
  }
}

SafetyAppCopyView.propTypes = {
  APPV_STATUS: PropTypes.number,
};

SafetyAppCopyView.defaultProps = {
  APPV_STATUS: 2,
};

export default SafetyAppCopyView;
