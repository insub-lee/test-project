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
    this.props.getBuilderData(id, workSeq, taskSeq);
    if (taskSeq !== -1) {
      this.props.getDetailData(id, workSeq, taskSeq);
    }
  }

  componentDidUpdate(prevProps) {
    const { id, workSeq, taskSeq } = this.props;
    if (prevProps.id !== this.props.id || prevProps.taskSeq !== this.props.taskSeq) {
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
  getBuilderData: PropTypes.func,
  getExtraApiData: PropTypes.func,
  getDetailData: PropTypes.func,
  getTaskSeq: PropTypes.func,
  // saveTempContents: PropTypes.func,
  tempSaveTask: PropTypes.func,
  saveTask: PropTypes.func,
  deleteTask: PropTypes.func,
  setFormData: PropTypes.func,
  resetReducer: PropTypes.func,
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
  resetReducer: () => {},
};

const mapStateToProps = createStructuredSelector({
  responseData: selectors.makeSelectResponseData(),
  extraApiData: selectors.makeSelectExtraApiData(),
  metaList: selectors.makeSelectMetaList(),
  workFlowConfig: selectors.makeSelectWorkFlowConfig(),
  formData: selectors.makeSelectFormData(),
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
  deleteTask: (id, workSeq, taskSeq) => dispatch(actions.deleteTask(id, workSeq, taskSeq)),
  changeFormData: (id, key, val) => dispatch(actions.changeFormData(id, key, val)),
  resetReducer: () => dispatch(actions.resetReducer()),
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
