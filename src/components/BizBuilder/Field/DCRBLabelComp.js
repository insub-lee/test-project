import React from 'react';

import LabelComp from './LabelComp';
const DCRBLabelComp = props =>
  props.isManage ||
  (props.visible &&
    props.formData.DOCNUMBER &&
    props.formData.DOCNUMBER.indexOf('ME') === 0 &&
    (props.formData.DOCNUMBER.substr(3, 1) === 'B' ||
      props.formData.DOCNUMBER.substr(3, 1) === 'C' ||
      props.formData.DOCNUMBER.substr(3, 1) === 'J' ||
      props.formData.DOCNUMBER.substr(3, 1) === 'K')) ? (
      <LabelComp {...props} />
    ) : (
      ''
    );
export default DCRBLabelComp;
