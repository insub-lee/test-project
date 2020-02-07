import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';

class Notice extends Component {
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
    /* const {
      match: { params },
      item,
    } = this.props;
    const { ID } = params; */
    return <BizBuilderBase sagaKey="Notice" workSeq={1161} viewType="LIST" loadingComplete={this.loadingComplete} />;
  }
}

Notice.propTypes = {};

Notice.defaultProps = {};

export default Notice;
