import React from 'react';

const LabelViewComp = ({ colData, visible, CONFIG }) => (visible ? <span className={CONFIG.property.className || ''}>{colData}</span> : '');
export default LabelViewComp;
