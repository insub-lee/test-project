import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Input, Modal } from 'antd';
import { AppstoreTwoTone } from '@ant-design/icons';
import BizMicroDevBase from 'components/BizMicroDevBase';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import UserSelect from 'components/UserSelect';
import SafetyWorkerTable from '../../commonComponents/SafetyWorker/viewPage';
import SafetyEquipTable from '../../commonComponents/SafetyEquip/viewPage';
import SafetyWorkInfo from '../../commonComponents/SafetyWorkInfo/viewPage';
import SearchSafetyWork from '../../commonComponents/safetyWorkSearch';
import IngCheckDetail from '../ingCheckDetail';
import IngCheckHead from '../ingCheckHead';
import PenaltyItem from '../penaltyItem';
import Styled from './Styled';

const AntdModal = StyledContentsModal(Modal);
const AntdSearch = StyledSearchInput(Input.Search);

class SafetyWorkMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      formData: {
        WORK_NO: '', //                 작업번호        (String, 13)
        TITLE: '', //                   작업명          (String, 100)
        WCATEGORY: '', //               작업종류        (String, 40)
        SUB_WCATEGORY: [], //           보충작업종류    (String, 40)
        WORK_DESC: '', //               작업내용        (String, 300)
        WRK_CMPNY_CD: '', //            작업업체 코드   (String, 10)
        WLOC: '', //                    작업장소        (String, 100)
        WGUBUN: '', //              작업구분        (String, 4)   [신규, 변경, 이설, 철거, 기타]
        SITE: '', //                지역            (String, 4)   [이천, 청주, 구미]
        DGUBUN: '', //               작업동          (String, 50)  [C-1, C-2, R, 청주기타, F1동, F3동, A1동, D.I동, 기숙사동, 구미기타]
        FROM_DT: '', //                 허가 요청날짜   (Date)
        TO_DT: '', //                   허가 요청날짜   (Date)
        FROM_TIME: '', //               허가 요청시간   (String, 2)
        TO_TIME: '', //                 허가 요청시간   (String, 2)
        PLEDGE_NO: '', //               서약서 번호     (String, 13)
        DETB_DANEST: '', //             위험성 평가번호 (String, 13)
        REQ_CMPNY_CD: '', // 발주회사        (String, 2)
        REQ_DEPT_CD: '', //  발주회사 부서   (String, 20)
        REQ_EMP_NO: '', // 발주회사 담당자 (String, 10)
        REQ_SUPERVISOR_EMP_NO: '', //   발주회사 감독자 (String, 10)
        EXM_CMPNY_CD: '', //            검토 회사 코드  (String, 2)
        EXM_DEPT_CD: '', //             검토 회사 부서  (String, 20)
        EXM_EMP_NO: '', //              검토 회사 담당자(String, 10)
        REQUEST_GB: '', //          신청구분        (String, 6)   [일반, 긴급, 미허가]
        FINAL_OK_EMP_NO: '', //         최종결재자 사번 (String, 10)
        FIRE_MANAGER: '', //            화재감시 담당   (String, 50)
        WORKER_LIST: [],
        EQUIP_LIST: [],
        INGCHECK_HEAD: {},
        INGCHECK_DETAIL: [],
        REQ_CMPNY_NM: '', // 발주회사명
        REQ_DEPT_NM: '', // 발주부서명
        REQ_EMP_NM: '', // 담당자명
        REQ_SUPERVISOR_EMP_NM: '', //   발주회사 감독자명
        EXM_EMP_NM: '', // 검토회사 담당자명
        FINAL_OK_EMP_NM: '', // 최종결재자 사번
        REQUEST_DT: '',
      },
    };
  }

  // 페이지 랜더링 후 불러올 데이터
  componentDidMount() {
    const { init } = this.state;
    const { sagaKey, getCallDataHandler, workNo } = this.props;
    const apiArr = [
      {
        /* 주관회사사원 : /api/eshs/v1/common/eshsHstCmpnyUser */
        key: 'getHstCmpnyUser',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsHstCmpnyUser`,
      },
      {
        /* 거래처전체리스트 : /api/eshs/v1/common/EshsCmpnyList/null/null */
        key: 'getEshsCmpnyList',
        type: 'GET',
        url: `/api/eshs/v1/common/EshsCmpnyList?gubun=SW`,
      },
      {
        /* 점검항목리스트 : /api/eshs/v1/common/penaltyItem */
        key: 'getSwtbPenaltyItem',
        type: 'GET',
        url: `/api/eshs/v1/common/penaltyItem?type=active`,
      },
    ];
    getCallDataHandler(sagaKey, apiArr);
    if (init && workNo) this.init();
  }

  init = () => {
    const { workNo } = this.props;
    const { init } = this.state;
    if (init) {
      this.setState(
        {
          init: false,
        },
        () => this.handleGetSafetyWork(workNo),
      );
    }
  };

  // 작업중 점검 등록 / 수정 / 삭제
  submitFormData = type => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { formData } = this.state;
    const submitData = { PARAM: formData };
    switch (type) {
      case 'SAVE':
        if (this.validFormData(formData.INGCHECK_HEAD)) {
          if (formData.INIT_INGCHECK) {
            submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/ingCheck', submitData, this.saveCallback);
          } else {
            submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/ingCheck', submitData, this.updateCallback);
          }
        }
        break;
      case 'DELETE':
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/ingCheck', submitData, this.deleteCallback);
        break;
      default:
        break;
    }
  };

  // 폼데이터 유효성 점검
  validFormData = formData => {
    const validList = [
      { field: 'CHECK_DT', name: '점검일자' },
      { field: 'CHECK_LOC', name: '점검장소' },
      { field: 'CHECK_STATUS', name: '점검상태' },
      { field: 'CHECK_CMPNY_CD', name: '점검회사' },
      { field: 'CHECK_EMP_NO', name: '점검자' },
    ];
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
          INIT_INGCHECK: false,
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
      message.error(<MessageContent>작업중 점검내용 수정에 실패하였습니다.</MessageContent>);
      return;
    }
    message.success(<MessageContent>작업중 점검내용을 수정하였습니다.</MessageContent>);
  };

  // 작업중 점검 내용 삭제 콜백
  deleteCallback = (id, response) => {
    const { formData } = this.state;
    const { result } = response;
    if (result && result === 'fail') {
      message.error(<MessageContent>작업중 점검내용 삭제에 실패했습니다.</MessageContent>);
      return;
    }
    this.setState(
      {
        formData: {
          ...formData,
          INGCHECK_HEAD: {},
          INGCHECK_DETAIL: [],
          INIT_INGCHECK: true,
        },
      },
      () => message.success(<MessageContent>작업중 점검내용을 삭제하였습니다.</MessageContent>),
    );
  };

  handleGetSafetyWork = workNo => {
    const { formData } = this.state;
    const searchWorkNo = workNo || formData.WORK_NO;
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const type = 'safetyWork';
    const apiInfo = {
      key: 'getSafetyWork',
      type: 'GET',
      url: `/api/eshs/v1/common/ingCheck?type=${type}&keyword=${searchWorkNo}`,
    };
    if (searchWorkNo === '') {
      message.error(<MessageContent>작업번호가 없습니다. 먼저 작업번호를 선택 후 검색하십시오.</MessageContent>);
      return;
    }
    getCallDataHandlerReturnRes(id, apiInfo, this.getSafetyWorkCallback);
  };

  getSafetyWorkCallback = (id, response) => {
    const searchSafetyWork = (response && response.safetyWork) || {};
    if (!searchSafetyWork.WORK_NO) {
      message.error(<MessageContent>요청하신 작업정보를 찾을 수 없습니다.</MessageContent>);
    }
    this.setState({
      formData: {
        ...searchSafetyWork,
        FROM_DT: moment(searchSafetyWork.FROM_DT).format('YYYY-MM-DD'),
        REQUEST_DT: (searchSafetyWork.REQUEST_DT && moment(searchSafetyWork.REQUEST_DT).format('YYYY-MM-DD')) || '',
        SUB_WCATEGORY: (searchSafetyWork.SUB_WCATEGORY && searchSafetyWork.SUB_WCATEGORY.split(',')) || [],
        INIT_INGCHECK: !searchSafetyWork.INGCHECK_HEAD,
        INGCHECK_HEAD: searchSafetyWork.INGCHECK_HEAD || {},
        INGCHECK_DETAIL: searchSafetyWork.INGCHECK_DETAIL || [],
        fileList: [],
        responseList: [],
      },
    });
  };

  // 모달 핸들러
  handleModal = (type, visible) => {
    let title = '';
    switch (type) {
      case 'safetyWork':
        title = '안전작업 검색';
        break;
      case 'penalty':
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

  // INGCHECK_HEAD - 폼데이터 변경
  handleChangeHeadFormData = (field, value) => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        INGCHECK_HEAD: {
          ...formData.INGCHECK_HEAD,
          [field]: value,
        },
      },
    });
  };

  // INGCHECK_DETAIL - 폼데이터 변경
  handleChangeDetailFormData = (index, field, value) => {
    const { formData } = this.state;
    const item = formData.INGCHECK_DETAIL[index];
    const nextItem = {
      ...item,
      [field]: value,
    };
    const nextDetail = formData.INGCHECK_DETAIL;
    nextDetail[index] = nextItem;

    this.setState({
      formData: {
        ...formData,
        INGCHECK_DETAIL: nextDetail,
      },
    });
  };

  // INGCHECK_DETAIL - 점검항목 제거
  handleRemoveDetailFormData = itemIdx => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        INGCHECK_DETAIL: formData.INGCHECK_DETAIL.filter((item, index) => index !== itemIdx),
      },
    });
  };

  // 점검항목 저장(단일)
  handleRowSeletePenaltyItem = record => {
    const { formData } = this.state;
    const addPenalty = {
      BREAK_COUNT: 1,
      ITEM_CD: record.ITEM_CD,
      ITEM_NM: record.ITEM_NM,
      PENALTY: record.PENALTY,
      PENALTY_TARGET_GB: 1,
    };
    this.setState({
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      formData: {
        ...formData,
        INGCHECK_DETAIL: formData.INGCHECK_DETAIL.concat(addPenalty),
      },
    });
  };

  // 점검항목 저장(다수)
  handleSavePenaltyItems = items => {
    const { formData } = this.state;
    const newItems = items.map(item => ({
      BREAK_COUNT: 1,
      ITEM_CD: item.ITEM_CD,
      ITEM_NM: item.ITEM_NM,
      PENALTY: item.PENALTY,
      PENALTY_TARGET_GB: 1,
    }));
    this.setState({
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      formData: {
        ...formData,
        INGCHECK_DETAIL: formData.INGCHECK_DETAIL.concat(newItems),
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
    const { result, pageType } = this.props;
    const { modalType, modalTitle, modalVisible, formData } = this.state;
    const penaltyItem = (result && result.getSwtbPenaltyItem && result.getSwtbPenaltyItem.penaltyActiveItems) || [];
    return (
      <Styled>
        <StyledCustomSearchWrapper>
          <div className="search-input-area">
            <span className="text-label">거래처</span>
            <AntdSearch
              className="ant-search-inline input-search-mid mr5"
              onClick={() => this.handleModal('safetyWork', true)}
              onSearch={() => this.handleModal('safetyWork', true)}
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
              <StyledButton className="btn-primary btn-xs btn-first" onClick={() => this.submitFormData('SAVE')}>
                저장
              </StyledButton>
              <StyledButton className="btn-light btn-xs btn-first" onClick={() => this.submitFormData('DELETE')}>
                삭제
              </StyledButton>
            </>
          )}
          {pageType && pageType === 'modal' && (
            <StyledButton className="btn-gray btn-xs btn-first" onClick={() => alert('인쇄기능 준비중')}>
              인쇄
            </StyledButton>
          )}
        </StyledButtonWrapper>
        <ContentsWrapper>
          <SafetyWorkInfo formData={formData} viewPage="ingCheck" />
          <div className="ingCheckHeader">
            <IngCheckHead ingCheckHead={formData.INGCHECK_HEAD} handleChangeHeadFormData={this.handleChangeHeadFormData} handleModal={this.handleModal} />
          </div>
          <div className="middleTitle">
            <AppstoreTwoTone style={{ marginRight: '5px', verticalAlign: 'middle' }} />
            <span className="middleTitleText">점검항목</span>
            <StyledButton className="btn-primary btn-xxs btn-first" onClick={() => this.handleModal('penalty', true)}>
              점검항목 추가
            </StyledButton>
          </div>
          <div>
            <IngCheckDetail
              ingCheckDetail={formData.INGCHECK_DETAIL || []}
              handleChangeDetailFormData={this.handleChangeDetailFormData}
              handleRemoveDetailFormData={this.handleRemoveDetailFormData}
            />
          </div>
          <div className="middleTitle">
            <AppstoreTwoTone style={{ marginRight: '5px', verticalAlign: 'middle' }} />
            <span className="middleTitleText">작업자</span>
          </div>
          <div>
            <SafetyWorkerTable workerList={formData.WORKER_LIST} handleWorkerPosition={this.handleWorkerPosition} workerRemove={this.workerRemove} />
          </div>

          <div className="middleTitle">
            <AppstoreTwoTone style={{ marginRight: '5px', verticalAlign: 'middle' }} />
            <span className="middleTitleText">투입장비</span>
          </div>
          <div>
            <SafetyEquipTable equipList={formData.EQUIP_LIST} equipRemove={this.equipRemove} />
          </div>
        </ContentsWrapper>
        <AntdModal
          className="modal-table-pad"
          title={modalTitle}
          width={modalType === 'cmpny' || modalType === 'equip' ? '790px' : '70%'}
          visible={modalVisible}
          footer={null}
          onOk={() => this.handleModal('', false)}
          onCancel={() => this.handleModal('', false)}
        >
          {modalType === 'penalty' && (
            <PenaltyItem penaltyItem={penaltyItem || []} rowSelect={this.handleRowSeletePenaltyItem} onSave={this.handleSavePenaltyItems} />
          )}
          {modalType === 'safetyWork' && <BizMicroDevBase component={SearchSafetyWork} sagaKey="safetyWork_search" rowSelect={this.handleSafetyWorkSelect} />}
          {modalType === 'userSelect' && <UserSelect onUserSelectHandler={undefined} onUserSelectedComplete={this.onSelectedComplete} onCancel={undefined} />}
        </AntdModal>
      </Styled>
    );
  }
}

SafetyWorkMain.propTypes = {
  pageType: PropTypes.string,
  workNo: PropTypes.string,
  result: PropTypes.object,
  sagaKey: PropTypes.string,
  getCallDataHandlerReturnRes: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
  getCallDataHandler: PropTypes.func,
};

export default SafetyWorkMain;
