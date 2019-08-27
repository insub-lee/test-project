import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import DraggableStyled from './DraggableStyled';

const DraggableItem = ({ item, provided, action }) => (
  <DraggableStyled ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
    <Input onChange={e => action.setCtContentName(item.ITEM_IDX, e.target.value)} value={item.ITEM_NAME || ''} />
    <button type="button" style={{ position: 'absolute', background: '#fff', right: '10px' }} onClick={() => action.removeCtContentItem(item.ITEM_IDX)}>
      X
    </button>
  </DraggableStyled>
);

DraggableItem.propTypes = {
  item: PropTypes.object.isRequired,
  provided: PropTypes.object.isRequired,
  itemIndex: PropTypes.number.isRequired,
  activeStep: PropTypes.number.isRequired,
  action: PropTypes.object.isRequired,
};

export default DraggableItem;
