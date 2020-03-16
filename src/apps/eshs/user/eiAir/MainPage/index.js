/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import { createStructuredSelector } from 'reselect';
import * as selectors from '../../../../../containers/common/Auth/selectors';
import DeptSearchBar from '../../eiDeptSearchBar';
import ItemTable from '../ItemTable';
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
        key: 'itemList',
        type: 'GET',
        url: `/api/eshs/v1/common/EshsEiAirList/${chk_year}/${dept_cd}`,
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
  id: 'eiAir',
  getCallDataHandler: () => {},
  result: {},
};
export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(MainPage);
