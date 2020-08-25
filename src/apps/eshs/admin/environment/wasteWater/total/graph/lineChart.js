import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { LineChart, XAxis, YAxis, Tooltip, Line } from 'recharts';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as selectors from 'containers/portal/App/selectors';

const Styled = styled.div`
  .custom-tooltip {
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 5px;
  }
`;

const CustomTooltip = props => {
  if (props.active) {
    const target = props.payload[0];
    const month = moment(props.label, 'YYYYMM').format('YYYY년 MM월');
    return (
      <Styled>
        <div className="custom-tooltip">
          <p className="label">
            <span>{`기간 : ${month}`}</span>
          </p>
          <p className="label">
            <span>{`${target.dataKey} : ${target.value}`}</span>
          </p>
        </div>
      </Styled>
    );
  }
  return '';
};

// Ehs - 용폐수 - 관리 - 수질 그래프
class ScatterChartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  listDateTypeChange = listData => listData.map(item => ({ ...item, WQ_DT: Number(item.WQ_DT) }));

  tickFormat = value => {
    const formatValue = moment(value, 'YYYYMM').format('YY년MM월');
    return formatValue;
  };

  render() {
    const { xField, yField, xFieldNm, listData, menuFixedYn } = this.props;
    const graphListData = this.listDateTypeChange(listData);
    const boxWidth = menuFixedYn === 'N' ? 620 : 500;
    return (
      <LineChart width={boxWidth} height={200} data={graphListData}>
        <XAxis dataKey={`${xField}`} name={`${xFieldNm}`} tickFormatter={value => this.tickFormat(value)} />
        <YAxis />
        <Tooltip cursor={{ stroke: '#ff4d4d', strokeWidth: 1 }} content={<CustomTooltip />} />
        <Line type="monotone" dataKey={`${yField}`} stroke="#8884d8" activeDot={{ r: 6 }} />
      </LineChart>
    );
  }
}

ScatterChartPage.propTypes = {
  xField: PropTypes.string,
  xFieldNm: PropTypes.string,
  yField: PropTypes.string,
  yFieldNm: PropTypes.string,
  listData: PropTypes.array,
  menuFixedYn: PropTypes.string,
};

ScatterChartPage.defaultProps = {
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
