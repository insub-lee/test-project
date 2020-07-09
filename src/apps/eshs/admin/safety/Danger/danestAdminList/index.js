import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';

import DanestAdmin from 'apps/eshs/admin/safety/Danger/danestAdmin';

import { Modal } from 'antd';

import StyledAntdModal from 'components/BizBuilder/styled//Modal/StyledAntdModal';

const AntdModal = StyledAntdModal(Modal);

class DanestAdminList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  isOpenModalChange = record => {
    this.setState({ improveDanger: { REG_NO: record.REG_NO, REG_DTTM: record.REG_DATE, IMPROVE: true } });
    this.onModalChange();
  };

  onModalChange = () => {
    const { isModal } = this.state;
    this.setState({ isModal: !isModal });
  };

  render() {
    return (
      <>
        <BizBuilderBase
          sagaKey="danestAdminList"
          workSeq={12061}
          viewType="LIST"
          loadingComplete={this.loadingComplete}
          listMetaSeq={12681}
          isOpenModalChange={this.isOpenModalChange}
        />
        <AntdModal width={1000} visible={this.state.isModal} title="위험성 평가" onCancel={this.onModalChange} destroyOnClose footer={null}>
          {this.state.isModal && <DanestAdmin improveDanger={this.state.improveDanger} />}
        </AntdModal>
      </>
    );
  }
}

DanestAdminList.propTypes = {};

DanestAdminList.defaultProps = {};

export default DanestAdminList;
