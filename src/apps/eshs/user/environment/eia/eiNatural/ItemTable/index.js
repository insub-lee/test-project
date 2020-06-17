/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Button, Checkbox, Popconfirm, message } from 'antd';

import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledInput from 'commonStyled/Form/StyledInput';

const AntdInput = StyledInput(Input);

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
    const DEPT_ID = (formData && formData.searchRow && formData.searchRow.DEPT_ID) || (formData && formData.myDept && formData.myDept.DEPT_ID) || '';
    const msg = this.validationCheck(itemData);
    switch (type) {
      case 'SAVE':
        if (this.handleItemOverlapCheck(itemList, { ...itemData, CHK_YEAR, DEPT_CD })) {
          if (msg) {
            message.warning(msg);
            break;
          }
          submitHandlerBySaga(
            id,
            'POST',
            '/api/eshs/v1/common/EshsEiItem',
            { itemData: { ...itemData, CHK_YEAR, DEPT_CD, DEPT_ID }, tbName },
            this.handleFormReset,
          );
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
      <StyledHtmlTable>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleAction('EXCEL_DOWNLOAD')}>
            Excel Download
          </StyledButton>
          {!searchFlag && (
            <>
              <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleAction('EXCEL_UPLOAD')}>
                Excel Upload
              </StyledButton>
              <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleAction('SAVE')}>
                추가
              </StyledButton>
              {btnOk && (
                <>
                  <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleAction('UPDATE')}>
                    수정
                  </StyledButton>
                  <Popconfirm
                    title="선택하신 내용을(를) 정말로 삭제하시겠습니끼?"
                    onConfirm={() => this.handleAction('DELETE')}
                    okText="확인"
                    cancelText="취소"
                  >
                    <StyledButton className="btn-primary btn-sm btn-first">삭제</StyledButton>
                  </Popconfirm>
                  <StyledButton className="btn-primary btn-sm" onClick={() => this.handleAction('RESET')}>
                    Reset
                  </StyledButton>
                </>
              )}
            </>
          )}
        </StyledButtonWrapper>

        <table className="table-border">
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
              <th> </th>
              <th>
                <AntdInput
                  className="ant-input-inline ant-input-sm input-left"
                  name="FIRST_DEPTH"
                  value={itemData.FIRST_DEPTH || ''}
                  onChange={this.handleInputOnChange}
                />
              </th>
              <th>
                <AntdInput
                  className="ant-input-inline ant-input-sm input-left"
                  name="SECOND_DEPTH"
                  value={itemData.SECOND_DEPTH || ''}
                  onChange={this.handleInputOnChange}
                />
              </th>
              <th>
                <AntdInput
                  className="ant-input-inline ant-input-sm input-left"
                  name="USE_LOCATION"
                  value={itemData.USE_LOCATION || ''}
                  onChange={this.handleInputOnChange}
                />
              </th>
              <th>
                <AntdInput
                  className="ant-input-inline ant-input-sm input-left"
                  name="LOAD_FACTOR"
                  value={itemData.LOAD_FACTOR || ''}
                  onChange={this.handleInputOnChange}
                />
              </th>
              <th>
                <AntdInput
                  className="ant-input-inline ant-input-sm input-left"
                  name="USE_PERCENT"
                  value={itemData.USE_PERCENT || ''}
                  onChange={this.handleInputOnChange}
                />
              </th>
              <th>
                <AntdInput className="ant-input-inline ant-input-sm input-left" name="UNIT" value={itemData.UNIT || ''} onChange={this.handleInputOnChange} />
              </th>
            </tr>
            <tr>
              <th> </th>
              <th colSpan={2} className="text-align-center">
                구분
              </th>
              <th rowSpan={2}>사용처</th>
              <th rowSpan={2}>부하율</th>
              <th colSpan={2}>사용량(月)</th>
            </tr>
            <tr>
              <th> </th>
              <th>대분류</th>
              <th>소분류</th>
              <th>사용량</th>
              <th>단위</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td colSpan={7}>{itemList.length} 건</td>
            </tr>
          </tfoot>
          <tbody>
            {itemList.map(i => (
              <tr key={i.REQ_NO} onClick={() => this.handleRowClick(i)} className="tr-center tr-pointer">
                <td>
                  <Checkbox
                    className="ant-checkbox-wrapper"
                    checked={rowSelections.indexOf(i.REQ_NO) > -1}
                    onChange={() => this.handleRowSelection(i.REQ_NO)}
                  />
                </td>
                <td>{i.FIRST_DEPTH}</td>
                <td>{i.SECOND_DEPTH}</td>
                <td>{i.USE_LOCATION}</td>
                <td>{i.LOAD_FACTOR}</td>
                <td>{i.USE_PERCENT}</td>
                <td>{i.UNIT}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </StyledHtmlTable>
    );
  }
}
ItemTable.defaultProps = {};
export default ItemTable;
