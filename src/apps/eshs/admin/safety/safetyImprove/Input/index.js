import React from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import InputComp from 'apps/eshs/admin/safety/safetyImprove/comp/InputComp';

const Input = ({ reqNo }) => <BizMicroDevBase sagaKey="safetyImproveInput" component={InputComp} reqNo={reqNo} />;

Input.propTypes = {
  reqNo: PropTypes.string,
};
Input.defaultProps = {
  reqNo: '',
};
export default Input;
