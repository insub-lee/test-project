/* eslint-disable camelcase */
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

const statusRenderer = status => {
  switch (status) {
    case 0: {
      // 미결재
      return <td>결재 대기</td>;
    }
    case 1: {
      // 결재중
      return <td>결재 중</td>;
    }
    case 2: {
      // 승인
      return <td>등록 승인</td>;
    }
    case 9: {
      // 반려
      return <td>등록 반려</td>;
    }

    default: {
      return <td></td>;
    }
  }
};

const stepRenderer = step => {
  switch (step) {
    case 1: {
      return <td>프로젝트 등록</td>;
    }
    case 2: {
      return <td>등록 1차 결재</td>;
    }
    case 3: {
      return <td>등록 최종 결재</td>;
    }

    default:
      return <td></td>;
  }
};

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
          if (row?.step === 'Drop_사유') {
            return (
              <tr key={row?.seq}>
                <td>{row?.step}</td>
                <td colSpan={6}>{row?.dropreason}</td>
              </tr>
            );
          }

          const appv_member = JSON.parse(row?.appv_member)[0];
          const { step, appv_status } = row;
          console.debug('### appv_member:', appv_member);
          return (
            <tr key={step + JSON.stringify(appv_member)}>
              {stepRenderer(step)}
              <td>{appv_member?.EMP_NO}</td>
              <td>{appv_member?.DEPT_NAME_KOR}</td>
              <td>{appv_member?.PSTN_NAME_KOR}</td>
              <td>{appv_member?.NAME_KOR}</td>
              <td>{getDateString(new Date(row?.reg_dttm))}</td>
              {statusRenderer(appv_status)}
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
