import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import List from './List';

class EshRoadMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {}

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  render() {
    return <BizBuilderBase sagaKey="roadMap" workSeq={2401} viewType="LIST" CustomListPage={List} loadingComplete={this.loadingComplete} />;
  }
}

EshRoadMap.propTypes = {};
EshRoadMap.defaultProps = {};

export default EshRoadMap;
