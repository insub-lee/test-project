/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import * as selectors from 'containers/common/Auth/selectors';
import DeptSearchBar from '../../eiDeptSearchBar';
import ItemTable from '../ItemTable';
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

  handleSearchOnClick = () => {
    const { sagaKey: id, getCallDataHandler, formData, spinningOn } = this.props;
    const chkYear = (formData && formData.CHK_YEAR) || '0';
    const deptId = (formData && formData.searchRow && formData.searchRow.DEPT_ID) || (formData && formData.myDept && formData.myDept.DEPT_ID) || '0';
    const apiAry = [
      {
        key: 'itemList',
        type: 'GET',
        url: `/api/eshs/v1/common/EshsEiAirList/${chkYear}/${deptId}`,
      },
    ];
    spinningOn();
    getCallDataHandler(id, apiAry, this.handleSetItemList);
  };

  handleSetItemList = () => {
    const { sagaKey: id, result, changeFormData, spinningOff } = this.props;
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
    const { CHK_YEAR, myDept } = formData;
    this.setState({ isUpload: true });
    const submitData = {
      PARAM: {
        type: 'EI_AIR_ITEM',
        CHK_YEAR,
        DEPT_CD: myDept.DEPT_CD,
        DEPT_ID: myDept.DEPT_ID,
        excelData: result,
      },
    };
    submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eiExcelUpload', submitData, this.uploadExcelCallback);
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
    const { modalVisible, modalTitle, isUpload } = this.state;
    return (
      <>
        <StyledContentsWrapper>
          <DeptSearchBar {...this.props} handleSearchOnClick={this.handleSearchOnClick} />
          <div>
            <ItemTable {...this.props} handleSearchOnClick={this.handleSearchOnClick} handleModal={this.handleModal} />
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
  id: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.object,
  formData: PropTypes.object,
};

MainPage.defaultProps = {
  id: 'eiAir',
  getCallDataHandler: () => {},
  result: {},
};

export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(MainPage);
