import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppTree from '../../../components/appSelectorportal';

class WidgetSetting extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
    };
  }

  render() {
    return (
      <AppTree
        item={this.props.item}
        type={this.props.type}
        updateBizGroupChgYn={this.props.updateBizGroupChgYn}
      />
    );
  }
}

export default WidgetSetting;
