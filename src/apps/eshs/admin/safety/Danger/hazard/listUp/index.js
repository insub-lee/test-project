import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class HazardListUp extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="hazardListUp" component={List} />;
  }
}

HazardListUp.propTypes = {};
HazardListUp.defaultProps = {};

export default HazardListUp;
