import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import RatePage from './page';
import Styled from './Styled';

/*
    환경지킴이 - 용/폐수 - 관리 - Rate
*/
class WasteWaterRate extends Component {
  componantDidMount() {}

  render() {
    return (
      <Styled>
        <BizMicroDevBase sagaKey="waste_water_rate" component={RatePage} />
      </Styled>
    );
  }
}

WasteWaterRate.propTypes = {};
WasteWaterRate.defaultProps = {};

export default WasteWaterRate;
