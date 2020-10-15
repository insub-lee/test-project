import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, Select, Checkbox, Popconfirm } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const CheckboxGroup = Checkbox.Group;
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const { Option } = Select;

const Styled = styled.div`
  .ant-checkbox-group-item {
    width: 100px;
  }
`;

class MailPush extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pstnList: [], // 전체 직책
      selectedPstn: [], // 발송할 직책
      selectedType: 'A', // 전체인원, 응답인원, 미응답인원
      subject: '',
      content: '',
    };
  }

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    const { listData } = this.props;
    const initPstnList = [];
    if (Array.isArray(listData)) {
      listData.forEach(item => {
        if (!initPstnList.includes(item.PSTN_NAME)) initPstnList.push(item.PSTN_NAME);
      });
    }
    this.setState({
      pstnList: initPstnList,
      selectedPstn: initPstnList,
    });
  };

  sendMail = () => {
    const { sagaKey: id, getCallDataHandlerReturnRes, listData } = this.props;
    const { selectedPstn, selectedType, subject, content } = this.state;
    const mailTarget = listData
      .filter(item => {
        if (selectedType === 'A') return true;
        return item.ANSWER_YN === selectedType;
      })
      .filter(row => selectedPstn.includes(row.PSTN_NAME))
      .map(row => row.USER_ID);
    const apiInfo = {
      key: 'sendHealthPollMail',
      type: 'POST',
      url: `/api/eshs/v1/common/healthPollMail`,
      params: { PARAM: { to: mailTarget, subject, content } },
    };
    getCallDataHandlerReturnRes(id, apiInfo);
  };

  sendMailCallback = (id, response) => {
    const { result } = response;
    const { modalHandler } = this.props;
    if (result === 'success') {
      message.success(<MessageContent>메일을 발송하였습니다.</MessageContent>);
      return modalHandler(false);
    }
    message.success(<MessageContent>메일 발송을 실패하였습니다.</MessageContent>);
    return false;
  };

  render() {
    const { pstnList, selectedPstn, selectedType } = this.state;
    const { pollStatus } = this.props;
    return (
      <Styled>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="20%" />
              <col width="80%" />
            </colgroup>
            <tbody>
              <tr>
                <th colSpan={2}>
                  <span>메일설정</span>
                </th>
              </tr>
              <tr>
                <th rowSpan={2}>
                  <span>발송대상 설정</span>
                </th>
                <td>
                  <AntdSelect
                    defaultValue={selectedType}
                    className="select-sm"
                    style={{ width: '100px' }}
                    onChange={val => this.setState({ selectedType: val })}
                  >
                    <Option value="A">전체</Option>
                    <Option value="Y">응답자</Option>
                    {pollStatus === 'CLOSE' ? '' : <Option value="N">미응답자</Option>}
                  </AntdSelect>
                  {pollStatus === 'CLOSE' ? (
                    <span style={{ color: '#ff3333', marginLeft: '5px' }}>종료된 설문은 응답인원만 존재합니다.</span>
                  ) : (
                    <span style={{ color: '#ff3333', marginLeft: '5px' }}>설문 응답상태에 따른 대상자 지정</span>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <CheckboxGroup options={pstnList} value={selectedPstn} onChange={arrVal => this.setState({ selectedPstn: arrVal })} />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="20%" />
              <col width="80%" />
            </colgroup>
            <tbody>
              <tr>
                <th>
                  <span>제목</span>
                </th>
                <td>
                  <AntdInput
                    className="ant-input-xs ant-input-inline"
                    defaultValue=""
                    style={{ width: '100%' }}
                    onChange={e => this.setState({ subject: e.target.value })}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <span>내용</span>
                </th>
                <td>
                  <textarea
                    rows="10"
                    required
                    maxLength={500}
                    style={{ width: '100%', height: '300px', resize: 'none', border: '1px solid #e5e5e5' }}
                    onChange={e => this.setState({ content: e.target.value })}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <StyledButtonWrapper className="btn-wrap-mt-10 btn-wrap-center">
          <Popconfirm title="메일을 발송 하시겠습니까?" onConfirm={() => this.sendMail()} okText="Yes" cancelText="No">
            <StyledButton className="btn-primary btn-sm">발송</StyledButton>
          </Popconfirm>
        </StyledButtonWrapper>
      </Styled>
    );
  }
}

MailPush.propTypes = {
  sagaKey: PropTypes.string,
  pollStatus: PropTypes.string,
  listData: PropTypes.array,
  getCallDataHandlerReturnRes: PropTypes.func,
  modalHandler: PropTypes.func,
};

MailPush.defaultProps = {
  sagaKey: '',
  pollStatus: '',
  listData: [],
  getCallDataHandlerReturnRes: () => false,
  modalHandler: () => false,
};

export default MailPush;
