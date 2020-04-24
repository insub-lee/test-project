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
      viewPageData: { viewType },
      CONFIG,
      CONFIG: {
        property: { profileKey },
      },
      profile,
    } = this.props;
    const ignoreColdata = (CONFIG && CONFIG.property && CONFIG.property.ignoreColdata) || 'N';
    const nvlFlag = (CONFIG && CONFIG.property && CONFIG.property.nvlFlag) || 'N';
    if (viewType === 'INPUT' || ignoreColdata === 'Y' || nvlFlag === 'Y') {
      changeFormData(id, COMP_FIELD, profile[`${profileKey}`]);
    }
  }

  handleOnChange = value => {
    const { sagaKey: id, COMP_FIELD, CONFIG, changeFormData, changeValidationData } = this.props;
    if (CONFIG.property.isRequired) {
      changeValidationData(id, COMP_FIELD, value.trim().length > 0, value.trim().length > 0 ? '' : `${COMP_FIELD}항목은 필수 입력입니다.`);
    }
    changeFormData(id, COMP_FIELD, value);
  };

  render() {
    const {
      CONFIG,
      profile,
      colData,
      readOnly,
      visible,
      isSearch,
      searchCompRenderer,
      viewPageData: { viewType },
    } = this.props;
    const ignoreColdata = (CONFIG && CONFIG.property && CONFIG.property.ignoreColdata) || 'N';
    const profileKey = (CONFIG && CONFIG.property && CONFIG.property.profileKey) || '';
    const nvlFlag = (CONFIG && CONFIG.property && CONFIG.property.nvlFlag) || 'N';

    if (isSearch && visible && CONFIG.property.searchType !== 'CUSTOM') {
      return searchCompRenderer(this.props);
    }

    if (!visible) return '';
    // nvl) config nvlFlag 활성했을 경우 colData가 null일때 profile값으로 대체
    // INPUT PAGE에서는 해당 컴포넌트를 안쓰는데 MODIFY PAGE에서는 NULL일경우 Session정보를 보여줘야 해서 추가
    if (nvlFlag === 'Y' && !colData) {
      return (
        <Input
          defaultValue={profile[`${profileKey}`]}
          placeholder={CONFIG.property.placeholder}
          onChange={e => this.handleOnChange(e.target.value)}
          readOnly={readOnly || CONFIG.property.readOnly}
          className={CONFIG.property.className || ''}
        />
      );
    }
    return (
      <Input
        defaultValue={viewType !== 'INPUT' && ignoreColdata === 'N' ? colData : profile[`${profileKey}`]}
        placeholder={CONFIG.property.placeholder}
        onChange={e => this.handleOnChange(e.target.value)}
        readOnly={readOnly || CONFIG.property.readOnly}
        className={CONFIG.property.className || ''}
      />
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
  changeValidationData: PropTypes.any,
  readOnly: PropTypes.any,
  compProp: PropTypes.any,
  changeSearchData: PropTypes.any,
  profile: PropTypes.object,
  visible: PropTypes.any,
  isSearch: PropTypes.any,
  searchCompRenderer: PropTypes.any,
  viewPageData: PropTypes.object,
};

export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(ProfileInputComp);
