import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ProtectionItemList from 'apps/eshs/user/safety/protectionItem/protectionItemList';

import { Select, Input, DatePicker, InputNumber, Modal } from 'antd';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledPicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

const AntdModal = StyledContentsModal(Modal);
const AntdSelect = StyledSelect(Select);
const AntdPicker = StyledPicker(DatePicker);
const AntdInput = StyledInput(Input);
const AntdInputNumber = StyledInputNumber(InputNumber);
class ModalContents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      requestValue: props.rowData,
    };
  }

  componentDidMount() {
    this.createFormData();
  }

  createFormData = () => {
    const { sagaKey, changeFormData, profile } = this.props;
    changeFormData(sagaKey, 'CREATE_EMP_NO', profile.EMP_NO);
  };

  handleSubModalVisible = () => {
    this.setState({ modalVisible: true });
  };

  handleSubModalClose = () => {
    this.setState({ modalVisible: false });
  };

  handleRowClick = rowData => {
    const { handleSubModalClose } = this;
    const { sagaKey: id, changeFormData } = this.props;
    const keyList = Object.keys(rowData);
    const valueList = Object.values(rowData);
    keyList.map((key, index) => changeFormData(id, key, valueList[index]));
    handleSubModalClose();
  };

  setRequestValue = valueObj => {
    this.setState(prevState => ({
      requestValue: Object.assign(prevState.requestValue, valueObj),
    }));
  };

  handleInputChange = (key, value) => {
    const { sagaKey: id, changeFormData } = this.props;
    const valueObj = { [key]: value };
    changeFormData(id, key, value);
    this.setRequestValue(valueObj);
  };

  handleDateChange = date => {
    const { sagaKey: id, changeFormData } = this.props;
    const valueObj = { POSTING_DT: date };
    changeFormData(id, 'POSTING_DT', date);
    this.setRequestValue(valueObj);
  };

  saveAfterFunc = () => {
    const { getDataSource, handleModalClose } = this.props;
    getDataSource();
    handleModalClose();
  };

  handleModifyClick = () => {
    const { saveAfterFunc } = this;
    const { requestValue } = this.state;
    const { sagaKey: id, submitExtraHandler, rowData } = this.props;
    submitExtraHandler(id, 'PUT', `/api/eshs/v1/common/protectionerm`, Object.assign(rowData, requestValue), saveAfterFunc);
  };

  handleDeleteClick = () => {
    const { saveAfterFunc } = this;
    const { sagaKey: id, submitExtraHandler, rowData } = this.props;
    submitExtraHandler(id, 'PUT', `/api/eshs/v1/common/protectionerm`, rowData, saveAfterFunc);
  };

  render() {
    const {
      handleRowClick,
      handleInputChange,
      handleDateChange,
      handleSubModalVisible,
      handleSubModalClose,
      saveAfterFunc,
      handleModifyClick,
      handleDeleteClick,
    } = this;
    const { modalVisible } = this.state;
    const { handleModalClose, saveTask, sagaKey: id, rowData, isModified, formData } = this.props;
    return (
      <>
        <StyledContentsWrapper>
          <StyledHtmlTable>
            <table>
              <colgroup>
                <col width="10%" />
                <col width="20%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>지역</th>
                  <td>
                    <AntdSelect
                      className="select-sm"
                      // defaultValue={rowData.SITE || requestValue.SITE || '317'}
                      defaultValue={isModified ? rowData.SITE : '317'}
                      onChange={value => handleInputChange('SITE', value)}
                      style={{ width: '100%' }}
                    >
                      <Select.Option value="317">청주</Select.Option>
                      <Select.Option value="318">구미</Select.Option>
                    </AntdSelect>
                  </td>
                </tr>
                <tr>
                  <th>품목</th>
                  <td>
                    <AntdInput
                      className="ant-input-sm"
                      defaultValue={isModified ? rowData.KIND : ''}
                      value={isModified ? rowData.KIND : formData.KIND}
                      onClick={isModified ? null : handleSubModalVisible}
                    />
                  </td>
                </tr>
                <tr>
                  <th>모델</th>
                  <td>
                    <AntdInput className="ant-input-sm" defaultValue={isModified ? rowData.MODEL : ''} value={isModified ? rowData.MODEL : formData.MODEL} />
                  </td>
                </tr>
                <tr>
                  <th>사이즈</th>
                  <td>
                    <AntdInput className="ant-input-sm" defaultValue={isModified ? rowData.SIZE1 : ''} value={isModified ? rowData.SIZE1 : formData.SIZE1} />
                  </td>
                </tr>
                <tr>
                  <th>검정번호</th>
                  <td>
                    <AntdInput className="ant-input-sm" defaultValue={isModified ? rowData.APP_NO : ''} value={isModified ? rowData.APP_NO : formData.APP_NO} />
                  </td>
                </tr>
                <tr>
                  <th>Vendor</th>
                  <td>
                    <AntdInput
                      className="ant-input-sm"
                      defaultValue={isModified ? rowData.VENDOR_NM : ''}
                      value={isModified ? rowData.VENDOR_NM : formData.VENDOR_NM}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Maker</th>
                  <td>
                    <AntdInput
                      className="ant-input-sm"
                      defaultValue={isModified ? rowData.MAKER_NM : ''}
                      value={isModified ? rowData.MAKER_NM : formData.MAKER_NM}
                    />
                  </td>
                </tr>
                <tr>
                  <th>단위</th>
                  <td>
                    <AntdInput className="ant-input-sm" defaultValue={isModified ? rowData.UNIT : ''} value={isModified ? rowData.UNIT : formData.UNIT} />
                  </td>
                </tr>
                <tr>
                  <th>입고일</th>
                  <td>
                    <AntdPicker
                      className="ant-picker-sm"
                      defaultValue={isModified ? moment(rowData.POSTING_DT) : moment()}
                      onChange={(date, dateString) => handleDateChange(dateString)}
                      style={{ width: '100%' }}
                    />
                  </td>
                </tr>
                <tr>
                  <th>단가</th>
                  <td>
                    <AntdInputNumber
                      className="input-number-sm"
                      defaultValue={isModified ? rowData.UNITPRICE : ''}
                      onChange={value => handleInputChange('UNITPRICE', value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>수량</th>
                  <td>
                    <AntdInputNumber
                      className="input-number-sm"
                      defaultValue={isModified ? rowData.QTY : ''}
                      onChange={value => handleInputChange('QTY', value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <StyledButton className="btn-primary mr5" onClick={isModified ? handleModifyClick : () => saveTask(id, id, saveAfterFunc)}>
              {isModified ? '수정' : '저장'}
            </StyledButton>
            {isModified ? (
              <StyledButton className="btn-light mr5" onClick={handleDeleteClick}>
                삭제
              </StyledButton>
            ) : null}
            <StyledButton className="btn-light" onClick={handleModalClose}>
              취소
            </StyledButton>
          </div>
        </StyledContentsWrapper>
        <AntdModal visible={modalVisible} title="보호구 목록" onCancel={handleSubModalClose} footer={null} width="80%">
          <ProtectionItemList handleRowClick={handleRowClick} />
        </AntdModal>
      </>
    );
  }
}

ModalContents.propTypes = {
  handleModalClose: PropTypes.func,
  sagaKey: PropTypes.string,
  changeFormData: PropTypes.func,
  saveTask: PropTypes.func,
  getDataSource: PropTypes.func,
  rowData: PropTypes.object,
  isModified: PropTypes.bool,
  submitExtraHandler: PropTypes.func,
  formData: PropTypes.object,
  profile: PropTypes.object,
};

ModalContents.defatulProps = {
  handleModalClose: null,
  saveTask: null,
  getDataSource: null,
  isModified: false,
};

export default ModalContents;
