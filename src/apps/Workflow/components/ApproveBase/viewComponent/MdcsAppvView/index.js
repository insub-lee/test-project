import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Radio, Input, Button, Icon, Select } from 'antd';

import BizBuilderBase from 'components/BizBuilderBase';
import MdcsContentView from 'components/MdcsContentView';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';

const { Option } = Select;
const { TextArea } = Input;
let timeout;

class MdcsAppvView extends Component {
  state = {
    userInfo: [],
    selectedUser: undefined,
    nextApprover: undefined,
  };

  componentDidMount() {
    const { selectedRow, setSelectedRow, APPV_STATUS } = this.props;
    console.debug('this.props', this.props);
    const appvStatus = selectedRow && selectedRow.CURRENT_STATUS && selectedRow.CURRENT_STATUS == 10 ? 20 : 2;
    const nSelectRow = { ...selectedRow, APPV_STATUS: appvStatus };
    setSelectedRow(nSelectRow);
  }

  onChange = e => {
    const { selectedRow, setSelectedRow, APPV_STATUS } = this.props;
    const nSelectRow = { ...selectedRow, APPV_STATUS: e.target.value };
    setSelectedRow(nSelectRow);
  };

  fetch(value, callback) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = this.setTimeout(this.fake, 500);
  }

  fake = (value, callBackFunc) => {
    const { getUserInfo } = this.props;
    const searchInfo = { KEYWORD: value, START: 0, ENDL: 10000 };
    getUserInfo(searchInfo, this.onSearchComplete);
  };

  onSearchComplete = list => {
    console.debug(list);
    this.setState({
      userInfo: list,
    });
  };

  onSearchHandler = value => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(this.fake, 500, value, this.onSearchComplete);
  };

  onChangeHandler = (value, option) => {
    this.setState({
      selectedUser: {
        value,
        text: option.props.children,
      },
    });
  };

  onApplyUSer = () => {
    const { selectedRow, setSelectedRow } = this.props;
    this.setState(
      prevState => ({
        nextApprover: prevState.selectedUser,
        selectedUser: undefined,
      }),
      () => {
        const nRuleConfig = selectedRow.RULE_CONFIG;
        const nSelectedRow = {
          ...selectedRow,
          RULE_CONFIG: {
            ...nRuleConfig,
            NEXT_APPV_USER_ID: this.state.nextApprover.value,
          },
        };
        console.debug('next', nSelectedRow);
        setSelectedRow(nSelectedRow);
      },
    );
  };

  handleReqApprove = (e, appvStatus) => {
    e.preventDefault();
    console.debug('handleReqApprove call!! ');
    this.props.reqApprove(appvStatus);
    this.props.setOpinionVisible(false);
  };

  onModalClose = () => {
    this.props.setViewVisible(false);
  };

  render() {
    const { selectedRow } = this.props;
    return (
      <>
        <StyledHtmlTable style={{ padding: '20px 20px 0' }}>
          <table>
            <tbody>
              <tr>
                <th style={{ width: '150px' }}>결재방법 </th>
                <td>
                  <Radio.Group onChange={this.onChange} defaultValue={selectedRow && selectedRow.CURRENT_STATUS && selectedRow.CURRENT_STATUS === 10 ? 20 : 2}>
                    <Radio value={selectedRow && selectedRow.CURRENT_STATUS && selectedRow.CURRENT_STATUS === 10 ? 20 : 2}>승인</Radio>
                    <Radio value={selectedRow && selectedRow.CURRENT_STATUS && selectedRow.CURRENT_STATUS === 10 ? 30 : 3}>Hold</Radio>
                    {selectedRow.NODE_ID === 106 && <Radio value={5}>실무자 검토의뢰</Radio>}
                    {selectedRow.NODE_ID === 106 && <Radio value={10}>실무자 결재 권한위임</Radio>}
                  </Radio.Group>
                </td>
              </tr>
              <tr
                style={{
                  display: (selectedRow && selectedRow.APPV_STATUS && selectedRow.APPV_STATUS === 5) || selectedRow.APPV_STATUS === 10 ? 'table-row' : 'none',
                }}
              >
                <th style={{ width: '150px' }}>실무자검색 </th>
                <td>
                  <Select
                    style={{ width: '200px', paddingRight: '5px' }}
                    showSearch
                    placeholder="실무자명 검색"
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onChange={this.onChangeHandler}
                    onSearch={this.onSearchHandler}
                    notFoundContent={null}
                    value={this.state.selectedUser && this.state.selectedUser.value}
                  >
                    {this.state.userInfo.length > 0 &&
                      this.state.userInfo.map(user => (
                        <Option key={user.USER_ID} value={user.USER_ID}>
                          {`${user.NAME_KOR} [ ${user.DEPT_NAME_KOR} / ${user.PSTN_NAME_KOR} ]`}
                        </Option>
                      ))}
                  </Select>
                  <Button type="primary" style={{ marginRight: '5px' }} onClick={this.onApplyUSer}>
                    적용
                  </Button>
                  <Button>
                    <Icon type="search" />
                    조직도 검색
                  </Button>
                </td>
              </tr>
              <tr
                style={{
                  display: (selectedRow && selectedRow.APPV_STATUS && selectedRow.APPV_STATUS === 5) || selectedRow.APPV_STATUS === 10 ? 'table-row' : 'none',
                }}
              >
                <th style={{ width: '150px' }}>선택된 실무자 </th>
                <td>
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    allowClear
                    placeholder="실무자를 선택해주세요"
                    value={this.state.nextApprover && this.state.nextApprover.text}
                  ></Input>
                </td>
              </tr>
              <tr>
                <th>의견 </th>
                <td>
                  <TextArea rows={4} onChange={e => this.props.setOpinion(e.target.value)} />
                </td>
              </tr>
            </tbody>
          </table>
          <StyledButtonWrapper className="btn-wrap-center">
            <StyledButton key="ok" className="btn-primary btn-first" onClick={e => this.handleReqApprove(e, selectedRow.APPV_STATUS)}>
              승인
            </StyledButton>
            <StyledButton key="close" className="btn-light" onClick={this.onModalClose}>
              닫기
            </StyledButton>
          </StyledButtonWrapper>
        </StyledHtmlTable>
        <BizBuilderBase
          sagaKey="approveBase_approveView"
          viewType="VIEW"
          workSeq={selectedRow && selectedRow.WORK_SEQ}
          taskSeq={selectedRow && selectedRow.TASK_SEQ}
          selectedRow={selectedRow}
          ViewCustomButtons={() => false}
        />
      </>
    );
  }
}

MdcsAppvView.propTypes = {
  APPV_STATUS: PropTypes.number,
};

MdcsAppvView.defaultProps = {
  APPV_STATUS: 2,
};

export default MdcsAppvView;
