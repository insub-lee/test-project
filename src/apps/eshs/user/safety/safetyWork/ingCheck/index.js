import React from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Styeld from './Styled';
import CheckPage from './page';

/*
    안전지킴이 - 안전작업신청 - 작업중 점검 등록
*/

const ingCheck = props => (
  <Styeld>
    <BizMicroDevBase component={CheckPage} sagaKey="safetyWork_ingCheck" workNo={props.workNo} pageType={props.pageType} />
  </Styeld>
);

ingCheck.propTypes = {
  workNo: PropTypes.string,
  pageType: PropTypes.string,
};

export default ingCheck;
