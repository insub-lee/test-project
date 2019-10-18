import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

class BizBuilderBase extends React.Component {
  componentDidMount() {
    const { id, workSeq, taskSeq } = this.props; // id: widget_id+@
    if (workSeq !== -1) {
      this.props.getBuilderData(id, workSeq, taskSeq);
    }
    if (taskSeq !== -1) {
      this.props.getDetailData(id, workSeq, taskSeq);
    }
  }

  componentDidUpdate(prevProps) {
    const { id, workSeq, taskSeq } = this.props;
    if (prevProps.id !== this.props.id) {
      this.props.getBuilderData(id, workSeq, taskSeq);
      if (taskSeq !== -1) {
        this.props.getDetailData(id, workSeq, taskSeq);
      }
    }
  }

  render() {
    const { component: Component } = this.props;
    return (
      <div>
        <Component {...this.props} />
      </div>
    );
  }
}

BizBuilderBase.propTypes = {
  id: PropTypes.string,
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
  viewType: 'EDIT', // LIST, VIEW
  metaList: [],
  responseData: {},
  extraApiData: {},
  revisionHistory: [],
};

const mapStateToProps = createStructuredSelector({
  responseData: selectors.makeSelectResponseData(),
  extraApiData: selectors.makeSelectExtraApiData(),
  metaList: selectors.makeSelectMetaList(),
  workFlowConfig: selectors.makeSelectWorkFlowConfig(),
  formData: selectors.makeSelectFormData(),
  revisionHistory: selectors.makeSelectRevisionHistory(),
});

const mapDispatchToProps = dispatch => ({
  getBuilderData: (id, workSeq, taskSeq) => dispatch(actions.getBuilderData(id, workSeq, taskSeq)),
  getExtraApiData: (id, apiArr) => dispatch(actions.getExtraApiData(id, apiArr)),
  getDetailData: (id, workSeq, taskSeq) => dispatch(actions.getDetailData(id, workSeq, taskSeq)),
  getTaskSeq: (id, workSeq) => dispatch(actions.getTaskSeq(id, workSeq)),
  // saveTempContents: (id, detail, fieldName, compType, contSeq) => dispatch(actions.saveTempContents(id, detail, fieldName, compType, contSeq)),
  tempSaveTask: (id, callbackFunc) => dispatch(actions.tempSaveTask(id, callbackFunc)),
  saveTask: (id, reloadId, callbackFunc) => dispatch(actions.saveTask(id, reloadId, callbackFunc)),
  modifyTask: (id, callbackFunc) => dispatch(actions.modifyTask(id, callbackFunc)),
  modifyTaskBySeq: (id, workSeq, taskSeq, callbackFunc) => dispatch(actions.modifyTaskBySeq(id, workSeq, taskSeq, callbackFunc)),
  deleteTask: (id, reloadId, workSeq, taskSeq, callbackFunc) => dispatch(actions.deleteTask(id, reloadId, workSeq, taskSeq, callbackFunc)),
  deleteExtraTask: (id, url, params, apiArr) => dispatch(actions.deleteExtraTask(id, url, params, apiArr)),
  deleteFav: (id, apiArr, callbackFunc) => dispatch(actions.deleteFav(id, apiArr, callbackFunc)),
  changeFormData: (id, key, val) => dispatch(actions.changeFormData(id, key, val)),
  addNotifyBuilder: (id, workSeq, taskSeq, titleKey, contentKey) => dispatch(actions.addNotifyBuilder(id, workSeq, taskSeq, titleKey, contentKey)),
  revisionTask: (id, workSeq, taskSeq, callbackFunc) => dispatch(actions.revisionTask(id, workSeq, taskSeq, callbackFunc)),
  getRevisionHistory: (id, workSeq, taskSeq, callbackFunc) => dispatch(actions.getRevisionHistory(id, workSeq, taskSeq, callbackFunc)),
  removeReduxState: id => dispatch(actions.removeReduxState(id)),
});

const withReducer = injectReducer({ key: `apps.mdcs.components.BizBuilderBase`, reducer });
const withSaga = injectSaga({ key: `apps.mdcs.components.BizBuilderBase`, saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(BizBuilderBase);
