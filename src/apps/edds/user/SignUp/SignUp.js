import React, { Component } from 'react';
import { Input, Typography, Divider, Radio, Checkbox, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';

import { agree1, agree2 } from './agreeContents';

const AntdInput = StyledInput(Input);
const AntdTextarea = StyledTextarea(Input.TextArea);

class EddsSignUp extends Component {
  state = {
    chkAgree1: '',
    chkAgree2: '',
    signUpData : {
      REQUESTER_NAME: '',
      COMPANY_NAME: '',
      DEPT_NAME: '',
      PSTN_NAME: '',
      EMAIL: '',
      PHONE: '',
      PASSWORD: '',
      ADDRESS: '',
      MEMO: '',
    }
  };

  onSubmit = () => {
    const { sagaKey, submitHandlerBySaga, spinningOn, spinningOff } = this.props;
    const { chkAgree1, chkAgree2, signUpData } = this.state;

    console.debug('signupdata >> ', signUpData);

    if (chkAgree1 !== 'Y' || chkAgree2 != 'Y') {
      message.info(
        <MessageContent>
          <p>개인정보 수집. 이용에 동의해야 가입이 가능합니다.</p>
          <p>It requires your consent to collection and use of personal information to join.</p>
        </MessageContent>
      );
      return false;
    }

    if (!signUpData.REQUESTER_NAME || signUpData.REQUESTER_NAME === '') {
      message.info(<MessageContent>Please Input full Name.</MessageContent>);
      return false;
    }
    if (!signUpData.COMPANY_NAME || signUpData.COMPANY_NAME === '') {
      message.info(<MessageContent>Please Input Company Name.</MessageContent>);
      return false;
    }
    if (!signUpData.EMAIL || signUpData.EMAIL === '') {
      message.info(<MessageContent>Please Input Email.</MessageContent>);
      return false;
    }
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!regExp.test(signUpData.EMAIL)) {
      message.info(<MessageContent>Invalid e-mail format.</MessageContent>);
      return false;
    }
    if (!signUpData.PASSWORD || signUpData.PASSWORD === '') {
      message.info(<MessageContent>Please Input Password.</MessageContent>);
      return false;
    }
    if (!signUpData.PASSWORD_CONFIRM || signUpData.PASSWORD_CONFIRM === '') {
      message.info(<MessageContent>Please Input passwordConfirm.</MessageContent>);
      return false;
    }
    if (signUpData.PASSWORD !== signUpData.PASSWORD_CONFIRM) {
      message.info(<MessageContent>password and password confirm do not match.</MessageContent>);
      return false;
    }

    const submitData = {
      PARAM: { ...signUpData }
    };

    Modal.confirm({
      title: '등록하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      okText: 'OK',
      cancelText: 'Cancel',
      onOk() {
        spinningOn();
        submitHandlerBySaga(sagaKey, 'POST', `/api/edds/v1/common/eddsRequest/${signUpData.EMAIL}`, submitData, (id, res) => {
          if (res && res.result > 0) {
            window.alert('등록하였습니다.');
            // message.info(<MessageContent>등록하였습니다.</MessageContent>);
            if (window.opener) {
              window.close();
            }
          } else {
            message.info(<MessageContent>등록에 실패하였습니다.</MessageContent>);
          }
          spinningOff();
        });
      }
    });
  }

  render() {
    const { signUpData } = this.state;
    return (
      <StyledContentsWrapper>
        <div>
          <Typography.Title level={2}>Sign up your EDDS ID</Typography.Title>
        </div>
        <Divider plain>Fill out this form correctly for accessto all Magnachip EDDS services</Divider>
        <div className="agree-wrapper">
          <p style={{ marginBottom: 10 }}>
            <AntdTextarea rows={10} value={agree1} />
          </p>
          <p style={{ marginBottom: 10 }}>
            <Radio.Group value={this.state.chkAgree1} onChange={e => this.setState({ chkAgree1: e.target.value })}>
              <Radio value="Y">동의함(Agree)</Radio>
              <Radio value="N">동의하지 않음(Disagree)</Radio>
            </Radio.Group>
          </p>
          <p style={{ marginBottom: 10 }}>
            <AntdTextarea rows={10} value={agree2} />
          </p>
          <p style={{ marginBottom: 10 }}>
            <Radio.Group value={this.state.chkAgree2} onChange={e => this.setState({ chkAgree2: e.target.value })}>
              <Radio value="Y">동의함(Agree)</Radio>
              <Radio value="N">동의하지 않음(Disagree)</Radio>
            </Radio.Group>
          </p>
          <p style={{ marginBottom: 20 }}>
            <Checkbox onChange={e  => this.setState({ chkAgree1: e.target.checked ? 'Y' : 'N', chkAgree2: e.target.checked ? 'Y' : 'N' })}>전체 동의합니다.</Checkbox>
          </p>
        </div>
        <StyledHtmlTable>
          <table>
            <tbody>
              <tr>
                <th>*full Name</th>
                <td>
                  <AntdInput className="ant-input-sm" onChange={e => { this.setState({ signUpData: { ...signUpData, REQUESTER_NAME: e.target.value }})}} />
                </td>
                <th>*Company Name</th>
                <td>
                  <AntdInput className="ant-input-sm" onChange={e => { this.setState({ signUpData: { ...signUpData, COMPANY_NAME: e.target.value }})}} />
                </td>
              </tr>
              <tr>
                <th>department</th>
                <td>
                  <AntdInput className="ant-input-sm" onChange={e => { this.setState({ signUpData: { ...signUpData, DEPT_NAME: e.target.value }})}} />
                </td>
                <th>Job title</th>
                <td>
                  <AntdInput className="ant-input-sm" onChange={e => { this.setState({ signUpData: { ...signUpData, PSTN_NAME: e.target.value }})}} />
                </td>
              </tr>
              <tr>
                <th>*Email</th>
                <td>
                  <AntdInput className="ant-input-sm" onChange={e => { this.setState({ signUpData: { ...signUpData, EMAIL: e.target.value }})}} />
                </td>
                <th>Phone</th>
                <td>
                  <AntdInput className="ant-input-sm" onChange={e => { this.setState({ signUpData: { ...signUpData, PHONE: e.target.value }})}} />
                </td>
              </tr>
              <tr>
                <th>*password</th>
                <td>
                  <AntdInput className="ant-input-sm" type="password" onChange={e => { this.setState({ signUpData: { ...signUpData, PASSWORD: e.target.value }})}} />
                </td>
                <th>*passwork confirm</th>
                <td>
                  <AntdInput className="ant-input-sm" type="password" onChange={e => { this.setState({ signUpData: { ...signUpData, PASSWORD_CONFIRM: e.target.value }})}} />
                </td>
              </tr>
              <tr>
                <th>Address</th>
                <td colSpan={3}>
                  <AntdInput className="ant-input-sm" onChange={e => { this.setState({ signUpData: { ...signUpData, ADDRESS: e.target.value }})}} />
                </td>
              </tr>
              <tr>
                <th>Memo</th>
                <td colSpan={3}>
                  <AntdTextarea rows={6} onChange={e => { this.setState({ signUpData: { ...signUpData, MEMO: e.target.value }})}} />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
          <StyledButton className="btn-primary btn-sm" onClick={this.onSubmit}>Submit</StyledButton>
        </StyledButtonWrapper>
      </StyledContentsWrapper>
    );
  }
}

export default EddsSignUp;