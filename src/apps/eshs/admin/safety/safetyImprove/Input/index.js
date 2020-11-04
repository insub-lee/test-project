import React from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import InputComp from 'apps/eshs/admin/safety/safetyImprove/comp/InputComp';

const Input = ({ reqNo }) => (
  <BizMicroDevBase sagaKey="safetyImproveInput" component={InputComp} reqNo={reqNo} prcId={117} relKey="안전개선 요청" relKey2="REQ_NO" />
);

Input.propTypes = {
  reqNo: PropTypes.string,
};
Input.defaultProps = {
  reqNo: '',
};
export default Input;
