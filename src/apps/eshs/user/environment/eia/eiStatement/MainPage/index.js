/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import { createStructuredSelector } from 'reselect';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import * as selectors from 'containers/common/Auth/selectors';
import DeptSearchBar from '../../eiDeptSearchBar';
import ItemTable from '../ItemTable';
import MaterialTable from '../../eiMaterialTable';

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
    const { id, getCallDataHandler, formData, changeFormData } = this.props;
    const materialCnt = (formData && formData.materialCnt) || 0;
    console.debug('materialCnt 111 ', materialCnt);
    if (!materialCnt) {
      changeFormData(id, 'itemList', []);
      return;
    }
    const from_dept_cd = (formData && formData.materialData && formData.materialData.FROM_DEPT_CD) || '';
    const chk_year = (formData && formData.CHK_YEAR) || '0';
    const apiAry = [
      {
        key: 'itemList',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsEiStatementList/${chk_year}/${from_dept_cd}`,
      },
    ];
    getCallDataHandler(id, apiAry, this.setItemList);
  };

  setItemList = () => {
    const { result, id, changeFormData } = this.props;
    const itemList = (result && result.itemList && result.itemList.list) || [];

    changeFormData(
      id,
      'itemList',
      itemList.map(i =>
        i.MANAGE_INPUT_OUPUT
          ? i
          : { ...i, MANAGE_INPUT_OUPUT: '1', IMPROVEMENT_PLAN_REPORT: '0', DOCUMENTATION: '0', HAPPEN_PULSE: '1', IMPORTANT_ENV_IMPACT_SELECTION: 'N' },
      ),
    );
  };

  render() {
    const { formData } = this.props;
    return (
      <ContentsWrapper>
        <div className="selSaveWrapper">
          <DeptSearchBar {...this.props} handleSearchOnClick={this.handleSearchOnClick} />
        </div>
        <div>
          <MaterialTable {...this.props} handleSearchOnClick={this.handleSearchOnClick} />
        </div>
        <div>
          <ItemTable {...this.props} handleSearchOnClick={this.handleSearchOnClick} />
        </div>
      </ContentsWrapper>
    );
  }
}

MainPage.defaultProps = {
  id: 'eiStatement',
  getCallDataHandler: () => {},
  result: {},
};
export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(MainPage);
