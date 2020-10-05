import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import DiaryPage from './page';
import Styled from './Styled';

/*
    환경지킴이 - 용/폐수 - 관리 - 유량
*/
class WasteWaterDiary extends Component {
  componantDidMount() {}

  render() {
    return (
      <Styled>
        <BizMicroDevBase sagaKey="waste_water_diary" component={DiaryPage} relKey="용폐수일지" relKey2="OP_DT" prcId={111} />
      </Styled>
    );
  }
}

WasteWaterDiary.propTypes = {};
WasteWaterDiary.defaultProps = {};

export default WasteWaterDiary;
