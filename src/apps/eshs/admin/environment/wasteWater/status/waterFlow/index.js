import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import WaterFlowStatus from './page';
import Styled from './Styled';

/*
    환경지킴이 - 용/폐수 - 현황 - 유량
*/
class WasteWaterQuality extends Component {
  componantDidMount() {}

  render() {
    return (
      <Styled>
        <BizMicroDevBase sagaKey="waterFlow_status" component={WaterFlowStatus} />
      </Styled>
    );
  }
}

WasteWaterQuality.propTypes = {};
WasteWaterQuality.defaultProps = {};

export default WasteWaterQuality;
