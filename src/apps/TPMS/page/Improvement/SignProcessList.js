import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';

const tableBorderColor = '#555';
const tableFontColor = '#555';

const Styled = styled.div`
  padding: ${({ noPadding }) => (noPadding ? '0' : '30px')};
  > table {
    width: 100%;
    thead > tr > th {
      color: ${tableFontColor};
      border-top: 4px double ${tableBorderColor};
      border-bottom: 4px double ${tableBorderColor};
    }
    tbody > tr > td {
      color: ${tableFontColor};
      border-bottom: 1px solid ${tableBorderColor};
    }
  }
`;

const getDateString = (value, format = 'YYYY-MM-DD') => (value ? moment(value, 'YYYYMMDD').format(format) : '');

const SignPrcListInfo = ({ list, noPadding }) => (
  <Styled noPadding={noPadding}>
    <table>
      <colgroup>
        <col width="calc(100% / 7)" />
        <col width="calc(100% / 7)" />
        <col width="calc(100% / 7)" />
        <col width="calc(100% / 7)" />
        <col width="calc(100% / 7)" />
        <col width="calc(100% / 7)" />
        <col width="calc(100% / 7)" />
      </colgroup>
      <thead>
        <tr>
          <th>결재 진행단계</th>
          <th>사번</th>
          <th>부서</th>
          <th>직급</th>
          <th>성명</th>
          <th>완료일</th>
          <th>상태</th>
        </tr>
      </thead>
      <tbody>
        {list.length === 0 && (
          <tr>
            <td colSpan="7">진행된 내용이 없습니다.</td>
          </tr>
        )}
        {list.map(row => {
          if (row.step === 'Drop_사유') {
            return (
              <tr key={row.seq}>
                <td>{row.step}</td>
                <td colSpan={6}>{row.dropreason}</td>
              </tr>
            );
          }
          return (
            <tr key={row.seq}>
              <td>{row.step}</td>
              <td>{row.usrid}</td>
              <td>{row.dpnm}</td>
              <td>{row.jgnm}</td>
              <td>{row.usrnm}</td>
              <td>{getDateString(row.approvedt)}</td>
              <td>{row.sign}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </Styled>
);

SignPrcListInfo.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  noPadding: PropTypes.bool,
};

SignPrcListInfo.defaultProps = {
  list: [],
  noPadding: false,
};

export default SignPrcListInfo;
