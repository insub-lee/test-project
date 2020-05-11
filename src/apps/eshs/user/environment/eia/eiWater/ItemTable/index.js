/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Checkbox, Popconfirm, message } from 'antd';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
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
          if (i.EI_SYSTEM === itemData.EI_SYSTEM)
            if (i.INCOM_TON === itemData.INCOM_TON)
              if (i.INCOM_POLLUTION === itemData.INCOM_POLLUTION)
                if (i.INCOM_SPEC === itemData.INCOM_SPEC)
                  if (i.INCOM_AV === itemData.INCOM_AV)
                    if (i.INCOM_HUNTING === itemData.INCOM_HUNTING)
                      if (i.DISCHARGE === itemData.DISCHARGE)
                        if (i.DISCHARGE_TON === itemData.DISCHARGE_TON)
                          if (i.DISCHARGE_POLLUTION === itemData.DISCHARGE_POLLUTION)
                            if (i.DISCHARGE_WARNING === itemData.DISCHARGE_WARNING)
                              if (i.DISCHARGE_SHOTDOWN === itemData.DISCHARGE_SHOTDOWN)
                                if (i.DISCHARGE_AV === itemData.DISCHARGE_AV)
                                  if (i.DISCHARGE_HUNTING === itemData.DISCHARGE_HUNTING) if (i.DISCHARGE_TOTAL === itemData.DISCHARGE_TOTAL) is_ok = false;
    });
    return is_ok;
  };

  validationCheck = itemData => {
    if (!itemData.EI_SYSTEM) return '지역명을 입력해주세요.';
    if (!itemData.INCOM_TON) return '유입 발생량을 입력해주세요.';
    if (!itemData.INCOM_POLLUTION) return '유입 오염물질을 입력해주세요.';
    if (!itemData.INCOM_SPEC) return '유입 SPEC을 입력해주세요.';
    if (!itemData.INCOM_AV) return '발생농도 AV.를 입력해주세요.';
    if (!itemData.INCOM_HUNTING) return '발생농도 HUNTING을 입력해주세요.';
    if (!itemData.DISCHARGE) return '유입 배출처를 입력해주세요.';
    if (!itemData.DISCHARGE_TON) return '방류수 발생량을 입력해주세요.';
    if (!itemData.DISCHARGE_POLLUTION) return '방류수 오염물질을 입력해주세요.';
    if (!itemData.DISCHARGE_WARNING) return '방류수 WARNING을 입력해주세요.';
    if (!itemData.DISCHARGE_SHOTDOWN) return '방류수 SHOTDOWN을 입력해주세요.';
    if (!itemData.DISCHARGE_AV) return '배출농도 AV.를 입력해주세요.';
    if (!itemData.DISCHARGE_HUNTING) return '배출농도 HUNTING을 입력해주세요.';
    if (!itemData.DISCHARGE_TOTAL) return '오염물질 총량을 입력해주세요.';
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
        <StyledHtmlTable className="tableWrapper">
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
              <col width="3%" />
              <col width="10%" />
              <col width="10%" />
              <col width="5%" />
              <col width="5%" />
              <col width="5%" />
              <col width="8%" />
              <col width="11%" />
              <col width="8%" />
              <col width="5%" />
              <col width="6%" />
              <col width="6%" />
              <col width="4%" />
              <col width="6%" />
              <col width="8%" />
            </colgroup>
            <thead>
              <tr>
                <td></td>
                <td>
                  <AntdInput
                    className="ant-input-inline ant-input-sm input-left"
                    name="EI_SYSTEM"
                    value={itemData.EI_SYSTEM || ''}
                    onChange={this.handleInputOnChange}
                  />
                </td>
                <td>
                  <AntdInput
                    className="ant-input-inline ant-input-sm input-left"
                    name="INCOM_TON"
                    value={itemData.INCOM_TON || ''}
                    onChange={this.handleInputOnChange}
                  />
                </td>
                <td>
                  <AntdInput
                    className="ant-input-inline ant-input-sm input-left"
                    name="INCOM_POLLUTION"
                    value={itemData.INCOM_POLLUTION || ''}
                    onChange={this.handleInputOnChange}
                  />
                </td>
                <td>
                  <AntdInput
                    className="ant-input-inline ant-input-sm input-left"
                    name="INCOM_SPEC"
                    value={itemData.INCOM_SPEC || ''}
                    onChange={this.handleInputOnChange}
                  />
                </td>
                <td>
                  <AntdInput
                    className="ant-input-inline ant-input-sm input-left"
                    name="INCOM_AV"
                    value={itemData.INCOM_AV || ''}
                    onChange={this.handleInputOnChange}
                  />
                </td>
                <td>
                  <AntdInput
                    className="ant-input-inline ant-input-sm input-left"
                    name="INCOM_HUNTING"
                    value={itemData.INCOM_HUNTING || ''}
                    onChange={this.handleInputOnChange}
                  />
                </td>
                <td>
                  <AntdInput
                    className="ant-input-inline ant-input-sm input-left"
                    name="DISCHARGE"
                    value={itemData.DISCHARGE || ''}
                    onChange={this.handleInputOnChange}
                  />
                </td>
                <td>
                  <AntdInput
                    className="ant-input-inline ant-input-sm input-left"
                    name="DISCHARGE_TON"
                    value={itemData.DISCHARGE_TON || ''}
                    onChange={this.handleInputOnChange}
                  />
                </td>
                <td>
                  <AntdInput
                    className="ant-input-inline ant-input-sm input-left"
                    name="DISCHARGE_POLLUTION"
                    value={itemData.DISCHARGE_POLLUTION || ''}
                    onChange={this.handleInputOnChange}
                  />
                </td>
                <td>
                  <AntdInput
                    className="ant-input-inline ant-input-sm input-left"
                    name="DISCHARGE_WARNING"
                    value={itemData.DISCHARGE_WARNING || ''}
                    onChange={this.handleInputOnChange}
                  />
                </td>
                <td>
                  <AntdInput
                    className="ant-input-inline ant-input-sm input-left"
                    name="DISCHARGE_SHOTDOWN"
                    value={itemData.DISCHARGE_SHOTDOWN || ''}
                    onChange={this.handleInputOnChange}
                  />
                </td>
                <td>
                  <AntdInput
                    className="ant-input-inline ant-input-sm input-left"
                    name="DISCHARGE_AV"
                    value={itemData.DISCHARGE_AV || ''}
                    onChange={this.handleInputOnChange}
                  />
                </td>
                <td>
                  <AntdInput
                    className="ant-input-inline ant-input-sm input-left"
                    name="DISCHARGE_HUNTING"
                    value={itemData.DISCHARGE_HUNTING || ''}
                    onChange={this.handleInputOnChange}
                  />
                </td>
                <td>
                  <AntdInput
                    className="ant-input-inline ant-input-sm input-left"
                    name="DISCHARGE_TOTAL"
                    value={itemData.DISCHARGE_TOTAL || ''}
                    onChange={this.handleInputOnChange}
                  />
                </td>
              </tr>
              <tr>
                <th rowSpan={4}> </th>
                <th rowSpan={4}>
                  SYSTEM
                  <br />M<br />
                  (Area)
                </th>
                <th colSpan={5}>유입(원수)</th>
                <th rowSpan={4}>배출구</th>
                <th colSpan={7}>방류수</th>
              </tr>
              <tr>
                <th rowSpan={3}>
                  발생량
                  <br />
                  (TON/월 평균)
                </th>
                <th rowSpan={3}>오염물질</th>
                <th colSpan={3}>원수 오염물질</th>
                <th rowSpan={3}>배출량(Ton/Day)</th>
                <th rowSpan={3}>오염물질</th>
                <th colSpan={2}>SPEC</th>
                <th colSpan={3}>방류수 오염물질</th>
              </tr>
              <tr>
                <th rowSpan={2}>
                  SPEC
                  <br />
                  (ppm)
                </th>
                <th colSpan={2}>발생농도(ppm. Year)</th>
                <th rowSpan={2}>WARNING</th>
                <th rowSpan={2}>SHOTDOWN</th>
                <th colSpan={2}>배출농도(ppm)</th>
                <th rowSpan={2}>오염물질총량(t)</th>
              </tr>
              <tr>
                <th>AV.</th>
                <th>HUNTING</th>
                <th>AV.</th>
                <th>HUNTING</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td colSpan={15}>{itemList.length} 건</td>
              </tr>
            </tfoot>
            <tbody>
              {itemList.map(i => (
                <tr key={i.REQ_NO} onClick={() => this.handleRowClick(i)} className="tr-center tr-pointer">
                  <td>
                    <Checkbox
                      className="ant-checkbox-wrapper"
                      checked={rowSelections.indexOf(i.REQ_NO) > -1}
                      defaultChecked={false}
                      onChange={() => this.handleRowSelection(i.REQ_NO)}
                    />
                  </td>
                  <td>{i.EI_SYSTEM}</td>
                  <td>{i.INCOM_TON}</td>
                  <td>{i.INCOM_POLLUTION}</td>
                  <td>{i.INCOM_SPEC}</td>
                  <td>{i.INCOM_AV}</td>
                  <td>{i.INCOM_HUNTING}</td>
                  <td>{i.DISCHARGE}</td>
                  <td>{i.DISCHARGE_TON}</td>
                  <td>{i.DISCHARGE_POLLUTION}</td>
                  <td>{i.DISCHARGE_WARNING}</td>
                  <td>{i.DISCHARGE_SHOTDOWN}</td>
                  <td>{i.DISCHARGE_AV}</td>
                  <td>{i.DISCHARGE_HUNTING}</td>
                  <td>{i.DISCHARGE_TOTAL}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </StyledHtmlTable>
      </ContentsWrapper>
    );
  }
}
ItemTable.defaultProps = {};
export default ItemTable;
