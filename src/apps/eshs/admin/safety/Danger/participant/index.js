import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import List from './List';

class Participant extends Component {
  componentDidMount() {}

  render() {
    return <BizBuilderBase sagaKey="participant" workSeq={9201} viewType="LIST" CustomListPage={List} loadingComplete={this.loadingComplete} />;
  }
}

Participant.propTypes = {};

Participant.defaultProps = {};

export default Participant;
