import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';

class Hazard extends Component {
  componentDidMount() {}

  render() {
    return <BizBuilderBase sagaKey="hazard" workSeq={12061} viewType="INPUT" loadingComplete={this.loadingComplete} />;
  }
}

Hazard.propTypes = {};

Hazard.defaultProps = {};

export default Hazard;
