import React from 'react';
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

const RegistDataTable = ({ data, total }) => {
  const width = 100 / (total.labels.length + 1);
  return (
    <DataTableWrap>
      <table>
        <colgroup>
          <col width={`${width}%`} />
          {total.labels.map(index => (
            <col width={`${width}%`} key={`total_${index}`} />
          ))}
        </colgroup>
        <thead>
          <tr className="bd">
            <th rowSpan="2">AREA</th>
            <th colSpan={total.labels.length}>기간</th>
          </tr>
          <tr className="bd">
            {total.labels.map((item, index) => (
              <th key={`total_${index}`}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.key}>
              <td>{item.key}</td>
              {item.data.map((subItem, index) => (
                <td key={`${item.key}_${index}`}>{subItem.regcnt}</td>
              ))}
            </tr>
          ))}
          {data.length > 1 && (
            <tr key={total.key}>
              <td>{total.key}</td>
              {total.data.map((item, index) => (
                <td key={`total_${index}`}>{item}</td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </DataTableWrap>
  );
};

RegistDataTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.number),
    }),
  ),
  total: PropTypes.object,
};

RegistDataTable.defaultProps = {
  data: [],
  total: { labels: [], data: [] },
};

export default RegistDataTable;
