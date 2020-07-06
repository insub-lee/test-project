import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import PropTypes from 'prop-types';
import List from 'apps/eshs/user/health/medicalManagement/Drug/DrugInOutList/List';

class DrugInOutList extends Component {
  render() {
    const { sagaKey } = this.props;
    return <BizMicroDevBase sagaKey={sagaKey} component={List} />;
  }
}

DrugInOutList.propTypes = {
  sagaKey: PropTypes.string,
};
DrugInOutList.defaultProps = {
  sagaKey: 'DrugInOutList',
};
export default DrugInOutList;
