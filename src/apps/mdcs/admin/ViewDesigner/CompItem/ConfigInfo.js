import React from 'react';

import LabelWithCopyComp from '../../ComponentConfig/customLabelIndex';
import TextComp from '../../ComponentConfig/inputIndex';
import TreeSelectComp from '../../ComponentConfig/treeSelectIndex';
export const CompInfo = {
  TextComp: { renderer: property => <TextComp {...property} /> },
  TreeSelectComp: { renderer: property => <TreeSelectComp {...property} /> },
  LabelWithCopyComp: { renderer: property => <LabelWithCopyComp {...property} /> },
};
