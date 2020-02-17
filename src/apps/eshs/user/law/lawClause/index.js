import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import { Modal } from 'antd';
import ClauseList from './ClauseList';
import ModalInput from '../ModalInput';
import ModalModify from '../ModalClause';
import RevisionHistory from './RevisionHistory';

class lawClause extends Component {
  state = {
    isLoading: true,
    isInputModal: false,
    isModifyModal: false,
    masterSeq: '',
    masterRechName: '',
    masterRechNo: '',
    modifyTaskSeq: '',
    isRevisionModal: '',
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

  isOpenModifyModal = rowData => {
    this.setState({ isModifyModal: true, modifyTaskSeq: rowData.TASK_SEQ, masterRechName: rowData.RECH_LAW_NAME, masterRechNo: rowData.RECH_NO });
  };

  isOpenRevisionModal = rowData => {
    this.setState({ isRevisionModal: true, modifyTaskSeq: rowData.TASK_ORIGIN_SEQ });
  };

  onCancel = () => {
    this.setState({
      isInputModal: false,
      isModifyModal: false,
      isRevisionModal: false,
    });
  };

  onShowModalTemplate = (viewType, taskSeq) => (
    <BizBuilderBase
      sagaKey="lawClause_ModifyM"
      baseSagaKey="lawClause"
      workSeq={1645}
      baseWorkSeq={1645}
      compProps={{ MASTER_SEQ: this.state.masterSeq, MASTER_RECH_NAME: this.state.masterRechName, MASTER_NO: this.state.masterRechNo }}
      taskSeq={taskSeq}
      viewType={viewType}
      loadingComplete={this.loadingComplete}
      CustomModifyPage={ModalModify}
      CustomInputPage={ModalInput}
      onCloseModleHandler={this.onCancel}
      revisionType="MAJOR"
    />
  );

  onShowRevisionTemplate = (viewType, taskSeq) => (
    <BizBuilderBase
      sagaKey="lawClause_Revision"
      listMetaSeq={2601}
      workSeq={1645}
      taskSeq={-1}
      revisionTaskSeq={taskSeq}
      viewType={viewType}
      loadingComplete={this.loadingComplete}
      CustomListPage={RevisionHistory}
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
          isOpenModalPlusChange={this.isOpenRevisionModal}
        />
        <Modal
          visible={this.state.isInputModal || this.state.isModifyModal || this.state.isRevisionModal}
          width="1000px"
          onCancel={this.onCancel}
          destroyOnClose
          footer={[]}
        >
          <div>
            {this.state.isInputModal && this.onShowModalTemplate('INPUT', -1)}
            {this.state.isModifyModal && this.onShowModalTemplate('MODIFY', this.state.modifyTaskSeq)}
            {this.state.isRevisionModal && this.onShowRevisionTemplate('LIST', this.state.modifyTaskSeq)}
          </div>
        </Modal>
      </>
    );
  }
}

lawClause.propTypes = {};

lawClause.defaultProps = {};

export default lawClause;
