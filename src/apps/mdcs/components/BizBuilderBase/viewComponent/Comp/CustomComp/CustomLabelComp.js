import React from 'react';

import LabelComp from '../LabelComp';
const CustomLabelComp = props => (Number(props.formData.FMEA_FLAG) === 192 ? <LabelComp {...props}></LabelComp> : '');
export default CustomLabelComp;
