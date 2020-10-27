import React from 'react';
import PropTypes from 'prop-types';
import StyledChart from './StyledChart';
import HorizontalBarChart from './HorizontalBarChart';
import LineChart from './LineChart';
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';

const renderChart = (type, data) => {
  switch (type) {
    case 'horizontalBar': {
      const { colors, datasets, labels } = data;
      const chartDatasets = datasets.map(dataset => ({
        data: dataset.data,
        backgroundColor: colors.map(color => `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`),
        hoverBackgroundColor: colors.map(color => `rgba(${color.r}, ${color.g}, ${color.b}, ${0.6})`),
      }));
      return <HorizontalBarChart data={{ datasets: chartDatasets, labels }} />;
    }
    case 'line': {
      return <LineChart data={data} />;
    }
    case 'bar': {
      const { colors, datasets, labels } = data;
      const chartDatasets = datasets.map(dataset => ({
        data: dataset.data,
        backgroundColor: colors.map(color => `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`),
      }));
      return <BarChart data={{ datasets: chartDatasets, labels }} />;
    }
    case 'doughnut': {
      const { colors, datasets, labels } = data;
      const chartDatasets = datasets.map(dataset => ({
        data: dataset.data,
        backgroundColor: colors.map(color => `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`),
      }));
      return <DoughnutChart data={{ datasets: chartDatasets, labels }} />;
    }
    default:
      return null;
  }
};

const Chart = ({ title, type, data, onSetting, noTitle }) => (
  <StyledChart className="chart">
    {!noTitle && (
      <div className="title">
        {title}
        <div className="actions">
          {!onSetting && (
            <button type="button">
              <i className="fas fa-ellipsis-v fa-lg" />
            </button>
          )}
        </div>
      </div>
    )}
    <div className="content">
      <div>{renderChart(type, data)}</div>
    </div>
  </StyledChart>
);

Chart.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  data: PropTypes.shape({
    datasets: PropTypes.array,
    labels: PropTypes.array,
  }).isRequired,
  onSetting: PropTypes.bool,
  noTitle: PropTypes.bool,
};

Chart.defaultProps = {
  title: '',
  onSetting: false,
  noTitle: false,
};

export default Chart;
