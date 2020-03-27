import React from 'react';
// import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import ListCustomButtons from '../CustomButtons/ListCustomButtons';
import ModifyCustomButtons from '../CustomButtons/ModifyCustomButtons';

const outdoorEvent = () => (
  <BizBuilderBase
    sagaKey="outdoorEvent"
    viewType="LIST"
    workSeq={4821}
    viewChangeSeqByModal={38}
    ModifyCustomButtons={ModifyCustomButtons}
    ListCustomButtons={ListCustomButtons}
  />
);

// roadmapList.propTypes = {};
export default outdoorEvent;
