import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import * as selectors from './selectors';
import reducer from './reducer';
import * as actions from './actions';
import saga from './saga';

class FileManage extends Component {
  constructor(prop) {
    super(prop);
    this.state = {};
  }

  componentDidMount() {
    // this.props.getMenu('STORE');
    this.props.getSiteList();
  }

  render() {
    const { siteList } = this.props;
    return <div>{siteList}</div>;
  }
}

FileManage.propTypes = {
  getSiteList: PropTypes.func.isRequired,
  siteList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = dispatch => ({
  getSiteList: () => dispatch(actions.getSiteList()),
});
const mapStateToProps = createStructuredSelector({
  siteList: selectors.makeSelectSiteList(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'filemanage', reducer });
const withSaga = injectSaga({ key: 'filemanage', saga });

export default compose(withReducer, withSaga, withConnect)(FileManage);
