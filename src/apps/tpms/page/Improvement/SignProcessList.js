/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import request from 'utils/request';

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
      return <td>승인</td>;
    }
    case 9: {
      // 반려
      return <td>반려</td>;
    }

    default: {
      return <td></td>;
    }
  }
};

const stepRenderer = ({ step, rel_type }) => {
  switch (rel_type) {
    case 200:
      switch (step) {
        case 1:
          return <td>프로젝트 등록</td>;
        case 2:
          return <td>등록 1차 결재</td>;
        case 3:
          return <td>등록 최종 결재</td>;
        default:
          return <td></td>;
      }
    case 201:
      switch (step) {
        case 1:
          return <td>진행 완료</td>;
        case 2:
          return <td>완료 1차 결재</td>;
        case 3:
          return <td>완료 최종 결재</td>;
        default:
          return <td></td>;
      }
    case 202:
    case 203:
      switch (step) {
        case 1:
          return <td>프로젝트 Drop</td>;
        case 2:
          return <td>Drop 1차 결재</td>;
        case 3:
          return <td>Drop 최종 결재</td>;
        default:
          return <td></td>;
      }
    default:
      return <td></td>;
  }
};

const SignPrcListInfo = ({ info, noPadding }) => {
  const [approverList, setApproverList] = useState([]);

  const fetchApproverList = async params => {
    const url = `/api/tpms/v1/common/approvalSide`;
    const { response, error } = await request({
      url,
      params,
    });

    return { response, error };
  };

  useEffect(() => {
    fetchApproverList({ task_seq: info?.task_seq, type: 'approverList' }).then(({ response, error }) => {
      if (response && !error) {
        setApproverList(response?.list);
      }
    });
  }, []);
  return (
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
            {/* <th>사번</th> */}
            <th>부서</th>
            <th>직급</th>
            <th>성명</th>
            <th>완료일</th>
            <th>상태</th>
            <th>의견</th>
          </tr>
        </thead>
        <tbody>
          {approverList?.length === 0 && (
            <tr>
              <td colSpan="7">진행된 내용이 없습니다.</td>
            </tr>
          )}
          {approverList?.map(row => {
            if (row?.step === 'Drop_사유') {
              return (
                <tr key={row?.seq}>
                  <td>{row?.step}</td>
                  <td colSpan={6}>{row?.dropreason}</td>
                </tr>
              );
            }

            const { step, appv_status, rel_type, EMP_NO, DEPT_NAME_KOR, PSTN_NAME_KOR, NAME_KOR, sign_date, opinion } = row;
            return (
              <tr key={step + rel_type + EMP_NO}>
                {stepRenderer({ step, rel_type })}
                {/* <td>{EMP_NO}</td> */}
                <td>{DEPT_NAME_KOR}</td>
                <td>{PSTN_NAME_KOR}</td>
                <td>{NAME_KOR}</td>
                <td>{sign_date}</td>
                {statusRenderer(appv_status)}
                <td>{opinion}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Styled>
  );
};

SignPrcListInfo.propTypes = {
  info: PropTypes.object,
  noPadding: PropTypes.bool,
};

SignPrcListInfo.defaultProps = {
  info: {},
  noPadding: false,
};

export default SignPrcListInfo;
