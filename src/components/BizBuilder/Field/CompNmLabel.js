import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as selectors from 'containers/common/Auth/selectors';

class CompNmLabel extends Component {
  componentDidMount() {
    const { profile, changeFormData, sagaKey: id, COMP_FIELD, viewType, colData, getExtraApiData } = this.props;
    if (viewType === 'INPUT') {
      changeFormData(id, COMP_FIELD, profile.COMP_CD);
    }
    const apiArray = [{ key: `GetCompNm`, url: `/api/eshs/v1/common/eshsGetCompNm?COMP_CD=${String(colData || profile.COMP_CD)}`, type: 'GET' }];
    getExtraApiData(id, apiArray);
  }

  render() {
    const {
      visible,
      CONFIG: { property },
      extraApiData: { GetCompNm },
    } = this.props;
    return visible ? <span className={property.className || ''}>{GetCompNm && GetCompNm.COMP_NM}</span> : '';
  }
}

CompNmLabel.propTypes = {
  CONFIG: PropTypes.any,
  profile: PropTypes.any,
  extraApiData: PropTypes.any,
  colData: PropTypes.string,
  viewType: PropTypes.string,
  sagaKey: PropTypes.string,
  COMP_FIELD: PropTypes.string,
  visible: PropTypes.bool,
  changeFormData: PropTypes.func,
  getExtraApiData: PropTypes.func,
};

CompNmLabel.defaultProps = {};

export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(CompNmLabel);
