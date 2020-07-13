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

const AntdModal = StyledAntdModal(Modal);
const { Option } = Select;
const { TextArea } = Input;
const AntdTextArea = StyledTextarea(Input.TextArea);
const AntdLineTable = StyledAntdTable(Table);
let timeout;

class MdcsAppvView extends Component {
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
      undefined,
      isMultiSelect: true,
      workPrcProps: undefined,
      isDcc: false,
      opinion: undefined,
      isAbrogationMultiShow: false,
      workseq: undefined,
      taskSeq: undefined,
    };
  }

  componentDidMount() {
    const { id, selectedRow, setSelectedRow, APPV_STATUS, submitHandlerBySaga, profile } = this.props;
    const { WORK_SEQ, TASK_SEQ, DRAFT_PRC_ID, QUE_ID, STEP } = selectedRow;

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
    this.setState({ isMultiSelect });
  };

  handleReqApprove = (e, appvStatus) => {
    const { opinion } = this.state;
    if (((appvStatus === 3 || appvStatus === 30) && !opinion) || opinion === '') {
      message.warning('의견을 작성해주세요');
    } else {
      this.props.setOpinion(opinion);
      this.props.reqApprove(appvStatus);
      this.props.setOpinionVisible(false);
    }
  };

  onModalClose = () => {
    const { getUnApproveList } = this.props;
    const prefixUrl = '/api/workflow/v1/common/approve/UnApproveListMDCSHandler';
    getUnApproveList(prefixUrl);
    this.props.setViewVisible(false);
  };

  clickCoverView = (workSeq, taskSeq, viewMetaSeq) => {
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
      width: '13%',
    },
    {
      title: '개정번호',
      dataIndex: 'VERSION',
      key: 'VERSION',
      width: '13%',
      align: 'center',
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
      // 일괄폐기 수정화면
      this.setState({ isAbrogationMultiShow: true, workPrcProps: { ...selectedRow, draftMethod: 'modify' } });
    } else {
      const coverView = { workSeq: selectedRow.WORK_SEQ, taskSeq: selectedRow.TASK_SEQ, visible: true, viewType: 'MODIFY' };
      this.setState(prevState => {
        const { workPrcProps } = prevState;
        const nWorkPrcProps = { ...workPrcProps, draftMethod: 'modify', darft_id: selectedRow.DRAFT_ID };
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
    const { DRAFT_DATA, REL_TYPE } = selectedRow;
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
    } = this.state;
    return (
      <>
        <StyledHtmlTable style={{ padding: '20px 20px 0' }}>
          {REL_TYPE === 4 ? (
            <table>
              <tbody>
                <tr>
                  <th style={{ width: '150px' }}>요청종류 </th>
                  <td colSpan={3}>{DRAFT_DATA && DRAFT_DATA.IDX === 2 ? '기안용 Download 권한신청 ' : 'Print 권한신청 '}</td>
                </tr>
                <tr>
                  <th style={{ width: '150px' }}>요청자 </th>
                  <td>{selectedRow && selectedRow.NAME_KOR}</td>
                  <th style={{ width: '150px' }}>요청일 </th>
                  <td>{selectedRow && moment(selectedRow.REG_DTTM).format('YYYY-MM-DD')}</td>
                </tr>
                <tr>
                  <th style={{ width: '150px' }}>요청사용 </th>
                  <td colSpan={3}>{DRAFT_DATA && DRAFT_DATA.OPINION}</td>
                </tr>
                <tr>
                  <th style={{ width: '150px' }}>결재방법 </th>
                  <td colSpan={3}>
                    <Radio.Group defaultValue={2} onChange={this.onChange}>
                      <Radio value={2}>Download 권한승인</Radio>
                      <Radio value={9}>Download 권한거부 </Radio>
                    </Radio.Group>
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table>
              <tbody>
                <tr>
                  <th style={{ width: '150px' }}>결재방법 </th>
                  <td colSpan={3}>
                    <Radio.Group
                      onChange={this.onChange}
                      defaultValue={selectedRow && selectedRow.CURRENT_STATUS && selectedRow.CURRENT_STATUS === 10 ? 20 : 2}
                    >
                      <Radio value={selectedRow && selectedRow.CURRENT_STATUS && selectedRow.CURRENT_STATUS === 10 ? 20 : 2}>승인</Radio>
                      <Radio value={selectedRow && selectedRow.CURRENT_STATUS && selectedRow.CURRENT_STATUS === 10 ? 30 : 3}>Hold</Radio>
                      {selectedRow.NODE_ID === 106 && <Radio value={5}>실무자 검토의뢰</Radio>}
                      {selectedRow.NODE_ID === 106 && <Radio value={10}>실무자 결재 권한위임</Radio>}
                    </Radio.Group>
                  </td>
                </tr>

                <tr
                  style={{
                    display: (selectedRow && selectedRow.APPV_STATUS && selectedRow.APPV_STATUS === 5) || selectedRow.APPV_STATUS === 10 ? 'table-row' : 'none',
                  }}
                >
                  <th style={{ width: '150px' }}>선택된 실무자 </th>
                  <td colSpan={3}>
                    <StyledButton onClick={this.onClickUserSelect} className="btn-gray btn-xs">
                      <Icon type="search" style={{ marginRight: '5px' }} />
                      실무자검색
                    </StyledButton>
                    <div>
                      {nextApprover &&
                        nextApprover.map(user => (
                          <StyledTagDraft>
                            <Icon type="user" />
                            <span className="infoTxt">{`${user.NAME_KOR} (${user.DEPT_NAME_KOR})`}</span>
                          </StyledTagDraft>
                        ))}
                    </div>
                  </td>
                </tr>
                <tr style={{ display: procResult.length > 0 ? 'table-row' : 'none' }}>
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
                      {procResult.map(item => (
                        <tr>
                          <td style={{ textAlign: 'center' }}>{item.DRAFT_USER_NAME}</td>
                          <td style={{ textAlign: 'center' }}>{item.PSTN_NAME}</td>
                          <td style={{ textAlign: 'center' }}>{item.APPV_STATUS}</td>
                          <td>{item.OPINION}</td>
                          <td style={{ textAlign: 'center' }}>{moment(item.REG_DTTM).format('YYYY-MM-DD')}</td>
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
                <tr style={{ display: REL_TYPE !== 4 ? 'table-row' : 'none' }}>
                  <th>의견 </th>
                  <td colSpan={3}>
                    {/* <AntdTextArea rows={4} onChange={e => this.props.setOpinion(e.target.value)} /> */}
                    <AntdTextArea rows={4} onChange={this.onChangeOpinion} />
                  </td>
                </tr>
              </tbody>
            </table>
          )}

          <StyledButtonWrapper className="btn-wrap-center" style={{ marginTop: '10px' }}>
            {REL_TYPE !== 4 && isDCC && (
              <StyledButton key="ok" className="btn-primary mr5 btn-sm" onClick={this.onClickModify}>
                표지 수정
              </StyledButton>
            )}

            <StyledButton key="ok" className="btn-primary mr5 btn-sm" onClick={e => this.handleReqApprove(e, selectedRow.APPV_STATUS)}>
              승인
            </StyledButton>
            <StyledButton key="close" className="btn-light btn-sm" onClick={this.onModalClose}>
              닫기
            </StyledButton>
          </StyledButtonWrapper>
        </StyledHtmlTable>
        {selectedRow && selectedRow.REL_TYPE && selectedRow.REL_TYPE !== 999 ? (
          <BizBuilderBase
            sagaKey="approveBase_approveView"
            viewType="VIEW"
            workSeq={selectedRow && selectedRow.WORK_SEQ}
            taskSeq={selectedRow && selectedRow.TASK_SEQ}
            selectedRow={selectedRow}
            clickCoverView={this.clickCoverView}
            ViewCustomButtons={() => false}
          />
        ) : (
          <>
            <StyledHtmlTable style={{ padding: '20px 20px 20px' }}>
              <AntdLineTable
                columns={this.getTableColumns()}
                dataSource={DRAFT_DATA.abrogationList !== null ? DRAFT_DATA.abrogationList : []}
                bordered
                className="tableWrapper"
                pagination={false}
              />
            </StyledHtmlTable>
            <AntdModal
              destroyOnClose
              style={{ top: '50px' }}
              width={900}
              visible={isAbrogationMultiShow}
              onCancel={this.onCloseAbrogationMultiModal}
              footer={null}
              maskClosable={false}
            >
              <StyledInputView>
                <div className="pop_tit">표준 일괄 폐기</div>
                <AbrogationMultiModifyDraft
                  workPrcProps={workPrcProps}
                  {...this.props}
                  onAbrogationMultiProcess={this.onAbrogationMultiProcess}
                  onCloseAbrogationMultiModal={this.onCloseAbrogationMultiModal}
                />
              </StyledInputView>
            </AntdModal>
          </>
        )}

        <AntdModal
          className="modalWrapper modalTechDoc modalCustom"
          title="표지 보기"
          width={modalWidth}
          destroyOnClose
          visible={coverView.visible}
          onCancel={this.onCloseCoverView}
          footer={[]}
        >
          <BizBuilderBase
            sagaKey="CoverView"
            viewType={coverView.viewType}
            workSeq={coverView.workSeq}
            taskSeq={coverView.taskSeq}
            viewMetaSeq={coverView.viewMetaSeq}
            workPrcProps={workPrcProps}
            onCloseCoverView={this.onCloseCoverView}
            onCloseModalHandler={this.onCloseCoverView}
            reloadId="approveBase_approveView"
            reloadViewType="VIEW"
            reloadTaskSeq={selectedRow && selectedRow.TASK_SEQ}
            ViewCustomButtons={({ onCloseCoverView }) => (
              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <StyledButton className="btn-light" onClick={onCloseCoverView}>
                  닫기
                </StyledButton>
              </div>
            )}
            ModifyCustomButtons={({ onCloseCoverView, saveBeforeProcess, sagaKey, reloadId }) => (
              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <StyledButton className="btn-primary btn-first" onClick={() => saveBeforeProcess(sagaKey, reloadId)}>
                  저장
                </StyledButton>
                <StyledButton className="btn-light" onClick={onCloseCoverView}>
                  닫기
                </StyledButton>
              </div>
            )}
          />
        </AntdModal>
        <AntdModal
          className="modalWrapper modalTechDoc modalCustom"
          title="사용자 선택"
          width={1000}
          destroyOnClose
          visible={isUserSelect}
          onCancel={this.onCancelUserSelect}
          footer={[]}
        >
          <UserSelect
            initUserList={userList}
            // treeDataSource={distDeptList}
            // userDataList={result.userList && result.userList.list}
            // onTreeSelect={this.onTreeSelect}
            // onUserSelectHandler={this.onUserSelect}
            onUserSelectedComplete={this.onUserSelectedComplete}
            onCancel={this.onCancelUserSelect}
            isMultiSelect={isMultiSelect}
          />
        </AntdModal>
      </>
    );
  }
}

MdcsAppvView.propTypes = {
  APPV_STATUS: PropTypes.number,
};

MdcsAppvView.defaultProps = {
  APPV_STATUS: 2,
};

export default MdcsAppvView;
