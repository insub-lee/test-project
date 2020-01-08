import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Radio, Input, Button, Icon, Select } from 'antd';

const { Option } = Select;
let timeout;

class AppvActionComp extends Component {
  state = {
    userInfo: [],
    selectedUser: undefined,
    nextApprover: undefined,
  };

  componentDidMount() {
    const { selectedRow, setSelectedRow, APPV_STATUS } = this.props;
    const nSelectRow = { ...selectedRow, APPV_STATUS };
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
      prevState => ({ nextApprover: prevState.selectedUser, selectedUser: undefined }),
      () => {
        const nRuleConfig = selectedRow.RULE_CONFIG;
        const nSelectedRow = { ...selectedRow, RULE_CONFIG: { ...nRuleConfig, NEXT_APPV_USER_ID: this.state.nextApprover.value } };
        console.debug('next', nSelectedRow);
        setSelectedRow(nSelectedRow);
      },
    );
  };

  render() {
    return (
      <>
        <Radio.Group onChange={this.onChange} defaultValue={2}>
          <Radio value={2}>승인</Radio>
          <Radio value={3}>Hold</Radio>
          <Radio value={5}>실무자 검토의뢰</Radio>
          <Radio value={10}>실무자 결재 권한위임</Radio>
        </Radio.Group>
        <table>
          <tr>
            <td colSpan={3}>실무자 선택</td>
          </tr>
          <tr>
            <td>실무자명 : </td>
            <td>
              <Select
                style={{ width: '200px' }}
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
            </td>
            <td>
              <Button type="primary" onClick={this.onApplyUSer}>
                적용
              </Button>
            </td>
            <td>
              <Button>
                <Icon type="search" />
                조직도 검색
              </Button>
            </td>
          </tr>
          <tr>
            <td>선택된 실무자 : </td>
            <td colSpan={2}>
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                allowClear
                placeholder="실무자를 선택해주세요"
                value={this.state.nextApprover && this.state.nextApprover.text}
              ></Input>
            </td>
          </tr>
        </table>
      </>
    );
  }
}

AppvActionComp.propTypes = {
  APPV_STATUS: PropTypes.number,
};

AppvActionComp.defaultProps = {
  APPV_STATUS: 2,
};

export default AppvActionComp;
