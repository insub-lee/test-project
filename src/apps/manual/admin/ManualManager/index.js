import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import PropTypes from 'prop-types';
import reducer from './reducer';
import selectors from './selectors';

import ManualMaster from './ManualMaster';
import ManualList from './ManualList';

const ManualManager = ({ pageType, listCategoryIdx, viewCategoryIdx, manualIdx }) =>
  pageType === 'view' ? (
    <ManualMaster categoryIndex={viewCategoryIdx} manualIndex={manualIdx} />
  ) : (
    pageType === 'list' && <ManualList categoryIndex={listCategoryIdx} />
  );

ManualManager.propTypes = {
  pageType: PropTypes.string,
  listCategoryIdx: PropTypes.number,
  viewCategoryIdx: PropTypes.number,
  manualIdx: PropTypes.number,
};

ManualManager.defaultProps = {
  pageType: '',
  listCategoryIdx: 0,
  viewCategoryIdx: 0,
  manualIdx: 0,
};

const mapStateToProps = createStructuredSelector({
  pageType: selectors.makeSelectPageType(),
  listCategoryIdx: selectors.makeSelectListCategoryIdx(),
  viewCategoryIdx: selectors.makeSelectViewCategoryIdx(),
  manualIdx: selectors.makeSelectManualIdx(),
});

const withReducer = injectReducer({ key: 'apps-ManualManager-reducer', reducer });
const withConnect = connect(mapStateToProps);

export default compose(
  withReducer,
  withConnect,
)(ManualManager);
