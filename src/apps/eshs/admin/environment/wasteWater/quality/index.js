import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import QualityPage from './page';
import Styled from './Styled';

/*
    환경지킴이 - 용/폐수 - 관리 - 유량
*/
class WasteWaterQuality extends Component {
  componantDidMount() {}

  render() {
    return (
      <Styled>
        <BizMicroDevBase sagaKey="waste_water_quality" component={QualityPage} />
      </Styled>
    );
  }
}

WasteWaterQuality.propTypes = {};
WasteWaterQuality.defaultProps = {};

export default WasteWaterQuality;
