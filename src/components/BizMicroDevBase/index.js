import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Spin } from 'antd';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import * as authSelectors from 'containers/common/Auth/selectors';

class BizMicroDevBase extends React.Component {
  state = {
    spinning: false,
  }

  spinningOn = () => {
    this.setState({ spinning: true });
  };

  spinningOff = () => {
    this.setState({ spinning: false });
  };

  render() {
    const { component: Component } = this.props;
    return (
      <div style={{ height: '100%' }}>
        <Spin spinning={this.state.spinning}>
          <Component {...this.props} spinningOn={this.spinningOn} spinningOff={this.spinningOff} />
        </Spin>
      </div>
    );
  }
}

BizMicroDevBase.propTypes = {
  // sagaKey: PropTypes.string.isRequired,
  result: PropTypes.object,
  formData: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  getCallDataHandlerReturnRes: PropTypes.func,
  removeReduxState: PropTypes.func,
  changeFormData: PropTypes.func,
  setFormData: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
  getFileDownload: PropTypes.func,
};

BizMicroDevBase.defaultProps = {
  result: {},
  formData: {},
  getCallDataHandler: () => false,
  getCallDataHandlerReturnRes: () => false,
  changeFormData: () => false,
  setFormData: () => false,
  submitHandlerBySaga: () => false,
  getFileDownload: () => false,
};

const mapStateToProps = createStructuredSelector({
  result: selectors.makeSelectResponseData(),
  formData: selectors.makeSelectFormData(),
  profile: authSelectors.makeSelectProfile(),
});

const mapDispatchToProps = dispatch => ({
  getCallDataHandler: (id, apiAry, callbackFunc) => dispatch(actions.getCallDataHandler(id, apiAry, callbackFunc)),
  getCallDataHandlerReturnRes: (id, apiInfo, callbackFunc) => dispatch(actions.getCallDataHandlerReturnRes(id, apiInfo, callbackFunc)),
  changeFormData: (id, key, val) => dispatch(actions.changeFormData(id, key, val)),
  setFormData: (id, obj) => dispatch(actions.setFormData(id, obj)),
  submitHandlerBySaga: (id, httpMethod, apiUrl, submitData, callbackFunc) =>
    dispatch(actions.submitHandlerBySaga(id, httpMethod, apiUrl, submitData, callbackFunc)),
  removeReduxState: id => dispatch(actions.removeReduxState(id)),
  removeStorageReduxState: (id, storage) => dispatch(actions.removeStorageReduxState(id, storage)),
  removeResponseDataReduxStateByKey: (id, key) => dispatch(actions.removeResponseDataReduxStateByKey(id, key)),
  removeFormDataReduxStateByKey: (id, key) => dispatch(actions.removeFormDataReduxStateByKey(id, key)),
  resetCalledData: id => dispatch(actions.resetCalledData(id)),
  getFileDownload: (id, url, fileName, callbackFunc) => dispatch(actions.getFileDownload(id, url, fileName, callbackFunc)),
});

const withReducer = injectReducer({ key: `apps.mdcs.components.BizMicroDevBase`, reducer });
const withSaga = injectSaga({ key: `apps.mdcs.components.BizMicroDevBase`, saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withSaga, withReducer, withConnect)(BizMicroDevBase);
