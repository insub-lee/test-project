import React from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import BfCheckPage from './page';

/*
    안전지킴이 - 안전작업신청 - 작업중 점검 등록
    pageType - main / sub (주작업, 보충작업)
*/

const bfCheck = props => <BizMicroDevBase component={BfCheckPage} sagaKey="safetyWork_bfCheck" initFormData={props.initFormData} pageType={props.pageType} />;

bfCheck.propTypes = {
  initFormData: PropTypes.object,
  pageType: PropTypes.string,
};

export default bfCheck;
