import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import ExhaustMgtPage from './page';
import Styled from './Styled';

/*
    환경지킴이 - 용/폐수 - 등록 - 배출시설
*/
class ExhaustMgt extends Component {
  componantDidMount() {}

  render() {
    return (
      <Styled>
        <BizMicroDevBase sagaKey="ww_exhaust_mgt" component={ExhaustMgtPage} />
      </Styled>
    );
  }
}

ExhaustMgt.propTypes = {};
ExhaustMgt.defaultProps = {};

export default ExhaustMgt;
