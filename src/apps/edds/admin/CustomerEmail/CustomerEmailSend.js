import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Input, Tag, Modal, Row, Col, Button } from 'antd';

import UserSelect from 'components/UserSelect';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledTag from 'components/BizBuilder/styled/Tag/StyledTag';
import StyledTagWrapper from 'components/BizBuilder/styled/Tag/StyledTagWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';

const AntdInput = StyledInput(Input);
const AntdTextarea = StyledTextarea(Input.TextArea);
const AntdModal = StyledAntdModal(Modal);
const AntdTag = StyledTag(Tag);

const defaultContent =
  'Dear All,\n' +
  'This is EDDS Admin of MAGNACHIP.\n\n' +
  'I am writing to let you know that our external document distribution system EDDS(http://edds.magnachip.com) needs to check your actual user account.\n' +
  'Please let me know whether the owners are changed. Such as name, e-mail address of the external document owner.\n\n' +
  '※ If you do not answer within a week, I will delete an user account of EDDS considering it useless.\n\n' +
  'If you have questions or clarifications just send your e-mail or contact me.\n' +
  'Thank you.';

class CustomerEmailSend extends Component {
  state = {
    fromId: -1,
    fromEmail: '',
    bccList: [],
    title: '',
    content: defaultContent,
    isShow: false,
  };

  componentDidMount() {
    const { id, apiAry, getCallDataHandler, profile } = this.props;
    getCallDataHandler(id, apiAry, () => {});
    this.setState({
      fromId: profile.USER_ID,
      fromEmail: profile.EMAIL,
    });
  }

  onChangeTitle = val => {
    this.setState({ title: val });
  };

  onChangeContent = val => {
    this.setState({ content: val });
  };

  onUserSelectModal = () => {
    this.setState({ isShow: true });
  };

  onCloseTag = (e, user) => {
    e.preventDefault();
    this.setState(prevState => {
      const { bccList } = prevState;
      const findIdx = bccList.findIndex(item => item.USER_ID === user.USER_ID);
      bccList.splice(findIdx, 1);
      return { bccList };
    });
  };

  onUserSelectedComplete = result => {
    this.props.changeFormData(this.props.id, 'selectedUserList', result);
    this.setState({
      isShow: false,
      bccList: result,
    });
  };

  onCancel = () => {
    this.setState({ isShow: false });
  };

  onClickSendMail = e => {
    const { id, submitHandlerBySaga } = this.props;

    if (!this.state.bccList || this.state.bccList.length === 0) {
      message.info(<MessageContent>BCC를 선택해 주세요.</MessageContent>);
      return;
    }
    if (this.state.title === '') {
      message.info(<MessageContent>Title을 입력해주세요.</MessageContent>);
      return;
    }

    const submitData = {
      PARAM: {
        from: this.state.fromId,
        bcc: this.state.bccList.map(item => item.USER_ID),
        subject: this.state.title,
        content: this.state.content,
      },
    };
    submitHandlerBySaga(id, 'POST', '/api/edds/v1/common/customerEmail', submitData, () => {});
  };

  render() {
    const { bccList } = this.state;
    const { result } = this.props;
    const list =
      result && result.distDeptList && result.distDeptList.list ? result.distDeptList.list.filter(item => item.DEPT_ID === 1461 || item.PRNT_ID === 1461) : [];

    return (
      <>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 고객 메일 발송
            </p>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          <StyledHtmlTable>
            <table>
              <colgroup>
                <col width="20%" />
                <col width="80%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>Recipient</th>
                  <td>
                    <AntdInput value={this.state.fromEmail} />
                  </td>
                </tr>
                <tr>
                  <th>BCC(Customer)</th>
                  <td>
                    <StyledTagWrapper>
                      <div className="ant-tag-inner">
                        {bccList &&
                          bccList.length > 0 &&
                          bccList.map(user => (
                            <AntdTag closable onClose={e => this.onCloseTag(e, user)}>
                              {user.EMAIL}
                            </AntdTag>
                          ))}
                      </div>
                      <StyledButton className="btn-light btn-xs" onClick={this.onUserSelectModal}>
                        선택
                      </StyledButton>
                    </StyledTagWrapper>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th>Title</th>
                  <td>
                    <AntdInput value={this.state.title} onChange={e => this.onChangeTitle(e.target.value)} />
                  </td>
                </tr>
                <tr>
                  <th>Content</th>
                  <td>
                    <AntdTextarea rows={12} value={this.state.content} onChange={e => this.onChangeContent(e.target.value)} />
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
        </StyledContentsWrapper>
        <StyledButtonWrapper className="btn-wrap-center">
          <StyledButton className="btn-primary" onClick={e => this.onClickSendMail(e)}>
            전송
          </StyledButton>
        </StyledButtonWrapper>
        <AntdModal title="담당자 선택" width="1000px" visible={this.state.isShow} onCancel={this.onCancel} destroyOnClose footer={[]}>
          <UserSelect
            initUserList={bccList.map(item => item.USER_ID)}
            treeDataSource={list}
            // userDataList={result.userList && result.userList.list}
            // onTreeSelect={this.onTreeSelect}
            // onUserSelectHandler={this.onUserSelect}
            onUserSelectedComplete={this.onUserSelectedComplete}
            onCancel={this.onCancel}
          />
        </AntdModal>
      </>
    );
  }
}

CustomerEmailSend.propTypes = {
  id: PropTypes.string,
  apiAry: PropTypes.array,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
};

CustomerEmailSend.defaultProps = {
  apiAry: [
    {
      key: 'distDeptList',
      url: '/api/mdcs/v1/common/distribute/DistributeDeptMgnt',
      type: 'GET',
      params: {},
    },
  ],
  result: {
    distDeptList: {
      list: [],
    },
  },
};

export default CustomerEmailSend;
