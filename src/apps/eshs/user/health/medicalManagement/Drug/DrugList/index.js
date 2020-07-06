import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import PropTypes from 'prop-types';
import List from 'apps/eshs/user/health/medicalManagement/Drug/DrugList/List';

class DrugList extends Component {
  render() {
    const { sagaKey } = this.props;
    return <BizMicroDevBase sagaKey={sagaKey} component={List} />;
  }
}

DrugList.propTypes = {
  sagaKey: PropTypes.string,
};
DrugList.defaultProps = {
  sagaKey: 'DrugList',
};
export default DrugList;
