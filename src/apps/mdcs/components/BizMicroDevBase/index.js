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
    console.debug('this.props', this.props);
    return (
      <div>
        <Component {...this.props} />
      </div>
    );
  }
}

BizMicroDevBase.propTypes = {
  result: PropTypes.object,
  getCallDataHanlder: PropTypes.func,
  removeReduxState: PropTypes.func,
};

BizMicroDevBase.defaultProps = {
  result: {},
  getCallDataHanlder: () => false,
};

const mapStateToProps = createStructuredSelector({
  result: selectors.makeSelectResponseData(),
});

const mapDispatchToProps = dispatch => ({
  getCallDataHanlder: (id, apiAry, callbackFunc) => dispatch(actions.getCallDataHandler(id, apiAry, callbackFunc)),
  removeReduxState: id => dispatch(actions.removeReduxState(id)),
  removeReduxStateByKey: (id, key) => dispatch(actions.removeReduxStateByKey(id, key)),
});

const withReducer = injectReducer({ key: `apps.mdcs.components.BizMicroDevBase`, reducer });
const withSaga = injectSaga({ key: `apps.mdcs.components.BizMicroDevBase`, saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(BizMicroDevBase);
