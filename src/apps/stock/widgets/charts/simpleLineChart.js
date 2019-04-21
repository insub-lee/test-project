import React, { Component } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import ChartWrapper from '../chart.style';

export default class SimpleLineChart extends Component {

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
				<Legend />
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
        <LineChart
          width={width}
          height={height}
          data={datas}
          margin={{ top: 10, right: 40, left: 0, bottom: 0 }}
          style={{ fontSize:fontSize }}
        >
          <XAxis dataKey={XdataKey} stroke={colors[0]} />
          <YAxis stroke={colors[1]} domain={[dataMin - 1000, dataMax + 1000]} tickFormatter={formatYAxis} />
          <CartesianGrid strokeDasharray="1" vertical={false} />
          {this.setTooltip(isTooltip)}
          {this.setLegend(isLegend)}
          <Line
            type={type}
            dataKey={YdataKey}
            stroke={colors[2]}
            activeDot={{ r: 8 }}
          />
          {/* <Line type="monotone" dataKey="uv" stroke={colors[1]} /> */}
        </LineChart>
      </ChartWrapper>
    );
  }
}

