import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Input } from 'antd';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
// import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
// import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import styled from 'styled-components';

// const AntdInput = StyledInput(Input);

const Styled = styled.div`
  .middle-title-wrap {
    margin: 20px 0px 5px 0px;
  }

  .subFormTable-title {
    padding-left: 5px;
    font-weight: 600;
  }
`;

// 용폐수 - 관리 - 일지 - 약품사용량
class UsedChemicalTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { formData } = this.props;
    return (
      <Styled>
        <div className="middle-title-wrap">
          <div className="subFormTable-title-wrap" style={{ display: 'inline-block', width: '20%' }}>
            <span className="subFormTable-title">약품사용량</span>
          </div>
          <StyledButtonWrapper className="btn-wrap-right" style={{ display: 'inline-block', width: '80%' }}>
            {/* 
              <StyledButton className="btn-primary btn-xs ml5" onClick={() => submitFormData('SAVE_WATER_FLOW')}>
                검침시간 저장
              </StyledButton>
              */}
          </StyledButtonWrapper>
        </div>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="20%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
              <col width="15%" />
              <col width="15%" />
              <col width="10%" />
            </colgroup>
            <tbody>
              <tr>
                <th colSpan={1}>
                  <span>약품명</span>
                </th>
                <th colSpan={1}>
                  <span>약품농도</span>
                </th>
                <th colSpan={1}>
                  <span>전일재고량</span>
                </th>
                <th colSpan={1}>
                  <span>금일입고량</span>
                </th>
                <th colSpan={1}>
                  <span>금일재고량</span>
                </th>
                <th colSpan={1}>
                  <span>금일사용량</span>
                </th>
                <th colSpan={1}>
                  <span>당월사용량누계</span>
                </th>
                <th colSpan={1}>
                  <span>거래처</span>
                </th>
                <th colSpan={1}>
                  <span>단가년월</span>
                </th>
              </tr>
              {formData && formData.length > 0 ? (
                formData.map(row => (
                  <tr key={row.CHEMICAL_CD} className="tr-center">
                    <th colSpan={1}>
                      <span>{row.CHEMICAL_NM}</span>
                    </th>
                    <td colSpan={1}>
                      <span>{row.CHEMICAL_DENSITY}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.BEFORE_STOCK_QTY}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.GR_QTY}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.STOCK_QTY}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.USED_QTY}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.MONTHLY_USED_QTY}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.VENDOR_NM}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.UNITPRICE_DATE}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr key="empty" className="tr-center">
                  <td colSpan={9}>
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

UsedChemicalTable.propTypes = {
  formData: PropTypes.array,
};

UsedChemicalTable.defaultProps = {
  formData: [],
};

export default UsedChemicalTable;
