import React from 'react';

const LabelComp = ({ NAME_KOR, visible }) => (visible ? <span>{NAME_KOR}</span> : '');
export default LabelComp;
