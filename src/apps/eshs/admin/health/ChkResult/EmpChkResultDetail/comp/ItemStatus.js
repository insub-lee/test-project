import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';

import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line, Legend } from 'recharts';

import PropTypes from 'prop-types';

import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import styled from 'styled-components';

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
    return (
      <Styled>
        <div className="custom-tooltip">
          <p className="label">
            <span>{`검진일자 : ${target?.payload?.CHK_DT || '데이터 없음'}`}</span>
          </p>
          <p className="label">
            <span>{`결과 : ${target?.value || ''}`}</span>
          </p>
        </div>
      </Styled>
    );
  }
  return '';
};

const groupBy = function(data, key) {
  return data.reduce(function(carry, el) {
    const group = el[key];

    if (carry[group] === undefined) {
      carry[group] = [];
    }

    carry[group].push(el);
    return carry;
  }, {});
};

class ItemStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateList: [],
      min: undefined,
      max: undefined,
      avg: undefined,
      yearGroupTr: [],
    };
  }

  componentDidMount = () => {
    const { list, rowData } = this.props;

    const stateList = list.map(item => ({
      ...item,
      RESULT: rowData[`${item?.CHK_CD}_RESULT`],
    }));

    const results = stateList
      .map(({ RESULT }) => {
        if (Number(RESULT) || Number(RESULT) === 0) return Number(RESULT);
      })
      .filter(item => !!item || item === 0);

    this.setState(
      {
        stateList,
        max: Math.max(...results),
        min: Math.min(...results),
        avg: Math.round((results.reduce((p, c) => p + c, 0) / results.length) * 100) / 100,
      },
      this.createTr,
    );
  };

  createTr = () => {
    const { stateList } = this.state;
    const yearGroupTr = [];

    const groupObj = groupBy(stateList, 'CHK_YEAR');

    for (const key in groupObj) {
      let spanRow = true;
      groupObj[key].forEach(item => {
        if (spanRow) {
          spanRow = false;
          yearGroupTr.push(
            <tr key={uuid()}>
              <td rowSpan={groupObj[key].length} align="center">
                {item?.CHK_YEAR || ''}
              </td>
              <td align="center">{`${item?.CHK_TYPE_NM || ''} ${item?.CHK_SEQ || ''}`}</td>
              <td align="center">{item?.CHK_DT || ''}</td>
              <td align="center">{item?.RESULT || ''}</td>
            </tr>,
          );
        } else {
          yearGroupTr.push(
            <tr key={uuid()}>
              <td align="center">{`${item?.CHK_TYPE_NM || ''} ${item?.CHK_SEQ || ''}`}</td>
              <td align="center">{item?.CHK_DT || ''}</td>
              <td align="center">{item?.RESULT || ''}</td>
            </tr>,
          );
        }
      });
    }
    this.setState({ yearGroupTr });
  };

  render() {
    const { rowData, userInfo } = this.props;
    const { yearGroupTr, stateList, min, max, avg } = this.state;
    return (
      <StyledContentsWrapper>
        <StyledHtmlTable>
          <table className="table-border">
            <colgroup>
              <col width="20" />
              <col width="25" />
              <col width="25" />
              <col width="30" />
            </colgroup>
            <thead></thead>
            <tfoot></tfoot>
            <tbody>
              <tr>
                <th>수검자</th>
                <td colSpan={3}>{`${userInfo?.EMP_NO ? `${userInfo?.EMP_NO} / ` : ''}${
                  userInfo?.NAME_KOR ? `${userInfo?.NAME_KOR} / ` : ''
                }${userInfo?.DEPT_NAME_KOR ? `${userInfo?.DEPT_NAME_KOR}` : ''}`}</td>
              </tr>
              <tr>
                <th>검사종목</th>
                <td colSpan={3}>{`${rowData?.CHK_RESULT_ITEM_DESC || ''} - ${rowData?.CHK_RESULT_ITEM_NM || ''}`}</td>
              </tr>
              <tr>
                <th>기준치</th>
                <td colSpan={3}>{rowData?.BASE_RESULT || ''}</td>
              </tr>
              <tr>
                <th>관련질환</th>
                <td colSpan={3}>{rowData?.DISEASE || ''}</td>
              </tr>
              <tr>
                <td colSpan={4}>
                  <div>
                    <LineChart width={700} height={200} data={stateList.map(item => ({ ...item, MAX: max, MIN: min }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis xAxisId={0} dataKey="CHK_DT" style={{ fontSize: '0.75rem' }} />
                      <YAxis />
                      <Tooltip cursor={{ stroke: '#ff4d4d', strokeWidth: 1 }} content={<CustomTooltip />} />
                      <Legend verticalAlign="top" />
                      <Line type="monotone" dataKey="RESULT" stroke="#080808" activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="MAX" stroke="#fa0202" dot={false} />
                      <Line type="monotone" dataKey="MIN" stroke="#1307fa" dot={false} />
                    </LineChart>
                  </div>
                </td>
              </tr>
              <tr>
                <th>년도</th>
                <th>검종</th>
                <th>검진일</th>
                <th>결과</th>
              </tr>
              {yearGroupTr}
              <tr>
                <th colSpan={3}>평균</th>
                <th>{avg || ''}</th>
              </tr>
              <tr>
                <th colSpan={3}>최대</th>
                <th>{max || ''}</th>
              </tr>
              <tr>
                <th colSpan={3}>최소</th>
                <th>{min || ''}</th>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
      </StyledContentsWrapper>
    );
  }
}

ItemStatus.propTypes = {
  rowData: PropTypes.object,
  userInfo: PropTypes.object,
  list: PropTypes.array,
};

ItemStatus.defaultProps = {
  rowData: {},
  userInfo: {},
  list: [],
};

export default ItemStatus;
