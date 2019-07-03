import React from 'react';
import PropTypes from 'prop-types';

import Styled from './Styled';
import StyleManager from './StyleManager';
import Layers from './Layers';
import Blocks from './Blocks';

const ViewsContainerPanel = ({ property, action: { styleManagerAction, layersAction, blocksAction } }) => {
  switch (property.tabId) {
    case 'StyleManager':
      return (
        <Styled>
          <StyleManager action={styleManagerAction} property={property} />
        </Styled>
      );
    case 'Layers':
      return (
        <Styled>
          <Layers action={layersAction} {...property} />
        </Styled>
      );
    case 'Blocks':
      return (
        <Styled>
          <Blocks action={blocksAction} property={property} />
        </Styled>
      );
    default:
      return <Styled />;
  }
};

ViewsContainerPanel.propTypes = {
  action: PropTypes.object,
  property: PropTypes.object,
};

ViewsContainerPanel.defaultProps = {
  action: {
    styleManager: {},
    layers: {},
    blocks: {},
  },
  property: {
    tabId: '',
  },
};

export default ViewsContainerPanel;
