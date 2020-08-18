import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Icon, Input, message } from 'antd';
import moment from 'moment';

import styled from 'styled-components';
import BizBuilderBase from 'components/BizBuilderBase';
import AbrogationMultiModifyDraft from 'apps/Workflow/User/CommonView/abrogationMultiModifyDraft';
import WorkProcessModal from 'apps/Workflow/WorkProcess/WorkProcessModal';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import ProcessView from 'apps/Workflow/User/CommonView/processView';
import ExcelDownLoad from 'components/ExcelDownLoad';
// import ApproveView from '../ApproveView';
// import HoldView from '../MdcsAppvView/holdview';

const { TextArea } = Input;

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);
const AntdInput = StyledInput(Input);

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

const excelColumns = [
  {
    title: '종류',
    width: { wpx: 100 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: '유형',
    width: { wpx: 120 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: '문서번호',
    width: { wpx: 100 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: 'Rev',
    width: { wpx: 30 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: '제목',
    width: { wpx: 300 },
    style: { alignment: { horizontal: 'left' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: '기안일',
    width: { wpx: 120 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: '상태',
    width: { wpx: 100 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: '기안자',
    width: { wpx: 100 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
];
const fields = [
  { field: 'APPVGUBUN', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  { field: 'NODETYPE', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  { field: 'DOCNUMBER', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  { field: 'VERSION', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } }, format: { type: 'NUMBER' } },
  { field: 'DRAFT_TITLE', style: { alignment: { horizontal: 'left' }, font: { sz: '10' } } },
  { field: 'REG_DTTM', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } }, format: { type: 'DATE' } },
  { field: 'STATUS', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  { field: 'NAME_KOR', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
];

class ApproveList extends Component {
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
      isPreView: false,
      DOCNUMBER: '',
      DOCTITLE: '',
    };
  }

  componentDidMount() {
    const { profile, id, getApproveList } = this.props;
    // const { paginationIdx, pageSize } = this.state;
    const { ACCOUNT_IDS_DETAIL } = profile;
    const vList = ACCOUNT_IDS_DETAIL && ACCOUNT_IDS_DETAIL.V.split(',');
    const vId = vList.findIndex(v => v === '1221');
    if (vId >= 0) {
      this.setState({ isDcc: true });
    }
    // const fixUrl = '/api/workflow/v1/common/approve/ApproveListMDCSHandler';
    // this.props.getApproveList(fixUrl, paginationIdx, pageSize);
    this.getList();
  }

  getList = () => {
    const { id, getApproveList, spinningOn, spinningOff } = this.props;
    const { paginationIdx, pageSize } = this.state;
    const fixUrl = '/api/workflow/v1/common/approve/ApproveListMDCSHandler';
    spinningOn();
    getApproveList(fixUrl, paginationIdx, pageSize, [], { DOCNUMBER: this.state.DOCNUMBER, DOCTITLE: this.state.DOCTITLE }, () => {
      spinningOff();
    });
  }

  getTableColumns = () => [
    {
      title: '종류',
      dataIndex: 'APPVGUBUN',
      key: 'APPVGUBUN',
      width: '15%',
      align: 'center',
      render: (text, record) => (record.REL_TYPE === 999 ? '일괄폐기' : text),
    },
    {
      title: '유형',
      dataIndex: 'NODETYPE',
      key: 'NODETYPE',
      width: '9%',
      align: 'center',
      render: (text, record) => (record.APPV_USER_ID === record.ORG_APPV_USER_ID ? text : `${text}(위임결재)`),
    },
    {
      title: '문서번호',
      dataIndex: 'DOCNUMBER',
      key: 'DOCNUMBER',
      width: '9%',
      align: 'center',
      ellipsis: true,
      render: (text, record) =>
        record.REL_TYPE === 999 ? (
          <a onClick={() => this.onRowClick(record)}>{`OBS-${record.DRAFT_ID}`}</a>
        ) : (
          <a onClick={() => this.onRowClick(record)}>{text}</a>
        ),
    },
    {
      title: 'Rev',
      dataIndex: 'VERSION',
      key: 'VERSION',
      width: '5%',
      align: 'center',
      ellipsis: true,
      render: (text, record) => (record.REL_TYPE === 99 ? 'OBS' : record.REL_TYPE === 999 ? '0' : text && text.indexOf('.') > -1 ? text.split('.')[0] : text),
    },
    {
      title: '제목',
      dataIndex: 'DRAFT_TITLE',
      key: 'title',
      ellipsis: true,
      render: (text, record) => <a onClick={() => this.onRowClick(record)}>{text}</a>,
    },
    {
      title: '결재상태',
      dataIndex: 'APPV_STATUS_NM',
      key: 'APPV_STATUS_NM',
      width: '9%',
      align: 'center',
      render: (text, record) => <a onClick={() => this.onPrcPreViewClick(record)}>{text}</a>,
    },
    // {
    //   title: '진행상태',
    //   dataIndex: 'PROC_STATUS',
    //   key: 'PROC_STATUS',
    //   width: '9%',
    //   align: 'center',
    //   render: (text, record) =>
    //     text === 3 ? (
    //       <a onClick={() => this.onPrcPreViewClick(record)}>홀드</a>
    //     ) : text === 2 ? (
    //       <a onClick={() => this.onPrcPreViewClick(record)}>완료</a>
    //     ) : (
    //       <a onClick={() => this.onPrcPreViewClick(record)}>진행중</a>
    //     ),
    // },
    {
      title: '기안자',
      dataIndex: 'NAME_KOR',
      key: 'nameKor',
      width: '10%',
      align: 'center',
    },
    {
      title: '결재일',
      dataIndex: 'APPV_DTTM',
      key: 'appv_dttm',
      width: '10%',
      align: 'center',
      render: (text, record) => (text && text.length > 0 ? moment(text).format('YYYY-MM-DD') : text),
    },
  ];

  onPrcPreViewClick = record => {
    this.setState({ isPreView: true });
    this.props.setSelectedRow(record);
  };

  onClosePreView = () => {
    this.setState({ isPreView: false });
  };

  onHoldRelase = () => {
    const { selectedRow, setSelectedRow, setOpinionVisible } = this.props;
    const APPV_STATUS = selectedRow.PROC_STATUS === 3 ? 4 : 40;
    const nSelectedRow = { ...selectedRow, APPV_STATUS };
    setSelectedRow(nSelectedRow);
    setOpinionVisible(true);
  };

  onRowClick = (record, rowIndex, e) => {
    const { sagaKey, submitHandlerBySaga } = this.props;
    const { isDcc } = this.state;
    const { WORK_SEQ, TASK_SEQ, STEP, PROC_STATUS, APPV_STATUS, DRAFT_DATA, DRAFT_ID } = record;
    console.debug('record', record);
    const abrogationList = DRAFT_DATA && DRAFT_DATA !== null && DRAFT_DATA.abrogationList ? record.DRAFT_DATA.abrogationList : [];
    this.setState({ currentStatus: APPV_STATUS, abrogationList, workPrcProps: { ...record } });
    this.props.setSelectedRow(record);
    this.props.setViewVisible(true);

    const isAbrogMulti = DRAFT_DATA && DRAFT_DATA !== null && DRAFT_DATA.isMultiAbrogation ? DRAFT_DATA.isMultiAbrogation : false;

    if (isAbrogMulti) {
      const prefixUrl = '/api/mdcs/v1/common/ProcessResultHandler';
      const param = {
        PARAM: {
          DRAFT_ID,
        },
      };
      submitHandlerBySaga(sagaKey, 'POST', prefixUrl, param, this.initAppvList);
    }

    if ((PROC_STATUS === 3 || PROC_STATUS === 30) && (APPV_STATUS === PROC_STATUS || (STEP === 2 && isDcc))) {
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

  closeBtnFunc = () => {
    this.props.setViewVisible(false);
    // const { getApproveList } = this.props;
    // const { paginationIdx, pageSize } = this.state;
    // const fixUrl = '/api/workflow/v1/common/approve/ApproveListMDCSHandler';
    // getApproveList(fixUrl, paginationIdx, pageSize);
    this.getList();
  };

  clickCoverView = (workSeq, taskSeq, viewMetaSeq) => {
    const { selectedRow } = this.props;
    const coverView = { workSeq, taskSeq, viewMetaSeq, visible: true, viewType: 'VIEW' };
    if (selectedRow.REL_TYPE === 99) {
      this.setState({ isObsCheck: true });
    } else {
      this.setState({ isObsCheck: false });
    }
    this.setState({ coverView });
  };

  onCloseCoverView = () => {
    const { coverView } = this.state;
    const tempCoverView = { ...coverView, visible: false };
    this.setState({ coverView: tempCoverView });
  };

  onClickModify = () => {
    const { selectedRow } = this.props;
    const { REL_TYPE } = selectedRow;

    // 일괄폐기 수정화면
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

  handleReqApprove = e => {
    const { opinions } = this.state;
    const { reqApprove, setOpinionVisible, setOpinion } = this.props;

    if (!opinions || opinions === '') {
      message.warning('의견을 작성해주세요');
    } else {
      e.preventDefault();
      setOpinion(opinions);
      reqApprove({});
      setOpinionVisible(false);
      this.closeBtnFunc();
    }
  };

  onChangeOpinion = e => {
    this.setState({ opinions: e.target.value });
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
      // const { getApproveList } = this.props;
      // const { pageSize } = this.state;
      // const fixUrl = '/api/workflow/v1/common/approve/ApproveListMDCSHandler';
      // this.props.getApproveList(fixUrl, paginationIdx, pageSize);
      this.getList();
    });

  render() {
    const { approveList, approveListCnt, selectedRow, opinionVisible, setOpinionVisible } = this.props;
    const {
      modalWidth,
      coverView,
      isDcc,
      holdReqList,
      currentStatus,
      abrogationList,
      draftNode,
      reviewerNode,
      mailReviewerNode,
      isAbrogationMultiShow,
      workPrcProps,
      paginationIdx,
      isPreView,
      isObsCheck,
    } = this.state;

    return (
      <>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 기결함
            </p>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <AntdInput
                className="ant-input-sm mr5" style={{ width: 110 }} allowClear placeholder="문서번호"
                onChange={e => this.setState({ DOCNUMBER: e.target.value })}
                onPressEnter={this.getList}
              />
              <AntdInput
                className="ant-input-sm mr5" style={{ width: 110 }} allowClear placeholder="제목"
                onChange={e => this.setState({ DOCTITLE: e.target.value })}
                onPressEnter={this.getList}
              />
              <StyledButton className="btn-gray btn-sm mr5" onClick={this.getList}>검색</StyledButton>
              <ExcelDownLoad
                isBuilder={false}
                fileName={`검색결과 (${moment().format('YYYYMMDD')})`}
                className="workerExcelBtn"
                title="Excel 파일로 저장"
                btnSize="btn-sm"
                sheetName=""
                columns={excelColumns}
                fields={fields}
                submitInfo={{
                  dataUrl: '/api/workflow/v1/common/approve/ApproveListMDCSHandler',
                  method: 'POST',
                  submitData: { PARAM: { relTypes: [1, 4, 99, 999], PAGE: undefined, PAGE_CNT: undefined } },
                  dataSetName: 'list',
                }}
                style={{ display: 'inline-block' }}
              />
            </div>
          </StyledCustomSearchWrapper>
          <AntdTable
            key="apps-workflow-user-approve-list"
            columns={this.getTableColumns()}
            dataSource={approveList}
            // onRow={(record, rowIndex) => ({
            //   onClick: e => this.onRowClick(record, rowIndex, e),
            // })}
            bordered
            pagination={{ current: paginationIdx, total: approveListCnt }}
            onChange={pagination => this.setPaginationIdx(pagination.current)}
          />
        </StyledContentsWrapper>
        {workPrcProps && workPrcProps.REL_TYPE && workPrcProps.REL_TYPE !== 999 ? (
          <div>
            <AntdModal
              className="modalWrapper modalTechDoc"
              title="내용 보기"
              width={680}
              visible={this.props.viewVisible}
              destroyOnClose
              onCancel={this.closeBtnFunc}
              footer={null}
            >
              <BizBuilderBase
                sagaKey="approveBase_approveView"
                viewType="VIEW"
                onCloseModal={this.onCloseModal}
                onChangeForm={this.onChangeForm}
                closeBtnFunc={this.closeBtnFunc}
                clickCoverView={this.clickCoverView}
                onClickModify={this.onClickModify}
                workSeq={selectedRow && selectedRow.WORK_SEQ}
                taskSeq={selectedRow && selectedRow.TASK_SEQ}
                selectedRow={selectedRow}
                ViewCustomButtons={({ closeBtnFunc, onClickModify }) => (
                  <StyledButtonWrapper className="btn-wrap-mt-20 btn-wrap-center">
                    {(selectedRow.PROC_STATUS === 3 || selectedRow.PROC_STATUS === 300) &&
                      (currentStatus === selectedRow.PROC_STATUS || (selectedRow.STEP === 2 && isDcc)) && (
                        <>
                          <StyledButton className="btn-primary btn-sm mr5" onClick={this.onHoldRelase}>
                            홀드해제
                          </StyledButton>
                          <StyledButton className="btn-primary btn-sm mr5" onClick={onClickModify}>
                            표지수정
                          </StyledButton>
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
                        <col width="15%" />
                        <col width="20%" />
                        <col width="40%" />
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
            </AntdModal>
            <AntdModal
              className="modalWrapper modalTechDoc"
              title="표지 보기"
              width={900}
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
                workPrcProps={workPrcProps}
                isObsCheck={isObsCheck}
                onCloseCoverView={this.onCloseCoverView}
                onCloseModalHandler={this.onCloseCoverView}
                CustomWorkProcessModal={WorkProcessModal}
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
                    <StyledButton className="btn-primary mr5 btn-sm" onClick={() => saveBeforeProcess(sagaKey, reloadId)}>
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
            <AntdModal
              className="modalWrapper modalTechDoc"
              title="내용 보기"
              width={680}
              visible={this.props.viewVisible}
              destroyOnClose
              onCancel={this.closeBtnFunc}
              footer={null}
            >
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
                      {(selectedRow.PROC_STATUS === 3 || selectedRow.PROC_STATUS === 300) &&
                        (currentStatus === selectedRow.PROC_STATUS || (selectedRow.STEP === 2 && isDcc)) && (
                          <>
                            <StyledButton className="btn-primary mr5 btn-sm" onClick={this.onHoldRelase}>
                              홀드해제
                            </StyledButton>
                            <StyledButton className="btn-primary mr5 btn-sm" onClick={this.onClickModify}>
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
            </AntdModal>
            <AntdModal
              className="modalWrapper modalTechDoc modalCustom"
              title="표지 보기"
              width={900}
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
          className="modalWrapper modalTechDoc modalCustom"
          title="홀드해제 의견"
          width={500}
          destroyOnClose
          visible={opinionVisible}
          onCancel={() => setOpinionVisible(false)}
          footer={[]}
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
        <AntdModal title="결재정보" width={680} visible={isPreView} destroyOnClose onCancel={this.onClosePreView} footer={null}>
          <ProcessView {...this.props}></ProcessView>
        </AntdModal>
      </>
    );
  }
}

ApproveList.propTypes = {
  category: PropTypes.string,
  approveList: PropTypes.array,
  getApproveList: PropTypes.func,
  selectedRow: PropTypes.object,
  setSelectedRow: PropTypes.func,
  setViewVisible: PropTypes.func,
};

ApproveList.defaultProps = {
  category: 'draft',
  approveList: [],
  selectedRow: {},
  getApproveList: () => {},
};

export default ApproveList;
