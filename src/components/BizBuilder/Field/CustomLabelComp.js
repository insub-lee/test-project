import React from 'react';

import LabelComp from './LabelComp';
const CustomLabelComp = props => (props.visible && Number(props.formData.FMEA_FLAG) === 192 ? <LabelComp {...props}></LabelComp> : '');
export default CustomLabelComp;
