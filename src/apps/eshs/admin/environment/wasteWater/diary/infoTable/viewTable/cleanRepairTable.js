import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import styled from 'styled-components';

const Styled = styled.div`
  .middle-title-wrap {
    margin: 20px 0px 5px 0px;
  }

  .subFormTable-title {
    padding-left: 5px;
    font-weight: 600;
  }
`;

// 용폐수 - 관리 - 일지 - 방지시설 유지보수 관리
class WattmeterTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { cleanRepairData } = this.props;
    return (
      <Styled>
        <div className="middle-title-wrap">
          <div className="subFormTable-title-wrap" style={{ display: 'inline-block', width: '20%' }}>
            <span className="subFormTable-title">방지시설 유지보수</span>
          </div>
        </div>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="20%" />
              <col width="10%" />
              <col width="10%" />
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
            </colgroup>
            <tbody>
              <tr>
                <th colSpan={1}>
                  <span>방지시설명</span>
                </th>
                <th colSpan={1}>
                  <span>From</span>
                </th>
                <th colSpan={1}>
                  <span>To</span>
                </th>
                <th colSpan={1}>
                  <span>고장상태</span>
                </th>
                <th colSpan={1}>
                  <span>조치상태</span>
                </th>
                <th colSpan={1}>
                  <span>특기사항</span>
                </th>
              </tr>
              {cleanRepairData && cleanRepairData.length > 0 ? (
                cleanRepairData.map(row => (
                  <tr key={row.SEQ} className="tr-center">
                    <th colSpan={1}>
                      <span>{row.CLEAN_NM}</span>
                    </th>
                    <td colSpan={1}>
                      <span>{row.TIME_FROM}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.TIME_TO}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.STATE}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.STATE_AFTER}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.COMMENTS}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr key="empty" className="tr-center">
                  <td colSpan={6}>
                    <span>조회된 데이터가 없습니다.</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </StyledHtmlTable>
      </Styled>
    );
  }
}

WattmeterTable.propTypes = {
  cleanRepairData: PropTypes.array,
};

WattmeterTable.defaultProps = {
  cleanRepairData: [],
};

export default WattmeterTable;
