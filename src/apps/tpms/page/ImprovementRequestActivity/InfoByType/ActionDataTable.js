import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DataTableWrap = styled.div`
  clear: both;
  margin-bottom: 30px;
  overflow-x: scroll;

  table {
    width: 100%;

    th,
    td {
      font-size: 15px;
      padding: 12px 10px;
      vertical-align: middle;
      text-align: center;
    }

    th {
      color: #ffffff;
      background: #6e7b95;
      font-weight: 400;
      padding: 8px 10px;
    }

    td {
      color: #555555;
      border: 1px solid #eaecee;
      padding: 7px 10px;
    }

    .bd {
      border: 1px solid #d4d7df !important;
      th {
        border: 1px solid #5a6885;
      }
    }
  }

  @media screen and (max-width: 860px) {
    table {
      min-width: 1024px;
    }
  }
`;

const ActionDataTable = ({ data }) => {
  const total = useMemo(() => {
    const result = {
      key: '합계',
      value1: 0,
      value2: 0,
      value3: 0,
      value4: 0,
      avg: 0,
    };
    if (data.length > 1) {
      data.forEach(item => {
        result.value1 += item.value1;
        result.value2 += item.value2;
        result.value3 += item.value3;
        result.value4 += item.value4;
      });
      if (total.value1 > 0) {
        result.avg = (total.value2 / total.value1).toFixed(2) * 100;
      }
    }
    return result;
  }, [data]);
  return (
    <DataTableWrap>
      <table>
        <colgroup>
          <col width="16.66%" />
          <col width="16.66%" />
          <col width="16.66%" />
          <col width="16.66%" />
          <col width="16.66%" />
          <col width="16.66%" />
        </colgroup>
        <thead>
          <tr className="bd">
            <th rowSpan="2">유형</th>
            <th colSpan="4">조치현황</th>
            <th rowSpan="2">완료율</th>
          </tr>
          <tr className="bd">
            <th>등록</th>
            <th>완료</th>
            <th>조치 중</th>
            <th>불가</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.key}>
              <td>{item.key}</td>
              <td>{item.value1}</td>
              <td>{item.value2}</td>
              <td>{item.value3}</td>
              <td>{item.value4}</td>
              <td>{isNaN(item.value2 / item.value1) ? 0 : (item.value2 / item.value1).toFixed(2) * 100} %</td>
            </tr>
          ))}
          {data.length > 1 && (
            <tr key={total.key}>
              <td>{total.key}</td>
              <td>{total.value1}</td>
              <td>{total.value2}</td>
              <td>{total.value3}</td>
              <td>{total.value4}</td>
              <td>{total.avg} %</td>
            </tr>
          )}
        </tbody>
      </table>
    </DataTableWrap>
  );
};

ActionDataTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value1: PropTypes.number,
      value2: PropTypes.number,
      value3: PropTypes.number,
      value4: PropTypes.number,
      avg: PropTypes.number,
    }),
  ),
};

ActionDataTable.defaultProps = {
  data: [],
};

export default ActionDataTable;
