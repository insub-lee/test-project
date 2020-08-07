import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Modal, Select, Input, InputNumber, Checkbox, DatePicker } from 'antd';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import styled from 'styled-components';

const Styled = styled.div`
  .middle-title-wrap {
    margin: 10px 0px 5px 0px;
  }

  .subFormTable-title {
    padding-left: 5px;
    font-weight: 600;
  }
`;

const AntdInput = StyledInput(Input);
const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdDatePicker = StyledDatePicker(DatePicker);

class MainMenuTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeList: [],
      actFormData: [],
    };
  }

  render() {
    const { renderData } = this.props;
    const { EXHAUST_ACT_LIST, EXHAUST_CODE_LIST } = renderData;
    return (
      <Styled>
        <div className="middle-title-wrap">
          <div className="subFormTable-title-wrap" style={{ display: 'inline-block', width: '20%' }}>
            <span className="subFormTable-title">배출시설 가동시간</span>
          </div>
          <StyledButtonWrapper className="btn-wrap-right" style={{ display: 'inline-block', width: '80%' }}>
            <StyledButton className="btn-primary btn-xs ml5" onClick={() => console.debug('SAVE', true)}>
              저장
            </StyledButton>
            <StyledButton className="btn-gray btn-xs ml5" onClick={() => console.debug('MPMP', true)}>
              표준가동시간대 검색
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
              {EXHAUST_CODE_LIST &&
                EXHAUST_CODE_LIST.length > 0 &&
                EXHAUST_CODE_LIST.map(row => (
                  <tr className="tr-center">
                    <th colSpan={1}>
                      <span>{row.EXHAUST_NM}</span>
                    </th>
                    <td colSpan={1}>체크</td>
                    <td colSpan={1}>06</td>
                    <td colSpan={1}>07</td>
                    <td colSpan={1}>08</td>
                    <td colSpan={1}>09</td>
                    <td colSpan={1}>10</td>
                    <td colSpan={1}>11</td>
                    <td colSpan={1}>12</td>
                    <td colSpan={1}>13</td>
                    <td colSpan={1}>14</td>
                    <td colSpan={1}>15</td>
                    <td colSpan={1}>16</td>
                    <td colSpan={1}>17</td>
                    <td colSpan={1}>18</td>
                    <td colSpan={1}>19</td>
                    <td colSpan={1}>20</td>
                    <td colSpan={1}>21</td>
                    <td colSpan={1}>22</td>
                    <td colSpan={1}>23</td>
                    <td colSpan={1}>24</td>
                    <td colSpan={1}>01</td>
                    <td colSpan={1}>02</td>
                    <td colSpan={1}>03</td>
                    <td colSpan={1}>04</td>
                    <td colSpan={1}>05</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </StyledHtmlTable>
      </Styled>
    );
  }
}

MainMenuTable.propTypes = {
  renderData: PropTypes.object,
};

MainMenuTable.defaultProps = {
  renderData: {
    EXHAUST_ACT_LIST: [],
    EXHAUST_CODE_LIST: [],
  },
};

export default MainMenuTable;
