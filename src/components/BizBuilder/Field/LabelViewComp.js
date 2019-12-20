import React from 'react';

const LabelViewComp = ({ colData, visible }) => (visible ? <span>{colData}</span> : '');
export default LabelViewComp;
