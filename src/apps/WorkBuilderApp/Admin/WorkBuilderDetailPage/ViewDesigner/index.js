import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';

class ViewDesigner extends Component {
  componentDidMount() {
    console.debug('boot.... 두두두두두');
  }

  render() {
    return <div>View Designer</div>;
  }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({});

const withReducer = injectReducer({ key: 'work-builder-detail-view-designer', reducer });
const withSaga = injectSaga({ key: 'work-builder-detail-view-designer', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ViewDesigner);
