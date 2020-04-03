/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Button, Checkbox, Popconfirm, message } from 'antd';
import StyledButton from 'commonStyled/Buttons/StyledButton';

class ItemTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowSelections: [],
    };
  }

  handleAction = type => {
    const { id, formData, submitHandlerBySaga, tbName } = this.props;
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
          submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/EshsEiItem', { itemData: { ...itemData, CHK_YEAR, DEPT_CD }, tbName }, this.handleFormReset);
          break;
        }
        message.warning('이미 동일한 Data가 존재합니다');
        break;
      case 'UPDATE':
        if (msg) {
          message.warning(msg);
          break;
        }
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/EshsEiItem', { itemData, tbName }, this.handleFormReset);
        break;
      case 'DELETE':
        if (!rowSelections.length) {
          message.warning('삭제 하실 항목을 한개라도 선택하세요.');
          break;
        }
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/EshsEiItem', { rowSelections, tbName }, this.handleFormReset);
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
              if (i.USE_LOCATION === itemData.USE_LOCATION)
                if (i.LOAD_FACTOR === itemData.LOAD_FACTOR) if (i.USE_PERCENT === itemData.USE_PERCENT) if (i.UNIT === itemData.UNIT) is_ok = false;
    });
    return is_ok;
  };

  validationCheck = itemData => {
    if (!itemData.FIRST_DEPTH) return '대분류를 입력해 주세여';

    if (!itemData.SECOND_DEPTH) return '소분류를 입력해 주세여';

    if (!itemData.USE_LOCATION) return '사용처를 입력해 주세여';

    if (!itemData.LOAD_FACTOR) return '부하물을 입력해 주세여';

    if (!itemData.USE_PERCENT) return '사용량을 입력해 주세여';

    if (!itemData.UNIT) return '단위를 입력해 주세여';

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
            <col width="16%" />
            <col width="16%" />
            <col width="16%" />
            <col width="16%" />
            <col width="16%" />
            <col width="16%" />
          </colgroup>
          <thead>
            <tr>
              <td colSpan={11}>
                <StyledButton className="btn-primary" onClick={() => this.handleAction('EXCEL_DOWNLOAD')}>
                  Excel Download
                </StyledButton>
                {!searchFlag && (
                  <>
                    <StyledButton className="btn-primary" onClick={() => this.handleAction('EXCEL_UPLOAD')}>
                      Excel Upload
                    </StyledButton>
                    <StyledButton className="btn-primary" onClick={() => this.handleAction('SAVE')}>
                      추가
                    </StyledButton>
                    {btnOk && (
                      <>
                        <StyledButton className="btn-primary" onClick={() => this.handleAction('UPDATE')}>
                          수정
                        </StyledButton>
                        <Popconfirm
                          title="선택하신 내용을(를) 정말로 삭제하시겠습니끼?"
                          onConfirm={() => this.handleAction('DELETE')}
                          okText="확인"
                          cancelText="취소"
                        >
                          <StyledButton className="btn-primary">삭제</StyledButton>
                        </Popconfirm>
                        <StyledButton className="btn-primary" onClick={() => this.handleAction('RESET')}>
                          Reset
                        </StyledButton>
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
                <Input name="USE_LOCATION" value={itemData.USE_LOCATION || ''} onChange={this.handleInputOnChange} />
              </td>
              <td>
                <Input name="LOAD_FACTOR" value={itemData.LOAD_FACTOR || ''} onChange={this.handleInputOnChange} />
              </td>
              <td>
                <Input name="USE_PERCENT" value={itemData.USE_PERCENT || ''} onChange={this.handleInputOnChange} />
              </td>
              <td>
                <Input name="UNIT" value={itemData.UNIT || ''} onChange={this.handleInputOnChange} />
              </td>
            </tr>
            <tr>
              <td></td>
              <td colSpan={2} className="text-align-center">
                구분
              </td>
              <td rowSpan={2}>사용처</td>
              <td rowSpan={2}>부하율</td>
              <td colSpan={2}>사용량(月)</td>
            </tr>
            <tr>
              <td></td>
              <td>대분류</td>
              <td>소분류</td>
              <td>사용량</td>
              <td>단위</td>
            </tr>
          </thead>
          <tbody>
            {itemList.map(i => (
              <tr key={i.REQ_NO} onClick={() => this.handleRowClick(i)}>
                <td align="center">
                  <Checkbox checked={rowSelections.indexOf(i.REQ_NO) > -1} onChange={() => this.handleRowSelection(i.REQ_NO)} />
                </td>
                <td>{i.FIRST_DEPTH}</td>
                <td>{i.SECOND_DEPTH}</td>
                <td>{i.USE_LOCATION}</td>
                <td>{i.LOAD_FACTOR}</td>
                <td>{i.USE_PERCENT}</td>
                <td>{i.UNIT}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={7}>{itemList.length} 건</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
ItemTable.defaultProps = {};
export default ItemTable;
