import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from 'apps/eshs/admin/health/ChkResult/ChkResultItem/List';
import PropTypes from 'prop-types';

class ChkResultItem extends Component {
  render() {
    const { defaultUser, userSearch, sagaKey } = this.props;
    return <BizMicroDevBase sagaKey={sagaKey} component={List} />;
  }
}

ChkResultItem.propTypes = {
  sagaKey: PropTypes.string,
};
ChkResultItem.defaultProps = {
  sagaKey: 'ChkResultItem',
};
export default ChkResultItem;
