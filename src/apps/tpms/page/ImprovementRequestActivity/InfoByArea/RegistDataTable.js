import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
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

const RegistDataTable = ({ data }) => {
  console.debug('### RegistDataTable', data);
  const width = 100 / (data?.labels?.length + 1);

  return (
    <DataTableWrap>
      <table>
        <colgroup>
          <col width={`${width}%`} />
          {data.labels.map(index => (
            <col width={`${width}%`} key={`total_${index}`} />
          ))}
        </colgroup>
        <thead>
          <tr className="bd">
            <th rowSpan="2">AREA</th>
            <th colSpan={data?.labels.length}>기간</th>
          </tr>
          <tr className="bd">
            {data?.datasets?.map(item => (
              <th key={uuid()}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.datasets?.map(item => (
            <tr key={uuid()}>
              <td>{item.key}</td>
              {item.data.map(subItem => (
                <td key={uuid()}>{subItem.regcnt}</td>
              ))}
            </tr>
          ))}
          {/* {data.length > 1 && (
            <tr key={uuid()}>
              <td>{total.key}</td>
              {total.data.map(item => (
                <td key={uuid()}>{item}</td>
              ))}
            </tr>
          )} */}
        </tbody>
      </table>
    </DataTableWrap>
  );
};

RegistDataTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      labels: PropTypes.arrayOf(PropTypes.object),
      datasets: PropTypes.arrayOf(PropTypes.object),
    }),
  ),
};

RegistDataTable.defaultProps = {
  data: [{ labels: [], datasets: [] }],
};

export default RegistDataTable;
