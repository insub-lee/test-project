/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Button, Checkbox, message, Select, Popover } from 'antd';
import { debounce } from 'lodash';
import * as popoverContent from './PopoverContent';

const { Option } = Select;
class ItemTable extends Component {
  constructor(props) {
    super(props);
    this.debounceHandleInputChange = debounce(this.debounceHandleInputChange, 300);
    this.debounceHandleSelectChange = debounce(this.debounceHandleSelectChange, 300);
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
    const reg = /^[0-9]*$/;
    const { value, name } = e.target;
    if (!reg.test(value)) {
      message.warning('숫자만 입력하세요.');
      return;
    }
    changeFormData(
      id,
      'itemList',
      itemList.map(i =>
        i.SEQ === SEQ
          ? {
              ...i,
              [name]: value,
              MALEFICENCE_ASSESSMENT: eval((i.VOLUME * 10 * value) / 10),
              ENV_IMPACT_SIZE: eval(
                (eval((Number(i.MANAGE_INPUT_OUPUT) + Number(i.IMPROVEMENT_PLAN_REPORT) + Number(i.DOCUMENTATION)) * Number(i.HAPPEN_PULSE)) *
                  eval(i.VOLUME * 10) *
                  value) /
                  10,
              ),
              MANAGE_ASSESSMENT: eval((Number(i.MANAGE_INPUT_OUPUT) + Number(i.IMPROVEMENT_PLAN_REPORT) + Number(i.DOCUMENTATION)) * Number(i.HAPPEN_PULSE)),
            }
          : i,
      ),
    );
  };

  handleSelectOnChange = (value, name, SEQ) => {
    this.debounceHandleSelectChange(value, name, SEQ);
  };

  debounceHandleSelectChange = (value, name, SEQ) => {
    const { id, formData, changeFormData } = this.props;

    const itemList = (formData && formData.itemList) || [];
    changeFormData(
      id,
      'itemList',
      itemList.map(i => (i.SEQ === SEQ ? { ...i, [name]: value } : i)),
    );

    this.handleSetManageMgt(SEQ);
  };

  handleSetManageMgt = SEQ => {
    const { id, formData, changeFormData } = this.props;
    const itemList = (formData && formData.itemList) || [];
    changeFormData(
      id,
      'itemList',
      itemList.map(i =>
        i.SEQ === SEQ
          ? {
              ...i,
              MANAGE_ASSESSMENT: eval((Number(i.MANAGE_INPUT_OUPUT) + Number(i.IMPROVEMENT_PLAN_REPORT) + Number(i.DOCUMENTATION)) * Number(i.HAPPEN_PULSE)),
              ENV_IMPACT_SIZE: eval(
                i.MALEFICENCE_ASSESSMENT * (Number(i.MANAGE_INPUT_OUPUT) + Number(i.IMPROVEMENT_PLAN_REPORT) + Number(i.DOCUMENTATION)) * i.HAPPEN_PULSE,
              ),
            }
          : i,
      ),
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
      itemList.map(i => (i.SEQ === SEQ ? { ...i, IMPORTANT_ENV_IMPACT_SELECTION: i.IMPORTANT_ENV_IMPACT_SELECTION === 'Y' ? 'N' : 'Y' } : i)),
    );
  };

  render() {
    const { formData } = this.props;
    const searchFlag = (formData && formData.searchFlag) || false;
    const itemList = (formData && formData.itemList) || [];
    const btnOk = itemList.length >= 1;
    return (
      <div className="itemTable">
        <table>
          <colgroup>
            <col width="5%" />
            <col width="10%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="8%" />
            <col width="8%" />
            <col width="8%" />
            <col width="8%" />
            <col width="10%" />
            <col width="10%" />
            <col width="5%" />
          </colgroup>
          <thead>
            <tr>
              <td colSpan={13}>
                <Button onClick={() => this.handleAction('EXCEL_DOWNLOAD')}>Excel Download</Button>
                {!searchFlag && (
                  <>
                    {btnOk && (
                      <>
                        <Button onClick={() => this.handleAction('UPDATE')}>저장</Button>
                      </>
                    )}
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>
                <span>Seq</span>
              </td>
              <td rowSpan={2}>
                <span>환경영향평가대상</span>
              </td>
              <td colSpan={4}>
                <span>환경유해성</span>
              </td>
              <td colSpan={5}>
                <span>관리수준평가</span>
              </td>
              <td rowSpan={2}>
                <span>
                  환경영향크기
                  <br />
                  (I=C*H)
                </span>
              </td>
              <td rowSpan={2}>
                <span>
                  중대환경
                  <br />
                  영향선정
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>
                  투입량(배출)
                  <br />
                  (A)
                </span>
              </td>
              <td>
                <span>단위</span>
              </td>
              <td>
                <Popover content={<img src={popoverContent.Eee1} alt="영향크기(B)" style={{ width: 760, height: 500 }} />} title={null}>
                  <span className="popoverTitle">영향크기(B)</span>
                </Popover>
              </td>
              <td>
                <span>
                  유해성평가
                  <br />
                  (C=A*B)
                </span>
              </td>
              <td>
                <Popover content={<img src={popoverContent.Eee2} alt="투입배출관리(D)" style={{ width: 526, height: 162 }} />} title={null}>
                  <span className="popoverTitle">투입배출관리(D)</span>
                </Popover>
              </td>
              <td>
                <Popover content={<img src={popoverContent.Eee3} alt="개선계획서(E)" style={{ width: 473, height: 106 }} />} title={null}>
                  <span className="popoverTitle">개선계획서(E)</span>
                </Popover>
              </td>
              <td>
                <Popover content={<img src={popoverContent.Eee4} alt="문서화(F)" style={{ width: 585, height: 138 }} />} title={null}>
                  <span className="popoverTitle">문서화(F)</span>
                </Popover>
              </td>
              <td>
                <Popover content={<img src={popoverContent.Eee5} alt="발생주기(G)" style={{ width: 254, height: 107 }} />} title={null}>
                  <span className="popoverTitle">발생주기(G)</span>
                </Popover>
              </td>
              <td>
                <span>
                  관리평가
                  <br />
                  (H=(D+E+F)*G)
                </span>
              </td>
            </tr>
          </thead>
          <tbody>
            {itemList.map((item, index) => (
              <tr key={item.SEQ}>
                <td align="center">{index + 1}</td>
                <td>
                  <Input name="MATTER" value={item.MATTER} readOnly />
                </td>
                <td>
                  <Input name="VOLUME" value={item.VOLUME} readOnly />
                </td>
                <td>
                  <Input name="UNIT" value={item.UNIT} readOnly />
                </td>
                <td>
                  <Input name="IMPACT_SIZE" defaultValue={item.IMPACT_SIZE} onChange={e => this.handleInputOnchange(e, item.SEQ)} />
                </td>
                <td>
                  <Input name="MALEFICENCE_ASSESSMENT" value={item.MALEFICENCE_ASSESSMENT} readOnly />
                </td>
                <td align="center">
                  <Select defaultValue={item.MANAGE_INPUT_OUPUT || '1'} onChange={value => this.handleSelectOnChange(value, 'MANAGE_INPUT_OUPUT', item.SEQ)}>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                  </Select>
                </td>
                <td align="center">
                  <Select
                    defaultValue={item.IMPROVEMENT_PLAN_REPORT || '0'}
                    onChange={value => this.handleSelectOnChange(value, 'IMPROVEMENT_PLAN_REPORT', item.SEQ)}
                  >
                    <Option value="0">0</Option>
                    <Option value="1">1</Option>
                  </Select>
                </td>
                <td align="center">
                  <Select defaultValue={item.DOCUMENTATION || '0'} onChange={value => this.handleSelectOnChange(value, 'DOCUMENTATION', item.SEQ)}>
                    <Option value="0">0</Option>
                    <Option value="1">1</Option>
                  </Select>
                </td>
                <td align="center">
                  <Select defaultValue={item.HAPPEN_PULSE || '1'} onChange={value => this.handleSelectOnChange(value, 'HAPPEN_PULSE', item.SEQ)}>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                  </Select>
                </td>
                <td>
                  <Input name="MANAGE_ASSESSMENT" value={item.MANAGE_ASSESSMENT} readOnly />
                </td>
                <td>
                  <Input name="ENV_IMPACT_SIZE" value={item.ENV_IMPACT_SIZE} readOnly />
                </td>
                <td align="center">
                  <Checkbox checked={item.IMPORTANT_ENV_IMPACT_SELECTION === 'Y'} onChange={() => this.handleCheckBoxOnChange(item.SEQ)} />
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
