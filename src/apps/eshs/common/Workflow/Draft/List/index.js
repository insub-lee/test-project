import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Button, message, Modal, Spin } from 'antd';
import moment from 'moment';

import BizBuilderBase from 'components/BizBuilderBase';
import DraggableModal from 'components/DraggableModal';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import CustomWorkProcess from 'apps/Workflow/CustomWorkProcess';

import { columns } from 'apps/eshs/common/Workflow/common/Columns';
const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);

class DraftList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workPrcProps: undefined,
      paginationIdx: 1,
      pageSize: 10,
      loading: false,
      modalObj: {
        visible: false,
        content: [],
      },
    };
  }

  componentDidMount() {
    const { getDraftList, relTypes, setRelTypes } = this.props;
    const { paginationIdx, pageSize } = this.state;
    const fixUrl = undefined;
    setRelTypes(relTypes);
    getDraftList(fixUrl, paginationIdx, pageSize, relTypes);
  }

  handleModal = (visible = false, content = []) => this.setState({ modalObj: { visible, content } });

  onRowClick = (record, rowIndex, e) => {
    const { sagaKey, submitHandlerBySaga } = this.props;
    const { isDcc } = this.state;
    const { WORK_SEQ, TASK_SEQ, STEP, PROC_STATUS, APPV_STATUS, DRAFT_DATA, DRAFT_ID } = record;

    this.setState({ workPrcProps: { ...record } });
    this.props.setSelectedRow(record);
    this.props.setViewVisible(true);
  };

  closeBtnFunc = () => {
    const { getDraftList, relTypes } = this.props;
    const { paginationIdx, pageSize } = this.state;
    this.props.setViewVisible(false);
    const fixUrl = undefined;
    getDraftList(fixUrl, paginationIdx, pageSize, relTypes);
  };

  setPaginationIdx = paginationIdx =>
    this.setState({ paginationIdx }, () => {
      const { getDraftList, relTypes } = this.props;
      const { pageSize } = this.state;

      const fixUrl = undefined;
      getDraftList(fixUrl, paginationIdx, pageSize, relTypes);
    });

  spinningOn = () => this.setState({ loading: true });

  spinningOff = () => this.setState({ loading: false });

  render() {
    // const { approveList } = this.props;
    const { draftList, draftListCnt, selectedRow } = this.props;
    const { paginationIdx, modalObj } = this.state;
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
            key="QUE_ID"
            columns={columns(this.handleModal, 'DRAFT', this.spinningOn, this.spinningOff)}
            dataSource={draftList}
            onRow={(record, rowIndex) => ({
              onClick: e => this.onRowClick(record, rowIndex, e),
            })}
            bordered
            pagination={{ current: paginationIdx, total: draftListCnt }}
            onChange={pagination => this.setPaginationIdx(pagination.current)}
          />
        </StyledContentsWrapper>
        <div>
          <AntdModal width={1000} visible={modalObj.visible} title="기안함" onCancel={() => this.handleModal()} destroyOnClose footer={null}>
            <CustomWorkProcess PRC_ID={selectedRow.PRC_ID} draftId={selectedRow.DRAFT_ID || -1} viewType="VIEW" />

            <Spin spinning={this.state.loading}>{modalObj.content}</Spin>
          </AntdModal>
        </div>
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
