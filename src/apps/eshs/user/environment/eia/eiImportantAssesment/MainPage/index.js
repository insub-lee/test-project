/* eslint-disable no-unused-expressions */
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
    const { sagaKey, getCallDataHandler, formData } = this.props;
    const chkYear = (formData && formData.CHK_YEAR) || '0';
    const deptId = (formData && formData.searchRow && formData.searchRow.DEPT_ID) || (formData && formData.myDept && formData.myDept.DEPT_ID) || '0';
    const apiAry = [
      {
        key: 'materialData',
        type: 'GET',
        url: `/api/eshs/v1/common/EshsGetEiMaterial/${chkYear}/${deptId}`,
      },
    ];
    getCallDataHandler(sagaKey, apiAry, this.handleSetMaterial);
  };

  handleSetMaterial = () => {
    const { sagaKey, result, changeFormData } = this.props;
    // const itemList = (result && result.itemList && result.itemList.list) || [];
    const materialData = (result && result.materialData && result.materialData.result) || {};
    const materialCnt = (result && result.materialData && result.materialData.materialCnt) || 0;
    // changeFormData(id, 'itemList', itemList);
    changeFormData(sagaKey, 'materialData', materialData);
    changeFormData(sagaKey, 'materialCnt', materialCnt);
    this.itemListReload();
  };

  itemListReload = () => {
    const { sagaKey, getCallDataHandler, formData, changeFormData } = this.props;
    const materialCnt = (formData && formData.materialCnt) || 0;
    if (!materialCnt) {
      changeFormData(sagaKey, 'itemList', []);
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
    getCallDataHandler(sagaKey, apiAry, this.setItemList);
  };

  setItemList = () => {
    const { result, sagaKey, changeFormData } = this.props;
    const itemList = (result && result.itemList && result.itemList.list) || [];

    changeFormData(
      sagaKey,
      'itemList',
      itemList.map(item => (item.PLAN_REVIEW === '' || item.PLAN_REVIEW === null ? { ...item, PLAN_REVIEW: 'N' } : item)),
    );
  };

  onFileUploaded = (file, SEQ) => {
    const { changeFormData, formData, sagaKey } = this.props;
    // one file upload 최신 파일만 업로드 되게
    const { uploadFileList } = this.state;
    const itemList = (formData && formData.itemList) || [];
    const fileList = uploadFileList.filter(u => u.originSeq !== SEQ && u);
    fileList.push({ ...file, originSeq: SEQ });
    this.setState({
      uploadFileList: fileList,
    });
    changeFormData(
      sagaKey,
      'itemList',
      itemList.map(item => (Number(item.SEQ) === Number(SEQ) ? { ...item, FILE_SEQ: file.seq, FILE_NAME: file.fileName, FILE_TYPE: -1 } : item)),
    );
  };

  saveBeforeProcess = () => {
    const { sagaKey, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'prcRule',
        type: 'POST',
        url: '/api/workflow/v1/common/workprocess/defaultPrcRuleHanlder',
        params: { PARAM: { PRC_ID: 104 } },
      },
    ];

    getCallDataHandler(sagaKey, apiAry, this.setPrcRule);
  };

  setPrcRule = () => {
    const { sagaKey, submitHandlerBySaga, result, formData } = this.props;
    const prcRule = (result && result.prcRule && result.prcRule.DRAFT_PROCESS) || {};
    const materialData = (formData && formData.materialData) || {};
    /* 
      청주 검토자 GRP_ID 84381
      청주 승인권자 GRP_ID 84382

      구미 검토자 GRP_ID 84401
      구미 승인권자 GRP_ID 84402
    */

    prcRule &&
      prcRule.DRAFT_PROCESS_STEP &&
      prcRule.DRAFT_PROCESS_STEP.forEach((step, index) => {
        switch (index) {
          case 1:
            step.APPV_MEMBER = [
              { USER_ID: materialData.TO_USER_ID, DEPT_ID: materialData.TO_DEPT_ID, DEPT_NAME_KOR: materialData.TO_DEPT_NM, NAME_KOR: materialData.TO_EMP_NM },
            ];
            break;
          case 2:
            step.APPV_MEMBER = [
              {
                USER_ID: materialData.FROM_DEPT_MANAGER_ID,
                DEPT_ID: materialData.FROM_DEPT_ID,
                DEPT_NAME_KOR: materialData.FROM_DEPT_NM,
                NAME_KOR: materialData.FROM_DEPT_MANAGER_NM,
              },
            ];
            break;
          case 3:
            step.APPV_MEMBER = [
              {
                USER_ID: materialData.TO_DEPT_MANAGER_ID,
                DEPT_ID: materialData.TO_DEPT_ID,
                DEPT_NAME_KOR: materialData.TO_DEPT_NM,
                NAME_KOR: materialData.TO_DEPT_MANAGER_NM,
              },
            ];
            break;
          default:
            break;
        }
      });

    submitHandlerBySaga(
      sagaKey,
      'POST',
      '/api/workflow/v1/common/workprocess/draft',
      { DRAFT_PROCESS: { ...prcRule, REL_TYPE: 200, REL_KEY: materialData.REQ_NO } },
      this.fileMoveToReal,
    );
  };

  fileMoveToReal = () => {
    const { sagaKey, getCallDataHandler, submitHandlerBySaga, formData } = this.props;
    const { uploadFileList } = this.state;
    const materialData = (formData && formData.materialData) || '';
    const itemList = (formData && formData.itemList) || [];
    if (!uploadFileList.length) {
      submitHandlerBySaga(sagaKey, 'POST', '/api/eshs/v1/common/eshsEiImportantAssesment', { ...materialData, itemList }, this.updateComplete);
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
    getCallDataHandler(sagaKey, apiAry, this.fileUploadComplete);
  };

  fileUploadComplete = () => {
    const { sagaKey, result, formData, submitHandlerBySaga } = this.props;
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
    submitHandlerBySaga(sagaKey, 'POST', '/api/eshs/v1/common/eshsEiImportantAssesment', { ...materialData, itemList }, this.updateComplete);
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
          <ItemTable {...this.props} onFileUploaded={this.onFileUploaded} saveBeforeProcess={this.fileMoveToReal} />
        </div>
      </StyledContentsWrapper>
    );
  }
}

MainPage.defaultProps = {
  getCallDataHandler: () => {},
  result: {},
};
export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(MainPage);
