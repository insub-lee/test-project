import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import ChartWrapper from '../chart.style';

export default class LineBarAreaComposedChart extends PureComponent {
  render() {
    const {
      datas, width, height, colors,
    } = this.props;
    return (
      <ChartWrapper className="isoChartWrapper">
        <ComposedChart
          width={width}
          height={height}
          data={datas}
          margin={{
            top: 10, right: 10, bottom: 10, left: 10,
          }}
        >
          <XAxis dataKey="name" stroke={colors[3]} />
          <YAxis stroke={colors[3]} />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Area
            type="monotone"
            dataKey="amt"
            fill={colors[0]}
            stroke={colors[0]}
          />
          <Bar dataKey="pv" barSize={20} fill={colors[1]} />
          <Line type="monotone" dataKey="uv" stroke={colors[3]} />
        </ComposedChart>
      </ChartWrapper>
    );
  }
}

LineBarAreaComposedChart.propTypes = {
  datas: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  colors: PropTypes.array.isRequired,
};
