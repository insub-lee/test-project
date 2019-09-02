import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Table, Button, Modal } from 'antd';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import SignLine from 'apps/WorkFlow/Admin/SignLine';

import View from './View';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

import Wrapper from './Wrapper';

const AntdTable = StyledAntdTable(Table);

class BuilderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { getView, item } = this.props;
    // const categoryIdx = item && item.data && item.data.categoryIdx ? item.data.categoryIdx : 668;
    const widgetId = item && item.WIDGET_ID ? item.WIDGET_ID : -1;
    const WORK_SEQ = item && item.data ? item.data : -1;
    console.debug('item >>', item);
    console.debug('widgetId >>', widgetId);
    console.debug('WORK_SEQ >> ', WORK_SEQ);
    getView(widgetId, WORK_SEQ);
  }

  // componentDidUpdate(prevProps) {
  //   const {
  //     match: {
  //       params: { ID: prevId },
  //     },
  //   } = prevProps;
  //   const {
  //     match: {
  //       params: { ID: id },
  //     },
  //     getView,
  //   } = this.props;

  //   if (prevId !== id) {
  //     getView(id);
  //   }
  // }

  componentWillUnmount() {
    const { resetData } = this.props;
    resetData();
  }

  getSignLineInfo = info => {
    const { item, updateSignInfo } = this.props;
    const widgetId = item && item.WIDGET_ID ? item.WIDGET_ID : -1;
    updateSignInfo(widgetId, info);
  };

  onSaveTempContents = (detail, fieldNm, type, contSeq) => {
    const { item, saveTempContents } = this.props;
    const widgetId = item && item.WIDGET_ID ? item.WIDGET_ID : -1;
    saveTempContents(widgetId, detail, fieldNm, type, contSeq);
  };

  onDeleteTask = (workSeq, taskSeq) => {
    const { item, deleteTask } = this.props;
    const widgetId = item && item.WIDGET_ID ? item.WIDGET_ID : -1;
    deleteTask(widgetId, workSeq, taskSeq);
  };

  render() {
    const {
      item,
      columns,
      list,
      submitData,
      boxes,
      formStuffs,
      isOpenFormModal,
      isOpenEditModal,
      toggleFormModal,
      getTaskSeq,
      openEditModal,
      closeEditModal,
      resultFormStuffs,
      workSeq,
      taskSeq,
      workFlowConfig: {
        info: { PRC_ID },
      },
      signLineInfo,
      isLoading,
    } = this.props;

    const widgetId = item && item.WIDGET_ID ? item.WIDGET_ID : -1;

    return (
      <Wrapper style={{ height: 'calc(100vh - 42px)' }}>
        <div style={{ textAlign: 'right', marginBottom: '10px' }}>
          <Button
            htmlType="button"
            size="small"
            type="default"
            onClick={() => {
              toggleFormModal(widgetId, true);
              getTaskSeq(widgetId, workSeq);
            }}
          >
            등록
          </Button>
        </div>
        <div>
          <AntdTable
            columns={columns.map(({ headerName, field }) => ({
              title: headerName || field,
              dataIndex: field,
              key: field,
              align: 'center',
            }))}
            dataSource={list}
            onRow={({ WORK_SEQ, TASK_SEQ }) => ({
              onClick: () => openEditModal(widgetId, WORK_SEQ, TASK_SEQ),
            })}
            rowKey="TASK_SEQ"
            loading={isLoading}
          />
        </div>
        <Modal
          title="등록"
          visible={isOpenFormModal}
          footer={null}
          onCancel={() => toggleFormModal(widgetId, false)}
          destroyOnClose
          width="90%"
          maskClosable={false}
        >
          {PRC_ID && (
            <React.Fragment>
              <SignLine prcId={PRC_ID} onChangeCallback={this.getSignLineInfo} />
              <br />
            </React.Fragment>
          )}
          <View
            boxes={boxes} // comp_type = box
            formStuffs={formStuffs} // comp_type = field
            submitData={e => submitData(e, PRC_ID, signLineInfo, widgetId)}
            saveTempContents={this.onSaveTempContents}
            workSeq={workSeq}
            taskSeq={taskSeq}
            viewType="regist"
          />
        </Modal>
        <Modal
          title="조회 및 수정"
          visible={isOpenEditModal}
          footer={null}
          onCancel={() => closeEditModal(widgetId)}
          destroyOnClose
          width="90%"
          maskClosable={false}
        >
          <View
            boxes={boxes}
            formStuffs={resultFormStuffs}
            submitData={e => submitData(e, PRC_ID, signLineInfo, widgetId)}
            saveTempContents={this.onSaveTempContents}
            workSeq={workSeq}
            taskSeq={taskSeq}
            viewType="edit"
            deleteTask={this.onDeleteTask}
          />
        </Modal>
      </Wrapper>
    );
  }
}

BuilderBoard.propTypes = {
  item: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.object),
  list: PropTypes.arrayOf(PropTypes.object),
  boxes: PropTypes.arrayOf(PropTypes.object),
  formStuffs: PropTypes.arrayOf(PropTypes.object),
  resultFormStuffs: PropTypes.arrayOf(PropTypes.object),
  // match: PropTypes.object.isRequired,
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
  isModalLoading: PropTypes.shape({
    create: PropTypes.bool,
    modify: PropTypes.bool,
    read: PropTypes.bool,
  }),
  deleteTask: PropTypes.func,
};

BuilderBoard.defaultProps = {
  // WORK_SEQ: 668, // 668
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
  isModalLoading: {
    create: true,
    modify: true,
    read: true,
  },
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
  isModalLoading: selectors.makeSelectIsModalLoading(),
});

const mapDispatchToProps = dispatch => ({
  getView: (widgetId, id) => dispatch(actions.getView(widgetId, id)),
  resetData: () => dispatch(actions.resetData()),
  submitData: ({ target }, prcId, signLineInfo, widgetId) => {
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
    dispatch(actions.postData(widgetId, payload, prcId, signLineInfo));
  },
  toggleFormModal: (widgetId, value) => dispatch(actions.toggleFormModal(widgetId, value)),
  getTaskSeq: (widgetId, workSeq) => dispatch(actions.getTaskSeq(widgetId, workSeq)),
  openEditModal: (widgetId, workSeq, taskSeq) => dispatch(actions.openEditModal(widgetId, workSeq, taskSeq)),
  closeEditModal: widgetId => dispatch(actions.closeEditModal(widgetId)),
  saveTempContents: (widgetId, detail, fieldNm, type, contSeq) => dispatch(actions.saveTaskContents(widgetId, { detail, fieldNm, type, contSeq })),
  updateSignInfo: (widgetId, info) => dispatch(actions.updateSignInfo(widgetId, info)),
  deleteTask: (widgetId, workSeq, taskSeq) => dispatch(actions.deleteTask(widgetId, workSeq, taskSeq)),
});

const withReducer = injectReducer({ key: 'apps.BuilderWidget.BuilderBoard', reducer });
const withSaga = injectSaga({ key: 'apps.BuilderWidget.BuilderBoard', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(BuilderBoard);
