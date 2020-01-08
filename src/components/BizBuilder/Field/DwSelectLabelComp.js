import React from 'react';

import LabelComp from './LabelComp';
const FmeaLabelComp = props => (props.isManage || (props.visible && props.formData.DOCNUMBER.substr(0, 4) !== 'MBKH') ? <LabelComp {...props} /> : '');
export default FmeaLabelComp;
