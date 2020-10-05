import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputNumber } from 'antd';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import styled from 'styled-components';

const AntdInputNumber = StyledInputNumber(InputNumber);

const Styled = styled.div`
  .middle-title-wrap {
    margin: 20px 0px 5px 0px;
  }

  .subFormTable-title {
    padding-left: 5px;
    font-weight: 600;
  }
`;

// 유기물 등 오염물질 자동측정 결과 테이블 (일지당 1 row)
class CodCheckTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { codCheckData } = this.props;
    return (
      <Styled>
        <div className="middle-title-wrap">
          <div className="subFormTable-title-wrap" style={{ display: 'inline-block', width: '20%' }}>
            <span className="subFormTable-title">유기물 등 오염물질 자동측정 결과</span>
          </div>
        </div>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="10%" />
              <col width="6.9%" />
              <col width="6.9%" />
              <col width="6.9%" />
              <col width="6.9%" />
              <col width="6.9%" />
              <col width="6.9%" />
              <col width="6.9%" />
              <col width="6.9%" />
              <col width="6.9%" />
              <col width="6.9%" />
              <col width="6.9%" />
              <col width="6.9%" />
              <col width="6.9%" />
            </colgroup>
            <tbody>
              <tr>
                <th colSpan={1}>
                  <span>구분</span>
                </th>
                <th colSpan={1}>
                  <span>평균</span>
                </th>
                <th colSpan={1}>
                  <span>02:00</span>
                </th>
                <th colSpan={1}>
                  <span>04:00</span>
                </th>
                <th colSpan={1}>
                  <span>06:00</span>
                </th>
                <th colSpan={1}>
                  <span>08:00</span>
                </th>
                <th colSpan={1}>
                  <span>10:00</span>
                </th>
                <th colSpan={1}>
                  <span>12:00</span>
                </th>
                <th colSpan={1}>
                  <span>14:00</span>
                </th>
                <th colSpan={1}>
                  <span>16:00</span>
                </th>
                <th colSpan={1}>
                  <span>18:00</span>
                </th>
                <th colSpan={1}>
                  <span>20:00</span>
                </th>
                <th colSpan={1}>
                  <span>22:00</span>
                </th>
                <th colSpan={1}>
                  <span>24:00</span>
                </th>
              </tr>
              <tr key="empty" className="tr-center">
                <td colSpan={1}>
                  <span>COD측정치(㎖/ℓ)</span>
                </td>
                <td colSpan={1}>
                  <span>{codCheckData.AVG || 0}</span>
                </td>
                <td colSpan={1}>
                  <span>{codCheckData.CHK_02 || 0}</span>
                </td>
                <td colSpan={1}>
                  <span>{codCheckData.CHK_04 || 0}</span>
                </td>
                <td colSpan={1}>
                  <span>{codCheckData.CHK_06 || 0}</span>
                </td>
                <td colSpan={1}>
                  <span>{codCheckData.CHK_08 || 0}</span>
                </td>
                <td colSpan={1}>
                  <span>{codCheckData.CHK_10 || 0}</span>
                </td>
                <td colSpan={1}>
                  <span>{codCheckData.CHK_12 || 0}</span>
                </td>
                <td colSpan={1}>
                  <span>{codCheckData.CHK_14 || 0}</span>
                </td>
                <td colSpan={1}>
                  <span>{codCheckData.CHK_16 || 0}</span>
                </td>
                <td colSpan={1}>
                  <span>{codCheckData.CHK_18 || 0}</span>
                </td>
                <td colSpan={1}>
                  <span>{codCheckData.CHK_20 || 0}</span>
                </td>
                <td colSpan={1}>
                  <span>{codCheckData.CHK_22 || 0}</span>
                </td>
                <td colSpan={1}>
                  <span>{codCheckData.CHK_24 || 0}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
      </Styled>
    );
  }
}

CodCheckTable.propTypes = {
  codCheckData: PropTypes.object,
};

CodCheckTable.defaultProps = {
  codCheckData: {},
};

export default CodCheckTable;
