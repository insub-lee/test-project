/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Checkbox, Popconfirm, message } from 'antd';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledInput from 'commonStyled/Form/StyledInput';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';

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
          if (i.EI_AREA === itemData.EI_AREA)
            if (i.PREVENTION_EQUIP === itemData.PREVENTION_EQUIP)
              if (i.INFLOW_AREA === itemData.INFLOW_AREA)
                if (i.DISCHARGE_MATTER === itemData.DISCHARGE_MATTER)
                  if (i.PPM_WARNING === itemData.PPM_WARNING)
                    if (i.PPM_SHOTDOWN === itemData.PPM_SHOTDOWN)
                      if (i.PPM_YEAR_AVERAGE === itemData.PPM_YEAR_AVERAGE) if (i.W1 === itemData.W1) if (i.LEGISLATION === itemData.LEGISLATION) is_ok = false;
    });
    return is_ok;
  };

  validationCheck = itemData => {
    if (!itemData.EI_AREA) return '지역명을 입력해주세요.';
    if (!itemData.PREVENTION_EQUIP) return '방지시설을 입력해주세요.';
    if (!itemData.INFLOW_AREA) return '오영물질 유입 Area를 입력해주세요.';
    if (!itemData.DISCHARGE_MATTER) return '배출물질명을 입력해주세요.';
    if (!itemData.PPM_WARNING) return '관리기준(자체기준)을 입력해 주세요.';
    if (!itemData.PPM_SHOTDOWN) return '관리기준(법적기준)을 입력해 주세요.';
    if (!itemData.PPM_YEAR_AVERAGE) return '배출 농도를 입력해주세요.';
    if (!itemData.W1) return 'W1을 입력해주세요.';
    if (!itemData.LEGISLATION) return '법규를 입력해주세요.';
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
      <ContentsWrapper>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="3%" />
              <col width="8%" />
              <col width="10%" />
              <col width="10%" />
              <col width="13%" />
              <col width="10%" />
              <col width="13%" />
              <col width="15%" />
              <col width="8%" />
              <col width="10%" />
            </colgroup>
            <thead>
              <tr>
                <td colSpan={10} align="right">
                  <StyledButtonWrapper className="btn-wrap-inline">
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
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <AntdInput
                    className="ant-input-inline ant-input-sm input-left"
                    name="EI_AREA"
                    value={itemData.EI_AREA || ''}
                    onChange={this.handleInputOnChange}
                  />
                </td>
                <td>
                  <AntdInput
                    className="ant-input-inline ant-input-sm input-left"
                    name="PREVENTION_EQUIP"
                    value={itemData.PREVENTION_EQUIP || ''}
                    onChange={this.handleInputOnChange}
                  />
                </td>
                <td>
                  <AntdInput
                    className="ant-input-inline ant-input-sm input-left"
                    name="INFLOW_AREA"
                    value={itemData.INFLOW_AREA || ''}
                    onChange={this.handleInputOnChange}
                  />
                </td>
                <td>
                  <AntdInput
                    className="ant-input-inline ant-input-sm input-left"
                    name="DISCHARGE_MATTER"
                    value={itemData.DISCHARGE_MATTER || ''}
                    onChange={this.handleInputOnChange}
                  />
                </td>
                <td>
                  <AntdInput
                    className="ant-input-inline ant-input-sm input-left"
                    name="PPM_WARNING"
                    value={itemData.PPM_WARNING || ''}
                    onChange={this.handleInputOnChange}
                  />
                </td>
                <td>
                  <AntdInput
                    className="ant-input-inline ant-input-sm input-left"
                    name="PPM_SHOTDOWN"
                    value={itemData.PPM_SHOTDOWN || ''}
                    onChange={this.handleInputOnChange}
                  />
                </td>
                <td>
                  <AntdInput
                    className="ant-input-inline ant-input-sm input-left"
                    name="PPM_YEAR_AVERAGE"
                    value={itemData.PPM_YEAR_AVERAGE || ''}
                    onChange={this.handleInputOnChange}
                  />
                </td>
                <td>
                  <AntdInput className="ant-input-inline ant-input-sm input-left" name="W1" value={itemData.W1 || ''} onChange={this.handleInputOnChange} />
                </td>
                <td>
                  <AntdInput
                    className="ant-input-inline ant-input-sm input-left"
                    name="LEGISLATION"
                    value={itemData.LEGISLATION || ''}
                    onChange={this.handleInputOnChange}
                  />
                </td>
              </tr>
              <tr>
                <th rowSpan={2}> </th>
                <th rowSpan={2}>Area</th>
                <th rowSpan={2}>방지시설</th>
                <th rowSpan={2}>
                  오염물질
                  <br />
                  유입 Area
                </th>
                <th rowSpan={2}>배출물질명</th>
                <th colSpan={2}>관리기준(ppm)</th>
                <th rowSpan={2}>
                  배출농도
                  <br />
                  (ppm/년평균)
                </th>
                <th colSpan={2}>환경영향수준</th>
              </tr>
              <tr>
                <th>
                  자체기준
                  <br />
                  (Warning)
                </th>
                <th>
                  법적기준
                  <br />
                  (Shot Down))
                </th>
                <th>W1</th>
                <th>법규</th>
              </tr>
            </thead>
            <tbody>
              {itemList.map(i => (
                <tr key={i.REQ_NO} onClick={() => this.handleRowClick(i)}>
                  <td>
                    <Checkbox
                      className="ant-checkbox-wrapper"
                      checked={rowSelections.indexOf(i.REQ_NO) > -1}
                      defaultChecked={false}
                      onChange={() => this.handleRowSelection(i.REQ_NO)}
                    />
                  </td>
                  <td>{i.EI_AREA}</td>
                  <td>{i.PREVENTION_EQUIP}</td>
                  <td>{i.INFLOW_AREA}</td>
                  <td>{i.DISCHARGE_MATTER}</td>
                  <td>{i.PPM_WARNING}</td>
                  <td>{i.PPM_SHOTDOWN}</td>
                  <td>{i.PPM_YEAR_AVERAGE}</td>
                  <td>{i.W1}</td>
                  <td>{i.LEGISLATION}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={10}>{itemList.length} 건</td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
      </ContentsWrapper>
    );
  }
}
ItemTable.defaultProps = {};
export default ItemTable;
