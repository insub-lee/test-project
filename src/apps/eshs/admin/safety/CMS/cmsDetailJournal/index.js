import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';

class CMSDetailJournal extends Component {
  componentDidMount() {}

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  render() {
    return <BizBuilderBase sagaKey="cmsDetailJournal" workSeq={5781} viewType="LIST" loadingComplete={this.loadingComplete} />;
  }
}

CMSDetailJournal.propTypes = {};

CMSDetailJournal.defaultProps = {};

export default CMSDetailJournal;
