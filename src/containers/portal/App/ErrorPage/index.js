import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import * as commonSelectors from 'containers/portal/App/selectors';
import error404img from 'images/common/apple404page.png';

const errorPageStyle = {
  body: {
    height: '100vh',
    width: '100vw',
    display: 'table-cell',
    textAlign: 'center',
    verticalAlign: 'middle',
    background: 'white',
    paddingBottom: '100px',
  },
  link: {
    width: '10%',
    background: 'white',
    border: '2px solid black',
    fontSize: '12pt',
    display: 'inline-block',
  },
};

const ErrorPage = ({ dockAppList }) => (
  <div style={errorPageStyle.body}>
    <img src={error404img} alt="404" /> <br />
    <Link to={dockAppList.length > 0 ? `/page/${dockAppList[1].PAGE_ID}` : '/'} style={errorPageStyle.link}>
      홈으로 이동
    </Link>
  </div>
);

ErrorPage.propTypes = {
  dockAppList: PropTypes.array,
};

ErrorPage.defaultProps = {
  dockAppList: [],
};

const mapStateToProps = createStructuredSelector({
  dockAppList: commonSelectors.makeSelectDockAppList(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(ErrorPage);
