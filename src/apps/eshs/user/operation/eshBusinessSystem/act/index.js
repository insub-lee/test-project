import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import List from 'apps/eshs/user/pages/ListPage';

class EshSystemLaw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  render() {
    return <BizBuilderBase sagaKey="EshSystemLaw" workSeq={1853} viewType="LIST" loadingComplete={this.loadingComplete} />;
  }
}

EshSystemLaw.propTypes = {};

EshSystemLaw.defaultProps = {};

export default EshSystemLaw;
