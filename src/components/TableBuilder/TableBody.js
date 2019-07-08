import React from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import DraggableHeader from './DraggableHeader';

const Wrapper = styled.div`
  display: flex;
  -webkit-box-align: start;
  align-items: start;
  overflow-y: auto;
`;

const TableBody = ({ headers, column, action }) => (
  <div>
    <Droppable droppableId="header" type="header-item" direction="horizontal">
      {(dropProvided, dropSnapshot) => (
        <Wrapper {...dropProvided.droppableProps} ref={dropProvided.innerRef} className="table-responsive">
          {headers.map((header, index) => (
            <Draggable key={`header-item-${header.seq}`} index={index} draggableId={`header-item-${header.seq}`} style={{ minWidth: 100 }}>
              {(dragProvided, dragSnapshot) => (
                <DraggableHeader
                  key={`header-item-${header.seq}`}
                  isDragging={dragSnapshot.isDragging}
                  provided={dragProvided}
                  action={action}
                  label={header.label}
                  headerKey={header.seq}
                  info={column[header.dataKey]}
                  totalCount={headers.length}
                />
              )}
            </Draggable>
          ))}
        </Wrapper>
      )}
    </Droppable>
  </div>
);

TableBody.propTypes = {
  column: PropTypes.object,
  headers: PropTypes.array,
};

TableBody.defaultProps = {
  column: {},
  headers: [],
};

export default TableBody;
