import React from 'react';
import PropTypes from 'prop-types';

import Settings from './Settings';
import BoxSetting from './Settings/BoxSetting';

const SettingTab = ({ property: { viewTargetType, viewTargetId, boxes, groups, formStuffs }, action }) => {
  if (viewTargetType === 'Box') {
    const targetIndex = boxes.findIndex(box => box.id === viewTargetId);
    return <BoxSetting type="boxes" target={boxes[targetIndex]} action={action} targetIndex={targetIndex} />;
  }
  const targetIndex = formStuffs.findIndex(formStuff => formStuff.id === viewTargetId);
  const box = boxes.find(box => box.id === formStuffs[targetIndex].parentId);
  return <Settings type="formStuffs" target={formStuffs[targetIndex]} action={action} targetIndex={targetIndex} boxType={box.property.type} />;
};

SettingTab.propTypes = {
  action: PropTypes.object,
  property: PropTypes.object,
};

SettingTab.defaultProps = {
  action: {},
  property: {
    viewTargetType: '',
    signLine: [],
  },
};

export default SettingTab;
