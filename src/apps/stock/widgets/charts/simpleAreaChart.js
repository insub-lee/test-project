import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import ChartWrapper from '../chart.style';

export default class SimpleAreaChart extends Component {

	setTooltip = isTooltip => {
		if(isTooltip) {
			return(
				<Tooltip />
			);
		}
  }

  setLegend = isLegend => {
    if(isLegend) {
			return(
				<Legend margin={{ top: 0, right: 0, left: 0, bottom: 0 }} />
			);
		}
  }

  // 숫자에 콤마 찍는 정규식(3자리)
  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

	render() {
		const {
      datas,
      width,
      height,
      colors,
      isTooltip,
      XdataKey,
      YdataKey,
      type,
      isLegend,
      dataMin,
      dataMax,
      fontSize
    } = this.props;

    const formatYAxis = (tickItem) => {
      return this.numberWithCommas(tickItem);
    }

    return (
      <ChartWrapper className="isoChartWrapper">
        <AreaChart
          width={width}
          height={height}
          data={datas}
          margin={{ top: 20, right: 40, left: 0, bottom: 0 }}
          style={{ fontSize:fontSize }}
        >
          <XAxis dataKey={XdataKey} stroke={colors[0]} />
          <YAxis stroke={colors[1]} domain={[dataMin - 1000, dataMax + 1000]} tickFormatter={formatYAxis} />
          <CartesianGrid strokeDasharray="1" vertical={false} />
          {this.setTooltip(isTooltip)}
          {this.setLegend(isLegend)}
          <Area
            type={type}
            dataKey={YdataKey}
            stroke={colors[2]}
            fill={colors[3]}
          />
        </AreaChart>
      </ChartWrapper>
    );
  }
}

SimpleAreaChart.propTypes = {
  datas: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  colors: PropTypes.array.isRequired,
};

