import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';
import List from 'apps/eshs/user/pages/ListPage';

class PartnersCommittee extends Component {
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
    return <BizBuilderBase sagaKey="PartnersCommittee" workSeq={1765} viewType="LIST" loadingComplete={this.loadingComplete} />;
  }
}

PartnersCommittee.propTypes = {};

PartnersCommittee.defaultProps = {};

export default PartnersCommittee;
