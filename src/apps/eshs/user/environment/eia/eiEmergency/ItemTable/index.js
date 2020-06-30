/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Select, Checkbox, Popconfirm, InputNumber, Popover } from 'antd';
import Upload from 'components/Upload';

import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import * as popoverContent from './PopoverContent';

const AntdSelect = StyledSelect(Select);
const { Option } = Select;
const AntdInput = StyledInput(Input);
const AntdInputNumber = StyledInputNumber(InputNumber);

class ItemTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowSelections: [],
    };
  }

  handleAction = type => {
    const { id, formData, submitHandlerBySaga, tbName, profile } = this.props;
    const { rowSelections } = this.state;
    const itemData = (formData && formData.itemData) || {};
    const CHK_YEAR = (formData && formData.CHK_YEAR) || '';
    const DEPT_CD = (formData && formData.searchRow && formData.searchRow.DEPT_CD) || (formData && formData.myDept && formData.myDept.DEPT_CD) || '';
    const DEPT_ID = (formData && formData.searchRow && formData.searchRow.DEPT_ID) || (formData && formData.myDept && formData.myDept.DEPT_ID) || null;
    const msg = this.validationCheck(itemData);
    switch (type) {
      case 'SAVE':
        if (msg) {
          message.warning(msg);
          break;
        }

        return this.saveBeforeProcess({
          ...itemData,
          CHK_YEAR,
          DEPT_CD,
          DEPT_ID,
          WRITE_EMPNO: profile.EMP_NO,
          WRITE_USER_ID: profile.USER_ID,
        });
      case 'DELETE':
        if (!rowSelections.length) {
          message.warning('삭제 하실 항목을 한개라도 선택하세요.');
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

  onChangeFormData = (target, value) => {
    const { id, changeFormData, formData } = this.props;
    const itemData = (formData && formData.itemData) || {};
    changeFormData(id, 'itemData', { ...itemData, [target]: value });
  };

  validationCheck = itemData => {
    if (!itemData.AREA) return '영역을 입력해 주세요!';
    if (!itemData.STATUS) return '비상사태 현을 입력해 주세요!';
    if (!itemData.VALUATION_A) return '발생가능성평가를 입력해 주세요!';
    if (!itemData.VALUATION_B) return '피해정도 평가를 입력해 주세요!';
    if (!itemData.VALUATION_C) return '피해정도 평가를 입력해 주세요!';
    if (!itemData.VALUATION_D) return '피해정도 평가를 입력해 주세요!';
    if (!itemData.VALUATION_E) return '피해정도 평가를 입력해 주세요!';
    if (!itemData.VALUATION_F) return '피해정도 평가를 입력해 주세요!';
    if (!itemData.VALUATION_SUM) return '피해정도 평가를 입력해 주세요!';
    if (!itemData.VALUATION_RESULT) return '평가결과를 입력해 주세요!';
    return '';
  };

  handleDown = (e, fileSeq) => {
    e.stopPropagation();
    window.location.href = `/down/file/${Number(fileSeq)}`;
  };

  saveBeforeProcess = submitData => {
    const { id, formData, submitHandlerBySaga } = this.props;
    const file = (formData && formData.itemData && formData.itemData.file) || {};
    if (JSON.stringify(file) === '{}')
      return submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsEiEmergency', { PARAM: submitData }, (id2, res2) => {
        if (res2 && res2.code === 200) {
          this.handleFormReset();
          this.showMessage('저장되었습니다.');
        } else {
          this.showMessage('저장에 실패하였습니다.');
        }
      });

    return submitHandlerBySaga(id, 'POST', '/upload/moveFileToReal', { PARAM: { DETAIL: [file] } }, (afterId, res) => {
      if (res && res.message === 'success') {
        return submitHandlerBySaga(
          id,
          'POST',
          '/api/eshs/v1/common/eshsEiEmergency',
          { PARAM: { ...submitData, VALUATION_FILE: res.DETAIL[0].seq } },
          (id2, res2) => {
            if (res2 && res2.code === 200) {
              this.handleFormReset();
              this.showMessage('저장되었습니다.');
            } else {
              this.showMessage('저장에 실패하였습니다.');
            }
          },
        );
      }
      return this.showMessage('파일저장에 실패하였습니다.');
    });
  };

  showMessage = text => message.info(<MessageContent>{text}</MessageContent>);

  calculator = value => {
    const { formData, setFormData, id } = this.props;

    const itemData = formData.itemData || {};
    const vA = itemData.VALUATION_A || 0;
    const vB = itemData.VALUATION_B || 0;
    const vC = itemData.VALUATION_C || 0;
    const vD = itemData.VALUATION_D || 0;
    const vE = value || 0;

    const vF = vB + vC + vD + vE;
    setFormData(id, {
      ...formData,
      itemData: {
        ...itemData,
        VALUATION_E: value,
        VALUATION_F: vF,
        VALUATION_SUM: vA * vF,
      },
    });
  };

  render() {
    const { formData, profile } = this.props;
    const { rowSelections } = this.state;
    const searchFlag = (formData && formData.searchFlag) || false;
    const itemList = (formData && formData.itemList) || [];
    const itemData = (formData && formData.itemData) || {};
    const btnOk = itemList.length >= 1;
    return (
      <StyledHtmlTable>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          {!searchFlag && (
            <>
              <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleAction('SAVE')}>
                추가
              </StyledButton>
              {btnOk && (
                <>
                  <Popconfirm
                    title="선택하신 내용을(를) 정말로 삭제하시겠습니끼?"
                    onConfirm={() => this.handleAction('DELETE')}
                    okText="확인"
                    cancelText="취소"
                  >
                    <StyledButton className="btn-primary btn-sm btn-first">삭제</StyledButton>
                  </Popconfirm>
                </>
              )}
            </>
          )}
        </StyledButtonWrapper>

        <table className="table-border">
          <colgroup>
            <col width="5%" />
            <col width="9%" />
            <col width="9%" />
            <col width="7%" />
            <col width="5%" />
            <col width="5%" />
            <col width="5%" />
            <col width="5%" />
            <col width="5%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <thead>
            <tr>
              <th> </th>
              <th>
                <AntdInput
                  className="ant-input-inline ant-input-sm input-left"
                  name="AREA"
                  value={itemData.AREA}
                  onChange={e => this.onChangeFormData('AREA', e.target.value)}
                />
              </th>
              <th>
                <AntdInput
                  className="ant-input-inline ant-input-sm input-left"
                  name="STATUS"
                  value={itemData.STATUS}
                  onChange={e => this.onChangeFormData('STATUS', e.target.value)}
                />
              </th>
              <th>
                <AntdInputNumber
                  className="ant-input-number-sm"
                  name="VALUATION_A"
                  value={itemData.VALUATION_A}
                  onChange={value => this.onChangeFormData('VALUATION_A', value)}
                  style={{ width: '100%' }}
                />
              </th>
              <th>
                <AntdInputNumber
                  className="ant-input-number-sm"
                  name="VALUATION_B"
                  value={itemData.VALUATION_B}
                  onChange={value => this.onChangeFormData('VALUATION_B', value)}
                  style={{ width: '100%' }}
                />
              </th>
              <th>
                <AntdInputNumber
                  className="ant-input-number-sm"
                  name="VALUATION_C"
                  value={itemData.VALUATION_C}
                  onChange={value => this.onChangeFormData('VALUATION_C', value)}
                  style={{ width: '100%' }}
                />
              </th>
              <th>
                <AntdInputNumber
                  className="ant-input-number-sm"
                  name="VALUATION_D"
                  value={itemData.VALUATION_D}
                  onChange={value => this.onChangeFormData('VALUATION_D', value)}
                  style={{ width: '100%' }}
                />
              </th>
              <th>
                <AntdInputNumber
                  className="ant-input-number-sm"
                  name="VALUATION_E"
                  value={itemData.VALUATION_E}
                  onChange={value => this.calculator(value)}
                  style={{ width: '100%' }}
                />
              </th>
              <th>
                <AntdInput
                  className="ant-input-inline ant-input-sm input-left"
                  name="VALUATION_F"
                  value={itemData.VALUATION_F}
                  onChange={e => this.onChangeFormData('VALUATION_F', e.target.value)}
                />
              </th>
              <th>
                <AntdInput
                  className="ant-input-inline ant-input-sm input-left"
                  name="VALUATION_SUM"
                  value={itemData.VALUATION_SUM}
                  readOnly
                  onChange={e => this.onChangeFormData('VALUATION_SUM', e.target.value)}
                />
              </th>
              <th>
                <AntdSelect
                  className="select-sm"
                  value={itemData.VALUATION_RESULT}
                  style={{ width: '100%' }}
                  onChange={value => this.onChangeFormData('VALUATION_RESULT', value)}
                >
                  <Option value="일상 관리">일상 관리</Option>
                  <Option value="부서자체 관리">부서자체 관리</Option>
                  <Option value="사업장 관리">사업장 관리</Option>
                  <Option value="전사 관리">전사 관리</Option>
                </AntdSelect>
              </th>
              <th>
                <Upload
                  onFileUploaded={obj => this.onChangeFormData('file', obj)}
                  multiple={false} // default true
                  width={150}
                  height={32}
                  borderStyle="none"
                  serviceEnv="dev"
                  serviceKey="KEY"
                >
                  <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
                    <p>Upload</p>
                    {itemData.file && itemData.file.fileName}
                  </div>
                </Upload>
              </th>
            </tr>
            <tr>
              <th rowSpan={2}> </th>
              <th rowSpan={2}>영역</th>
              <th rowSpan={2}>비상사태 현</th>
              <th rowSpan={2}>
                <Popover content={<img src={popoverContent.Eme1} alt="발생 가능성 평가" />} trigger="hover" title={null}>
                  발생 가능성
                  <br />
                  평가(A)
                </Popover>
              </th>
              <th colSpan={6}>피해정도 평가</th>
              <th rowSpan={2} className="th-pointer">
                <Popover content={<img src={popoverContent.Eme6} alt="평가결과" />} trigger="hover" title={null}>
                  평가결과
                  <br />
                  (관리범위/주체)
                </Popover>
              </th>
              <th rowSpan={2} className="th-pointer">
                비상사태
                <br />
                (조치계획서)
              </th>
            </tr>
            <tr>
              <th className="th-pointer">
                <Popover content={<img src={popoverContent.Eme2} alt="(B)" />} trigger="hover" title={null}>
                  B
                </Popover>
              </th>
              <th className="th-pointer">
                <Popover content={<img src={popoverContent.Eme3} alt="(C)" />} trigger="hover" title={null}>
                  C
                </Popover>
              </th>
              <th className="th-pointer">
                <Popover content={<img src={popoverContent.Eme4} alt="(D)" />} trigger="hover" title={null}>
                  D
                </Popover>
              </th>
              <th className="th-pointer">
                <Popover content={<img src={popoverContent.Eme5} alt="(E)" />} trigger="hover" title={null}>
                  E
                </Popover>
              </th>
              <th>
                계<br />
                (F)
              </th>
              <th>
                총점
                <br />
                =(A*F)
              </th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td colSpan={12}>{itemList.length} 건</td>
            </tr>
          </tfoot>
          <tbody>
            {itemList.map(i => (
              <tr className="tr-center">
                <td>
                  <Checkbox
                    className="ant-checkbox-wrapper"
                    checked={rowSelections.indexOf(i.REQ_NO) > -1}
                    onChange={() => this.handleRowSelection(i.REQ_NO)}
                  />
                </td>
                <td>{i.AREA}</td>
                <td>{i.STATUS}</td>
                <td>{i.VALUATION_A}</td>
                <td>{i.VALUATION_B}</td>
                <td>{i.VALUATION_C}</td>
                <td>{i.VALUATION_D}</td>
                <td>{i.VALUATION_E}</td>
                <td>{i.VALUATION_F}</td>
                <td>{i.VALUATION_SUM}</td>
                <td>{i.VALUATION_RESULT}</td>
                <td>{i.FILE_NAME && <a onClick={e => this.handleDown(e, i.FILE_SEQ)}>파일 다운</a>}</td>
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
