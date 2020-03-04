import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';
import { Data } from 'react-data-grid-addons';
import { Modal } from 'antd';
import ListPage from './ListPage';
import InputPage from './InputPage';
import ModifyPage from './ModifyPage';
import ViewPage from './ViewPage';
import SearchListPage from './SearchListPage';

class MsdsMgt extends Component {
  state = {
    isLoading: true,
    customModal: {},
    searchListVisible: false,
  };

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  handleModalVisible = () => {
    const { searchListVisible } = this.state;
    this.setState({
      searchListVisible: !searchListVisible,
    });
  };

  render() {
    const { searchListVisible } = this.state;
    return (
      <>
        <BizBuilderBase
          sagaKey="MsdsMgt"
          workSeq={3161}
          viewType="LIST"
          loadingComplete={this.loadingComplete}
          CustomListPage={ListPage}
          CustomInputPage={InputPage}
          CustomViewPage={ViewPage}
          CustomModifyPage={ModifyPage}
          handleModalVisible={this.handleModalVisible}
        />
        <Modal title="MSDS 검색" visible={searchListVisible} width={1000} height={600} onCancel={this.handleModalVisible} footer={[null]}>
          <BizBuilderBase
            sagaKey="MsdsSearchList"
            workSeq={3161}
            viewType="LIST"
            loadingComplete={this.loadingComplete}
            handleModalVisible={this.handleModalVisible}
            CustomListPage={SearchListPage}
            listMetaSeq={4141}
          />
        </Modal>
      </>
    );
  }
}

MsdsMgt.propTypes = {};

MsdsMgt.defaultProps = {};

export default MsdsMgt;
