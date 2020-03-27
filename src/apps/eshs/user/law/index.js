import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import { Modal } from 'antd';
import List from './List';
import ModalModify from './ModalModify';
import ModalInput from './ModalInput';

class law extends Component {
  state = {
    isLoading: true,
    isOpenModal: false,
    isInputModal: false,
    selectedTaskSeq: 0,
  };

  componentDidMount() {}

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  isOpenInputModal = () => {
    this.setState({ isInputModal: true });
  };

  isOpenModifyModal = rowData => {
    this.setState({ isOpenModal: true });
    this.setState({ selectedTaskSeq: rowData.TASK_SEQ });
  };

  onCancel = () => {
    this.setState({
      isOpenModal: false,
      isInputModal: false,
    });
  };

  onShowModalTemplate = (viewType, taskSeq) => (
    <BizBuilderBase
      sagaKey="law_M"
      baseSagaKey="law"
      workSeq={1081}
      taskSeq={taskSeq}
      viewType={viewType}
      loadingComplete={this.loadingComplete}
      CustomModifyPage={ModalModify}
      CustomInputPage={ModalInput}
      onCloseModalHandler={this.onCancel}
    />
  );

  render() {
    /* const {
      match: { params },
      item,
    } = this.props;
    const { ID } = params; */
    return (
      <>
        <BizBuilderBase
          sagaKey="law"
          workSeq={1081}
          viewType="LIST"
          loadingComplete={this.loadingComplete}
          CustomListPage={List}
          isOpenInputModal={this.isOpenInputModal}
          isOpenModalChange={this.isOpenModifyModal}
        />
        <Modal visible={this.state.isInputModal || this.state.isOpenModal} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
          <div>
            {this.state.isInputModal && this.onShowModalTemplate('INPUT', -1)}
            {this.state.isOpenModal && this.onShowModalTemplate('MODIFY', this.state.selectedTaskSeq)}
          </div>
        </Modal>
      </>
    );
  }
}

law.propTypes = {};

law.defaultProps = {};

export default law;
