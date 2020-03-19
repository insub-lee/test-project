import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';
import { Data } from 'react-data-grid-addons';

class SqtbEquipMgt extends Component {
  state = {
    isLoading: true,
  };

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  render() {
    return <BizBuilderBase sagaKey="SqtbEquipMgt" workSeq={4941} viewType="LIST" loadingComplete={this.loadingComplete} />;
  }
}

SqtbEquipMgt.propTypes = {};

SqtbEquipMgt.defaultProps = {};

export default SqtbEquipMgt;
