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

class BizMicroDevBase extends React.Component {
  render() {
    const { component: Component } = this.props;
    return (
      <div>
        <Component {...this.props} />
      </div>
    );
  }
}

BizMicroDevBase.propTypes = {
  result: PropTypes.object,
  formData: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  removeReduxState: PropTypes.func,
  changeFormData: PropTypes.func,
  setFormData: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
};

BizMicroDevBase.defaultProps = {
  result: {},
  formData: {},
  getCallDataHandler: () => false,
  changeFormData: () => false,
  setFormData: () => false,
  submitHandlerBySaga: () => false,
};

const mapStateToProps = createStructuredSelector({
  result: selectors.makeSelectResponseData(),
  formData: selectors.makeSelectFormData(),
});

const mapDispatchToProps = dispatch => ({
  getCallDataHandler: (id, apiAry, callbackFunc) => dispatch(actions.getCallDataHandler(id, apiAry, callbackFunc)),
  changeFormData: (id, key, val) => dispatch(actions.changeFormData(id, key, val)),
  setFormData: (id, obj) => dispatch(actions.setFormData(id, obj)),
  submitHandlerBySaga: (id, httpMethod, apiUrl, submitData, callbackFunc) =>
    dispatch(actions.submitHandlerBySaga(id, httpMethod, apiUrl, submitData, callbackFunc)),
  removeReduxState: id => dispatch(actions.removeReduxState(id)),
  removeReduxStateByKey: (id, key) => dispatch(actions.removeReduxStateByKey(id, key)),
  removeStorageReduxState: (id, storage) => dispatch(actions.removeStorageReduxState(id, storage)),
  removeResponseDataReduxStateByKey: (id, key) => dispatch(actions.removeResponseDataReduxStateByKey(id, key)),
  removeFormDataReduxStateByKey: (id, key) => dispatch(actions.removeFormDataReduxStateByKey(id, key)),
});

const withReducer = injectReducer({ key: `apps.mdcs.components.BizMicroDevBase`, reducer });
const withSaga = injectSaga({ key: `apps.mdcs.components.BizMicroDevBase`, saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withSaga, withReducer, withConnect)(BizMicroDevBase);
