/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input, Select, Row, Col } from 'antd';
import Sketch from 'components/BizBuilder/Sketch';
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
      searchRow: {},
      years: [],
      deptFirstUserId: -1,
      eiMaterialData: {},
      searchFlag: false,
      initEiMaterial: {},
      eiMaterialItemList: [],
    };
  }

  handleAppStart = () => {
    const { result, profile, id, getCallDataHandler } = this.props;
    const deptList = (result && result.deptList && result.deptList.result) || [];
    // const userInfo = deptList.find(d => d.DEPT_ID === profile.DEPT_ID && d) || {};
    const initEiMaterial = (result && result.initEiMaterial && result.initEiMaterial.result) || {};
    // const divisionInfo = deptList.find(d => d.PRNT_ID === profile.DEPT_ID && d) || {}; // 관리자의 경우 상위 사업부 존재 X
    const divisionInfo = deptList.find(d => d.PRNT_ID === 900 && d) || {}; // 상위 사업부 테스트용
    this.setState({
      deptList,
      initEiMaterial: { ...initEiMaterial, CHK_YEAR: String(currentYear) },
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
        key: 'eiMaterialData',
        type: 'POST',
        url: '/api/eshs/v1/common/eshsEiNoAbno',
        params: { CHK_YEAR: String(currentYear), FROM_DEPT_CD: initEiMaterial.FROM_DEPT_CD },
      },
    ];

    getCallDataHandler(id, apiAry, this.setUserData);
  };

  setUserData = () => {
    const { result, id, getCallDataHandler, changeFormData } = this.props;
    const deptFirstUserId = (result && result.deptFirstUserId && result.deptFirstUserId.USER_ID) || -1;
    const eiMaterialData = (result && result.eiMaterialData && result.eiMaterialData.data) || {};
    if (deptFirstUserId !== -1) {
      const apiAry = [
        {
          key: 'deptFirstUserInfo',
          type: 'POST',
          url: '/api/eshs/v1/common/eshsHstDeptAndFrDept',
          params: { USER_ID: deptFirstUserId },
        },
      ];
      changeFormData(id, 'FROM_BUILDING_NM', eiMaterialData.FROM_BUILDING_NM);
      changeFormData(id, 'TO_BUILDING_NM', eiMaterialData.TO_BUILDING_NM);
      changeFormData(id, 'REQ_NO', eiMaterialData.REQ_NO);
      getCallDataHandler(id, apiAry, this.setDeptFirstUserInfo);
    }
    this.setState({ deptFirstUserId, eiMaterialData });
  };

  setDeptFirstUserInfo = () => {
    const { result } = this.props;
    const { initEiMaterial } = this.state;
    const deptFirstUserInfo = (result && result.deptFirstUserInfo && result.deptFirstUserInfo.data) || {};
    const eiMaterialItemList = (result && result.eiMaterialItemList && result.eiMaterialItemList.result) || [];
    this.setState({
      eiMaterialItemList,
      initEiMaterial: { ...initEiMaterial, FROM_DEPT_MANAGER_NM: deptFirstUserInfo.NAME_KOR, FROM_DEPT_MANAGER_NO: deptFirstUserInfo.EMP_NO },
    });
    this.handleItemListReload();
  };

  componentDidMount = () => {
    const { id, getCallDataHandler, apiAry, changeFormData } = this.props;
    getCallDataHandler(id, apiAry, this.handleAppStart);
    changeFormData(id, 'CHK_YEAR', String(currentYear));
    const years = [];
    for (let i = 2006; i <= currentYear + 1; i++) {
      years.push(String(i));
    }
    this.setState({ years, searchFlag: false });
  };

  handleModal = () => {
    const { modalVisible } = this.state;
    this.setState({
      modalVisible: !modalVisible,
    });
  };

  handleModalRowClick = searchRow => {
    this.setState({ searchRow });
    this.handleModal();
  };

  handleYearChange = e => {
    const { id, changeFormData } = this.props;
    const { initEiMaterial } = this.state;
    changeFormData(id, 'CHK_YEAR', e);
    this.setState({ initEiMaterial: { ...initEiMaterial, CHK_YEAR: e } });
  };

  handleDeptSearch = () => {
    const { id, getCallDataHandler, formData } = this.props;
    const { searchRow, initEiMaterial } = this.state;
    this.setState({ searchFlag: !(searchRow.DEPT_ID ? initEiMaterial.FROM_DEPT_ID === searchRow.DEPT_ID : true) });
    const apiAry = [
      {
        key: 'eiMaterialData',
        type: 'POST',
        url: '/api/eshs/v1/common/eshsEiNoAbno',
        params: { CHK_YEAR: formData.CHK_YEAR, FROM_DEPT_CD: searchRow.DEPT_CD ? searchRow.DEPT_CD : initEiMaterial.FROM_DEPT_CD },
      },
    ];
    getCallDataHandler(id, apiAry, this.setEiMaterial);
  };

  setEiMaterial = () => {
    const { result, id, changeFormData } = this.props;
    const eiMaterialData = (result && result.eiMaterialData && result.eiMaterialData.data) || {};
    changeFormData(id, 'FROM_BUILDING_NM', eiMaterialData.FROM_BUILDING_NM);
    changeFormData(id, 'TO_BUILDING_NM', eiMaterialData.TO_BUILDING_NM);
    changeFormData(id, 'REQ_NO', eiMaterialData.REQ_NO);
    this.setState({ eiMaterialData });
    this.handleItemListReload();
  };

  handleItemListReload = () => {
    const { id, getCallDataHandler, formData } = this.props;
    // /api/eshs/v1/common/eshsEiNoAbnoItem
    const apiAry = [
      {
        key: 'eiMaterialItemList',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsEiNoAbnoItemList/${formData.CHK_YEAR}/${formData.REQ_NO}`,
      },
    ];

    getCallDataHandler(id, apiAry, this.setEiMaterialItemList);
  };

  setEiMaterialItemList = () => {
    const { result } = this.props;
    const eiMaterialItemList = (result && result.eiMaterialItemList && result.eiMaterialItemList.result) || [];
    this.setState({ eiMaterialItemList });
  };

  render() {
    const { profile, id, submitHandlerBySaga, formData, changeFormData, getCallDataHandler, setFormData } = this.props;
    const { years, searchRow, deptFirstUserInfo, eiMaterialData, searchFlag, initEiMaterial, eiMaterialItemList } = this.state;
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
                  <Select value={formData.CHK_YEAR} style={{ width: 130, padding: 3 }} onChange={this.handleYearChange}>
                    {years.map(y => (
                      <Option key={y} value={y}>
                        {y}
                      </Option>
                    ))}
                  </Select>
                  &nbsp; <span>부서코드 </span>
                  <Input
                    name="DEPT_CD"
                    value={searchRow.DEPT_CD ? searchRow.DEPT_CD : initEiMaterial.FROM_DEPT_CD}
                    style={{ width: 150 }}
                    readOnly
                    placeholder="부서코드"
                  />
                  <Button shape="circle" icon="search" onClick={this.handleModal} />
                  <Modal title="주관회사 부서 검색" visible={this.state.modalVisible} onCancel={this.handleModal} width={900} height={600} footer={[null]}>
                    <DeptModal deptList={this.state.deptList || []} handleModalRowClick={this.handleModalRowClick} handleModal={this.handleModal}></DeptModal>
                  </Modal>
                  <Input value={searchRow.NAME_KOR ? searchRow.NAME_KOR : initEiMaterial.FROM_DEPT_NM} style={{ width: 150 }} readOnly />
                  <Button onClick={this.handleDeptSearch}>검색</Button>
                </div>
                <hr />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <MaterialTable
                  deptFirstUserInfo={deptFirstUserInfo}
                  profile={profile}
                  formData={formData}
                  eiMaterialData={eiMaterialData}
                  initEiMaterial={initEiMaterial}
                  searchFlag={searchFlag}
                  id={id}
                  submitHandlerBySaga={submitHandlerBySaga}
                  changeFormData={changeFormData}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={24}>
                <MaterialItemTable
                  searchFlag={searchFlag}
                  formData={formData}
                  changeFormData={changeFormData}
                  id={id}
                  getCallDataHandler={getCallDataHandler}
                  submitHandlerBySaga={submitHandlerBySaga}
                  setFormData={setFormData}
                  eiMaterialItemList={eiMaterialItemList}
                  handleItemListReload={this.handleItemListReload}
                />
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
    {
      key: 'initEiMaterial',
      type: 'GET',
      url: '/api/eshs/v1/common/eshsEiNoAbno',
    },
  ],
};
export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(pages);
