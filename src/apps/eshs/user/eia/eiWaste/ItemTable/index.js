/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Button, Checkbox, Popconfirm, message } from 'antd';

class ItemTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowSelections: [],
    };
  }

  handleAction = type => {
    const { id, formData, submitHandlerBySaga, tb_name } = this.props;
    const { rowSelections } = this.state;
    const itemList = (formData && formData.itemList) || [];
    const itemData = (formData && formData.itemData) || {};
    const CHK_YEAR = (formData && formData.CHK_YEAR) || '';
    const DEPT_CD = (formData && formData.searchRow && formData.searchRow.DEPT_CD) || (formData && formData.myDept && formData.myDept.DEPT_CD) || '';
    const msg = this.validationCheck(itemData);
    switch (type) {
      case 'SAVE':
        if (this.handleItemOverlapCheck(itemList, { ...itemData, CHK_YEAR, DEPT_CD })) {
          if (msg) {
            message.warning(msg);
            break;
          }
          submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/EshsEiItem', { itemData: { ...itemData, CHK_YEAR, DEPT_CD }, tb_name }, this.handleFormReset);
          break;
        }
        message.warning('이미 동일한 Data가 존재합니다');
        break;
      case 'UPDATE':
        if (msg) {
          message.warning(msg);
          break;
        }
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/EshsEiItem', { itemData, tb_name }, this.handleFormReset);
        break;
      case 'DELETE':
        if (!rowSelections.length) {
          message.warning('삭제 하실 항목을 한개라도 선택하세요.');
          break;
        }
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/EshsEiItem', { rowSelections, tb_name }, this.handleFormReset);
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

  handleRowClick = itemData => {
    const { id, changeFormData } = this.props;
    changeFormData(id, 'itemData', itemData);
  };

  handleItemOverlapCheck = (itemList, itemData) => {
    let is_ok = true;
    itemList.forEach(i => {
      if (i.CHK_YEAR === itemData.CHK_YEAR)
        if (i.DEPT_CD === itemData.DEPT_CD)
          if (i.FIRST_DEPTH === itemData.FIRST_DEPTH)
            if (i.SECOND_DEPTH === itemData.SECOND_DEPTH)
              if (i.PROCESS_METHOD === itemData.PROCESS_METHOD)
                if (i.OUTPUT_TYPE === itemData.OUTPUT_TYPE)
                  if (i.OUTPUT_AREA === itemData.OUTPUT_AREA) if (i.LAST_YEAR === itemData.LAST_YEAR) if (i.THIS_YEAR === itemData.THIS_YEAR) is_ok = false;
    });
    return is_ok;
  };

  validationCheck = itemData => {
    const reg = /^-?[0-9]*(\.[0-9]*)?$/;
    if (!itemData.FIRST_DEPTH) return '구분을 입력해주세요.';
    if (!itemData.SECOND_DEPTH) return '소분류를 입력해주세요.';
    if (!itemData.PROCESS_METHOD) return '처리방법을 입력해주세요.';
    if (!itemData.OUTPUT_TYPE) return '배출형태를 입력해주세요.';
    if (!itemData.OUTPUT_AREA) return '배출처를 입력해주세요.';
    if (!itemData.LAST_YEAR) return '전년도 발생량을 입력해주세요.';
    if (!itemData.THIS_YEAR) return '올해의 발생량을 입력해주세요.';
    if (!reg.test(itemData.LAST_YEAR)) {
      return '전년도 발생량은 숫자만 입력가능합니다.';
    }
    if (!reg.test(itemData.THIS_YEAR)) {
      return '올해의 발생량을 숫자만 입력가능합니다.';
    }
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
            <col width="3%" />
            <col width="8%" />
            <col width="11%" />
            <col width="13%" />
            <col width="13%" />
            <col width="16%" />
            <col width="16%" />
            <col width="8%" />
            <col width="12%" />
          </colgroup>
          <thead>
            <tr>
              <td colSpan={15}>
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
              <td>
                <Input name="FIRST_DEPTH" value={itemData.FIRST_DEPTH || ''} onChange={this.handleInputOnChange} />
              </td>
              <td>
                <Input name="SECOND_DEPTH" value={itemData.SECOND_DEPTH || ''} onChange={this.handleInputOnChange} />
              </td>
              <td>
                <Input name="PROCESS_METHOD" value={itemData.PROCESS_METHOD || ''} onChange={this.handleInputOnChange} />
              </td>
              <td>
                <Input name="OUTPUT_TYPE" value={itemData.OUTPUT_TYPE || ''} onChange={this.handleInputOnChange} />
              </td>
              <td>
                <Input name="OUTPUT_AREA" value={itemData.OUTPUT_AREA || ''} onChange={this.handleInputOnChange} />
              </td>
              <td>
                <Input name="LAST_YEAR" value={itemData.LAST_YEAR || ''} onChange={this.handleInputOnChange} />
              </td>
              <td>
                <Input name="THIS_YEAR" value={itemData.THIS_YEAR || ''} onChange={this.handleInputOnChange} />
              </td>
              <td></td>
            </tr>
            <tr>
              <td rowSpan={2}></td>
              <td rowSpan={2}>구분</td>
              <td rowSpan={2}>소분류</td>
              <td rowSpan={2}>처리방법</td>
              <td rowSpan={2}>배출형태</td>
              <td rowSpan={2}>
                배출처
                <br />
                (공정/Area)
              </td>
              <td colSpan={2}>배출량</td>
              <td rowSpan={2}>
                증감율
                <br />
                (전년대비 %)
              </td>
            </tr>
            <tr>
              <td>전년발생량</td>
              <td>발생량</td>
            </tr>
          </thead>
          <tbody>
            {itemList.map(i => (
              <tr key={i.REQ_NO} onClick={() => this.handleRowClick(i)}>
                <td align="center">
                  <Checkbox checked={rowSelections.indexOf(i.REQ_NO) > -1} defaultChecked={false} onChange={() => this.handleRowSelection(i.REQ_NO)} />
                </td>
                <td>{i.FIRST_DEPTH}</td>
                <td>{i.SECOND_DEPTH}</td>
                <td>{i.PROCESS_METHOD}</td>
                <td>{i.OUTPUT_TYPE}</td>
                <td>{i.OUTPUT_AREA}</td>
                <td>{i.LAST_YEAR}</td>
                <td>{i.THIS_YEAR}</td>
                <td>{i.CALC_YOY}%</td>
              </tr>
            ))}
            <tr>
              <td colSpan={15}>{itemList.length} 건</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
ItemTable.defaultProps = {};
export default ItemTable;
