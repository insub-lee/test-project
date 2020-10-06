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

// 용폐수 - 관리 - 일지 - Sludge 처리 시설
class SludgeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { sludgeData } = this.props;
    return (
      <Styled>
        <div className="middle-title-wrap">
          <div className="subFormTable-title-wrap" style={{ display: 'inline-block', width: '20%' }}>
            <span className="subFormTable-title">Sludge처리 시설</span>
          </div>
        </div>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
            </colgroup>
            <tbody>
              <tr>
                <th colSpan={1}>
                  <span>폐기물품목명</span>
                </th>
                <th colSpan={1}>
                  <span>금일발생량</span>
                </th>
                <th colSpan={1}>
                  <span>금일처리량</span>
                </th>
                <th colSpan={1}>
                  <span>보관량</span>
                </th>
                <th colSpan={1}>
                  <span>함수율</span>
                </th>
              </tr>
              {sludgeData && sludgeData.length > 0 ? (
                sludgeData.map(row => (
                  <tr key={row.SLUDGE_CD} className="tr-center">
                    <th colSpan={1}>
                      <span>{row.SLUDGE_CD ? row.SLUDGE_NM : ''}</span>
                    </th>
                    <td colSpan={1}>
                      <span>{row.GENERATED_AMOUNT}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.REMOVAL_AMOUNT}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.KEEPING_AMOUNT}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.FUNCTION_RATE}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr key="empty" className="tr-center">
                  <td colSpan={5}>
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

SludgeTable.propTypes = {
  sludgeData: PropTypes.array,
};

SludgeTable.defaultProps = {
  sludgeData: [],
};

export default SludgeTable;
