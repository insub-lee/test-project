import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const options = {
  responsive: true,
  legend: {
    display: false,
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
        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
        display: true,
        position: 'left',
        id: 'y-axis-1',
        gridLines: {
          display: false,
        },
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const BarChart = ({ data }) => <Bar data={data} options={options} />;

BarChart.propTypes = {
  data: PropTypes.shape({
    datasets: PropTypes.array,
    labels: PropTypes.array,
  }).isRequired,
};

export default BarChart;
