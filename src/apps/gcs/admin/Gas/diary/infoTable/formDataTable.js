import React, { Component } from 'react';
import moment from 'moment';
import { Input, Select } from 'antd';
import PropTypes from 'prop-types';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const { Option } = Select;

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
    const { formData, type, onChangeFormData, submitFormData } = this.props;
    return (
      <>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th colSpan={1}>
                  <span>일자</span>
                </th>
                <th colSpan={1}>
                  <span>FAB</span>
                </th>
                <th colSpan={1}>
                  <span>No</span>
                </th>
                <th colSpan={1}>
                  <span>장치명</span>
                </th>
                <th colSpan={1}>
                  <span>Down 시간</span>
                </th>
                <th colSpan={1}>
                  <span>Up 시간</span>
                </th>
              </tr>
              <tr className="tr-center">
                <td>
                  <span>{formData.OCCURDT && moment(formData.OCCURDT).format('YYYY.MM.DD')}</span>
                </td>
                <td>
                  <span>{formData.FAB}</span>
                </td>
                <td>
                  <span>{formData.GONGNO}</span>
                </td>
                <td>
                  <span>{formData.PRODNM}</span>
                </td>
                <td>
                  <span>{formData.DOWNTIME}</span>
                </td>
                <td>
                  <span>{formData.UPTIME}</span>
                </td>
              </tr>
              <tr>
                <th colSpan={2}>
                  <span>문제점</span>
                </th>
                <th colSpan={2}>
                  <span>조치사항</span>
                </th>
                <th colSpan={2}>
                  <span>Run 피해</span>
                </th>
              </tr>
              <tr className="tr-center">
                <td colSpan={2}>
                  <AntdInput
                    className="ant-input-sm ant-input-inline"
                    defaultValue={formData.PROBLEM}
                    onChange={e => onChangeFormData('PROBLEM', e.target.value)}
                  />
                </td>
                <td colSpan={2}>
                  <AntdInput
                    className="ant-input-sm ant-input-inline"
                    defaultValue={formData.MEASURE}
                    onChange={e => onChangeFormData('MEASURE', e.target.value)}
                  />
                </td>
                <td colSpan={2}>
                  <AntdSelect
                    className="select-sm"
                    style={{ width: '100%' }}
                    onChange={value => this.onChangeFormData(value)}
                    defaultValue={formData.DAMAGE || ''}
                  >
                    <Option value="" disabled>
                      有 / 無 선택
                    </Option>
                    <Option value="有">有</Option>
                    <Option value="無">無</Option>
                  </AntdSelect>
                </td>
              </tr>
              <tr>
                <th colSpan={2}>
                  <span>작업자</span>
                </th>
                <th colSpan={2}>
                  <span>비고</span>
                </th>
                <th colSpan={2}>
                  <span>생산장비 통보여부</span>
                </th>
              </tr>
              <tr className="tr-center">
                <td colSpan={2}>
                  <AntdInput
                    className="ant-input-sm ant-input-inline"
                    defaultValue={formData.OWNID}
                    onChange={e => onChangeFormData('OWNID', e.target.value)}
                  />
                </td>
                <td colSpan={2}>
                  <AntdInput className="ant-input-sm ant-input-inline" defaultValue={formData.BIGO} onChange={e => onChangeFormData('BIGO', e.target.value)} />
                </td>
                <td colSpan={2}>
                  <AntdInput
                    className="ant-input-sm ant-input-inline"
                    defaultValue={formData.EQUIPNOTI || ''}
                    onChange={e => onChangeFormData('EQUIPNOTI', e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {type === 'NEW' ? (
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
  submitFormData: PropTypes.func,
  onChangeFormData: PropTypes.func,
};

formDataTable.defaultProps = {
  type: '',
  formData: {},
};

export default formDataTable;
