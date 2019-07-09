import React from 'react';
import PropTypes from 'prop-types';

import Styled from './Styled';

const OptionLayer = ({ object, action: { removePanel }, isActive, tableMode }) => (
  <Styled className={`layout-option-layer ${tableMode ? 'layout-option-table-layer' : ''}`}>
    <div className="layout-option-title">{object.type}</div>
    {isActive && (
      <div className="layout-option-toolbar">
        <span
          className="toolbar-item fa fa-trash-o"
          onClick={e => {
            e.stopPropagation();
            removePanel(object.id, object.type);
          }}
          role="button"
          onKeyPress={() => false}
          tabIndex="0"
        />
      </div>
    )}
  </Styled>
);

OptionLayer.propTypes = {
  object: PropTypes.object.isRequired,
  action: PropTypes.object,
  isActive: PropTypes.bool,
  tableMode: PropTypes.bool,
};

OptionLayer.defaultProps = {
  action: {
    removePanel: () => false,
  },
  isActive: false,
  tableMode: false,
};

export default OptionLayer;
