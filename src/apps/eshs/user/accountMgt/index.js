import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';
import { Data } from 'react-data-grid-addons';

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
    // const {
    //   match: { params },
    //   item,
    // } = this.props;
    // const { ID } = params;
    return <BizBuilderBase sagaKey="AccountMgt" workSeq={401} viewType="LIST" loadingComplete={this.loadingComplete} />;
  }
}

AccountMgt.propTypes = {};

AccountMgt.defaultProps = {};

export default AccountMgt;
