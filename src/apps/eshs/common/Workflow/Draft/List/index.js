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
import SearchBar from 'apps/eshs/common/Workflow/common/SearchBar';

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
      modalLoading: false,
      loading: false,
      modalObj: {
        visible: false,
        content: [],
        title: '',
        width: 0,
      },
      searchParam: {},
    };
  }

  componentDidMount() {
    this.getList();
  }

  getList = (params = this.state?.searchParam) => {
    const { profile, id, getDraftList, relTypes, setRelTypes } = this.props;
    const { paginationIdx, pageSize } = this.state;
    const fixUrl = '/api/workflow/v1/common/approve/draftListESHS';
    setRelTypes(relTypes);
    this.spinningOn();
    this.props.getDraftList(fixUrl, paginationIdx, pageSize, relTypes, params, _ => this.setState({ searchParam: params }, this.spinningOff));
  };

  handleModal = (visible = false, content = [], title = '기안함', width = 1100) => this.setState({ modalObj: { visible, content, title, width } });

  onRowClick = (record, rowIndex, e) => {
    const { sagaKey, submitHandlerBySaga } = this.props;
    const { isDcc } = this.state;
    const { WORK_SEQ, TASK_SEQ, STEP, PROC_STATUS, APPV_STATUS, DRAFT_DATA, DRAFT_ID } = record;

    this.setState({ workPrcProps: { ...record } });
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
    // const { approveList } = this.props;
    const { draftList, draftListCnt, selectedRow } = this.props;
    const { paginationIdx, modalObj } = this.state;
    return (
      <Spin spinning={this.state.loading}>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 기안함
            </p>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          <SearchBar spinningOn={this.spinningOn} spinningOff={this.spinningOff} getList={params => this.getList(params)} />
          <div style={{ width: '100%', textAlign: 'right', marginBottom: '10px' }}>
            <span style={{ float: 'left' }}>
              상신한 문서 : <font style={{ color: '#ff0000' }}>{draftListCnt || 0}</font> 건
            </span>
          </div>
          <AntdTable
            key="QUE_ID"
            columns={columns(this.handleModal, 'DRAFT', this.modalSpinningOn, this.modalSpinningOff)}
            dataSource={draftList}
            onRow={(record, rowIndex) => ({
              onClick: e => this.onRowClick(record, rowIndex, e),
            })}
            bordered
            pagination={{ current: paginationIdx, total: draftListCnt }}
            onChange={pagination => this.setPaginationIdx(pagination.current)}
          />
        </StyledContentsWrapper>
        <AntdModal width={modalObj.width} visible={modalObj.visible} title={modalObj.title} onCancel={() => this.handleModal()} destroyOnClose footer={null}>
          {modalObj?.title === '기안함' && <CustomWorkProcess PRC_ID={selectedRow.PRC_ID} draftId={selectedRow.DRAFT_ID || -1} viewType="VIEW" statusVisible />}
          <Spin spinning={this.state.modalLoading}>{modalObj.content}</Spin>
        </AntdModal>
      </Spin>
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
