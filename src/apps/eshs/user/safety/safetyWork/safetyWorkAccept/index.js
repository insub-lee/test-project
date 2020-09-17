import React from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Styeld from './Styled';
import safetyWorkAceeptPage from './page';

/*
    안전지킴이 - 안전작업신청 - 안전작업 허가
*/

const safetyWorkView = ({ workNo, isWorkFlow }) => (
  <Styeld>
    <BizMicroDevBase component={safetyWorkAceeptPage} sagaKey="safetyWork_accept" workNo={workNo} isWorkFlow={isWorkFlow} />
  </Styeld>
);

// safetyWorkView.propTypes = {};

safetyWorkView.propTypes = {
  workNo: PropTypes.string,
  isWorkFlow: PropTypes.bool,
};

safetyWorkView.defaultProps = {
  workNo: undefined,
  isWorkFlow: false,
};

export default safetyWorkView;
