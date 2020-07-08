import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import PropTypes from 'prop-types';
import List from 'apps/eshs/user/health/medicalManagement/Drug/DrugList/List';

class DrugList extends Component {
  render() {
    const { sagaKey, customOnRowClick, saveBtn } = this.props;
    return <BizMicroDevBase sagaKey={sagaKey} component={List} customOnRowClick={customOnRowClick} saveBtn={saveBtn} />;
  }
}

DrugList.propTypes = {
  sagaKey: PropTypes.string,
  customOnRowClick: PropTypes.any,
  saveBtn: PropTypes.bool,
};
DrugList.defaultProps = {
  sagaKey: 'DrugList',
  customOnRowClick: undefined,
  saveBtn: true,
};
export default DrugList;
