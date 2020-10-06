import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
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

class ExhaustViewTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { exhaustData } = this.props;
    const { ACT_LIST, CODE_LIST } = exhaustData;
    return (
      <Styled>
        <div className="middle-title-wrap">
          <div className="subFormTable-title-wrap" style={{ display: 'inline-block', width: '20%' }}>
            <span className="subFormTable-title">배출시설 가동시간</span>
          </div>
        </div>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col />
              <col width="2%" />
              <col width="2%" />
              <col width="2%" />
              <col width="2%" />
              <col width="2%" />
              <col width="2%" />
              <col width="2%" />
              <col width="2%" />
              <col width="2%" />
              <col width="2%" />
              <col width="2%" />
              <col width="2%" />
              <col width="2%" />
              <col width="2%" />
              <col width="2%" />
              <col width="2%" />
              <col width="2%" />
              <col width="2%" />
              <col width="2%" />
              <col width="2%" />
              <col width="2%" />
              <col width="2%" />
              <col width="2%" />
              <col width="2%" />
            </colgroup>
            <tbody>
              <tr>
                <th rowSpan={2} colSpan={1}>
                  <span>배출 시설명</span>
                </th>
                <th rowSpan={1} colSpan={24}>
                  <span>시간대별 가동여부</span>
                </th>
              </tr>
              <tr>
                <th colSpan={1}>06</th>
                <th colSpan={1}>07</th>
                <th colSpan={1}>08</th>
                <th colSpan={1}>09</th>
                <th colSpan={1}>10</th>
                <th colSpan={1}>11</th>
                <th colSpan={1}>12</th>
                <th colSpan={1}>13</th>
                <th colSpan={1}>14</th>
                <th colSpan={1}>15</th>
                <th colSpan={1}>16</th>
                <th colSpan={1}>17</th>
                <th colSpan={1}>18</th>
                <th colSpan={1}>19</th>
                <th colSpan={1}>20</th>
                <th colSpan={1}>21</th>
                <th colSpan={1}>22</th>
                <th colSpan={1}>23</th>
                <th colSpan={1}>24</th>
                <th colSpan={1}>01</th>
                <th colSpan={1}>02</th>
                <th colSpan={1}>03</th>
                <th colSpan={1}>04</th>
                <th colSpan={1}>05</th>
              </tr>
              {CODE_LIST &&
                CODE_LIST.length > 0 &&
                CODE_LIST.map(row => {
                  const targetFormData = ACT_LIST.find(item => item.EXHAUST_CD === row.EXHAUST_CD) || {};
                  return (
                    <tr key={row.EXHAUST_CD} className="tr-center">
                      <th colSpan={1}>
                        <span>{row.EXHAUST_NM}</span>
                      </th>
                      <td colSpan={1}>
                        {targetFormData.OP_06 && targetFormData.OP_06 === 'Y' ? (
                          <CheckOutlined style={{ color: '#5cd65c' }} />
                        ) : (
                          <CloseOutlined style={{ color: '#ff4d4d' }} />
                        )}
                      </td>
                      <td colSpan={1}>
                        {targetFormData.OP_07 && targetFormData.OP_07 === 'Y' ? (
                          <CheckOutlined style={{ color: '#5cd65c' }} />
                        ) : (
                          <CloseOutlined style={{ color: '#ff4d4d' }} />
                        )}
                      </td>
                      <td colSpan={1}>
                        {targetFormData.OP_08 && targetFormData.OP_08 === 'Y' ? (
                          <CheckOutlined style={{ color: '#5cd65c' }} />
                        ) : (
                          <CloseOutlined style={{ color: '#ff4d4d' }} />
                        )}
                      </td>
                      <td colSpan={1}>
                        {targetFormData.OP_09 && targetFormData.OP_09 === 'Y' ? (
                          <CheckOutlined style={{ color: '#5cd65c' }} />
                        ) : (
                          <CloseOutlined style={{ color: '#ff4d4d' }} />
                        )}
                      </td>
                      <td colSpan={1}>
                        {targetFormData.OP_10 && targetFormData.OP_10 === 'Y' ? (
                          <CheckOutlined style={{ color: '#5cd65c' }} />
                        ) : (
                          <CloseOutlined style={{ color: '#ff4d4d' }} />
                        )}
                      </td>
                      <td colSpan={1}>
                        {targetFormData.OP_11 && targetFormData.OP_11 === 'Y' ? (
                          <CheckOutlined style={{ color: '#5cd65c' }} />
                        ) : (
                          <CloseOutlined style={{ color: '#ff4d4d' }} />
                        )}
                      </td>
                      <td colSpan={1}>
                        {targetFormData.OP_12 && targetFormData.OP_12 === 'Y' ? (
                          <CheckOutlined style={{ color: '#5cd65c' }} />
                        ) : (
                          <CloseOutlined style={{ color: '#ff4d4d' }} />
                        )}
                      </td>
                      <td colSpan={1}>
                        {targetFormData.OP_13 && targetFormData.OP_13 === 'Y' ? (
                          <CheckOutlined style={{ color: '#5cd65c' }} />
                        ) : (
                          <CloseOutlined style={{ color: '#ff4d4d' }} />
                        )}
                      </td>
                      <td colSpan={1}>
                        {targetFormData.OP_14 && targetFormData.OP_14 === 'Y' ? (
                          <CheckOutlined style={{ color: '#5cd65c' }} />
                        ) : (
                          <CloseOutlined style={{ color: '#ff4d4d' }} />
                        )}
                      </td>
                      <td colSpan={1}>
                        {targetFormData.OP_15 && targetFormData.OP_15 === 'Y' ? (
                          <CheckOutlined style={{ color: '#5cd65c' }} />
                        ) : (
                          <CloseOutlined style={{ color: '#ff4d4d' }} />
                        )}
                      </td>
                      <td colSpan={1}>
                        {targetFormData.OP_16 && targetFormData.OP_16 === 'Y' ? (
                          <CheckOutlined style={{ color: '#5cd65c' }} />
                        ) : (
                          <CloseOutlined style={{ color: '#ff4d4d' }} />
                        )}
                      </td>
                      <td colSpan={1}>
                        {targetFormData.OP_17 && targetFormData.OP_17 === 'Y' ? (
                          <CheckOutlined style={{ color: '#5cd65c' }} />
                        ) : (
                          <CloseOutlined style={{ color: '#ff4d4d' }} />
                        )}
                      </td>
                      <td colSpan={1}>
                        {targetFormData.OP_18 && targetFormData.OP_18 === 'Y' ? (
                          <CheckOutlined style={{ color: '#5cd65c' }} />
                        ) : (
                          <CloseOutlined style={{ color: '#ff4d4d' }} />
                        )}
                      </td>
                      <td colSpan={1}>
                        {targetFormData.OP_19 && targetFormData.OP_19 === 'Y' ? (
                          <CheckOutlined style={{ color: '#5cd65c' }} />
                        ) : (
                          <CloseOutlined style={{ color: '#ff4d4d' }} />
                        )}
                      </td>
                      <td colSpan={1}>
                        {targetFormData.OP_20 && targetFormData.OP_20 === 'Y' ? (
                          <CheckOutlined style={{ color: '#5cd65c' }} />
                        ) : (
                          <CloseOutlined style={{ color: '#ff4d4d' }} />
                        )}
                      </td>
                      <td colSpan={1}>
                        {targetFormData.OP_21 && targetFormData.OP_21 === 'Y' ? (
                          <CheckOutlined style={{ color: '#5cd65c' }} />
                        ) : (
                          <CloseOutlined style={{ color: '#ff4d4d' }} />
                        )}
                      </td>
                      <td colSpan={1}>
                        {targetFormData.OP_22 && targetFormData.OP_22 === 'Y' ? (
                          <CheckOutlined style={{ color: '#5cd65c' }} />
                        ) : (
                          <CloseOutlined style={{ color: '#ff4d4d' }} />
                        )}
                      </td>
                      <td colSpan={1}>
                        {targetFormData.OP_23 && targetFormData.OP_23 === 'Y' ? (
                          <CheckOutlined style={{ color: '#5cd65c' }} />
                        ) : (
                          <CloseOutlined style={{ color: '#ff4d4d' }} />
                        )}
                      </td>
                      <td colSpan={1}>
                        {targetFormData.OP_24 && targetFormData.OP_24 === 'Y' ? (
                          <CheckOutlined style={{ color: '#5cd65c' }} />
                        ) : (
                          <CloseOutlined style={{ color: '#ff4d4d' }} />
                        )}
                      </td>
                      <td colSpan={1}>
                        {targetFormData.OP_01 && targetFormData.OP_01 === 'Y' ? (
                          <CheckOutlined style={{ color: '#5cd65c' }} />
                        ) : (
                          <CloseOutlined style={{ color: '#ff4d4d' }} />
                        )}
                      </td>
                      <td colSpan={1}>
                        {targetFormData.OP_02 && targetFormData.OP_02 === 'Y' ? (
                          <CheckOutlined style={{ color: '#5cd65c' }} />
                        ) : (
                          <CloseOutlined style={{ color: '#ff4d4d' }} />
                        )}
                      </td>
                      <td colSpan={1}>
                        {targetFormData.OP_03 && targetFormData.OP_03 === 'Y' ? (
                          <CheckOutlined style={{ color: '#5cd65c' }} />
                        ) : (
                          <CloseOutlined style={{ color: '#ff4d4d' }} />
                        )}
                      </td>
                      <td colSpan={1}>
                        {targetFormData.OP_04 && targetFormData.OP_04 === 'Y' ? (
                          <CheckOutlined style={{ color: '#5cd65c' }} />
                        ) : (
                          <CloseOutlined style={{ color: '#ff4d4d' }} />
                        )}
                      </td>
                      <td colSpan={1}>
                        {targetFormData.OP_05 && targetFormData.OP_05 === 'Y' ? (
                          <CheckOutlined style={{ color: '#5cd65c' }} />
                        ) : (
                          <CloseOutlined style={{ color: '#ff4d4d' }} />
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </StyledHtmlTable>
      </Styled>
    );
  }
}

ExhaustViewTable.propTypes = {
  exhaustData: PropTypes.object,
};

ExhaustViewTable.defaultProps = {
  exhaustData: {
    formData: [],
    renderData: {
      EXHAUST_ACT_LIST: [],
      EXHAUST_CODE_LIST: [],
    },
  },
};

export default ExhaustViewTable;
