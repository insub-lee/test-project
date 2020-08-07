import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import TotalPage from './page';
import Styled from './Styled';

/*
    환경지킴이 - 용/폐수 - 관리 - 총량
*/
class WasteWaterTotal extends Component {
  componantDidMount() {}

  render() {
    return (
      <Styled>
        <BizMicroDevBase sagaKey="waste_water_total" component={TotalPage} />
      </Styled>
    );
  }
}

WasteWaterTotal.propTypes = {};
WasteWaterTotal.defaultProps = {};

export default WasteWaterTotal;
