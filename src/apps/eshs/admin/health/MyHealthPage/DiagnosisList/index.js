import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import PropTypes from 'prop-types';
import List from 'apps/eshs/admin/health/MyHealthPage/DiagnosisList/List';

class DiagnosisList extends Component {
  render() {
    const { sagaKey } = this.props;
    return <BizMicroDevBase sagaKey={sagaKey} component={List} />;
  }
}

DiagnosisList.propTypes = {
  sagaKey: PropTypes.string,
};
DiagnosisList.defaultProps = {
  sagaKey: 'DiagnosisList',
};
export default DiagnosisList;
