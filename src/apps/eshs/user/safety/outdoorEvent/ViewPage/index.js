import React from 'react';
// import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import ViewCustomButtons from '../CustomButtons/ViewCustomButtons';

/*
    안전지킴이 - 야외행사승인신청서 - 야외행사 수립 승인
*/

const outdoorEvent = () => <BizBuilderBase sagaKey="outdoorEvent" viewType="VIEW" workSeq={4821} ViewCustomButton={ViewCustomButtons} />;

export default outdoorEvent;
