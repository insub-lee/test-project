import React from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import DraggableItem from './DraggableItem';

const ItemBody = ({ items }) => (
  <Droppable droppableId="items" type="column-item" isDropDisabled>
    {(dropProvided, dropSnapshot) => (
      <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
        {items.map((item, index) => (
          <Draggable key={`item-${item.column}`} index={index} draggableId={`item-${item.column}`}>
            {(dragProvided, dragSnapshot) => (
              <DraggableItem key={`item-${item.column}`} item={item} isDragging={dragSnapshot.isDragging} provided={dragProvided} />
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
