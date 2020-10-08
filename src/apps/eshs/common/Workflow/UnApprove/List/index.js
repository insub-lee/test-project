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
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

import { columns } from 'apps/eshs/common/Workflow/common/Columns';
const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);

const AntdLineTable = StyledAntdTable(Table);

class UnApproveList extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { getUnApproveList, relTypes, setRelTypes } = this.props;
    const { paginationIdx, pageSize } = this.state;
    const prefixUrl = undefined;
    setRelTypes(relTypes);
    getUnApproveList(prefixUrl, paginationIdx, pageSize, relTypes);
  }

  handleModal = (visible = false, content = []) => this.setState({ modalObj: { visible, content } });

  onRowClick = (record, rowIndex, e) => {
    this.props.setSelectedRow(record);
    this.props.setViewVisible(true);
  };

  onModalClose = () => {
    this.props.setViewVisible(false);
  };

  setPaginationIdx = paginationIdx =>
    this.setState({ paginationIdx }, () => {
      const { pageSize } = this.state;
      const { getUnApproveList, relTypes } = this.props;
      const prefixUrl = undefined;
      getUnApproveList(prefixUrl, paginationIdx, pageSize, relTypes);
    });

  spinningOn = () => this.setState({ loading: true });

  spinningOff = () => this.setState({ loading: false });

  render() {
    const { unApproveList, unApproveListCnt, viewVisible } = this.props;
    const { paginationIdx, modalObj } = this.state;

    return (
      <>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 미결함
            </p>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          <AntdLineTable
            key="QUE_ID"
            columns={columns(this.handleModal, 'UNAPPROVE', this.spinningOn, this.spinningOff)}
            dataSource={unApproveList}
            onRow={(record, rowIndex) => ({
              onClick: e => this.onRowClick(record, rowIndex, e),
            })}
            bordered
            pagination={{ current: paginationIdx, total: unApproveListCnt }}
            onChange={pagination => this.setPaginationIdx(pagination.current)}
          />
        </StyledContentsWrapper>

        <AntdModal width={1000} visible={modalObj.visible} title="미결함" onCancel={() => this.handleModal()} destroyOnClose footer={null}>
          <EshsAppView {...this.props} setViewVisible={this.handleModal} />
          <Spin spinning={this.state.loading}>{modalObj.content}</Spin>
        </AntdModal>
      </>
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
