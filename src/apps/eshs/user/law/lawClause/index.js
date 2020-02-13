import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import { Modal } from 'antd';
import ClauseList from './ClauseList';
import ModalInput from '../ModalInput';
import ModalModify from '../ModalModify';

class lawClause extends Component {
  state = {
    isLoading: true,
    isInputModal: false,
    isModifyModal: false,
    masterSeq: '',
    masterRechName: '',
    masterRechNo: '',
    modifyTaskSeq: '',
  };

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  componentDidMount() {}

  isOpenInputModal = (selectedMasterSeq, selectedLawName, selectedRechNo) => {
    this.setState({ isInputModal: true, masterSeq: selectedMasterSeq, masterRechName: selectedLawName, masterRechNo: selectedRechNo });
  };

  isOpenModifyModal = selectedTaskSeq => {
    this.setState({ isModifyModal: true, modifyTaskSeq: selectedTaskSeq });
  };

  onCancel = () => {
    this.setState({
      isInputModal: false,
      isModifyModal: false,
    });
  };

  onShowModalTemplate = (viewType, taskSeq) => (
    <BizBuilderBase
      sagaKey="lawClause_ModifyM"
      baseSagaKey="lawClause"
      workSeq={1645}
      compProps={{ MASTER_SEQ: this.state.masterSeq, MASTER_RECH_NAME: this.state.masterRechName, MASTER_NO: this.state.masterRechNo }}
      taskSeq={taskSeq}
      viewType={viewType}
      loadingComplete={this.loadingComplete}
      CustomModifyPage={ModalModify}
      CustomInputPage={ModalInput}
      onCloseModleHandler={this.onCancel}
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
          sagaKey="lawClause"
          workSeq={1645}
          viewType="LIST"
          loadingComplete={this.loadingComplete}
          CustomListPage={ClauseList}
          isOpenInputModal={this.isOpenInputModal}
          isOpenModalChange={this.isOpenModifyModal}
        />
        <Modal visible={this.state.isInputModal || this.state.isModifyModal} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
          <div>
            {this.state.isInputModal && this.onShowModalTemplate('INPUT', -1)}
            {this.state.isModifyModal && this.onShowModalTemplate('MODIFY', this.state.modifyTaskSeq)}
          </div>
        </Modal>
      </>
    );
  }
}

lawClause.propTypes = {};

lawClause.defaultProps = {};

export default lawClause;
