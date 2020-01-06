import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from '../../../components/BizBuilderBase';
// import BizMicroDevBase from '../../../components/BizMicroDevBase';
import Viewer from './Viewer';

class CoverViewer extends Component {
  render() {
    return <BizBuilderBase id="CoverViewer" component={Viewer} {...this.props} />;
  }
}

CoverViewer.propTypes = {
  workSeq: PropTypes.number,
  apiInfo: PropTypes.object,
};

CoverViewer.defaultProps = {};

export default CoverViewer;
