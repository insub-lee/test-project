import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import * as authSelectors from 'containers/common/Auth/selectors';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

class ApproveBase extends Component {
  constructor(props) {
    super(props);
  }

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
  getCustomDataBind: PropTypes.func,
  customDataList: PropTypes.array,
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
  customDataList: [],
  getCustomDataBind: () => {},
  selectedRow: {},
  viewVisible: false,
  opinionVisible: false,
  opinion: '',
  setBizFormData: () => {},
  formData: {},
  getUserInfo: () => {},
  getFileDownload: () => false,
  getFileDownloadProgress: () => false,
};

const mapStateToProps = createStructuredSelector({
  approveList: selectors.makeSelectApproveList(),
  unApproveList: selectors.makeSelectUnApproveList(),
  draftList: selectors.makeSelectDraftList(),
  customDataList: selectors.makeSelectCustomDataList(),
  selectedRow: selectors.makeSelectSelectedRow(),
  viewVisible: selectors.makeSelectViewVisible(),
  opinionVisible: selectors.makeSelectOpinionVisible(),
  opinion: selectors.makeSelectOpinion(),
  formData: selectors.makeSelectFormData(),
  unApproveListCnt: selectors.makeSelectUnApproveListCnt(),
  approveListCnt: selectors.makeSelectApproveListCnt(),
  draftListCnt: selectors.makeSelectDraftListCnt(),
  profile: authSelectors.makeSelectProfile(),
});

const mapDispatchToProps = dispatch => ({
  getApproveList: (customUrl, PAGE, PAGE_CNT, relTypes) => dispatch(actions.getApproveList(customUrl, PAGE, PAGE_CNT, relTypes)),
  getUnApproveList: (customUrl, PAGE, PAGE_CNT, relTypes) => dispatch(actions.getUnApproveList(customUrl, PAGE, PAGE_CNT, relTypes)),
  getDraftList: (customUrl, PAGE, PAGE_CNT, relTypes) => dispatch(actions.getDraftList(customUrl, PAGE, PAGE_CNT, relTypes)),
  getCustomDataBind: (httpMethod, rtnUrl, param) => dispatch(actions.getCustomDataBind(httpMethod, rtnUrl, param)),
  submitHandlerBySaga: (id, httpMethod, apiUrl, submitData, callbackFunc) =>
    dispatch(actions.submitHandlerBySaga(id, httpMethod, apiUrl, submitData, callbackFunc)),
  setSelectedRow: row => dispatch(actions.setSelectedRow(row)),
  setViewVisible: visible => dispatch(actions.setViewVisible(visible)),
  setOpinionVisible: visible => dispatch(actions.setOpinionVisible(visible)),
  setOpinion: opinion => dispatch(actions.setOpinion(opinion)),
  setBizFormData: formData => dispatch(actions.setBizFormData(formData)),
  reqApprove: appvStatus => dispatch(actions.reqApprove(appvStatus)),
  getUserInfo: (userInfo, callBack) => dispatch(actions.getUserInfo(userInfo, callBack)),
  getFileDownload: (url, fileName) => dispatch(actions.getFileDownload(url, fileName)),
  getFileDownloadProgress: (url, fileName, onProgress, callback) => dispatch(actions.getFileDownloadProgress(url, fileName, onProgress, callback)),
  setRelTypes: relTypes => dispatch(actions.setRelTypesByReducer(relTypes)),
});

const withReducer = injectReducer({
  key: 'apps.WorkFlow.components.ApproveBase.reducer',
  reducer,
});

const withSaga = injectSaga({
  key: 'apps.WorkFlow.components.ApproveBase.saga',
  saga,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withSaga, withReducer, withConnect)(ApproveBase);
