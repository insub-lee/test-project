import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as selectors from 'containers/common/Auth/selectors';

class CompNmLabel extends Component {
  componentDidMount() {
    this.getCompanyName();
  }

  componentDidUpdate(prevProps) {
    const { COMP_FIELD, formData } = this.props;
    if (prevProps.formData[COMP_FIELD] !== formData[COMP_FIELD]) {
      this.getCompanyName();
    }
  }

  getCompanyName = () => {
    const { colData, getExtraApiData, sagaKey: id } = this.props;
    const apiArray = [{ key: `GetCompNm`, url: `/api/eshs/v1/common/eshsGetCompNm?COMP_CD=${colData}`, type: 'GET' }];
    getExtraApiData(id, apiArray);
  };

  render() {
    const { profile, changeFormData, sagaKey: id, COMP_FIELD, visible, CONFIG, extraApiData, viewPageData } = this.props;
    if (viewPageData.viewType === 'INPUT') {
      changeFormData(id, COMP_FIELD, profile.COMP_CD);
    }
    return visible ? <span className={CONFIG.property.className || ''}>{extraApiData && extraApiData.GetCompNm && extraApiData.GetCompNm.COMP_NM}</span> : '';
  }
}

CompNmLabel.propTypes = {
  CONFIG: PropTypes.any,
  profile: PropTypes.any,
  extraApiData: PropTypes.any,
  formData: PropTypes.any,
  colData: PropTypes.string,
  sagaKey: PropTypes.string,
  COMP_FIELD: PropTypes.string,
  visible: PropTypes.bool,
  changeFormData: PropTypes.func,
  getExtraApiData: PropTypes.func,
  viewPageData: PropTypes.func,
};

CompNmLabel.defaultProps = {};

export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(CompNmLabel);
