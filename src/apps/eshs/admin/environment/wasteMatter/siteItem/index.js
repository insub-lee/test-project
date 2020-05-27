import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';

class SiteItem extends Component {
  componentDidMount() {}

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  render() {
    return <BizBuilderBase sagaKey="siteItem" workSeq={4521} viewType="LIST" loadingComplete={this.loadingComplete} />;
  }
}

SiteItem.propTypes = {};

SiteItem.defaultProps = {};

export default SiteItem;
