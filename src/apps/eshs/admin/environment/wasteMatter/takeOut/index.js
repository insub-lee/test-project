import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';

class TakeOut extends Component {
  componentDidMount() {}

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  emptyButtons = () => [];

  render() {
    return (
      <BizBuilderBase
        sagaKey="takeOut"
        workSeq={4781}
        viewType="INPUT"
        loadingComplete={this.loadingComplete}
        InputCustomButtons={this.emptyButtons}
        ModifyCustomButtons={this.emptyButtons}
        ViewCustomButtons={this.emptyButtons}
        ListCustomButtons={this.emptyButtons}
        relKey="반출증관리"
        relKey2="TAKEOUT_CD"
        prcId={116}
      />
    );
  }
}

TakeOut.propTypes = {};

TakeOut.defaultProps = {};

export default TakeOut;
