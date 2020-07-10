import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class DenestAdmin extends Component {
  componantDidMount() {}

  render() {
    const { improveDanger } = this.props;
    return <BizMicroDevBase sagaKey="denestAdmin" component={List} improveDanger={improveDanger} />;
  }
}

DenestAdmin.propTypes = {
  improveDanger: PropTypes.object,
};

export default DenestAdmin;
