/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Checkbox, Popconfirm, Popover } from 'antd';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';

import { excelStyle } from 'apps/eshs/user/environment/eia/excelStyle';
import { createExcelData } from 'apps/eshs/common/createExcelData';
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';
import moment from 'moment';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const AntdInput = StyledInput(Input);

const excelColumn = [
  { title: 'AREA', field: 'EI_AREA', filter: 'agTextColumnFilter' },
  { title: '방지시설', width: { wpx: 400 }, field: 'PREVENTION_EQUIP', filter: 'agTextColumnFilter' },
  { title: '오염물질 유입Area', width: { wpx: 150 }, field: 'INFLOW_AREA', filter: 'agTextColumnFilter' },
  { title: '배출물질명', width: { wpx: 100 }, field: 'DISCHARGE_MATTER', filter: 'agTextColumnFilter' },
  { title: '자체기준(Warning)', width: { wpx: 150 }, field: 'PPM_WARNING', filter: 'agTextColumnFilter' },
  { title: '법적기준(Shot Down)', width: { wpx: 150 }, field: 'PPM_SHOTDOWN', filter: 'agTextColumnFilter' },
  { title: '배출농도(ppm/년평균)', width: { wpx: 150 }, field: 'PPM_YEAR_AVERAGE', filter: 'agTextColumnFilter' },
  { title: 'W1', field: 'W1', filter: 'agTextColumnFilter' },
  { title: '법규', field: 'LEGISLATION', filter: 'agTextColumnFilter' },
];
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
            (afterId, res) => {
              if (res && res.code === 200) {
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
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/EshsEiItem', { itemData, tbName }, (afterId, res) => {
          if (res && res.code === 200) {
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
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/EshsEiItem', { rowSelections, tbName }, (afterId, res) => {
          if (res && res.code === 200) {
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
      <StyledHtmlTable>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <ExcelDownloadComp
            isBuilder={false}
            fileName={`Air_${moment().format('YYYYMMDD')}`}
            className="testClassName"
            btnText="Excel Download"
            sheetName={`Air_${moment().format('YYYYMMDD')}`}
            listData={itemList}
            fields={createExcelData(excelColumn, 'FIELD', 'field')}
            columns={excelColumn.map(item => ({ ...item, ...excelStyle }))}
          />
          {!searchFlag && (
            <>
              <StyledButton className="btn-gray btn-sm ml5 mr5" onClick={() => this.handleAction('EXCEL_UPLOAD')}>
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
                  <StyledButton className="btn-light btn-sm" onClick={() => this.handleAction('RESET')}>
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
            <col width="8%" />
            <col width="35%" />
            <col width="8%" />
            <col width="8%" />
            <col width="8%" />
            <col width="10%" />
            <col width="10%" />
            <col width="5%" />
            <col width="5%" />
          </colgroup>
          <thead>
            <tr>
              <td></td>
              <td>
                <Popover content={itemData.EI_AREA} trigger="focus">
                  <AntdInput
                    className="ant-input-inline ant-input-xs input-left"
                    name="EI_AREA"
                    value={itemData.EI_AREA || ''}
                    onChange={this.handleInputOnChange}
                  />
                </Popover>
              </td>
              <td>
                <Popover content={itemData.PREVENTION_EQUIP} trigger="focus">
                  <AntdInput
                    className="ant-input-inline ant-input-xs input-left"
                    name="PREVENTION_EQUIP"
                    value={itemData.PREVENTION_EQUIP || ''}
                    onChange={this.handleInputOnChange}
                  />
                </Popover>
              </td>
              <td>
                <Popover content={itemData.INFLOW_AREA} trigger="focus">
                  <AntdInput
                    className="ant-input-inline ant-input-xs input-left"
                    name="INFLOW_AREA"
                    value={itemData.INFLOW_AREA || ''}
                    onChange={this.handleInputOnChange}
                  />
                </Popover>
              </td>
              <td>
                <Popover content={itemData.DISCHARGE_MATTER} trigger="focus">
                  <AntdInput
                    className="ant-input-inline ant-input-xs input-left"
                    name="DISCHARGE_MATTER"
                    value={itemData.DISCHARGE_MATTER || ''}
                    onChange={this.handleInputOnChange}
                  />
                </Popover>
              </td>
              <td>
                <Popover content={itemData.PPM_WARNING} trigger="focus">
                  <AntdInput
                    className="ant-input-inline ant-input-xs input-left"
                    name="PPM_WARNING"
                    value={itemData.PPM_WARNING || ''}
                    onChange={this.handleInputOnChange}
                  />
                </Popover>
              </td>
              <td>
                <Popover content={itemData.PPM_SHOTDOWN} trigger="focus">
                  <AntdInput
                    className="ant-input-inline ant-input-xs input-left"
                    name="PPM_SHOTDOWN"
                    value={itemData.PPM_SHOTDOWN || ''}
                    onChange={this.handleInputOnChange}
                  />
                </Popover>
              </td>
              <td>
                <Popover content={itemData.PPM_YEAR_AVERAGE} trigger="focus">
                  <AntdInput
                    className="ant-input-inline ant-input-xs input-left"
                    name="PPM_YEAR_AVERAGE"
                    value={itemData.PPM_YEAR_AVERAGE || ''}
                    onChange={this.handleInputOnChange}
                  />
                </Popover>
              </td>
              <td>
                <Popover content={itemData.W1} trigger="focus">
                  <AntdInput className="ant-input-inline ant-input-xs input-left" name="W1" value={itemData.W1 || ''} onChange={this.handleInputOnChange} />
                </Popover>
              </td>
              <td>
                <Popover content={itemData.LEGISLATION} trigger="focus">
                  <AntdInput
                    className="ant-input-inline ant-input-xs input-left"
                    name="LEGISLATION"
                    value={itemData.LEGISLATION || ''}
                    onChange={this.handleInputOnChange}
                  />
                </Popover>
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
                (Shot Down)
              </th>
              <th>W1</th>
              <th>법규</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td colSpan={10}>{itemList.length} 건</td>
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
          </tbody>
        </table>
      </StyledHtmlTable>
    );
  }
}
ItemTable.defaultProps = {};
export default ItemTable;
