import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const options = {
  responsive: true,
};

const DoughnutChart = ({ data }) => <Doughnut data={data} options={options} />;

DoughnutChart.propTypes = {
  data: PropTypes.shape({
    datasets: PropTypes.array,
    labels: PropTypes.array,
  }).isRequired,
};
export default DoughnutChart;
