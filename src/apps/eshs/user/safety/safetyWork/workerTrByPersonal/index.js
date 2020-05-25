import React from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Styeld from './Styled';
import WorkerTrPersonal from './page';

/*
    안전지킴이 - 안전작업신청 - 작업중 점검 등록
*/

const workerTrPersonal = props => (
  <Styeld>
    <BizMicroDevBase component={WorkerTrPersonal} sagaKey="workerTrPersonal" workNo={props.workNo} pageType={props.pageType} />
  </Styeld>
);

workerTrPersonal.propTypes = {
  workNo: PropTypes.string,
  pageType: PropTypes.string,
};

export default workerTrPersonal;
