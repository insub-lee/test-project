import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';

class Contract extends Component {
  componentDidMount() {}

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  render() {
    return (
      <BizBuilderBase
        sagaKey="contract"
        workSeq={4661}
        compProps={{ sagaKey: 'contractSearchBar', workSeq: 4661 }}
        onReset={this.onReset}
        taskSeq={-1}
        viewType="INPUT"
        loadingComplete={this.loadingComplete}
      />
    );
  }
}

Contract.propTypes = {};

Contract.defaultProps = {};

export default Contract;
