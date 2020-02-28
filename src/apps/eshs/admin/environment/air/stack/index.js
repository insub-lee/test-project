import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import { Modal } from 'antd';

class Stack extends Component {
  // state = {
  //   isLoading: true,
  //   isOpenModal: false,
  //   isInputModal: false,
  //   selectedTaskSeq: 0,
  // };

  componentDidMount() {}

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  // isOpenInputModal = () => {
  //   this.setState({ isInputModal: true });
  // };

  // isOpenModifyModal = rowData => {
  //   this.setState({ isOpenModal: true });
  //   this.setState({ selectedTaskSeq: rowData.TASK_SEQ });
  // };

  onCancel = () => {
    this.setState({
      isOpenModal: false,
      isInputModal: false,
    });
  };

  // onShowModalTemplate = (viewType, taskSeq) => (
  //   <BizBuilderBase
  //     sagaKey="law_M"
  //     baseSagaKey="law"
  //     workSeq={1081}
  //     taskSeq={taskSeq}
  //     viewType={viewType}
  //     loadingComplete={this.loadingComplete}
  //     CustomModifyPage={ModalModify}
  //     CustomInputPage={ModalInput}
  //     onCloseModleHandler={this.onCancel}
  //   />
  // );

  render() {
    /* const {
      match: { params },
      item,
    } = this.props;
    const { ID } = params; */
    return (
      <>
        <BizBuilderBase
          sagaKey="stack"
          workSeq={3741}
          taskSeq={-1}
          viewType="INPUT"
          loadingComplete={this.loadingComplete}
          isOpenInputModal={this.isOpenInputModal}
          isOpenModalChange={this.isOpenModifyModal}
        />
        {/* <Modal visible={this.state.isInputModal || this.state.isOpenModal} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
          <div>
            {this.state.isInputModal && this.onShowModalTemplate('INPUT', -1)}
            {this.state.isOpenModal && this.onShowModalTemplate('MODIFY', this.state.selectedTaskSeq)}
          </div>
        </Modal> */}
      </>
    );
  }
}

Stack.propTypes = {};

Stack.defaultProps = {};

export default Stack;
