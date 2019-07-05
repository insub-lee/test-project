import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';

import Styled from './Styled';

const OptionsPanel = ({ action: { openPreview, confirmClearLayers, confirmSaveLayers } }) => (
  <Styled>
    <div className="pn-buttons">
      <Tooltip title="Preview" placement="bottom">
        <span className="pn-btn fa fa-eye" title="preview" onClick={openPreview} role="button" onKeyPress={() => false} tabIndex="0" />
      </Tooltip>
      <Tooltip title="Clear" placement="bottom">
        <span className="pn-btn fa fa-trash" title="Clear" onClick={confirmClearLayers} role="button" onKeyPress={() => false} tabIndex="0" />
      </Tooltip>
      <Tooltip title="Save" placement="bottom">
        <span className="pn-btn fa fa-save" title="Save" onClick={confirmSaveLayers} role="button" onKeyPress={() => false} tabIndex="0" />
      </Tooltip>
    </div>
  </Styled>
);

OptionsPanel.propTypes = {
  action: PropTypes.shape({
    openPreview: PropTypes.func,
    confirmClearLayers: PropTypes.func,
    confirmSaveLayers: PropTypes.func,
  }),
};

OptionsPanel.defaultProps = {
  action: {
    openPreview: () => false,
    confirmClearLayers: () => false,
    confirmSaveLayers: () => false,
  },
};

export default OptionsPanel;
