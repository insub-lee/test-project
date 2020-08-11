import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
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

// 방지시설 가동시간 테이블
class CleanActTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { renderData, formData, onChangeActFormData, onChangeAllActFormData, submitFormData } = this.props;
    const { CODE_LIST } = renderData;
    return (
      <Styled>
        <div className="middle-title-wrap">
          <div className="subFormTable-title-wrap" style={{ display: 'inline-block', width: '20%' }}>
            <span className="subFormTable-title">방지시설 가동시간</span>
          </div>
          <StyledButtonWrapper className="btn-wrap-right" style={{ display: 'inline-block', width: '80%' }}>
            <StyledButton className="btn-primary btn-xs ml5" onClick={() => submitFormData('SAVE_EXHAUST_ACT')}>
              저장
            </StyledButton>
          </StyledButtonWrapper>
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
              <col width="2%" />
            </colgroup>
            <tbody>
              <tr>
                <th rowSpan={2} colSpan={1}>
                  <span>배출 시설명</span>
                </th>
                <th rowSpan={2} colSpan={1}>
                  <span>전체</span>
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
                  const targetFormData = formData.find(item => item.EXHAUST_CD === row.EXHAUST_CD) || {};
                  return (
                    <tr key={row.EXHAUST_CD} className="tr-center">
                      <th colSpan={1}>
                        <span>{row.EXHAUST_NM}</span>
                      </th>
                      <td colSpan={1}>
                        <Checkbox
                          onChange={e => onChangeAllActFormData('EXHAUST_CD', row.EXHAUST_CD, e.target.checked)}
                          checked={(targetFormData.OP_ALL && targetFormData.OP_ALL === 'Y') || false}
                        />
                      </td>
                      <td colSpan={1}>
                        <Checkbox
                          onChange={e => onChangeActFormData('EXHAUST_CD', row.EXHAUST_CD, 'OP_06', e.target.checked)}
                          checked={(targetFormData.OP_06 && targetFormData.OP_06 === 'Y') || false}
                        />
                      </td>
                      <td colSpan={1}>
                        <Checkbox
                          onChange={e => onChangeActFormData('EXHAUST_CD', row.EXHAUST_CD, 'OP_07', e.target.checked)}
                          checked={(targetFormData.OP_07 && targetFormData.OP_07 === 'Y') || false}
                        />
                      </td>
                      <td colSpan={1}>
                        <Checkbox
                          onChange={e => onChangeActFormData('EXHAUST_CD', row.EXHAUST_CD, 'OP_08', e.target.checked)}
                          checked={(targetFormData.OP_08 && targetFormData.OP_08 === 'Y') || false}
                        />
                      </td>
                      <td colSpan={1}>
                        <Checkbox
                          onChange={e => onChangeActFormData('EXHAUST_CD', row.EXHAUST_CD, 'OP_09', e.target.checked)}
                          checked={(targetFormData.OP_09 && targetFormData.OP_09 === 'Y') || false}
                        />
                      </td>
                      <td colSpan={1}>
                        <Checkbox
                          onChange={e => onChangeActFormData('EXHAUST_CD', row.EXHAUST_CD, 'OP_10', e.target.checked)}
                          checked={(targetFormData.OP_10 && targetFormData.OP_10 === 'Y') || false}
                        />
                      </td>
                      <td colSpan={1}>
                        <Checkbox
                          onChange={e => onChangeActFormData('EXHAUST_CD', row.EXHAUST_CD, 'OP_11', e.target.checked)}
                          checked={(targetFormData.OP_11 && targetFormData.OP_11 === 'Y') || false}
                        />
                      </td>
                      <td colSpan={1}>
                        <Checkbox
                          onChange={e => onChangeActFormData('EXHAUST_CD', row.EXHAUST_CD, 'OP_12', e.target.checked)}
                          checked={(targetFormData.OP_12 && targetFormData.OP_12 === 'Y') || false}
                        />
                      </td>
                      <td colSpan={1}>
                        <Checkbox
                          onChange={e => onChangeActFormData('EXHAUST_CD', row.EXHAUST_CD, 'OP_13', e.target.checked)}
                          checked={(targetFormData.OP_13 && targetFormData.OP_13 === 'Y') || false}
                        />
                      </td>
                      <td colSpan={1}>
                        <Checkbox
                          onChange={e => onChangeActFormData('EXHAUST_CD', row.EXHAUST_CD, 'OP_14', e.target.checked)}
                          checked={(targetFormData.OP_14 && targetFormData.OP_14 === 'Y') || false}
                        />
                      </td>
                      <td colSpan={1}>
                        <Checkbox
                          onChange={e => onChangeActFormData('EXHAUST_CD', row.EXHAUST_CD, 'OP_15', e.target.checked)}
                          checked={(targetFormData.OP_15 && targetFormData.OP_15 === 'Y') || false}
                        />
                      </td>
                      <td colSpan={1}>
                        <Checkbox
                          onChange={e => onChangeActFormData('EXHAUST_CD', row.EXHAUST_CD, 'OP_16', e.target.checked)}
                          checked={(targetFormData.OP_16 && targetFormData.OP_16 === 'Y') || false}
                        />
                      </td>
                      <td colSpan={1}>
                        <Checkbox
                          onChange={e => onChangeActFormData('EXHAUST_CD', row.EXHAUST_CD, 'OP_17', e.target.checked)}
                          checked={(targetFormData.OP_17 && targetFormData.OP_17 === 'Y') || false}
                        />
                      </td>
                      <td colSpan={1}>
                        <Checkbox
                          onChange={e => onChangeActFormData('EXHAUST_CD', row.EXHAUST_CD, 'OP_18', e.target.checked)}
                          checked={(targetFormData.OP_18 && targetFormData.OP_18 === 'Y') || false}
                        />
                      </td>
                      <td colSpan={1}>
                        <Checkbox
                          onChange={e => onChangeActFormData('EXHAUST_CD', row.EXHAUST_CD, 'OP_19', e.target.checked)}
                          checked={(targetFormData.OP_19 && targetFormData.OP_19 === 'Y') || false}
                        />
                      </td>
                      <td colSpan={1}>
                        <Checkbox
                          onChange={e => onChangeActFormData('EXHAUST_CD', row.EXHAUST_CD, 'OP_20', e.target.checked)}
                          checked={(targetFormData.OP_20 && targetFormData.OP_20 === 'Y') || false}
                        />
                      </td>
                      <td colSpan={1}>
                        <Checkbox
                          onChange={e => onChangeActFormData('EXHAUST_CD', row.EXHAUST_CD, 'OP_21', e.target.checked)}
                          checked={(targetFormData.OP_21 && targetFormData.OP_21 === 'Y') || false}
                        />
                      </td>
                      <td colSpan={1}>
                        <Checkbox
                          onChange={e => onChangeActFormData('EXHAUST_CD', row.EXHAUST_CD, 'OP_22', e.target.checked)}
                          checked={(targetFormData.OP_22 && targetFormData.OP_22 === 'Y') || false}
                        />
                      </td>
                      <td colSpan={1}>
                        <Checkbox
                          onChange={e => onChangeActFormData('EXHAUST_CD', row.EXHAUST_CD, 'OP_23', e.target.checked)}
                          checked={(targetFormData.OP_23 && targetFormData.OP_23 === 'Y') || false}
                        />
                      </td>
                      <td colSpan={1}>
                        <Checkbox
                          onChange={e => onChangeActFormData('EXHAUST_CD', row.EXHAUST_CD, 'OP_24', e.target.checked)}
                          checked={(targetFormData.OP_24 && targetFormData.OP_24 === 'Y') || false}
                        />
                      </td>
                      <td colSpan={1}>
                        <Checkbox
                          onChange={e => onChangeActFormData('EXHAUST_CD', row.EXHAUST_CD, 'OP_01', e.target.checked)}
                          checked={(targetFormData.OP_01 && targetFormData.OP_01) === 'Y' || false}
                        />
                      </td>
                      <td colSpan={1}>
                        <Checkbox
                          onChange={e => onChangeActFormData('EXHAUST_CD', row.EXHAUST_CD, 'OP_02', e.target.checked)}
                          checked={(targetFormData.OP_02 && targetFormData.OP_02 === 'Y') || false}
                        />
                      </td>
                      <td colSpan={1}>
                        <Checkbox
                          onChange={e => onChangeActFormData('EXHAUST_CD', row.EXHAUST_CD, 'OP_03', e.target.checked)}
                          checked={(targetFormData.OP_03 && targetFormData.OP_03 === 'Y') || false}
                        />
                      </td>
                      <td colSpan={1}>
                        <Checkbox
                          onChange={e => onChangeActFormData('EXHAUST_CD', row.EXHAUST_CD, 'OP_04', e.target.checked)}
                          checked={(targetFormData.OP_04 && targetFormData.OP_04 === 'Y') || false}
                        />
                      </td>
                      <td colSpan={1}>
                        <Checkbox
                          onChange={e => onChangeActFormData('EXHAUST_CD', row.EXHAUST_CD, 'OP_05', e.target.checked)}
                          checked={(targetFormData.OP_05 && targetFormData.OP_05 === 'Y') || false}
                        />
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

CleanActTable.propTypes = {
  renderData: PropTypes.object,
  formData: PropTypes.array,
  onChangeActFormData: PropTypes.func,
  onChangeAllActFormData: PropTypes.func,
  submitFormData: PropTypes.func,
};

CleanActTable.defaultProps = {
  formData: [],
  renderData: {
    EXHAUST_ACT_LIST: [],
    EXHAUST_CODE_LIST: [],
  },
};

export default CleanActTable;
