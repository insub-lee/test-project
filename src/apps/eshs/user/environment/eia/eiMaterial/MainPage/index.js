/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Modal } from 'antd';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import * as selectors from 'containers/common/Auth/selectors';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import DeptSearchBar from '../../eiDeptSearchBar';
import ItemTable from '../ItemTable';
import MaterialTable from '../../eiMaterialTable';
import ExcelParser from '../excelParser';

const AntdModal = StyledContentsModal(Modal);

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpload: false,
      modalTitle: '',
      modalVisible: false,
    };
  }

  handleSearchOnClick = (reqNo = undefined) => {
    const { id, getCallDataHandler, formData, spinningOn } = this.props;
    const chkYear = formData?.CHK_YEAR || '0';
    const deptId = formData?.searchRow?.DEPT_ID || formData?.myDept?.DEPT_ID || '0';
    const apiAry = [
      reqNo
        ? {
            key: 'materialData',
            type: 'GET',
            url: `/api/eshs/v1/common/EshsGetEiMaterial?REQ_NO=${reqNo}`,
          }
        : {
            key: 'materialData',
            type: 'GET',
            url: `/api/eshs/v1/common/EshsGetEiMaterial?CHK_YEAR=${chkYear}&FROM_DEPT_ID=${deptId}`,
          },
    ];
    spinningOn();
    getCallDataHandler(id, apiAry, this.handleSetMaterial);
  };

  handleSetMaterial = () => {
    const { id, result, setFormData, formData } = this.props;
    // const itemList = (result && result.itemList && result.itemList.list) || [];
    const materialData = (result && result.materialData && result.materialData.result) || {};
    const materialCnt = (result && result.materialData && result.materialData.materialCnt) || 0;

    setFormData(id, { ...formData, materialData, materialCnt });
    return this.itemListReload();
  };

  itemListReload = () => {
    const { id, getCallDataHandler, formData } = this.props;
    const req_no = (formData && formData.materialData && formData.materialData.REQ_NO) || 'null';
    const chk_year = (formData && formData.CHK_YEAR) || '0';
    const apiAry = [
      {
        key: 'itemList',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsEiMaterialItemList/${chk_year}/${req_no}`,
      },
    ];

    getCallDataHandler(id, apiAry, this.setItemList);
  };

  setItemList = () => {
    const { result, id, changeFormData, spinningOff } = this.props;
    const itemList = (result && result.itemList && result.itemList.list) || [];
    changeFormData(id, 'itemList', itemList);
    spinningOff();
  };

  // 모달 핸들러
  handleModal = (type, visible) => {
    let title = '';
    switch (type) {
      case 'EXCEL_UPLOAD':
        title = '엑셀 업로드';
        this.setState({
          modalTitle: title,
          modalVisible: visible,
        });
        break;
      default:
        this.setState({
          modalTitle: title,
          modalVisible: visible,
        });
        break;
    }
  };

  // 엑셀파일 등록시 - 추출된 데이터 가져오기 및 모달 닫기
  getUploadList = result => {
    const { sagaKey: id, submitHandlerBySaga, formData } = this.props;
    const { materialData } = formData;
    const REQ_NO = materialData.REQ_NO || '';
    this.setState({ isUpload: true });
    if (REQ_NO !== '') {
      const submitData = {
        PARAM: {
          type: 'EI_MATERIAL_ITEM',
          REQ_NO,
          excelData: result,
        },
      };
      submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eiExcelUpload', submitData, this.uploadExcelCallback);
    }
  };

  uploadExcelCallback = (id, response) => {
    const { result } = response;
    if (result === -1) {
      this.setState({
        isUpload: false,
      });
      return message.error(<MessageContent>엑셀 데이터 저장에 실패하였습니다.</MessageContent>);
    }
    this.setState({
      modalTitle: '',
      modalVisible: false,
      isUpload: false,
    });
    return message.success(<MessageContent>엑셀 데이터가 저장되었습니다.</MessageContent>);
  };

  render() {
    // const { formData } = this.props;
    const { modalVisible, modalTitle, isUpload } = this.state;
    // const materialData = (formData && formData.materialData) || {};
    // const materialCnt = (formData && formData.materialCnt) || 0;
    // const searchFlag = (formData && formData.searchFlag) || false;
    return (
      <>
        <StyledContentsWrapper>
          <DeptSearchBar {...this.props} handleSearchOnClick={reqNo => this.handleSearchOnClick(reqNo)} />
          <div>
            <MaterialTable {...this.props} handleSearchOnClick={reqNo => this.handleSearchOnClick(reqNo)} saveBtn />
          </div>
          <div>
            <ItemTable {...this.props} handleSearchOnClick={reqNo => this.handleSearchOnClick(reqNo)} handleModal={this.handleModal} />
          </div>
        </StyledContentsWrapper>
        <AntdModal
          className="modal-table-pad"
          title={modalTitle}
          width="40%"
          visible={modalVisible}
          footer={null}
          destroyOnClose
          maskClosable={false}
          onOk={() => this.handleModal('', false)}
          onCancel={() => this.handleModal('', false)}
        >
          <ExcelParser getUploadList={this.getUploadList} isUpload={isUpload} />
        </AntdModal>
      </>
    );
  }
}

MainPage.propTypes = {
  sagaKey: PropTypes.string,
  id: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
  result: PropTypes.object,
  formData: PropTypes.object,
};

MainPage.defaultProps = {
  id: 'eiMaterial',
  getCallDataHandler: () => {},
  result: {},
};

export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(MainPage);
