import React from 'react';

import LabelComp from './LabelComp';
const RadioMaterialLabelComp = ({ fieldSelectData, CONFIG, colData, changeValidationData, COMP_FIELD, sagaKey, formData }) => {
  if (fieldSelectData && CONFIG.property.compSelectDataKey && CONFIG.property.compSelectDataKey.length > 0) {
    if (fieldSelectData[CONFIG.property.compSelectDataKey] && fieldSelectData[CONFIG.property.compSelectDataKey].length > 0) {
      const materList = fieldSelectData[CONFIG.property.compSelectDataKey];
      const { MATERIAL_TEXT: mCodeList, MATERIAL_TYPE: mType } = formData;
      const materType = materList.filter(f => f.NODE_ID === Number(mType)).length > 0 ? materList.filter(f => f.NODE_ID === Number(mType))[0].CODE : '';
      console.debug('formDat', mType, materList, colData, formData);

      const aryCode = mCodeList.split(',').map(item => materType + item);
      return aryCode.join();
    }
  }
  return '';
};

export default RadioMaterialLabelComp;
