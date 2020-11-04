import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input, Radio, Tag } from 'antd';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledTag from 'components/BizBuilder/styled/Tag/StyledTag';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import BizMicroDevBase from 'components/BizMicroDevBase';

const AntdInput = StyledInput(Input);
const AntdTextarea = StyledTextarea(Input.TextArea);
const AntdTag = StyledTag(Tag);

class Comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        from: this.props.profile.USER_ID || undefined,
        to: this.props.users.map(user => user.ACP_USER_ID),
        users: this.props.users,
        FLAG: '2',
        content: '',
        subject: '',
      },
    };
  }

  componentWillUnmount() {
    const { sagaKey: id, removeReduxState } = this.props;
    removeReduxState(id);
  }

  changeFormData = (target, value) => this.setState(prevState => ({ formData: { ...prevState.formData, [target]: value } }));

  showMessage = text => message.info(<MessageContent>{text}</MessageContent>);

  send = () => {
    const { sagaKey, submitHandlerBySaga, modalVisible, spinningOn } = this.props;
    const { formData } = this.state;
    const msg = this.sendBefore();
    if (msg) return this.showMessage(msg);

    spinningOn();

    return submitHandlerBySaga(sagaKey, 'PUT', '/api/eshs/v1/common/eshsSafetyImproveMgt', { PARAM: formData }, (_, res) => {
      if (res && res.result === 1) {
        this.showMessage('메일이 성공적으로 전송되었습니다.');
        return modalVisible();
      }
      return this.showMessage('메일전송이 실패하였습니다.');
    });
  };

  sendBefore = () => {
    const {
      formData: { content, subject },
    } = this.state;
    if (!subject) return '제목을 입력해주세요';
    if (!content) return '내용을 입력해주세요';
    return '';
  };

  render() {
    const { users } = this.props;
    const { formData } = this.state;
    return (
      <StyledContentsWrapper>
        <StyledHtmlTable>
          <table className="table-border">
            <colgroup>
              <col width="30%" />
              <col width="50%" />
              <col width="20%" />
            </colgroup>
            <tbody>
              <tr>
                <th>메일발송 종류</th>
                <td style={{ borderRight: 'none' }} align="left">
                  <Radio.Group defaultValue={formData.FLAG} onChange={e => this.changeFormData('FLAG', e.target.value)}>
                    <Radio value="1"> 발행번호 및 Login버튼 포함</Radio>
                    <Radio value="2"> 추가전달사항만</Radio>
                  </Radio.Group>
                </td>
                <td align="right">
                  <StyledButton className="btn-primary btn-sm" onClick={this.send}>
                    보내기
                  </StyledButton>
                </td>
              </tr>
              <tr>
                <th>받는사람</th>
                <td colSpan={2}>
                  <div style={{ overflowX: 'auto', width: '100%', maxHeight: '150px' }}>
                    {users.map(user => (
                      <AntdTag key={user.REQ_NO} closable={false} onClose={e => console.debug(e)} style={{ marginRight: 3, textAlign: 'center' }}>
                        <p style={{ fontSize: '12px', fontWeight: '500' }}>{user.ACP_EMP_NM}</p>
                        <p style={{ fontSize: '12px', fontWeight: '500', textAlign: 'center' }}>{user.ACP_EMP_NO}</p>
                      </AntdTag>
                    ))}
                  </div>
                </td>
              </tr>
              <tr>
                <th>제목</th>
                <td colSpan={2}>
                  <AntdInput className="ant-input-xs" onChange={e => this.changeFormData('subject', e.target.value)} allowClear />
                </td>
              </tr>
              <tr>
                <th>내 용</th>
                <td colSpan={2}>
                  <AntdTextarea rows={10} onChange={e => this.changeFormData('content', e.target.value)} allowClear />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
      </StyledContentsWrapper>
    );
  }
}

const SendMailForm = ({ users, modalVisible, saveAfter }) => (
  <BizMicroDevBase sagaKey="ImproveSendMailForm" modalVisible={modalVisible} saveAfter={saveAfter} users={users} component={Comp}></BizMicroDevBase>
);

SendMailForm.propTypes = {
  users: PropTypes.array,
  modalVisible: PropTypes.func,
  saveAfter: PropTypes.any,
};
SendMailForm.defaultProps = {
  users: [],
  modalVisible: () => {},
  saveAfter: undefined,
};
Comp.propTypes = {
  users: PropTypes.array,
  submitHandlerBySaga: PropTypes.func,
  profile: PropTypes.object,
  modalVisible: PropTypes.func,
  saveAfter: PropTypes.func,
  sagaKey: PropTypes.string,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
};
Comp.defaultProps = {
  users: [],
  submitHandlerBySaga: () => {},
  profile: {},
  modalVisible: () => {},
  saveAfter: undefined,
  sagaKey: '',
  spinningOn: () => {},
  spinningOff: () => {},
};

export default SendMailForm;
