import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, message, Popconfirm } from 'antd';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledAntdModalPad from 'components/BizBuilder/styled/Modal/StyledAntdModalPad';

import UserSelect from 'components/UserSelect';

const AntdModal = StyledAntdModalPad(Modal);
const AntdSearch = StyledSearchInput(Input.Search);

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenOModal: false,
      isOpenKModal: false,
      isOpenMModal: false,
    };
  }

  onOfficerSelectedComplete = result => {
    const { sagaKey, changeFormData } = this.props;
    if (result.length > 0 && result.length <= 1) {
      changeFormData(sagaKey, 'OFFICER_ID', result[0].USER_ID);
      changeFormData(sagaKey, 'OFFICER_NO', result[0].EMP_NO);
      changeFormData(sagaKey, 'OFFICER_NAME', result[0].NAME_KOR);
      changeFormData(sagaKey, 'OFFICER_DEPT_KOR', result[0].DEPT_NAME_KOR);
      this.setState({
        isOpenOModal: false,
      });
    } else {
      message.warning('한명만 선택해주세요');
    }
  };

  onKeeperSelectedComplete = result => {
    const { sagaKey, changeFormData } = this.props;
    if (result.length > 0 && result.length <= 1) {
      changeFormData(sagaKey, 'KEEPER_ID', result[0].USER_ID);
      changeFormData(sagaKey, 'KEEPER_NO', result[0].EMP_NO);
      changeFormData(sagaKey, 'KEEPER_NAME', result[0].NAME_KOR);
      changeFormData(sagaKey, 'KEEPER_DEPT_KOR', result[0].DEPT_NAME_KOR);
      this.setState({
        isOpenKModal: false,
      });
    } else {
      message.warning('한명만 선택해주세요');
    }
  };

  onManagerSelectedComplete = result => {
    const { sagaKey, changeFormData } = this.props;

    if (result.length > 0 && result.length <= 1) {
      changeFormData(sagaKey, 'MANAGER_ID', result[0].USER_ID);
      changeFormData(sagaKey, 'MANAGER_NO', result[0].EMP_NO);
      changeFormData(sagaKey, 'MANAGER_NAME', result[0].NAME_KOR);
      changeFormData(sagaKey, 'MANAGER_DEPT_KOR', result[0].DEPT_NAME_KOR);
      this.setState({
        isOpenMModal: false,
      });
    } else {
      message.warning('한명만 선택해주세요');
    }
  };

  onSave = () => {
    const { sagaKey, submitHandlerBySaga, formData, changeFormData } = this.props;

    const submitData = {
      PARAM: { formData },
    };
    if (formData && formData.OFFICER_NO && formData.KEEPER_NO && formData.MANAGER_NO) {
      if (formData.actionType.trim() === 'U') {
        submitHandlerBySaga(sagaKey, 'PUT', '/api/eshs/v1/common/eshsproposalofficer', submitData, this.modifyCallback);
      } else {
        submitHandlerBySaga(sagaKey, 'POST', '/api/eshs/v1/common/eshsproposalofficer', submitData, this.insertCallback);
      }
      changeFormData(sagaKey, 'actionType', 'I');
    } else {
      message.warning('값이 올바르지 않습니다');
    }
  };

  insertCallback = (id, response) => {
    if (response.result === 1) {
      message.success('등록이 완료되었습니다.');
      this.onSaveComplete();
    } else {
      message.warning('서버의 문제가 발생했습니다.');
    }
  };

  modifyCallback = (id, response) => {
    if (response.result === 1) {
      message.success('수정이 완료되었습니다.');
      this.onSaveComplete();
    } else {
      message.warning('서버의 문제가 발생했습니다.');
    }
  };

  onRemoveDo = () => {
    const { sagaKey: id, submitHandlerBySaga, formData } = this.props;
    const param = { PARAM: { ...formData } };
    submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsproposalofficer', param, this.deleteCallback);
  };

  deleteCallback = (id, response) => {
    const { onComplete } = this.props;
    if (response.result === 1) {
      message.success('삭제가 완료되었습니다.');
      onComplete();
    } else {
      message.warning('서버의 문제가 발생했습니다.');
    }
  };

  onSaveComplete = id => {
    const { onComplete, removeStorageReduxState, changeFormData, sagaKey } = this.props;
    removeStorageReduxState(id, 'result');
    removeStorageReduxState(id, 'formData');
    changeFormData(sagaKey, 'actionType', 'I');
    onComplete();
  };

  onCancel = () => {
    const { sagaKey, changeFormData } = this.props;
    changeFormData(sagaKey, 'actionType', 'I');
    this.setState({ isOpenOModal: false, isOpenKModal: false, isOpenMModal: false });
  };

  onReset = () => {
    const { removeStorageReduxState, sagaKey: id } = this.props;
    removeStorageReduxState(id, 'formData');
    this.onCancel();
  };

  render() {
    const {
      formData: { OFFICER_DEPT_KOR, OFFICER_NAME, KEEPER_NAME, MANAGER_NAME, actionType },
    } = this.props;
    const { isOpenOModal, isOpenKModal, isOpenMModal } = this.state;
    return (
      <>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="20%"></col>
              <col width="80%"></col>
            </colgroup>
            <tbody>
              <tr>
                <th>
                  <span>구분</span>
                </th>
                <th>
                  <span>이름</span>
                </th>
              </tr>
              <tr>
                <th>
                  <span>부서명</span>
                </th>
                <td>{OFFICER_DEPT_KOR}</td>
              </tr>
              <tr>
                <th>안전책임자</th>
                <td>
                  <AntdSearch
                    className="input-search-xs"
                    readOnly
                    value={OFFICER_NAME}
                    onClick={() => this.setState({ isOpenOModal: true })}
                    onSearch={() => this.setState({ isOpenOModal: true })}
                  />
                </td>
              </tr>
              <tr>
                <th>안전유지자</th>
                <td>
                  <AntdSearch
                    className="input-search-xs"
                    readOnly
                    value={KEEPER_NAME}
                    onClick={() => this.setState({ isOpenKModal: true })}
                    onSearch={() => this.setState({ isOpenKModal: true })}
                  />
                </td>
              </tr>
              <tr>
                <th>안전보건담당자</th>
                <td>
                  <AntdSearch
                    className="input-search-xs"
                    readOnly
                    value={MANAGER_NAME}
                    onClick={() => this.setState({ isOpenMModal: true })}
                    onSearch={() => this.setState({ isOpenMModal: true })}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
            {actionType === 'I' ? (
              <StyledButton className="btn-primary btn-sm btn-first" onClick={this.onSave}>
                저장
              </StyledButton>
            ) : (
              <>
                <StyledButton className="btn-primary btn-sm mr5" onClick={this.onSave}>
                  수정
                </StyledButton>
                <Popconfirm title="삭제하시겠습니끼?" onConfirm={this.onRemoveDo}>
                  <StyledButton className="btn-primary btn-sm mr5">삭제</StyledButton>
                </Popconfirm>
              </>
            )}
            <StyledButton className="btn-light btn-sm" onClick={this.onReset}>
              RESET
            </StyledButton>
          </StyledButtonWrapper>
        </StyledHtmlTable>
        <AntdModal
          className="modal-none-head"
          visible={isOpenOModal || isOpenKModal || isOpenMModal}
          width="1000px"
          onCancel={this.onCancel}
          destroyOnClose
          footer={null}
        >
          {isOpenOModal && <UserSelect onUserSelectHandler={() => null} onUserSelectedComplete={this.onOfficerSelectedComplete} onCancel={this.onCancel} />}
          {isOpenKModal && <UserSelect onUserSelectHandler={() => null} onUserSelectedComplete={this.onKeeperSelectedComplete} onCancel={this.onCancel} />}
          {isOpenMModal && <UserSelect onUserSelectHandler={() => null} onUserSelectedComplete={this.onManagerSelectedComplete} onCancel={this.onCancel} />}
        </AntdModal>
      </>
    );
  }
}

Edit.propTypes = {
  sagaKey: PropTypes.string,
  formData: PropTypes.any,
  submitHandlerBySaga: PropTypes.func,
  removeStorageReduxState: PropTypes.func,
  onComplete: PropTypes.func,
  changeFormData: PropTypes.any,
};

Edit.defaultProps = {};

export default Edit;
