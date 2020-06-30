import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';
import List from 'apps/eshs/user/pages/ListPage';

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
    return <BizBuilderBase sagaKey="Notice" workSeq={1221} viewType="LIST" loadingComplete={this.loadingComplete} />;
  }
}

Notice.propTypes = {};

Notice.defaultProps = {};

export default Notice;
