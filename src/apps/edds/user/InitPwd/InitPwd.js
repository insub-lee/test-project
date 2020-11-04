import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Modal, PageHeader } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';

const AntdInput = StyledInput(Input);

class InitPwd extends Component {
  state = {
    NAME: '',
    EMAIL: '',
  };

  sendEmail = () => {
    const { sagaKey, submitHandlerBySaga, spinningOn, spinningOff } = this.props;

    const submitData = {
      PARAM: {
        ...this.state,
      },
    };

    Modal.confirm({
      title: '비밀번호를 초기화 하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      okText: 'OK',
      cancelText: 'Cancel',
      onOk() {
        spinningOn();
        submitHandlerBySaga(sagaKey, 'POST', `/api/edds/v1/common/eddsInitPwd`, submitData, (id, res) => {
          if (res && res.result > 0) {
            if (window.opener) {
              window.alert('임시비밀번호를 메일로 발송하였습니다.\n\n로그인 후 비밀번호를 변경하시기 바랍니다.');
              window.close();
            } else {
              message.info(<MessageContent>임시비밀번호를 메일로 발송하였습니다.</MessageContent>);
            }
          } else {
            message.info(<MessageContent>비밀번호 초기화에 실패하였습니다.</MessageContent>);
          }
          spinningOff();
        });
      },
    });
  };

  render() {
    return (
      <StyledContentsWrapper>
        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
          }}
          title="비밀번호 초기화"
        />
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="30%" />
              <col width="70%" />
            </colgroup>
            <tbody>
              <tr>
                <td colSpan={2}>
                  <p>아래 칸에 이름과 E-mail주소를 입력하시면</p>
                  <p>입력하신 메일 주소로 초기화된 비밀번호를 보내드립니다.</p>
                  <p>Please enter your name and email address in the blank below,</p>
                  <p>initialized password will be sent to the email address.</p>
                </td>
              </tr>
              <tr>
                <th>*Name</th>
                <td>
                  <AntdInput
                    className="ant-input-sm"
                    onChange={e => {
                      this.setState({ NAME: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th>*E-Mail</th>
                <td>
                  <AntdInput
                    className="ant-input-sm"
                    onChange={e => {
                      this.setState({ EMAIL: e.target.value });
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
          <StyledButton className="btn-primary btn-sm" onClick={this.sendEmail}>
            SEND
          </StyledButton>
        </StyledButtonWrapper>
      </StyledContentsWrapper>
    );
  }
}

InitPwd.propTypes = {
  sagaKey: PropTypes.string,
  submitHandlerBySaga: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
};

export default InitPwd;
