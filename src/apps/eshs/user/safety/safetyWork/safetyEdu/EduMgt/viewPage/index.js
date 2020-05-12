import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Modal } from 'antd';
import { CaretDownOutlined, AppstoreTwoTone } from '@ant-design/icons';
import StyledModalWrapper from 'commonStyled/EshsStyled/Modal/StyledSelectModal';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import Styled from '../Styled';
import EduListTable from '../../SafetyEduList';
import EduInfoTable from '../../EduInfoTable/viewPage';
import WorkerInfoTable from '../../WorkerInfoTable/viewPage';

const AntdModal = StyledModalWrapper(Modal);

class EduMgt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eduInfo: {},
      safetyEduList: [],
      modalType: '',
      modalVisible: false,
    };
  }

  handleModalVisible = (type, bool) => {
    this.setState({
      modalType: type,
      modalVisible: bool,
    });
  };

  // 안전교육 검색
  searchSafetyEdu = (searchType, keyword) => {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const apiArr = {
      key: 'getSafetyEduList',
      type: 'GET',
      url: `/api/eshs/v1/common/safetyEdu?type=${searchType}&keyword=${keyword}`,
    };
    getCallDataHandlerReturnRes(id, apiArr, this.searchSafetyEduCallback);
  };

  // 안전교육 검색 콜백
  searchSafetyEduCallback = (id, response) => {
    this.setState({
      safetyEduList: response.safetyEduList || [],
    });
  };

  selectSafetyEdu = record => {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = {
      key: 'getSafetyEduList',
      type: 'GET',
      url: `/api/eshs/v1/common/safetyEdu?type=searchOne&keyword=${record.EDU_NO}`,
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.selectSafeEduCallback);
  };

  selectSafeEduCallback = (id, response) => {
    const nextEduInfo = response.safetyEduInfo;
    this.setState({
      modalType: '',
      modalVisible: false,
      eduInfo: {
        ...nextEduInfo,
      },
    });
  };

  // 모달 타이틀
  modalTitle = type => {
    switch (type) {
      case 'searchEdu':
        return '안전교육 검색';
      default:
        return '';
    }
  };

  render() {
    const { formData } = this.props;
    const { modalType, modalVisible, eduInfo, safetyEduList } = this.state;
    return (
      <Styled>
        <StyledSearchWrap>
          <div className="search-group-layer">
            <div className="searchCmpnyWrap">
              <label>
                교육등록번호
                <Input
                  className="ant-input-sm"
                  style={{ width: '200px', marginLeft: '5px', marginRight: '5px' }}
                  readOnly
                  onClick={() => this.handleModalVisible('searchEdu', true)}
                  value={(formData.EDU_NO && formData.EDU_NO) || ''}
                />
              </label>
            </div>
            <div
              className="searchCmpnyBtn"
              tabIndex={0}
              onClick={() => this.handleModalVisible('searchEdu', true)}
              onKeyPress={() => this.handleModalVisible('searchEdu', true)} // esLint
              role="button" // esLint
            >
              <CaretDownOutlined />
            </div>
            <StyledButton className="btn-primary btn-xs btn-first" onClick={() => console.debug('검색')} style={{ marginBottom: '5px' }}>
              검색
            </StyledButton>
          </div>
        </StyledSearchWrap>
        <ContentsWrapper>
          <EduInfoTable eduInfo={eduInfo} />
          <div className="middleTitle">
            <AppstoreTwoTone style={{ marginRight: '5px' }} />
            교육수강자
          </div>
          <WorkerInfoTable workerList={eduInfo.WORKER_LIST} />
        </ContentsWrapper>
        <AntdModal
          title={this.modalTitle(modalType)}
          width={790}
          visible={modalVisible}
          footer={null}
          onOk={() => this.handleModalVisible('', false)}
          onCancel={() => this.handleModalVisible('', false)}
        >
          {modalType === 'searchEdu' && (
            <EduListTable safetyEduList={safetyEduList} searchSafetyEdu={this.searchSafetyEdu} selectSafetyEdu={this.selectSafetyEdu} />
          )}
        </AntdModal>
      </Styled>
    );
  }
}
EduMgt.propTypes = {
  sagaKey: PropTypes.string,
  formData: PropTypes.object,
  getCallDataHandlerReturnRes: PropTypes.func,
};

EduMgt.defaultProps = {};

export default EduMgt;
