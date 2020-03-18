/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Button, Checkbox, message, Popover, Modal } from 'antd';
import Upload from 'components/Upload';
import { debounce } from 'lodash';
import * as popoverContent from './PopoverContent';

const appIconUploadArea = {
  position: 'relative',
  display: 'inlineBlock',
  width: '180',
  height: '50PX',
  background: '#f3f3f3',
  borderStyle: 'dashed',
};

class ItemTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    this.debounceHandleInputChange = debounce(this.debounceHandleInputChange, 300);
    this.debounceHandleCheckboxChange = debounce(this.debounceHandleCheckboxChange, 300);
  }

  handleAction = type => {
    const { id, formData, submitHandlerBySaga } = this.props;
    const materialData = (formData && formData.materialData) || '';
    const itemList = (formData && formData.itemList) || [];
    switch (type) {
      case 'UPDATE':
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsEiImportantAssesment', { ...materialData, itemList }, this.updateComplete);
        break;
      case 'EXCEL_DOWNLOAD':
        message.warning('미구현');
        break;
      default:
        break;
    }
  };

  updateComplete = () => {
    message.success('저장되었습니다.');
  };

  handleInputOnchange = (e, SEQ) => {
    e.persist();
    this.debounceHandleInputChange(e, SEQ);
  };

  debounceHandleInputChange = (e, SEQ) => {
    const { id, formData, changeFormData } = this.props;
    const itemList = (formData && formData.itemList) || [];
    const { value, name } = e.target;

    changeFormData(
      id,
      'itemList',
      itemList.map(i => (Number(i.SEQ) === Number(SEQ) ? { ...i, [name]: value } : i)),
    );
  };

  handleCheckBoxOnChange = SEQ => {
    this.debounceHandleCheckboxChange(SEQ);
  };

  debounceHandleCheckboxChange = SEQ => {
    const { id, formData, changeFormData } = this.props;

    const itemList = (formData && formData.itemList) || [];
    changeFormData(
      id,
      'itemList',
      itemList.map(i => (Number(i.SEQ) === Number(SEQ) ? { ...i, PLAN_REVIEW: i.PLAN_REVIEW === 'Y' ? 'N' : 'Y' } : i)),
    );
  };

  handleModalVisible = () => {
    const { modalVisible } = this.state;

    this.setState({ modalVisible: !modalVisible });
  };

  onFileUploaded = (file, SEQ) => {
    const { changeFormData, formData, id } = this.props;
    // one file upload 최신 파일만 업로드 되게
    const itemList = (formData && formData.itemList) || [];

    changeFormData(
      id,
      'itemList',
      itemList.map(item => (Number(item.SEQ) === Number(SEQ) ? { ...item, FILESEQ: file.seq, DOWN: file.down, FILE_NAME: file.fileName } : item)),
    );
    console.debug('fillllle', file);
    console.debug('seq', SEQ);
    // this.handleChangeImage(tmpArr[0].seq);
  };

  handleDown = (e, fileSeq) => {
    // tempFile...
    e.stopPropagation();
    window.location.href = `/down/tempfile/${Number(fileSeq)}`;
  };

  render() {
    const { formData } = this.props;
    const searchFlag = (formData && formData.searchFlag) || false;
    const itemList = (formData && formData.itemList) || [];
    const btnOk = itemList.length >= 1;
    const { modalVisible } = this.state;
    console.debug('1111111111111');
    return (
      <div className="itemTable">
        <br />
        <table>
          <colgroup>
            <col width="4%" />
            <col width="9%" />
            <col width="8%" />
            <col width="8%" />
            <col width="8%" />
            <col width="8%" />
            <col width="8%" />
            <col width="8%" />
            <col width="8%" />
            <col width="8%" />
            <col width="8%" />
            <col width="4%" />
            <col width="11%" />
          </colgroup>
          <thead>
            <tr>
              <td colSpan={13}>
                <Button onClick={() => this.handleAction('UPDATE')}>저장</Button>
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>Seq</td>
              <td rowSpan={2}>
                환경영향
                <br />
                평가대상
              </td>
              <td rowSpan={2}>적용 공정</td>
              <td rowSpan={2}>적용 장비</td>
              <td colSpan={7}>중대환경영향평가</td>
              <td rowSpan={2}>
                개선계획
                <br />
                수립검토
              </td>
              <td rowSpan={2}>개선계획서</td>
            </tr>
            <tr>
              <td>
                <span className="popoverTitle" onClick={this.handleModalVisible}>
                  1.
                  <br />
                  법규검토
                </span>
              </td>
              <td>
                <span className="popoverTitle" onClick={this.handleModalVisible}>
                  2.
                  <br />
                  심각한
                  <br />
                  환경측면
                </span>
              </td>
              <td>
                <span className="popoverTitle" onClick={this.handleModalVisible}>
                  3.
                  <br />
                  기술검토
                </span>
              </td>
              <td>
                <span className="popoverTitle" onClick={this.handleModalVisible}>
                  4.
                  <br />
                  재정측면
                </span>
              </td>
              <td>
                <span className="popoverTitle" onClick={this.handleModalVisible}>
                  5.
                  <br />
                  운영측면
                </span>
              </td>
              <td>
                <span className="popoverTitle" onClick={this.handleModalVisible}>
                  6.
                  <br />
                  사업적측면
                </span>
              </td>
              <td>
                <span className="popoverTitle" onClick={this.handleModalVisible}>
                  7.
                  <br />
                  이해관계자
                </span>
              </td>
            </tr>
          </thead>
          <tbody>
            {itemList.map((item, index) => (
              <tr key={item.SEQ}>
                <td align="center">{index + 1}</td>
                <td>
                  <Input name="MATTER" defaultValue={item.MATTER} onChange={e => this.handleInputOnchange(e, item.SEQ)} />
                </td>
                <td>
                  <Input name="APPLY_PROCESS" defaultValue={item.APPLY_PROCESS} onChange={e => this.handleInputOnchange(e, item.SEQ)} />
                </td>
                <td>
                  <Input name="APPLY_EQUIPMENT" defaultValue={item.APPLY_EQUIPMENT} onChange={e => this.handleInputOnchange(e, item.SEQ)} />
                </td>
                <td>
                  <Input name="LAWS_REVIEW" defaultValue={item.LAWS_REVIEW} onChange={e => this.handleInputOnchange(e, item.SEQ)} />
                </td>
                <td>
                  <Input name="CRITICAL_ENVIRONMENT" defaultValue={item.CRITICAL_ENVIRONMENT} onChange={e => this.handleInputOnchange(e, item.SEQ)} />
                </td>
                <td>
                  <Input name="TECH_REVIEW" defaultValue={item.TECH_REVIEW} onChange={e => this.handleInputOnchange(e, item.SEQ)} />
                </td>
                <td>
                  <Input name="FINANCIAL_SIDE" defaultValue={item.FINANCIAL_SIDE} onChange={e => this.handleInputOnchange(e, item.SEQ)} />
                </td>
                <td>
                  <Input name="OPERATION_SIDE" defaultValue={item.OPERATION_SIDE} onChange={e => this.handleInputOnchange(e, item.SEQ)} />
                </td>
                <td>
                  <Input name="BUSINESS_SIDE" defaultValue={item.BUSINESS_SIDE} onChange={e => this.handleInputOnchange(e, item.SEQ)} />
                </td>
                <td>
                  <Input name="STAKEHOLDERS" defaultValue={item.STAKEHOLDERS} onChange={e => this.handleInputOnchange(e, item.SEQ)} />
                </td>
                <td align="center">
                  <Checkbox checked={item.PLAN_REVIEW === 'Y'} onChange={() => this.handleCheckBoxOnChange(item.SEQ)} />
                </td>
                <td align="center">
                  {item.PLAN_REVIEW === 'N' ? (
                    <Input name="IMPROVEMENT_PLAN" defaultValue={item.IMPROVEMENT_PLAN} onChange={e => this.handleInputOnchange(e, item.SEQ)} />
                  ) : (
                    <div style={appIconUploadArea}>
                      <Upload
                        onFileUploaded={obj => this.onFileUploaded(obj, item.SEQ)}
                        multiple={false} // default true
                        width={150}
                        height={32}
                        borderStyle="none"
                        serviceEnv="dev"
                        serviceKey="KEY"
                      >
                        <span>Upload</span>
                        <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
                          {item.FILESEQ && (
                            <a onClick={e => this.handleDown(e, item.FILESEQ)} download>
                              {item.FILE_NAME}
                            </a>
                            // <a onClick={e => this.handleDown(e, item.DOWN)} download>
                            //   {item.FILE_NAME}
                            // </a> tempFile -> real로 옮겨야함
                          )}
                        </div>
                      </Upload>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={13}>{itemList.length} 건</td>
            </tr>
            {/* <tr>
              <td colSpan={13}>
                <a className="attachDownCompIconBtn" href="/down/tempfile/247" download>
                  Download
                </a>
              </td>
            </tr> */}
          </tbody>
        </table>
        <Modal width={780} height={480} visible={modalVisible} footer={null}>
          <div align="center">
            <br />
            <img src={popoverContent.Em1} alt="EM" />
            <br />
            <br />
            <Button onClick={this.handleModalVisible}>닫기</Button>
          </div>
        </Modal>
      </div>
    );
  }
}
ItemTable.defaultProps = {};
export default ItemTable;
