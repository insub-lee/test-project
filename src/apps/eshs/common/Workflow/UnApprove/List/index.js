import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Modal, Spin } from 'antd';

import moment from 'moment';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';

import DraggableModal from 'components/DraggableModal';
// import MdcsAppvView from 'apps/Workflow/components/ApproveBase/viewComponent/MdcsAppvView';
import EshsAppView from 'apps/eshs/common/Workflow/EshsAppView';
import SafetyAppView from 'apps/eshs/common/Workflow/EshsAppView/SafetyAppView';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

import { columns } from 'apps/eshs/common/Workflow/common/Columns';
import SearchBar from 'apps/eshs/common/Workflow/common/SearchBar';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);

const AntdLineTable = StyledAntdTable(Table);

class UnApproveList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paginationIdx: 1,
      pageSize: 10,
      modalLoading: false,
      loading: false,
      modalObj: {
        visible: false,
        content: [],
        title: '',
      },
      searchParam: {},
    };
  }

  componentDidMount() {
    this.getList();
  }

  getList = (params = this.state?.searchParam) => {
    const { profile, id, getUnApproveList, relTypes, setRelTypes } = this.props;
    const { paginationIdx, pageSize } = this.state;
    setRelTypes(relTypes);
    const fixUrl = '/api/workflow/v1/common/approve/unApproveListESHS';
    this.spinningOn();
    this.props.getUnApproveList(fixUrl, paginationIdx, pageSize, relTypes, params, _ => this.setState({ searchParam: params }, this.spinningOff));
  };

  handleModal = (visible = false, content = [], title = '미결함') => this.setState({ modalObj: { visible, content, title } });

  onRowClick = (record, rowIndex, e) => {
    this.props.setSelectedRow(record);
    this.props.setViewVisible(true);
  };

  onModalClose = () => {
    this.props.setViewVisible(false);
  };

  setPaginationIdx = paginationIdx => this.setState({ paginationIdx }, () => this.getList());

  modalSpinningOn = () => this.setState({ modalLoading: true });

  modalSpinningOff = () => this.setState({ modalLoading: false });

  spinningOn = () => this.setState({ loading: true });

  spinningOff = () => this.setState({ loading: false });

  render() {
    const { unApproveList, unApproveListCnt, viewVisible, selectedRow } = this.props;
    const { paginationIdx, modalObj } = this.state;

    return (
      <Spin spinning={this.state.loading}>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 미결함
            </p>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          <SearchBar spinningOn={this.spinningOn} spinningOff={this.spinningOff} getList={params => this.getList(params)} />
          <div style={{ width: '100%', textAlign: 'right', marginBottom: '10px' }}>
            <span style={{ float: 'left' }}>
              결재할 문서 : <font style={{ color: '#ff0000' }}>{unApproveListCnt || 0}</font> 건
            </span>
          </div>
          <AntdLineTable
            key="QUE_ID"
            columns={columns(this.handleModal, 'UNAPPROVE', this.modalSpinningOn, this.modalSpinningOff)}
            dataSource={unApproveList}
            onRow={(record, rowIndex) => ({
              onClick: e => this.onRowClick(record, rowIndex, e),
            })}
            bordered
            pagination={{ current: paginationIdx, total: unApproveListCnt }}
            onChange={pagination => this.setPaginationIdx(pagination.current)}
          />
        </StyledContentsWrapper>

        <AntdModal width={1100} visible={modalObj.visible} title={modalObj.title} onCancel={() => this.handleModal()} destroyOnClose footer={null}>
          {selectedRow?.REL_KEY === '안전개선 요청' ? (
            <SafetyAppView {...this.props} setViewVisible={this.handleModal} />
          ) : (
            <EshsAppView {...this.props} setViewVisible={this.handleModal} />
          )}
          <Spin spinning={this.state.modalLoading}>{modalObj.content}</Spin>
        </AntdModal>
      </Spin>
    );
  }
}

UnApproveList.propTypes = {
  unApproveList: PropTypes.array,
  getUnApproveList: PropTypes.func,

  selectedRow: PropTypes.object,
  setSelectedRow: PropTypes.func,
  setViewVisible: PropTypes.func,
};

UnApproveList.defaultProps = {
  unApproveList: [],
  getUnApproveList: () => {},

  selectedRow: {},
};

export default UnApproveList;
