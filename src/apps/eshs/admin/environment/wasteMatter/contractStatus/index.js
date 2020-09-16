import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import CustomList from 'apps/eshs/admin/environment/wasteMatter/contractStatus/CustomList';
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
        CustomListPage={CustomList}
        loadingComplete={this.loadingComplete}
        conditional={`AND W.SITE = '716'`}
      />
    );
  }
}

ContractStatus.propTypes = {};

ContractStatus.defaultProps = {};

export default ContractStatus;
