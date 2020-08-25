import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import * as selectors from 'containers/portal/App/selectors';

// Ehs - 용폐수 - 관리 - 수질 그래프
class ScatterChartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  listDateTypeChange = listData => listData.map(item => ({ ...item, WQ_DT: Number(item.WQ_DT) }));

  valueFormat = (value, name) => {
    switch (name) {
      case '날짜':
        return moment(value, 'YYYYMMDD').format('YYYY.MM.DD');
      default:
        return value;
    }
  };

  tickFormat = value => {
    const formatValue = moment(value, 'YYYYMMDD').format('MM월DD일');
    return formatValue;
  };

  render() {
    const { chartName, xField, xFieldNm, yField, yFieldNm, listData, menuFixedYn } = this.props;
    const graphListData = this.listDateTypeChange(listData);
    const boxWidth = menuFixedYn === 'N' ? 620 : 500;
    return (
      <ScatterChart width={boxWidth} height={200}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={`${xField}`} name={`${xFieldNm}`} tickCount={3} tickFormatter={value => this.tickFormat(value)} />
        <YAxis type="number" dataKey={`${yField}`} name={`${yFieldNm}`} tickCount={5} />
        <Tooltip cursor={{ stroke: '#ff4d4d', strokeWidth: 1 }} formatter={(value, name) => this.valueFormat(value, name)} />
        <Scatter name={`${chartName}`} data={graphListData} fill="#8884d8" />
      </ScatterChart>
    );
  }
}

ScatterChartPage.propTypes = {
  chartName: PropTypes.string,
  xField: PropTypes.string,
  xFieldNm: PropTypes.string,
  yField: PropTypes.string,
  yFieldNm: PropTypes.string,
  listData: PropTypes.array,
  menuFixedYn: PropTypes.string,
};

ScatterChartPage.defaultProps = {
  chartName: 'HF계',
  xField: '',
  xFieldNm: '',
  yField: '',
  yFieldNm: '',
  listData: [],
};

const mapStateToProps = createStructuredSelector({
  menuFixedYn: selectors.makeSelectMenuFixedYn(),
});

export default connect(mapStateToProps)(ScatterChartPage);
