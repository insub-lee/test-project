import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, message, Modal } from 'antd';
import moment from 'moment';

import BizBuilderBase from 'components/BizBuilderBase';
import DraggableModal from 'components/DraggableModal';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import { columns } from 'apps/eshs/common/Workflow/common/Columns';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);

class ApproveList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStatus: undefined,
      draftNode: undefined,
      workPrcProps: undefined,
      paginationIdx: 1,
      pageSize: 10,
      modalObj: {
        visible: false,
        content: [],
      },
    };
  }

  componentDidMount() {
    const { profile, id, getApproveList, relTypes, setRelTypes } = this.props;
    const { paginationIdx, pageSize } = this.state;
    const fixUrl = undefined;
    setRelTypes(relTypes);
    this.props.getApproveList(fixUrl, paginationIdx, pageSize, relTypes);
  }

  handleModal = (visible = false, content = []) => this.setState({ modalObj: { visible, content } });

  // getTableColumns = () => [
  //   // {
  //   //   title: 'No',
  //   //   dataIndex: 'RNUM',
  //   //   key: 'rnum',
  //   //   width: '5%',
  //   //   align: 'center',
  //   // },
  //   {
  //     title: '종류',
  //     dataIndex: 'APPVGUBUN',
  //     key: 'APPVGUBUN',
  //     width: '15%',
  //     align: 'center',
  //     render: (text, record) => (record.REL_TYPE === 99 ? '폐기' : record.REL_TYPE === 999 ? '일괄폐기' : text),
  //   },
  //   {
  //     title: '유형',
  //     dataIndex: 'NODETYPE',
  //     key: 'NODETYPE',
  //     width: '9%',
  //     align: 'center',
  //     render: (text, record) => (record.APPV_USER_ID === record.ORG_APPV_USER_ID ? text : `${text}(위임결재)`),
  //   },
  //   {
  //     title: '표준제목',
  //     dataIndex: 'DRAFT_TITLE',
  //     key: 'title',
  //     ellipsis: true,
  //   },
  //   {
  //     title: '결재상태',
  //     dataIndex: 'APPV_STATUS_NM',
  //     key: 'APPV_STATUS_NM',
  //     width: '9%',
  //     align: 'center',
  //   },
  //   {
  //     title: '진행상태',
  //     dataIndex: 'PROC_STATUS',
  //     key: 'PROC_STATUS',
  //     width: '9%',
  //     align: 'center',
  //     render: (text, record) => (text === 3 ? '홀드' : text === 2 ? '완료' : '진행중'),
  //   },
  //   {
  //     title: '기안자',
  //     dataIndex: 'NAME_KOR',
  //     key: 'nameKor',
  //     width: '10%',
  //     align: 'center',
  //   },
  //   {
  //     title: '결재일',
  //     dataIndex: 'APPV_DTTM',
  //     key: 'appv_dttm',
  //     width: '10%',
  //     align: 'center',
  //     render: (text, record) => (text && text.length > 0 ? moment(text).format('YYYY-MM-DD') : text),
  //   },
  // ];

  onRowClick = (record, rowIndex, e) => {
    const { WORK_SEQ, TASK_SEQ, STEP, PROC_STATUS, APPV_STATUS, DRAFT_DATA, DRAFT_ID } = record;
    this.setState({ currentStatus: APPV_STATUS, workPrcProps: { ...record } });
    this.props.setSelectedRow(record);
    this.props.setViewVisible(true);
  };

  closeBtnFunc = () => {
    const { getApproveList, relTypes } = this.props;
    const { paginationIdx, pageSize } = this.state;
    this.props.setViewVisible(false);
    const fixUrl = undefined;
    getApproveList(fixUrl, paginationIdx, pageSize, relTypes);
  };

  setPaginationIdx = paginationIdx =>
    this.setState({ paginationIdx }, () => {
      const { getApproveList, relTypes } = this.props;
      const { pageSize } = this.state;

      const fixUrl = undefined;
      this.props.getApproveList(fixUrl, paginationIdx, pageSize, relTypes);
    });

  render() {
    const { approveList, approveListCnt, selectedRow } = this.props;
    const { currentStatus, draftNode, workPrcProps, paginationIdx, modalObj } = this.state;

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
          <AntdTable
            key="apps-wasteMatter-workflow-user-approve-list"
            columns={columns(this.handleModal)}
            dataSource={approveList}
            onRow={(record, rowIndex) => ({
              onClick: e => this.onRowClick(record, rowIndex, e),
            })}
            bordered
            pagination={{ current: paginationIdx, total: approveListCnt }}
            onChange={pagination => this.setPaginationIdx(pagination.current)}
          />
        </StyledContentsWrapper>
        <div>
          {/* {this.props.viewVisible && (
            <DraggableModal key="wasteMatter-approveListKeys" title="내용보기" visible={this.props.viewVisible}>
              <BizBuilderBase
                sagaKey="wasteMatter-approveBase_approveView"
                viewType="VIEW"
                onCloseModal={this.onCloseModal}
                onChangeForm={this.onChangeForm}
                closeBtnFunc={this.closeBtnFunc}
                workSeq={selectedRow && selectedRow.WORK_SEQ}
                taskSeq={selectedRow && selectedRow.TASK_SEQ}
                selectedRow={selectedRow}
                ViewCustomButtons={({ closeBtnFunc, onClickModify }) => (
                  <StyledButtonWrapper className="btn-wrap-mt-20 btn-wrap-center">
                    <StyledButton className="btn-light btn-sm" onClick={closeBtnFunc}>
                      닫기
                    </StyledButton>
                  </StyledButtonWrapper>
                )}
              />
            </DraggableModal>
          )} */}
          {/* <AntdModal width={850} visible={modalObj.visible} title="기결함" onCancel={() => this.handleModal()} destroyOnClose footer={null}>
            {modalObj.content}
          </AntdModal> */}
        </div>
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
