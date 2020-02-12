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

import ApproveList from './ApproveList';
import UnApproveList from './UnApproveList';
import DraftList from './DraftList';


class ApproveBase extends Component {
  componentDidMount() {
    const { match, getApproveList } = this.props;
    const category = match.params.CATE;
    getApproveList({ searchType: category });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.CATE !== prevProps.match.params.CATE) {
      const { match, getApproveList } = this.props;
      const category = match.params.CATE;
      getApproveList({ searchType: category });
    }
  }

  render() {
    const category = this.props.match.params.CATE || 'draft';
    return (
      <div style={{ width: '100%', height: '600px', padding: '10px 15px' }}>
        {category === 'draft' ? <DraftList {...this.props} category={category} /> : category === 'approval' ? <ApproveList {...this.props} category={category} /> : <UnApproveList {...this.props} category={category} />}
      </div>
    );
  }
}

ApproveBase.propTypes = {
  match: PropTypes.object,
  approveList: PropTypes.array,
  getApproveList: PropTypes.func,
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
  match: {},
  approveList: [],
  getApproveList: () => {},
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
  selectedRow: selectors.makeSelectSelectedRow(),
  viewVisible: selectors.makeSelectViewVisible(),
  opinionVisible: selectors.makeSelectOpinionVisible(),
  opinion: selectors.makeSelectOpinion(),
  formData: selectors.makeSelectFormData(),
});

const mapDispatchToProps = dispatch => ({
  getApproveList: payload => dispatch(actions.getApproveList(payload)),
  setSelectedRow: row => dispatch(actions.setSelectedRow(row)),
  setViewVisible: visible => dispatch(actions.setViewVisible(visible)),
  setOpinionVisible: visible => dispatch(actions.setOpinionVisible(visible)),
  setOpinion: opinion => dispatch(actions.setOpinion(opinion)),
  setBizFormData: formData => dispatch(actions.setBizFormData(formData)),
  reqApprove: appvStatus => dispatch(actions.reqApprove(appvStatus)),
  getUserInfo: (userInfo, callBack) => dispatch(actions.getUserInfo(userInfo, callBack)),
});

const withReducer = injectReducer({
  key: 'apps.WorkFlow.User.ApproveBase.reducer',
  reducer,
});

const withSaga = injectSaga({
  key: 'apps.WorkFlow.User.ApproveBase.saga',
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
