import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import CustomInput from './Input';
import CustomModify from './Modify';

class Stack extends Component {
  componentDidMount() {}

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  render() {
    return (
      <BizBuilderBase
        sagaKey="stack"
        workSeq={4401}
        onReset={this.onReset}
        taskSeq={-1}
        viewType="INPUT"
        CustomInputPage={CustomInput}
        CustomModifyPage={CustomModify}
        loadingComplete={this.loadingComplete}
      />
    );
  }
}

Stack.propTypes = {};

Stack.defaultProps = {};

export default Stack;
