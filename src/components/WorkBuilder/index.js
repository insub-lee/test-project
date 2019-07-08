import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';

import Styled from './Styled';
import Panels from './Panels';
import Canvas from './Canvas';

const WorkBuilder = ({ property: { canvasProperty, panelsProperty }, action: { canvasAction, panelsAction }, onDragEnd }) => (
  <div style={{ height: '100%', width: '100%' }}>
    <DragDropContext onDragEnd={onDragEnd}>
      <Styled>
        <div className="editor">
          <Canvas property={canvasProperty} action={canvasAction} />
          <Panels property={panelsProperty} action={panelsAction} />
        </div>
      </Styled>
    </DragDropContext>
  </div>
);

WorkBuilder.propTypes = {
  property: PropTypes.object,
  action: PropTypes.object,
  onDragEnd: PropTypes.func,
};

WorkBuilder.defaulProps = {
  property: {
    canvasProperty: {},
    panelsProperty: {},
  },
  action: {
    canvasAction: {},
    panelsAction: {},
  },
  onDragEnd: () => false,
};

export default WorkBuilder;
