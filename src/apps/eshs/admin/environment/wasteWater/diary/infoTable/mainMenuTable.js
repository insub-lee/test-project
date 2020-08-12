import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { FormOutlined } from '@ant-design/icons';
import { Input, InputNumber, DatePicker } from 'antd';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import styled from 'styled-components';

const AntdInput = StyledInput(Input);
const AntdInputNumber = StyledInputNumber(InputNumber);

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

  getDay = dateStr => {
    // 0: 일, 1: 월, 2: 화. 3: 수, 4: 목, 5: 금, 6: 토
    const dayIndex = moment(dateStr, 'YYYY-MM-DD').day();
    switch (dayIndex) {
      case 0:
        return '일요일';
      case 1:
        return '월요일';
      case 2:
        return '화요일';
      case 3:
        return '수요일';
      case 4:
        return '목요일';
      case 5:
        return '금요일';
      case 6:
        return '토요일';
      default:
        return '';
    }
  };

  render() {
    const { viewType, formData, onChangeFormData, onClickMenu, hasData } = this.props;
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
              <tr className="tr-center">
                <th>
                  <span>요일</span>
                </th>
                <td>
                  <span>{(formData.OP_DT && this.getDay(formData.OP_DT)) || ''}</span>
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
                    1. 배출시설 가동시간{hasData.EXHAUST_ACT === 0 ? <FormOutlined style={{ marginLeft: '5px', color: '#ff3333' }} /> : ''}
                  </span>
                </td>
                <td>
                  <span className="menu-span" role="button" tabIndex="0" onClick={() => onClickMenu('CLEAN_ACT')} onKeyPress={() => onClickMenu('CLEAN_ACT')}>
                    2. 방지시설 가동시간{hasData.CLEAN_ACT === 0 ? <FormOutlined style={{ marginLeft: '5px', color: '#ff3333' }} /> : ''}
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
  hasData: PropTypes.object,
  formData: PropTypes.object,
  onChangeFormData: PropTypes.func,
  onClickMenu: PropTypes.func,
};

MainMenuTable.defaultProps = {};

export default MainMenuTable;
