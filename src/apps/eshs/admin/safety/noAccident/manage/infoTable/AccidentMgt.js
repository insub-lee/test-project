import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { InputNumber, DatePicker } from 'antd';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';

const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdDatePicker = StyledDatePicker(DatePicker);

class AccidentMgt extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { formData, onChangeFormData } = this.props;
    console.debug('폼', formData);
    return (
      <StyledHtmlTable>
        <table>
          <colgroup>
            <col width="20%" />
            <col width="40%" />
            <col width="40%" />
          </colgroup>
          <tbody>
            <tr>
              <th>
                <span>지역</span>
              </th>
              <th>
                <span>목표시간</span>
              </th>
              <th>
                <span>사고시간</span>
              </th>
            </tr>
            {formData &&
              formData.length > 0 &&
              formData.map((item, index) => (
                <tr>
                  <td>{item.SITE}</td>
                  <td>
                    <AntdInputNumber
                      className="ant-input-number-inline ant-input-number-xs"
                      style={{ width: '100%' }}
                      defaultValue={item.TARGET_HOURS || 0}
                      onChange={e => onChangeFormData(index, 'TARGET_HOURS', e)}
                    />
                  </td>
                  <td>
                    <AntdDatePicker
                      className="ant-picker-inline ant-picker-xs"
                      style={{ width: '100%' }}
                      defaultValue={item.ACCIDENT_DT !== '' ? moment(item.ACCIDENT_DT, 'YYYY-MM-DD') : undefined}
                      format="YYYY-MM-DD"
                      onChange={(date, strDate) => this.changeFormData('SE_DT', strDate)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </StyledHtmlTable>
    );
  }
}

AccidentMgt.propTypes = {
  formData: PropTypes.array,
  onChangeFormData: PropTypes.func,
};

AccidentMgt.defaultProps = {
  formData: [],
  onChangeFormData: () => false,
};

export default AccidentMgt;
