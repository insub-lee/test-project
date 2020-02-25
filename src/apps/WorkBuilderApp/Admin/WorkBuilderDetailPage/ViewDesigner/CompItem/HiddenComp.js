import React from 'react';
import { Popconfirm } from 'antd';

import Styled from './Styled';

const HiddenComp = ({ compItem, compIndex, removeHiddenComp, changeCompData, changeViewCompData, viewType, setCompConfigModal }) => {
  if (compItem && compItem.CONFIG && compItem.CONFIG.property.COMP_SRC) {
    const configProps = {
      comp: compItem,
      changeCompData,
      groupIndex: 999,
      rowIndex: 0,
      colIndex: compIndex,
      configInfo: compItem.CONFIG,
      // compPoolList,
      changeViewCompData,
      viewType,
      groupType: 'hiddenGroup',
      // compList,
    };
    return (
      <Styled className="bizBuilderHiddenComp">
        <span>{compItem.COMP_FIELD || 'no id'}</span>
        <span
          className="toolbar-item fa fa-cog"
          role="button"
          onKeyPress={() => false}
          tabIndex="0"
          onClick={() => setCompConfigModal(true, compItem.CONFIG.property.COMP_SETTING_SRC, configProps, 'HIDDEN')}
        />
        <Popconfirm title="Are you sure delete this Component?" onConfirm={() => removeHiddenComp(compIndex)} okText="Yes" cancelText="No">
          <span className="toolbar-item fa fa-trash" role="button" onKeyPress={() => false} tabIndex="0" />
        </Popconfirm>
      </Styled>
    );
  }
  return '';
};

export default HiddenComp;
