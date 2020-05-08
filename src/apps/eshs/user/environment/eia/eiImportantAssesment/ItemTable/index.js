import React, { Component } from 'react';
import { Input, Checkbox, message, Popover, Modal } from 'antd';
import Upload from 'components/Upload';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';

import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledInput from 'commonStyled/Form/StyledInput';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';

import * as popoverContent from './PopoverContent';
const AntdInput = StyledInput(Input);
const AntdModal = StyledContentsModal(Modal);

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
    const { saveBeforeProcess } = this.props;
    switch (type) {
      case 'UPDATE':
        saveBeforeProcess();
        break;
      case 'EXCEL_DOWNLOAD':
        message.warning('미구현');
        break;
      default:
        break;
    }
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

  handlePopoverContet = text => <div>{text}</div>;

  handleDown = (e, fileSeq, type) => {
    e.stopPropagation();
    if (type > 0) {
      window.location.href = `/down/file/${Number(fileSeq)}`;
    } else {
      window.location.href = `/down/tempfile/${Number(fileSeq)}`;
    }
  };

  render() {
    const { formData, onFileUploaded } = this.props;
    const searchFlag = (formData && formData.searchFlag) || false;
    const itemList = (formData && formData.itemList) || [];
    const btnOk = itemList.length >= 1;
    const { modalVisible } = this.state;
    return (
      <ContentsWrapper>
        <StyledHtmlTable className="tableWrapper">
          {itemList.length > 0 && (
            <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
              <span className="btn-comment">저장 버튼은 상신되지 않고 DATABASE에 저장만 됩니다.</span>
              &nbsp;
              <StyledButton className="btn-primary btn-sm" onClick={() => this.handleAction('UPDATE')}>
                저장
              </StyledButton>
            </StyledButtonWrapper>
          )}
          <table className="table-border">
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
                <th rowSpan={2}>Seq</th>
                <th rowSpan={2}>
                  환경영향
                  <br />
                  평가대상
                </th>
                <th rowSpan={2}>적용 공정</th>
                <th rowSpan={2}>적용 장비</th>
                <th colSpan={7}>중대환경영향평가</th>
                <th rowSpan={2}>
                  개선계획
                  <br />
                  수립검토
                </th>
                <th rowSpan={2}>개선계획서</th>
              </tr>
              <tr>
                <th className="th-pointer" onClick={this.handleModalVisible}>
                  <span>
                    1.
                    <br />
                    법규검토
                  </span>
                </th>
                <th className="th-pointer" onClick={this.handleModalVisible}>
                  <span>
                    2.
                    <br />
                    심각한
                    <br />
                    환경측면
                  </span>
                </th>
                <th className="th-pointer" onClick={this.handleModalVisible}>
                  <span>
                    3.
                    <br />
                    기술검토
                  </span>
                </th>
                <th className="th-pointer" onClick={this.handleModalVisible}>
                  <span>
                    4.
                    <br />
                    재정측면
                  </span>
                </th>
                <th className="th-pointer" onClick={this.handleModalVisible}>
                  <span>
                    5.
                    <br />
                    운영측면
                  </span>
                </th>
                <th className="th-pointer" onClick={this.handleModalVisible}>
                  <span>
                    6.
                    <br />
                    사업적측면
                  </span>
                </th>
                <th className="th-pointer" onClick={this.handleModalVisible}>
                  <span>
                    7.
                    <br />
                    이해관계자
                  </span>
                </th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td colSpan={13}>{itemList.length} 건</td>
              </tr>
            </tfoot>
            <tbody>
              {itemList.map((item, index) => (
                <tr key={item.SEQ} className="tr-center">
                  <td>{index + 1}</td>
                  <td>
                    <span>{item.MATTER}</span>
                  </td>
                  <td className="td-pointer">
                    <Popover content={<span>{item.APPLY_PROCESS}</span>} title={null}>
                      <AntdInput
                        className="ant-input-inline ant-input-sm input-left"
                        name="APPLY_PROCESS"
                        defaultValue={item.APPLY_PROCESS}
                        onChange={e => this.handleInputOnchange(e, item.SEQ)}
                      />
                    </Popover>
                  </td>
                  <td className="td-pointer">
                    <Popover content={<span>{item.APPLY_EQUIPMENT}</span>} title={null}>
                      <AntdInput
                        className="ant-input-inline ant-input-sm input-left"
                        name="APPLY_EQUIPMENT"
                        defaultValue={item.APPLY_EQUIPMENT}
                        onChange={e => this.handleInputOnchange(e, item.SEQ)}
                      />
                    </Popover>
                  </td>
                  <td className="td-pointer">
                    <Popover content={<span>{item.LAWS_REVIEW}</span>} title={null}>
                      <AntdInput
                        className="ant-input-inline ant-input-sm input-left"
                        name="LAWS_REVIEW"
                        defaultValue={item.LAWS_REVIEW}
                        onChange={e => this.handleInputOnchange(e, item.SEQ)}
                      />
                    </Popover>
                  </td>
                  <td className="td-pointer">
                    <Popover content={<span>{item.CRITICAL_ENVIRONMENT}</span>} title={null}>
                      <AntdInput
                        className="ant-input-inline ant-input-sm input-left"
                        name="CRITICAL_ENVIRONMENT"
                        defaultValue={item.CRITICAL_ENVIRONMENT}
                        onChange={e => this.handleInputOnchange(e, item.SEQ)}
                      />
                    </Popover>
                  </td>
                  <td className="td-pointer">
                    <Popover content={<span>{item.TECH_REVIEW}</span>} title={null}>
                      <AntdInput
                        className="ant-input-inline ant-input-sm input-left"
                        name="TECH_REVIEW"
                        defaultValue={item.TECH_REVIEW}
                        onChange={e => this.handleInputOnchange(e, item.SEQ)}
                      />
                    </Popover>
                  </td>
                  <td className="td-pointer">
                    <Popover content={<span>{item.FINANCIAL_SIDE}</span>} title={null}>
                      <AntdInput
                        className="ant-input-inline ant-input-sm input-left"
                        name="FINANCIAL_SIDE"
                        defaultValue={item.FINANCIAL_SIDE}
                        onChange={e => this.handleInputOnchange(e, item.SEQ)}
                      />
                    </Popover>
                  </td>
                  <td className="td-pointer">
                    <Popover content={<span>{item.OPERATION_SIDE}</span>} title={null}>
                      <AntdInput
                        className="ant-input-inline ant-input-sm input-left"
                        name="OPERATION_SIDE"
                        defaultValue={item.OPERATION_SIDE}
                        onChange={e => this.handleInputOnchange(e, item.SEQ)}
                      />
                    </Popover>
                  </td>
                  <td className="td-pointer">
                    <Popover content={<span>{item.BUSINESS_SIDE}</span>} title={null}>
                      <AntdInput
                        className="ant-input-inline ant-input-sm input-left"
                        name="BUSINESS_SIDE"
                        defaultValue={item.BUSINESS_SIDE}
                        onChange={e => this.handleInputOnchange(e, item.SEQ)}
                      />
                    </Popover>
                  </td>
                  <td className="td-pointer">
                    <Popover content={<span>{item.STAKEHOLDERS}</span>} title={null}>
                      <AntdInput
                        className="ant-input-inline ant-input-sm input-left"
                        name="STAKEHOLDERS"
                        defaultValue={item.STAKEHOLDERS}
                        onChange={e => this.handleInputOnchange(e, item.SEQ)}
                      />
                    </Popover>
                  </td>
                  <td>
                    <Checkbox className="ant-checkbox-wrapper" checked={item.PLAN_REVIEW === 'Y'} onChange={() => this.handleCheckBoxOnChange(item.SEQ)} />
                  </td>
                  <td className={item.PLAN_REVIEW === 'Y' && 'td-pointer'}>
                    {item.PLAN_REVIEW === 'N' ? (
                      <>
                        <span>{item.IMPROVEMENT_PLAN}</span>
                        <AntdInput
                          className="ant-input-inline ant-input-sm input-left"
                          name="IMPROVEMENT_PLAN"
                          defaultValue={item.IMPROVEMENT_PLAN}
                          onChange={e => this.handleInputOnchange(e, item.SEQ)}
                        />
                      </>
                    ) : (
                      <div style={appIconUploadArea}>
                        <Upload
                          onFileUploaded={obj => onFileUploaded(obj, item.SEQ)}
                          multiple={false} // default true
                          width={150}
                          height={32}
                          borderStyle="none"
                          serviceEnv="dev"
                          serviceKey="KEY"
                        >
                          <span>Upload</span>
                          <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
                            {item.FILE_SEQ && (
                              <a onClick={e => this.handleDown(e, item.FILE_SEQ, item.FILE_TYPE)} download>
                                {item.FILE_NAME}
                              </a>
                            )}
                          </div>
                        </Upload>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <AntdModal className="modal-table-pad" width={780} height={480} closable={false} visible={modalVisible} footer={null}>
            <div>
              <img src={popoverContent.Em1} alt="EM" />
              <br />
              <br />
              <StyledButtonWrapper className="btn-wrap-center">
                <StyledButton className="btn-primary btn-sm" onClick={this.handleModalVisible}>
                  닫기
                </StyledButton>
              </StyledButtonWrapper>
            </div>
          </AntdModal>
        </StyledHtmlTable>
      </ContentsWrapper>
    );
  }
}

ItemTable.propTypes = {
  saveBeforeProcess: PropTypes.func,
  onFileUploaded: PropTypes.func,
};
ItemTable.defaultProps = {};
export default ItemTable;
