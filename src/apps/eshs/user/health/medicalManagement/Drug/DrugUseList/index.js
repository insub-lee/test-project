import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import PropTypes from 'prop-types';
import List from 'apps/eshs/user/health/medicalManagement/Drug/DrugUseList/List';

class DrugUseList extends Component {
  render() {
    const { sagaKey } = this.props;
    return <BizMicroDevBase sagaKey={sagaKey} component={List} />;
  }
}

DrugUseList.propTypes = {
  sagaKey: PropTypes.string,
};
DrugUseList.defaultProps = {
  sagaKey: 'DrugUseList',
};
export default DrugUseList;
