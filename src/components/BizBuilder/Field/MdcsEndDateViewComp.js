import React from 'react';

const MdcsEndDateViewComp = ({ colData, visible, CONFIG }) =>
  visible ? (
    <div className={CONFIG.property.className || ''}>
      <div>Registered By Document Control</div>
      <span>{colData && colData.split(' ')[0]}</span>
    </div>
  ) : (
    ''
  );
export default MdcsEndDateViewComp;
