import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from '../List';

class EshsExhaustView extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="eshsExhaustView" component={List} eshsExhaustView />;
  }
}

EshsExhaustView.propTypes = {};
EshsExhaustView.defaultProps = {};

export default EshsExhaustView;
