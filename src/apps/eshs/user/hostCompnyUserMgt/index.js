import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import SearchBar from './SearchBar';

class hostCompnyUserMgt extends Component {
  render() {
    console.log('this.props ', this.props);
    return  <BizMicroDevBase component={SearchBar} sagaKey='EshshostCompny' />;
  }
}




export default hostCompnyUserMgt;
