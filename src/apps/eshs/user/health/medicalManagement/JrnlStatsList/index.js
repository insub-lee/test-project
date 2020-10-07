import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import PropTypes from 'prop-types';
import List from 'apps/eshs/user/health/medicalManagement/JrnlStatsList/List';

class JrnlStatsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { sagaKey, customOnRowClick, saveBtn } = this.props;
    return <BizMicroDevBase sagaKey={sagaKey} component={List} relKey="의료일지" prcId={112} />;
  }
}

JrnlStatsList.propTypes = {
  sagaKey: PropTypes.string,
};
JrnlStatsList.defaultProps = {
  sagaKey: 'JrnlStatsList',
};
export default JrnlStatsList;
