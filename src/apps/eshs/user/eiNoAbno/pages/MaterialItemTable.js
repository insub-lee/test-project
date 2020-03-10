/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Select, Button, InputNumber, Checkbox, Popconfirm, message } from 'antd';

const { Option } = Select;
class MaterialItemTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowSelections: [],
    };
  }

  componentDidMount = () => {
    const { id, changeFormData } = this.props;
    changeFormData(id, 'STATUS', '정상');
  };

  handleInputOnChange = e => {
    const { id, changeFormData } = this.props;
    changeFormData(id, `${e.target.name}`, e.target.value);
  };

  handleVolumeOnChange = e => {
    const { id, changeFormData } = this.props;
    changeFormData(id, 'VOLUME', e);
  };

  handleStatusOnChange = e => {
    const { id, changeFormData } = this.props;
    changeFormData(id, 'STATUS', e);
  };

  handleFormReset = sagaKey => {
    const { id, setFormData, formData, handleItemListReload } = this.props;
    const { REQ_NO, FROM_BUILDING_NM, TO_BUILDING_NM, CHK_YEAR } = formData;
    setFormData(id, { REQ_NO, FROM_BUILDING_NM, TO_BUILDING_NM, CHK_YEAR, STATUS: '정상' });
    handleItemListReload();
  };

  handleAction = type => {
    const { id, changeFormData, formData, submitHandlerBySaga, getCallDataHandler } = this.props;
    switch (type) {
      case 'SAVE':
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsEiNoAbnoItem', formData, this.handleFormReset);
        break;
      case 'UPDATE':
        if (!formData.SEQ) {
          message.warning('수정 하실 항목을 선택하세요.');
          break;
        }
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsEiNoAbnoItem', formData, this.handleFormReset);
        break;
      case 'DELETE':
        const { rowSelections } = this.state;
        if (!rowSelections.length) {
          message.warning('삭제 하실 항목을 한개라도 선택하세요.');
          break;
        }
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsEiNoAbnoItem', { REQ_NO: formData.REQ_NO, rowSelections }, this.handleFormReset);
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

  handleRowClick = data => {
    const { id, setFormData, formData } = this.props;
    setFormData(id, { ...formData, ...data });
  };

  handleRowSelection = seq => {
    const { rowSelections } = this.state;
    if (rowSelections.indexOf(seq) >= 0) {
      this.setState({ rowSelections: rowSelections.filter(r => r !== seq && r) });
    } else {
      rowSelections.push(seq);
      this.setState({ rowSelections });
    }
  };

  render() {
    const { searchFlag, formData, eiMaterialItemList } = this.props;
    const { rowSelections } = this.state;
    const btnOk = eiMaterialItemList.length >= 1;
    return (
      <div className="MaterialItemTable">
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
                    {btnOk ? (
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
                    ) : (
                      ''
                    )}
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>
                <Input name="GUBUN" value={formData.GUBUN || ''} onChange={this.handleInputOnChange} />
              </td>
              <td>
                <Select value={formData.STATUS || '정상'} style={{ width: '100%' }} onChange={this.handleStatusOnChange}>
                  <Option value="정상">정상</Option>
                  <Option value="비정상">비정상</Option>
                </Select>
              </td>
              <td>
                <Input name="MATTER" value={formData.MATTER || ''} onChange={this.handleInputOnChange} />
              </td>
              <td>
                <Input name="INGREDIENT" value={formData.INGREDIENT || ''} onChange={this.handleInputOnChange} />
              </td>
              <td>
                <InputNumber name="VOLUME" value={formData.VOLUME || ''} style={{ width: '100%' }} onChange={this.handleVolumeOnChange} />
              </td>
              <td>
                <Input name="UNIT" value={formData.UNIT || ''} onChange={this.handleInputOnChange} />
              </td>
              <td>
                <Input name="INPUT_TYPE" value={formData.INPUT_TYPE || ''} onChange={this.handleInputOnChange} />
              </td>
              <td>
                <Input name="OUTPUT_TYPE" value={formData.OUTPUT_TYPE || ''} onChange={this.handleInputOnChange} />
              </td>
              <td>
                <Input name="DISCHRGE" value={formData.DISCHRGE || ''} onChange={this.handleInputOnChange} />
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
            {eiMaterialItemList.map(m => (
              <tr key={m.SEQ} onClick={() => this.handleRowClick(m)}>
                <td className="text-align-center">
                  <Checkbox onChange={() => this.handleRowSelection(m.SEQ)} />
                </td>
                <td className="text-align-center">{m.SEQ}</td>
                <td className="text-align-center">{m.GUBUN}</td>
                <td className="text-align-center">{m.STATUS}</td>
                <td>{m.MATTER}</td>
                <td>{m.INGREDIENT}</td>
                <td>{m.VOLUME}</td>
                <td>{m.UNIT}</td>
                <td>{m.INPUT_TYPE}</td>
                <td>{m.OUTPUT_TYPE}</td>
                <td>{m.DISCHRGE}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={11}>{eiMaterialItemList.length} 건</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
MaterialItemTable.defaultProps = {
  deptList: [],
};
export default MaterialItemTable;
