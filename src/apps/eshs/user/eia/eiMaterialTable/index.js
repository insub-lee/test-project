/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Select, Button, Table } from 'antd';

import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';

const AntdInput = StyledInput(Input);

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
      <ContentsWrapper>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="15%" />
              <col width="15%" />
              <col width="15%" />
              <col width="15%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
            </colgroup>
            <tbody>
              <tr align="right">
                <td colSpan={8}>
                  {!searchFlag && (
                    <StyledButtonWrapper className="btn-wrap-inline">
                      <StyledButton className="btn-primary" onClick={() => this.handleSaveOnClick()}>
                        저장
                      </StyledButton>
                    </StyledButtonWrapper>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <span>사업부명</span>
                </th>
                <td>
                  <AntdInput className="ant-input-inline" style={{ width: '100%' }} name="DIVISION_NM" value={materialData.DIVISION_NM || ''} readOnly />
                </td>
                <th colSpan={2}>
                  <span>공장/FAB/건물명</span>
                </th>
                <td colSpan={2}>
                  <AntdInput
                    className="ant-input-inline"
                    style={{ width: '100%' }}
                    name="FROM_BUILDING_NM"
                    value={materialData.FROM_BUILDING_NM || ''}
                    onChange={this.handleInputOnChange}
                  />
                </td>
                <th>
                  <span>조사대상영역</span>
                </th>
                <td>
                  <AntdInput
                    className="ant-input-inline"
                    style={{ width: '100%' }}
                    name="TO_BUILDING_NM"
                    value={materialData.TO_BUILDING_NM || ''}
                    onChange={this.handleInputOnChange}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <span>부서명</span>
                </th>
                <td>
                  <AntdInput className="ant-input-inline" style={{ width: '100%' }} name="FROM_DEPT_NM" value={materialData.FROM_DEPT_NM || ''} readOnly />
                </td>
                <th>
                  <span>부서장</span>
                </th>
                <td>
                  <AntdInput
                    className="ant-input-inline"
                    style={{ width: '100%' }}
                    name="FROM_DEPT_MANAGER_NO"
                    value={materialData.FROM_DEPT_MANAGER_NO || ''}
                    readOnly
                  />
                </td>
                <th>
                  <span>작성자</span>
                </th>
                <td>
                  <AntdInput className="ant-input-inline" style={{ width: '100%' }} name="FROM_EMP_NM" value={materialData.FROM_EMP_NM || ''} readOnly />
                </td>
                <th>
                  <span>작성일</span>
                </th>
                <td align="center">
                  <span>{materialData.FROM_CREATE_DT || '-'}</span>
                </td>
              </tr>
              <tr>
                <th>
                  <span>주관부서</span>
                </th>
                <td>
                  <AntdInput className="ant-input-inline" style={{ width: '100%' }} name="TO_DEPT_NM" value={materialData.TO_DEPT_NM || ''} readOnly />
                </td>
                <th>
                  <span>부서장</span>
                </th>
                <td>
                  <AntdInput
                    className="ant-input-inline"
                    style={{ width: '100%' }}
                    name="TO_DEPT_MANAGER_NM"
                    value={materialData.TO_DEPT_MANAGER_NM || ''}
                    readOnly
                  />
                </td>
                <th>
                  <span>검토자</span>
                </th>
                <td>
                  <AntdInput className="ant-input-inline" style={{ width: '100%' }} name="TO_EMP_NM" value={materialData.TO_EMP_NM || ''} readOnly />
                </td>
                <th>
                  <span>검토일</span>
                </th>
                <td align="center">
                  <span>{materialData.TO_CREATE_DT || '-'}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
      </ContentsWrapper>
    );
  }
}
MaterialTable.defaultProps = {
  deptList: [],
  profile: {},
};
export default MaterialTable;
