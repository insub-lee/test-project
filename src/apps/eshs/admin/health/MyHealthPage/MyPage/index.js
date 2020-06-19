import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import View from 'apps/eshs/admin/health/MyHealthPage/MyPage/View';

import PropTypes from 'prop-types';

class MyPage extends Component {
  render() {
    const { sagaKey } = this.props;
    return <BizMicroDevBase sagaKey={sagaKey} component={View} />;
  }
}

MyPage.propTypes = {
  sagaKey: PropTypes.string,
};
MyPage.defaultProps = {
  sagaKey: 'SelfMyPage',
};
export default MyPage;
