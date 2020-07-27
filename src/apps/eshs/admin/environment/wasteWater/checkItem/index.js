import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import CheckItemPage from './page';
import Styled from './Styled';

/*
    환경지킴이 - 용/폐수 - 관리 - 유량
*/
class WasteWaterFlow extends Component {
  componantDidMount() {}

  render() {
    return (
      <Styled>
        <BizMicroDevBase sagaKey="waste_water_check_item" component={CheckItemPage} />
      </Styled>
    );
  }
}

WasteWaterFlow.propTypes = {};
WasteWaterFlow.defaultProps = {};

export default WasteWaterFlow;
