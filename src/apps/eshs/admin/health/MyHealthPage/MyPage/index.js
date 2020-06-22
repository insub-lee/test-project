import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import View from 'apps/eshs/admin/health/MyHealthPage/MyPage/View';

import PropTypes from 'prop-types';

class MyPage extends Component {
  render() {
    const { sagaKey, userId, userSearch } = this.props;
    return <BizMicroDevBase sagaKey={sagaKey} component={View} defaultUser={userId} userSearch={userSearch} />;
  }
}

MyPage.propTypes = {
  sagaKey: PropTypes.string,
  userId: PropTypes.number,
  userSearch: PropTypes.bool,
};
MyPage.defaultProps = {
  sagaKey: 'SelfMyPage',
  userId: undefined,
  userSearch: true,
};
export default MyPage;
