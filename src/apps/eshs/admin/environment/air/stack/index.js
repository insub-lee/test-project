import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';

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
        loadingComplete={this.loadingComplete}
        InputCustomButtons={() => null}
        ModifyCustomButtons={() => null}
      />
    );
  }
}

Stack.propTypes = {};

Stack.defaultProps = {};

export default Stack;
