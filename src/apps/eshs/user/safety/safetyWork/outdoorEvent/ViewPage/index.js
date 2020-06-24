import React from 'react';
// import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import ModifyPage from './page';
import ModifyCustomButtons from '../CustomButtons/ModifyCustomButtons';

/*
    안전지킴이 - 야외행사승인신청서 - 야외행사 수립 승인
*/

const outdoorEvent = () => (
  <BizBuilderBase
    sagaKey="outdoorEvent"
    viewType="MODIFY"
    workSeq={4821}
    modifyMetaSeq={12921}
    CustomModifyPage={ModifyPage}
    ModifyCustomButtons={ModifyCustomButtons}
  />
);

export default outdoorEvent;
