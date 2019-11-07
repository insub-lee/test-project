import React from 'react';

import LabelWithCopyComp from '../../../admin/ComponentConfig/customLabelIndex';
import TextComp from '../../../admin/ComponentConfig/inputIndex';
import TreeSelectComp from '../../../admin/ComponentConfig/treeSelectIndex';
export const CompInfo = {
  TextComp: { renderer: property => <TextComp {...property} /> },
  TreeSelectComp: { renderer: property => <TreeSelectComp {...property} /> },
  LabelWithCopyComp: { renderer: property => <LabelWithCopyComp {...property} /> },
};
