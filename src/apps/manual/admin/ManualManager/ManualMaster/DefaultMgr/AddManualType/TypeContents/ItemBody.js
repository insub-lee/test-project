import React from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import DraggableItem from './DraggableItem';

const ItemBody = ({ items, action }) => (
  <Droppable droppableId="compareTempletContent" type="column-item" isDropDisabled={false}>
    {(dropProvided, dropSnapshot) => (
      <div {...dropProvided.droppableProps} ref={dropProvided.innerRef} style={{ height: '330px' }}>
        {items.length > 0 &&
          items.map((item, index) => (
            <Draggable key={`ctContentItem-${item.ITEM_ID}-${index}`} index={index} draggableId={`${item.ITEM_ID}-${index}`}>
              {(dragProvided, dragSnapshot) => (
                <DraggableItem
                  key={`ctContentItem-${item.ITEM_ID}`}
                  item={item}
                  isDragging={dragSnapshot.isDragging}
                  provided={dragProvided}
                  itemIndex={index}
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
  action: PropTypes.object.isRequired,
};

export default ItemBody;
