/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';
import SearchBar from './List/SearchBar';
import NavList from './List/NavList';
import Styeld from './Styled';

class EshsUserManager extends Component {
  render() {
    return (
      <Styeld>
        <BizMicroDevBase component={NavList} sagaKey="EshsUserManager" />
        <BizMicroDevBase component={SearchBar} sagaKey="EshsUserManager" />
        <BizMicroDevBase component={List} sagaKey="EshsUserManager" />
      </Styeld>
    );
  }
}

export default EshsUserManager;
