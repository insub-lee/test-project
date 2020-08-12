import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import PropTypes from 'prop-types';
import InputComp from 'apps/eshs/admin/safety/safetyImprove/comp/InputComp';
class Input extends Component {
  render() {
    return <BizMicroDevBase sagaKey="safetyImproveInput" component={InputComp} />;
  }
}

Input.propTypes = {};
Input.defaultProps = {};
export default Input;
