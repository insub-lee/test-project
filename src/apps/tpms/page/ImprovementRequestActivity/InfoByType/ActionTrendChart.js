import React from 'react';
import PropTypes from 'prop-types';
import StackedBarChart from '../../../components/Chart/StackedBarChart';

const ActionTrendChart = ({ info }) => <StackedBarChart data={info} />;

ActionTrendChart.propTypes = {
  info: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.number),
  }),
};

ActionTrendChart.defaultProps = {
  info: {
    labels: [],
    data: [],
  },
};

export default ActionTrendChart;
