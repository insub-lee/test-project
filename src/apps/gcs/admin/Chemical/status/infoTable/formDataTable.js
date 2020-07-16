import React, { Component } from 'react';
import moment from 'moment';
import { Input, DatePicker, InputNumber } from 'antd';
import PropTypes from 'prop-types';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import FabSelect from '../fabSelect';

const AntdInput = StyledInput(Input);
const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdDatePicker = StyledDatePicker(DatePicker);

class formDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  FabKeyNoOnchange = val => {
    const { onChangeFormData } = this.props;
    onChangeFormData('FAB_KEYNO', val);
  };

  onChangeGongDt = date => {
    const { onChangeFormData } = this.props;
    const val = date.format('YYYYMMDD');
    onChangeFormData('GONGDT', val);
  };

  render() {
    const { formData, type, onChangeFormData, site } = this.props;
    return (
      <StyledHtmlTable>
        <table>
          <colgroup>
            <col width="10%" />
            <col width="15%" />
            <col width="10%" />
            <col width="10%" />
            <col width="12%" />
            <col width="12%" />
            <col width="10%" />
            <col width="13%" />
            <col width="8%" />
          </colgroup>
          <tbody>
            <tr>
              <th colSpan={1}>
                <span>장치번호</span>
              </th>
              <th colSpan={1}>
                <span>장치명</span>
              </th>
              <th colSpan={1}>
                <span>위치</span>
              </th>
              <th colSpan={1}>
                <span>기타정보</span>
              </th>
              <th colSpan={1}>
                <span>KEY-NO</span>
              </th>
              <th colSpan={1}>
                <span>BAY</span>
              </th>
              <th colSpan={1}>
                <span>공정명</span>
              </th>
              <th colSpan={1}>
                <span>공급일</span>
              </th>
              <th colSpan={1}>
                <span>Point</span>
              </th>
            </tr>
            <tr className="tr-center">
              <td colSpan={1}>
                {type === 'NEW' ? (
                  <AntdInput
                    className="ant-input-sm ant-input-inline"
                    defaultValue={formData.GONGNO}
                    onChange={e => onChangeFormData('GONGNO', e.target.value)}
                  />
                ) : (
                  <span>{formData.GONGNO}</span>
                )}
              </td>
              <td colSpan={1}>
                {type === 'NEW' ? (
                  <AntdInput
                    className="ant-input-sm ant-input-inline"
                    defaultValue={formData.PRODNM}
                    onChange={e => onChangeFormData('PRODNM', e.target.value)}
                  />
                ) : (
                  <span>{formData.PRODNM}</span>
                )}
              </td>
              <td colSpan={1}>
                {type === 'NEW' ? (
                  <AntdInput
                    className="ant-input-sm ant-input-inline"
                    defaultValue={formData.GONGAREA}
                    onChange={e => onChangeFormData('GONGAREA', e.target.value)}
                  />
                ) : (
                  <span>{formData.GONGAREA}</span>
                )}
              </td>
              <td colSpan={1}>
                {type === 'NEW' ? (
                  <AntdInput
                    className="ant-input-sm ant-input-inline"
                    defaultValue={formData.GONGINFO}
                    onChange={e => onChangeFormData('GONGINFO', e.target.value)}
                  />
                ) : (
                  <span>{formData.GONGINFO}</span>
                )}
              </td>
              <td colSpan={1}>
                {type === 'NEW' ? (
                  <FabSelect defaultValue={formData.FAB_KEYNO || ''} site={site} onChange={this.FabKeyNoOnchange} />
                ) : (
                  <span>{formData.FAB_KEYNO}</span>
                )}
              </td>
              <td colSpan={1}>
                <AntdInput className="ant-input-sm ant-input-inline" value={formData.FAB_AREA} onChange={e => onChangeFormData('FAB_AREA', e.target.value)} />
              </td>
              <td colSpan={1}>
                <AntdInput
                  className="ant-input-sm ant-input-inline"
                  defaultValue={formData.FAB_PROC}
                  onChange={e => onChangeFormData('FAB_PROC', e.target.value)}
                />
              </td>
              <td colSpan={1}>
                <AntdDatePicker
                  className="ant-picker-sm"
                  style={{ width: '100%' }}
                  defaultValue={formData && formData.GONGDT && moment(formData.GONGDT, 'YYYYMMDD')}
                  onChange={date => this.onChangeGongDt(date)}
                />
              </td>
              <td colSpan={1}>
                <AntdInputNumber
                  className="ant-input-number-sm ant-input-number-inline"
                  min={0}
                  max={9999}
                  defaultValue={formData.POINTCNT || 0}
                  onChange={val => onChangeFormData('POINTCNT', val)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </StyledHtmlTable>
    );
  }
}

formDataTable.propTypes = {
  site: PropTypes.string,
  type: PropTypes.string,
  formData: PropTypes.object,
  onChangeFormData: PropTypes.func,
};

formDataTable.defaultProps = {
  site: '청주',
  type: '',
  formData: {},
};

export default formDataTable;
