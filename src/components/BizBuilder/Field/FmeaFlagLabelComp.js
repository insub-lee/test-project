import React from 'react';

import LabelComp from './LabelComp';
const FmeaFlagLabelComp = props =>
  props.isManage ||
  (props.visible &&
    props.formData.DOCNUMBER &&
    (props.formData.DOCNUMBER.indexOf('MBA') === 0 ||
      props.formData.DOCNUMBER.indexOf('MBB') === 0 ||
      props.formData.DOCNUMBER.indexOf('MBC') === 0 ||
      props.formData.DOCNUMBER.indexOf('MBF') === 0 ||
      props.formData.DOCNUMBER.indexOf('MBG') === 0 ||
      props.formData.DOCNUMBER.indexOf('MBH') === 0 ||
      props.formData.DOCNUMBER.indexOf('MBI') === 0)) ? (
      <LabelComp {...props} />
    ) : (
      ''
    );
export default FmeaFlagLabelComp;
