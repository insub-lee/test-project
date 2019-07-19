import React from 'react';
import PropTypes from 'prop-types';

import Styled from './Styled';

const Layers = ({ boxes, formStuffs, viewTargetId, action: { activeLayer, disableLayers } }) => (
  <Styled>
    <div className={`layer ${viewTargetId === '' ? 'active' : ''}`} onClick={disableLayers} role="button" onKeyPress={() => false} tabIndex="0">
      <i className="layer-vis fa fa-eye" />
      <div className="layer-title">
        <div className="layer-title-inn">
          <span className="layer-name layer-name--no-edit">Body</span>
        </div>
      </div>
    </div>
    {boxes.map(box => (
      <React.Fragment key={box.id}>
        <div
          key={box.id}
          className={`layer ${viewTargetId === box.id ? 'active' : ''}`}
          onClick={() => activeLayer(box.id, box.type, true)}
          role="button"
          onKeyPress={() => false}
          tabIndex="0"
        >
          <i className="layer-vis fa fa-eye" />
          <div className="layer-title">
            <div className="layer-title-inn">
              <span className="layer-name layer-name--no-edit">{box.property.label}</span>
            </div>
          </div>
        </div>
        {formStuffs
          .filter(formStuff => formStuff.parentId === box.id)
          .map(formStuff => (
            <div
              key={formStuff.id}
              className={`layer ${viewTargetId === formStuff.id ? 'active' : ''}`}
              onClick={() => activeLayer(formStuff.id, formStuff.type, true)}
              role="button"
              onKeyPress={() => false}
              tabIndex="0"
            >
              <i className="layer-vis fa fa-eye" />
              <div className="layer-title">
                <div className="layer-title-inn">
                  <span className="layer-name layer-name--no-edit layer-form-stuff">{`${formStuff.property.label}`}</span>
                </div>
              </div>
            </div>
          ))}
      </React.Fragment>
    ))}
  </Styled>
);

Layers.propTypes = {
  boxes: PropTypes.arrayOf(PropTypes.object),
  formStuffs: PropTypes.arrayOf(PropTypes.object),
  action: PropTypes.object,
  viewTargetId: PropTypes.string,
};

Layers.defaultProps = {
  boxes: [],
  formStuffs: [],
  action: {},
  viewTargetId: '',
};

export default Layers;
