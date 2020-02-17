import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';
import List from '../../pages/ListPage';

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
    return <BizBuilderBase sagaKey="PartnersCommittee" workSeq={1765} viewType="LIST" loadingComplete={this.loadingComplete} CustomListPage={List} />;
  }
}

PartnersCommittee.propTypes = {};

PartnersCommittee.defaultProps = {};

export default PartnersCommittee;
