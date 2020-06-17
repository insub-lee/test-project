import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';

class HazardappriseNumList extends Component {
  componentDidMount() {}

  render() {
    return <BizBuilderBase sagaKey="hazardappriseNumList" workSeq={12061} viewType="LIST" loadingComplete={this.loadingComplete} listMetaSeq={12681} />;
  }
}

HazardappriseNumList.propTypes = {};

HazardappriseNumList.defaultProps = {};

export default HazardappriseNumList;
