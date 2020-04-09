import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';
import { Data } from 'react-data-grid-addons';
import { Modal } from 'antd';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';
import InputPage from './pages/InputPage';
import ModifyPage from './pages/ModifyPage';
import SearchListPage from './pages/SearchListPage';
const AntdModal = StyledContentsModal(Modal);

class SqtbEquipMgt extends Component {
  state = {
    isLoading: true,
    searchListVisible: false,
    modalSelectedRow: {},
    searchList: [],
  };

  loadingComplete = () => {
    this.setState({
      isLoading: false,
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
    const { saveTaskAfterCallbackFunc } = this.props;
    const { searchListVisible, modalSelectedRow, searchList } = this.state;
    return (
      <>
        <BizBuilderBase
          sagaKey="SqtbEquipMgt"
          workSeq={4941}
          viewType="INPUT"
          CustomInputPage={InputPage}
          CustomModifyPage={ModifyPage}
          loadingComplete={this.loadingComplete}
          handleModalVisible={this.handleModalVisible}
          modalSelectedRow={modalSelectedRow}
          searchListId="SqtbSearchList"
          setModalRowSelected={obj => this.setRowSelected(obj)}
          saveTaskAfterCallbackFunc={saveTaskAfterCallbackFunc}
        />
        <AntdModal title="장비 검색" visible={searchListVisible} width={1000} height={600} onCancel={this.handleModalVisible} footer={[null]}>
          {searchList}
        </AntdModal>
      </>
    );
  }
}

SqtbEquipMgt.propTypes = {
  saveTaskAfterCallbackFunc: PropTypes.any,
};

SqtbEquipMgt.defaultProps = {
  saveTaskAfterCallbackFunc: undefined,
};

export default SqtbEquipMgt;
