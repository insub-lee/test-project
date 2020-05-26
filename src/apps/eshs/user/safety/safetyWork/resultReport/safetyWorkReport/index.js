import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';

class SafetyWorkReport extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { reportData } = this.props;
    const { workByMonth, penaltyByMonth, workerByMonth, workResult, workerResult, penaltyResult, year, month } = reportData;
    return (
      <ContentsWrapper>
        <StyledHtmlTable>
          <table>
            <tbody>
              <tr style={{ textAlign: 'center' }}>
                <td colSpan={10} rowSpan={4}>
                  <span style={{ fontSize: 35 }}>공사업체 안전작업 관리 현황 보고</span>
                  <br />
                  {year && year !== '' && month && month !== '' && <span style={{ fontSize: 35 }}>{`${year}년 ${month}월`}</span>}
                </td>
                <td rowSpan={2} style={{ width: '90px' }}>
                  결<br />재
                </td>
                <td style={{ width: '90px' }}>기안/접수</td>
                <td style={{ width: '90px' }}>검토</td>
                <td style={{ width: '90px' }}>승인/전결</td>
              </tr>
              <tr style={{ height: '80px' }}>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr style={{ textAlign: 'center' }}>
                <td style={{ width: '90px' }}>직위/성명</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr style={{ textAlign: 'center' }}>
                <td style={{ width: '90px' }}>일자</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr style={{ height: '40px' }}>
                <td colSpan={14}>
                  1) 작업별 현황 및 위반율
                  <br />
                  &nbsp;&nbsp;&nbsp;- 작업허가 : {`${workByMonth}`} 건
                  <br />
                  &nbsp;&nbsp;&nbsp;- 안전위반율 : {`${penaltyByMonth}`} %
                </td>
              </tr>
              <tr>
                <th style={{ width: '100px' }}>작업구분</th>
                <th style={{ width: '90px' }}>1월</th>
                <th style={{ width: '90px' }}>2월</th>
                <th style={{ width: '90px' }}>3월</th>
                <th style={{ width: '90px' }}>4월</th>
                <th style={{ width: '90px' }}>5월</th>
                <th style={{ width: '90px' }}>6월</th>
                <th style={{ width: '90px' }}>7월</th>
                <th style={{ width: '90px' }}>8월</th>
                <th style={{ width: '90px' }}>9월</th>
                <th style={{ width: '90px' }}>10월</th>
                <th style={{ width: '90px' }}>11월</th>
                <th style={{ width: '90px' }}>12월</th>
                <th style={{ width: '90px' }}>Total</th>
              </tr>
              {workResult.length === 0 ? (
                <tr style={{ textAlign: 'center' }}>
                  <td colSpan={14}>검색을 클릭해서 조회</td>
                </tr>
              ) : (
                workResult.map(work => (
                  <tr style={{ textAlign: 'center' }}>
                    <td>{work.NAME_TYPE}</td>
                    <td>{work.January}</td>
                    <td>{work.February}</td>
                    <td>{work.March}</td>
                    <td>{work.April}</td>
                    <td>{work.May}</td>
                    <td>{work.June}</td>
                    <td>{work.July}</td>
                    <td>{work.August}</td>
                    <td>{work.September}</td>
                    <td>{work.October}</td>
                    <td>{work.November}</td>
                    <td>{work.December}</td>
                    <td>{work.WORK_TOTAL}</td>
                  </tr>
                ))
              )}
              <tr style={{ height: '40px' }}>
                <td colSpan={14}>2) 작업인원 현황 : {workerByMonth} 명</td>
              </tr>
              <tr style={{ textAlign: 'center' }}>
                <th style={{ width: '100px' }}>구분</th>
                <th style={{ width: '90px' }}>1월</th>
                <th style={{ width: '90px' }}>2월</th>
                <th style={{ width: '90px' }}>3월</th>
                <th style={{ width: '90px' }}>4월</th>
                <th style={{ width: '90px' }}>5월</th>
                <th style={{ width: '90px' }}>6월</th>
                <th style={{ width: '90px' }}>7월</th>
                <th style={{ width: '90px' }}>8월</th>
                <th style={{ width: '90px' }}>9월</th>
                <th style={{ width: '90px' }}>10월</th>
                <th style={{ width: '90px' }}>11월</th>
                <th style={{ width: '90px' }}>12월</th>
                <th style={{ width: '90px' }}>Total</th>
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
                  <td>{workerResult.January}</td>
                  <td>{workerResult.February}</td>
                  <td>{workerResult.March}</td>
                  <td>{workerResult.April}</td>
                  <td>{workerResult.May}</td>
                  <td>{workerResult.June}</td>
                  <td>{workerResult.July}</td>
                  <td>{workerResult.August}</td>
                  <td>{workerResult.September}</td>
                  <td>{workerResult.October}</td>
                  <td>{workerResult.November}</td>
                  <td>{workerResult.December}</td>
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
      </ContentsWrapper>
    );
  }
}

SafetyWorkReport.propTypes = {
  reportData: PropTypes.object,
};

SafetyWorkReport.defaultProps = {};

export default SafetyWorkReport;
