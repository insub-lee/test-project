import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, message, Modal, Spin } from 'antd';
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
import SearchBar from 'apps/eshs/common/Workflow/common/SearchBar';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);

class ApproveList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStatus: undefined,
      draftNode: undefined,
      workPrcProps: undefined,
      modalLoading: false,
      loading: false,
      paginationIdx: 1,
      pageSize: 10,
      modalObj: {
        visible: false,
        content: [],
      },
      searchParam: {},
    };
  }

  componentDidMount() {
    this.getList();
  }

  getList = (params = this.state?.searchParam) => {
    const { profile, id, getApproveList, relTypes, setRelTypes } = this.props;
    const { paginationIdx, pageSize } = this.state;
    const fixUrl = '/api/workflow/v1/common/approve/approveListESHS';
    setRelTypes(relTypes);
    this.spinningOn();

    this.props.getApproveList(fixUrl, paginationIdx, pageSize, relTypes, params, _ => this.setState({ searchParam: params }, this.spinningOff));
  };

  handleModal = (visible = false, content = []) => this.setState({ modalObj: { visible, content } });

  onRowClick = (record, rowIndex, e) => {
    const { WORK_SEQ, TASK_SEQ, STEP, PROC_STATUS, APPV_STATUS, DRAFT_DATA, DRAFT_ID } = record;
    this.setState({ currentStatus: APPV_STATUS, workPrcProps: { ...record } });
    this.props.setSelectedRow(record);
    this.props.setViewVisible(true);
  };

  closeBtnFunc = () => {
    this.props.setViewVisible(false);
    this.getList();
  };

  setPaginationIdx = paginationIdx => this.setState({ paginationIdx }, () => this.getList());

  modalSpinningOn = () => this.setState({ modalLoading: true });

  modalSpinningOff = () => this.setState({ modalLoading: false });

  spinningOn = () => this.setState({ loading: true });

  spinningOff = () => this.setState({ loading: false });

  render() {
    const { approveList, approveListCnt, selectedRow } = this.props;
    const { paginationIdx, modalObj } = this.state;
    return (
      <Spin spinning={this.state.loading}>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 기결함
            </p>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          <SearchBar spinningOn={this.spinningOn} spinningOff={this.spinningOff} getList={params => this.getList(params)} />
          <div style={{ width: '100%', textAlign: 'right', marginBottom: '10px' }}>
            <span style={{ float: 'left' }}>
              결재한 문서 : <font style={{ color: '#ff0000' }}>{approveListCnt || 0}</font> 건
            </span>
          </div>
          <AntdTable
            key="QUE_ID"
            columns={columns(this.handleModal, 'APPROVE', this.modalSpinningOn, this.modalSpinningOff)}
            dataSource={approveList}
            onRow={(record, rowIndex) => ({
              onClick: e => this.onRowClick(record, rowIndex, e),
            })}
            bordered
            pagination={{ current: paginationIdx, total: approveListCnt }}
            onChange={pagination => this.setPaginationIdx(pagination.current)}
          />
        </StyledContentsWrapper>

        <AntdModal width={1100} visible={modalObj.visible} title="기결함" onCancel={() => this.handleModal()} destroyOnClose footer={null}>
          <CustomWorkProcess PRC_ID={selectedRow.PRC_ID} draftId={selectedRow.DRAFT_ID || -1} viewType="VIEW" />
          <Spin spinning={this.state.modalLoading}>{modalObj.content}</Spin>
        </AntdModal>
      </Spin>
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
