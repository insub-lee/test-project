import React from 'react';

const LabelComp = ({ NAME_KOR, visible, CONFIG }) => (visible ? <span className={CONFIG.property.className || ''}>{NAME_KOR}</span> : '');
export default LabelComp;
