import React from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import DraggableItem from './DraggableItem';

const ItemBody = ({ items, dropId, activeStep, action }) => (
  <Droppable droppableId={dropId} type="column-item" isDropDisabled={dropId === 'node'}>
    {(dropProvided, dropSnapshot) => (
      <div {...dropProvided.droppableProps} ref={dropProvided.innerRef} style={{ height: '300px' }}>
        {items.map((item, index) => (
          <Draggable key={`item-${item.column}-${index}`} index={index} draggableId={`${dropId}-${item.column}-${index}`}>
            {(dragProvided, dragSnapshot) => (
              <DraggableItem
                key={`item-${item.column}`}
                item={item}
                isDragging={dragSnapshot.isDragging}
                provided={dragProvided}
                dropId={dropId}
                itemIndex={index}
                activeStep={activeStep}
                action={action}
              />
            )}
          </Draggable>
        ))}
        {dropProvided.placeholder}
      </div>
    )}
  </Droppable>
);

ItemBody.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

ItemBody.defaultProps = {
  items: [],
};

export default ItemBody;
