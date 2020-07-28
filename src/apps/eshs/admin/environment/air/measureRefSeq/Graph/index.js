import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class Graph extends Component {
  // static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';
  calculate = (gasCd, hourFlow, density, workDay, gasWeight) => {
    let calculateData;
    switch (gasCd) {
      case 'HCl':
      case 'HF':
      case 'HCHO':
      case '벤젠':
      case '페놀':
      case 'NH3':
      case 'Sox':
      case 'Nox':
      case 'THC':
        calculateData = ((hourFlow * density) / 22.4 / 1000000) * gasWeight * 24 * workDay;
        break;
      case 'Cr':
      case 'Pb':
      case 'Ni':
      case 'As':
      case '먼지':
        calculateData = ((hourFlow * density) / 1000000) * 24 * workDay;
        break;
      default:
        calculateData = density;
        break;
    }
    return calculateData;
  };

  render() {
    const { graphData, gasList, selectGubun, refStack } = this.props;
    const graphList = graphData && graphData.map(gasData => gasData && gasData.GAS && gasData.GAS.map(item => JSON.parse(item.value)));
    let barData;
    if (selectGubun === 2) {
      barData =
        graphList &&
        graphList.map(temps =>
          temps.map(element => ({
            name: element[refStack ? 'MEASURE_DT' : 'STACK_CD'],
            [element.GAS_CD]: this.calculate(element.GAS_CD, element.HOUR_FLOW, element.DENSITY, element.WORK_DAY, element.GAS_WEIGHT),
          })),
        );
    } else {
      barData =
        graphList &&
        graphList.map(temps =>
          temps.map(element => ({
            name: element[refStack ? 'MEASURE_DT' : 'STACK_CD'],
            [element.GAS_CD]: element.DENSITY || 0,
          })),
        );
    }
    console.debug('graphList ', graphList);
    console.debug('refStack ', refStack);
    console.debug('graphData ', graphData);
    console.debug('barData ', barData);
    console.debug('data ', barData && barData.map(i => i.reduce((result, item) => ({ ...result, ...item }), {})));
    return (
      <BarChart
        width={1000}
        height={600}
        data={barData && barData.map(i => i.reduce((result, item) => ({ ...result, ...item }), {}))}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {gasList &&
          gasList.map((item, index) => <Bar dataKey={item.GAS_CD} stackId="a" fill={`#${Math.floor(((index + 10) / 100) * 16777215).toString(16)}`} />)}
      </BarChart>
    );
  }
}

Graph.propTypes = {
  gasList: PropTypes.array,
  graphData: PropTypes.array,
  selectGubun: PropTypes.number,
  refStack: PropTypes.bool,
};

Graph.defaultProps = {};

export default React.memo(Graph);
