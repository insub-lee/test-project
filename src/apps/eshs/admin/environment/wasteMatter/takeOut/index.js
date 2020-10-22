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
      />
    );
  }
}

TakeOut.propTypes = {};

TakeOut.defaultProps = {};

export default TakeOut;
