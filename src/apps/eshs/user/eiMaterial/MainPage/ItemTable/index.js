/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Button, Checkbox, Popconfirm, message, Select, InputNumber } from 'antd';
const { Option } = Select;
class ItemTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowSelections: [],
    };
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
        if (this.handleItemOverlapCheck(itemList, itemData)) {
          if (msg) {
            message.warning(msg);
            break;
          }
          if (!materialCnt) {
            message.warning('상단의 내용을 먼저 입력해주세요.');
            break;
          }
          submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsEiMaterialItem', { ...itemData, CHK_YEAR, DEPT_CD, REQ_NO }, this.handleFormReset);
          break;
        }
        message.warning('이미 동일한 Data가 존재합니다.');
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

  handleInputOnChange = e => {
    const { id, changeFormData, formData } = this.props;
    const itemData = (formData && formData.itemData) || {};
    changeFormData(id, 'itemData', { ...itemData, [e.target.name]: e.target.value });
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

  handleItemOverlapCheck = (itemList, itemData) => {
    let is_ok = true;
    itemList.forEach(i => {
      if (i.GUBUN === itemData.GUBUN)
        if (i.STATUS === itemData.STATUS)
          if (i.MATTER === itemData.MATTER)
            if (i.INGREDIENT === itemData.INGREDIENT)
              if (i.VOLUME === itemData.VOLUME)
                if (i.DISCHRGE === itemData.DISCHRGE)
                  if (i.UNIT === itemData.UNIT) if (i.INPUT_TYPE === itemData.INPUT_TYPE) if (i.OUTPUT_TYPE === itemData.OUTPUT_TYPE) is_ok = false;
    });
    return is_ok;
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

  render() {
    const { formData } = this.props;
    const { rowSelections } = this.state;
    const searchFlag = (formData && formData.searchFlag) || false;
    const itemList = (formData && formData.itemList) || [];
    const itemData = (formData && formData.itemData) || {};
    const btnOk = itemList.length >= 1;
    return (
      <div className="itemTable">
        <table>
          <colgroup>
            <col width="4%" />
            <col width="4%" />
            <col width="6%" />
            <col width="8%" />
            <col width="16%" />
            <col width="16%" />
            <col width="9%" />
            <col width="9%" />
            <col width="9%" />
            <col width="9%" />
            <col width="14%" />
          </colgroup>
          <thead>
            <tr>
              <td colSpan={11}>
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
              <td></td>
              <td></td>
              <td>
                <Input name="GUBUN" value={itemData.GUBUN || ''} onChange={this.handleInputOnChange} />
              </td>
              <td>
                <Select value={itemData.STATUS || '정상'} style={{ width: '100%' }} onChange={this.handleStatusOnChange}>
                  <Option value="정상">정상</Option>
                  <Option value="비정상">비정상</Option>
                </Select>
              </td>
              <td>
                <Input name="MATTER" value={itemData.MATTER || ''} onChange={this.handleInputOnChange} />
              </td>
              <td>
                <Input name="INGREDIENT" value={itemData.INGREDIENT || ''} onChange={this.handleInputOnChange} />
              </td>
              <td>
                <InputNumber name="VOLUME" value={itemData.VOLUME || ''} style={{ width: '100%' }} onChange={this.handleVolumeOnChange} />
              </td>
              <td>
                <Input name="UNIT" value={itemData.UNIT || ''} onChange={this.handleInputOnChange} />
              </td>
              <td>
                <Input name="INPUT_TYPE" value={itemData.INPUT_TYPE || ''} onChange={this.handleInputOnChange} />
              </td>
              <td>
                <Input name="OUTPUT_TYPE" value={itemData.OUTPUT_TYPE || ''} onChange={this.handleInputOnChange} />
              </td>
              <td>
                <Input name="DISCHRGE" value={itemData.DISCHRGE || ''} onChange={this.handleInputOnChange} />
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>
                <span>삭제</span>
              </td>
              <td rowSpan={2}>
                <span>Seq</span>
              </td>
              <td rowSpan={2}>
                <span>구분</span>
              </td>
              <td rowSpan={2}>
                <span>
                  영향구분
                  <br />
                  (정상/비정상)
                </span>
                )
              </td>
              <td colSpan={5}>
                <span>IN-PUT</span>
              </td>
              <td colSpan={2}>
                <span>OUT-PUT</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>물질명</span>
              </td>
              <td>
                <span>구성성분</span>
              </td>
              <td>
                <span>사용량</span>
              </td>
              <td>
                <span>단위</span>
              </td>
              <td>
                <span>투입형태</span>
              </td>
              <td>
                <span>배출형태</span>
              </td>
              <td>
                <span>배출처</span>
              </td>
            </tr>
          </thead>
          <tbody>
            {itemList.map(m => (
              <tr key={m.SEQ} onClick={() => this.handleRowClick(m)}>
                <td align="center">
                  <Checkbox checked={rowSelections.indexOf(m.SEQ) > -1} onChange={() => this.handleRowSelection(m.SEQ)} />
                </td>
                <td align="center">{m.SEQ}</td>
                <td align="center">{m.GUBUN}</td>
                <td align="center">{m.STATUS}</td>
                <td>{m.MATTER}</td>
                <td>{m.INGREDIENT}</td>
                <td>{m.VOLUME.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                <td>{m.UNIT}</td>
                <td>{m.INPUT_TYPE}</td>
                <td>{m.OUTPUT_TYPE}</td>
                <td>{m.DISCHRGE}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={11}>{itemList.length} 건</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
ItemTable.defaultProps = {};
export default ItemTable;
