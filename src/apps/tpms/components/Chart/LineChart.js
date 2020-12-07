import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const options = {
  responsive: true,
  legend: {
    display: true,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
  },
};

const LineChart = ({ data }) => <Line data={data} options={options} />;

LineChart.propTypes = {
  data: PropTypes.shape({
    datasets: PropTypes.array,
    labels: PropTypes.array,
  }).isRequired,
};

export default LineChart;
