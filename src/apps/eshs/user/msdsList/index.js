import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';
import { Data } from 'react-data-grid-addons';
import { Modal } from 'antd';
import ListPage from './ListPage';
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
          sagaKey="MsdsListMgt"
          workSeq={3161}
          viewType="LIST"
          loadingComplete={this.loadingComplete}
          CustomListPage={ListPage}
          handleModalVisible={this.handleModalVisible}
        />
        <Modal title="MSDS 검색" visible={searchListVisible} width={1000} height={600} onCancel={this.handleModalVisible} footer={[null]}>
          <BizBuilderBase
            sagaKey="MsdsListSearchList"
            workSeq={3161}
            viewType="LIST"
            loadingComplete={this.loadingComplete}
            CustomListPage={SearchListPage}
            handleModalVisible={this.handleModalVisible}
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
