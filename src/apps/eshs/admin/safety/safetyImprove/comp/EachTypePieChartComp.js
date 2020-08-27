import * as PropTypes from 'prop-types';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const RADIAN = Math.PI / 180;

const CustomTooltip = ({ payload }) => <div>{payload}</div>;
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
    const { dataKey } = this.props;
    const { data } = this.state;
    return (
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            labelLine={false}
            label={this.renderCustomizedLabel}
            dataKey={dataKey}
            // onMouseEnter={e => console.debug('item ', e)}
            outerRadius="100%"
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell key={`${index}_CELL`} fill={entry.color || ''} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

EachTypePieChartComp.propTypes = {
  data: PropTypes.array,
  dataKey: PropTypes.string,
};

EachTypePieChartComp.defaultProps = {
  data: [],
  dataKey: '',
};

export default EachTypePieChartComp;
