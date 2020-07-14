import React from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import ListPage from './list';

const UsageManagement = ({ startDate, endDate }) => <BizMicroDevBase sagaKey="UsageManagement" component={ListPage} startDate={startDate} endDate={endDate} />;

UsageManagement.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};

export default UsageManagement;
