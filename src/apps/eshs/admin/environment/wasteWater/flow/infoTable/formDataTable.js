import React, { Component } from 'react';
import { Input, InputNumber } from 'antd';
import PropTypes from 'prop-types';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';

const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdInput = StyledInput(Input);

class formDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderInputNumber = (unitNm, point, field) => {
    const { formData, onChangeFormData } = this.props;
    const target = formData.toJS().find(form => form.GROUP_UNIT_NM === unitNm && form.MEASUREMENT_POINT === point);
    return (
      <AntdInputNumber
        className="ant-input-number-sm"
        value={(target && target[field] && Number(target[field])) || 0}
        onChange={e => onChangeFormData(unitNm, point, field, e)}
      />
    );
  };

  renderInput = (unitNm, point, field) => {
    const { formData, onChangeFormData } = this.props;
    const target = formData.toJS().find(form => form.GROUP_UNIT_NM === unitNm && form.MEASUREMENT_POINT === point);
    return (
      <AntdInput className="ant-input-sm" value={(target && target[field]) || ''} onChange={e => onChangeFormData(unitNm, point, field, e.target.value)} />
    );
  };

  renderViewOnly = (unitNm, point, field) => {
    const { formData } = this.props;
    const target = formData.toJS().find(form => form.GROUP_UNIT_NM === unitNm && form.MEASUREMENT_POINT === point);
    return <span>{(target && target[field]) || 0}</span>;
  };

  render() {
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
                  <span>구분</span>
                </th>
                <th colSpan={1}>
                  <span>관리단위</span>
                </th>
                <th colSpan={1}>
                  <span>측정포인트</span>
                </th>
                <th colSpan={1}>
                  <span>금일지침</span>
                </th>
                <th colSpan={1}>
                  <span>전일지침</span>
                </th>
                <th colSpan={1}>
                  <span>사용량(㎥)</span>
                </th>
                <th colSpan={1}>
                  <span>검침시간</span>
                </th>
              </tr>
              <tr className="tr-center">
                <td colSpan={1} rowSpan={8}>
                  <span>공업용수 사용량</span>
                </td>
                <td colSpan={1} rowSpan={6}>
                  <span>UPW(DI동)</span>
                </td>
                <td colSpan={1}>
                  <span>fab-1</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('UPW(DI동)', 'fab-1', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('UPW(DI동)', 'fab-1', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('UPW(DI동)', 'fab-1', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('UPW(DI동)', 'fab-1', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1}>
                  <span>fab-2</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('UPW(DI동)', 'fab-2', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('UPW(DI동)', 'fab-2', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('UPW(DI동)', 'fab-2', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('UPW(DI동)', 'fab-2', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1}>
                  <span>fab-4</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('UPW(DI동)', 'fab-4', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('UPW(DI동)', 'fab-4', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('UPW(DI동)', 'fab-4', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('UPW(DI동)', 'fab-4', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1}>
                  <span>fab-5</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('UPW(DI동)', 'fab-5', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('UPW(DI동)', 'fab-5', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('UPW(DI동)', 'fab-5', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('UPW(DI동)', 'fab-5', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1}>
                  <span>m-8</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('UPW(DI동)', 'm-8', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('UPW(DI동)', 'm-8', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('UPW(DI동)', 'm-8', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('UPW(DI동)', 'm-8', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1}>
                  <span>m-9</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('UPW(DI동)', 'm-9', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('UPW(DI동)', 'm-9', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('UPW(DI동)', 'm-9', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('UPW(DI동)', 'm-9', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1} rowSpan={2}>
                  <span>공수동</span>
                </td>
                <td colSpan={1}>
                  <span>폐수공수</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('공수동', '폐수공수', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('공수동', '폐수공수', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('공수동', '폐수공수', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('공수동', '폐수공수', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1}>
                  <span>main공수</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('공수동', 'main공수', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('공수동', 'main공수', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('공수동', 'main공수', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('공수동', 'main공수', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1}>
                  <span>시수 사용량</span>
                </td>
                <td colSpan={1}>
                  <span>시수동</span>
                </td>
                <td colSpan={1}>
                  <span>main시수</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('시수동', 'main시수', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('시수동', 'main시수', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('시수동', 'main시수', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('시수동', 'main시수', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1} rowSpan={6}>
                  <span>오수 발생량</span>
                </td>
                <td colSpan={1} rowSpan={6}>
                  <span>오수동</span>
                </td>
                <td colSpan={1}>
                  <span>C-1/3</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('오수동', 'C-1/3', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('오수동', 'C-1/3', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('오수동', 'C-1/3', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('오수동', 'C-1/3', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1}>
                  <span>C-2</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('오수동', 'C-2', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('오수동', 'C-2', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('오수동', 'C-2', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('오수동', 'C-2', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1}>
                  <span>남자기숙사</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('오수동', '남자기숙사', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('오수동', '남자기숙사', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('오수동', '남자기숙사', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('오수동', '남자기숙사', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1}>
                  <span>여자기숙사</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('오수동', '여자기숙사', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('오수동', '여자기숙사', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('오수동', '여자기숙사', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('오수동', '여자기숙사', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1}>
                  <span>R동</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('오수동', 'R동', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('오수동', 'R동', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('오수동', 'R동', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('오수동', 'R동', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1}>
                  <span>교육동</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('오수동', '교육동', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('오수동', '교육동', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('오수동', '교육동', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('오수동', '교육동', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1} rowSpan={13}>
                  <span>폐수 처리량</span>
                </td>
                <td colSpan={1} rowSpan={3}>
                  <span>C-1WWT동</span>
                </td>
                <td colSpan={1}>
                  <span>HF pond</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('C-1WWT동', 'HF pond', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('C-1WWT동', 'HF pond', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('C-1WWT동', 'HF pond', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('C-1WWT동', 'HF pond', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1}>
                  <span>HM pond</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('C-1WWT동', 'HM pond', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('C-1WWT동', 'HM pond', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('C-1WWT동', 'HM pond', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('C-1WWT동', 'HM pond', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1}>
                  <span>H2O2 pond</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('C-1WWT동', 'H2O2 pond', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('C-1WWT동', 'H2O2 pond', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('C-1WWT동', 'H2O2 pond', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('C-1WWT동', 'H2O2 pond', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1} rowSpan={4}>
                  <span>C-2WWT동</span>
                </td>
                <td colSpan={1}>
                  <span>ORG pond</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('C-2WWT동', 'ORG pond', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('C-2WWT동', 'ORG pond', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('C-2WWT동', 'ORG pond', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('C-2WWT동', 'ORG pond', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1}>
                  <span>HF pond</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('C-2WWT동', 'HF pond', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('C-2WWT동', 'HF pond', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('C-2WWT동', 'HF pond', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('C-2WWT동', 'HF pond', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1}>
                  <span>AA pond</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('C-2WWT동', 'AA pond', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('C-2WWT동', 'AA pond', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('C-2WWT동', 'AA pond', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('C-2WWT동', 'AA pond', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1}>
                  <span>C-2방류구</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('C-2WWT동', 'C-2방류구', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('C-2WWT동', 'C-2방류구', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('C-2WWT동', 'C-2방류구', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('C-2WWT동', 'C-2방류구', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1} rowSpan={6}>
                  <span>C-3WWT동</span>
                </td>
                <td colSpan={1}>
                  <span>HF pond</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('C-3WWT동', 'HF pond', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('C-3WWT동', 'HF pond', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('C-3WWT동', 'HF pond', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('C-3WWT동', 'HF pond', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1}>
                  <span>AA pond</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('C-3WWT동', 'AA pond', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('C-3WWT동', 'AA pond', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('C-3WWT동', 'AA pond', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('C-3WWT동', 'AA pond', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1}>
                  <span>AA pond(R)</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('C-3WWT동', 'AA pond(R)', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('C-3WWT동', 'AA pond(R)', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('C-3WWT동', 'AA pond(R)', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('C-3WWT동', 'AA pond(R)', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1}>
                  <span>ORG pond</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('C-3WWT동', 'ORG pond', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('C-3WWT동', 'ORG pond', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('C-3WWT동', 'ORG pond', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('C-3WWT동', 'ORG pond', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1}>
                  <span>CMP pond</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('C-3WWT동', 'CMP pond', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('C-3WWT동', 'CMP pond', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('C-3WWT동', 'CMP pond', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('C-3WWT동', 'CMP pond', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1}>
                  <span>C-3방류구</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('C-3WWT동', 'C-3방류구', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('C-3WWT동', 'C-3방류구', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('C-3WWT동', 'C-3방류구', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('C-3WWT동', 'C-3방류구', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1} rowSpan={5}>
                  <span>구분</span>
                </td>
                <td colSpan={1} rowSpan={4}>
                  <span>UPW(DI동)</span>
                </td>
                <td colSpan={1}>
                  <span>fab-1.2s</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('UPW(DI동)', 'fab-1.2s', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('UPW(DI동)', 'fab-1.2s', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('UPW(DI동)', 'fab-1.2s', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('UPW(DI동)', 'fab-1.2s', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1}>
                  <span>fab-1.2w</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('UPW(DI동)', 'fab-1.2w', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('UPW(DI동)', 'fab-1.2w', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('UPW(DI동)', 'fab-1.2w', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('UPW(DI동)', 'fab-1.2w', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1}>
                  <span>m-8.9s</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('UPW(DI동)', 'm-8.9s', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('UPW(DI동)', 'm-8.9s', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('UPW(DI동)', 'm-8.9s', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('UPW(DI동)', 'm-8.9s', 'INSPECTION_TIME')}</td>
              </tr>
              <tr className="tr-center">
                <td colSpan={1}>
                  <span>m-8.9w</span>
                </td>
                <td colSpan={1}>{this.renderInputNumber('UPW(DI동)', 'm-8.9w', 'THE_DAY_INDEX')}</td>
                <td colSpan={1}>{this.renderInputNumber('UPW(DI동)', 'm-8.9w', 'THE_DAY_BEFORE_INDEX')}</td>
                <td colSpan={1}>{this.renderViewOnly('UPW(DI동)', 'm-8.9w', 'FLOW_AMOUNT')}</td>
                <td colSpan={1}>{this.renderInput('UPW(DI동)', 'm-8.9w', 'INSPECTION_TIME')}</td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
      </>
    );
  }
}

formDataTable.propTypes = {
  formData: PropTypes.array,
  onChangeFormData: PropTypes.func,
};

formDataTable.defaultProps = {
  formData: [],
};

export default formDataTable;
