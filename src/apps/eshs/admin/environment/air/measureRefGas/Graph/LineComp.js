import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class LineComp extends Component {
  componentDidMount() {}

  render() {
    const { data } = this.props;

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
        <XAxis xAxisId={0} hide dataKey="dataKey" style={{ fontSize: '0.75rem' }} />
        <XAxis xAxisId={1} dataKey="seq" style={{ fontSize: '0.75rem' }} />
        <XAxis xAxisId={2} dataKey="date" style={{ fontSize: '0.75rem' }} interval={1} />
        <YAxis style={{ fontSize: '0.75rem' }} />
        <Tooltip />
        <Legend verticalAlign="top" />
        <Line type="monotone" dataKey="Acid" stroke="#FF0000" />
        <Line type="monotone" dataKey="Toxic" stroke="#00FF00" />
        <Line type="monotone" dataKey="VOD" stroke="#0000FF" />
      </LineChart>
    );
  }
}

LineComp.propTypes = {
  data: PropTypes.array,
};

LineComp.defaultProps = {
  data: [],
};
export default LineComp;
