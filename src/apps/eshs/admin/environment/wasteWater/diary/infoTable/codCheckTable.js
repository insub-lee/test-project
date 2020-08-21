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
    const { formData, submitFormData, onChangeFormData } = this.props;
    return (
      <Styled>
        <div className="middle-title-wrap">
          <div className="subFormTable-title-wrap" style={{ display: 'inline-block', width: '20%' }}>
            <span className="subFormTable-title">유기물 등 오염물질 자동측정 결과</span>
          </div>
          <StyledButtonWrapper className="btn-wrap-right" style={{ display: 'inline-block', width: '80%' }}>
            <StyledButton className="btn-primary btn-xxs ml5" onClick={() => submitFormData('SAVE_COD_CHK')}>
              저장
            </StyledButton>
          </StyledButtonWrapper>
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
                  <span>{formData.AVG || 0}</span>
                </td>
                <td colSpan={1}>
                  <AntdInputNumber
                    className="ant-input-number-inline ant-input-number-xs mr5"
                    style={{ width: '100%' }}
                    defaultValue={formData.CHK_02 || 0}
                    onChange={e => onChangeFormData('CHK_02', e)}
                  />
                </td>
                <td colSpan={1}>
                  <AntdInputNumber
                    className="ant-input-number-inline ant-input-number-xs mr5"
                    style={{ width: '100%' }}
                    defaultValue={formData.CHK_04 || 0}
                    onChange={e => onChangeFormData('CHK_04', e)}
                  />
                </td>
                <td colSpan={1}>
                  <AntdInputNumber
                    className="ant-input-number-inline ant-input-number-xs mr5"
                    style={{ width: '100%' }}
                    defaultValue={formData.CHK_06 || 0}
                    onChange={e => onChangeFormData('CHK_06', e)}
                  />
                </td>
                <td colSpan={1}>
                  <AntdInputNumber
                    className="ant-input-number-inline ant-input-number-xs mr5"
                    style={{ width: '100%' }}
                    defaultValue={formData.CHK_08 || 0}
                    onChange={e => onChangeFormData('CHK_08', e)}
                  />
                </td>
                <td colSpan={1}>
                  <AntdInputNumber
                    className="ant-input-number-inline ant-input-number-xs mr5"
                    style={{ width: '100%' }}
                    defaultValue={formData.CHK_10 || 0}
                    onChange={e => onChangeFormData('CHK_10', e)}
                  />
                </td>
                <td colSpan={1}>
                  <AntdInputNumber
                    className="ant-input-number-inline ant-input-number-xs mr5"
                    style={{ width: '100%' }}
                    defaultValue={formData.CHK_12 || 0}
                    onChange={e => onChangeFormData('CHK_12', e)}
                  />
                </td>
                <td colSpan={1}>
                  <AntdInputNumber
                    className="ant-input-number-inline ant-input-number-xs mr5"
                    style={{ width: '100%' }}
                    defaultValue={formData.CHK_14 || 0}
                    onChange={e => onChangeFormData('CHK_14', e)}
                  />
                </td>
                <td colSpan={1}>
                  <AntdInputNumber
                    className="ant-input-number-inline ant-input-number-xs mr5"
                    style={{ width: '100%' }}
                    defaultValue={formData.CHK_16 || 0}
                    onChange={e => onChangeFormData('CHK_16', e)}
                  />
                </td>
                <td colSpan={1}>
                  <AntdInputNumber
                    className="ant-input-number-inline ant-input-number-xs mr5"
                    style={{ width: '100%' }}
                    defaultValue={formData.CHK_18 || 0}
                    onChange={e => onChangeFormData('CHK_18', e)}
                  />
                </td>
                <td colSpan={1}>
                  <AntdInputNumber
                    className="ant-input-number-inline ant-input-number-xs mr5"
                    style={{ width: '100%' }}
                    defaultValue={formData.CHK_20 || 0}
                    onChange={e => onChangeFormData('CHK_20', e)}
                  />
                </td>
                <td colSpan={1}>
                  <AntdInputNumber
                    className="ant-input-number-inline ant-input-number-xs mr5"
                    style={{ width: '100%' }}
                    defaultValue={formData.CHK_22 || 0}
                    onChange={e => onChangeFormData('CHK_22', e)}
                  />
                </td>
                <td colSpan={1}>
                  <AntdInputNumber
                    className="ant-input-number-inline ant-input-number-xs mr5"
                    style={{ width: '100%' }}
                    defaultValue={formData.CHK_24 || 0}
                    onChange={e => onChangeFormData('CHK_24', e)}
                  />
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
  formData: PropTypes.object,
  submitFormData: PropTypes.func,
  onChangeFormData: PropTypes.func,
};

CodCheckTable.defaultProps = {
  formData: {},
};

export default CodCheckTable;
