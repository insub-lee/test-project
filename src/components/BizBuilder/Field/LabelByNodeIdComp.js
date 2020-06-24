import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

class LabelByNodeIdComp extends Component {
  componentDidMount() {
    const { getExtraApiData, sagaKey: id, colData: defaultValue, CONFIG, formData } = this.props;
    const targetField = (CONFIG && CONFIG.property && CONFIG.property.targetField) || '';

    const colData = defaultValue || formData[targetField] || '';

    if (colData && colData !== ' ' && typeof eval(colData) === 'number') {
      const apiValue = [
        {
          key: `labelByNode_${colData}`,
          url: '/api/admin/v1/common/categoryOneByNodeId',
          params: { PARAM: { NODE_ID: Number(colData) } },
          type: 'POST',
        },
      ];
      getExtraApiData(id, apiValue);
    }
  }

  render() {
    const { extraApiData, formData, visible, CONFIG, colData: defaultValue } = this.props;
    const targetField = (CONFIG && CONFIG.property && CONFIG.property.targetField) || '';
    const viewColumn = (CONFIG && CONFIG.property && CONFIG.property.viewColumn) || '';

    const colData = defaultValue || formData[targetField] || '';

    const apiData = extraApiData[`labelByNode_${colData}`];
    return (
      visible && <span className={CONFIG.property.className || ''}>{(apiData && apiData.category && apiData.category[viewColumn || 'NAME_KOR']) || ''}</span>
    );
  }
}

LabelByNodeIdComp.propTypes = {
  extraApiData: PropTypes.object,
  getExtraApiData: PropTypes.func,
  sagaKey: PropTypes.object,
  visible: PropTypes.bool,
  CONFIG: PropTypes.any,
  formData: PropTypes.object,
  colData: PropTypes.string,
};

LabelByNodeIdComp.defaultProps = {
  visible: false,
  colData: '',
};

export default LabelByNodeIdComp;
