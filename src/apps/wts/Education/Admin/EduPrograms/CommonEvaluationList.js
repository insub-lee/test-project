import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Spin } from 'antd';

import Wrapper from './Wrapper';
import StyledTable from '../../../StyledTable';

const CommonEvaluationList = ({ type, data, isLoading }) => (
  <Wrapper>
    <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
      <StyledTable className="ta_wrap">
        {type !== 'job_proc' && (
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
        )}
        {type === 'job_proc' && (
          <table className="tb02">
            <thead>
              <tr className="bd">
                <th rowSpan={2}>평가 항목</th>
                <th rowSpan={2}>점수 배분</th>
                <th rowSpan={1} colSpan={4}>
                  객관식
                </th>
              </tr>
              <tr className="bd">
                <th>정답</th>
                <th>오답1</th>
                <th>오답2</th>
                <th>오답3</th>
              </tr>
            </thead>
            <tbody>
              {data.map(row => (
                <tr key={row.key}>
                  <td style={{ textAlign: 'left', fontSize: '12px' }}>{`${row.title}`}</td>
                  <td style={{ fontSize: '12px' }}>{row.total}</td>
                  <td style={{ textAlign: 'left', fontSize: '12px' }}>{row.answers[0] || row.correctAnswer}</td>
                  <td style={{ textAlign: 'left', fontSize: '12px' }}>{row.answers[1]}</td>
                  <td style={{ textAlign: 'left', fontSize: '12px' }}>{row.answers[2]}</td>
                  <td style={{ textAlign: 'left', fontSize: '12px' }}>{row.answers[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </StyledTable>
    </Spin>
  </Wrapper>
);

CommonEvaluationList.propTypes = {
  type: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};

CommonEvaluationList.defaultProps = {
  type: '',
  data: [],
  isLoading: true,
};

export default CommonEvaluationList;
