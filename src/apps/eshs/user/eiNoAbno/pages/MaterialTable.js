/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Select, Button, Table } from 'antd';

class MaterialTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FROM_BUILDING_NM: '',
      TO_BUILDING_NM: '',
    };
  }

  handleSaveOnClick = action => {
    if (action === 'SAVE') {
    } else if (action === 'UPDATE') {
    }
  };

  handleInputOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { divisionInfo, profile, deptFirstUserInfo, elMaterialData, searchFlag } = this.props;
    if (searchFlag) {
      return (
        <div className="MaterialTable">
          <table>
            <tbody>
              <tr>
                <td>
                  <span>사업부명</span>
                </td>
                <td>
                  <Input value="" />
                </td>
                <td colSpan={2}>
                  <span>공장/FAB/건물명</span>
                </td>
                <td colSpan={2}>
                  <Input value="" />
                </td>
                <td>
                  <span>조사대상영역</span>
                </td>
                <td>
                  <Input value="" />
                </td>
              </tr>
              <tr>
                <td>
                  <span>부서명</span>
                </td>
                <td>
                  <Input value="" />
                </td>
                <td>
                  <span>부서장</span>
                </td>
                <td>
                  <Input value="" />
                </td>
                <td>
                  <span>작성자</span>
                </td>
                <td>
                  <Input value="" />
                </td>
                <td>
                  <span>작성일</span>
                </td>
                <td>
                  <span> </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>주관부서</span>
                </td>
                <td>
                  <Input value="" />
                </td>
                <td>
                  <span>부서장</span>
                </td>
                <td>
                  <Input value="" />
                </td>
                <td>
                  <span>검토자</span>
                </td>
                <td>
                  <Input value="" />
                </td>
                <td>
                  <span>검토일</span>
                </td>
                <td>
                  <span> </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
    if (JSON.stringify(elMaterialData) == '{}') {
      return (
        <div className="MaterialTable">
          <table>
            <thead>
              <tr>
                <td colSpan={8}>
                  <Button onClick={() => this.handleSaveOnClick('SAVE')}>저장</Button>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span>사업부명</span>
                </td>
                <td>
                  <Input name="division_nm" value={divisionInfo.NAME_KOR || 'null'} readOnly />
                </td>
                <td colSpan={2}>
                  <span>공장/FAB/건물명</span>
                </td>
                <td colSpan={2}>
                  <Input name="FROM_BUILDING_NM" onChange={this.handleInputOnChange} />
                </td>
                <td>
                  <span>조사대상영역</span>
                </td>
                <td>
                  <Input name="TO_BUILDING_NM" onChange={this.handleInputOnChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <span>부서명</span>
                </td>
                <td>
                  <Input name="from_dept_nm" value={profile.DEPT_NAME_KOR} readOnly />
                </td>
                <td>
                  <span>부서장</span>
                </td>
                <td>
                  <Input name="from_dept_manager_no" value={deptFirstUserInfo.NAME_KOR} readOnly />
                </td>
                <td>
                  <span>작성자</span>
                </td>
                <td>
                  <Input name="from_emp_nm" value={profile.NAME_KOR} readOnly />
                </td>
                <td>
                  <span>작성일</span>
                </td>
                <td>
                  <Input />
                </td>
              </tr>
              <tr>
                <td>
                  <span>주관부서</span>
                </td>
                <td>
                  <Input name="to_dept_nm" value="환경안전팀" readOnly />
                </td>
                <td>
                  <span>부서장</span>
                </td>
                <td>
                  <Input name="to_dept_manager_nm" value="민기식" readOnly />
                </td>
                <td>
                  <span>검토자</span>
                </td>
                <td>
                  <Input name="to_emp_nm" value="함종호" readOnly />
                </td>
                <td>
                  <span>검토일</span>
                </td>
                <td>
                  <Input />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
    if (JSON.stringify(elMaterialData) != '{}' && !searchFlag) {
      return (
        <div className="MaterialTable">
          <table>
            <thead>
              <tr>
                <td colSpan={8}>
                  <Button onClick={() => this.handleSaveOnClick('UPDATE')}>저장</Button>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span>사업부명</span>
                </td>
                <td>
                  <Input name="DIVISION_NM" value={elMaterialData.DIVISION_NM || 'null'} readOnly />
                </td>
                <td colSpan={2}>
                  <span>공장/FAB/건물명</span>
                </td>
                <td colSpan={2}>
                  <Input name="FROM_BUILDING_NM" value={elMaterialData.FROM_BUILDING_NM || ''} onChange={this.handleInputOnChange} />
                </td>
                <td>
                  <span>조사대상영역</span>
                </td>
                <td>
                  <Input name="TO_BUILDING_NM" value={elMaterialData.TO_BUILDING_NM || ''} onChange={this.handleInputOnChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <span>부서명</span>
                </td>
                <td>
                  <Input name="FROM_DEPT_NM" value={elMaterialData.FROM_DEPT_NM || ''} readOnly />
                </td>
                <td>
                  <span>부서장</span>
                </td>
                <td>
                  <Input name="FROM_DEPT_MANAGER_NO" value={elMaterialData.FROM_DEPT_MANAGER_NO || ''} readOnly />
                </td>
                <td>
                  <span>작성자</span>
                </td>
                <td>
                  <Input name="FROM_EMP_NM" value={elMaterialData.FROM_EMP_NM || ''} readOnly />
                </td>
                <td>
                  <span>작성일</span>
                </td>
                <td>
                  <span> {elMaterialData.FROM_CREATE_DT}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>주관부서</span>
                </td>
                <td>
                  <Input name="to_dept_nm" value="환경안전팀" readOnly />
                </td>
                <td>
                  <span>부서장</span>
                </td>
                <td>
                  <Input name="to_dept_manager_nm" value="민기식" readOnly />
                </td>
                <td>
                  <span>검토자</span>
                </td>
                <td>
                  <Input name="to_emp_nm" value="함종호" readOnly />
                </td>
                <td>
                  <span>검토일</span>
                </td>
                <td>
                  <span> {elMaterialData.TO_CREATE_DT}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
}
MaterialTable.defaultProps = {
  deptList: [],
  profile: {},
};
export default MaterialTable;
