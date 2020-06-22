import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Input, Modal, Spin } from 'antd';
import { CaretDownOutlined, AppstoreTwoTone } from '@ant-design/icons';
import BizMicroDevBase from 'components/BizMicroDevBase';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import UserSelect from 'components/UserSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import SearchSafetyWork from '../../commonComponents/safetyWorkSearch';
import BfcheckHead from '../bfcheckHead';
import BfcheckDetail from '../bfcheckDetail';
import BfcheckItemSelect from '../bfcheckItemSelect';
import Styled from './Styled';

const AntdModal = StyledContentsModal(Modal);
const AntdInput = StyledInput(Input);
const AntdSearch = StyledSearchInput(Input.Search);

class BfCheckPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      isLoaded: false,
      formData: {
        SAVE_TYPE: 'insert',
        VIEW_TYPE: '',
        WORK_NO: '',
        BFCHECK_HEAD: {},
        BFCHECK_MAIN_DETAIL: [],
        BFCHECK_SUB_DETAIL: [],
      },
    };
  }

  // 페이지 랜더링 후 불러올 데이터
  componentDidMount() {
    const { sagaKey, getCallDataHandler } = this.props;
    const apiArr = [
      {
        /* xptmxm */
        key: 'getBfcheckItem',
        type: 'GET',
        url: `/api/eshs/v1/common/bfcheckItem?type=active`,
      },
    ];
    getCallDataHandler(sagaKey, apiArr, this.init);
  }

  init = () => {
    const { init } = this.state;
    if (init) {
      const { sagaKey: id, getCallDataHandlerReturnRes, initFormData } = this.props;
      const apiInfo = {
        key: 'getInitBfcheckInfo',
        type: 'GET',
        url: `/api/eshs/v1/common/bfcheck/${initFormData.WORK_NO}`,
      };
      this.setState(
        {
          init: false,
        },
        () => getCallDataHandlerReturnRes(id, apiInfo, this.getInitCallback),
      );
    }
  };

  getInitCallback = (id, response) => {
    const { initFormData, result, pageType } = this.props;
    const { info } = response;
    const bfcheckItem = result && result.getBfcheckItem && result.getBfcheckItem.list;
    const headInfo = info.BFCHECK_HEAD;
    if (Object.keys(headInfo).length === 0) {
      this.setState({
        isLoaded: true,
        formData: {
          SAVE_TYPE: 'insert',
          VIEW_TYPE: pageType,
          WORK_NO: initFormData.WORK_NO,
          BFCHECK_HEAD: {
            CHECK_DT: '',
            CHECK_LOC: '',
            CHECK_HOST_GB: 1,
            CHECK_CMPNY_CD: '',
            CHECK_EMP_NO: '',
            OUT_CHECK_NM: '',
            OUT_CHECK_SSN: '',
          },
          BFCHECK_MAIN_DETAIL: pageType === 'mainBfcheck' ? bfcheckItem.filter(item => item.WCATEGORY === initFormData.WCATEGORY) : [],
          BFCHECK_SUB_DETAIL: pageType === 'subBfcheck' ? bfcheckItem.filter(item => initFormData.SUB_WCATEGORY.includes(item.WCATEGORY)) : [],
        },
      });
      return;
    }
    let nextMainDetail = info.BFCHECK_MAIN_DETAIL;
    if (nextMainDetail.length === 0) nextMainDetail = bfcheckItem.filter(item => item.WCATEGORY === initFormData.WCATEGORY);
    let nextSubDetail = info.BFCHECK_SUB_DETAIL;
    if (nextSubDetail.length === 0) nextSubDetail = bfcheckItem.filter(item => initFormData.SUB_WCATEGORY.includes(item.WCATEGORY));
    const nextHead = {
      ...info.BFCHECK_HEAD,
      CHECK_DT: moment(headInfo.CHECK_DT).format('YYYY-MM-DD'),
    };
    this.setState({
      isLoaded: true,
      formData: {
        SAVE_TYPE: 'update',
        VIEW_TYPE: pageType || '',
        WORK_NO: initFormData.WORK_NO || '',
        BFCHECK_HEAD: nextHead,
        BFCHECK_MAIN_DETAIL: pageType === 'mainBfcheck' ? nextMainDetail : [],
        BFCHECK_SUB_DETAIL: pageType === 'subBfcheck' ? nextSubDetail : [],
      },
    });
  };

  // 작업중 점검 등록 / 수정 / 삭제
  submitFormData = type => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { formData } = this.state;
    const submitData = { PARAM: formData };
    switch (type) {
      case 'SAVE':
        if (this.validFormData(formData.BFCHECK_HEAD)) {
          if (formData.SAVE_TYPE === 'insert') {
            submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/bfcheck/${formData.WORK_NO}`, submitData, this.saveCallback);
          } else {
            submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/bfcheck/${formData.WORK_NO}`, submitData, this.updateCallback);
          }
        }
        break;
      case 'DELETE':
        submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/bfcheck/${formData.WORK_NO}`, submitData, this.deleteCallback);
        break;
      default:
        break;
    }
  };

  // 폼데이터 유효성 점검
  validFormData = formData => {
    let validList = [
      { field: 'CHECK_DT', name: '점검일자' },
      { field: 'CHECK_LOC', name: '점검장소' },
      { field: 'CHECK_EMP_NO', name: '내부 점검자' },
    ];
    if (formData.CHECK_HOST_GB === 2) {
      validList = [
        { field: 'CHECK_DT', name: '점검일자' },
        { field: 'CHECK_LOC', name: '점검장소' },
        { field: 'OUT_CHECK_SSN', name: '외부 점검자 생년월일' },
        { field: 'OUT_CHECK_NM', name: '외부 점검자명' },
      ];
    }
    const invalid = validList.findIndex(valid => formData[valid.field] === undefined || formData[valid.field] === '');
    if (invalid !== -1) {
      message.error(<MessageContent>{`${validList[invalid].name}은(는) 필수 입력사항 입니다.`}</MessageContent>);
      return false;
    }
    return true;
  };

  // 작업중 점검 내용 저장 콜백
  saveCallback = (id, response) => {
    const { formData } = this.state;
    const { result } = response;
    if (result && result === 'success') {
      this.setState({
        formData: {
          ...formData,
          SAVE_TYPE: 'update',
        },
      });
      message.success(<MessageContent>점검정보를 저장하였습니다.</MessageContent>);
      return;
    }
    message.error(<MessageContent>점검정보 저장에 실패하였습니다.</MessageContent>);
  };

  // 작업중 점검 내용 저장 콜백
  updateCallback = (id, response) => {
    const { result } = response;
    if (result && result === 'fail') {
      message.error(<MessageContent>작업전 점검내용 수정에 실패하였습니다.</MessageContent>);
      return;
    }
    message.success(<MessageContent>작업전 점검내용을 수정하였습니다.</MessageContent>);
  };

  // 작업중 점검 내용 삭제 콜백
  deleteCallback = (id, response) => {
    const { initFormData, pageType, result } = this.props;
    const { deleteResult } = response;
    const bfcheckItem = result && result.getBfcheckItem && result.getBfcheckItem.list;
    if (deleteResult && deleteResult === 'fail') {
      message.error(<MessageContent>작업전 점검내용 삭제에 실패했습니다.</MessageContent>);
      return;
    }
    this.setState(
      {
        formData: {
          SAVE_TYPE: 'insert',
          VIEW_TYPE: pageType,
          WORK_NO: initFormData.WORK_NO,
          BFCHECK_HEAD: {
            CHECK_DT: '',
            CHECK_LOC: '',
            CHECK_HOST_GB: 1,
            CHECK_CMPNY_CD: '',
            CHECK_EMP_NO: '',
            OUT_CHECK_NM: '',
            OUT_CHECK_SSN: '',
          },
          BFCHECK_MAIN_DETAIL: pageType === 'mainBfcheck' ? bfcheckItem.filter(item => item.WCATEGORY === initFormData.WCATEGORY) : [],
          BFCHECK_SUB_DETAIL: pageType === 'subBfcheck' ? bfcheckItem.filter(item => initFormData.SUB_WCATEGORY.includes(item.WCATEGORY)) : [],
        },
      },
      () => message.success(<MessageContent>작업전 점검내용을 삭제하였습니다.</MessageContent>),
    );
  };

  // 모달 핸들러
  handleModal = (type, visible) => {
    let title = '';
    switch (type) {
      case 'safetyWork':
        title = '안전작업 검색';
        break;
      case 'bfcheckItem':
        title = '점검항목 추가';
        break;
      case 'userSelect':
        title = '점검자 선택';
        break;
      default:
        break;
    }
    this.setState({
      modalType: type,
      modalTitle: title,
      modalVisible: visible,
    });
  };

  // 검색된 작업번호 선택시
  handleSafetyWorkSelect = record => {
    const { formData } = this.state;
    this.setState(
      {
        modalType: '',
        modalTitle: '',
        modalVisible: false,
        formData: {
          ...formData,
          WORK_NO: record.WORK_NO,
        },
      },
      () => this.handleGetSafetyWork(),
    );
  };

  // 폼데이터 변경
  handleChangeFormData = (field, value) => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [field]: value,
      },
    });
  };

  // HEAD - 폼데이터 변경
  handleChangeHeadFormData = (field, value) => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        BFCHECK_HEAD: {
          ...formData.BFCHECK_HEAD,
          [field]: value,
        },
      },
    });
  };

  // DETAIL - 폼데이터 변경
  handleChangeDetailFormData = (index, field, value) => {
    const { pageType } = this.props;
    const { formData } = this.state;
    // BFCHECK_MAIN_DETAIL,BFCHECK_SUB_DETAIL
    let prtField = 'BFCHECK_MAIN_DETAIL';
    let nextDetail = formData.BFCHECK_MAIN_DETAIL;
    let item = formData.BFCHECK_MAIN_DETAIL[index];
    if (pageType === 'subBfcheck') {
      prtField = 'BFCHECK_SUB_DETAIL';
      nextDetail = formData.BFCHECK_SUB_DETAIL;
      item = formData.BFCHECK_SUB_DETAIL[index];
    }
    const nextItem = {
      ...item,
      [field]: value,
    };
    nextDetail[index] = nextItem;
    this.setState({
      formData: {
        ...formData,
        [prtField]: nextDetail,
      },
    });
  };

  // INGCHECK_DETAIL - 점검항목 제거
  handleRemoveDetailFormData = itemIdx => {
    const { pageType } = this.props;
    const { formData } = this.state;
    let prtField = 'BFCHECK_MAIN_DETAIL';
    let nextDetail = formData.BFCHECK_MAIN_DETAIL;
    if (pageType === 'subBfcheck') {
      prtField = 'BFCHECK_SUB_DETAIL';
      nextDetail = formData.BFCHECK_SUB_DETAIL;
    }
    this.setState({
      formData: {
        ...formData,
        [prtField]: nextDetail.filter((item, index) => index !== itemIdx),
      },
    });
  };

  // 점검항목 저장(단일)
  handleRowSeletePenaltyItem = record => {
    const { pageType } = this.props;
    const { formData } = this.state;
    let prtField = 'BFCHECK_MAIN_DETAIL';
    let nextDetail = formData.BFCHECK_MAIN_DETAIL;
    if (pageType === 'subBfcheck') {
      prtField = 'BFCHECK_SUB_DETAIL';
      nextDetail = formData.BFCHECK_SUB_DETAIL;
    }
    this.setState({
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      formData: {
        ...formData,
        [prtField]: nextDetail.concat(record),
      },
    });
  };

  // 점검항목 저장(다수)
  handleSavePenaltyItems = items => {
    const { pageType } = this.props;
    const { formData } = this.state;
    let prtField = 'BFCHECK_MAIN_DETAIL';
    let nextDetail = formData.BFCHECK_MAIN_DETAIL;
    if (pageType === 'subBfcheck') {
      prtField = 'BFCHECK_SUB_DETAIL';
      nextDetail = formData.BFCHECK_SUB_DETAIL;
    }
    this.setState({
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      formData: {
        ...formData,
        [prtField]: nextDetail.concat(items),
      },
    });
  };

  // 점검자 선택
  onSelectedComplete = result => {
    const { formData } = this.state;
    if (result.length > 0) {
      const userInfo = result[0];
      this.setState({
        modalTitle: '',
        modalType: '',
        modalVisible: false,
        formData: {
          ...formData,
          INGCHECK_HEAD: {
            ...formData.INGCHECK_HEAD,
            CHECK_CMPNY_CD: 72761,
            CHECK_CMPNY_NM: 'MAGNACHIP반도체',
            CHECK_EMP_NO: userInfo.USER_ID,
            CHECK_EMP_NM: userInfo.NAME_KOR,
          },
        },
      });
      return;
    }
    this.setState({
      modalTitle: '',
      modalType: '',
      modalVisible: false,
    });
  };

  render() {
    const { pageType, result } = this.props;
    const { modalType, modalTitle, modalVisible, formData, isLoaded } = this.state;
    const bfcheckItemList = (result && result.getBfcheckItem && result.getBfcheckItem.list) || [];
    return (
      <>
        <StyledCustomSearchWrapper>
          <div className="search-input-area">
            <span className="text-label">작업번호</span>
            <AntdSearch
              className="ant-search-inline input-search-mid mr5"
              onClick={() => this.handleModal('search', true)}
              value={formData.WORK_NO}
              style={{ width: '200px', marginRight: '10px' }}
            />
            <StyledButton className="btn-gray btn-sm btn-first" onClick={() => this.handleGetSafetyWork()}>
              검색
            </StyledButton>
          </div>
        </StyledCustomSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          {formData.WORK_NO && formData.WORK_NO !== '' && (
            <>
              <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.submitFormData('SAVE')}>
                저장
              </StyledButton>
              <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleModal('bfcheckItem', true)}>
                점검항목 추가
              </StyledButton>
              {formData.SAVE_TYPE === 'update' && (
                <StyledButton className="btn-light btn-sm btn-first" onClick={() => this.submitFormData('DELETE')}>
                  삭제
                </StyledButton>
              )}
            </>
          )}
        </StyledButtonWrapper>
        <ContentsWrapper>
          <Spin tip="Loading..." spinning={!isLoaded}>
            <BfcheckHead formData={formData.BFCHECK_HEAD} onChangeFormData={this.handleChangeHeadFormData} allChangeFormData={this.handleChangeFormData} />
            <div className="middleTitle" style={{ margin: '10px 0px -5px 10px' }}>
              <AppstoreTwoTone style={{ marginRight: '5px' }} />
              <span>점검항목</span>
            </div>
            {pageType === 'mainBfcheck' && (
              <BfcheckDetail
                formData={formData.BFCHECK_MAIN_DETAIL}
                handleMoadl={this.handleModal}
                handleChangeDetailFormData={this.handleChangeDetailFormData}
                handleRemoveDetailFormData={this.handleRemoveDetailFormData}
              />
            )}
            {pageType === 'subBfcheck' && (
              <BfcheckDetail
                formData={formData.BFCHECK_SUB_DETAIL}
                handleMoadl={this.handleModal}
                handleChangeDetailFormData={this.handleChangeDetailFormData}
                handleRemoveDetailFormData={this.handleRemoveDetailFormData}
              />
            )}
          </Spin>
        </ContentsWrapper>
        <AntdModal
          title={modalTitle}
          width={modalType === 'cmpny' || modalType === 'equip' ? '790px' : '70%'}
          visible={modalVisible}
          footer={null}
          onOk={() => this.handleModal('', false)}
          onCancel={() => this.handleModal('', false)}
        >
          {modalType === 'bfcheckItem' && (
            <BfcheckItemSelect brcheckItem={bfcheckItemList} rowSelect={this.handleRowSeletePenaltyItem} onSave={this.handleSavePenaltyItems} />
          )}
          {modalType === 'safetyWork' && <BizMicroDevBase component={SearchSafetyWork} sagaKey="safetyWork_search" rowSelect={this.handleSafetyWorkSelect} />}
          {modalType === 'userSelect' && <UserSelect onUserSelectHandler={undefined} onUserSelectedComplete={this.onSelectedComplete} onCancel={undefined} />}
        </AntdModal>
      </>
    );
  }
}

BfCheckPage.propTypes = {
  pageType: PropTypes.string,
  initFormData: PropTypes.object,
  result: PropTypes.object,
  sagaKey: PropTypes.string,
  getCallDataHandlerReturnRes: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
  getCallDataHandler: PropTypes.func,
};

export default BfCheckPage;
