import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Icon, Button, Input, message } from 'antd';
import moment from 'moment';

import BizBuilderBase from 'components/BizBuilderBase';
import WorkProcessModal from 'apps/Workflow/WorkProcess/WorkProcessModal';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';

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
      workPrcProps: undefined,
      opinion: undefined,
      holdReqList: [],
    };
  }

  componentDidMount() {
    const { getDraftList } = this.props;
    getDraftList();
  }

  getTableColumns = () => [
    {
      title: 'No',
      dataIndex: 'RNUM',
      key: 'rnum',
      width: '8%',
      align: 'center',
    },
    {
      title: '구분',
      dataIndex: 'APPVGUBUN',
      key: 'APPVGUBUN',
      width: '12%',
      align: 'center',
      render: (text, record) => (record.REL_TYPE === 99 ? '폐기' : record.REL_TYPE === 999 ? '일괄폐기' : text),
    },
    {
      title: '프로세스상태',
      dataIndex: 'STATUS_NM',
      key: 'STATUS_NM',
      width: '12%',
      align: 'center',
    },
    {
      title: 'Title',
      dataIndex: 'DRAFT_TITLE',
      key: 'title',
      ellipsis: true,
    },

    {
      title: '기안일',
      dataIndex: 'REG_DTTM',
      key: 'regDttm',
      width: '10%',
      align: 'center',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
  ];

  onRowClick = (record, rowIndex, e) => {
    const { sagaKey, submitHandlerBySaga } = this.props;
    const { WORK_SEQ, TASK_SEQ, STEP, PROC_STATUS } = record;

    const { DRAFT_DATA } = record;
    this.setState({ workPrcProps: { ...DRAFT_DATA } });
    this.props.setSelectedRow(record);
    this.props.setViewVisible(true);

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
    this.props.setViewVisible(false);
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
    const { selectedRow } = this.props;
    console.debug('draft', this.props);
    const coverView = { workSeq: selectedRow.WORK_SEQ, taskSeq: selectedRow.TASK_SEQ, visible: true, viewType: 'MODIFY' };
    this.setState(prevState => {
      const { workPrcProps } = prevState;
      const nWorkPrcProps = { ...workPrcProps, draftMethod: 'modify', darft_id: selectedRow.DRAFT_ID };
      return { ...prevState, coverView, workPrcProps: { ...nWorkPrcProps } };
    });
  };

  onClickModifyDoCoverView = () => {
    const { getDraftList } = this.props;
    const { coverView } = this.state;
    this.setState({ coverView: { ...coverView, visible: false } });
    getDraftList();
  };

  onChangeOpinion = e => {
    this.setState({ opinion: e.target.value });
  };

  render() {
    // const { approveList } = this.props;
    const { draftList, selectedRow, opinionVisible, setOpinionVisible, profile } = this.props;
    const { modalWidth, coverView, workPrcProps, holdReqList } = this.state;

    return (
      <>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 기안함
            </p>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          <AntdTable
            columns={this.getTableColumns()}
            dataSource={draftList.map(item => ({
              ...item,
              key: `draftList_${item.RNUM}`,
            }))}
            onRow={(record, rowIndex) => ({
              onClick: e => this.onRowClick(record, rowIndex, e),
            })}
            bordered
          />
        </StyledContentsWrapper>
        <AntdModal
          className="modalWrapper modalTechDoc modalCustom"
          title="내용 보기"
          width={modalWidth}
          visible={this.props.viewVisible}
          destroyOnClose
          onCancel={this.closeBtnFunc}
          footer={[]}
        >
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
              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                {(selectedRow.PROC_STATUS === 3 || selectedRow.PROC_STATUS === 300) && (
                  <>
                    <StyledButton className="btn-primary mr5" onClick={this.onHoldRelase}>
                      홀드해제
                    </StyledButton>
                    {profile && profile.USER_ID === selectedRow.DRAFTER_ID && (
                      <StyledButton className="btn-primary mr5" onClick={onClickModify}>
                        표지수정
                      </StyledButton>
                    )}
                  </>
                )}

                <StyledButton className="btn-light" onClick={closeBtnFunc}>
                  닫기
                </StyledButton>
              </div>
            )}
          />
          {holdReqList && holdReqList.length > 0 && (
            <StyledHtmlTable style={{ padding: '20px 20px 0' }}>
              <table style={{ width: '100%' }}>
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
          )}
        </AntdModal>
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
            CustomWorkProcessModal={WorkProcessModal}
            workPrcProps={workPrcProps}
            onCloseCoverView={this.onCloseCoverView}
            onCloseModalHandler={this.onCloseCoverView}
            reloadId="approveBase_approveView"
            reloadViewType="VIEW"
            reloadTaskSeq={selectedRow && selectedRow.TASK_SEQ}
            ViewCustomButtons={({ onCloseCoverView }) => (
              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <StyledButton className="btn-primary" onClick={onCloseCoverView}>
                  닫기
                </StyledButton>
              </div>
            )}
            ModifyCustomButtons={({ onCloseCoverView, saveBeforeProcess, sagaKey, reloadId }) => (
              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <StyledButton className="btn-primary mr5" onClick={() => saveBeforeProcess(sagaKey, reloadId)}>
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
          <div style={{ width: '100%', textAlign: 'center', marginTop: '12px' }}>
            <StyledButton className="btn-primary mr5" onClick={this.handleReqApprove}>
              저장
            </StyledButton>
            <StyledButton className="btn-light" onClick={() => setOpinionVisible(false)}>
              닫기
            </StyledButton>
          </div>
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
