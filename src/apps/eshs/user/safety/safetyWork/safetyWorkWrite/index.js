import React from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Styeld from './Styled';
import safetyWorkWrite from './page';

/*
    안전지킴이 - 안전작업신청 - 안전작업 신청
*/

const safetyWork = ({ workNo, isWorkFlow }) => (
  <Styeld>
    <BizMicroDevBase
      component={safetyWorkWrite}
      workNo={workNo}
      isWorkFlow={isWorkFlow}
      relKey="안전작업허가(작업부서)"
      relKey2="WORK_NO"
      sagaKey="safetyWork"
      prcId={110}
    />
  </Styeld>
);

safetyWork.propTypes = {
  workNo: PropTypes.string,
  isWorkFlow: PropTypes.bool,
};

safetyWork.defaultProps = {
  workNo: undefined,
  isWorkFlow: false,
};

export default safetyWork;
