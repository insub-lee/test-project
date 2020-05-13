import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';

class SubResourceDispReq extends Component {
  componentDidMount() {}

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  render() {
    return (
      <BizBuilderBase sagaKey="subResourceDispReq" workSeq={4981} viewType="INPUT" loadingComplete={this.loadingComplete} InputCustomButtons={() => null} />
    );
  }
}

SubResourceDispReq.propTypes = {};

SubResourceDispReq.defaultProps = {};

export default SubResourceDispReq;
