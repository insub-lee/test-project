import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';

class CmsInFormJournal extends Component {
  componentDidMount() {}

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  render() {
    return <BizBuilderBase sagaKey="cmsInFormJournal" workSeq={6041} viewType="LIST" loadingComplete={this.loadingComplete} />;
  }
}

CmsInFormJournal.propTypes = {};

CmsInFormJournal.defaultProps = {};

export default CmsInFormJournal;
