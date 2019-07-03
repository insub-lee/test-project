import React from 'react';

const DraggableColumn = ({ isDragging, provided, action }) => (
  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
    WaWa
  </div>
);

export default DraggableColumn;
