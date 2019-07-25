import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Button, Modal } from 'antd';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import View from 'components/WorkBuilder/View';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import Wrapper from './Wrapper';

class WorkBuilderViewerPage extends Component {
  componentDidMount() {
    console.debug('Boot......두두두두두두');
    const {
      getView,
      match: { params },
    } = this.props;
    const { ID } = params;
    getView(ID);
  }

  render() {
    const { columns, list, submitData, boxes, formStuffs, isOpenFormModal, isOpenEditModal, toggleFormModal, getTaskSeq, openEditModal, closeEditModal, resultFormStuffs, saveTempContents } = this.props;
    return (
      <Wrapper className="ag-theme-balham" style={{ height: 300, width: '100%' }}>
        <div style={{ textAlign: 'right' }}>
          <Button htmlType="button" size="small" type="default" onClick={() => { toggleFormModal(true); getTaskSeq(); }}>등록</Button>
        </div>
        <AgGridReact columnDefs={columns} rowData={list} onRowClicked={({ data: { WORK_SEQ, TASK_SEQ } }) => openEditModal(WORK_SEQ, TASK_SEQ) } />
        <Modal title="New" visible={isOpenFormModal} footer={null} onCancel={() => toggleFormModal(false)} destroyOnClose>
          <View boxes={boxes} formStuffs={formStuffs} submitData={submitData} saveTempContents={saveTempContents} />
        </Modal>
        <Modal title="Edit" visible={isOpenEditModal} footer={null} onCancel={() => closeEditModal()} destroyOnClose>
          <View boxes={boxes} formStuffs={resultFormStuffs} submitData={submitData} saveTempContents={saveTempContents} />
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
};

WorkBuilderViewerPage.defaultProps = {
  columns: [],
  list: [],
  boxes: [],
  formStuffs: [],
  getView: () => console.debug('no bind events'),
  submitData: () => console.debug('no bind events'),
  isOpenFormModal: false,
  isOpenEditModal: false,
  toggleFormModal: () => console.debug('no bind events'),
  getTaskSeq: () => console.debug('no bind events'),
  openEditModal: () => console.debug('no bind events'),
  closeEditModal: () => console.debug('no bind events'),
  saveTempContents: () => console.debug('no bind events'),
};

const mapStateToProps = createStructuredSelector({
  columns: selectors.makeSelectColumns(),
  list: selectors.makeSelectList(),
  boxes: selectors.makeSelectBoxes(),
  formStuffs: selectors.makeSelectFormStuffs(),
  isOpenFormModal: selectors.makeSelectIsOpenFormModal(),
  isOpenEditModal: selectors.makeSelectIsOpenEditModal(),
  resultFormStuffs: selectors.makeSelectResultFormStuffs(),
});

const mapDispatchToProps = dispatch => ({
  getView: id => dispatch(actions.getView(id)),
  submitData: ({ target }) => {
    const data = new FormData(target);
    const payload = {};
    data.forEach((value, key) => {
      payload[key] = data.getAll(key).join(',');
    });
    console.debug(payload);
    dispatch(actions.postData(payload));
  },
  toggleFormModal: value => dispatch(actions.toggleFormModal(value)),
  getTaskSeq: () => dispatch(actions.getTaskSeq()),
  openEditModal: (workSeq, taskSeq) => dispatch(actions.openEditModal(workSeq, taskSeq)),
  closeEditModal: () => dispatch(actions.closeEditModal()),
  saveTempContents: (detail, fieldNm, type, contSeq) => dispatch(actions.saveTaskContents({ detail, fieldNm, type, contSeq })),
});

const withReducer = injectReducer({ key: 'work-builder-viewer-page', reducer });
const withSaga = injectSaga({ key: 'work-builder-viewer-page', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(WorkBuilderViewerPage);
