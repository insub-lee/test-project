import React from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Styeld from './Styled';
import safetyWorkWrite from './page';

/*
    안전지킴이 - 안전작업신청 - 안전작업 신청
*/

const safetyWork = ({ workNo, isWorkFlow, authority }) => (
  <Styeld>
    <BizMicroDevBase
      component={safetyWorkWrite}
      workNo={workNo}
      isWorkFlow={isWorkFlow}
      authority={authority}
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
  authority: PropTypes.array, // 페이지 권한정보
};

safetyWork.defaultProps = {
  workNo: undefined,
  isWorkFlow: false,
  authority: ['V'], // 권한 기본 'View'
};

export default safetyWork;
