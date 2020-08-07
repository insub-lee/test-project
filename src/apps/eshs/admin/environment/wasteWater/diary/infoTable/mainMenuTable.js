import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Modal, Select, Input, InputNumber, Checkbox, DatePicker } from 'antd';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import styled from 'styled-components';

const AntdInput = StyledInput(Input);
const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdDatePicker = StyledDatePicker(DatePicker);

const Styled = styled.div`
  .menu-table {
    border-top: 0px;
  }

  .menu-span {
    color: #00b33c;
  }

  .menu-span:hover {
    cursor: pointer;
    color: #00e64d;
  }
`;

class MainMenuTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { viewType, formData, onChangeFormData, onClickMenu } = this.props;
    return (
      <Styled>
        <StyledHtmlTable>
          <table className="info-table">
            <colgroup>
              <col width="10%" />
              <col width="15%" />
              <col width="10%" />
              <col width="15%" />
              <col width="10%" />
              <col width="15%" />
              <col width="10%" />
              <col width="25%" />
            </colgroup>
            <tbody>
              <tr>
                <th>
                  <span>날짜</span>
                </th>
                <td>
                  {viewType === 'view' && formData.OP_DT ? (
                    <span>{formData.OP_DT}</span>
                  ) : (
                    <AntdDatePicker className="ant-picker-xxs" format="YYYY-MM-DD" style={{ width: '100%' }} value={moment(formData.OP_DT, 'YYYY-MM-DD')} />
                  )}
                </td>
                <th>
                  <span>온도</span>
                </th>
                <td>
                  {viewType === 'view' && formData.TEMPERATURE ? (
                    <span>{formData.TEMPERATURE}</span>
                  ) : (
                    <AntdInputNumber className="ant-input-number-xxs" style={{ width: '100%' }} value={formData.TEMPERATURE} />
                  )}
                </td>
                <th>
                  <span>날씨</span>
                </th>
                <td>
                  {viewType === 'view' && formData.WEATHER ? (
                    <span>{formData.WEATHER}</span>
                  ) : (
                    <AntdInput className="ant-input-xxs" style={{ width: '100%' }} value={formData.WEATHER} />
                  )}
                </td>
                <th>
                  <span>결재</span>
                </th>
                <td>{viewType === 'view' && formData.EMP_NM && <span>{`${formData.EMP_NM}(${formData.APPROVAL_STATE})`}</span>}</td>
              </tr>
            </tbody>
          </table>
          <table className="menu-table">
            <colgroup>
              <col />
              <col />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th colSpan={3}>
                  <span>운영일지 구성항목</span>
                </th>
              </tr>
              <tr>
                <td>
                  <span
                    className="menu-span"
                    role="button"
                    tabIndex="0"
                    onClick={() => onClickMenu('EXHAUST_ACT')}
                    onKeyPress={() => onClickMenu('EXHAUST_ACT')}
                  >
                    1. 배출시설 가동시간
                  </span>
                </td>
                <td>
                  <span className="menu-span" role="button" tabIndex="0" onClick={() => onClickMenu('CLEAN_ACT')} onKeyPress={() => onClickMenu('CLEAN_ACT')}>
                    2. 방지시설 가동시간
                  </span>
                </td>
                <td>
                  <span className="menu-span">3. 용수공급원별 사용량</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="menu-span">4. 폐수 발생량</span>
                </td>
                <td>
                  <span className="menu-span">5. Sludge 발생 및 처리량</span>
                </td>
                <td>
                  <span className="menu-span">6. 원료 / 첨가제 사용량</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="menu-span">7. 전력 사용량</span>
                </td>
                <td>
                  <span className="menu-span">8. 약품 사용량</span>
                </td>
                <td>
                  <span className="menu-span">9. 폭기조 운전상태</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="menu-span">10. 방지시설 유지보수</span>
                </td>
                <td>
                  <span className="menu-span">11. 오염물질 측정 내용</span>
                </td>
                <td>
                  <span className="menu-span">12. 유기물 등 오염물질 자동측정 결과</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="menu-span">13. 지도 / 점검 사항</span>
                </td>
                <td colSpan={2}></td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
      </Styled>
    );
  }
}

MainMenuTable.propTypes = {
  viewType: PropTypes.string,
  formData: PropTypes.object,
  onChangeFormData: PropTypes.func,
  onClickMenu: PropTypes.func,
};

MainMenuTable.defaultProps = {};

export default MainMenuTable;
