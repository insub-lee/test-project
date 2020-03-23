import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as selectors from 'containers/common/Auth/selectors';

class BareaLabel extends Component {
  componentDidMount() {}

  render() {
    const { profile, changeFormData, sagaKey: id, COMP_FIELD, visible, CONFIG, colData, viewPageData } = this.props;
    let nBareaCd;
    let nBareaNm;
    if (viewPageData.viewType === 'INPUT') {
      switch (profile.BAREA_CD) {
        case 'CP':
          nBareaCd = '716';
          break;
        case 'GP':
          nBareaCd = '717';
          break;
        case 'AA':
          nBareaCd = '718';
          break;
        default:
          break;
      }
      changeFormData(id, COMP_FIELD, nBareaCd);
    }

    switch (colData) {
      case '716':
        nBareaNm = '청주';
        break;
      case '717':
        nBareaNm = '구미';
        break;
      case '718':
        nBareaNm = '서울';
        break;
      default:
        break;
    }
    return visible ? <span className={CONFIG.property.className || ''}>{nBareaNm}</span> : '';
  }
}

BareaLabel.propTypes = {
  CONFIG: PropTypes.any,
  profile: PropTypes.any,
  colData: PropTypes.string,
  sagaKey: PropTypes.string,
  COMP_FIELD: PropTypes.string,
  visible: PropTypes.bool,
  changeFormData: PropTypes.func,
};

BareaLabel.defaultProps = {};

export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(BareaLabel);
