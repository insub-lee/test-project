import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import List from './List';

class law extends Component {
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
    return <BizBuilderBase sagaKey="law" workSeq={1081} viewType="LIST" loadingComplete={this.loadingComplete} CustomListPage={List} />;
  }
}

law.propTypes = {};

law.defaultProps = {};

export default law;
