import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RoadmapCategoryComp extends Component {
  componentDidMount() {
    const { sagaKey: id, COMP_FIELD, changeFormData, compProps, formData, getExtraApiData } = this.props;
    if (!(formData && formData.CATEGORY && formData.CATEGORY.trim().length > 0)) {
      const value = compProps && compProps.category;
      changeFormData(id, COMP_FIELD, value);
    }
    const apiArray = [{ key: id, url: `/api/admin/v1/common/categoryMapList?MAP_ID=50`, type: 'GET' }];
    getExtraApiData(id, apiArray);
  }

  render() {
    const { visible, compProps, formData, CONFIG, extraApiData } = this.props;
    if (formData && formData.CATEGORY && formData.CATEGORY.trim().length > 0) {
      // return visible ? <span className={CONFIG.property.className || ''}>{formData.CATEGORY}</span> : '';
      return (
        <span className={this.props.COMP_FIELD || ''}>
          {extraApiData.modalroadMap ? extraApiData.modalroadMap.categoryMapList.filter(item => item.CODE === formData.CATEGORY)[0].NAME_KOR : ''}
        </span>
      );
    }
    return visible ? <span className={CONFIG.property.className || ''}>{compProps && compProps.CATEGORY}</span> : '';
  }
}

RoadmapCategoryComp.propTypes = {
  sagaKey: PropTypes.string,
  COMP_FIELD: PropTypes.object,
  changeFormData: PropTypes.func,
  compProps: PropTypes.object,
  formData: PropTypes.object,
  getExtraApiData: PropTypes.func,
  visible: PropTypes.bool,
  CONFIG: PropTypes.object,
  extraApiData: PropTypes.object,
};

export default RoadmapCategoryComp;
