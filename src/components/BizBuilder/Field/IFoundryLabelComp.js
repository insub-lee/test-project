import React from 'react';

import LabelComp from './LabelComp';
const IFoundryLabelComp = props =>
  props.isManage || (props.visible && props.formData.DOCNUMBER && props.formData.DOCNUMBER.indexOf('ME') === 0) ? <LabelComp {...props} /> : '';
export default IFoundryLabelComp;
