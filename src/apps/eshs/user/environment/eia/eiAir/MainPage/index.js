/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const { sagaKey: id, getCallDataHandler, formData } = this.props;
    const chkYear = (formData && formData.CHK_YEAR) || '0';
    const deptId = (formData && formData.searchRow && formData.searchRow.DEPT_ID) || (formData && formData.myDept && formData.myDept.DEPT_ID) || '0';
    const apiAry = [
      {
        key: 'itemList',
        type: 'GET',
        url: `/api/eshs/v1/common/EshsEiAirList/${chkYear}/${deptId}`,
      },
    ];
    getCallDataHandler(id, apiAry, this.handleSetItemList);
  };

  handleSetItemList = () => {
    const { sagaKey: id, result, changeFormData } = this.props;
    const itemList = (result && result.itemList && result.itemList.list) || [];
    changeFormData(id, 'itemList', itemList);
  };

  render() {
    const { columns } = this.state;
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

MainPage.propTypes = {};

MainPage.defaultProps = {
  id: 'eiAir',
  getCallDataHandler: () => {},
  result: {},
};
export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(MainPage);
