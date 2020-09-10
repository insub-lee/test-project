import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import ActInfoStatusPage from './page';
import Styled from './Styled';

/*
    환경지킴이 - 용/폐수 - 현황 - 처리장별 가동시간 현황
*/
class ActInfoStatus extends Component {
  componantDidMount() {}

  render() {
    return (
      <Styled>
        <BizMicroDevBase sagaKey="actInfo_status" component={ActInfoStatusPage} />
      </Styled>
    );
  }
}

ActInfoStatus.propTypes = {};
ActInfoStatus.defaultProps = {};

export default ActInfoStatus;
