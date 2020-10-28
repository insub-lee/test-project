import React from 'react';
import PropTypes from 'prop-types';
import StackedBarChart from '../../../components/Chart/StackedBarChart';

const RegistTrendChart = ({ info }) => <StackedBarChart data={info} />;

RegistTrendChart.propTypes = {
  info: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.number),
  }),
};

RegistTrendChart.defaultProps = {
  info: {
    labels: [],
    data: [],
  },
};

export default RegistTrendChart;
