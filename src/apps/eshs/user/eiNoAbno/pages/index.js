/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input, Select, Row, Col } from 'antd';
import Sketch from 'components/BizBuilder/Sketch';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import { createStructuredSelector } from 'reselect';
import * as selectors from '../../../../../containers/common/Auth/selectors';
import DeptModal from './DeptModal';
import PagesStyled from './PagesStyled';
import MaterialItemTable from './MaterialItemTable';
import MaterialTable from './MaterialTable';
const { Option } = Select;
const currentYear = new Date().getFullYear();

// 권한에 따라 handleDeptSearch() 검색버튼이 보이고 안보이고 해야함.

class pages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deptList: [],
      modalVisible: false,
      userInfo: {},
      searchRow: {},
      years: [],
      selectYear: 0,
      divisionInfo: {},
      deptFirstUserInfo: {},
      deptFirstUserId: -1,
      elMaterialData: {},
      searchFlag: false,
    };
  }

  handleAppStart = () => {
    const { result, profile, id, getCallDataHandler } = this.props;
    const deptList = (result && result.deptList && result.deptList.result) || [];
    const userInfo = deptList.find(d => d.DEPT_ID === profile.DEPT_ID && d) || {};
    // const divisionInfo = deptList.find(d => d.PRNT_ID === profile.DEPT_ID && d) || {}; // 관리자의 경우 상위 사업부 존재 X
    const divisionInfo = deptList.find(d => d.PRNT_ID === 900 && d) || {}; // 상위 사업부 테스트용
    this.setState({
      deptList,
      userInfo,
      divisionInfo,
    });
    const apiAry = [
      {
        key: 'deptFirstUserId',
        type: 'POST',
        url: '/api/common/v1/account/getFirstDeptUser',
        // params: { DEPT_ID: profile.DEPT_ID }, 관리자ID 에는 데이터가 없음
        params: { DEPT_ID: 1150 }, // 테스트용
      },
      {
        key: 'elMaterialData',
        type: 'POST',
        url: '/api/eshs/v1/common/eshsElNoAbno',
        params: { CHK_YEAR: String(currentYear), FROM_DEPT_CD: userInfo.DEPT_CD },
      },
    ];

    getCallDataHandler(id, apiAry, this.setUserData);
  };

  setUserData = () => {
    const { result, id, getCallDataHandler } = this.props;
    const deptFirstUserId = (result && result.deptFirstUserId && result.deptFirstUserId.USER_ID) || -1;
    const elMaterialData = (result && result.elMaterialData && result.elMaterialData.data) || {};
    if (deptFirstUserId !== -1) {
      const apiAry = [
        {
          key: 'deptFirstUserInfo',
          type: 'POST',
          url: '/api/eshs/v1/common/eshsHstDeptAndFrDept',
          params: { USER_ID: deptFirstUserId },
        },
      ];

      getCallDataHandler(id, apiAry, this.setDeptFirstUserInfo);
    }
    this.setState({ deptFirstUserId, elMaterialData });
  };

  setDeptFirstUserInfo = () => {
    const { result } = this.props;
    const deptFirstUserInfo = (result && result.deptFirstUserInfo && result.deptFirstUserInfo.data) || {};
    this.setState({ deptFirstUserInfo });
  };

  componentDidMount = () => {
    const { id, getCallDataHandler, apiAry } = this.props;
    getCallDataHandler(id, apiAry, this.handleAppStart);
    const years = [];
    for (let i = 2006; i <= currentYear + 1; i++) {
      years.push(String(i));
    }
    this.setState({ years, selectYear: currentYear, searchFlag: false });
  };

  handleModal = () => {
    const { modalVisible } = this.state;
    this.setState({
      modalVisible: !modalVisible,
    });
  };

  handleModalRowClick = searchRow => {
    console.debug('handleModalRowClick', searchRow);
    const { userInfo } = this.state;
    this.setState({ searchRow });
    this.handleModal();
  };

  handleYearChange = e => {
    this.setState({ selectYear: e });
  };

  handleDeptSearch = () => {
    const { id, getCallDataHandler } = this.props;
    const { selectYear, searchRow, userInfo } = this.state;
    console.debug('여기는 handleDeptSearch', selectYear, searchRow);
    if (JSON.stringify(searchRow) != '{}') {
      this.setState({ searchFlag: !(userInfo.DEPT_ID === searchRow.DEPT_ID) });
      const apiAry = [
        {
          key: 'elMaterialData',
          type: 'POST',
          url: '/api/eshs/v1/common/eshsElNoAbno',
          params: { CHK_YEAR: String(selectYear), FROM_DEPT_CD: searchRow.DEPT_CD },
        },
      ];
      getCallDataHandler(id, apiAry, this.setElMaterialData);
    }
  };

  setElMaterialData = () => {
    const { result } = this.props;
    const elMaterialData = (result && result.elMaterialData && result.elMaterialData.data) || {};
    this.setState({ elMaterialData });
    console.debug('111111111111111111111', elMaterialData);
  };

  render() {
    const { profile } = this.props;
    const { years, selectYear, searchRow, userInfo, divisionInfo, deptFirstUserInfo, elMaterialData, searchFlag } = this.state;
    console.debug('currentYear', currentYear);
    console.debug('userInfo', userInfo);
    console.debug('this.state', this.state);
    const { state } = this;
    const { props } = this;
    return (
      <PagesStyled>
        <StyledViewDesigner>
          <Sketch>
            <Row>
              <Col span={10}>
                <div>
                  <span>평가년도</span>
                  <Select defaultValue={selectYear || currentYear} style={{ width: 130, padding: 3 }} onChange={this.handleYearChange}>
                    {years.map(y => (
                      <Option key={y} value={y}>
                        {y}
                      </Option>
                    ))}
                  </Select>
                  &nbsp; <span>부서코드 </span>
                  <Input
                    name="DEPT_CD"
                    value={searchRow.DEPT_CD ? searchRow.DEPT_CD : userInfo.DEPT_CD}
                    style={{ width: 150 }}
                    readOnly
                    placeholder="부서코드"
                  />
                  <Button shape="circle" icon="search" onClick={this.handleModal} />
                  <Modal title="주관회사 부서 검색" visible={this.state.modalVisible} onCancel={this.handleModal} width={900} height={600} footer={[null]}>
                    <DeptModal deptList={this.state.deptList || []} handleModalRowClick={this.handleModalRowClick} handleModal={this.handleModal}></DeptModal>
                  </Modal>
                  <Input value={searchRow.NAME_KOR ? searchRow.NAME_KOR : userInfo.NAME_KOR} style={{ width: 150 }} readOnly />
                  <Button onClick={this.handleDeptSearch}>검색</Button>
                </div>
                <hr />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <MaterialTable
                  divisionInfo={divisionInfo}
                  deptFirstUserInfo={deptFirstUserInfo}
                  profile={profile}
                  elMaterialData={elMaterialData}
                  searchFlag={searchFlag}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={24}>
                <MaterialItemTable searchFlag={searchFlag} />
              </Col>
            </Row>
          </Sketch>
        </StyledViewDesigner>
      </PagesStyled>
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
      url: '/api/common/v1/account/getDeptList',
    },
  ],
};
export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(pages);
