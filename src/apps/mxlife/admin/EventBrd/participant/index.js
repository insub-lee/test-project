import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import ListPage from './page/ListPage';

/*
    안전지킴이 - 안전작업신청 - 작업중 점검 등록
*/

const Styled = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 20px;
`;

const eventParticipant = props => (
  <Styled>
    <BizMicroDevBase initData={props.initData} component={ListPage} sagaKey="mxlife_event_participant" />
  </Styled>
);

eventParticipant.propTypes = {
  initData: PropTypes.object,
};

eventParticipant.defaultProps = {};

export default eventParticipant;
