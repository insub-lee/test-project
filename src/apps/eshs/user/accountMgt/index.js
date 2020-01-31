import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';

class AccountMgt extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {}

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
