import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Input, Modal } from 'antd';
import { CaretDownOutlined, AppstoreTwoTone } from '@ant-design/icons';
import BizMicroDevBase from 'components/BizMicroDevBase';
import HstCmpnyUserSelectComp from 'apps/eshs/user/safety/safetyEdu/HstCmpnyUserTable';
import CustomListPage from 'apps/eshs/user/safety/pledge/pages/ListPage';
import BizBuilderBase from 'components/BizBuilderBase';
import EshsCmpnyComp from 'components/BizBuilder/Field/EshsCmpnyComp';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledModalWrapper from 'commonStyled/EshsStyled/Modal/StyledSelectModal';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import SafetyWorkerTable from '../../SafetyWorker';
import SafetyEdu from '../../../safetyEdu';
import Styled from './Styled';
import SearchSafetyWork from '../search';
import SafetyWorkInfo from '../../SafetyWorkInfo';

const AntdModal = StyledModalWrapper(Modal);

class SafetyWorkMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: '',
      modalVisible: false,
      selectedWorkerList: [],
      formData: {
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
        REQ_CMPNY_CD: props.profile.PSTN_ID, // 발주회사        (String, 2)
        REQ_DEPT_CD: props.profile.DEPT_ID, //  발주회사 부서   (String, 20)
        REQ_EMP_NO: props.profile.USER_ID, // 발주회사 담당자 (String, 10)
        REQ_SUPERVISOR_EMP_NO: '', //   발주회사 감독자 (String, 10)
        EXM_CMPNY_CD: '', //            검토 회사 코드  (String, 2)
        EXM_DEPT_CD: '', //             검토 회사 부서  (String, 20)
        EXM_EMP_NO: '', //              검토 회사 담당자(String, 10)
        REQUEST_GB: '일반', //          신청구분        (String, 6)   [일반, 긴급, 미허가]
        FINAL_OK_EMP_NO: '', //         최종결재자 사번 (String, 10)
        FIRE_MANAGER: '', //            화재감시 담당   (String, 50)
        // ------------------------------------------------------------------------ SWTB_SFAETY_WORK - 안전작업 정보
        WORKER_LIST: [],
        // ------------------------------------------------------------------------ SWTB_WORKER_TR - 안전작업 투입 작업자 정보
        REQ_CMPNY_NM: props.profile.PSTN_NAME_KOR, // 발주회사명
        REQ_DEPT_NM: props.profile.DEPT_NAME_KOR, // 발주부서명
        REQ_EMP_NM: props.profile.NAME_KOR, // 담당자명
        REQ_SUPERVISOR_EMP_NM: '', //   발주회사 감독자명
        EXM_EMP_NM: '', // 검토회사 담당자명
        FINAL_OK_EMP_NM: '', // 최종결재자 사번
        REQUEST_DT: '',
      },
    };
  }

  componentDidMount() {
    const { sagaKey, getCallDataHandler } = this.props;
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
    ];
    getCallDataHandler(sagaKey, apiArr);
  }

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
        SUB_WCATEGORY: (searchSafetyWork.SUB_WCATEGORY && searchSafetyWork.SUB_WCATEGORY.split(',')) || [],
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
      message.error(<MessageContent>작업번호가 없습니다. 먼저 작업번호를 등록 후 클릭하십시오.</MessageContent>);
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
      FROM_DT: '',
      TO_DT: '',
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
  workerTableRowSelect = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedWorkerList: selectedRowKeys,
    });
    console.debug(selectedRowKeys);
  };

  // 모달 핸들러
  handleModal = (type, visible) => {
    this.setState({
      modalType: type,
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
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/safetyWork', submitData);
        break;
      case 'DELETE':
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/safetyWork', submitData);
        break;
      case 'SAVE':
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/safetyWork', submitData);
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
    this.setState({
      formData: {
        ...formData,
        WORK_NO,
      },
    });
  };

  render() {
    const { modalType, modalVisible, formData, selectedWorkerList } = this.state;
    const { result } = this.props;
    // getCallData
    // const eshsCmpnyList = (result && result.getEshsCmpnyList && result.getEshsCmpnyList.list) || [];
    const eshsHstCmpnyUserList = (result && result.getHstCmpnyUser && result.getHstCmpnyUser.list) || [];
    const rowSelection = {
      columnWidth: '10%',
      selectedRowKeys: selectedWorkerList,
      onChange: this.workerTableRowSelect,
    };
    console.debug('렌더링-state', formData);
    return (
      <Styled>
        <StyledSearchWrap>
          <div className="search-group-layer">
            <div className="searchCmpnyWrap">
              <label>
                작업번호
                <Input className="ant-input-sm" style={{ width: '150px', marginLeft: '5px', marginRight: '5px' }} value={formData.WORK_NO} />
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
                추가 / 연장
              </StyledButton>
            ) : (
              <>
                <StyledButton className="btn-primary btn-xs btn-first" onClick={() => console.debug('추가 / 연장')} style={{ marginBottom: '5px' }}>
                  저장
                </StyledButton>
                <StyledButton className="btn-primary btn-xs btn-first" onClick={() => console.debug('추가 / 연장')} style={{ marginBottom: '5px' }}>
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
          />
          <div className="middleTitle">
            <AppstoreTwoTone style={{ marginRight: '5px', verticalAlign: 'middle' }} />
            <span className="middleTitleText">작업자</span>
            <StyledButton className="btn-primary btn-xxs btn-first" onClick={() => console.debug('+버튼')}>
              작업자 인원 추가
            </StyledButton>
            <StyledButton className="btn-primary btn-xxs btn-first" onClick={() => this.handleModal('safetyEdu', true)}>
              안전교육 등록
            </StyledButton>
            <StyledButton className="btn-primary btn-xxs btn-first" onClick={() => this.handleGetWorkers()}>
              안전교육 수료자 가져오기
            </StyledButton>
          </div>
          <div>
            <SafetyWorkerTable workerList={formData.WORKER_LIST} rowSelection={rowSelection} handleWorkerPosition={this.handleWorkerPosition} />
          </div>
          <div className="middleTitle">
            <AppstoreTwoTone style={{ marginRight: '5px', verticalAlign: 'middle' }} />
            <span className="middleTitleText">투입장비</span>
            <StyledButton className="btn-primary btn-xxs btn-first" onClick={() => console.debug('+버튼')}>
              투입 장비 추가
            </StyledButton>
          </div>
          <div>투입장비 테이블 들어올곳</div>
        </ContentsWrapper>
        <AntdModal
          title="모달테스트"
          width={modalType === 'cmpny' ? '790px' : '70%'}
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
          {modalType === 'worker' && <div>Test</div>}
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
