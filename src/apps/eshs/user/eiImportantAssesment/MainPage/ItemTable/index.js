/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Button, Checkbox, message } from 'antd';
import Upload from 'components/Upload';
import { debounce } from 'lodash';

class ItemTable extends Component {
  constructor(props) {
    super(props);
    this.debounceHandleInputChange = debounce(this.debounceHandleInputChange, 300);
    this.debounceHandleCheckboxChange = debounce(this.debounceHandleCheckboxChange, 300);
  }

  handleAction = type => {
    const { id, formData, submitHandlerBySaga } = this.props;
    const materialData = (formData && formData.materialData) || '';
    const itemList = (formData && formData.itemList) || [];
    switch (type) {
      case 'UPDATE':
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsEiUpdateComplete', { ...materialData, itemList }, this.updateComplete);
        break;
      case 'EXCEL_DOWNLOAD':
        message.warning('미구현');
        break;
      default:
        break;
    }
  };

  updateComplete = () => {
    message.success('저장되었습니다.');
  };

  handleInputOnchange = (e, SEQ) => {
    e.persist();
    this.debounceHandleInputChange(e, SEQ);
  };

  debounceHandleInputChange = (e, SEQ) => {
    const { id, formData, changeFormData } = this.props;
    const itemList = (formData && formData.itemList) || [];
    const { value, name } = e.target;

    changeFormData(
      id,
      'itemList',
      itemList.map(i => (Number(i.SEQ) === Number(SEQ) ? { ...i, [name]: value } : i)),
    );
  };

  handleCheckBoxOnChange = SEQ => {
    this.debounceHandleCheckboxChange(SEQ);
  };

  debounceHandleCheckboxChange = SEQ => {
    const { id, formData, changeFormData } = this.props;

    const itemList = (formData && formData.itemList) || [];
    changeFormData(
      id,
      'itemList',
      itemList.map(i => (i.SEQ === SEQ ? { ...i, PLAN_REVIEW: i.PLAN_REVIEW === 'Y' ? 'N' : 'Y' } : i)),
    );
  };

  render() {
    const { formData } = this.props;
    const searchFlag = (formData && formData.searchFlag) || false;
    const itemList = (formData && formData.itemList) || [];
    const btnOk = itemList.length >= 1;
    console.debug('1111111111111');
    return (
      <div className="itemTable">
        <br />
        <table>
          <colgroup>
            <col width="4%" />
            <col width="10%" />
            <col width="8%" />
            <col width="8%" />
            <col width="8%" />
            <col width="8%" />
            <col width="8%" />
            <col width="8%" />
            <col width="8%" />
            <col width="8%" />
            <col width="8%" />
            <col width="6%" />
            <col width="8%" />
          </colgroup>
          <thead>
            <tr>
              <td colSpan={13}>aaa</td>
            </tr>
            <tr>
              <td rowSpan={2}>Seq</td>
              <td rowSpan={2}>
                환경영향
                <br />
                평가대상
              </td>
              <td rowSpan={2}>적용 공정</td>
              <td rowSpan={2}>적용 장비</td>
              <td colSpan={7}>중대환경영향평가</td>
              <td rowSpan={2}>
                개선계획
                <br />
                수립검토
              </td>
              <td rowSpan={2}>개선계획서</td>
            </tr>
            <tr>
              <td>
                <span>
                  1.
                  <br />
                  법규검토
                </span>
              </td>
              <td>
                <span>
                  2.
                  <br />
                  심각한
                  <br />
                  환경측면
                </span>
              </td>
              <td>
                <span>
                  3.
                  <br />
                  기술검토
                </span>
              </td>
              <td>
                <span>
                  4.
                  <br />
                  재정측면
                </span>
              </td>
              <td>
                <span>
                  5.
                  <br />
                  운영측면
                </span>
              </td>
              <td>
                <span>
                  6.
                  <br />
                  사업적측면
                </span>
              </td>
              <td>
                <span>
                  7.
                  <br />
                  이해관계자
                </span>
              </td>
            </tr>
          </thead>
          <tbody>
            {itemList.map((item, index) => (
              <tr key={item.SEQ}>
                <td align="center">{index + 1}</td>
                <td>
                  <Input name="MATTER" defaultValue={item.MATTER} onChange={e => this.handleInputOnchange(e, item.SEQ)} />
                </td>
                <td>
                  <Input name="APPLY_PROCESS" defaultValue={item.APPLY_PROCESS} onChange={e => this.handleInputOnchange(e, item.SEQ)} />
                </td>
                <td>
                  <Input name="APPLY_EQUIPMENT" defaultValue={item.APPLY_EQUIPMENT} onChange={e => this.handleInputOnchange(e, item.SEQ)} />
                </td>
                <td>
                  <Input name="LAWS_REVIEW" defaultValue={item.LAWS_REVIEW} onChange={e => this.handleInputOnchange(e, item.SEQ)} />
                </td>
                <td>
                  <Input name="CRITICAL_ENVIRONMENT" defaultValue={item.CRITICAL_ENVIRONMENT} onChange={e => this.handleInputOnchange(e, item.SEQ)} />
                </td>
                <td>
                  <Input name="TECH_REVIEW" defaultValue={item.TECH_REVIEW} onChange={e => this.handleInputOnchange(e, item.SEQ)} />
                </td>
                <td>
                  <Input name="FINANCIAL_SIDE" defaultValue={item.FINANCIAL_SIDE} onChange={e => this.handleInputOnchange(e, item.SEQ)} />
                </td>
                <td>
                  <Input name="OPERATION_SIDE" defaultValue={item.OPERATION_SIDE} onChange={e => this.handleInputOnchange(e, item.SEQ)} />
                </td>
                <td>
                  <Input name="BUSINESS_SIDE" defaultValue={item.BUSINESS_SIDE} onChange={e => this.handleInputOnchange(e, item.SEQ)} />
                </td>
                <td>
                  <Input name="STAKEHOLDERS" defaultValue={item.STAKEHOLDERS} onChange={e => this.handleInputOnchange(e, item.SEQ)} />
                </td>
                <td align="center">
                  <Checkbox checked={item.PLAN_REVIEW === 'Y'} onChange={() => this.handleCheckBoxOnChange(item.SEQ)} />
                </td>
                <td align="center">
                  {item.PLAN_REVIEW === 'N' ? (
                    <Input name="IMPROVEMENT_PLAN" value={item.IMPROVEMENT_PLAN} onChange={e => this.handleInputOnchange(e, item.SEQ)} />
                  ) : (
                    <Upload>aaa</Upload>
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={13}>{itemList.length} 건</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
ItemTable.defaultProps = {};
export default ItemTable;
