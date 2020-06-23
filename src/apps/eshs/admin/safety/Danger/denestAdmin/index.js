import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class DenestAdmin extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="denestAdmin" component={List} dangerMainYN />;
  }
}

DenestAdmin.propTypes = {};
DenestAdmin.defaultProps = {};

export default DenestAdmin;
