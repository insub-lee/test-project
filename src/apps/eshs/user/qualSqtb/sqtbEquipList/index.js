import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';
import { Data } from 'react-data-grid-addons';
import { Modal } from 'antd';
import SearchListPage from '../sqtbEquipMgt/pages/SearchListPage';
import ListPage from './pages/ListPage';

class SqtbEquipList extends Component {
  state = {
    isLoading: true,
  };

  loadingComplete = () => {
    this.setState({
      isLoading: false,
      searchListVisible: false,
      modalSelectedRow: {},
      searchList: [],
    });
  };

  componentDidMount() {
    this.handleReloadSearchList();
  }

  modalRowSelected = modalSelectedRow => {
    this.setState({
      modalSelectedRow,
    });
    this.handleModalVisible();
  };

  setRowSelected = modalSelectedRow => {
    this.setState({
      modalSelectedRow,
    });
  };

  handleModalVisible = () => {
    const { searchListVisible } = this.state;
    this.setState({
      searchListVisible: !searchListVisible,
    });
    this.handleReloadSearchList();
  };

  handleReloadSearchList = () => {
    const { searchListVisible } = this.state;
    const searchList = [];
    if (!searchListVisible) {
      searchList.push(
        <BizBuilderBase
          key={5321}
          sagaKey="SqtbSearchList"
          workSeq={4941}
          viewType="LIST"
          loadingComplete={this.loadingComplete}
          CustomListPage={SearchListPage}
          listMetaSeq={5321}
          modalRowSelected={record => this.modalRowSelected(record)}
        />,
      );
    }

    this.setState({ searchList });
  };

  render() {
    const { searchListVisible, modalSelectedRow, searchList } = this.state;
    return (
      <>
        <BizBuilderBase
          sagaKey="sqtbEquipList"
          workSeq={4941}
          viewType="LIST"
          CustomListPage={ListPage}
          loadingComplete={this.loadingComplete}
          handleModalVisible={this.handleModalVisible}
          modalSelectedRow={modalSelectedRow}
          searchListId="SqtbSearchList"
          setModalRowSelected={obj => this.setRowSelected(obj)}
        />
        <Modal title="장비 검색" visible={searchListVisible} width={1000} height={600} onCancel={this.handleModalVisible} footer={[null]}>
          {searchList}
        </Modal>
      </>
    );
  }
}

SqtbEquipList.propTypes = {};

SqtbEquipList.defaultProps = {};

export default SqtbEquipList;
