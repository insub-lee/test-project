import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import styled from 'styled-components';

const CustomTableStyled = styled.div`
  .ant-table-column-title {
    font-size: 12px;
  }
`;

class SafetyWorkReport extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { reportData } = this.props;
    const { workByMonth, penaltyByMonth, workerByMonth, workResult, workerResult, penaltyResult, year, month } = reportData;
    return (
      <CustomTableStyled>
        <StyledHtmlTable>
          <table style={{ borderTop: '1px solid #888' }}>
            <tbody>
              <tr style={{ textAlign: 'center' }}>
                <td colSpan={10} rowSpan={4} style={{ width: '60%' }}>
                  <span style={{ fontSize: 20 }}>공사업체 안전작업 관리 현황 보고</span>
                  <br />
                  {year && year !== '' && month && month !== '' && <span style={{ fontSize: 20 }}>{`${year}년 ${month}월`}</span>}
                </td>
                <td rowSpan={2} style={{ width: '10%' }}>
                  결<br />재
                </td>
                <td style={{ width: '10%' }}>기안/접수</td>
                <td style={{ width: '10%' }}>검토</td>
                <td style={{ width: '10%' }}>승인/전결</td>
              </tr>
              <tr style={{ height: '80px' }}>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr style={{ textAlign: 'center' }}>
                <td style={{ width: '10%' }}>직위/성명</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr style={{ textAlign: 'center' }}>
                <td style={{ width: '10%' }}>일자</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <table style={{ borderTop: '0px solid #888' }}>
            <colgroup>
              <col width="15%" />
              <col width="calc(85% / 13)" />
              <col width="calc(85% / 13)" />
              <col width="calc(85% / 13)" />
              <col width="calc(85% / 13)" />
              <col width="calc(85% / 13)" />
              <col width="calc(85% / 13)" />
              <col width="calc(85% / 13)" />
              <col width="calc(85% / 13)" />
              <col width="calc(85% / 13)" />
              <col width="calc(85% / 13)" />
              <col width="calc(85% / 13)" />
              <col width="calc(85% / 13)" />
              <col width="calc(85% / 13)" />
            </colgroup>
            <tbody>
              <tr style={{ height: '40px' }}>
                <td colSpan={14}>
                  1) 작업별 현황 및 위반율
                  <br />
                  &nbsp;&nbsp;&nbsp;- {`${month}월 `} 작업허가 : {`${workByMonth}`} 건
                  <br />
                  &nbsp;&nbsp;&nbsp;- {`${month}월 `} 안전위반율 : {`${penaltyByMonth}`} %
                </td>
              </tr>
              <tr>
                <th>작업구분</th>
                <th>1월</th>
                <th>2월</th>
                <th>3월</th>
                <th>4월</th>
                <th>5월</th>
                <th>6월</th>
                <th>7월</th>
                <th>8월</th>
                <th>9월</th>
                <th>10월</th>
                <th>11월</th>
                <th>12월</th>
                <th>Total</th>
              </tr>
              {workResult.length === 0 ? (
                <tr style={{ textAlign: 'center' }}>
                  <td colSpan={14}>검색을 클릭해서 조회</td>
                </tr>
              ) : (
                workResult.map(work => (
                  <tr style={{ textAlign: 'center' }}>
                    <td>{work.NAME_TYPE}</td>
                    <td>{Number(month) >= 1 ? work.January || 0 : '-'}</td>
                    <td>{Number(month) >= 2 ? work.February || 0 : '-'}</td>
                    <td>{Number(month) >= 3 ? work.March || 0 : '-'}</td>
                    <td>{Number(month) >= 4 ? work.April || 0 : '-'}</td>
                    <td>{Number(month) >= 5 ? work.May || 0 : '-'}</td>
                    <td>{Number(month) >= 6 ? work.June || 0 : '-'}</td>
                    <td>{Number(month) >= 7 ? work.July || 0 : '-'}</td>
                    <td>{Number(month) >= 8 ? work.August || 0 : '-'}</td>
                    <td>{Number(month) >= 9 ? work.September || 0 : '-'}</td>
                    <td>{Number(month) >= 10 ? work.October || 0 : '-'}</td>
                    <td>{Number(month) >= 11 ? work.November || 0 : '-'}</td>
                    <td>{Number(month) === 12 ? work.December || 0 : '-'}</td>
                    <td>{work.WORK_TOTAL}</td>
                  </tr>
                ))
              )}
              <tr style={{ height: '40px' }}>
                <td colSpan={14}>2) 작업인원 현황 : {workerByMonth} 명</td>
              </tr>
              <tr style={{ textAlign: 'center' }}>
                <th>구분</th>
                <th>1월</th>
                <th>2월</th>
                <th>3월</th>
                <th>4월</th>
                <th>5월</th>
                <th>6월</th>
                <th>7월</th>
                <th>8월</th>
                <th>9월</th>
                <th>10월</th>
                <th>11월</th>
                <th>12월</th>
                <th>Total</th>
              </tr>
              {Object.keys(workerResult).length === 0 ? (
                <tr>
                  <td colSpan={14} style={{ textAlign: 'center' }}>
                    검색을 클릭해서 조회
                  </td>
                </tr>
              ) : (
                <tr style={{ textAlign: 'center' }}>
                  <td>작업인원</td>
                  <td>{Number(month) >= 1 ? workerResult.January || 0 : '-'}</td>
                  <td>{Number(month) >= 2 ? workerResult.February || 0 : '-'}</td>
                  <td>{Number(month) >= 3 ? workerResult.March || 0 : '-'}</td>
                  <td>{Number(month) >= 4 ? workerResult.April || 0 : '-'}</td>
                  <td>{Number(month) >= 5 ? workerResult.May || 0 : '-'}</td>
                  <td>{Number(month) >= 6 ? workerResult.June || 0 : '-'}</td>
                  <td>{Number(month) >= 7 ? workerResult.July || 0 : '-'}</td>
                  <td>{Number(month) >= 8 ? workerResult.August || 0 : '-'}</td>
                  <td>{Number(month) >= 9 ? workerResult.September || 0 : '-'}</td>
                  <td>{Number(month) >= 10 ? workerResult.October || 0 : '-'}</td>
                  <td>{Number(month) >= 11 ? workerResult.November || 0 : '-'}</td>
                  <td>{Number(month) >= 12 ? workerResult.December || 0 : '-'}</td>
                  <td>{workerResult.WORKER_TOTAL}</td>
                </tr>
              )}
              <tr style={{ height: '40px' }}>
                <td colSpan={14}>3) 안전위반 현황 : {`${penaltyResult.length}`} 건</td>
              </tr>
              <tr>
                <th>작업일자</th>
                <th colSpan={2}>업체명</th>
                <th colSpan={4}>작업내용</th>
                <th colSpan={7}>위반사항</th>
              </tr>
              {year === '' && month === '' && (
                <tr style={{ textAlign: 'center' }}>
                  <td colSpan={14}>검색을 클릭해서 조회</td>
                </tr>
              )}
              {year !== '' && month !== '' && penaltyResult.length === 0 ? (
                <tr style={{ textAlign: 'center' }}>
                  <td colSpan={14}>등록된 안전위반이 없습니다.</td>
                </tr>
              ) : (
                penaltyResult.map(penalty => (
                  <tr style={{ textAlign: 'center' }}>
                    <td>{penalty.WORK_DATE}</td>
                    <td colSpan={2}>{penalty.WRK_CMPNY_NM}</td>
                    <td colSpan={4}>{penalty.WORK_DESC}</td>
                    <td colSpan={7}>{penalty.CHECK_CONTENT}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </StyledHtmlTable>
      </CustomTableStyled>
    );
  }
}

SafetyWorkReport.propTypes = {
  reportData: PropTypes.object,
};

SafetyWorkReport.defaultProps = {};

export default SafetyWorkReport;
