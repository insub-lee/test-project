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
  getCallDataHanlder: PropTypes.func,
  removeReduxState: PropTypes.func,
  changeFormData: PropTypes.func,
  setFormData: PropTypes.func,
  submitHadnlerBySaga: PropTypes.func,
};

BizMicroDevBase.defaultProps = {
  result: {},
  formData: {},
  getCallDataHanlder: () => false,
  changeFormData: () => false,
  setFormData: () => false,
  submitHadnlerBySaga: () => false,
};

const mapStateToProps = createStructuredSelector({
  result: selectors.makeSelectResponseData(),
  formData: selectors.makeSelectFormData(),
});

const mapDispatchToProps = dispatch => ({
  getCallDataHanlder: (id, apiAry, callbackFunc) => dispatch(actions.getCallDataHandler(id, apiAry, callbackFunc)),
  changeFormData: (id, key, val) => dispatch(actions.changeFormData(id, key, val)),
  setFormData: (id, obj) => dispatch(actions.setFormData(id, obj)),
  submitHadnlerBySaga: (id, httpMethod, apiUrl, submitData, callbackFunc) =>
    dispatch(actions.submitHadnlerBySaga(id, httpMethod, apiUrl, submitData, callbackFunc)),
  removeReduxState: id => dispatch(actions.removeReduxState(id)),
  removeStorageReduxState: (id, storage) => dispatch(actions.removeStorageReduxState(id, storage)),
  removeResponseDataReduxStateByKey: (id, key) => dispatch(actions.removeResponseDataReduxStateByKey(id, key)),
  removeFormDataReduxStateByKey: (id, key) => dispatch(actions.removeFormDataReduxStateByKey(id, key)),
});

const withReducer = injectReducer({ key: `apps.mdcs.components.BizMicroDevBase`, reducer });
const withSaga = injectSaga({ key: `apps.mdcs.components.BizMicroDevBase`, saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withSaga, withReducer, withConnect)(BizMicroDevBase);
