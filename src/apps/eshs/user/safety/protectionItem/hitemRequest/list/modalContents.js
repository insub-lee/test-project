import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ProtectionItemList from 'apps/eshs/user/safety/protectionItem/protectionItemList';

import { Select, Input, DatePicker, InputNumber, Modal, Table } from 'antd';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledPicker from 'commonStyled/Form/StyledPicker';
import StyledInputNumber from 'commonStyled/Form/StyledInputNumber';
// import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

const AntdModal = StyledContentsModal(Modal);
const AntdSelect = StyledSelect(Select);
const AntdPicker = StyledPicker(DatePicker);
const AntdInput = StyledInput(Input);
const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdTable = StyledLineTable(Table);
class ModalContents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
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
    handleSubModalClose();
  };

  // setRequestValue = valueObj => {
  //   this.setState(prevState => ({
  //     requestValue: Object.assign(prevState.requestValue, valueObj),
  //   }));
  // };

  handleInputChange = (key, value) => {
    const { sagaKey: id, changeFormData } = this.props;
    // const valueObj = { [key]: value };
    changeFormData(id, key, value);
    // this.setRequestValue(valueObj);
  };

  handleDateChange = date => {
    const { sagaKey: id, changeFormData } = this.props;
    // const valueObj = { POSTING_DT: date };
    changeFormData(id, 'POSTING_DT', date);
    // this.setRequestValue(valueObj);
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

  columns = [
    {
      title: '품명',
      align: 'center',
      render: () => <AntdInput className="ant-input-sm" />,
    },
    {
      title: '모델',
      align: 'center',
      render: () => <AntdInput className="ant-input-sm" />,
    },
    {
      title: '사이즈',
      align: 'center',
      render: () => <AntdInput className="ant-input-sm" />,
    },
    {
      title: '신청수량',
      align: 'center',
      render: () => <AntdInput className="ant-input-sm" />,
    },
    {
      title: '신청사유',
      align: 'center',
      render: () => <AntdInput className="ant-input-sm" />,
    },
    {
      title: '사용장소',
      align: 'center',
      render: () => <AntdInput className="ant-input-sm" />,
    },
  ];

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
        <div className="tableWrapper">
          <StyledHtmlTable>
            <div style={{ padding: '10px' }}>
              <table>
                <colgroup>
                  <col width="20%" />
                  <col width="20%" />
                  <col width="20%" />
                  <col width="20%" />
                  <col width="20%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>신청일</th>
                    <th>신청팀</th>
                    <th>신청자</th>
                    <th>결재자</th>
                    <th>지급요청일</th>
                  </tr>
                  <tr>
                    <td>{moment().format('YYYY-MM-DD')}</td>
                    <td>관리자</td>
                    <td>ADMIN</td>
                    <td></td>
                    <td>
                      <DatePicker />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </StyledHtmlTable>
        </div>
        <div style={{ padding: '10px' }}>
          <AntdTable columns={this.columns} dataSource={[{}, {}, {}]} pagination={false} />
        </div>
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
};

ModalContents.defatulProps = {
  handleModalClose: null,
  saveTask: null,
  getDataSource: null,
  isModified: false,
};

export default ModalContents;
