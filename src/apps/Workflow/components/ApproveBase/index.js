import React, { Component } from 'react';
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

class ApproveBase extends Component {
  componentDidMount() {}

  render() {
    const { component: Component } = this.props;
    return <Component {...this.props} />;
  }
}

ApproveBase.propTypes = {
  approveList: PropTypes.array,
  getApproveList: PropTypes.func,
  unApproveList: PropTypes.array,
  getUnApproveList: PropTypes.func,
  draftList: PropTypes.array,
  getDraftList: PropTypes.func,



  selectedRow: PropTypes.object,
  setSelectedRow: PropTypes.func,
  viewVisible: PropTypes.bool,
  setViewVisible: PropTypes.func,
  opinionVisible: PropTypes.bool,
  setOpinionVisible: PropTypes.func,
  opinion: PropTypes.string,
  setOpinion: PropTypes.func,
  reqApprove: PropTypes.func,
  setBizFormData: PropTypes.func,
  formData: PropTypes.object,
  getUserInfo: PropTypes.func,
};

ApproveBase.defaultProps = {
  approveList: [],
  getApproveList: () => {},
  unApproveList: [],
  getUnApproveList: () => {},
  draftList: [],
  getDraftList: () => {},



  selectedRow: {},
  viewVisible: false,
  opinionVisible: false,
  opinion: '',
  setBizFormData: () => {},
  formData: {},
  getUserInfo: () => {},
};

const mapStateToProps = createStructuredSelector({
  approveList: selectors.makeSelectApproveList(),
  unApproveList: selectors.makeSelectUnApproveList(),
  draftList: selectors.makeSelectDraftList(),
  

  
  selectedRow: selectors.makeSelectSelectedRow(),
  viewVisible: selectors.makeSelectViewVisible(),
  opinionVisible: selectors.makeSelectOpinionVisible(),
  opinion: selectors.makeSelectOpinion(),
  formData: selectors.makeSelectFormData(),
});

const mapDispatchToProps = dispatch => ({
  getApproveList: () => dispatch(actions.getApproveList()),
  getUnApproveList: () => dispatch(actions.getUnApproveList()),
  getDraftList: () => dispatch(actions.getDraftList()),

  
  
  
  setSelectedRow: row => dispatch(actions.setSelectedRow(row)),
  setViewVisible: visible => dispatch(actions.setViewVisible(visible)),
  setOpinionVisible: visible => dispatch(actions.setOpinionVisible(visible)),
  setOpinion: opinion => dispatch(actions.setOpinion(opinion)),
  setBizFormData: formData => dispatch(actions.setBizFormData(formData)),
  reqApprove: appvStatus => dispatch(actions.reqApprove(appvStatus)),
  getUserInfo: (userInfo, callBack) => dispatch(actions.getUserInfo(userInfo, callBack)),
});

const withReducer = injectReducer({
  key: 'apps.WorkFlow.components.ApproveBase.reducer',
  reducer,
});

const withSaga = injectSaga({
  key: 'apps.WorkFlow.components.ApproveBase.saga',
  saga,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(ApproveBase);
