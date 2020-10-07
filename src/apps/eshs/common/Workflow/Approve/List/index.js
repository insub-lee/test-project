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
import CustomWorkProcess from 'apps/Workflow/CustomWorkProcess';
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
    const { paginationIdx, modalObj } = this.state;
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
            key="QUE_ID"
            columns={columns(this.handleModal, 'APPROVE')}
            dataSource={approveList}
            onRow={(record, rowIndex) => ({
              onClick: e => this.onRowClick(record, rowIndex, e),
            })}
            bordered
            pagination={{ current: paginationIdx, total: approveListCnt }}
            onChange={pagination => this.setPaginationIdx(pagination.current)}
          />
        </StyledContentsWrapper>

        <AntdModal width="75%" visible={modalObj.visible} title="기결함" onCancel={() => this.handleModal()} destroyOnClose footer={null}>
          <CustomWorkProcess PRC_ID={selectedRow.PRC_ID} draftId={selectedRow.DRAFT_ID || -1} viewType="VIEW" />
          {modalObj.content}
        </AntdModal>
        <div></div>
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
