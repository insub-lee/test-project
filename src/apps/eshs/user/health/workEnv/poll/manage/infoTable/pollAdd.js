import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Select, DatePicker, Popconfirm } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const AntdDatePicker = StyledDatePicker(DatePicker);
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
      seq: -1,
      pollType: '근골격계질환', // 설문종류
      sDate: undefined,
      eDate: undefined,
    };
  }

  componentDidMount() {
    const { type } = this.props;
    if (type === 'UPDATE') this.init();
  }

  init = () => {
    const { modalData } = this.props;
    const { SEQ, POTYPE, SDATE, EDATE } = modalData;
    this.setState({
      seq: SEQ,
      pollType: POTYPE,
      sDate: moment(SDATE, 'YYYY-MM-DD'),
      eDate: moment(EDATE, 'YYYY-MM-DD'),
    });
  };

  savePoll = () => {
    const { submitFormData } = this.props;
    const { pollType, sDate, eDate } = this.state;
    if (sDate === undefined || sDate === null || eDate === undefined || eDate === null) {
      return message.error(<MessageContent>설문일정은 필수입력값 입니다.</MessageContent>);
    }

    if (sDate >= eDate) {
      return message.error(<MessageContent>설문 시작일은 종료일보다 이전 이여야 합니다.</MessageContent>);
    }

    const param = {
      POTYPE: pollType,
      POYEAR: moment(sDate).format('YYYY'),
      SDATE: moment(sDate).format('YYYY-MM-DD'),
      EDATE: moment(eDate).format('YYYY-MM-DD'),
    };
    return submitFormData('ADD', param);
  };

  updatePoll = () => {
    const { submitFormData } = this.props;
    const { seq, pollType, sDate, eDate } = this.state;

    if (sDate === undefined || sDate === null || eDate === undefined || eDate === null) {
      return message.error(<MessageContent>설문일정은 필수입력값 입니다.</MessageContent>);
    }

    if (eDate <= sDate) {
      return message.error(<MessageContent>설문 종료일은 시작일보다 이후 이여야 합니다.</MessageContent>);
    }
    const param = {
      SEQ: seq,
      POTYPE: pollType,
      POYEAR: moment(sDate).format('YYYY'),
      SDATE: moment(sDate).format('YYYY-MM-DD'),
      EDATE: moment(eDate).format('YYYY-MM-DD'),
    };
    return submitFormData('UPDATE', param);
  };

  deletePoll = () => {
    const { submitFormData } = this.props;
    const { seq, pollType, sDate, eDate } = this.state;
    const param = {
      SEQ: seq,
      POTYPE: pollType,
      POYEAR: moment(sDate).format('YYYY'),
      SDATE: moment(sDate).format('YYYY-MM-DD'),
      EDATE: moment(eDate).format('YYYY-MM-DD'),
    };
    return submitFormData('DELETE', param);
  };

  render() {
    const { pollType, sDate, eDate } = this.state;
    const { type } = this.props;
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
                <th>
                  <span>설문 종류</span>
                </th>
                <td>
                  {type === 'ADD' ? (
                    <AntdSelect value={pollType} className="select-sm" style={{ width: '250px' }} onChange={val => this.setState({ pollType: val })}>
                      <Option value="근골격계질환">근골격계질환</Option>
                      <Option value="직무 스트레스">직무 스트레스</Option>
                    </AntdSelect>
                  ) : (
                    <span>{pollType}</span>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <span>설문 기간</span>
                </th>
                <td>
                  {type === 'UPDATE' ? (
                    <span>{moment(sDate).format('YYYY-MM-DD')}</span>
                  ) : (
                    <AntdDatePicker className="ant-picker-sm" style={{ width: 125 }} value={sDate} onChange={date => this.setState({ sDate: date })} />
                  )}
                  <span style={{ marginLeft: '5px' }}> ~ </span>
                  <AntdDatePicker className="ant-picker-sm ml5" style={{ width: 125 }} value={eDate} onChange={date => this.setState({ eDate: date })} />
                  {type === 'UPDATE' && <span style={{ marginLeft: '5px', color: '#ff3333' }}>설문 시작일은 수정이 불가능합니다.</span>}
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <StyledButtonWrapper className="btn-wrap-mt-10 btn-wrap-center">
          {type === 'ADD' ? (
            <StyledButton className="btn-primary btn-sm" onClick={() => this.savePoll()}>
              저장
            </StyledButton>
          ) : (
            <>
              <StyledButton className="btn-primary btn-sm" onClick={() => this.updatePoll()}>
                수정
              </StyledButton>
              <Popconfirm
                title="설문 정보를 삭제하시면, 응답 인원의 정보도 함께 삭제됩니다. 삭제하시겠습니까?"
                onConfirm={() => this.deletePoll()}
                okText="Yes"
                cancelText="No"
              >
                <StyledButton className="btn-light btn-sm ml5">삭제</StyledButton>
              </Popconfirm>
            </>
          )}
        </StyledButtonWrapper>
      </Styled>
    );
  }
}

MailPush.propTypes = {
  type: PropTypes.string,
  submitFormData: PropTypes.func,
  modalData: PropTypes.object,
};

MailPush.defaultProps = {
  submitFormData: () => false,
};

export default MailPush;
