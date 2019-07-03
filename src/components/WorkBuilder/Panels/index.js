import PropTypes from 'prop-types';
import React from 'react';

import Styled from './Styled';
import CommandsPanel from './CommandsPanel';
import DevicesPanel from './DevicesPanel';
import OptionsPanel from './OptionsPanel';
import ViewsContainerPanel from './ViewsContainerPanel';
import ViewsPanel from './ViewsPanel';

const Panels = ({ property, action: { viewsContainerPanelAction, viewsPanelAction, optionsPanelAction } }) => (
  <Styled className="panels">
    <CommandsPanel />
    <OptionsPanel action={optionsPanelAction} />
    <ViewsPanel {...property} action={viewsPanelAction} />
    <DevicesPanel />
    <ViewsContainerPanel property={property} action={viewsContainerPanelAction} />
  </Styled>
);

Panels.propTypes = {
  property: PropTypes.object,
  action: PropTypes.object,
};

Panels.defaulProps = {
  property: {},
  action: {
    viewsPanelAction: {},
    viewsContainerPanelAction: {},
  },
};

export default Panels;
