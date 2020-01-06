import React from 'react';

import TextareaComp from './TextareaComp';
const FmeaTextareaComp = props => (props.isManage || (props.visible && Number(props.formData.FMEA_FLAG) === 195) ? <TextareaComp {...props} /> : '');

export default FmeaTextareaComp;
