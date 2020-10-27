import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const options = {
  responsive: true,
  legend: {
    display: true,
  },
  tooltips: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        stacked: true,
        ticks: {
          display: true,
          autoSkip: false,
        },
        maxBarThickness: 300,
      },
    ],
    yAxes: [
      {
        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
        display: true,
        position: 'left',
        // id: 'y-axis-1',
        gridLines: {
          display: false,
        },
        ticks: {
          beginAtZero: true,
        },
        stacked: true,
      },
    ],
  },
};

const StackedBarChart = ({ data }) => <Bar data={data} options={options} />;

StackedBarChart.propTypes = {
  data: PropTypes.shape({
    datasets: PropTypes.array,
    labels: PropTypes.array,
  }).isRequired,
};

export default StackedBarChart;
