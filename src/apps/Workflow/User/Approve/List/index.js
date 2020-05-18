import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Icon, Input } from 'antd';
import moment from 'moment';

import BizBuilderBase from 'components/BizBuilderBase';
import StyledLineTable from 'commonStyled/MdcsStyled/Table/StyledLineTable';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import StyledModalNofooterLine from 'components/CommonStyled/StyledModalNofooterLine';
import StyledContentsModal from 'commonStyled/MdcsStyled/Modal/StyledContentsModal';
import HoldView from 'apps/Workflow/components/ApproveBase/viewComponent/MdcsAppvView/holdview';
import ContentsWrapper from 'commonStyled/MdcsStyled/Wrapper/ContentsWrapper';

// import ApproveView from '../ApproveView';
// import HoldView from '../MdcsAppvView/holdview';

const { TextArea } = Input;

const AntdLineTable = StyledLineTable(Table);
const AntdModal = StyledContentsModal(Modal);

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
    };
  }

  componentDidMount() {
    this.props.getApproveList();
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
      width: '12%',
      align: 'center',
      render: (text, record) => (record.REL_TYPE === 1 ? text : '폐기'),
    },
    {
      title: '유형',
      dataIndex: 'NODETYPE',
      key: 'NODETYPE',
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
      title: '결재상태',
      dataIndex: 'APPV_STATUS_NM',
      key: 'APPV_STATUS_NM',
      width: '10%',
      align: 'center',
    },
    {
      title: '기안자',
      dataIndex: 'NAME_KOR',
      key: 'nameKor',
      width: '10%',
      align: 'center',
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

  onHoldRelase = () => {
    const { selectedRow, setSelectedRow, setOpinionVisible } = this.props;
    const APPV_STATUS = selectedRow.PROC_STATUS === 3 ? 4 : 40;
    const nSelectedRow = { ...selectedRow, APPV_STATUS };
    setSelectedRow(nSelectedRow);
    setOpinionVisible(true);
  };

  onRowClick = (record, rowIndex, e) => {
    this.props.setSelectedRow(record);
    this.props.setViewVisible(true);
  };

  closeBtnFunc = () => {
    this.props.setViewVisible(false);
  };

  clickCoverView = (workSeq, taskSeq, viewMetaSeq) => {
    const coverView = { workSeq, taskSeq, viewMetaSeq, visible: true, viewType: 'VIEW' };
    this.setState({ coverView });
  };

  onClickModify = () => {
    const { selectedRow } = this.props;
    const coverView = { workSeq: selectedRow.WORK_SEQ, taskSeq: selectedRow.TASK_SEQ, visible: true, viewType: 'MODIFY' };
    this.setState({ coverView });
  };

  handleReqApprove = e => {
    const { reqApprove, setOpinionVisible } = this.props;
    e.preventDefault();
    reqApprove({});
    setOpinionVisible(false);
  };

  render() {
    const { approveList, selectedRow, opinionVisible, setOpinionVisible } = this.props;
    const { modalWidth, coverView } = this.state;
    return (
      <>
        <ContentsWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 기결함
            </p>
          </div>
          <AntdLineTable
            columns={this.getTableColumns()}
            dataSource={approveList.map(item => ({ ...item, key: `approveList_${item.RNUM}` }))}
            onRow={(record, rowIndex) => ({
              onClick: e => this.onRowClick(record, rowIndex, e),
            })}
            bordered
            className="tableWrapper"
          />
        </ContentsWrapper>
        {/* <ModalWrapper title="표준문서 기결함" width={680} visible={this.props.viewVisible} destroyOnClose onCancel={this.onModalClose} footer={[]}>
          <HoldView {...this.props} />
        </ModalWrapper> */}
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
            onClickModify={this.onClickModify}
            workSeq={selectedRow && selectedRow.WORK_SEQ}
            taskSeq={selectedRow && selectedRow.TASK_SEQ}
            selectedRow={selectedRow}
            ViewCustomButtons={({ closeBtnFunc, onClickModify }) => (
              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                {(selectedRow.PROC_STATUS === 3 || selectedRow.PROC_STATUS === 300) && (
                  <StyledButton className="btn-primary btn-first" onClick={this.onHoldRelase}>
                    홀드해제
                  </StyledButton>
                )}
                <StyledButton className="btn-primary btn-first" onClick={onClickModify}>
                  표지수정
                </StyledButton>
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
