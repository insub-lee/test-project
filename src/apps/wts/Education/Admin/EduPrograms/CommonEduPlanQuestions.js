import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Spin } from 'antd';

import Wrapper from './Wrapper';
import StyledTable from '../../../StyledTable';

const CommonEduPlanQuestions = ({ data, isLoading }) => (
  <Wrapper>
    <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
      <StyledTable className="ta_wrap">
        <table className="tb02">
          <colgroup>
            <col width="60%" />
            <col width="20%" />
            <col width="20%" />
          </colgroup>
          <thead>
            <tr className="bd">
              <th rowSpan={2}>평가 항목</th>
              <th colSpan={2}>평가 구분</th>
              <th rowSpan={2}>점수 배분</th>
              <th rowSpan={1} colSpan={4}>
                평가 결과 점수
              </th>
            </tr>
            <tr className="bd">
              <th>이론</th>
              <th>실기</th>
              <th>A등급</th>
              <th>B등급</th>
              <th>C등급</th>
              <th>D등급</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.key}>
                <td style={{ textAlign: 'left' }}>{`${row.title}`}</td>
                <td>{row.theory ? '○' : ''}</td>
                <td>{row.practice ? '○' : ''}</td>
                <td>{row.total}</td>
                <td>{row.scoreA}</td>
                <td>{row.scoreB}</td>
                <td>{row.scoreC}</td>
                <td>{row.scoreD}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </StyledTable>
    </Spin>
  </Wrapper>
);

CommonEduPlanQuestions.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};

CommonEduPlanQuestions.defaultProps = {
  data: [],
  isLoading: true,
};

export default CommonEduPlanQuestions;
