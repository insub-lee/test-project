import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import BizBuilderDevBase from 'components/BizMicroDevBase';
import List from './List';
import Styeld from './Styled';

class EshsUserManager extends Component {
  render() {
    return (
      <Styeld>
        <BizBuilderDevBase component={List} sagaKey="EshsUserManager" />
      </Styeld>
    );
  }
}

EshsUserManager.propTypes = {};
EshsUserManager.defaultProps = {};

export default EshsUserManager;
