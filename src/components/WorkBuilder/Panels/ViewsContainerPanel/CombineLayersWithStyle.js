import React from 'react';
import PropTypes from 'prop-types';

import Styled from './Styled';
import Layers from './Layers';
import StyleManager from './StyleManager';

const CombineLayersWithStyle = ({ property, action: { styleManagerAction, layersAction } }) => (
  <Styled direction="right" className="combine">
    <StyleManager action={styleManagerAction} property={property} />
    <Layers action={layersAction} {...property} />
  </Styled>
);

CombineLayersWithStyle.propTypes = {
  action: PropTypes.object,
  property: PropTypes.object,
};

CombineLayersWithStyle.defaultProps = {
  action: {
    styleManager: {},
    layers: {},
    blocks: {},
  },
  property: {
    tabId: '',
  },
};

export default CombineLayersWithStyle;
