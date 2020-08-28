import React from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import ListComp from 'apps/eshs/admin/safety/safetyImprove/comp/ListComp';

const MeasutesReport = ({ reqNo }) => <BizMicroDevBase sagaKey="safetyImproveMeasutesReport" component={ListComp} reqNo={reqNo} />;

MeasutesReport.propTypes = {
  reqNo: PropTypes.string,
};
MeasutesReport.defaultProps = {
  reqNo: '',
};
export default MeasutesReport;
