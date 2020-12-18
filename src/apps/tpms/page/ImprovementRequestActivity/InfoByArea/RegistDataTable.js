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
  const { labels, datasets } = data;

  const width = 100 / (labels?.length + 1);

  return (
    <DataTableWrap>
      <table>
        <colgroup>
          <col width={`${width}%`} />
          {labels.map(index => (
            <col width={`${width}%`} key={`total_${index}`} />
          ))}
        </colgroup>
        <thead>
          <tr className="bd">
            <th rowSpan="2">기간</th>
            <th colSpan={labels.length}>AREA</th>
          </tr>
          <tr className="bd">
            {labels.map(label => (
              <th key={uuid()}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datasets.map(set => (
            <tr key={uuid()}>
              <td key={uuid()}>{set?.draftdt}</td>
              {Object.keys(set)
                .filter(key => key !== 'draftdt')
                .map(area => (
                  <td key={uuid()}>{set[area]}</td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </DataTableWrap>
  );
};

RegistDataTable.propTypes = {
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    datasets: PropTypes.arrayOf(PropTypes.object),
  }),
};

RegistDataTable.defaultProps = {
  data: { labels: [], datasets: [] },
};

export default RegistDataTable;
