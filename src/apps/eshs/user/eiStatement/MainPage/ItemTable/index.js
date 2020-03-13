/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Button, Checkbox, Popconfirm, message, Select, InputNumber } from 'antd';
import { debounce } from 'lodash';

const { Option } = Select;
class ItemTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowSelections: [],
    };
    this.debounceHandleInputChange = debounce(this.debounceHandleInputChange, 300);
    this.debounceHandleSelectChange = debounce(this.debounceHandleSelectChange, 300);
    this.debounceHandleCheckboxChange = debounce(this.debounceHandleCheckboxChange, 300);
  }

  handleAction = type => {
    const { id, formData, submitHandlerBySaga } = this.props;
    const { rowSelections } = this.state;
    const REQ_NO = (formData && formData.materialData && formData.materialData.REQ_NO) || '';
    const itemData = (formData && formData.itemData) || {};
    const itemList = (formData && formData.itemList) || [];
    const CHK_YEAR = (formData && formData.CHK_YEAR) || '';
    const materialCnt = (formData && formData.materialCnt) || '';
    const DEPT_CD = (formData && formData.searchRow && formData.searchRow.DEPT_CD) || (formData && formData.myDept && formData.myDept.DEPT_CD) || '';
    const msg = this.validationCheck(itemData);
    switch (type) {
      case 'SAVE':
        if (msg) {
          message.warning(msg);
          break;
        }
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsEiMaterialItem', { ...itemData, CHK_YEAR, DEPT_CD, REQ_NO }, this.handleFormReset);
        break;
      case 'UPDATE':
        if (msg) {
          message.warning(msg);
          break;
        }
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsEiMaterialItem', { ...itemData, CHK_YEAR, DEPT_CD }, this.handleFormReset);
        break;
      case 'DELETE':
        if (!rowSelections.length) {
          message.warning('삭제 하실 항목을 한개라도 선택하세요.');
          break;
        }
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsEiMaterialItem', { rowSelections, REQ_NO }, this.handleFormReset);
        break;
      case 'RESET':
        this.handleFormReset();
        break;
      case 'EXCEL_DOWNLOAD':
        message.warning('미구현');
        break;
      case 'EXCEL_UPLOAD':
        message.warning('미구현');
        break;
      default:
        break;
    }
  };

  handleFormReset = () => {
    const { id, setFormData, formData, handleSearchOnClick } = this.props;
    setFormData(id, { ...formData, itemData: {} });
    this.setState({ rowSelections: [] });
    handleSearchOnClick();
  };

  handleRowSelection = req_no => {
    const { rowSelections } = this.state;
    if (rowSelections.indexOf(req_no) >= 0) {
      this.setState({ rowSelections: rowSelections.filter(r => r !== req_no && r) });
    } else {
      rowSelections.push(req_no);
      this.setState({ rowSelections });
    }
  };

  handleVolumeOnChange = e => {
    const { id, changeFormData, formData } = this.props;
    const itemData = (formData && formData.itemData) || {};
    changeFormData(id, 'itemData', { ...itemData, VOLUME: e });
  };

  handleStatusOnChange = e => {
    const { id, changeFormData, formData } = this.props;
    const itemData = (formData && formData.itemData) || {};
    changeFormData(id, 'itemData', { ...itemData, STATUS: e });
  };

  handleRowClick = itemData => {
    const { id, changeFormData } = this.props;
    changeFormData(id, 'itemData', itemData);
  };

  validationCheck = itemData => {
    if (!itemData.GUBUN) return '구분값을 입력해주세요.';
    if (!itemData.STATUS) return '영향구분을 입력해주세요.';
    if (!itemData.MATTER) return '물질명을 입력해주세요.';
    if (!itemData.INGREDIENT) return '구성성분을 입력해주세요.';
    if (!itemData.VOLUME) return '사용량을 입력해주세요.';
    if (!itemData.DISCHRGE) return '단위를 입력해주세요.';
    if (!itemData.UNIT) return '투입협태를 입력해주세요.';
    if (!itemData.INPUT_TYPE) return '배출형태를 입력해주세요.';
    if (!itemData.OUTPUT_TYPE) return '배출처를 입력해주세요.';

    return '';
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
          ? { ...i, [name]: value, MALEFICENCE_ASSESSMENT: eval(i.VOLUME * value), ENV_IMPACT_SIZE: eval(i.MANAGE_ASSESSMENT * i.VOLUME * value) }
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
    const { rowSelections } = this.state;
    const searchFlag = (formData && formData.searchFlag) || false;
    const itemList = (formData && formData.itemList) || [];
    const btnOk = itemList.length >= 1;
    return (
      <div className="itemTable">
        <table>
          <colgroup>
            <col width="5%" />
            <col width="11%" />
            <col width="7%" />
            <col width="4%" />
            <col width="7%" />
            <col width="7%" />
            <col width="8%" />
            <col width="8%" />
            <col width="8%" />
            <col width="8%" />
            <col width="11%" />
            <col width="11%" />
            <col width="5%" />
          </colgroup>
          <thead>
            <tr>
              <td colSpan={13}>
                <Button onClick={() => this.handleAction('EXCEL_DOWNLOAD')}>Excel Download</Button>
                {!searchFlag && (
                  <>
                    <Button onClick={() => this.handleAction('EXCEL_UPLOAD')}>Excel Upload</Button>
                    <Button onClick={() => this.handleAction('SAVE')}>추가</Button>
                    {btnOk && (
                      <>
                        <Button onClick={() => this.handleAction('UPDATE')}>수정</Button>
                        <Popconfirm
                          title="선택하신 내용을(를) 정말로 삭제하시겠습니끼?"
                          onConfirm={() => this.handleAction('DELETE')}
                          okText="확인"
                          cancelText="취소"
                        >
                          <Button>삭제</Button>
                        </Popconfirm>
                        <Button onClick={() => this.handleAction('RESET')}>Reset</Button>
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
                <span>영향크기(B)</span>
              </td>
              <td>
                <span>
                  유해성평가
                  <br />
                  (C=A*B)
                </span>
              </td>
              <td>
                <span>투입배출관리(D)</span>
              </td>
              <td>
                <span>개선계획서(E)</span>
              </td>
              <td>
                <span>문서화(F)</span>
              </td>
              <td>
                <span>발생주기(G)</span>
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
                  <Select defaultValue={item.HAPPEN_PULSE || '0'} onChange={value => this.handleSelectOnChange(value, 'HAPPEN_PULSE', item.SEQ)}>
                    <Option value="0">0</Option>
                    <Option value="1">1</Option>
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
