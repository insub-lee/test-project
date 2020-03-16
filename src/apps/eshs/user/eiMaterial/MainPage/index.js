/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import { createStructuredSelector } from 'reselect';
import * as selectors from '../../../../../containers/common/Auth/selectors';
import DeptSearchBar from '../../eiDeptSearchBar';
import ItemTable from './ItemTable';
import MaterialTable from '../../eiMaterialTable';
import MainPageStyled from './MainPageStyled';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSearchOnClick = () => {
    const { id, getCallDataHandler, formData } = this.props;
    const chk_year = (formData && formData.CHK_YEAR) || '0';
    const dept_cd = (formData && formData.searchRow && formData.searchRow.DEPT_CD) || (formData && formData.myDept && formData.myDept.DEPT_CD) || '0';
    const apiAry = [
      {
        key: 'materialData',
        type: 'GET',
        url: `/api/eshs/v1/common/EshsGetEiMaterial/${chk_year}/${dept_cd}`,
      },
    ];
    getCallDataHandler(id, apiAry, this.handleSetMaterial);
  };

  handleSetMaterial = () => {
    const { id, result, changeFormData } = this.props;
    // const itemList = (result && result.itemList && result.itemList.list) || [];
    const materialData = (result && result.materialData && result.materialData.result) || {};
    const materialCnt = (result && result.materialData && result.materialData.materialCnt) || 0;
    // changeFormData(id, 'itemList', itemList);
    changeFormData(id, 'materialData', materialData);
    changeFormData(id, 'materialCnt', materialCnt);
    this.itemListReload();
  };

  itemListReload = () => {
    const { id, getCallDataHandler, formData } = this.props;
    const req_no = (formData && formData.materialData && formData.materialData.REQ_NO) || '';
    const chk_year = (formData && formData.CHK_YEAR) || '0';
    const apiAry = [
      {
        key: 'itemList',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsEiMaterialItemList/${chk_year}/${req_no}`,
      },
    ];

    getCallDataHandler(id, apiAry, this.setItemList);
  };

  setItemList = () => {
    const { result, id, changeFormData } = this.props;
    const itemList = (result && result.itemList && result.itemList.list) || [];
    changeFormData(id, 'itemList', itemList);
  };

  render() {
    const { formData } = this.props;
    const materialData = (formData && formData.materialData) || {};
    const materialCnt = (formData && formData.materialCnt) || 0;
    const searchFlag = (formData && formData.searchFlag) || false;
    return (
      <MainPageStyled>
        <StyledViewDesigner>
          <Sketch>
            <Row>
              <Col span={10}>
                <DeptSearchBar {...this.props} handleSearchOnClick={this.handleSearchOnClick} />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <MaterialTable {...this.props} handleSearchOnClick={this.handleSearchOnClick} />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <ItemTable {...this.props} handleSearchOnClick={this.handleSearchOnClick} />
              </Col>
            </Row>
          </Sketch>
        </StyledViewDesigner>
      </MainPageStyled>
    );
  }
}

MainPage.defaultProps = {
  id: 'eiMaterial',
  getCallDataHandler: () => {},
  result: {},
};
export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(MainPage);
