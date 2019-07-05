import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import { Tabs, Tab } from 'react-bootstrap-tabs';
import { Route } from 'react-router-dom';
import ErrorBoundary from 'containers/common/ErrorBoundary';
import * as commonjs from 'containers/common/functions/common';
// import Button from 'components/Button';
// import { ModalRoute } from 'react-router-modal';
// import Modal from 'react-modal';
import AppModal from './AppModal';
import BizModal from './BizModal';

class AppBizModal extends PureComponent {
  render() {
    const {
      // history,
      match,
    } = this.props;
    // console.log(history);

    const preUrl = commonjs.getPreUrl(match.path, '/modal');

    return (
      <div>
        <ErrorBoundary>
          <Route path={`${preUrl}/biz`} component={BizModal} />
          <Route path={`${preUrl}/app`} component={AppModal} />
        </ErrorBoundary>
        {/* <Route path="/store/appMain/myPage/modal/widget" component={AppModal} /> */}
      </div>
    );
  }
}

AppBizModal.propTypes = {
  // history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default AppBizModal;
