import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Icon, Button, Input, message } from 'antd';
import moment from 'moment';
import styled from 'styled-components';

import BizBuilderBase from 'components/BizBuilderBase';
import WorkProcessModal from 'apps/Workflow/WorkProcess/WorkProcessModal';
import AbrogationMultiModifyDraft from 'apps/Workflow/User/CommonView/abrogationMultiModifyDraft';
import DraggableModal from 'components/DraggableModal';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';

const StyledWrap = styled.div`
  table.mdcsProcessList {
    width: 100%;
    margin-bottom: 2px;
    & > thead > tr.mdcsProcessRow > th,
    & > tbody > tr.mdcsProcessRow > td {
      width: 50%;
      border: solid 1px #cccccc;
      padding: 4px;
      div {
        display: inline-block;
      }
      .mdcsDeptName {
        width: 40%;
      }
      .mdcsPstnName {
        width: 17%;
      }
      .mdcsUserName {
        width: 18%;
      }
      .mdcsAppvDttm {
        width: 20%;
      }
      .mdcsAppvStatus {
        width: 5%;
      }
    }
  }
`;
const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);
const { TextArea } = Input;
class DraftList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalWidth: 800,
      coverView: {
        visible: false,
        workSeq: undefined,
        taskSeq: undefined,
        viewMetaSeq: undefined,
      },
      isDcc: false,
      opinions: undefined,
      holdReqList: [],
      currentStatus: undefined,
      abrogationList: undefined,
      draftNode: undefined,
      reviewerNode: undefined,
      mailReviewerNode: undefined,
      isAbrogationMultiShow: false,
      workPrcProps: undefined,
      paginationIdx: 1,
      pageSize: 10,
    };
  }

  componentDidMount() {
    const { getDraftList } = this.props;
    const { paginationIdx, pageSize } = this.state;
    // getDraftList();
    const fixUrl = '/api/workflow/v1/common/approve/DraftListMDCSHandler';
    getDraftList(fixUrl, paginationIdx, pageSize);
    // getCustomDataBind('POST', prefixUrl, { PARAM: { relTypes: [1, 99, 999] } });
  }

  getTableColumns = () => [
    // {
    //   title: 'No',
    //   dataIndex: 'RNUM',
    //   key: 'rnum',
    //   width: '7%',
    //   align: 'center',
    // },
    {
      title: '종류',
      dataIndex: 'APPVGUBUN',
      key: 'APPVGUBUN',
      width: '15%',
      align: 'center',
      render: (text, record) => (record.REL_TYPE === 99 ? '폐기' : record.REL_TYPE === 999 ? '일괄폐기' : text),
    },
    {
      title: '표준번호',
      dataIndex: 'DOCNUMBER',
      key: 'DOCNUMBER',
      width: '10%',
      align: 'center',
      ellipsis: true,
      render: (text, record) => (record.REL_TYPE === 99 ? '폐기' : record.REL_TYPE === 999 ? record.DRAFT_ID : text),
    },
    {
      title: 'Rev',
      dataIndex: 'VERSION',
      key: 'VERSION',
      width: '5%',
      align: 'center',
      ellipsis: true,
      render: (text, record) => (record.REL_TYPE === 99 ? '폐기' : record.REL_TYPE === 999 ? '1' : text && text.indexOf('.') > -1 ? text.split('.')[0] : text),
    },
    {
      title: '표준제목',
      dataIndex: 'DRAFT_TITLE',
      key: 'title',
      ellipsis: true,
    },
    {
      title: '기안일',
      dataIndex: 'REG_DTTM',
      key: 'regDttm',
      width: '8%',
      align: 'center',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: '상태',
      dataIndex: 'STATUS_NM',
      key: 'STATUS_NM',
      width: '8%',
      align: 'center',
    },
    {
      title: '기안자',
      dataIndex: 'NAME_KOR',
      key: 'NAME_KOR',
      width: '10%',
      align: 'center',
    },
  ];

  onRowClick = (record, rowIndex, e) => {
    const { sagaKey, submitHandlerBySaga } = this.props;
    const { isDcc } = this.state;
    const { WORK_SEQ, TASK_SEQ, STEP, PROC_STATUS, APPV_STATUS, DRAFT_DATA, DRAFT_ID } = record;
    const abrogationList = DRAFT_DATA.abrogationList ? record.DRAFT_DATA.abrogationList : [];

    this.setState({ currentStatus: APPV_STATUS, abrogationList, workPrcProps: { ...record } });
    this.props.setSelectedRow(record);
    this.props.setViewVisible(true);

    const isAbrogMulti = DRAFT_DATA.isMultiAbrogation ? DRAFT_DATA.isMultiAbrogation : false;

    if (isAbrogMulti) {
      const prefixUrl = '/api/mdcs/v1/common/ProcessResultHandler';
      const param = {
        PARAM: {
          DRAFT_ID,
        },
      };
      submitHandlerBySaga(sagaKey, 'POST', prefixUrl, param, this.initAppvList);
    }

    if (PROC_STATUS === 3 || PROC_STATUS === 30) {
      const prefixUrl = '/api/workflow/v1/common/workprocess/draftHoldRequestList';
      const param = {
        PARAM: {
          WORK_SEQ,
          TASK_SEQ,
          PROC_STATUS,
          STEP,
        },
      };
      submitHandlerBySaga(sagaKey, 'POST', prefixUrl, param, this.initDataDelegate);
    } else {
      this.setState({ holdReqList: [] });
    }
  };

  initAppvList = (id, response) => {
    const { list, processList } = response;
    const resultList = [...list];
    processList.forEach(item => {
      if (item.NODE_ID === 107 || item.NODE_ID === 106 || item.NODE_ID === 112) {
        const appvMemeber = JSON.parse(item.APPV_MEMBER);
        if (appvMemeber.length > 0) {
          appvMemeber.forEach(subNode => {
            const findIdx = list.findIndex(iNode => iNode.NODE_ID === item.NODE_ID && iNode.ORG_APPV_USER_ID === subNode.USER_ID);
            if (findIdx === -1)
              resultList.push({
                NODE_ID: item.NODE_ID,
                APPV_STATUS: 0,
                APPV_DTTM: '',
                DRAFT_USER_NAME: subNode.NAME_KOR,
                PSTN_NAME: subNode.PSTN_NAME_KOR,
                DRAFT_DEPT_NAME: subNode.DEPT_NAME_KOR,
              });
          });
        }
      }
    });

    const draftList = resultList.filter(fNode => fNode.NODE_ID === 101 && fNode.DRAFT_USER_NAME && fNode.DRAFT_USER_NAME.length > 0);
    const approveList = resultList.filter(fNode => fNode.NODE_ID === 107 && fNode.DRAFT_USER_NAME && fNode.DRAFT_USER_NAME.length > 0);
    const reviewerList = resultList.filter(fNode => fNode.NODE_ID === 106 && fNode.DRAFT_USER_NAME && fNode.DRAFT_USER_NAME.length > 0);
    const mailReviewerList = resultList.filter(fNode => fNode.NODE_ID === 112 && fNode.DRAFT_USER_NAME && fNode.DRAFT_USER_NAME.length > 0);

    let draftNode = [];
    if (draftList && draftList.length > 0 && approveList && approveList.length > 0) {
      draftNode = [
        <tr key="MdcsProcessListComp-draftList-approveList" className="mdcsProcessRow">
          <td>
            <div className="mdcsDeptName">{draftList[0].DRAFT_DEPT_NAME}</div>
            <div className="mdcsPstnName">{draftList[0].PSTN_NAME}</div>
            <div className="mdcsUserName">{draftList[0].DRAFT_USER_NAME}</div>
            <div className="mdcsAppvDttm">{draftList[0].APPV_DTTM}</div>
            <div className="mdcsAppvStatus">
              {draftList[0].APPV_STATUS === 2 || draftList[0].APPV_STATUS === 20 ? (
                <Icon type="check-circle" />
              ) : (
                (draftList[0].APPV_STATUS === 3 && <Icon type="stop" />) || ''
              )}
            </div>
          </td>
          <td>
            <div className="mdcsDeptName">{approveList[0].DRAFT_DEPT_NAME}</div>
            <div className="mdcsPstnName">{approveList[0].PSTN_NAME}</div>
            <div className="mdcsUserName">{approveList[0].DRAFT_USER_NAME}</div>
            <div className="mdcsAppvDttm">{approveList[0].APPV_DTTM}</div>
            <div className="mdcsAppvStatus">
              {approveList[0].APPV_STATUS === 2 || approveList[0].APPV_STATUS === 20 ? (
                <Icon type="check-circle" />
              ) : (
                (draftList[0].APPV_STATUS === 3 && <Icon type="stop" />) || ''
              )}
            </div>
          </td>
        </tr>,
      ];
    }
    const dummyNode = (
      <td>
        <div className="mdcsDeptName"></div>
        <div className="mdcsPstnName"></div>
        <div className="mdcsUserName"></div>
        <div className="mdcsAppvDttm"></div>
        <div className="mdcsAppvStatus"></div>
      </td>
    );
    const reviewerNode = [];
    let tempNode = [];
    let maxCnt = reviewerList.length;
    reviewerList.forEach((node, idx) => {
      const itemNode = (
        <td>
          <div className="mdcsDeptName">{node.DRAFT_DEPT_NAME}</div>
          <div className="mdcsPstnName">{node.PSTN_NAME}</div>
          <div className="mdcsUserName">{node.DRAFT_USER_NAME}</div>
          <div className="mdcsAppvDttm">{node.APPV_DTTM}</div>
          <div className="mdcsAppvStatus">
            {node.APPV_STATUS === 2 || node.APPV_STATUS === 20 ? <Icon type="check-circle" /> : (draftList[0].APPV_STATUS === 3 && <Icon type="stop" />) || ''}
          </div>
        </td>
      );
      if (idx % 2 === 0) {
        if (idx + 1 === maxCnt) {
          tempNode = [itemNode, dummyNode];
          reviewerNode.push(
            <tr key={`MdcsProcessListComp-reviewerList_${node.RESULT_ID}_${idx}`} className="mdcsProcessRow">
              {tempNode}
            </tr>,
          );
        } else tempNode = [itemNode];
      } else {
        tempNode.push(itemNode);
        reviewerNode.push(
          <tr key={`MdcsProcessListComp-reviewerList_${node.RESULT_ID}_${idx}`} className="mdcsProcessRow">
            {tempNode}
          </tr>,
        );
      }
    });
    const mailReviewerNode = [];
    maxCnt = mailReviewerList.length;
    mailReviewerList.forEach((node, idx) => {
      const itemNode = (
        <td>
          <div className="mdcsDeptName">{node.DRAFT_DEPT_NAME}</div>
          <div className="mdcsPstnName">{node.PSTN_NAME}</div>
          <div className="mdcsUserName">{node.DRAFT_USER_NAME}</div>
          <div className="mdcsAppvDttm">{node.APPV_DTTM}</div>
          <div className="mdcsAppvStatus">
            {node.APPV_STATUS === 2 || node.APPV_STATUS === 20 ? <Icon type="check-circle" /> : (draftList[0].APPV_STATUS === 3 && <Icon type="stop" />) || ''}
          </div>
        </td>
      );
      if (idx % 2 === 0) {
        if (idx + 1 === maxCnt) {
          tempNode = [itemNode, dummyNode];
          mailReviewerNode.push(
            <tr key={`MdcsProcessListComp-mailReviewerList_${node.RESULT_ID}_${idx}`} className="mdcsProcessRow">
              {tempNode}
            </tr>,
          );
        } else tempNode = [itemNode];
      } else {
        tempNode.push(itemNode);
        mailReviewerNode.push(
          <tr key={`MdcsProcessListComp-mailReviewerList_${node.RESULT_ID}_${idx}`} className="mdcsProcessRow">
            {tempNode}
          </tr>,
        );
      }
    });
    this.setState({ draftNode, reviewerNode, mailReviewerNode });
  };

  initDataDelegate = (id, response) => {
    const { holdReqList } = response;
    this.setState({ holdReqList });
  };

  onResizeModal = modalWidth => {
    this.setState({ modalWidth });
  };

  clickCoverView = (workSeq, taskSeq, viewMetaSeq) => {
    const coverView = { workSeq, taskSeq, viewMetaSeq, visible: true, viewType: 'VIEW' };
    this.setState({ coverView });
  };

  closeBtnFunc = () => {
    const { getDraftList } = this.props;
    this.props.setViewVisible(false);
    const fixUrl = '/api/workflow/v1/common/approve/DraftListMDCSHandler';
    getDraftList(fixUrl);
  };

  onCloseCoverView = () => {
    const { coverView } = this.state;
    const tempCoverView = { ...coverView, visible: false };
    this.setState({ coverView: tempCoverView });
  };

  onHoldRelase = () => {
    const { selectedRow, setSelectedRow, setOpinionVisible } = this.props;
    const APPV_STATUS = selectedRow.PROC_STATUS === 3 ? 4 : 40;
    const nSelectedRow = { ...selectedRow, APPV_STATUS };
    setSelectedRow(nSelectedRow);
    setOpinionVisible(true);
  };

  handleReqApprove = e => {
    const { reqApprove, setOpinionVisible, setOpinion } = this.props;
    const { opinion } = this.state;
    if (!opinion || opinion === '') {
      message.warning('의견을 작성해주세요');
    } else {
      e.preventDefault();
      setOpinion(opinion);
      reqApprove({});
      setOpinionVisible(false);
    }
  };

  onClickModify = () => {
    const { workPrcProps } = this.state;
    const { REL_TYPE } = workPrcProps;

    // 일괄폐기 수정화면
    if (REL_TYPE === 999) {
      this.setState({ isAbrogationMultiShow: true, workPrcProps: { ...workPrcProps, draftMethod: 'MODIFY' } });
    } else {
      const coverView = { workSeq: workPrcProps.WORK_SEQ, taskSeq: workPrcProps.TASK_SEQ, visible: true, viewType: 'MODIFY' };
      this.setState({ coverView });
    }
  };

  onClickModifyDoCoverView = () => {
    const { getDraftList } = this.props;
    const { coverView } = this.state;
    this.setState({ coverView: { ...coverView, visible: false } });
    const fixUrl = '/api/workflow/v1/common/approve/DraftListMDCSHandler';
    getDraftList(fixUrl);
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
    const { sagaKey, submitHandlerBySaga } = this.props;
    const { workPrcProps } = this.state;
    const { RESULT_ID, DRAFT_ID } = workPrcProps;
    this.setState({
      isAbrogationMultiShow: false,
    });
    const prefixUrl = '/api/workflow/v1/common/approve/ApproveResultByDraftId';
    const param = {
      PARAM: {
        RESULT_ID,
      },
    };
    submitHandlerBySaga(sagaKey, 'POST', prefixUrl, param, this.initCoverView);

    const PrcfixUrl = '/api/mdcs/v1/common/ProcessResultHandler';
    const param2 = {
      PARAM: {
        DRAFT_ID,
      },
    };
    submitHandlerBySaga(sagaKey, 'POST', PrcfixUrl, param2, this.initAppvList);
  };

  initCoverView = (id, response) => {
    const { workPrcProps } = response;
    this.setState({ workPrcProps, isAbrogationMultiShow: false });
  };

  setPaginationIdx = paginationIdx =>
    this.setState({ paginationIdx }, () => {
      const { getDraftList } = this.props;
      const { pageSize } = this.state;

      const fixUrl = '/api/workflow/v1/common/approve/DraftListMDCSHandler';
      getDraftList(fixUrl, paginationIdx, pageSize);
    });

  render() {
    // const { approveList } = this.props;
    const { draftList, selectedRow, opinionVisible, setOpinionVisible, profile, draftListCnt } = this.props;
    const {
      modalWidth,
      coverView,
      holdReqList,
      abrogationList,
      draftNode,
      reviewerNode,
      mailReviewerNode,
      isAbrogationMultiShow,
      workPrcProps,
      paginationIdx,
    } = this.state;
    return (
      <>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 기안함 상신한 문서 : {draftList.length || 0} 건
            </p>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          <AntdTable
            key="apps-workflow-user-draft-list"
            columns={this.getTableColumns()}
            dataSource={draftList}
            onRow={(record, rowIndex) => ({
              onClick: e => this.onRowClick(record, rowIndex, e),
            })}
            bordered
            pagination={{ current: paginationIdx, total: draftListCnt }}
            onChange={pagination => this.setPaginationIdx(pagination.current)}
          />
        </StyledContentsWrapper>
        {workPrcProps && workPrcProps.REL_TYPE && workPrcProps.REL_TYPE !== 999 ? (
          <div>
            {/* <AntdModal
              className="modalWrapper modalTechDoc"
              title="내용 보기"
              width={modalWidth}
              visible={this.props.viewVisible}
              destroyOnClose
              onCancel={this.closeBtnFunc}
              footer={null}
            > */}
            {this.props.viewVisible && (
              <DraggableModal key="draftListKeys" title="내용보기" visible={this.props.viewVisible}>
                <BizBuilderBase
                  sagaKey="approveBase_approveView"
                  viewType="VIEW"
                  // onCloseModal={this.onCloseModal}
                  // onChangeForm={this.onChangeForm}
                  closeBtnFunc={this.closeBtnFunc}
                  clickCoverView={this.clickCoverView}
                  onClickModify={this.onClickModify}
                  workSeq={selectedRow && selectedRow.WORK_SEQ}
                  taskSeq={selectedRow && selectedRow.TASK_SEQ}
                  selectedRow={selectedRow}
                  ViewCustomButtons={({ closeBtnFunc, onClickModify }) => (
                    <StyledButtonWrapper className="btn-wrap-mt-20 btn-wrap-center">
                      {(selectedRow.PROC_STATUS === 3 || selectedRow.PROC_STATUS === 300) && (
                        <>
                          <StyledButton className="btn-primary btn-sm mr5" onClick={this.onHoldRelase}>
                            홀드해제
                          </StyledButton>
                          {profile && profile.USER_ID === selectedRow.DRAFTER_ID && (
                            <StyledButton className="btn-primary btn-sm mr5" onClick={onClickModify}>
                              표지수정
                            </StyledButton>
                          )}
                        </>
                      )}

                      <StyledButton className="btn-light btn-sm" onClick={closeBtnFunc}>
                        닫기
                      </StyledButton>
                    </StyledButtonWrapper>
                  )}
                />

                {holdReqList && holdReqList.length > 0 && (
                  <StyledContentsWrapper>
                    <StyledHtmlTable>
                      <table className="table-border">
                        <colgroup>
                          <col width="10%" />
                          <col width="10%" />
                          <col width="10%" />
                          <col width="55%" />
                          <col width="15%" />
                        </colgroup>
                        <thead>
                          <tr>
                            <th>이름</th>
                            <th>직급</th>
                            <th>부서</th>
                            <th>홀드의견</th>
                            <th style={{ borderRight: 0 }}>요청일</th>
                          </tr>
                        </thead>
                        <tbody>
                          {holdReqList.map(item => (
                            <tr>
                              <td style={{ textAlign: 'center' }}>{item.APPV_USER_NAME}</td>
                              <td style={{ textAlign: 'center' }}>{item.APPV_PSTN_NAME}</td>
                              <td style={{ textAlign: 'center' }}>{item.APPV_DEPT_NAME}</td>
                              <td>{item.OPINION}</td>
                              <td style={{ textAlign: 'center' }}>{moment(item.APPV_DTTM).format('YYYY-MM-DD')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </StyledHtmlTable>
                  </StyledContentsWrapper>
                )}
              </DraggableModal>
            )}
            {/* </AntdModal> */}
            <AntdModal
              className="modalWrapper modalTechDoc"
              title="표지 보기"
              width={modalWidth}
              destroyOnClose
              visible={coverView.visible}
              onCancel={this.onCloseCoverView}
              footer={null}
            >
              <BizBuilderBase
                sagaKey="CoverView"
                viewType={coverView.viewType}
                workSeq={coverView.workSeq}
                taskSeq={coverView.taskSeq}
                viewMetaSeq={coverView.viewMetaSeq}
                CustomWorkProcessModal={WorkProcessModal}
                workPrcProps={workPrcProps}
                onCloseCoverView={this.onCloseCoverView}
                onCloseModalHandler={this.onCloseCoverView}
                reloadId="approveBase_approveView"
                reloadViewType="VIEW"
                reloadTaskSeq={selectedRow && selectedRow.TASK_SEQ}
                ViewCustomButtons={({ onCloseCoverView }) => (
                  <StyledButtonWrapper className="btn-wrap-mt-20 btn-wrap-center">
                    <StyledButton className="btn-light btn-sm" onClick={onCloseCoverView}>
                      닫기
                    </StyledButton>
                  </StyledButtonWrapper>
                )}
                ModifyCustomButtons={({ onCloseCoverView, saveBeforeProcess, sagaKey, reloadId }) => (
                  <StyledButtonWrapper className="btn-wrap-mt-20 btn-wrap-center">
                    <StyledButton className="btn-primary btn-sm mr5" onClick={() => saveBeforeProcess(sagaKey, reloadId)}>
                      저장
                    </StyledButton>
                    <StyledButton className="btn-light btn-sm" onClick={onCloseCoverView}>
                      닫기
                    </StyledButton>
                  </StyledButtonWrapper>
                )}
              />
            </AntdModal>
          </div>
        ) : (
          <div>
            {/* <AntdModal
              className="modalWrapper modalTechDoc"
              title="내용 보기"
              width={modalWidth}
              visible={this.props.viewVisible}
              destroyOnClose
              onCancel={this.closeBtnFunc}
              footer={null}
            > */}
            {this.props.viewVisible && (
              <DraggableModal title="표준문서 결재" visible={this.props.viewVisible}>
                <StyledContentsWrapper>
                  <StyledHtmlTable>
                    <>
                      {workPrcProps && (
                        <table style={{ marginBottom: 20 }}>
                          <tbody>
                            <tr>
                              <th>일괄폐기번호</th>
                              <td>{workPrcProps.DRAFT_ID}</td>
                              <th>기안자</th>
                              <td>{workPrcProps.NAME_KOR}</td>
                              <th>기안일자</th>
                              <td>{moment(workPrcProps.REG_DTTM).format('YYYY-MM-DD')}</td>
                            </tr>
                            <tr>
                              <th>제목</th>
                              <td colSpan={5}>{workPrcProps.DRAFT_TITLE}</td>
                            </tr>
                            <tr>
                              <th>Description of Change</th>
                              <td colSpan={5}>{workPrcProps.DRAFT_DATA && workPrcProps.DRAFT_DATA.descOfChange}</td>
                            </tr>
                            <tr>
                              <th>Rev. History</th>
                              <td colSpan={5}>{workPrcProps.DRAFT_DATA && workPrcProps.DRAFT_DATA.revHistory}</td>
                            </tr>
                          </tbody>
                        </table>
                      )}
                      <div className="table-title">폐기대상 문서</div>
                      <table style={{ marginBottom: 20 }}>
                        <colgroup>
                          <col style={{ width: '15%' }} />
                          <col style={{ width: '10%' }} />
                          <col style={{ width: '60%' }} />
                          <col style={{ width: '15%' }} />
                        </colgroup>
                        <tbody>
                          <tr>
                            <th>문서번호</th>
                            <th>개정번호</th>
                            <th>제목</th>
                            <th>Effect Date</th>
                          </tr>
                          {abrogationList &&
                            abrogationList.map(item => (
                              <tr className="tr-center">
                                <td>{item.DOCNUMBER}</td>
                                <td>{item.VERSION}</td>
                                <td style={{ textAlign: 'left' }}>{item.TITLE}</td>
                                <td>{moment(item.END_DTTM).format('YYYY-MM-DD')}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                      <div className="table-title">결재정보</div>
                      <StyledWrap>
                        {draftNode && draftNode.length > 0 && (
                          <table className="mdcsProcessList">
                            <thead>
                              <tr className="mdcsProcessRow">
                                <th>Preparer</th>
                                <th>Approver</th>
                              </tr>
                            </thead>
                            <tbody>{draftNode}</tbody>
                          </table>
                        )}
                        {reviewerNode && reviewerNode.length > 0 && (
                          <table className="mdcsProcessList">
                            <thead>
                              <tr className="mdcsProcessRow">
                                <th colSpan="2">필수 심의권자</th>
                              </tr>
                            </thead>
                            <tbody>{reviewerNode}</tbody>
                          </table>
                        )}
                        {mailReviewerNode && mailReviewerNode.length > 0 && (
                          <table className="mdcsProcessList">
                            <thead>
                              <tr className="mdcsProcessRow">
                                <th colSpan="2">Mail 심의권자</th>
                              </tr>
                            </thead>
                            <tbody>{mailReviewerNode}</tbody>
                          </table>
                        )}
                      </StyledWrap>
                      <StyledButtonWrapper className="btn-wrap-mt-20 btn-wrap-center">
                        {(selectedRow.PROC_STATUS === 3 || selectedRow.PROC_STATUS === 300) && (
                          <>
                            <StyledButton className="btn-primary btn-sm mr5" onClick={this.onHoldRelase}>
                              홀드해제
                            </StyledButton>
                            <StyledButton className="btn-primary btn-sm mr5" onClick={this.onClickModify}>
                              표지수정
                            </StyledButton>
                          </>
                        )}
                        <StyledButton className="btn-light btn-sm" onClick={this.closeBtnFunc}>
                          닫기
                        </StyledButton>
                      </StyledButtonWrapper>
                    </>
                  </StyledHtmlTable>
                </StyledContentsWrapper>
              </DraggableModal>
            )}
            {/* </AntdModal> */}
            <AntdModal
              className="modalWrapper modalTechDoc"
              title="표지 보기"
              width={modalWidth}
              visible={isAbrogationMultiShow}
              destroyOnClose
              onCancel={this.onCloseAbrogationMultiModal}
              footer={[]}
            >
              <AbrogationMultiModifyDraft
                workPrcProps={workPrcProps}
                {...this.props}
                onAbrogationMultiProcess={this.onAbrogationMultiProcess}
                onCloseAbrogationMultiModal={this.onCloseAbrogationMultiModal}
              ></AbrogationMultiModifyDraft>
            </AntdModal>
          </div>
        )}

        <AntdModal
          className="modalWrapper modalTechDoc"
          title="홀드해제 의견"
          width={500}
          destroyOnClose
          visible={opinionVisible}
          onCancel={() => setOpinionVisible(false)}
          footer={null}
        >
          <StyledHtmlTable>
            <table>
              <tbody>
                <tr>
                  <th>의견</th>
                  <td>
                    <TextArea rows={4} onChange={this.onChangeOpinion} />
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
          <StyledButtonWrapper className="btn-wrap-mt-20 btn-wrap-center">
            <StyledButton className="btn-primary btn-sm mr5" onClick={this.handleReqApprove}>
              저장
            </StyledButton>
            <StyledButton className="btn-light btn-sm" onClick={() => setOpinionVisible(false)}>
              닫기
            </StyledButton>
          </StyledButtonWrapper>
        </AntdModal>
      </>
    );
  }
}

DraftList.propTypes = {
  draftList: PropTypes.array,
  getDraftList: PropTypes.func,
  selectedRow: PropTypes.object,
  setSelectedRow: PropTypes.func,
  setViewVisible: PropTypes.func,
};

DraftList.defaultProps = {
  draftList: [],
  getDraftList: () => {},
  selectedRow: {},
};

export default DraftList;
