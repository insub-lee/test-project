import * as PropTypes from 'prop-types';
import React from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as selectors from 'containers/common/Auth/selectors';

class ProfileInputComp extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChange = debounce(this.handleOnChange, 300);
    // this.handleOnChangeSearch = debounce(this.handleOnChangeSearch, 300);
  }

  componentDidMount() {
    const {
      sagaKey: id,
      COMP_FIELD,
      changeFormData,
      CONFIG: {
        property: { profileKey },
      },
      profile,
    } = this.props;

    changeFormData(id, COMP_FIELD, profile[`${profileKey}`]);
  }

  handleOnChange = value => {
    const { sagaKey: id, COMP_FIELD, CONFIG, changeFormData, changeValidationData } = this.props;
    if (CONFIG.property.isRequired) {
      changeValidationData(id, COMP_FIELD, value.trim().length > 0, value.trim().length > 0 ? '' : `${COMP_FIELD}항목은 필수 입력입니다.`);
    }
    changeFormData(id, COMP_FIELD, value);
  };

  render() {
    const { CONFIG, profile, colData, readOnly, visible, isSearch, searchCompRenderer } = this.props;
    const ignoreColdata = (CONFIG && CONFIG.property && CONFIG.property.ignoreColdata) || 'N';
    const profileKey = (CONFIG && CONFIG.property && CONFIG.property.profileKey) || '';
    if (isSearch && visible && CONFIG.property.searchType !== 'CUSTOM') {
      return searchCompRenderer(this.props);
    }
    return visible ? (
      <Input
        value={ignoreColdata === 'N' ? colData : profile[`${profileKey}`]}
        placeholder={CONFIG.property.placeholder}
        onChange={e => this.handleOnChange(e.target.value)}
        readOnly={readOnly || CONFIG.property.readOnly}
        className={CONFIG.property.className || ''}
      />
    ) : (
      ''
    );
  }
}

ProfileInputComp.propTypes = {
  sagaKey: PropTypes.string,
  COMP_FIELD: PropTypes.any,
  NAME_KOR: PropTypes.any,
  CONFIG: PropTypes.any,
  colData: PropTypes.any,
  changeFormData: PropTypes.any,
  id: PropTypes.any,
  changeValidationData: PropTypes.any,
  readOnly: PropTypes.any,
  compProp: PropTypes.any,
  changeSearchData: PropTypes.any,
  profile: PropTypes.object,
  visible: PropTypes.any,
  isSearch: PropTypes.any,
  searchCompRenderer: PropTypes.any,
};

export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(ProfileInputComp);
