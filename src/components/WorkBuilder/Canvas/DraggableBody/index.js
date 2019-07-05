import React from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import DraggableItem from '../DraggableItem';

const DraggableBody = ({ property: { boxes, groups, formStuffs }, viewTargetId, action }) => (
  <Droppable droppableId="layers" type="layer">
    {(dropProvided, dropSnapshot) => (
      <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
        {boxes.map((box, index) => (
          <Draggable key={box.id} index={index} draggableId={box.id}>
            {(dragProvided, dragSnapshot) => (
              <DraggableItem
                key={box.id}
                panelIndex={index}
                property={{ box, formStuffs: formStuffs.filter(({ parentId }) => parentId === box.id) }}
                isDragging={dragSnapshot.isDragging}
                provided={dragProvided}
                id={box.id}
                action={action}
                viewTargetId={viewTargetId}
              />
            )}
          </Draggable>
        ))}
        {dropProvided.placeholder}
      </div>
    )}
  </Droppable>
);

DraggableBody.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  action: PropTypes.object,
  viewTargetId: PropTypes.string,
  property: PropTypes.shape({
    boxes: PropTypes.arrayOf(PropTypes.object),
    formStuffs: PropTypes.arrayOf(PropTypes.object),
  }),
};

DraggableBody.defaultProps = {
  items: [],
  action: {},
  viewTargetId: '',
  property: {
    boxes: [],
    formStuffs: [],
  },
};

export default DraggableBody;
