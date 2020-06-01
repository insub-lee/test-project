import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ProtectionItemList from 'apps/eshs/user/safety/protectionItem/protectionItemList';

import { Select, Input, DatePicker, InputNumber, Modal } from 'antd';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledPicker from 'commonStyled/Form/StyledPicker';
import StyledInputNumber from 'commonStyled/Form/StyledInputNumber';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';
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
      requestValue: {},
    };
  }

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

    this.setState({ requestValue: rowData }, handleSubModalClose);
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
    const valueObj = { ENTRY_DATE: date };
    changeFormData(id, 'ENTRY_DATE', date);
    this.setRequestValue(valueObj);
  };

  saveAfterFunc = () => {
    const { getDataSource, handleModalClose } = this.props;
    getDataSource();
    handleModalClose();
  };

  render() {
    const { handleRowClick, handleInputChange, handleDateChange, handleSubModalVisible, handleSubModalClose, saveAfterFunc } = this;
    const { modalVisible, requestValue } = this.state;
    const { handleModalClose, saveTask, sagaKey: id, rowData, isModified } = this.props;
    return (
      <>
        <div className="tableWrapper">
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
                      defaultValue={isModified ? rowData.SITE : requestValue.SITE || ''}
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
                    <AntdInput className="ant-input-sm" defaultValue={isModified ? rowData.KIND : ''} onClick={handleSubModalVisible} />
                  </td>
                </tr>
                <tr>
                  <th>모델</th>
                  <td>
                    <AntdInput className="ant-input-sm" defaultValue={isModified ? rowData.MODEL : ''} />
                  </td>
                </tr>
                <tr>
                  <th>사이즈</th>
                  <td>
                    <AntdInput className="ant-input-sm" defaultValue={isModified ? rowData.SIZE1 : ''} />
                  </td>
                </tr>
                <tr>
                  <th>검정번호</th>
                  <td>
                    <AntdInput className="ant-input-sm" defaultValue={isModified ? rowData.APP_NO : ''} />
                  </td>
                </tr>
                <tr>
                  <th>Vendor</th>
                  <td>
                    <AntdInput className="ant-input-sm" defaultValue={isModified ? rowData.VENDOR_NM : ''} />
                  </td>
                </tr>
                <tr>
                  <th>Maker</th>
                  <td>
                    <AntdInput className="ant-input-sm" defaultValue={isModified ? rowData.MAKER_NM : ''} />
                  </td>
                </tr>
                <tr>
                  <th>단위</th>
                  <td>
                    <AntdInput className="ant-input-sm" defaultValue={isModified ? rowData.UNIT : ''} />
                  </td>
                </tr>
                <tr>
                  <th>입고일</th>
                  <td>
                    <AntdPicker className="ant-picker-sm" defaultValue={isModified ? rowData.ENTRY_DATE : moment()} onChange={date => handleDateChange(date)} />
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
            <StyledButton className="btn-primary mr5" onClick={() => saveTask(id, id, saveAfterFunc)}>
              저장
            </StyledButton>
            <StyledButton className="btn-light" onClick={handleModalClose}>
              취소
            </StyledButton>
          </div>
        </div>
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
};

ModalContents.defatulProps = {
  handleModalClose: null,
  saveTask: null,
  getDataSource: null,
  isModified: false,
};

export default ModalContents;
