/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input, Select, Row, Col } from 'antd';
import Sketch from 'components/BizBuilder/Sketch';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import { createStructuredSelector } from 'reselect';
import * as selectors from '../../../../../containers/common/Auth/selectors';
import DeptModal from './DeptModal';
import PagesStyled from './PagesStyled';

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
    };
  }

  handleAppStart = () => {
    const { result, profile, id, getCallDataHandler } = this.props;
    const deptList = (result && result.deptList && result.deptList.result) || [];
    this.setState({
      deptList,
    });
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

  render() {
    const { formData } = this.props;
    const { years, searchRow } = this.state;
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
                  <Input name="DEPT_CD" value={searchRow.DEPT_CD} style={{ width: 150 }} readOnly placeholder="부서코드" />
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
              <Col span={24}></Col>
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

pages.defaultProps = {
  id: 'eiNatural',
  getCallDataHandler: () => {},
  result: {},
  apiAry: [
    {
      key: 'deptList',
      type: 'GET',
      url: '/api/common/v1/account/getDeptList',
    },
  ],
};
export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(pages);
