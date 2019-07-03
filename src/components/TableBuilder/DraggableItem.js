import React from 'react';

import DraggableStyled from './DraggableStyled';

const DraggableItem = ({ item, isDragging, provided }) => (
  <DraggableStyled className="" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
    {item.title}
  </DraggableStyled>
);

export default DraggableItem;
