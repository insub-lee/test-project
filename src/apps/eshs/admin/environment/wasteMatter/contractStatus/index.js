import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';

class ContractStatus extends Component {
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
        listMetaSeq={4761}
        taskSeq={-1}
        viewType="LIST"
        loadingComplete={this.loadingComplete}
      />
    );
  }
}

ContractStatus.propTypes = {};

ContractStatus.defaultProps = {};

export default ContractStatus;
