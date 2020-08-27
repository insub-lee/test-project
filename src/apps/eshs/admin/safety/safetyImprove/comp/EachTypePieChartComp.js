import * as PropTypes from 'prop-types';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const RADIAN = Math.PI / 180;

class EachTypePieChartComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data || [],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const prevData = prevState.data || [];
    const nextData = nextProps.data || [];
    if (JSON.stringify(prevData) !== JSON.stringify(nextData)) return { data: nextData };

    return null;
  }

  renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent === 0) return <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central"></text>;

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  render() {
    const { data } = this.state;
    return (
      <ResponsiveContainer width="100%" height={350}>
        <PieChart onMouseOver={item => console.debug('item ', item)}>
          <Pie data={data} labelLine={false} label={this.renderCustomizedLabel} outerRadius="100%" fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`${index}_CELL`} fill={entry.color || ''} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

EachTypePieChartComp.propTypes = {
  data: PropTypes.array,
};

EachTypePieChartComp.defaultProps = {
  data: [],
};

export default EachTypePieChartComp;
