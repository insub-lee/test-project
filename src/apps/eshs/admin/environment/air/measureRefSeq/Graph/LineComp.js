import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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
          .filter(p => p.value !== 0)
          .map((p, index) => (
            <p
              key={`tooltip_item_${index}`}
              style={{ color: p.color, margin: '0px', paddingTop: '4px', paddingBottom: '4px' }}
            >{`${p.dataKey} : ${p.value}`}</p>
          ))}
        {payload
          .filter(p => p.value === 0)
          .map((p, index) => (
            <p
              key={`tooltip_item_0_${index}`}
              style={{ color: p.color, margin: '0px', paddingTop: '4px', paddingBottom: '4px' }}
            >{`${p.dataKey} : ${p.value}`}</p>
          ))}
      </div>
    );
  }
  return null;
};

class LineComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gasList: [],
      gasListAddColor: [],
      data: [],
      allGasData: [],
    };
  }

  componentDidMount() {
    const { gasList, data } = this.props;
    this.setState({
      gasList,
      data,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const prevGasList = prevState.gasList || [];
    const nextGasList = nextProps.gasList || [];
    const prevData = prevState.data || [];
    const nextData = nextProps.data || [];
    const result = {};
    if (JSON.stringify(prevGasList) === JSON.stringify(nextGasList) && JSON.stringify(prevData) === JSON.stringify(nextData)) return null;

    if (JSON.stringify(prevGasList) !== JSON.stringify(nextGasList)) {
      result.gasList = nextGasList;
      result.gasListAddColor = nextGasList.map(gas => ({
        ...gas,
        color: `#${Math.random()
          .toString(16)
          .substr(-6)}`,
      }));
    }
    if (JSON.stringify(prevData) !== JSON.stringify(nextData)) {
      result.data = nextData;
      result.allGasData = nextData.map(item => {
        const res = { ...item };

        nextGasList.forEach(gas => {
          res[gas.GAS_CD] = item[gas.GAS_CD] ? item[gas.GAS_CD] : 0;
        });

        return res;
      });
    }
    return result;
  }

  render() {
    const { gasListAddColor, allGasData } = this.state;
    return (
      <LineChart
        width={1100}
        height={800}
        data={allGasData}
        margin={{
          top: 30,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="DATE" style={{ fontSize: '0.75rem' }} />
        <YAxis style={{ fontSize: '0.75rem' }} />
        <Tooltip content={<CustomToolTip />} />
        {/* <Tooltip /> */}
        <Legend verticalAlign="top" />
        {gasListAddColor.map(gas => (
          <Line key={gas.GAS_CD} type="monotone" dataKey={gas.GAS_CD} stroke={gas.color} />
        ))}
      </LineChart>
    );
  }
}

LineComp.propTypes = {
  data: PropTypes.array,
  gasList: PropTypes.array,
};

LineComp.defaultProps = {
  data: [],
  gasList: [],
};
export default LineComp;
