import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import List from './List';

class DenestAdmin extends Component {
  componantDidMount() {}

  render() {
    return <BizBuilderBase sagaKey="hazard" workSeq={12981} CustomListPage={List} viewType="LIST" loadingComplete={this.loadingComplete} />;
  }
}

DenestAdmin.propTypes = {};
DenestAdmin.defaultProps = {};

export default DenestAdmin;
