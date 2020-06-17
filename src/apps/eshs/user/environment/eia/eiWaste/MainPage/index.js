/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import * as selectors from 'containers/common/Auth/selectors';
import DeptSearchBar from '../../eiDeptSearchBar';
import ItemTable from '../ItemTable';

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
        key: 'itemList',
        type: 'GET',
        url: `/api/eshs/v1/common/EshsEiWasteList/${chkYear}/${deptId}`,
      },
    ];
    getCallDataHandler(id, apiAry, this.handleSetItemList);
  };

  handleSetItemList = () => {
    const { id, result, changeFormData } = this.props;
    const itemList = (result && result.itemList && result.itemList.list) || [];
    changeFormData(id, 'itemList', itemList);
  };

  render() {
    return (
      <StyledContentsWrapper>
        <DeptSearchBar {...this.props} handleSearchOnClick={this.handleSearchOnClick} />
        <div>
          <ItemTable {...this.props} handleSearchOnClick={this.handleSearchOnClick} />
        </div>
      </StyledContentsWrapper>
    );
  }
}

MainPage.defaultProps = {
  id: 'eiWaste',
  getCallDataHandler: () => {},
  result: {},
};
export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(MainPage);
