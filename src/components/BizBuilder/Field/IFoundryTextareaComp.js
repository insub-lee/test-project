import React from 'react';

import TextareaComp from './TextareaComp';
const IFoundryTextareaComp = props =>
  props.isManage || (props.visible && props.formData.DOCNUMBER && props.formData.DOCNUMBER.indexOf('ME') === 0) ? <TextareaComp {...props} /> : '';

export default IFoundryTextareaComp;
