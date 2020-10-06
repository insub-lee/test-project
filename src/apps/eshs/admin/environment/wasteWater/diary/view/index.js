import React from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import DiaryPageView from './page';
import Styled from './Styled';

/*
    환경지킴이 - 용/폐수 - 일지(뷰전용)
*/

const WasteWaterDiaryView = props => (
  <Styled>
    <BizMicroDevBase sagaKey="WW_DIARY_VIEW" component={DiaryPageView} opDt={props.opDt} />
  </Styled>
);

WasteWaterDiaryView.propTypes = {
  opDt: PropTypes.string,
};

export default WasteWaterDiaryView;
