import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Button, Modal, Table } from 'antd';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import View from 'components/WorkBuilder/View';
import SignLine from 'apps/WorkFlow/Admin/SignLine';

import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import Wrapper from './Wrapper';

const AntdTable = StyledAntdTable(Table);

class WorkBuilderViewerPage extends Component {
  componentDidMount() {
    const {
      getView,
      match: { params },
    } = this.props;
    const { ID } = params;
    getView(ID);
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { ID: prevId } } } = prevProps;
    const { match: { params: { ID: id } }, getView } = this.props;

    if (prevId !== id) {
      getView(id);
    }
  }

  componentWillUnmount() {
    const { resetData } = this.props;
    resetData();
  }

  getSignLineInfo = (info) => {
    const { updateSignInfo } = this.props;
    updateSignInfo(info);
  };

  render() {
    const {
      columns, list, submitData, boxes, formStuffs, isOpenFormModal, isOpenEditModal, toggleFormModal, getTaskSeq, openEditModal, closeEditModal, resultFormStuffs, saveTempContents, workSeq, taskSeq, workFlowConfig: { info: { PRC_ID } }, signLineInfo, isLoading,
    } = this.props;
    return (
      <Wrapper style={{ width: '100%', height: 'calc(100vh - 42px)' }}>
        <div style={{ textAlign: 'right' }}>
          <Button htmlType="button" size="small" type="default" onClick={() => { toggleFormModal(true); getTaskSeq(); }}>등록</Button>
        </div>
        {/*
        <div className="ag-theme-balham">
          <AgGridReact columnDefs={columns} rowData={list} onRowClicked={({ data: { WORK_SEQ, TASK_SEQ } }) => openEditModal(WORK_SEQ, TASK_SEQ)} />
        </div>
        */}
        <AntdTable
          columns={columns.map(({ headerName, field }) => ({
            title: headerName || field,
            dataIndex: field,
            key: field,
            align: 'center',
          }))}
          dataSource={list}
          onRow={({ WORK_SEQ, TASK_SEQ }) => ({
            onClick: () => openEditModal(WORK_SEQ, TASK_SEQ),
          })}
          rowKey="TASK_SEQ"
          loading={isLoading}
        />
        <Modal title="등록" visible={isOpenFormModal} footer={null} onCancel={() => toggleFormModal(false)} destroyOnClose width={848} maskClosable={false}>
          {PRC_ID && (
            <React.Fragment>
              <SignLine prcId={PRC_ID} onChangeCallback={this.getSignLineInfo} />
              <br />
            </React.Fragment>
          )}
          <View boxes={boxes} formStuffs={formStuffs} submitData={e => submitData(e, PRC_ID, signLineInfo)} saveTempContents={saveTempContents} workSeq={workSeq} taskSeq={taskSeq} />
        </Modal>
        <Modal title="조회 및 수정" visible={isOpenEditModal} footer={null} onCancel={() => closeEditModal()} destroyOnClose width={848} maskClosable={false}>
          <View boxes={boxes} formStuffs={resultFormStuffs} submitData={submitData} saveTempContents={saveTempContents} workSeq={workSeq} taskSeq={taskSeq} />
        </Modal>
      </Wrapper>
    );
  }
}

WorkBuilderViewerPage.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  list: PropTypes.arrayOf(PropTypes.object),
  boxes: PropTypes.arrayOf(PropTypes.object),
  formStuffs: PropTypes.arrayOf(PropTypes.object),
  resultFormStuffs: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.object.isRequired,
  getView: PropTypes.func,
  submitData: PropTypes.func,
  isOpenFormModal: PropTypes.bool,
  isOpenEditModal: PropTypes.bool,
  toggleFormModal: PropTypes.func,
  getTaskSeq: PropTypes.func,
  openEditModal: PropTypes.func,
  closeEditModal: PropTypes.func,
  saveTempContents: PropTypes.func,
  workFlowConfig: PropTypes.object,
  updateSignInfo: PropTypes.func,
  signLineInfo: PropTypes.arrayOf(PropTypes.object),
  resetData: PropTypes.func,
  workSeq: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  taskSeq: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isLoading: PropTypes.bool,
};

WorkBuilderViewerPage.defaultProps = {
  columns: [],
  list: [],
  boxes: [],
  formStuffs: [],
  resultFormStuffs: [],
  getView: () => console.debug('no bind events'),
  submitData: () => console.debug('no bind events'),
  isOpenFormModal: false,
  isOpenEditModal: false,
  toggleFormModal: () => console.debug('no bind events'),
  getTaskSeq: () => console.debug('no bind events'),
  openEditModal: () => console.debug('no bind events'),
  closeEditModal: () => console.debug('no bind events'),
  saveTempContents: () => console.debug('no bind events'),
  workFlowConfig: { info: {} },
  updateSignInfo: () => console.debug('no bind events'),
  signLineInfo: [],
  resetData: () => console.debug('no bind events'),
  workSeq: -1,
  taskSeq: -1,
  isLoading: true,
};

const mapStateToProps = createStructuredSelector({
  columns: selectors.makeSelectColumns(),
  list: selectors.makeSelectList(),
  boxes: selectors.makeSelectBoxes(),
  formStuffs: selectors.makeSelectFormStuffs(),
  isOpenFormModal: selectors.makeSelectIsOpenFormModal(),
  isOpenEditModal: selectors.makeSelectIsOpenEditModal(),
  resultFormStuffs: selectors.makeSelectResultFormStuffs(),
  workSeq: selectors.makeSelectWorkSeq(),
  taskSeq: selectors.makeSelectTaskSeq(),
  workFLow: selectors.makeSelectWorkFlow(),
  workFlowConfig: selectors.makeSelectWorkFlowConfig(),
  signLineInfo: selectors.makeSelectSignLineInfo(),
  isLoading: selectors.makeSelectIsLoading(),
});

const mapDispatchToProps = dispatch => ({
  getView: id => dispatch(actions.getView(id)),
  resetData: () => dispatch(actions.resetData()),
  submitData: ({ target }, prcId, signLineInfo) => {
    const data = new FormData(target);
    const payload = {};
    data.forEach((value, key) => {
      const node = document.querySelector(`[name="${key}"]`);
      const dataType = node.getAttribute('data-type') || 'string';
      switch (dataType) {
        case 'json':
          payload[key] = JSON.parse(value);
          break;
        default:
          payload[key] = value;
          break;
      }
    });
    dispatch(actions.postData(payload, prcId, signLineInfo));
  },
  toggleFormModal: value => dispatch(actions.toggleFormModal(value)),
  getTaskSeq: () => dispatch(actions.getTaskSeq()),
  openEditModal: (workSeq, taskSeq) => dispatch(actions.openEditModal(workSeq, taskSeq)),
  closeEditModal: () => dispatch(actions.closeEditModal()),
  saveTempContents: (detail, fieldNm, type, contSeq) => dispatch(actions.saveTaskContents({
    detail, fieldNm, type, contSeq,
  })),
  updateSignInfo: info => dispatch(actions.updateSignInfo(info)),
});

const withReducer = injectReducer({ key: 'work-builder-viewer', reducer });
const withSaga = injectSaga({ key: 'work-builder-viewer', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(WorkBuilderViewerPage);
