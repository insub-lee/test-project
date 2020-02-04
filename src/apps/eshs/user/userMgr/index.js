import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';
import SearchBar from './List/SearchBar';
import Styeld from './Styled';

class EshsUserManager extends Component {
  componentDidMount() {}

  render() {
    return (
      <Styeld>
        <BizMicroDevBase component={SearchBar} sagaKey="EshsUserManager" />
        <BizMicroDevBase component={List} sagaKey="EshsUserManager" />
      </Styeld>
    );
  }
}

EshsUserManager.propTypes = {};
EshsUserManager.defaultProps = {};

export default EshsUserManager;
