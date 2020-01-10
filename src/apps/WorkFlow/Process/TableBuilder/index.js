import React from 'react';

import WhiteSpace from '../../components/Panel';
import PanelContainer from '../../components/Panel/PanelContainer';
import PanelContent from '../../components/Panel/PanelContent';
import PanelHeader from '../../components/Panel/PanelHeader';

import TableBody from './TableBody';
import HeaderAdder from './HeaderAdder';

const TableBuilder = props => (
  <WhiteSpace>
    <PanelHeader title="Form" />
    <PanelContainer>
      <PanelContent>
        <HeaderAdder {...props} />
        <TableBody {...props} />
      </PanelContent>
    </PanelContainer>
  </WhiteSpace>
);

export default TableBuilder;
