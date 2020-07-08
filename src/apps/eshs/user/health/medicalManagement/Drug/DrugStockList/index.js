import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import PropTypes from 'prop-types';
import List from 'apps/eshs/user/health/medicalManagement/Drug/DrugStockList/List';

class DrugStockList extends Component {
  render() {
    const { sagaKey } = this.props;
    return <BizMicroDevBase sagaKey={sagaKey} component={List} />;
  }
}

DrugStockList.propTypes = {
  sagaKey: PropTypes.string,
};
DrugStockList.defaultProps = {
  sagaKey: 'DrugStockList',
};
export default DrugStockList;
