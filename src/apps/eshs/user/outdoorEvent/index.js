import React from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import ModifyCustomButtons from './CustomButtons/ModifyCustomButtons';

const emptyButtons = () => <div />;

const outdoorEvent = () => (
  <BizBuilderBase sagaKey="outdoorEvent" viewType="INPUT" workSeq={4821} ModifyCustomButtons={ModifyCustomButtons} ListCustomButtons={emptyButtons} />
);

export default outdoorEvent;
