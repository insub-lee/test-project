import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';
import { Data } from 'react-data-grid-addons';
import CustomList from './pages/CustomList';

class AccountMgt extends Component {
  state = {
    isLoading: true,
  };

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  render() {
    return <BizBuilderBase sagaKey="AccountMgt" workSeq={401} viewType="LIST" CustomListPage={CustomList} loadingComplete={this.loadingComplete} />;
  }
}

AccountMgt.propTypes = {};

AccountMgt.defaultProps = {};

export default AccountMgt;
