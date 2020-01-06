import React from 'react';

import LabelComp from './LabelComp';
const FmeaLabelComp = props => (props.isManage || (props.visible && Number(props.formData.FMEA_FLAG) === 195) ? <LabelComp {...props} /> : '');
export default FmeaLabelComp;
