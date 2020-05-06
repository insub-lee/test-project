import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import { Modal, message } from 'antd';
import ClauseList from './ClauseList';
import RevisionHistory from './RevisionHistory';
import OnlyView from '../lawAppraise/OnlyView';

class lawClause extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInputModal: false,
      isModifyModal: false,
      masterSeq: '',
      masterRechName: '',
      masterRechNo: '',
      modifyTaskSeq: '',
      isRevisionModal: '',
      isRevisionDetailModal: '',
      revisionDetailTaskSeq: '',
      taskSeqReal: '',
    };
  }

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  componentDidMount() {}

  isOpenInputModal = (selectedMasterSeq, selectedLawName, selectedRechNo) => {
    console.log('selectedMasterSeq, selectedLawName, selectedRechNo', selectedMasterSeq, selectedLawName, selectedRechNo);
    if (selectedMasterSeq) {
      this.setState({ isInputModal: true, masterSeq: selectedMasterSeq, masterRechName: selectedLawName, masterRechNo: selectedRechNo });
    } else {
      message.warning('법규를 먼저 선택해주세요.');
    }
  };

  isOpenModifyModal = rowData => {
    this.setState({ isModifyModal: true, modifyTaskSeq: rowData.TASK_SEQ, masterRechName: rowData.RECH_LAW_NAME, masterRechNo: rowData.RECH_NO });
  };

  isOpenRevisionModal = rowData => {
    this.setState({ isRevisionModal: true, revisionTaskSeq: rowData.TASK_ORIGIN_SEQ, taskSeqReal: rowData.TASK_SEQ });
  };

  isOpenRevisionDetailModal = rowData => {
    this.setState({
      isRevisionDetailModal: true,
      revisionDetailTaskSeq: rowData.TASK_SEQ,
      masterRechName: rowData.RECH_LAW_NAME,
      masterRechNo: rowData.RECH_NO,
    });
  };

  onCancel = () => {
    this.setState({
      isInputModal: false,
      isModifyModal: false,
      isRevisionModal: false,
      isRevisionDetailModal: false,
    });
  };

  onShowModalTemplate = (viewType, taskSeq) => (
    <BizBuilderBase
      sagaKey="lawClause_ModifyM"
      reloadId="lawClause"
      workSeq={1645}
      baseWorkSeq={1645}
      compProps={{ MASTER_SEQ: this.state.masterSeq, MASTER_RECH_NAME: this.state.masterRechName, MASTER_NO: this.state.masterRechNo }}
      taskSeq={taskSeq}
      viewType={viewType}
      loadingComplete={this.loadingComplete}
      onCloseModalHandler={this.onCancel}
      revisionType="MAJOR"
    />
  );

  onRevisionDetailTemplate = (viewType, taskSeq) => (
    <BizBuilderBase
      sagaKey="lawClause_Revision_ModifyM"
      workSeq={1645}
      taskSeq={taskSeq}
      viewType={viewType}
      loadingComplete={this.loadingComplete}
      CustomViewPage={OnlyView}
      onCloseModalHandler={this.onCancel}
    />
  );

  onShowRevisionTemplate = (viewType, taskSeq) => (
    <>
      <BizBuilderBase
        sagaKey="lawClause_Revision"
        listMetaSeq={2601}
        workSeq={1645}
        // taskSeq={-1}
        // compProps={{ MASTER_SEQ: this.state.masterSeq, MASTER_RECH_NAME: this.state.masterRechName, MASTER_NO: this.state.masterRechNo }}
        revisionTaskSeq={taskSeq}
        viewType={viewType}
        loadingComplete={this.loadingComplete}
        CustomListPage={RevisionHistory}
        onCloseModalHandler={this.onCancel}
        isOpenModalChange={this.isOpenRevisionDetailModal}
        taskSeqReal={this.state.taskSeqReal}
      />
      <Modal visible={this.state.isRevisionDetailModal} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
        <div>{this.state.isRevisionDetailModal && this.onRevisionDetailTemplate('VIEW', this.state.revisionDetailTaskSeq)}</div>
      </Modal>
    </>
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
        <Modal visible={this.state.isInputModal || this.state.isModifyModal} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
          {this.state.isInputModal && this.onShowModalTemplate('INPUT', -1)}
          {this.state.isModifyModal && this.onShowModalTemplate('VIEW', this.state.modifyTaskSeq)}
        </Modal>
        <Modal visible={this.state.isRevisionModal} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
          {this.state.isRevisionModal && this.onShowRevisionTemplate('LIST', this.state.revisionTaskSeq)}
        </Modal>
      </>
    );
  }
}

lawClause.propTypes = {};

lawClause.defaultProps = {};

export default lawClause;
