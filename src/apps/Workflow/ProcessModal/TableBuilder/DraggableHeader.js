import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: ${({ count }) => (count > 0 ? `calc(100% / ${count})` : '100%')};

  .header {
    min-width: 100px;
    border: 1px solid #e9e9e9;
    padding: 0.75rem;
    text-align: center;
  }

  .column {
    height: 50px;
    border: 1px solid #e9e9e9;
    padding: 0.75rem;
  }
`;

const DraggableHeader = ({ headerKey, label, isDragging, provided, action, info, totalCount }) => (
  <Wrapper ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} count={totalCount || 0}>
    <div className="header">{label}</div>
    <Droppable droppableId={`${headerKey}-column`} type="column-item">
      {(dropProvided, dropSnapshot) => (
        <div {...dropProvided.droppableProps} ref={dropProvided.innerRef} className="column">
          {info ? info.column : ''}
          {dropProvided.placeholder}
        </div>
      )}
    </Droppable>
  </Wrapper>
);

export default DraggableHeader;
