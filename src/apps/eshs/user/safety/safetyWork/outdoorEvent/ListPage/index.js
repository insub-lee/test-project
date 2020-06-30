import React from 'react';
// import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import ListCustomButtons from '../CustomButtons/ListCustomButtons';
import ModifyCustomButtons from '../CustomButtons/ModifyCustomButtons';
import ListPage from './page';

/*
    안전지킴이 - 야외행사승인신청서 - 신청/승인 목록
*/

const outdoorEvent = () => (
  <BizBuilderBase
    sagaKey="outdoorEvent"
    viewType="LIST"
    workSeq={4821}
    modalTitle="야외행사 신청 정보"
    CustomListPage={ListPage}
    viewChangeSeqByModal={38}
    ModifyCustomButtons={ModifyCustomButtons}
    ListCustomButtons={ListCustomButtons}
  />
);

// roadmapList.propTypes = {};
export default outdoorEvent;
