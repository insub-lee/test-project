/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizMicroDevBase from 'components/BizMicroDevBase';
import UserSelectComp from './userSelectComp';
class UserSelect extends Component {
  render() {
    return <BizMicroDevBase {...this.props} sagaKey="UserSelect" component={UserSelectComp} />;
  }
}
export default UserSelect;
