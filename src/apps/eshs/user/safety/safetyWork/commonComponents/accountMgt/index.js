import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';
import { Data } from 'react-data-grid-addons';
import CustomInput from './pages/CustomInput';
import CustomModify from './pages/CustomModify';

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
    return (
      <BizBuilderBase
        sagaKey="AccountMgt"
        workSeq={401}
        viewType="INPUT"
        CustomInputPage={CustomInput}
        CustomModifyPage={CustomModify}
        loadingComplete={this.loadingComplete}
      />
    );
  }
}

AccountMgt.propTypes = {};

AccountMgt.defaultProps = {};

export default AccountMgt;
