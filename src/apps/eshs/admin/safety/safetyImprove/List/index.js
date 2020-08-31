import React from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import ListComp from 'apps/eshs/admin/safety/safetyImprove/comp/ListComp';

const List = ({ reqNo }) => <BizMicroDevBase sagaKey="safetyImproveList" component={ListComp} reqNo={reqNo} />;

List.propTypes = {
  reqNo: PropTypes.string,
};
List.defaultProps = {
  reqNo: '',
};
export default List;
