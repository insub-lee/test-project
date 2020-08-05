import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// const CustomToolTip = ({ ...props }) => {
//   const { payload = [], active, label } = props;
//   console.debug('props', props);
//   if (active) {
//     return (
//       <div className="recharts-default-tooltip" style={{ border: '1px solid' }}>
//         <p className="recharts-tooltip-label">{label}</p>
//         {payload
//           .filter(p => p.value !== 0)
//           .map((p, index) => (
//             <p key={`tooltip_item_${index}`} style={{ color: p.color }}>{`${p.dataKey} : ${p.value}`}</p>
//           ))}
//       </div>
//     );
//   }
//   return null;
// };

class LineComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gasList: [],
      gasListAddColor: [],
    };
  }

  componentDidMount() {
    const { gasList } = this.props;
    this.setState({
      gasList,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const prevGasList = prevState.gasList || [];
    const nextGasList = nextProps.gasList || [];
    if (JSON.stringify(prevGasList) === JSON.stringify(nextGasList)) return null;
    return {
      gasList: nextGasList,
      gasListAddColor: nextGasList.map(gas => ({
        ...gas,
        color: `#${Math.random()
          .toString(16)
          .substr(-6)}`,
      })),
    };
  }

  render() {
    const { data } = this.props;
    const { gasListAddColor } = this.state;
    return (
      <LineChart
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
        <XAxis dataKey="DATE" style={{ fontSize: '0.75rem' }} />
        <YAxis style={{ fontSize: '0.75rem' }} />
        {/* <Tooltip content={<CustomToolTip />} /> */}
        <Tooltip />
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
