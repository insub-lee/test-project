/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input, Select } from 'antd';
import { createStructuredSelector } from 'reselect';
import DeptModal from './DeptModal';
import * as selectors from '../../../../../containers/common/Auth/selectors';
const { Option } = Select;

class pages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deptList: [],
      modalVisible: false,
      userInfo: {},
    };
  }

  handleAppStart = () => {
    const { result, profile } = this.props;
    const deptList = (result && result.deptList && result.deptList.deptList) || [];
    // const userInfo = deptList.filter(d => d.DEPT_ID === String(profile.DEPT_ID)) || {}; 관리자 ID라 테스트 불가
    const userInfo = deptList.filter(d => d.DEPT_ID === String('1150') && d);
    this.setState({
      deptList,
      userInfo,
    });
  };

  componentDidMount = () => {
    const { id, getCallDataHandler, apiAry } = this.props;
    getCallDataHandler(id, apiAry, this.handleAppStart);
  };

  handleModal = () => {
    const { modalVisible } = this.state;
    this.setState({
      modalVisible: !modalVisible,
    });
  };

  handleModalRowClick = () => {
    console.debug('handleModalRowClick');
  };

  render() {
    const { userInfo } = this.state;
    const { profile } = this.props;
    console.debug('this.state', this.state);
    console.debug('this.props', this.props);
    console.debug('this.props.profile', this.props.profile);
    return (
      <>
        <div>
          <span>평가년도</span>
          <Select defaultValue={2020} style={{ width: 130, padding: 3 }} onChange={this.handleSearchDept}>
            <Option key={2006} style={{ height: 30 }}>
              2006
            </Option>
            <Option key={2007} style={{ height: 30 }}>
              2007
            </Option>
            <Option key={2008} style={{ height: 30 }}>
              2008
            </Option>
            <Option key={2009} style={{ height: 30 }}>
              2009
            </Option>
          </Select>
          &nbsp; <span>부서코드 </span>
          <Input name="DEPT_CD" value={profile.DEPT_ID || ''} style={{ width: 150 }} onChange={this.handleInputChange} placeholder="부서코드"></Input>
          <Button shape="circle" icon="search" onClick={this.handleModal} />
          <Modal title="주관회사 부서 검색" visible={this.state.modalVisible} onCancel={this.handleModal} width={900} height={600} footer={[null]}>
            <DeptModal deptList={this.state.deptList || []} handleModalRowClick={this.handleModalRowClick}></DeptModal>
          </Modal>
          <Input value={profile.DEPT_NAME_KOR || ''} style={{ width: 150 }} readOnly></Input>
        </div>
      </>
    );
  }
}

pages.defaultProps = {
  id: 'eiNoAbno',
  getCallDataHandler: () => {},
  result: {},
  apiAry: [
    {
      key: 'deptList',
      type: 'GET',
      url: '/api/eshs/v1/common/eshsHstDeptAndFrDept',
    },
  ],
};
export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(pages);
