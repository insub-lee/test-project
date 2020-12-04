import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const options = {
  responsive: true,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
        gridLines: {
          display: false,
        },
        ticks: {
          beginAtZero: true,
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

const HorizontalBarChart = ({ data }) => <HorizontalBar data={data} options={options} />;

HorizontalBarChart.propTypes = {
  data: PropTypes.shape({
    datasets: PropTypes.array,
    labels: PropTypes.array,
  }).isRequired,
};

export default HorizontalBarChart;
