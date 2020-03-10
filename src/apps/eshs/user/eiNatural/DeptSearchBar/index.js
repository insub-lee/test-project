/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input, Select, Row, Col } from 'antd';
import { createStructuredSelector } from 'reselect';
import DeptModal from './DeptModal';

const { Option } = Select;
const currentYear = new Date().getFullYear();

class DeptSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      years: [],
    };
  }

  componentDidMount = () => {
    const { id, getCallDataHandler, changeFormData } = this.props;
    const years = [];
    for (let i = 2006; i <= currentYear + 1; i++) {
      years.push(String(i));
    }
    const apiAry = [
      {
        key: 'deptList',
        type: 'GET',
        url: '/api/common/v1/account/getDeptList',
      },
    ];
    this.setState({ years });
    changeFormData(id, 'CHK_YEAR', String(currentYear));
    changeFormData(id, 'searchFlag', false);
    getCallDataHandler(id, apiAry, this.handleAppStart);
  };

  handleAppStart = () => {
    const { result, profile, id, changeFormData } = this.props;
    const deptList = (result && result.deptList && result.deptList.result) || [];
    const myDept = deptList.find(d => d.DEPT_ID === profile.DEPT_ID);
    changeFormData(id, 'myDept', myDept);
  };

  handleModal = () => {
    const { modalVisible } = this.state;
    this.setState({
      modalVisible: !modalVisible,
    });
  };

  handleModalRowClick = searchRow => {
    const { id, changeFormData } = this.props;
    changeFormData(id, 'searchRow', searchRow);
    this.handleModal();
  };

  handleYearChange = e => {
    const { id, changeFormData } = this.props;
    changeFormData(id, 'CHK_YEAR', e);
  };

  handleDeptSearch = () => {
    const { id, formData, changeFormData } = this.props;
    const searchDeptId = (formData && formData.searchRow && formData.searchRow.DEPT_ID) || '';
    if (searchDeptId) {
      const searchFlag = !(formData.myDept.DEPT_ID === searchDeptId);
      changeFormData(id, 'searchFlag', searchFlag);
    }
  };

  render() {
    const { formData, result } = this.props;
    const { years } = this.state;
    const deptList = (result && result.deptList && result.deptList.result) || [];
    const myDept = (formData && formData.myDept) || {};
    const searchRow = (formData && formData.searchRow) || {};

    return (
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
            <Input name="DEPT_CD" value={searchRow.DEPT_CD ? searchRow.DEPT_CD : myDept.DEPT_CD} style={{ width: 150 }} readOnly placeholder="부서코드" />
            <Button shape="circle" icon="search" onClick={this.handleModal} />
            <Modal title="주관회사 부서 검색" visible={this.state.modalVisible} onCancel={this.handleModal} width={900} height={600} footer={[null]}>
              <DeptModal deptList={deptList || []} handleModalRowClick={this.handleModalRowClick} handleModal={this.handleModal}></DeptModal>
            </Modal>
            <Input value={searchRow.NAME_KOR ? searchRow.NAME_KOR : myDept.NAME_KOR} style={{ width: 150 }} readOnly />
            <Button onClick={this.handleDeptSearch}>검색</Button>
          </div>
          <hr />
        </Col>
      </Row>
    );
  }
}

DeptSearchBar.defaultProps = {
  id: 'eiNatural',
  getCallDataHandler: () => {},
  result: {},
};
export default DeptSearchBar;
