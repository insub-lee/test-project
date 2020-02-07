/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Select } from 'antd';

const { Option } = Select;

class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hst_cmpny_cd: '',
      dept_cd: '',
      emp_nm: '',
      site: '',
      tel: '',
      emp_position: '',
      duty: '',
      searchDept: [],
    };
  }

  componentDidMount = () => {};

  handleSearchDept = e => {
    const { id, getCallDataHanlder } = this.props;
    const apiAry = [
      {
        key: 'deptList',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsHstCmpnyDept?CMPNY_CD=${e}`,
      },
    ];
    getCallDataHanlder(id, apiAry, this.setDept);
  };

  setDept = () => {
    const { result } = this.props;
    const searchDept = (result && result.deptList && result.deptList.eshsHstCmpnyDeptListByCmpny) || [];
    this.setState({
      searchDept,
    });
  };

  handleInputChange = e => {
    const { id, changeFormData } = this.props;
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { result } = this.props;
    const { searchDept } = this.state;
    const cmpnyList = (result && result.cmpnyList && result.cmpnyList.eshsHstCmpnyList) || [];
    const dfValue = cmpnyList.length ? cmpnyList[0].hst_cmpny_cd : ' ';
    return (
      <div>
        <table>
          <tr>
            <td>회사</td>
            <td>
              <Select defaultValue={dfValue} style={{ width: 130, padding: 3 }} onChange={this.handleSearchDept}>
                {cmpnyList.map(c => (
                  <Option key={c.hst_cmpny_cd} style={{ height: 30 }}>
                    {c.hst_cmpny_nm}
                  </Option>
                ))}
              </Select>
            </td>
          </tr>
          <tr>
            <td>이름</td>
            <td>
              <Input name="emp_nm" onChange={this.handleInputChange} />
            </td>
          </tr>
          <tr>
            <td>직위</td>
            <td>
              <Input name="emp_position" onChange={this.handleInputChange} />
            </td>
          </tr>
          <tr>
            <td>직책</td>
            <td>
              <Input name="duty" onChange={this.handleInputChange} />
            </td>
          </tr>
          <tr>
            <td>부서</td>
            <td>
              <Select defaultValue="" style={{ width: 130, padding: 3 }}>
                {searchDept.map(d => (
                  <Option key={`${d.hst_cmpny_cd}&&${d.dept_cd}`} style={{ height: 30 }}>
                    {d.dept_nm}
                  </Option>
                ))}
              </Select>
            </td>
          </tr>
          <tr>
            <td>근무지</td>
            <td>
              <Select defaultValue="청주" style={{ width: 110, padding: 3 }} onChange={this.handleSiteOnChange}>
                <Option value="청주">청주</Option>
                <Option value="구미">구미</Option>
              </Select>
            </td>
          </tr>
          <tr>
            <td>사내전화</td>
            <td>
              <Input name="tel" onChange={this.handleInputChange} />
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

UserModal.defaultProps = {};
export default UserModal;
