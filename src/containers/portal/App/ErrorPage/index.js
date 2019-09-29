import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as commonSelectors from 'containers/portal/App/selectors';
import error404img from 'images/common/apple404page.png';

class ErrorPage extends React.PureComponent {
  render() {
    const { dockAppList } = this.props;
    return (
      <div
        style={{
          height: '100vh',
          width: '100vw',
          display: 'table-cell',
          textAlign: 'center',
          verticalAlign: 'middle',
          background: 'white',
          paddingBottom: '100px',
        }}
      >
        <img src={error404img} alt="404" /> <br />
        <a
          style={{
            width: '10%',
            background: 'white',
            border: '2px solid black',
            fontSize: '12pt',
            display: 'inline-block',
          }}
          href={dockAppList && dockAppList.length > 0 ? `/page/${dockAppList[1].PAGE_ID}` : '/'}
        >
          홈으로 이동
        </a>
      </div>
    );
  }
}

ErrorPage.propType = {
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
