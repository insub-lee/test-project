import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import { Input, Modal } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import history from 'utils/history';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const AntdInput = StyledInput(Input);

class ChangePwdView extends Component {
  state = {
    PASSWD: '',
    NEW_PASSWD: '',
    NEW_PASSWD_CONFIRM: '',
  }

  onSave = () => {
    if (!this.state.PASSWD || this.state.PASSWD === '') {
      message.info(<MessageContent>현재 비밀번호를 입력해 주세요.</MessageContent>);
      return false;
    }
    if (!this.state.NEW_PASSWD || this.state.NEW_PASSWD === '') {
      message.info(<MessageContent>새 비밀번호를 입력해 주세요.</MessageContent>);
      return false;
    }
    if (!this.state.NEW_PASSWD_CONFIRM || this.state.NEW_PASSWD_CONFIRM === '') {
      message.info(<MessageContent>새 비밀번호 확인을 입력해 주세요.</MessageContent>);
      return false;
    }

    if (this.state.NEW_PASSWD !== this.state.NEW_PASSWD_CONFIRM) {
      message.info(<MessageContent>새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.</MessageContent>);
      return false;
    }

    const { sagaKey, submitHandlerBySaga, spinningOn, spinningOff } = this.props;
    const submitData = {
      PARAM: {
        ...this.state,
      }
    };

    Modal.confirm({
      title: '비밀번호를 변경하시겠습니까?',
      // icon: <ExclamationCircleOutlined />,
      okText: '확인',
      cancelText: '취소',
      onOk() {
        spinningOn();
        submitHandlerBySaga(sagaKey, 'POST', `/api/edds/v1/common/updateEddsUserPasswd`, submitData, (id, res) => {
          spinningOff();
          if (res) {
            if (res.result === 1) {
              message.success(<MessageContent>비밀번호를 변경하였습니다.</MessageContent>);
              history.push('/');
            } else if (res.result === -1) {
              message.info(<MessageContent>비밀번호가 일치하지 않습니다.</MessageContent>);
            } else {
              message.error(<MessageContent>잘못된 요청입니다.</MessageContent>);
            }
          } else {
            message.error(<MessageContent>비밀번호 변경에 실패하였습니다.</MessageContent>);
          }
        });
      }
    });
  };

  render() {
    return (
      <StyledContentsWrapper>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="30%" />
              <col width="70%" />
            </colgroup>
            <tbody>
              <tr>
                <th>현재 비밀번호</th>
                <td>
                  <AntdInput
                    className="ant-input-xs" style={{ width: 200 }} allowClear type="password"
                    onChange={e => this.setState({ PASSWD: e.target.value })}
                  />
                </td>
              </tr>
              <tr>
                <th>새 비밀번호</th>
                <td>
                  <AntdInput
                    className="ant-input-xs" style={{ width: 200 }} allowClear type="password"
                    onChange={e => this.setState({ NEW_PASSWD: e.target.value })}
                  />
                </td>
              </tr>
              <tr>
                <th>새 비밀번호 확인</th>
                <td>
                  <AntdInput
                    className="ant-input-xs" style={{ width: 200 }} allowClear type="password"
                    onChange={e => this.setState({ NEW_PASSWD_CONFIRM: e.target.value })}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
          <StyledButton className="btn-primary btn-sm" onClick={this.onSave}>수정</StyledButton>
        </StyledButtonWrapper>
      </StyledContentsWrapper>
    )
  }
}

class ChangePwd extends Component {
  render() {
    return <BizMicroDevBase sagaKey="ChangePwdView" component={ChangePwdView} />
  }
}

export default ChangePwd;
