import React, { Component } from 'react';
import { Input, InputNumber } from 'antd';
import PropTypes from 'prop-types';
import { Modal, Select, Spin, Input, Checkbox } from 'antd';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';

const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdModal = StyledContentsModal(Modal);
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);

class formDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
    };
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
        <StyledCustomSearchWrapper>
          <Spin tip="검색중 ..." spinning={isSearching}>
            <div className="search-input-area">
              <span className="text-label">지역</span>
              <AntdSelect defaultValue={site} className="select-sm" style={{ width: '100px' }} onChange={val => this.setState({ site: val })}>
                <Option value="청주">청주</Option>
                <Option value="구미">구미</Option>
                <Option value="서울">서울</Option>
              </AntdSelect>
              <span className="text-label">측정항목명</span>
              <AntdInput className="ant-input-sm ant-input-inline" style={{ width: '200px' }} defaultValue={keyword} />
              <StyledButton className="btn-gray btn-sm btn-first" onClick={() => this.handlerSearch()}>
                검색
              </StyledButton>
            </div>
          </Spin>
        </StyledCustomSearchWrapper>
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
