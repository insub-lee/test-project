import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Spin, Modal } from 'antd';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import InputPage from './viewComponent/InputPage';
import ModifyPage from './viewComponent/ModifyPage';
import ViewPage from './viewComponent/ViewPage';
import ListPage from './viewComponent/ListPage';
import SearchComp from './viewComponent/SearchComp';
import ModalPopup from './viewComponent/ModalPopup';

class BizBuilderBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isShowBuilderModal: false, builderModalViewType: 'INPUT', builderModalWorkSeq: -1, builderModalTaskSeq: -1 };
  }

  componentDidMount() {
    const {
      getBuilderData,
      getDetailData,
      sagaKey: id,
      workSeq,
      taskSeq,
      viewType,
      setViewPageData,
      revisionTask,
      revisionType,
      changeWorkflowFormData,
      conditional,
    } = this.props; // id: widget_id+@
    const retViewType = viewType === 'REVISION' ? 'INPUT' : viewType;
    if (viewType) setViewPageData(id, workSeq, taskSeq, retViewType);
    if (taskSeq !== -1 && viewType === 'REVISION') {
      revisionTask(id, workSeq, taskSeq, retViewType, revisionType);
    } else if (taskSeq !== -1) {
      getDetailData(id, workSeq, taskSeq, retViewType, changeWorkflowFormData);
    } else if (workSeq !== -1) {
      getBuilderData(id, workSeq, taskSeq, retViewType, conditional || '', changeWorkflowFormData);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      getBuilderData,
      getDetailData,
      sagaKey: id,
      workSeq,
      taskSeq,
      viewType,
      setViewPageData,
      revisionTask,
      revisionType,
      changeWorkflowFormData,
      conditional,
    } = this.props;
    const retViewType = viewType === 'REVISION' ? 'INPUT' : viewType;
    if (prevProps.sagaKey !== this.props.sagaKey || (prevProps.viewType && prevProps.viewType !== viewType)) {
      if (viewType !== prevProps.viewType) setViewPageData(id, workSeq, taskSeq, retViewType); // setViewType(id, viewType);
      if (taskSeq !== -1 && viewType === 'REVISION') {
        revisionTask(id, workSeq, taskSeq, retViewType, revisionType);
      } else if (taskSeq !== -1) {
        getDetailData(id, workSeq, taskSeq, retViewType, changeWorkflowFormData);
      } else if (workSeq !== -1) {
        getBuilderData(id, workSeq, taskSeq, retViewType, conditional || '', changeWorkflowFormData);
      }
    } else if (conditional !== prevProps.conditional && retViewType === 'LIST' && workSeq !== -1) {
      getBuilderData(id, workSeq, taskSeq, retViewType, conditional || '', changeWorkflowFormData);
    }
  }

  componentWillUnmount = () => {
    const { destroyReducer, sagaKey } = this.props;
    destroyReducer(sagaKey);
  };

  changeViewPage = (id, workSeq, taskSeq, viewType, revisionType) => {
    const { getBuilderData, getDetailData, setViewPageData, revisionTask, conditional } = this.props; // id: widget_id+@
    const retViewType = viewType === 'REVISION' ? 'INPUT' : viewType;
    if (viewType) setViewPageData(id, workSeq, taskSeq, retViewType);
    if (taskSeq !== -1 && viewType === 'REVISION') {
      revisionTask(id, workSeq, taskSeq, retViewType, revisionType);
    } else if (taskSeq !== -1) {
      getDetailData(id, workSeq, taskSeq, retViewType);
    } else if (workSeq !== -1) {
      getBuilderData(id, workSeq, taskSeq, retViewType, conditional || '');
    }
  };

  changeFormData = (id, key, val) => {
    const { formData, changeFormData, changeWorkflowFormData } = this.props;
    changeFormData(id, key, val);
    if (typeof changeWorkflowFormData === 'function') changeWorkflowFormData({ ...formData, [key]: val });
  };

  changeBuilderModalState = (isShowBuilderModal, builderModalViewType, builderModalWorkSeq, builderModalTaskSeq) =>
    this.setState({ isShowBuilderModal, builderModalViewType, builderModalWorkSeq, builderModalTaskSeq });

  searchCompRenderer = props => <SearchComp {...props} />;

  componentRenderer = () => {
    const {
      CustomInputPage,
      CustomModifyPage,
      CustomViewPage,
      CustomListPage,
      CustomPage,
      CustomWorkProcess,
      viewPageData,
      metaList,
      sagaKey: id,
      workInfo,
      listData,
      inputMetaSeq,
      modifyMetaSeq,
      viewMetaSeq,
      listMetaSeq,
    } = this.props;
    let component = <div style={{ minHeight: 300 }} />;
    if (viewPageData && viewPageData.viewType && metaList && workInfo) {
      let viewSeq = -1;
      if (viewPageData.viewType.toUpperCase() === 'INPUT' && inputMetaSeq > -1) {
        viewSeq = inputMetaSeq;
      } else if (viewPageData.viewType.toUpperCase() === 'MODIFY' && modifyMetaSeq > -1) {
        viewSeq = modifyMetaSeq;
      } else if (viewPageData.viewType.toUpperCase() === 'VIEW' && viewMetaSeq > -1) {
        viewSeq = viewMetaSeq;
      } else if (viewPageData.viewType.toUpperCase() === 'LIST' && listMetaSeq > -1) {
        viewSeq = listMetaSeq;
      } else {
        viewSeq = workInfo[`VW_${viewPageData.viewType}`];
      }
      const viewLayer = metaList.filter(fNode => fNode.COMP_TYPE === 'VIEW' && fNode.COMP_TAG === viewPageData.viewType && fNode.META_SEQ === viewSeq);
      const nextProps = {
        ...this.props,
        key: `${id}_${viewPageData.viewType}_${viewSeq}`,
        viewLayer,
        changeViewPage: this.changeViewPage,
        changeFormData: this.changeFormData,
        changeBuilderModalState: this.changeBuilderModalState,
      };
      switch (viewPageData.viewType.toUpperCase()) {
        case 'INPUT':
          if (typeof CustomInputPage === 'function' && metaList && metaList.length > 0 && viewLayer.length > 0) {
            component = <CustomInputPage {...nextProps} />;
          } else if (metaList && metaList.length > 0 && viewLayer.length > 0) {
            component = <InputPage {...nextProps} />;
          }
          break;
        case 'MODIFY':
          if (typeof CustomModifyPage === 'function' && metaList && metaList.length > 0 && viewLayer.length > 0) {
            component = <CustomModifyPage {...nextProps} />;
          } else if (metaList && metaList.length > 0 && viewLayer.length > 0) {
            component = <ModifyPage {...nextProps} />;
          }
          break;
        case 'VIEW':
          if (typeof CustomViewPage === 'function' && metaList && metaList.length > 0 && viewLayer.length > 0) {
            component = <CustomViewPage {...nextProps} />;
          } else if (metaList && metaList.length > 0 && viewLayer.length > 0) {
            component = <ViewPage {...nextProps} />;
          }
          break;
        case 'LIST':
          if (typeof CustomListPage === 'function' && metaList && metaList.length > 0 && viewLayer.length > 0) {
            component = <CustomListPage {...nextProps} listData={listData} searchCompRenderer={this.searchCompRenderer} />;
          } else if (metaList && metaList.length > 0 && viewLayer.length > 0) {
            component = <ListPage {...nextProps} listData={listData} searchCompRenderer={this.searchCompRenderer} />;
          }
          break;
        case 'CUSTOM':
        default:
          if (typeof CustomPage === 'function' && metaList && metaList.length > 0 && viewLayer.length > 0) {
            component = (
              <div>
                <CustomPage {...nextProps} />
              </div>
            );
          }
          break;
      }
    }
    return component;
  };

  render() {
    const { sagaKey, dataLoading, isBuilderModal, builderModalSetting } = this.props;
    const { isShowBuilderModal, builderModalViewType, builderModalWorkSeq, builderModalTaskSeq } = this.state;
    return (
      <div>
        <Spin spinning={dataLoading}>{this.componentRenderer()}</Spin>
        <Modal
          centered
          destroyOnClose
          footer={null}
          maskClosable={false}
          visible={isShowBuilderModal}
          {...builderModalSetting}
          onCancel={() => this.changeBuilderModalState(false, 'INPUT', -1, -1)}
        >
          <ModalPopup sagaKey={sagaKey} viewType={builderModalViewType} workSeq={builderModalWorkSeq} taskSeq={builderModalTaskSeq} />
        </Modal>
      </div>
    );
  }
}

BizBuilderBase.propTypes = {
  sagaKey: PropTypes.string.isRequired,
  component: PropTypes.func,
  viewType: PropTypes.string,
  workSeq: PropTypes.number,
  taskSeq: PropTypes.number,
  apiArr: PropTypes.array,
  responseData: PropTypes.object,
  extraApiData: PropTypes.object,
  metaList: PropTypes.arrayOf(PropTypes.object),
  formData: PropTypes.object,
  revisionHistory: PropTypes.array,
  viewID: PropTypes.string,
  workFlowConfig: PropTypes.object,
  processRule: PropTypes.object,
  getBuilderData: PropTypes.func,
  getExtraApiData: PropTypes.func,
  getDetailData: PropTypes.func,
  getTaskSeq: PropTypes.func,
  // saveTempContents: PropTypes.func,
  tempSaveTask: PropTypes.func,
  saveTask: PropTypes.func,
  deleteTask: PropTypes.func,
  deleteExtraTask: PropTypes.func,
  deleteFav: PropTypes.func,
  setFormData: PropTypes.func,
  addNotifyBuilder: PropTypes.func,
  revisionTask: PropTypes.func,
  getRevisionHistory: PropTypes.func,
  removeReduxState: PropTypes.func,
  changeValidationData: PropTypes.func.isRequired,
  getProcessRule: PropTypes.func,
  setProcessStep: PropTypes.func,
  isLoading: PropTypes.bool,
  draftId: PropTypes.number,
  draftProcess: PropTypes.array,
  setProcessRule: PropTypes.func,
  getDraftProcess: PropTypes.func,
  dataLoading: PropTypes.bool,
  changeWorkflowFormData: PropTypes.func,
  CustomWorkProcess: PropTypes.func,
  inputMetaSeq: PropTypes.number,
  modifyMetaSeq: PropTypes.number,
  viewMetaSeq: PropTypes.number,
  listMetaSeq: PropTypes.number,
};

BizBuilderBase.defaultProps = {
  workSeq: -1,
  taskSeq: -1,
  apiArr: [
    {
      key: '',
      url: '',
      type: '',
      params: {},
    },
  ],
  viewType: 'LIST', // LIST, VIEW
  metaList: [],
  responseData: {},
  extraApiData: {},
  revisionHistory: [],
  viewID: 'BizBuilderBase',
  isCustom: false,
  draftId: -1,
  metaSeq: -1,
  viewPageData: { viewType: 'LIST' },
  dataLoading: false,
  changeWorkflowFormData: null,
  CustomWorkProcess: undefined,
  inputMetaSeq: -1,
  modifyMetaSeq: -1,
  viewMetaSeq: -1,
  listMetaSeq: -1,
};

const mapStateToProps = createStructuredSelector({
  responseData: selectors.makeSelectResponseData(),
  extraApiData: selectors.makeSelectExtraApiData(),
  metaList: selectors.makeSelectMetaList(),
  workFlowConfig: selectors.makeSelectWorkFlowConfig(),
  formData: selectors.makeSelectFormData(),
  revisionHistory: selectors.makeSelectRevisionHistory(),
  processRule: selectors.makeSelectProcessRule(),
  isLoading: selectors.makeSelectLoading(),
  draftProcess: selectors.makeSelectDraftProcess(),
  listData: selectors.makeSelectList(),
  viewPageData: selectors.makeSelectViewPageData(),
  workInfo: selectors.makeSelectWorkInfo(),
  dataLoading: selectors.makeSelectDataLoading(),
  listSelectRowKeys: selectors.makeSelectListSelectRowKeys(),
  isBuilderModal: selectors.makeSelectIsBuilderModal(),
  builderModalSetting: selectors.makeSelectBuilderModalSetting(),
});

const mapDispatchToProps = dispatch => ({
  getBuilderData: (id, workSeq, taskSeq, viewType, conditional, changeWorkflowFormData) =>
    dispatch(actions.getBuilderData(id, workSeq, taskSeq, viewType, conditional, changeWorkflowFormData)),
  getExtraApiData: (id, apiArr, callback) => dispatch(actions.getExtraApiData(id, apiArr, callback)),
  submitExtraHandler: (id, httpMethod, apiUrl, submitData, callbackFunc, etcData) =>
    dispatch(actions.submitExtraHandler(id, httpMethod, apiUrl, submitData, callbackFunc, etcData)),
  getDetailData: (id, workSeq, taskSeq, viewType, changeWorkflowFormData) =>
    dispatch(actions.getDetailData(id, workSeq, taskSeq, viewType, changeWorkflowFormData)),
  getTaskSeq: (id, workSeq) => dispatch(actions.getTaskSeq(id, workSeq)),
  // saveTempContents: (id, detail, fieldName, compType, contSeq) => dispatch(actions.saveTempContents(id, detail, fieldName, compType, contSeq)),
  tempSaveTask: (id, callbackFunc) => dispatch(actions.tempSaveTask(id, callbackFunc)),
  saveTask: (id, reloadId, callbackFunc) => dispatch(actions.saveTask(id, reloadId, callbackFunc)),
  modifyTask: (id, callbackFunc) => dispatch(actions.modifyTask(id, callbackFunc)),
  modifyTaskBySeq: (id, workSeq, taskSeq, callbackFunc) => dispatch(actions.modifyTaskBySeq(id, workSeq, taskSeq, callbackFunc)),
  deleteTask: (id, reloadId, workSeq, taskSeq, changeViewPage, callbackFunc) =>
    dispatch(actions.deleteTask(id, reloadId, workSeq, taskSeq, changeViewPage, callbackFunc)),
  deleteExtraTask: (id, url, params, apiArr) => dispatch(actions.deleteExtraTask(id, url, params, apiArr)),
  deleteFav: (id, apiArr, callbackFunc) => dispatch(actions.deleteFav(id, apiArr, callbackFunc)),
  changeFormData: (id, key, val) => dispatch(actions.changeFormData(id, key, val)),
  addNotifyBuilder: (id, workSeq, taskSeq, titleKey, contentKey) => dispatch(actions.addNotifyBuilder(id, workSeq, taskSeq, titleKey, contentKey)),
  revisionTask: (id, workSeq, taskSeq, viewType, revisionType, callbackFunc) =>
    dispatch(actions.revisionTask(id, workSeq, taskSeq, viewType, revisionType, callbackFunc)),
  getRevisionHistory: (id, workSeq, taskSeq, callbackFunc) => dispatch(actions.getRevisionHistory(id, workSeq, taskSeq, callbackFunc)),
  removeReduxState: id => dispatch(actions.removeReduxState(id)),
  changeValidationData: (id, key, flag, msg) => dispatch(actions.changeValidationDataByReducr(id, key, flag, msg)),
  getProcessRule: (id, payload) => dispatch(actions.getProcessRule(id, payload)),
  setProcessRule: (id, processRule) => dispatch(actions.setProcessRule(id, processRule)),
  setProcessStep: (id, processStep) => dispatch(actions.setProcessStep(id, processStep)),
  getDraftProcess: (id, draftId) => dispatch(actions.getDraftProcess(id, draftId)),
  setViewPageData: (id, workSeq, taskSeq, viewType) => dispatch(actions.setViewPageDataByReducer(id, workSeq, taskSeq, viewType)),
  setViewType: (id, viewType) => dispatch(actions.setViewTypeByReducer(id, viewType)),
  changeSearchData: (id, key, val) => dispatch(actions.changeSearchDataByReducer(id, key, val)),
  getListData: (id, workSeq) => dispatch(actions.getListDataBySaga(id, workSeq)),
  redirectUrl: (id, url) => dispatch(actions.redirectUrl(id, url)),
  destroyReducer: id => dispatch(actions.destroyReducerByReducer(id)),
  setListSelectRowKeys: (id, list) => dispatch(actions.setListSelectRowKeysByReducer(id, list)),
  removeMultiTask: (id, reloadId, callbackFunc) => dispatch(actions.removeMultiTaskBySaga(id, reloadId, callbackFunc)),
});

const withReducer = injectReducer({ key: `apps.mdcs.components.BizBuilderBase`, reducer });
const withSaga = injectSaga({ key: `apps.mdcs.components.BizBuilderBase`, saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReducer, withSaga, withConnect)(BizBuilderBase);
