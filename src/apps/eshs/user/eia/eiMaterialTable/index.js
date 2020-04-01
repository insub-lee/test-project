/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Select, Button, Table } from 'antd';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import MaterialTableStyled from '../styled/MaterialTableStyled';

class MaterialTable extends Component {
  constructor(props) {
    super(props);
  }

  handleSaveOnClick = () => {
    const { id, submitHandlerBySaga, handleSearchOnClick, formData } = this.props;
    const materialData = (formData && formData.materialData) || {};
    const materialCnt = (formData && formData.materialCnt) || 0;
    const CHK_YEAR = (formData && formData.CHK_YEAR) || '';
    console.debug('materialCntmaterialCnt', materialCnt);
    if (!materialCnt) {
      // SAVE
      submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsEiMaterial', { ...materialData, CHK_YEAR }, handleSearchOnClick);
    } else {
      // UPDATE
      submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsEiMaterial', { ...materialData }, handleSearchOnClick);
    }
  };

  // handleReload = () => {
  //   console.debug('저장완료.');
  // };

  handleInputOnChange = e => {
    const { id, changeFormData, formData } = this.props;
    const materialData = (formData && formData.materialData) || {};
    changeFormData(id, 'materialData', { ...materialData, [e.target.name]: e.target.value });
  };

  render() {
    const { formData } = this.props;
    const materialData = (formData && formData.materialData) || {};
    const searchFlag = (formData && formData.searchFlag) || false;
    return (
      <MaterialTableStyled>
        <div className="MaterialTable">
          <table>
            <thead>
              <tr align="right">
                <td colSpan={8}>
                  {!searchFlag && (
                    <StyledButton className="btn-primary" onClick={() => this.handleSaveOnClick()}>
                      저장
                    </StyledButton>
                  )}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span>사업부명</span>
                </td>
                <td>
                  <Input name="DIVISION_NM" value={materialData.DIVISION_NM || ''} readOnly />
                </td>
                <td colSpan={2}>
                  <span>공장/FAB/건물명</span>
                </td>
                <td colSpan={2}>
                  <Input name="FROM_BUILDING_NM" value={materialData.FROM_BUILDING_NM || ''} onChange={this.handleInputOnChange} />
                </td>
                <td>
                  <span>조사대상영역</span>
                </td>
                <td>
                  <Input name="TO_BUILDING_NM" value={materialData.TO_BUILDING_NM || ''} onChange={this.handleInputOnChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <span>부서명</span>
                </td>
                <td>
                  <Input name="FROM_DEPT_NM" value={materialData.FROM_DEPT_NM || ''} readOnly />
                </td>
                <td>
                  <span>부서장</span>
                </td>
                <td>
                  <Input name="FROM_DEPT_MANAGER_NO" value={materialData.FROM_DEPT_MANAGER_NO || ''} readOnly />
                </td>
                <td>
                  <span>작성자</span>
                </td>
                <td>
                  <Input name="FROM_EMP_NM" value={materialData.FROM_EMP_NM || ''} readOnly />
                </td>
                <td>
                  <span>작성일</span>
                </td>
                <td>
                  <span>{materialData.FROM_CREATE_DT || '-'}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>주관부서</span>
                </td>
                <td>
                  <Input name="TO_DEPT_NM" value={materialData.TO_DEPT_NM || ''} readOnly />
                </td>
                <td>
                  <span>부서장</span>
                </td>
                <td>
                  <Input name="TO_DEPT_MANAGER_NM" value={materialData.TO_DEPT_MANAGER_NM || ''} readOnly />
                </td>
                <td>
                  <span>검토자</span>
                </td>
                <td>
                  <Input name="TO_EMP_NM" value={materialData.TO_EMP_NM || ''} readOnly />
                </td>
                <td>
                  <span>검토일</span>
                </td>
                <td>
                  <span>{materialData.TO_CREATE_DT || '-'}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </MaterialTableStyled>
    );
  }
}
MaterialTable.defaultProps = {
  deptList: [],
  profile: {},
};
export default MaterialTable;
