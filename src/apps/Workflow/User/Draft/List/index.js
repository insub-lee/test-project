import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Icon, Button, Input } from 'antd';
import moment from 'moment';

import BizBuilderBase from 'components/BizBuilderBase';
import HoldView from 'apps/Workflow/components/ApproveBase/viewComponent/MdcsAppvView/holdview';
import OpinionModal from 'apps/Workflow/components/ApproveBase/viewComponent/ApproveView/OpinionModal';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledLineTable from 'commonStyled/MdcsStyled/Table/StyledLineTable';
import ContentsWrapper from 'commonStyled/MdcsStyled/Wrapper/ContentsWrapper';
import StyledContentsModal from 'commonStyled/MdcsStyled/Modal/StyledContentsModal';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
const AntdLineTable = StyledLineTable(Table);
const AntdModal = StyledContentsModal(Modal);
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
    };
  }

  componentDidMount() {
    this.props.getDraftList();
  }

  getTableColumns = () => [
    {
      title: 'No',
      dataIndex: 'RNUM',
      key: 'rnum',
      width: '5%',
      align: 'center',
    },
    {
      title: '구분',
      dataIndex: 'APPVGUBUN',
      key: 'APPVGUBUN',
      width: '10%',
      align: 'center',
    },
    {
      title: '프로세스상태',
      dataIndex: 'STATUS_NM',
      key: 'STATUS_NM',
      width: '10%',
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
    if (record.STATUS === 3) {
      record.PROC_STATUS = 3;
    }
    this.props.setSelectedRow(record);
    this.props.setViewVisible(true);
  };

  onResizeModal = modalWidth => {
    this.setState({ modalWidth });
  };

  clickCoverView = (workSeq, taskSeq, viewMetaSeq) => {
    const coverView = { workSeq, taskSeq, viewMetaSeq, visible: true };
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
    e.preventDefault();
    this.props.reqApprove({});
    this.props.setOpinionVisible(false);
  };

  render() {
    // const { approveList } = this.props;
    const { draftList, selectedRow, opinionVisible, setOpinionVisible } = this.props;
    const { modalWidth, coverView } = this.state;
    console.debug('기안함', this.props);
    return (
      <>
        <ContentsWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 기안함
            </p>
          </div>
          <AntdLineTable
            columns={this.getTableColumns()}
            dataSource={draftList.map(item => ({
              ...item,
              key: `draftList_${item.RNUM}`,
            }))}
            onRow={(record, rowIndex) => ({
              onClick: e => this.onRowClick(record, rowIndex, e),
            })}
            bordered
            className="tableWrapper"
          />
        </ContentsWrapper>
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
            onCloseModal={this.onCloseModal}
            onChangeForm={this.onChangeForm}
            closeBtnFunc={this.closeBtnFunc}
            clickCoverView={this.clickCoverView}
            workSeq={selectedRow && selectedRow.WORK_SEQ}
            taskSeq={selectedRow && selectedRow.TASK_SEQ}
            selectedRow={selectedRow}
            ViewCustomButtons={({ closeBtnFunc }) => (
              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                {(selectedRow.PROC_STATUS === 3 || selectedRow.PROC_STATUS === 300) && (
                  <StyledButton className="btn-primary btn-first" onClick={this.onHoldRelase}>
                    홀드해제
                  </StyledButton>
                )}
                <StyledButton className="btn-light" onClick={closeBtnFunc}>
                  닫기
                </StyledButton>
              </div>
            )}
          />
          {/* <HoldView {...this.props} onResizeModal={this.onResizeModal} /> */}
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
            viewType="VIEW"
            workSeq={coverView.workSeq}
            taskSeq={coverView.taskSeq}
            viewMetaSeq={coverView.viewMetaSeq}
            onCloseCoverView={this.onCloseCoverView}
            ViewCustomButtons={({ onCloseCoverView }) => (
              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <StyledButton className="btn-primary" onClick={onCloseCoverView}>
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
                    <TextArea rows={4} onChange={e => this.props.setOpinion(e.target.value)} />
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
          <div style={{ width: '100%', textAlign: 'center', marginTop: '12px' }}>
            <StyledButton className="btn-primary btn-first" onClick={this.handleReqApprove}>
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
