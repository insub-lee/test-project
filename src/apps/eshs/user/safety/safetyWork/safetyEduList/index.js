import React from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Styeld from './Styled';
import SafetyEduList from './page';

/*
    안전지킴이 - 안전작업 현황 - 안전교육 이수 현황
*/

const safetyEduList = props => (
  <Styeld>
    <BizMicroDevBase component={SafetyEduList} sagaKey="safetyEduList" workNo={props.workNo} pageType={props.pageType} />
  </Styeld>
);

safetyEduList.propTypes = {
  workNo: PropTypes.string,
  pageType: PropTypes.string,
};

export default safetyEduList;
