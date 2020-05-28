import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Input, Modal } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import BizMicroDevBase from 'components/BizMicroDevBase';
import EshsCmpnyComp from 'components/BizBuilder/Field/EshsCmpnyComp';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledModalWrapper from 'commonStyled/EshsStyled/Modal/StyledSelectModal';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import SafetyWorkInfo from '../../commonComponents/illegalSafetyWorkInfo';
import SearchSafetyWork from '../../commonComponents/safetyWorkSearch';
import Styled from './Styled';

const AntdModal = StyledModalWrapper(Modal);

class WritePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        WGUBUN: '신규', //              작업구분        (String, 4)   [신규, 변경, 이설, 철거, 기타]
        SITE: '청주', //                지역            (String, 4)   [이천, 청주, 구미]
        REQ_CMPNY_CD: '', // 발주회사        (String, 2)
        REQ_DEPT_CD: '', //  발주회사 부서   (String, 20)
        REQUEST_GB: '미허가', //          신청구분        (String, 6)   [일반, 긴급, 미허가]
        CREATE_DT: '',
        REQ_CMPNY_NM: '', // 발주회사명
        REQ_DEPT_NM: '', // 발주부서명
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
        url: `/api/eshs/v1/common/EshsCmpnyList?gubun=SW`,
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
        REQ_CMPNY_NM: myInfo.CMPNY_NM,
        REQ_DEPT_NM: myInfo.DEPT_NM,
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
      case 'cmpny':
        title = '작업업체 선택';
        break;
      case 'safetyWork':
        title = '긴급작업 선택';
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

  // 주작업선택
  handleWorkCategory = value => {
    const { formData } = this.state;
    if (value !== '화기작업') {
      this.setState({
        formData: {
          ...formData,
          WCATEGORY: value,
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
        if (this.validFormData(formData)) {
          submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/illegalsafetyWork', submitData, this.safetyWorkAddCallback);
        }
        break;
      case 'UPDATE':
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/illegalsafetyWork', submitData, this.safetyWorkUpdateCallback);
        break;
      case 'DELETE':
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/illegalsafetyWork', submitData, this.safetyWorkDeleteCallback);
        break;
      default:
        break;
    }
  };

  // 폼데이터 유효성 점검
  validFormData = formData => {
    const validList = [
      { field: 'WRK_CMPNY_CD', name: '작업업체' },
      { field: 'TITLE', name: '작업명' },
      { field: 'WLOC', name: '작업장소' },
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
        message.error(<MessageContent>긴급작업 추가 실패</MessageContent>);
        return;
      }
      message.success(<MessageContent>긴급작업 추가 완료</MessageContent>);
    }
    this.setState({
      formData: {
        ...formData,
        WORK_NO,
        CREATE_DT: moment().format('YYYY-MM-DD'),
      },
    });
  };

  // 작업 저장 콜백
  safetyWorkUpdateCallback = (id, response) => {
    const { result } = response;
    if (result && result === 'fail') {
      message.error(<MessageContent>긴급작업 정보를 저장하지 못하였습니다.</MessageContent>);
      return;
    }
    message.success(<MessageContent>긴급작업 정보를 저장하였습니다.</MessageContent>);
  };

  // 작업 삭제 콜백
  safetyWorkDeleteCallback = (id, response) => {
    const { formData } = this.state;
    const { result } = response;
    if (result && result === 'fail') {
      message.error(<MessageContent>긴급작업 정보 삭제에 실패했습니다.</MessageContent>);
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
          WLOC: '',
          WGUBUN: '신규',
          SITE: '청주',
          REQUEST_DT: '',
          CREATE_DT: '',
        },
      },
      () => message.success(<MessageContent>긴급작업 정보를 삭제하였습니다.</MessageContent>),
    );
  };

  render() {
    const { modalType, modalTitle, modalVisible, formData } = this.state;
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
                <StyledButton className="btn-primary btn-xs btn-first" onClick={() => this.submitFormData('UPDATE')} style={{ marginBottom: '5px' }}>
                  저장
                </StyledButton>
                <StyledButton className="btn-primary btn-xs btn-first" onClick={() => this.submitFormData('DELETE')} style={{ marginBottom: '5px' }}>
                  삭제
                </StyledButton>
              </>
            )}
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
        </ContentsWrapper>
        <AntdModal
          title={modalTitle}
          width={modalType === 'cmpny' || modalType === 'equip' ? '790px' : '70%'}
          visible={modalVisible}
          footer={null}
          onOk={() => this.handleModal('', false)}
          onCancel={() => this.handleModal('', false)}
        >
          {modalType === 'cmpny' && (
            <EshsCmpnyComp
              sagaKey={this.props.sagaKey}
              getExtraApiData={this.props.getCallDataHandler}
              extraApiData={this.props.result}
              colData={formData.WRK_CMPNY_CD}
              directSearchTable
              visible
              CONFIG={{ property: { isRequired: false, GUBUN: 'SW' } }}
              changeFormData={() => false}
              COMP_FIELD="WRK_CMPNY_CD"
              eshsCmpnyCompResult={(cmpnyInfo, field) => this.handleCmpnySelect(cmpnyInfo, field)}
            />
          )}
          {modalType === 'safetyWork' && (
            <BizMicroDevBase component={SearchSafetyWork} sagaKey="illegalSafetyWork_search" rowSelect={this.handleSafetyWorkSelect} />
          )}
        </AntdModal>
      </Styled>
    );
  }
}

WritePage.propTypes = {
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

export default WritePage;
