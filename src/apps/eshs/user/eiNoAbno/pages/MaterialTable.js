/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Select, Button, Table } from 'antd';

class MaterialTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initMaterial: {},
    };
  }

  handleSaveOnClick = action => {
    const { id, submitHandlerBySaga, eiMaterialData, initEiMaterial, formData } = this.props;
    let submitData = {};

    const FROM_BUILDING_NM = formData.FROM_BUILDING_NM || '';
    const TO_BUILDING_NM = formData.TO_BUILDING_NM || '';

    if (action === 'SAVE') {
      submitData = { ...initEiMaterial, FROM_BUILDING_NM, TO_BUILDING_NM };
    } else if (action === 'UPDATE') {
      submitData = { ...eiMaterialData, FROM_BUILDING_NM, TO_BUILDING_NM };
    }
    submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsEiNoAbno', submitData, this.handleReload);
  };

  handleReload = () => {
    console.debug('저장완료.');
  };

  handleInputOnChange = e => {
    const { id, changeFormData } = this.props;
    changeFormData(id, `${e.target.name}`, e.target.value);
  };

  render() {
    const { initEiMaterial, eiMaterialData, searchFlag, formData } = this.props;
    const FROM_BUILDING_NM = formData.FROM_BUILDING_NM || '';
    const TO_BUILDING_NM = formData.TO_BUILDING_NM || '';
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
    if (JSON.stringify(eiMaterialData) == '{}') {
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
                  <Input name="DIVISION_NM" value={initEiMaterial.DIVISION_NM || 'null'} readOnly />
                </td>
                <td colSpan={2}>
                  <span>공장/FAB/건물명</span>
                </td>
                <td colSpan={2}>
                  <Input name="FROM_BUILDING_NM" value={FROM_BUILDING_NM} onChange={this.handleInputOnChange} />
                </td>
                <td>
                  <span>조사대상영역</span>
                </td>
                <td>
                  <Input name="TO_BUILDING_NM" value={TO_BUILDING_NM} onChange={this.handleInputOnChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <span>부서명</span>
                </td>
                <td>
                  <Input name="FROM_DEPT_NM" value={initEiMaterial.FROM_DEPT_NM} readOnly />
                </td>
                <td>
                  <span>부서장</span>
                </td>
                <td>
                  <Input name="FROM_DEPT_MANAGER_NO" value={initEiMaterial.FROM_DEPT_MANAGER_NO} readOnly />
                </td>
                <td>
                  <span>작성자</span>
                </td>
                <td>
                  <Input name="FROM_EMP_NO" value={initEiMaterial.FROM_EMP_NO} readOnly />
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
                  <Input name="TO_DEPT_NM" value="환경안전팀" readOnly />
                </td>
                <td>
                  <span>부서장</span>
                </td>
                <td>
                  <Input name="TO_DEPT_MANAGER_NM" value="민기식" readOnly />
                </td>
                <td>
                  <span>검토자</span>
                </td>
                <td>
                  <Input name="TO_EMP_NM" value="함종호" readOnly />
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
    if (JSON.stringify(eiMaterialData) != '{}' && !searchFlag) {
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
                  <Input name="DIVISION_NM" value={eiMaterialData.DIVISION_NM || 'null'} readOnly />
                </td>
                <td colSpan={2}>
                  <span>공장/FAB/건물명</span>
                </td>
                <td colSpan={2}>
                  <Input name="FROM_BUILDING_NM" value={FROM_BUILDING_NM} onChange={this.handleInputOnChange} />
                </td>
                <td>
                  <span>조사대상영역</span>
                </td>
                <td>
                  <Input name="TO_BUILDING_NM" value={TO_BUILDING_NM} onChange={this.handleInputOnChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <span>부서명</span>
                </td>
                <td>
                  <Input name="FROM_DEPT_NM" value={eiMaterialData.FROM_DEPT_NM || ''} readOnly />
                </td>
                <td>
                  <span>부서장</span>
                </td>
                <td>
                  <Input name="FROM_DEPT_MANAGER_NO" value={eiMaterialData.FROM_DEPT_MANAGER_NO || ''} readOnly />
                </td>
                <td>
                  <span>작성자</span>
                </td>
                <td>
                  <Input name="FROM_EMP_NM" value={eiMaterialData.FROM_EMP_NM || ''} readOnly />
                </td>
                <td>
                  <span>작성일</span>
                </td>
                <td>
                  <span> {eiMaterialData.FROM_CREATE_DT}</span>
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
                  <span> {eiMaterialData.TO_CREATE_DT}</span>
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
