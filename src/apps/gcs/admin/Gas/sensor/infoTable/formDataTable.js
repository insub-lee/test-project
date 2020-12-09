import React, { Component } from 'react';
import moment from 'moment';
import { Input, DatePicker, InputNumber } from 'antd';
import PropTypes from 'prop-types';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';

const AntdInput = StyledInput(Input);
const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdDatePicker = StyledDatePicker(DatePicker);

class formDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChangeCheckDt = date => {
    const { onChangeFormData } = this.props;
    if (!date && date === null) {
      onChangeFormData('SENSOR_CHECKDT', '');
    } else {
      onChangeFormData('SENSOR_CHECKDT', date.format('YYYYMMDD'));
    }
  };

  render() {
    const { formData, type, onChangeFormData, submitFormData } = this.props;
    return (
      <>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="2%" />
              <col width="2%" />
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th colSpan={1} rowSpan={2}>
                  <span>감지기번호</span>
                </th>
                <th colSpan={1} rowSpan={2}>
                  <span>감지대상</span>
                </th>
                <th colSpan={6}>
                  <span>Gas 공급장치 정보</span>
                </th>
              </tr>
              <tr>
                <th colSpan={1}>
                  <span>FAB</span>
                </th>
                <th colSpan={1}>
                  <span>AREA</span>
                </th>
                <th colSpan={1}>
                  <span>KEY-NO</span>
                </th>
                <th colSpan={1}>
                  <span>MODEL</span>
                </th>
                <th colSpan={1}>
                  <span>MONITOR</span>
                </th>
                <th colSpan={1}>
                  <span>POSITION</span>
                </th>
              </tr>
              <tr className="tr-center">
                <td colSpan={1}>
                  {type === 'INPUT' ? (
                    <AntdInput
                      className="ant-input-sm ant-input-inline"
                      defaultValue={formData.SENSORNO || ''}
                      maxlength={15}
                      onChange={e => onChangeFormData('SENSORNO', e.target.value)}
                    />
                  ) : (
                    <span>{formData.SENSORNO}</span>
                  )}
                </td>
                <td colSpan={1}>
                  {type === 'INPUT' ? (
                    <AntdInput
                      className="ant-input-sm ant-input-inline"
                      defaultValue={formData.SENSORSEL || ''}
                      maxlength={15}
                      onChange={e => onChangeFormData('SENSORSEL', e.target.value)}
                    />
                  ) : (
                    <span>{formData.SENSORSEL}</span>
                  )}
                </td>
                <td colSpan={1}>
                  <AntdInput
                    className="ant-input-sm ant-input-inline"
                    defaultValue={formData.FAB || ''}
                    maxlength={15}
                    onChange={e => onChangeFormData('FAB', e.target.value)}
                  />
                </td>
                <td colSpan={1}>
                  <AntdInput
                    className="ant-input-sm ant-input-inline"
                    defaultValue={formData.AREA || ''}
                    maxlength={15}
                    onChange={e => onChangeFormData('AREA', e.target.value)}
                  />
                </td>
                <td colSpan={1}>
                  <AntdInput
                    className="ant-input-sm ant-input-inline"
                    defaultValue={formData.KEY_NO || ''}
                    maxlength={15}
                    onChange={e => onChangeFormData('KEY_NO', e.target.value)}
                  />
                </td>
                <td colSpan={1}>
                  <AntdInput
                    className="ant-input-sm ant-input-inline"
                    defaultValue={formData.MODEL || ''}
                    maxlength={10}
                    onChange={e => onChangeFormData('MODEL', e.target.value)}
                  />
                </td>
                <td colSpan={1}>
                  <AntdInput
                    className="ant-input-sm ant-input-inline"
                    defaultValue={formData.MONITOR || ''}
                    maxlength={10}
                    onChange={e => onChangeFormData('MONITOR', e.target.value)}
                  />
                </td>
                <td colSpan={1}>
                  <AntdInput
                    className="ant-input-sm ant-input-inline"
                    defaultValue={formData.POSITION || ''}
                    maxlength={20}
                    onChange={e => onChangeFormData('POSITION', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th colSpan={1}>
                  <span>작동 시간</span>
                </th>
                <th colSpan={1}>
                  <span>측정방식</span>
                </th>
                <th colSpan={1}>
                  <span>경보설정값</span>
                </th>
                <th colSpan={1}>
                  <span>경보기위치</span>
                </th>
                <th colSpan={1}>
                  <span>정밀도</span>
                </th>
                <th colSpan={3}>
                  <span>경보시조치내용</span>
                </th>
              </tr>
              <tr>
                <td colSpan={1}>
                  <AntdInput
                    className="ant-input-sm ant-input-inline"
                    defaultValue={formData.SENSORTIME || ''}
                    maxlength={20}
                    onChange={e => onChangeFormData('SENSORTIME', e.target.value)}
                  />
                </td>
                <td colSpan={1}>
                  <AntdInput
                    className="ant-input-sm ant-input-inline"
                    defaultValue={formData.SENSORPUMP || ''}
                    maxlength={20}
                    onChange={e => onChangeFormData('SENSORPUMP', e.target.value)}
                  />
                </td>
                <td colSpan={1}>
                  <AntdInput
                    className="ant-input-sm ant-input-inline"
                    defaultValue={formData.SENSORSET1 || ''}
                    maxlength={40}
                    onChange={e => onChangeFormData('SENSORSET1', e.target.value)}
                  />
                </td>
                <td colSpan={1}>
                  <AntdInput
                    className="ant-input-sm ant-input-inline"
                    defaultValue={formData.SENSOR_AREA || ''}
                    maxlength={15}
                    onChange={e => onChangeFormData('SENSOR_AREA', e.target.value)}
                  />
                </td>
                <td colSpan={1}>
                  <AntdInput
                    className="ant-input-sm ant-input-inline"
                    defaultValue={formData.SENSOR_PERCENT || ''}
                    maxlength={30}
                    onChange={e => onChangeFormData('SENSOR_PERCENT', e.target.value)}
                  />
                </td>
                <td colSpan={3}>
                  <AntdInput
                    className="ant-input-sm ant-input-inline"
                    defaultValue={formData.SENSOR_COMENT || ''}
                    maxlength={200}
                    onChange={e => onChangeFormData('SENSOR_COMENT', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th colSpan={1}>
                  <span>유지관리</span>
                </th>
                <th colSpan={2}>
                  <span>TWA-TLA</span>
                </th>
                <th colSpan={2}>
                  <span>참고사항</span>
                </th>
                <th colSpan={1}>
                  <span>교체/점검 날짜</span>
                </th>
                <th colSpan={1}>
                  <span>교체/점검 주기</span>
                </th>
                <th colSpan={1}>
                  <span>교체/점검 예정일</span>
                </th>
              </tr>
              <tr>
                <td colSpan={1}>
                  <AntdInput
                    className="ant-input-sm ant-input-inline"
                    defaultValue={formData.SENSOR_AS || ''}
                    maxlength={30}
                    onChange={e => onChangeFormData('SENSOR_AS', e.target.value)}
                  />
                </td>
                <td colSpan={2}>
                  <AntdInput
                    className="ant-input-sm ant-input-inline"
                    defaultValue={formData.SENSOR_TWA || ''}
                    maxlength={50}
                    onChange={e => onChangeFormData('SENSOR_TWA', e.target.value)}
                  />
                </td>
                <td colSpan={2}>
                  <AntdInput
                    className="ant-input-sm ant-input-inline"
                    defaultValue={formData.SENSOR_ADD || ''}
                    maxlength={200}
                    onChange={e => onChangeFormData('SENSOR_ADD', e.target.value)}
                  />
                </td>
                <td colSpan={1}>
                  <AntdDatePicker
                    className="ant-picker-sm"
                    defaultValue={formData.SENSOR_CHECKDT ? moment(formData.SENSOR_CHECKDT, 'YYYYMMDD') : undefined}
                    onChange={date => this.onChangeCheckDt(date)}
                  />
                </td>
                <td>
                  <AntdInputNumber min={0} max={30} defaultValue={formData.SENSOR_CYCLE || 0} onChange={value => onChangeFormData('SENSOR_CYCLE', value)} />
                </td>
                <td>
                  <span>{formData.SENSOR_SCHEDT ? moment(formData.SENSOR_SCHEDT, 'YYYYMMDD').format('YYYY-MM-DD') : ''}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {type === 'INPUT' ? (
            <StyledButton className="btn-primary btn-sm btn-first ml5" onClick={() => submitFormData('NEW')}>
              저장
            </StyledButton>
          ) : (
            <>
              <StyledButton className="btn-primary btn-sm btn-first ml5" onClick={() => submitFormData('MODIFY')}>
                저장
              </StyledButton>
              <StyledButton className="btn-light btn-sm btn-first ml5" onClick={() => submitFormData('DELETE')}>
                삭제
              </StyledButton>
            </>
          )}
        </div>
      </>
    );
  }
}

formDataTable.propTypes = {
  type: PropTypes.string,
  formData: PropTypes.object,
  onChangeFormData: PropTypes.func,
  submitFormData: PropTypes.func,
};

formDataTable.defaultProps = {
  type: 'INPUT',
  formData: {},
};

export default formDataTable;
