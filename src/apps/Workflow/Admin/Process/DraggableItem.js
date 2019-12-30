import React from 'react';
import PropTypes from 'prop-types';

import DraggableStyled from './DraggableStyled';

const getStepTypeNm = stepType => {
  let stepTypeNm = '';
  if (stepType === 'U') stepTypeNm = '사용자';
  else if (stepType === 'D') stepTypeNm = '부서';
  else if (stepType === 'G') stepTypeNm = '그룹';

  return stepTypeNm;
};

const DraggableItem = ({ item, provided, itemIndex, activeStep, action }) => (
  <DraggableStyled className={item.STEP === activeStep ? 'active' : ''} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
    <button type="button" style={{ position: 'absolute', background: '#fff', right: '10px' }} onClick={() => action.removeItem(itemIndex)}>
      X
    </button>
    <button type="button" style={{ background: '#fff' }} onClick={() => action.onActiveStep(item)}>
      <span>
        {item.STEP}단계({getStepTypeNm(item.STEP_TYPE)}) - {item.stepUsersName}
      </span>
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
