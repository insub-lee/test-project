/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input, Select, Row, Col } from 'antd';
import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import { createStructuredSelector } from 'reselect';
import * as selectors from '../../../../../containers/common/Auth/selectors';
import DeptSearchBar from '../DeptSearchBar';
import NaturalItemTable from '../NaturalItemTable';
import PagesStyled from './PagesStyled';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <PagesStyled>
        <StyledViewDesigner>
          <Sketch>
            <Row>
              <DeptSearchBar {...this.props} />
            </Row>
            <Row>
              <Col span={24}>
                <NaturalItemTable {...this.props} />
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={24}></Col>
            </Row>
          </Sketch>
        </StyledViewDesigner>
      </PagesStyled>
    );
  }
}

MainPage.defaultProps = {
  id: 'eiNatural',
  getCallDataHandler: () => {},
  result: {},
};
export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(MainPage);
