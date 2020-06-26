/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Checkbox, Popconfirm, Select, InputNumber } from 'antd';

import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';
import { createExcelData } from 'apps/eshs/common/createExcelData';
import moment from 'moment';
import { excelStyle } from 'apps/eshs/user/environment/eia/excelStyle';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import { materialItemColumnDefs } from './columnDefs';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdInputNumber = StyledInputNumber(InputNumber);

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
    const STATUS = (itemData && itemData.STATUS) || '정상';
    const itemList = (formData && formData.itemList) || [];
    const CHK_YEAR = (formData && formData.CHK_YEAR) || '';
    const materialCnt = (formData && formData.materialCnt) || '';
    const DEPT_CD = (formData && formData.searchRow && formData.searchRow.DEPT_CD) || (formData && formData.myDept && formData.myDept.DEPT_CD) || '';
    const DEPT_ID = (formData && formData.searchRow && formData.searchRow.DEPT_ID) || (formData && formData.myDept && formData.myDept.DEPT_ID) || '';
    const msg = this.validationCheck(itemData);
    switch (type) {
      case 'SAVE':
        if (this.handleItemOverlapCheck(itemList, itemData)) {
          if (msg) {
            message.warning(msg);
            break;
          }
          if (!materialCnt) {
            message.info(<MessageContent>상단의 내용을 먼저 입력해주세요.</MessageContent>);

            break;
          }
          submitHandlerBySaga(
            id,
            'POST',
            '/api/eshs/v1/common/eshsEiMaterialItem',
            { ...itemData, STATUS, CHK_YEAR, DEPT_CD, REQ_NO, DEPT_ID },
            (afterId, res) => {
              if (res && res.code === 200) {
                this.handleFormReset();
                message.info(<MessageContent>저장되었습니다.</MessageContent>);
                this.handleFormReset();
              } else {
                message.info(<MessageContent>저장에 실패하였습니다.</MessageContent>);
              }
            },
          );
          break;
        }
        message.info(<MessageContent>이미 동일한 Data가 존재합니다.</MessageContent>);

        break;
      case 'UPDATE':
        if (msg) {
          message.info(<MessageContent>{msg}</MessageContent>);

          break;
        }
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsEiMaterialItem', { ...itemData, CHK_YEAR, DEPT_CD }, (afterId, res) => {
          if (res && res.code === 200) {
            this.handleFormReset();
            message.info(<MessageContent>수정되었습니다.</MessageContent>);
            this.handleFormReset();
          } else {
            message.info(<MessageContent>수정에 실패하였습니다.</MessageContent>);
          }
        });
        break;
      case 'DELETE':
        if (!rowSelections.length) {
          message.info(<MessageContent>삭제 하실 항목을 한개라도 선택하세요.</MessageContent>);

          break;
        }
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsEiMaterialItem', { rowSelections, REQ_NO }, (afterId, res) => {
          if (res && res.code === 200) {
            this.handleFormReset();
            message.info(<MessageContent>삭제되었습니다.</MessageContent>);
            this.handleFormReset();
          } else {
            message.info(<MessageContent>삭제에 실패하였습니다.</MessageContent>);
          }
        });
        break;
      case 'RESET':
        this.handleFormReset();
        break;
      case 'EXCEL_DOWNLOAD':
        message.info(<MessageContent>미구현</MessageContent>);

        break;
      case 'EXCEL_UPLOAD':
        message.info(<MessageContent>미구현</MessageContent>);
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
    const reg = /^-?[0-9]*(\.[0-9]*)?$/;
    const { id, changeFormData, formData } = this.props;
    const itemData = (formData && formData.itemData) || {};

    if (!reg.test(e)) {
      return '';
    }

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
    let btnOk = itemList.length >= 1;
    const approvalStatus = (formData && formData.materialData && formData.materialData.STATUS) || '';
    let statusMsg = '';

    switch (approvalStatus) {
      case 'REVIEWING':
        statusMsg = '현재 결재중입니다. 검토자만 수정할 수 있습니다.';
        btnOk = true; // 검토자만 권한 추가시 수정
        break;
      case 'DOING':
        statusMsg = '현재 결재중입니다. 수정할 수 없습니다.';
        btnOk = false;
        break;
      case 'COMPLETE':
        statusMsg = '결재가 완료되었습니다. 조회만 할 수 있습니다.';
        btnOk = false;
        break;
      case 'NOTHING':
        break;
      default:
        break;
    }
    return (
      <StyledHtmlTable>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10 btn-wrap-mt-20">
          {statusMsg && <span className="btn-comment btn-wrap-mr-5">{statusMsg}</span>}

          <ExcelDownloadComp
            isBuilder={false}
            fileName={`Material_${moment().format('YYYYMMDD')}`}
            className="testClassName"
            btnText="Excel Download"
            sheetName={`Material_${moment().format('YYYYMMDD')}`}
            listData={itemList}
            fields={createExcelData(materialItemColumnDefs, 'FIELD', 'field')}
            columns={materialItemColumnDefs.map(item => ({ ...item, ...excelStyle }))}
          />
          {!searchFlag && (
            <>
              <StyledButton className="btn-gray btn-sm mr5 ml5" onClick={() => this.handleAction('EXCEL_UPLOAD')}>
                Excel Upload
              </StyledButton>
              <StyledButton className="btn-primary btn-sm mr5" onClick={() => this.handleAction('SAVE')}>
                추가
              </StyledButton>
              {btnOk && (
                <>
                  <StyledButton className="btn-primary btn-sm mr5" onClick={() => this.handleAction('UPDATE')}>
                    수정
                  </StyledButton>
                  <Popconfirm
                    title="선택하신 내용을(를) 정말로 삭제하시겠습니끼?"
                    onConfirm={() => this.handleAction('DELETE')}
                    okText="확인"
                    cancelText="취소"
                  >
                    <StyledButton className="btn-light btn-sm mr5">삭제</StyledButton>
                  </Popconfirm>
                  <StyledButton className="btn-light btn-sm " onClick={() => this.handleAction('RESET')}>
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
              <td></td>
              <td></td>
              <td>
                <AntdInput name="GUBUN" value={itemData.GUBUN || ''} className="ant-input-inline ant-input-xs input-left" onChange={this.handleInputOnChange} />
              </td>
              <td>
                <AntdSelect className="select-xs" value={itemData.STATUS || '정상'} onChange={this.handleStatusOnChange}>
                  <Option value="정상">정상</Option>
                  <Option value="비정상">비정상</Option>
                </AntdSelect>
              </td>
              <td>
                <AntdInput
                  name="MATTER"
                  value={itemData.MATTER || ''}
                  className="ant-input-inline ant-input-xs input-left"
                  onChange={this.handleInputOnChange}
                />
              </td>
              <td>
                <AntdInput
                  name="INGREDIENT"
                  value={itemData.INGREDIENT || ''}
                  className="ant-input-inline ant-input-xs input-left"
                  onChange={this.handleInputOnChange}
                />
              </td>
              <td>
                <AntdInputNumber
                  name="VOLUME"
                  value={itemData.VOLUME || ''}
                  className="ant-input-inline ant-input-number-xs input-left"
                  onChange={this.handleVolumeOnChange}
                />
              </td>
              <td>
                <AntdInput name="UNIT" value={itemData.UNIT || ''} className="ant-input-inline ant-input-xs input-left" onChange={this.handleInputOnChange} />
              </td>
              <td>
                <AntdInput
                  name="INPUT_TYPE"
                  value={itemData.INPUT_TYPE || ''}
                  className="ant-input-inline ant-input-xs input-left"
                  onChange={this.handleInputOnChange}
                />
              </td>
              <td>
                <AntdInput
                  name="OUTPUT_TYPE"
                  value={itemData.OUTPUT_TYPE || ''}
                  className="ant-input-inline ant-input-xs input-left"
                  onChange={this.handleInputOnChange}
                />
              </td>
              <td>
                <AntdInput
                  name="DISCHRGE"
                  value={itemData.DISCHRGE || ''}
                  className="ant-input-inline ant-input-xs input-left"
                  onChange={this.handleInputOnChange}
                />
              </td>
            </tr>
            <tr>
              <th rowSpan={2}>
                <span>삭제</span>
              </th>
              <th rowSpan={2}>
                <span>Seq</span>
              </th>
              <th rowSpan={2}>
                <span>구분</span>
              </th>
              <th rowSpan={2}>
                <span>
                  영향구분
                  <br />
                  (정상/비정상)
                </span>
              </th>
              <th colSpan={5}>
                <span>IN-PUT</span>
              </th>
              <th colSpan={2}>
                <span>OUT-PUT</span>
              </th>
            </tr>
            <tr>
              <th>
                <span>물질명</span>
              </th>
              <th>
                <span>구성성분</span>
              </th>
              <th>
                <span>사용량</span>
              </th>
              <th>
                <span>단위</span>
              </th>
              <th>
                <span>투입형태</span>
              </th>
              <th>
                <span>배출형태</span>
              </th>
              <th>
                <span>배출처</span>
              </th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td colSpan={11}>{itemList.length} 건</td>
            </tr>
          </tfoot>
          <tbody>
            {itemList.map((m, index) => (
              <tr key={m.SEQ} className="tr-center tr-pointer" onClick={() => this.handleRowClick(m)}>
                <td>
                  <Checkbox
                    className="ant-checkbox-wrapper"
                    defaultChecked={false}
                    checked={rowSelections.indexOf(m.SEQ) > -1}
                    onChange={() => this.handleRowSelection(m.SEQ)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{m.GUBUN}</td>
                <td>{m.STATUS}</td>
                <td>{m.MATTER}</td>
                <td>{m.INGREDIENT}</td>
                <td>{m.VOLUME.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                <td>{m.UNIT}</td>
                <td>{m.INPUT_TYPE}</td>
                <td>{m.OUTPUT_TYPE}</td>
                <td>{m.DISCHRGE}</td>
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
