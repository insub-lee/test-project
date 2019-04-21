import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { Spin } from 'antd';
// import LoadingScreen from 'react-loading-screen';
import reducer from './reducer';
import * as selectors from './selectors';
import saga from './saga';

class Loading extends Component {
  render() {
    const {
      isLoading,
    } = this.props;

    const result = isLoading ? (
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          width: '100px',
          height: '100px',
          margin: '-50px 0 0 -50px',
          zIndex: 10000,
        }}
      >
        <Spin size="large" style={{ margin: 'auto', width: '100%', padding: '20%' }} />
      </div>
    ) : '';

    return result;
  }
}

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectors.makeIsLoading(),
});

const withConnect = connect(mapStateToProps);

const withReducer = injectReducer({ key: 'loading', reducer });
const withSaga = injectSaga({ key: 'loading', saga });

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(Loading);
