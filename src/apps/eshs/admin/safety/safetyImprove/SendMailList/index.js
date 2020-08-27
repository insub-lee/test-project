import React from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import SendMailListComp from 'apps/eshs/admin/safety/safetyImprove/comp/SendMailListComp';

const SendMailList = ({ reqNo, isAdmin }) => (
  <BizMicroDevBase sagaKey="safetyImproveSendMailList" component={SendMailListComp} reqNo={reqNo} isAdmin={isAdmin} />
);

SendMailList.propTypes = {
  reqNo: PropTypes.string,
  isAdmin: PropTypes.bool,
};
SendMailList.defaultProps = {
  reqNo: '',
  // TODO : 권한추가후 isAdmin flag적용
  isAdmin: true, // 시스템 관리자 flag (관리자일경우 요청자, 조치자 검색가능, 관리자가 아닐경우 자신과 관련된 데이터만 볼 수 있음)
};
export default SendMailList;
