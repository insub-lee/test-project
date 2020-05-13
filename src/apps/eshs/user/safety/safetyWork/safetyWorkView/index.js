import React from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import safetyWorkWrite from './page';

/*
    안전지킴이 - 안전작업신청 - 안전작업 View
*/

const safetyWorkView = props => <BizMicroDevBase component={safetyWorkWrite} sagaKey="safetyWork_view" workNo={props.workNo} pageType={props.pageType} />;

safetyWorkView.propTypes = {
  workNo: PropTypes.string,
  pageType: PropTypes.string,
};

export default safetyWorkView;
