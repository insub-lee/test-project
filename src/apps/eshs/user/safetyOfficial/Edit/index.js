import React, { Component } from 'react';
import { Row, Col, Modal, Input, message } from 'antd';

import StyledButton from 'apps/mdcs/styled/StyledButton';
import UserSelect from 'components/UserSelect';
import Styled from './Styled';

class Edit extends Component {
  state = {
    isOpenOModal: false,
    isOpenKModal: false,
    isOpenMModal: false,
  };

  componentDidMount() {}

  onUserSelect = result => {
    console.debug(result);
  };

  onOfficerSelectedComplete = result => {
    const { sagaKey, changeFormData, formData } = this.props;
    if (result.length > 0) {
      changeFormData(sagaKey, 'OFFICER_NO', result[0].EMP_NO);
      changeFormData(sagaKey, 'OFFICER_NAME', result[0].NAME_KOR);
      changeFormData(sagaKey, 'OFFICER_DEPT_KOR', result[0].DEPT_NAME_KOR);
    }
    result.length > 0 &&
      this.setState({
        isOpenOModal: false,
      });
  };

  onKeeperSelectedComplete = result => {
    const { sagaKey, changeFormData, formData } = this.props;
    if (result.length > 0) {
      changeFormData(sagaKey, 'KEEPER_NO', result[0].EMP_NO);
      changeFormData(sagaKey, 'KEEPER_NAME', result[0].NAME_KOR);
      changeFormData(sagaKey, 'KEEPER_DEPT_KOR', result[0].DEPT_NAME_KOR);
    }
    result.length > 0 &&
      this.setState({
        isOpenKModal: false,
      });
  };

  onManagerSelectedComplete = result => {
    const { sagaKey, changeFormData, formData } = this.props;

    if (result.length > 0) {
      changeFormData(sagaKey, 'MANAGER_NO', result[0].EMP_NO);
      changeFormData(sagaKey, 'MANAGER_NAME', result[0].NAME_KOR);
      changeFormData(sagaKey, 'MANAGER_DEPT_KOR', result[0].DEPT_NAME_KOR);
    }
    result.length > 0 &&
      this.setState({
        isOpenMModal: false,
      });
  };

  warning = () => {
    message.warning('값이 올바르지 않습니다');
  };

  onSave = () => {
    const { sagaKey, submitHandlerBySaga, formData, changeFormData } = this.props;

    const submitData = {
      PARAM: { formData },
    };
    if (formData && formData.OFFICER_NO && formData.KEEPER_NO && formData.MANAGER_NO) {
      formData.actionType.trim() === 'U'
        ? submitHandlerBySaga(sagaKey, 'PUT', '/api/eshs/v1/common/eshsproposalofficer', submitData, this.onSaveComplete)
        : submitHandlerBySaga(sagaKey, 'POST', '/api/eshs/v1/common/eshsproposalofficer', submitData, this.onSaveComplete);
      changeFormData(sagaKey, 'actionType', 'I');
    } else {
      this.warning();
    }
  };

  onSaveComplete = id => {
    const { getCallDataHandler, apiAry, removeStorageReduxState, changeFormData, sagaKey } = this.props;
    removeStorageReduxState(id, 'result');
    getCallDataHandler(id, apiAry);
    removeStorageReduxState(id, 'formData');
    changeFormData(sagaKey, 'actionType', 'I');
  };

  onCancel = () => {
    const { sagaKey, removeStorageReduxState, changeFormData } = this.props;
    removeStorageReduxState(sagaKey, 'formData');
    changeFormData(sagaKey, 'actionType', 'I');
    this.setState({ isOpenOModal: false, isOpenKModal: false, isOpenMModal: false });
  };

  render() {
    const { formData } = this.props;
    return (
      <Styled>
        <Row>
          <Col>
            <span>부서명 : {formData && formData.OFFICER_DEPT_KOR}</span>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <span>구분</span>
          </Col>
          <Col span={10}>
            <span>이름</span>
          </Col>
        </Row>
        <Row>
          <Col span={4}>안전책임자</Col>
          <Col span={10}>
            <Input readOnly placeholder="select me" value={formData && formData.OFFICER_NAME} onClick={() => this.setState({ isOpenOModal: true })} />
            <Modal visible={this.state.isOpenOModal} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
              <UserSelect onUserSelectHandler={this.onUserSelect} onUserSelectedComplete={this.onOfficerSelectedComplete} onCancel={this.onCancel}></UserSelect>
            </Modal>
          </Col>
        </Row>
        <Row>
          <Col span={4}>안전유지자</Col>
          <Col span={10}>
            <Input readOnly placeholder="select me" value={formData && formData.KEEPER_NAME} onClick={() => this.setState({ isOpenKModal: true })} />
            <Modal visible={this.state.isOpenKModal} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
              <UserSelect onUserSelectHandler={this.onUserSelect} onUserSelectedComplete={this.onKeeperSelectedComplete} onCancel={this.onCancel}></UserSelect>
            </Modal>
          </Col>
        </Row>
        <Row>
          <Col span={4}>안전보건담당자</Col>
          <Col span={10}>
            <Input readOnly placeholder="select me" value={formData && formData.MANAGER_NAME} onClick={() => this.setState({ isOpenMModal: true })} />
            <Modal visible={this.state.isOpenMModal} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
              <UserSelect onUserSelectHandler={this.onUserSelect} onUserSelectedComplete={this.onManagerSelectedComplete} onCancel={this.onCancel}></UserSelect>
            </Modal>
          </Col>
        </Row>
        <Row className="editRow">
          <Col className="buttonCol">
            <>
              {formData && formData.actionType === 'I' ? (
                <StyledButton className="btn-primary btn-first" onClick={() => this.onSave()}>
                  저장
                </StyledButton>
              ) : (
                <StyledButton className="btn-primary btn-first" onClick={() => this.onSave()}>
                  수정
                </StyledButton>
              )}
              <StyledButton className="btn-light" onClick={() => this.onCancel()}>
                CANCEL
              </StyledButton>
            </>
          </Col>
        </Row>
      </Styled>
    );
  }
}

export default Edit;
