/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { message } from 'antd';
import * as selectors from 'containers/common/Auth/selectors';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';

import DeptSearchBar from '../../eiDeptSearchBar';
import ItemTable from '../ItemTable';
import MaterialTable from '../../eiMaterialTable';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadFileList: [],
    };
  }

  handleSearchOnClick = () => {
    const { id, getCallDataHandler, formData } = this.props;
    const chkYear = (formData && formData.CHK_YEAR) || '0';
    const deptId = (formData && formData.searchRow && formData.searchRow.DEPT_ID) || (formData && formData.myDept && formData.myDept.DEPT_ID) || '0';
    const apiAry = [
      {
        key: 'materialData',
        type: 'GET',
        url: `/api/eshs/v1/common/EshsGetEiMaterial/${chkYear}/${deptId}`,
      },
    ];
    getCallDataHandler(id, apiAry, this.handleSetMaterial);
  };

  handleSetMaterial = () => {
    const { id, result, changeFormData } = this.props;
    // const itemList = (result && result.itemList && result.itemList.list) || [];
    const materialData = (result && result.materialData && result.materialData.result) || {};
    const materialCnt = (result && result.materialData && result.materialData.materialCnt) || 0;
    // changeFormData(id, 'itemList', itemList);
    changeFormData(id, 'materialData', materialData);
    changeFormData(id, 'materialCnt', materialCnt);
    this.itemListReload();
  };

  itemListReload = () => {
    const { id, getCallDataHandler, formData, changeFormData } = this.props;
    const materialCnt = (formData && formData.materialCnt) || 0;
    if (!materialCnt) {
      changeFormData(id, 'itemList', []);
      return;
    }
    const deptId = (formData && formData.materialData && formData.materialData.FROM_DEPT_ID) || '';
    const reqNo = (formData && formData.materialData && formData.materialData.REQ_NO) || '';
    const chkYear = (formData && formData.CHK_YEAR) || '0';
    const apiAry = [
      {
        key: 'itemList',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsEiImportantAssesmentList/${chkYear}/${deptId}/${reqNo}`,
      },
    ];
    getCallDataHandler(id, apiAry, this.setItemList);
  };

  setItemList = () => {
    const { result, id, changeFormData } = this.props;
    const itemList = (result && result.itemList && result.itemList.list) || [];

    changeFormData(
      id,
      'itemList',
      itemList.map(item => (item.PLAN_REVIEW === '' || item.PLAN_REVIEW === null ? { ...item, PLAN_REVIEW: 'N' } : item)),
    );
  };

  onFileUploaded = (file, SEQ) => {
    const { changeFormData, formData, id } = this.props;
    // one file upload 최신 파일만 업로드 되게
    const { uploadFileList } = this.state;
    const itemList = (formData && formData.itemList) || [];
    const fileList = uploadFileList.filter(u => u.originSeq !== SEQ && u);
    fileList.push({ ...file, originSeq: SEQ });
    this.setState({
      uploadFileList: fileList,
    });
    changeFormData(
      id,
      'itemList',
      itemList.map(item => (Number(item.SEQ) === Number(SEQ) ? { ...item, FILE_SEQ: file.seq, FILE_NAME: file.fileName, FILE_TYPE: -1 } : item)),
    );
  };

  saveBeforeProcess = () => {
    const { id, getCallDataHandler, submitHandlerBySaga, formData } = this.props;
    const { uploadFileList } = this.state;
    const materialData = (formData && formData.materialData) || '';
    const itemList = (formData && formData.itemList) || [];
    if (!uploadFileList.length) {
      submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsEiImportantAssesment', { ...materialData, itemList }, this.updateComplete);
      return;
    }
    const param = { PARAM: { DETAIL: uploadFileList } };
    const apiAry = [
      {
        key: 'realFile',
        type: 'POST',
        url: '/upload/moveFileToReal',
        params: param,
      },
    ];
    this.setState({
      uploadFileList: [],
    });
    getCallDataHandler(id, apiAry, this.fileUploadComplete);
  };

  fileUploadComplete = () => {
    const { id, result, formData, submitHandlerBySaga } = this.props;
    const materialData = (formData && formData.materialData) || '';
    const realFileList = (result && result.realFile && result.realFile.DETAIL) || [];

    const itemList =
      (formData &&
        formData.itemList.map(i => {
          if ((i.PLAN_REVIEW === 'Y' && i.IMPROVEMENT_PLAN !== '') || i.IMPROVEMENT_PLAN !== null || i.IMPROVEMENT_PLAN !== undefined) {
            const a = realFileList.find(r => r.originSeq === i.SEQ) || null;
            if (a !== null) {
              return { ...i, IMPROVEMENT_PLAN: a.seq, FILE_SEQ: a.seq, FILE_NAME: a.name };
            }
            return i;
          }
          return i;
        })) ||
      [];

    // data 저장
    submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsEiImportantAssesment', { ...materialData, itemList }, this.updateComplete);
  };

  updateComplete = () => {
    this.handleSearchOnClick();
    message.success('저장되었습니다.');
  };

  render() {
    const { formData } = this.props;
    return (
      <StyledContentsWrapper>
        <DeptSearchBar {...this.props} handleSearchOnClick={this.handleSearchOnClick} saveBeforeProcess={this.saveBeforeProcess} />
        <div>
          <MaterialTable {...this.props} handleSearchOnClick={this.handleSearchOnClick} />
        </div>
        <div>
          <ItemTable {...this.props} onFileUploaded={this.onFileUploaded} saveBeforeProcess={this.saveBeforeProcess} />
        </div>
      </StyledContentsWrapper>
    );
  }
}

MainPage.defaultProps = {
  id: 'eiImportantAssesment',
  getCallDataHandler: () => {},
  result: {},
};
export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(MainPage);
