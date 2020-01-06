import React from 'react';

import DraggableStyled from './DraggableStyled';

const DraggableItem = ({ item, isDragging, provided, dropId, itemIndex, action }) => (
  <DraggableStyled className="" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
    {dropId === 'process' && (
      <>
        <button type="button" style={{ position: 'absolute', background: '#fff', right: '10px' }} onClick={() => action.removeItem(itemIndex)}>
          X
        </button>
      </>
    )}
    <span>
      {dropId === 'process' ? `${item.step} - ` : ``}
      {item.title}
    </span>
  </DraggableStyled>
);

export default DraggableItem;
