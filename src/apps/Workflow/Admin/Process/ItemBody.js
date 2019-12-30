import React from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import DraggableItem from './DraggableItem';

const ItemBody = ({ items, activeStep, action }) => (
  <Droppable droppableId="process" type="column-item" isDropDisabled={false}>
    {(dropProvided, dropSnapshot) => (
      <div {...dropProvided.droppableProps} ref={dropProvided.innerRef} style={{ height: '380px' }}>
        {items.map((item, index) => (
          <Draggable key={`item-${item.column}-${index}`} index={index} draggableId={`${item.column}-${index}`}>
            {(dragProvided, dragSnapshot) => (
              <DraggableItem
                key={`item-${item.column}`}
                item={item}
                isDragging={dragSnapshot.isDragging}
                provided={dragProvided}
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
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeStep: PropTypes.number.isRequired,
  action: PropTypes.object.isRequired,
};

export default ItemBody;
