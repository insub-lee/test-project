import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import { Modal } from 'antd';
import ClauseList from './AppraiseList';
import ModalInput from '../ModalInput';
import ModalModify from '../ModalModify';
import OnlyView from './OnlyView';
import RevisionHistory from './RevisionHistory';

class lawClause extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isInputModal: false,
      isModifyModal: false,
      isViewModal: false,
      veiwTaskSeq: 0,
      modifyTaskSeq: 0,
      masterSeq: '',
      clauseSeq: '',
      masterRechName: '',
      clauseRechName: '',
      masterRechNo: '',
      clauseGubunName: '',
      quarterN: 0,
      yyyy: '2020',
      isRevisionModal: '',
      isRevisionDetailModal: '',
      isAppraiseDetailModal: '',
      taskSeqReal: '',
    };
  }

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  componentDidMount() {}

  isOpenInputModal = (record, quarterNum, yearString, quarterSeq) => {
    if (!quarterSeq) {
      this.setState({
        isInputModal: true,
      });
    } else {
      this.setState({
        isModifyModal: true,
      });
    }
    this.setState({
      masterSeq: record.MASTER_SEQ,
      clauseSeq: record.TASK_SEQ,
      masterRechName: record.RECH_LAW_NAME,
      masterRechNo: record.RECH_NO,
      clauseRechName: record.TITLE,
      clauseGubunName: record.RECH_CLAUSE_GUBUN_NAME,
      quarterN: quarterNum,
      yyyy: yearString,
      modifyTaskSeq: quarterSeq,
    });
  };

  yearSetFunc = value => {
    this.setState({ yyyy: value });
  };

  isOpenAppraiseDetailModal = quarterSeq => {
    this.setState({
      isAppraiseDetailModal: true,
      veiwTaskSeq: quarterSeq,
    });
  };

  isOpenModifyModal = rowData => {
    this.setState({
      isViewModal: true,
      veiwTaskSeq: rowData.TASK_SEQ,
      masterRechName: rowData.RECH_LAW_NAME,
      masterRechNo: rowData.RECH_NO,
      clauseRechName: rowData.TITLE,
      clauseGubunName: rowData.RECH_CLAUSE_GUBUN_NAME,
    });
  };

  isOpenPlusModal = rowData => {
    this.setState({
      isRevisionModal: true,
      veiwTaskSeq: rowData.TASK_ORIGIN_SEQ,
      taskSeqReal: rowData.TASK_SEQ,
      masterRechName: rowData.RECH_LAW_NAME,
      masterRechNo: rowData.RECH_NO,
      clauseRechName: rowData.TITLE,
      clauseGubunName: rowData.RECH_CLAUSE_GUBUN_NAME,
    });
  };

  isOpenRevisionDetailModal = rowData => {
    this.setState({
      isRevisionDetailModal: true,
      modifyTaskSeq: rowData.TASK_SEQ,
      masterRechName: rowData.RECH_LAW_NAME,
      masterRechNo: rowData.RECH_NO,
      clauseRechName: rowData.TITLE,
      clauseGubunName: rowData.RECH_CLAUSE_GUBUN_NAME,
    });
  };

  onCancel = () => {
    this.setState({
      isInputModal: false,
      isModifyModal: false,
      isViewModal: false,
      isRevisionModal: false,
      isAppraiseDetailModal: false,
      isRevisionDetailModal: false,
    });
  };

  onShowModalTemplate = (viewType, taskSeq) => (
    <BizBuilderBase
      sagaKey="lawAppraise"
      baseSagaKey="lawClauseAppraise"
      workSeq={2242}
      baseWorkSeq={1645}
      compProps={{
        MASTER_SEQ: this.state.masterSeq,
        CLAUSE_TASK_SEQ: this.state.clauseSeq,
        MASTER_RECH_NAME: this.state.masterRechName,
        MASTER_NO: this.state.masterRechNo,
        CLAUSE_RECH_NAME: this.state.clauseRechName,
        CLAUSE_GUBUN_NAME: this.state.clauseGubunName,
        QUARTER: this.state.quarterN,
        YEAR: this.state.yyyy,
      }}
      taskSeq={taskSeq}
      viewType={viewType}
      loadingComplete={this.loadingComplete}
      CustomModifyPage={ModalModify}
      CustomInputPage={ModalInput}
      CustomViewPage={OnlyView}
      viewMetaSeq={2621}
      onCloseModalHandler={this.onCancel}
    />
  );

  onShowRevisionTemplate = (viewType, taskSeq) => (
    <>
      <BizBuilderBase
        sagaKey="lawClause_Revision"
        listMetaSeq={2601}
        workSeq={1645}
        taskSeq={-1}
        compProps={{ MASTER_SEQ: this.state.masterSeq, MASTER_RECH_NAME: this.state.masterRechName, MASTER_NO: this.state.masterRechNo }}
        revisionTaskSeq={taskSeq}
        viewType={viewType}
        loadingComplete={this.loadingComplete}
        CustomListPage={RevisionHistory}
        onCloseModalHandler={this.onCancel}
        isOpenModalChange={this.isOpenRevisionDetailModal}
        isOpenAppraiseDetailModal={this.isOpenAppraiseDetailModal}
        taskSeqReal={this.state.taskSeqReal}
      />
      <Modal visible={this.state.isRevisionDetailModal || this.state.isAppraiseDetailModal} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
        {this.state.isRevisionDetailModal && (
          <BizBuilderBase
            sagaKey="lawClause_Revision"
            workSeq={1645}
            taskSeq={this.state.veiwTaskSeq}
            viewType="VIEW"
            loadingComplete={this.loadingComplete}
            CustomViewPage={OnlyView}
            YEAR={this.state.yyyy}
          />
        )}
        {/* <div>{this.state.isRevisionDetailModal && this.onShowViewTemplate('VIEW', this.state.veiwTaskSeq)}</div> */}
        <div>{this.state.isAppraiseDetailModal && this.onShowModalTemplate('VIEW', this.state.veiwTaskSeq)}</div>
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
          sagaKey="lawClauseAppraise"
          workSeq={1645}
          viewType="LIST"
          listMetaSeq={6541}
          loadingComplete={this.loadingComplete}
          CustomListPage={ClauseList}
          isOpenInputModal={this.isOpenInputModal}
          isOpenModalChange={this.isOpenModifyModal}
          isOpenModalPlusChange={this.isOpenPlusModal}
          yearSetFunc={this.yearSetFunc}
          YEAR={this.state.yyyy}
        />
        <Modal
          visible={this.state.isInputModal || this.state.isModifyModal || this.state.isViewModal || this.state.isRevisionModal}
          width="1000px"
          onCancel={this.onCancel}
          destroyOnClose
          footer={[]}
        >
          <div>
            {this.state.isInputModal && this.onShowModalTemplate('INPUT', -1)}
            {this.state.isModifyModal && this.onShowModalTemplate('MODIFY', this.state.modifyTaskSeq)}
            {this.state.isViewModal && (
              <BizBuilderBase
                sagaKey="lawClause_Revision"
                workSeq={1645}
                taskSeq={this.state.veiwTaskSeq}
                viewType="VIEW"
                loadingComplete={this.loadingComplete}
                CustomViewPage={OnlyView}
                YEAR={this.state.yyyy}
              />
            )}

            {/* {this.state.isViewModal && this.onShowViewTemplate('VIEW', this.state.veiwTaskSeq)} */}
            {this.state.isRevisionModal && this.onShowRevisionTemplate('LIST', this.state.veiwTaskSeq)}
          </div>
        </Modal>
      </>
    );
  }
}

lawClause.propTypes = {};

lawClause.defaultProps = {};

export default lawClause;
