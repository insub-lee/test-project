import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const calculate = (gasCd, hourFlow, density, workDay, gasWeight) => {
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

const CustomToolTip = ({ ...props }) => {
  const { payload = [], active, label } = props;
  if (active) {
    return (
      <div
        className="recharts-default-tooltip"
        style={{ margin: '0px', padding: '10px', backgroundColor: 'rgb(255, 255, 255)', border: '1px solid rgb(204, 204, 204)', whiteSpace: 'nowrap' }}
      >
        <p className="recharts-tooltip-label" style={{ margin: '0px' }}>
          {label}
        </p>
        {/* 값이 있는 경우 ToolTip 상단에 위치 */}
        {payload
          .filter(p => p.value && p.value !== 0 && p.value !== '0')
          .map((p, index) => (
            <p
              key={`tooltip_item_${index}`}
              style={{ color: p.color, margin: '0px', paddingTop: '4px', paddingBottom: '4px' }}
            >{`${p.dataKey} : ${p.value}`}</p>
          ))}
      </div>
    );
  }
  return null;
};
class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphData: [],
      selectGubun: 1,
      data: [],
    };
  }

  componentDidMount = () => this.setState({ graphData: (this.props && this.props.graphData) || [], selectGubun: this.props.selectGubun });

  static getDerivedStateFromProps(nextProps, prevState) {
    const prevGraphData = prevState.graphData || [];
    const nextGraphData = nextProps.graphData || [];
    const nextGubun = nextProps.selectGubun || 1;
    const prevGubun = prevState.selectGubun || 1;

    if (JSON.stringify(prevGraphData) === JSON.stringify(nextGraphData) && prevGubun === nextGubun) return null;

    const graphList = nextGraphData && nextGraphData.map(gasData => gasData && gasData.GAS && gasData.GAS.map(item => JSON.parse(item.value)));

    let data = [];
    if (nextGubun === 2) {
      data =
        graphList &&
        graphList.map(temps =>
          temps.map(element => ({
            name: element.STACK_CD,
            subName: element.STACK_CD.substring(3),
            sub: '',
            [element.GAS_CD]: calculate(element.GAS_CD, element.HOUR_FLOW, element.DENSITY, element.WORK_DAY, element.GAS_WEIGHT),
          })),
        );
    } else {
      data =
        graphList &&
        graphList.map(temps =>
          temps.map(element => ({
            name: element.STACK_CD,
            subName: element.STACK_CD.substring(3),
            sub: '',
            [element.GAS_CD]: element.DENSITY || 0,
          })),
        );
    }

    return { data: data && data.map(i => i.reduce((result, item) => ({ ...result, ...item }), {})), graphData: nextGraphData, selectGubun: nextGubun };
  }

  render() {
    const { gasList } = this.props;
    const { data } = this.state;
    return (
      <BarChart
        width={1100}
        height={800}
        data={data}
        margin={{
          top: 30,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis xAxisId={0} dataKey="name" hide />
        <XAxis xAxisId={1} dataKey="subName" interval={1} style={{ fontSize: '0.6rem' }} />
        <XAxis xAxisId={2} dataKey="sub" label="STACK (FR0 생략)" axisLine={false} tickLine={false} style={{ fontSize: '0.6rem' }} />
        <YAxis />
        <Tooltip content={<CustomToolTip />} />
        <Legend verticalAlign="top" />
        {gasList &&
          gasList.map((item, index) => (
            <Bar key={item.GAS_CD} dataKey={item.GAS_CD} stackId="a" fill={`#${Math.floor(((index + 10) / 100) * 16777215).toString(16)}`} />
          ))}
      </BarChart>
    );
  }
}

Graph.propTypes = {
  gasList: PropTypes.array,
  graphData: PropTypes.array,
  selectGubun: PropTypes.number,
};

Graph.defaultProps = {};

export default Graph;
