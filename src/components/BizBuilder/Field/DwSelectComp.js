import React from 'react';

import SelectComp from './SelectComp';

const DwSelectComp = props => (props.isManage || (props.visible && props.formData.DOCNUMBER.substr(0, 4) !== 'MBKH') ? <SelectComp {...props} /> : '');
export default DwSelectComp;
