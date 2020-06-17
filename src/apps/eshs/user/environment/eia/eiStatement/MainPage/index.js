/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
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
    const chkYear = (formData && formData.CHK_YEAR) || '0';
    const deptId = (formData && formData.searchRow && formData.searchRow.DEPT_ID) || (formData && formData.myDept && formData.myDept.DEPT_ID) || '0';
    const apiAry = [
      {
        key: 'materialData',
        type: 'GET',
        url: `/api/eshs/v1/common/EshsGetEiMaterial/${chkYear}/${deptId}`,
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
    if (!materialCnt) {
      changeFormData(id, 'itemList', []);
      return;
    }
    const fromDeptId = (formData && formData.materialData && formData.materialData.FROM_DEPT_ID) || '';
    const chkYear = (formData && formData.CHK_YEAR) || '0';
    const apiAry = [
      {
        key: 'itemList',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsEiStatementList/${chkYear}/${fromDeptId}`,
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
      <StyledContentsWrapper>
        <DeptSearchBar {...this.props} handleSearchOnClick={this.handleSearchOnClick} />
        <div>
          <MaterialTable {...this.props} handleSearchOnClick={this.handleSearchOnClick} />
        </div>
        <div>
          <ItemTable {...this.props} handleSearchOnClick={this.handleSearchOnClick} />
        </div>
      </StyledContentsWrapper>
    );
  }
}

MainPage.defaultProps = {
  id: 'eiStatement',
  getCallDataHandler: () => {},
  result: {},
};
export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(MainPage);
