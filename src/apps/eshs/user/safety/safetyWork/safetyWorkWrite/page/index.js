import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Input, Modal } from 'antd';
import { CaretDownOutlined, AppstoreTwoTone } from '@ant-design/icons';
import BizMicroDevBase from 'components/BizMicroDevBase';
import HstCmpnyUserSelectComp from 'apps/eshs/user/safety/safetyWork/safetyEdu/HstCmpnyUserTable';
import BizBuilderBase from 'components/BizBuilderBase';
import EshsCmpnyComp from 'components/BizBuilder/Field/EshsCmpnyComp';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledModalWrapper from 'commonStyled/EshsStyled/Modal/StyledSelectModal';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import WorkerSearch from '../../workerMgt/Search';
import CustomListPage from '../../pledge/pages/ListPage';
import SafetyEdu from '../../safetyEdu';
import SafetyWorkerTable from '../../commonComponents/SafetyWorker';
import SafetyEquipTable from '../../commonComponents/SafetyEquip';
import SafetyEquipSelect from '../../commonComponents/SafetyEquip/EquipSelect';
import SafetyWorkInfo from '../../commonComponents/SafetyWorkInfo';
import SearchSafetyWork from '../../commonComponents/safetyWorkSearch';
import Styled from './Styled';

const AntdModal = StyledModalWrapper(Modal);

class SafetyWorkMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      formData: {
        // ------------------------------------------------------------------------ SWTB_SFAETY_WORK - 안전작업 정보
        WORK_NO: '', //                 작업번호        (String, 13)
        TITLE: '', //                   작업명          (String, 100)
        WCATEGORY: '', //               작업종류        (String, 40)
        SUB_WCATEGORY: [], //           보충작업종류    (String, 40)
        WORK_DESC: '', //               작업내용        (String, 300)
        WRK_CMPNY_CD: '', //            작업업체 코드   (String, 10)
        WLOC: '', //                    작업장소        (String, 100)
        WGUBUN: '신규', //              작업구분        (String, 4)   [신규, 변경, 이설, 철거, 기타]
        SITE: '청주', //                지역            (String, 4)   [이천, 청주, 구미]
        DGUBUN: 'C-1', //               작업동          (String, 50)  [C-1, C-2, R, 청주기타, F1동, F3동, A1동, D.I동, 기숙사동, 구미기타]
        FROM_DT: '', //                 허가 요청날짜   (Date)
        TO_DT: '', //                   허가 요청날짜   (Date)
        FROM_TIME: '09', //               허가 요청시간   (String, 2)
        TO_TIME: '18', //                 허가 요청시간   (String, 2)
        PLEDGE_NO: '', //               서약서 번호     (String, 13)
        DETB_DANEST: '', //             위험성 평가번호 (String, 13)
        REQ_CMPNY_CD: '', // 발주회사        (String, 10)
        REQ_DEPT_CD: '', //  발주회사 부서   (String, 20)
        REQ_EMP_NO: '', // 발주회사 담당자 (String, 10)
        REQ_SUPERVISOR_EMP_NO: '', //   발주회사 감독자 (String, 10)
        EXM_CMPNY_CD: '', //            검토 회사 코드  (String, 2)
        EXM_DEPT_CD: '', //             검토 회사 부서  (String, 20)
        EXM_EMP_NO: '', //              검토 회사 담당자(String, 10)
        REQUEST_GB: '일반', //          신청구분        (String, 6)   [일반, 긴급, 미허가]
        FINAL_OK_EMP_NO: '', //         최종결재자 사번 (String, 10)
        FIRE_MANAGER: '', //            화재감시 담당   (String, 50)
        // ------------------------------------------------------------------------ SWTB_WORKER_TR - 안전작업 투입 작업자 정보
        WORKER_LIST: [],
        // ------------------------------------------------------------------------ SWTB_EQUIP - 안전작업 투입 장비 정보
        EQUIP_LIST: [],
        // ------------------------------------------------------------------------ fileUpload
        fileList: [],
        responseList: [],
        // ------------------------------------------------------------------------ DB insert 시 제외되는 데이터 (View 에서만 사용됨)
        REQ_CMPNY_NM: '', // 발주회사명
        REQ_DEPT_NM: '', // 발주부서명
        REQ_EMP_NM: '', // 담당자명
        REQ_SUPERVISOR_EMP_NM: '', //   발주회사 감독자명
        EXM_EMP_NM: '', // 검토회사 담당자명
        FINAL_OK_EMP_NM: '', // 최종결재자 사번
        REQUEST_DT: moment().format('YYYY-MM-DD'),
      },
    };
  }

  componentDidMount() {
    const { sagaKey, getCallDataHandler, profile } = this.props;
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
        url: `/api/eshs/v1/common/EshsCmpnyList/null/null`,
      },
      {
        /* SWTB_장비리스트 : /api/eshs/v1/common/eshsSwtbEquip */
        key: 'getSwtbEquipList',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsSwtbEquip`,
      },
      {
        key: 'getMyInfo',
        type: 'GET',
        url: `/api/eshs/v1/common/EshsUserSearch?searchType=safetyWork&keyword=${profile.USER_ID}`,
      },
    ];
    getCallDataHandler(sagaKey, apiArr, this.initForm);
  }

  initForm = () => {
    const { formData } = this.state;
    const { result } = this.props;
    const myInfo = (result && result.getMyInfo && result.getMyInfo.myInfo) || {};
    this.setState({
      formData: {
        ...formData,
        REQ_CMPNY_CD: myInfo.CMPNY_ID,
        REQ_DEPT_CD: myInfo.DEPT_ID,
        REQ_EMP_NO: myInfo.EMP_NO,
        REQ_CMPNY_NM: myInfo.CMPNY_NM,
        REQ_DEPT_NM: myInfo.DEPT_NM,
        REQ_EMP_NM: myInfo.EMP_NM,
      },
    });
  };

  handleGetSafetyWork = () => {
    const { formData } = this.state;
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const type = 'searchOne';
    const apiInfo = {
      key: 'getSafetyWork',
      type: 'GET',
      url: `/api/eshs/v1/common/safetyWork?type=${type}&keyword=${formData.WORK_NO}`,
    };
    if (formData.WORK_NO === '') {
      message.error(<MessageContent>작업번호가 없습니다. 먼저 작업번호를 선택 후 검색하십시오.</MessageContent>);
      return;
    }
    getCallDataHandlerReturnRes(id, apiInfo, this.getSafetyWorkCallback);
  };

  getSafetyWorkCallback = (id, response) => {
    // const { result } = this.props;
    // const searchSafetyWork = (result && result.getSafetyWork && result.getSafetyWork.safetyWork) || {};
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
        fileList: [],
        responseList: [],
      },
    });
  };

  // 안전교육 수료자 가져오기
  handleGetWorkers = () => {
    const { formData } = this.state;
    const { sagaKey: id, getCallDataHandler } = this.props;
    const type = 'searchByEdu';
    const apiArr = [
      {
        key: 'getWorkers',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsWorker?type=${type}&keyword=${formData.WRK_CMPNY_CD}`,
      },
    ];

    if (formData.WORK_NO === '') {
      message.error(<MessageContent>작업번호가 없습니다. 먼저 작업번호를 등록해주십시오.</MessageContent>);
      return;
    }
    if (formData.WRK_CMPNY_CD === '') {
      message.error(<MessageContent>작업업체를 먼저 지정해 주십시오.</MessageContent>);
      return;
    }
    getCallDataHandler(id, apiArr, this.getWorkerCallback);
  };

  // 작업자 검색 콜백
  getWorkerCallback = () => {
    const { result } = this.props;
    const { formData } = this.state;
    const searchWorkerList = (result && result.getWorkers && result.getWorkers.workerList) || [];
    const nextWorkerList = searchWorkerList.map(worker => ({
      key: worker.WORKER_SEQ,
      WORK_NO: formData.WORK_NO,
      WORKER_NM: worker.WORKER_NM,
      WORKER_SSN: worker.WORKER_SSN,
      POSITION: '작업자',
      REMARK: '',
      WORKER_IDX: '',
      WORKER_SEQ: worker.WORKER_SEQ,
      EDU_CHECK: worker.EDU_CHECK,
      TEL: worker.TEL,
      M_TEL: worker.M_TEL,
    }));
    this.setState({
      formData: {
        ...formData,
        WORKER_LIST: nextWorkerList,
      },
    });
  };

  // 작업자 로우셀렉트
  workerRemove = index => {
    const { formData } = this.state;
    const nextWorkerList = formData.WORKER_LIST.filter((worker, idx) => idx !== index);
    this.setState({
      formData: {
        ...formData,
        WORKER_LIST: nextWorkerList,
      },
    });
  };

  // 모달 핸들러
  handleModal = (type, visible) => {
    let title = '';
    switch (type) {
      case 'supervisor':
        title = '감독자 선택';
        break;
      case 'cmpny':
        title = '작업업체 선택';
        break;
      case 'pledge':
        title = '서약서 선택';
        break;
      case 'worker':
        title = '작업자 선택';
        break;
      case 'equip':
        title = '투입장비 선택';
        break;
      case 'safetyEdu':
        title = '안전교육 등록';
        break;
      case 'safetyWork':
        title = '안전작업 선택';
        break;
      case 'exm':
        title = '검토자 선택';
        break;
      case 'final':
        title = '최종 검토자 선택';
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

  // 감독자 선택
  handleHstUserSelect = record => {
    const { modalType, formData } = this.state;
    let field = '';
    switch (modalType) {
      case 'supervisor':
        field = 'REQ_SUPERVISOR_EMP_NO';
        this.setState({
          modalType: '',
          modalTitle: '',
          modalVisible: false,
          formData: {
            ...formData,
            [field]: record.SQ_SWTB_HST_CMPNY_EMP,
            [field.replace('NO', 'NM')]: record.EMP_NM,
          },
        });
        break;
      case 'exm':
        field = 'EXM_EMP_NO';
        this.setState({
          modalType: '',
          modalTitle: '',
          modalVisible: false,
          formData: {
            ...formData,
            EXM_CMPNY_CD: record.HST_CMPNY_CD,
            EXM_DEPT_CD: record.DEPT_CD,
            [field]: record.SQ_SWTB_HST_CMPNY_EMP,
            [field.replace('NO', 'NM')]: record.EMP_NM,
          },
        });
        break;
      default:
        field = 'FINAL_OK_EMP_NO';
        this.setState({
          modalType: '',
          modalTitle: '',
          modalVisible: false,
          formData: {
            ...formData,
            [field]: record.SQ_SWTB_HST_CMPNY_EMP,
            [field.replace('NO', 'NM')]: record.EMP_NM,
          },
        });
        break;
    }
  };

  // 거래처 선택
  handleCmpnySelect = (cmpnyInfo, field) => {
    const { formData } = this.state;
    this.setState({
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      formData: {
        ...formData,
        [field]: cmpnyInfo.WRK_CMPNY_CD,
        [field.replace('CD', 'NM')]: cmpnyInfo.WRK_CMPNY_NM,
      },
    });
  };

  // 서약서 선택
  handlePledgeSelect = record => {
    const { formData } = this.state;
    this.setState({
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      formData: {
        ...formData,
        PLEDGE_NO: record.PLEDGE_NO,
      },
    });
  };

  // 주작업선택
  handleWorkCategory = value => {
    const { formData } = this.state;
    if (value !== '화기작업') {
      this.setState({
        formData: {
          ...formData,
          WCATEGORY: value,
          FIRE_MANAGER: '',
        },
      });
      return;
    }
    this.setState({
      formData: {
        ...formData,
        WCATEGORY: value,
      },
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

  handleWorkerPosition = (index, value) => {
    const { formData } = this.state;
    const { WORKER_LIST } = formData;
    WORKER_LIST[index].POSITION = value;
    this.handleChangeFormData('WORKER_LIST', WORKER_LIST);
  };

  // state FormData 변경
  handleChangeFormData = (field, value) => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [field]: value,
      },
    });
  };

  submitFormData = type => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { formData } = this.state;
    const submitData = { PARAM: formData };
    switch (type) {
      case 'ADD':
        // 작업번호 생성 및 작업정보 입력
        if (this.validFormData(formData)) {
          submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/safetyWork', submitData, this.safetyWorkAddCallback);
        }
        break;
      case 'UPDATE':
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/safetyWork', submitData, this.safetyWorkUpdateCallback);
        break;
      case 'DELETE':
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/safetyWork', submitData, this.safetyWorkDeleteCallback);
        break;
      default:
        break;
    }
  };

  // 폼데이터 유효성 점검
  validFormData = formData => {
    const validList = [
      { field: 'WRK_CMPNY_CD', name: '작업업체' },
      { field: 'WCATEGORY', name: '주작업' },
      { field: 'EXM_EMP_NO', name: '검토자' },
      { field: 'TITLE', name: '작업명' },
      { field: 'FINAL_OK_EMP_NO', name: '최종검토자' },
      { field: 'WLOC', name: '작업장소' },
      { field: 'FROM_DT', name: '작업기간' },
    ];
    const invalid = validList.findIndex(valid => formData[valid.field] === '');
    if (invalid !== -1) {
      message.error(<MessageContent>{`${validList[invalid].name}은(는) 필수 입력사항 입니다.`}</MessageContent>);
      return false;
    }
    return true;
  };

  safetyWorkAddCallback = (id, response) => {
    const { formData } = this.state;
    const { WORK_NO } = response;
    if (formData.WORK_NO === '') {
      if (WORK_NO === '') {
        message.error(<MessageContent>안전작업 추가 신청 실패</MessageContent>);
        return;
      }
      message.success(<MessageContent>안전작업 추가 신청 완료</MessageContent>);
    } else {
      if (WORK_NO === '') {
        message.error(<MessageContent>안전작업 연장 신청 실패</MessageContent>);
        return;
      }
      message.success(<MessageContent>안전작업 연장 신청 완료</MessageContent>);
    }
    this.setState({
      formData: {
        ...formData,
        WORK_NO,
      },
    });
  };

  // 작업 저장 콜백
  safetyWorkUpdateCallback = (id, response) => {
    const { result } = response;
    if (result && result === 'fail') {
      message.error(<MessageContent>안전작업 정보를 저장하지 못하였습니다.</MessageContent>);
      return;
    }
    message.success(<MessageContent>안전작업 정보를 저장하였습니다.</MessageContent>);
  };

  // 작업 삭제 콜백
  safetyWorkDeleteCallback = (id, response) => {
    const { formData } = this.state;
    const { result } = response;
    if (result && result === 'fail') {
      message.error(<MessageContent>안전작업 정보 삭제에 실패했습니다.</MessageContent>);
      return;
    }
    this.setState(
      {
        formData: {
          ...formData,
          WORK_NO: '',
          TITLE: '',
          WCATEGORY: '',
          SUB_WCATEGORY: [],
          WORK_DESC: '',
          WRK_CMPNY_CD: '',
          WRK_CMPNY_NM: '',
          WLOC: '',
          WGUBUN: '신규',
          SITE: '청주',
          DGUBUN: 'C-1',
          FROM_DT: '',
          TO_DT: '',
          FROM_TIME: '09',
          TO_TIME: '18',
          PLEDGE_NO: '',
          DETB_DANEST: '',
          REQ_SUPERVISOR_EMP_NO: '',
          EXM_CMPNY_CD: '',
          EXM_DEPT_CD: '',
          EXM_EMP_NO: '',
          REQUEST_GB: '일반',
          FINAL_OK_EMP_NO: '',
          FIRE_MANAGER: '',
          WORKER_LIST: [],
          EQUIP_LIST: [],
          fileList: [],
          responseList: [],
          REQ_SUPERVISOR_EMP_NM: '',
          EXM_EMP_NM: '',
          FINAL_OK_EMP_NM: '',
        },
      },
      () => message.success(<MessageContent>안전작업 정보를 삭제하였습니다.</MessageContent>),
    );
  };

  // 작업자 추가
  workerAdd = workers => {
    const { formData } = this.state;
    const workerSeqList = formData.WORKER_LIST.map(worker => worker.WORKER_SEQ);
    const newWorkers = workers
      .filter(worker => !workerSeqList.includes(worker.WORKER_SEQ))
      .map(worker => ({
        key: worker.WORKER_SEQ,
        WORK_NO: formData.WORK_NO,
        WORKER_NM: worker.WORKER_NM,
        WORKER_SSN: worker.WORKER_SSN,
        POSITION: '작업자',
        REMARK: '',
        WORKER_IDX: '',
        WORKER_SEQ: worker.WORKER_SEQ,
        EDU_CHECK: worker.EDU_CHECK,
        TEL: worker.TEL,
        M_TEL: worker.M_TEL,
      }));
    this.setState({
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      formData: {
        ...formData,
        WORKER_LIST: formData.WORKER_LIST.concat(newWorkers),
      },
    });
  };

  // 작업장비 추가
  equipAdd = equip => {
    const { formData } = this.state;
    const newEquip = {
      EGROUP: equip.CODE,
      EQUIP_NM: equip.NAME_KOR,
    };
    const prevEquipList = formData.EQUIP_LIST || [];
    this.setState({
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      formData: {
        ...formData,
        EQUIP_LIST: prevEquipList.concat(newEquip),
      },
    });
  };

  equipRemove = index => {
    const { formData } = this.state;
    const nextEquipList = formData.EQUIP_LIST.filter((equip, idx) => idx !== index);
    this.setState({
      formData: {
        ...formData,
        EQUIP_LIST: nextEquipList,
      },
    });
  };

  // 테스트업로드
  handleUploadFileChange = ({ fileList }) => {
    const { formData } = this.state;
    const responseList = [];
    fileList.map(item => responseList.push(item.response));
    this.setState({
      formData: {
        ...formData,
        fileList,
        responseList,
      },
    });
  };

  render() {
    const { modalType, modalTitle, modalVisible, formData } = this.state;
    const { result } = this.props;
    // getCallData
    // const eshsCmpnyList = (result && result.getEshsCmpnyList && result.getEshsCmpnyList.list) || [];
    const eshsHstCmpnyUserList = (result && result.getHstCmpnyUser && result.getHstCmpnyUser.list) || [];
    const eshsSwtbEquip = (result && result.getSwtbEquipList && result.getSwtbEquipList.list) || [];
    console.debug('렌더링-state', this.state);
    console.debug('렌더링-props', this.props);
    return (
      <Styled>
        <StyledSearchWrap>
          <div className="search-group-layer">
            <div className="searchCmpnyWrap">
              <label>
                작업번호
                <Input
                  className="ant-input-sm"
                  style={{ width: '150px', marginLeft: '5px', marginRight: '5px' }}
                  value={formData.WORK_NO}
                  onClick={() => this.handleModal('safetyWork', true)}
                />
              </label>
            </div>
            <div
              className="searchCmpnyBtn"
              tabIndex={0}
              onClick={() => this.handleModal('safetyWork', true)}
              onKeyPress={() => this.handleModal('safetyWork', true)} // esLint
              role="button" // esLint
            >
              <CaretDownOutlined />
            </div>
            <StyledButton className="btn-primary btn-xs btn-first" onClick={() => this.handleGetSafetyWork()} style={{ marginBottom: '5px' }}>
              검색
            </StyledButton>
            {formData.WORK_NO === '' ? (
              <StyledButton className="btn-primary btn-xs btn-first" onClick={() => this.submitFormData('ADD')} style={{ marginBottom: '5px' }}>
                추가
              </StyledButton>
            ) : (
              <>
                <StyledButton className="btn-primary btn-xs btn-first" onClick={() => this.submitFormData('ADD')} style={{ marginBottom: '5px' }}>
                  연장
                </StyledButton>
                <StyledButton className="btn-primary btn-xs btn-first" onClick={() => this.submitFormData('UPDATE')} style={{ marginBottom: '5px' }}>
                  저장
                </StyledButton>
                <StyledButton className="btn-primary btn-xs btn-first" onClick={() => this.submitFormData('DELETE')} style={{ marginBottom: '5px' }}>
                  삭제
                </StyledButton>
              </>
            )}
            <StyledButton className="btn-primary btn-xs btn-first" onClick={() => console.debug('안전교육 서약서')} style={{ marginBottom: '5px' }}>
              안전교육 서약서
            </StyledButton>
            <StyledButton className="btn-primary btn-xs btn-first" onClick={() => console.debug('(청주) 중량물 작업계획서')} style={{ marginBottom: '5px' }}>
              (청주) 중량물 작업계획서
            </StyledButton>
            <StyledButton className="btn-primary btn-xs btn-first" onClick={() => console.debug('(청주) 밀폐공간 체크리스트')} style={{ marginBottom: '5px' }}>
              (청주) 밀폐공간 체크리스트
            </StyledButton>
            <StyledButton className="btn-primary btn-xs btn-first" onClick={() => console.debug('(청주) 안전계획/절차서')} style={{ marginBottom: '5px' }}>
              (청주) 안전계획/절차서
            </StyledButton>
          </div>
        </StyledSearchWrap>
        <ContentsWrapper>
          <SafetyWorkInfo
            formData={formData}
            handleModal={this.handleModal}
            handleChangeFormData={this.handleChangeFormData}
            handleWorkCategory={this.handleWorkCategory}
            handleUploadFileChange={this.handleUploadFileChange}
            fileList={this.state.fileList || []}
          />
          <div className="middleTitle">
            <AppstoreTwoTone style={{ marginRight: '5px', verticalAlign: 'middle' }} />
            <span className="middleTitleText">작업자</span>
            <StyledButton
              className="btn-primary btn-xxs btn-first"
              onClick={() => {
                if (formData.WORK_NO === '') {
                  message.error(<MessageContent>작업번호가 없습니다. 먼저 작업번호를 선택 후 추가하십시오.</MessageContent>);
                  return;
                }
                this.handleModal('worker', true);
              }}
            >
              작업자 추가
            </StyledButton>
            <StyledButton className="btn-primary btn-xxs btn-first" onClick={() => this.handleModal('safetyEdu', true)}>
              안전교육 등록
            </StyledButton>
            <StyledButton className="btn-primary btn-xxs btn-first" onClick={() => this.handleGetWorkers()}>
              안전교육 수료자 가져오기
            </StyledButton>
          </div>
          <div>
            <SafetyWorkerTable workerList={formData.WORKER_LIST} handleWorkerPosition={this.handleWorkerPosition} workerRemove={this.workerRemove} />
          </div>
          <div className="middleTitle">
            <AppstoreTwoTone style={{ marginRight: '5px', verticalAlign: 'middle' }} />
            <span className="middleTitleText">투입장비</span>
            <StyledButton
              className="btn-primary btn-xxs btn-first"
              onClick={() => {
                if (formData.WORK_NO === '') {
                  message.error(<MessageContent>작업번호가 없습니다. 먼저 작업번호를 선택 후 추가하십시오.</MessageContent>);
                  return;
                }
                this.handleModal('equip', true);
              }}
            >
              투입 장비 추가
            </StyledButton>
          </div>
          <div>
            <SafetyEquipTable equipList={formData.EQUIP_LIST} equipRemove={this.equipRemove} />
          </div>
        </ContentsWrapper>
        <AntdModal
          title={modalTitle}
          width={modalType === 'cmpny' || modalType === 'equip' ? '790px' : '70%'}
          visible={modalVisible}
          footer={null}
          onOk={() => this.handleModal('', false)}
          onCancel={() => this.handleModal('', false)}
        >
          {(modalType === 'supervisor' || modalType === 'exm' || modalType === 'final') && (
            <HstCmpnyUserSelectComp eshsHstCmpnyUserList={eshsHstCmpnyUserList} rowOnclick={this.handleHstUserSelect} />
          )}
          {modalType === 'cmpny' && (
            <EshsCmpnyComp
              sagaKey={this.props.sagaKey}
              getExtraApiData={this.props.getCallDataHandler}
              extraApiData={this.props.result}
              colData={formData.WRK_CMPNY_CD}
              directSearchTable
              visible
              CONFIG={{ property: { isRequired: false } }}
              changeFormData={() => false}
              COMP_FIELD="WRK_CMPNY_CD"
              eshsCmpnyCompResult={(cmpnyInfo, field) => this.handleCmpnySelect(cmpnyInfo, field)}
            />
          )}
          {modalType === 'pledge' && (
            <BizBuilderBase
              key="pledge_search"
              sagaKey="pledge_search"
              workSeq={6141}
              taskSeq={-1}
              viewType="LIST"
              CustomListPage={CustomListPage}
              customOnRowClick={record => this.handlePledgeSelect(record)}
            />
          )}
          {modalType === 'worker' && <BizMicroDevBase component={WorkerSearch} sagaKey="Worker_search" onSave={this.workerAdd} />}
          {modalType === 'equip' && <SafetyEquipSelect equipList={eshsSwtbEquip} rowSelect={this.equipAdd} />}
          {modalType === 'safetyEdu' && <SafetyEdu />}
          {modalType === 'safetyWork' && <BizMicroDevBase component={SearchSafetyWork} sagaKey="safetyWork_search" rowSelect={this.handleSafetyWorkSelect} />}
        </AntdModal>
      </Styled>
    );
  }
}

SafetyWorkMain.propTypes = {
  // type - number
  // type - string
  sagaKey: PropTypes.string,
  // type - object
  result: PropTypes.object,
  profile: PropTypes.object,
  // type - func
  getCallDataHandler: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
  getCallDataHandlerReturnRes: PropTypes.func,
};

export default SafetyWorkMain;
