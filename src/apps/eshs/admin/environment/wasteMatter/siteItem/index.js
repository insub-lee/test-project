import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import CustomList from './List';

class SiteItem extends Component {
  componentDidMount() {}

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  render() {
    return (
      <BizBuilderBase
        sagaKey="siteItem"
        workSeq={4521}
        CustomListPage={CustomList}
        viewType="LIST"
        loadingComplete={this.loadingComplete}
        isModalChange={this.isModalChange}
      />
    );
  }
}

SiteItem.propTypes = {};

SiteItem.defaultProps = {};

export default SiteItem;
