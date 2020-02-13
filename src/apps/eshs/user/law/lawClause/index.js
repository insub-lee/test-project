import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import ClauseList from './ClauseList';

class lawClause extends Component {
  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  componentDidMount() {}

  render() {
    /* const {
      match: { params },
      item,
    } = this.props;
    const { ID } = params; */
    return <BizBuilderBase sagaKey="lawClause" workSeq={1645} viewType="LIST" loadingComplete={this.loadingComplete} CustomListPage={ClauseList} />;
  }
}

lawClause.propTypes = {};

lawClause.defaultProps = {};

export default lawClause;
