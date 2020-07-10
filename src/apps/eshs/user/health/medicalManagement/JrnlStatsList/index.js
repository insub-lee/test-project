import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import PropTypes from 'prop-types';
import List from 'apps/eshs/user/health/medicalManagement/JrnlStatsList/List';

class JrnlStatsList extends Component {
  render() {
    const { sagaKey, customOnRowClick, saveBtn } = this.props;
    return <BizMicroDevBase sagaKey={sagaKey} component={List} />;
  }
}

JrnlStatsList.propTypes = {
  sagaKey: PropTypes.string,
};
JrnlStatsList.defaultProps = {
  sagaKey: 'JrnlStatsList',
};
export default JrnlStatsList;
