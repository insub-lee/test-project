/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
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
    const chk_year = (formData && formData.CHK_YEAR) || '0';
    const dept_cd = (formData && formData.searchRow && formData.searchRow.DEPT_CD) || (formData && formData.myDept && formData.myDept.DEPT_CD) || '0';
    const apiAry = [
      {
        key: 'itemList',
        type: 'GET',
        url: `/api/eshs/v1/common/EshsEiNaturaList/${chk_year}/${dept_cd}`,
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
      <ContentsWrapper>
        <div className="selSaveWrapper">
          <DeptSearchBar {...this.props} handleSearchOnClick={this.handleSearchOnClick} />
        </div>
        <div>
          <ItemTable {...this.props} handleSearchOnClick={this.handleSearchOnClick} />
        </div>
      </ContentsWrapper>
    );
  }
}

MainPage.defaultProps = {
  id: 'eiNatural',
  getCallDataHandler: () => {},
  result: {},
};
export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(MainPage);
