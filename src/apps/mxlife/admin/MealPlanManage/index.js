import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import mealPlanPage from './page';
import Styled from './Styled';

/*
    MXLIFE - 주간메뉴 관리
*/

const mealPlanManage = () => (
  <Styled>
    <BizMicroDevBase component={mealPlanPage} sagaKey="mealPlanManage" />
  </Styled>
);

export default mealPlanManage;
