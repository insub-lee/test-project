/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import * as selectors from 'containers/common/Auth/selectors';
import PropTypes from 'prop-types';
import DeptSearchBar from '../../eiDeptSearchBar';
import ItemTable from '../ItemTable';
import MaterialTable from '../../eiMaterialTable';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSearchOnClick = (reqNo = undefined) => {
    const { id, getCallDataHandler, formData, spinningOn } = this.props;
    const chkYear = (formData && formData.CHK_YEAR) || '0';
    const deptId = (formData && formData.searchRow && formData.searchRow.DEPT_ID) || (formData && formData.myDept && formData.myDept.DEPT_ID) || '0';
    const apiAry = [
      reqNo
        ? {
            key: 'materialData',
            type: 'GET',
            url: `/api/eshs/v1/common/EshsGetEiMaterial?REQ_NO=${reqNo}`,
          }
        : {
            key: 'materialData',
            type: 'GET',
            url: `/api/eshs/v1/common/EshsGetEiMaterial?CHK_YEAR=${chkYear}&FROM_DEPT_ID=${deptId}`,
          },
    ];
    spinningOn();
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
    const { id, getCallDataHandler, formData, changeFormData, spinningOff } = this.props;
    const materialCnt = (formData && formData.materialCnt) || 0;
    if (!materialCnt) {
      changeFormData(id, 'itemList', []);
      return spinningOff();
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
    const { result, id, changeFormData, spinningOff } = this.props;
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
    spinningOff();
  };

  render() {
    const { formData, deptSearchBarVisible } = this.props;
    return (
      <StyledContentsWrapper>
        <DeptSearchBar {...this.props} handleSearchOnClick={reqNo => this.handleSearchOnClick(reqNo)} deptSearchBarVisible={deptSearchBarVisible} />
        <div>
          <MaterialTable {...this.props} handleSearchOnClick={reqNo => this.handleSearchOnClick(reqNo)} />
        </div>
        <div>
          <ItemTable {...this.props} handleSearchOnClick={reqNo => this.handleSearchOnClick(reqNo)} />
        </div>
      </StyledContentsWrapper>
    );
  }
}
MainPage.propTypes = {
  id: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.object,
};
MainPage.defaultProps = {
  id: 'eiStatement',
  getCallDataHandler: () => {},
  result: {},
};
export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(MainPage);
