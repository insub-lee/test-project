import React from 'react';

import LabelComp from './LabelComp';
const RadioMaterialLabelComp = props =>
  props.isManage ||
  (props.visible &&
    props.formData &&
    props.formData.DOCNUMBER &&
    (props.formData.DOCNUMBER.substr(0, 4) === 'MBDA' || props.formData.DOCNUMBER.substr(0, 4) === 'MBKE')) ? (
    <LabelComp {...props} />
  ) : (
    ''
  );
export default RadioMaterialLabelComp;
