import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Modal, Descriptions } from 'antd';
import { CaretDownOutlined, AppstoreTwoTone } from '@ant-design/icons';
import StyledModalWrapper from 'commonStyled/EshsStyled/Modal/StyledSelectModal';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import EshsCmpnyComp from 'components/BizBuilder/Field/EshsCmpnyComp';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import Styled from './Styled';
import EduListTable from '../SafetyEduList';
import EduInfoTable from '../EduInfoTable';
import WorkerInfoTable from '../WorkerInfoTable';

const AntdModal = StyledModalWrapper(Modal);

class EduMgt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      worker: {
        WRK_CMPNY_CD: '',
        WORKER_SSN: '',
        WORKER_NM: '',
        TEL: '',
        M_TEL: '',
      },
      workerList: [],
      selectedWorkerList: [],
      safetyEduList: [],
      modalType: '',
      modalVisible: false,
    };
  }

  componentDidMount() {
    const { sagaKey, getCallDataHandler } = this.props;
    const apiArr = [
      {
        /* 주관회사리스트 : /api/eshs/v1/common/eshsHstCompanyList */
        key: 'getHstCompny',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsHstCompanyList`,
      },
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
    ];
    getCallDataHandler(sagaKey, apiArr, this.getSearchListData);
    this.initFormData();
  }

  componentWillUnmount() {
    this.initFormData();
  }

  initFormData = () => {
    const { sagaKey, setFormData } = this.props;
    const initFormData = {
      EDU_NO: '',
      SITE: '청주',
      EDU_HOUR: '',
      LECT_EMP_NO: '',
      EDU_DT: '',
      EDU_LOC: '',
      WORK_NO: '',
      EDU_TARGET_GB: 1,
      OUT_LECT_SSN: '',
      LECT_CMPNY_CD: '',
      OUT_LECT_NM: '',
      LECT_HOST_GB: 1,
      EDU_YEAR: '',
      WRK_CMPNY_CD: '',
      WORKER_LIST: [],
    };
    this.setState(
      {
        worker: {
          WRK_CMPNY_CD: '',
          WORKER_SSN: '',
          WORKER_NM: '',
          TEL: '',
          M_TEL: '',
        },
        workerList: [],
        selectedWorkerList: [],
        safetyEduList: [],
        modalType: '',
        modalVisible: false,
      },
      () => setFormData(sagaKey, initFormData),
    );
  };

  handleModalVisible = (type, bool) => {
    this.setState({
      modalType: type,
      modalVisible: bool,
    });
  };

  // 거래처 선택
  handleSelectCmpny = (companyInfo, COMP_FIELD) => {
    const { sagaKey: id, changeFormData } = this.props;
    const { worker } = this.state;
    this.setState(
      {
        worker: {
          ...worker,
          WRK_CMPNY_CD: companyInfo.WRK_CMPNY_CD,
        },
      },
      () => {
        changeFormData(id, COMP_FIELD, companyInfo.WRK_CMPNY_CD);
        this.handleModalVisible('', false);
      },
    );
  };

  submitFormDataCallback = (id, response) => {
    const { setFormData } = this.props;
    const { PARAM, EDU_NO, result } = response;
    if (result === 'success') {
      const nextFormData = {
        ...PARAM,
        EDU_NO,
      };
      setFormData(id, nextFormData);
    }
  };

  // handle WorkerData Func
  submitFormData = type => {
    const { sagaKey: id, formData, submitHandlerBySaga } = this.props;
    const submitData = { PARAM: formData };
    let validResult = false;
    switch (type) {
      case 'INSERT':
        validResult = this.checkValidation(formData);
        if (validResult) {
          submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/safetyEdu', submitData, this.submitFormDataCallback);
        }
        break;
      case 'UPDATE':
        validResult = this.checkValidation(formData);
        if (validResult) {
          submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/safetyEdu', submitData);
        }
        break;
      case 'DELETE':
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/safetyEdu', submitData, this.initFormData);
        break;
      case 'SAVE':
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eduHistory', submitData, this.handleGetWorkers);
        break;
      default:
        break;
    }
  };

  checkValidation = () => {
    const { formData } = this.props;
    const { LECT_HOST_GB, EDU_TARGET_GB, EDU_YEAR, WORK_NO } = formData;
    const validList = ['EDU_DT', 'SITE', 'WRK_CMPNY_CD'];
    const msgTarget = {
      EDU_DT: '교육일자',
      SITE: '지역',
      WRK_CMPNY_CD: '거래처',
    };
    const validIdx = validList.findIndex(valid => formData[valid] === '');
    if (validIdx !== -1) {
      message.error(<MessageContent>{`${msgTarget[validList[validIdx]]}은(는) 필수 입력사항 입니다.`}</MessageContent>);
      return false;
    }
    const lectValidList = ['LECT_CMPNY_CD', 'OUT_LECT_SSN', 'LECT_EMP_NO', 'OUT_LECT_NM'];
    const lectValidMsgTarget = {
      LECT_CMPNY_CD: '교육회사',
      OUT_LECT_SSN: '외부강사 생년월일',
      LECT_EMP_NO: '내부강사 성명',
      OUT_LECT_NM: '외부강사 성명',
    };
    let lectValidIdx = -1;
    if (LECT_HOST_GB === 1) {
      lectValidIdx = lectValidList.findIndex((valid, index) => (index + 1) % 2 !== 0 && formData[valid] === '');
      if (lectValidIdx !== -1) {
        message.error(<MessageContent>{`${lectValidMsgTarget[lectValidList[lectValidIdx]]}은(는) 필수 입력사항 입니다.`}</MessageContent>);
        return false;
      }
    }
    if (LECT_HOST_GB === 2) {
      lectValidIdx = lectValidList.findIndex((valid, index) => (index + 1) % 2 === 0 && formData[valid] === '');
      if (lectValidIdx !== -1) {
        message.error(<MessageContent>{`${lectValidMsgTarget[lectValidList[lectValidIdx]]}은(는) 필수 입력사항 입니다.`}</MessageContent>);
        return false;
      }
    }
    if (EDU_TARGET_GB === 1 && EDU_YEAR === '') {
      message.error(<MessageContent>교육년도는 필수 입력사항 입니다.</MessageContent>);
      return false;
    }
    if (EDU_TARGET_GB === 2 && WORK_NO === '') {
      message.error(<MessageContent>작업번호는 필수 입력사항 입니다.</MessageContent>);
      return false;
    }
    return true;
  };

  renderInputColumns = (key, value) => {
    const fieldList = [
      { key: 'WORKER_SSN', size: 13 },
      { key: 'WORKER_NM', size: 20 },
      { key: 'TEL', size: 13 },
      { key: 'M_TEL', size: 13 },
    ];
    const keyField = fieldList.find(field => field.key === key);
    return <Input maxLength={keyField.size} value={value} onChange={e => this.changeWorkerFormData(keyField.key, e.target.value)} />;
  };

  changeWorkerFormData = (key, value) => {
    const { worker } = this.state;
    this.setState({
      worker: {
        ...worker,
        [key]: value,
      },
    });
  };

  // 작업자 검색
  handleGetWorkers = () => {
    const { sagaKey: id, getCallDataHandler, formData } = this.props;
    const type = 'search';
    const apiArr = [
      {
        key: 'getWorkers',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsWorker?type=${type}&keyword=${formData.WRK_CMPNY_CD}`,
      },
    ];
    getCallDataHandler(id, apiArr, this.getWorkerCallback);
  };

  // 작업자 검색 콜백
  getWorkerCallback = () => {
    const { result } = this.props;
    const nextWorkerList = (result && result.getWorkers && result.getWorkers.workerList) || [];
    this.setState({
      workerList: nextWorkerList,
    });
  };

  // 작업자 추가
  addWorker = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { worker } = this.state;
    const submitData = { PARAM: worker };
    const validResult = this.checkWorkerValidation(worker);
    if (validResult) {
      submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsWorker', submitData, this.addWorkerCallback);
    }
  };

  // 작업자 추가 (유효성체크)
  checkWorkerValidation = formData => {
    const validList = ['WORKER_NM', 'WORKER_SSN', 'M_TEL'];
    const msgTarget = {
      WORKER_NM: '성명',
      WORKER_SSN: '생년월일',
      M_TEL: '휴대폰 번호(연락처)',
    };
    const validIdx = validList.findIndex(valid => formData[valid] === '');
    if (validIdx !== -1) {
      message.error(<MessageContent>{`${msgTarget[validList[validIdx]]}은(는) 필수 입력사항 입니다.`}</MessageContent>);
      return false;
    }

    // 개발기준으로 주민등록번호 유효성 검사무시
    const ssn = formData.WORKER_SSN;
    const validSsn = ssn.length === 13;
    // const validSsn = this.ssnCheck(ssn);
    if (!validSsn) {
      message.error(<MessageContent>주민등록번호가 유효하지 않습니다.</MessageContent>);
      return false;
    }
    return true;
  };

  // 작업자 등록 - 주민등록번호 유효성
  ssnCheck = ssn => {
    const checkNum = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
    let sum = 0;
    checkNum.forEach((num, index) => {
      const temp = ssn.charAt(index) * num;
      sum += temp;
    });
    let pin = 11 - (sum % 11);
    if (pin >= 10) pin -= 10;
    if (Number(ssn.charAt(12)) === pin) {
      return true;
    }
    return false;
  };

  // 작업자 등록 콜백
  addWorkerCallback = (id, response) => {
    const { worker } = this.state;
    const { type } = response;
    if (type === 'insert') {
      message.success(<MessageContent>작업자 정보를 등록하였습니다.</MessageContent>);
    }
    this.setState({
      worker: {
        ...worker,
        WORKER_SSN: '',
        WORKER_NM: '',
        TEL: '',
        M_TEL: '',
      },
    });
    this.handleModalVisible('', false);
    this.handleGetWorkers();
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

  searchSafetyEduCallback = (id, response) => {
    this.setState({
      safetyEduList: response.safetyEduList || [],
    });
  };

  selectSafetyEdu = record => {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const apiArr = {
      key: 'getSafetyEduInfo',
      type: 'GET',
      url: `/api/eshs/v1/common/safetyEdu?type=searchOne&keyword=${record.EDU_NO}`,
    };
    getCallDataHandlerReturnRes(id, apiArr, this.selectSafetyEduCallback);
  };

  selectSafetyEduCallback = (id, response) => {
    const { setFormData } = this.props;
    const record = response.safetyEduInfo;
    const { worker } = this.state;
    const nextformData = {
      EDU_NO: record.EDU_NO || '',
      SITE: record.SITE || '',
      EDU_HOUR: record.EDU_HOUR || '',
      LECT_EMP_NO: Number(record.LECT_EMP_NO) || '',
      LECT_EMP_NM: record.LECT_EMP_NM || '',
      EDU_DT: record.EDU_DT || '',
      EDU_LOC: record.EDU_LOC || '',
      WORK_NO: record.WORK_NO || '',
      EDU_TARGET_GB: record.EDU_TARGET_GB || '',
      OUT_LECT_SSN: record.OUT_LECT_SSN || '',
      LECT_CMPNY_CD: record.LECT_CMPNY_CD || '',
      LECT_CMPNY_NM: record.LECT_CMPNY_NM || '',
      OUT_LECT_NM: record.OUT_LECT_NM || '',
      LECT_HOST_GB: record.LECT_HOST_GB || '',
      EDU_YEAR: record.EDU_YEAR || '',
      WRK_CMPNY_CD: record.WRK_CMPNY_CD || '',
      WORKER_LIST: record.WORKER_LIST || [],
    };
    setFormData(id, nextformData);
    this.setState(
      {
        worker: {
          ...worker,
          WRK_CMPNY_CD: record.WRK_CMPNY_CD,
        },
        safetyEduList: [],
        selectedWorkerList: (record.WORKER_LIST && record.WORKER_LIST.map((item, index) => index)) || [],
        workerList: record.WORKER_LIST || [],
      },
      () => this.handleModalVisible('', false),
    );
  };

  workerTableRowSelect = (selectedRowKeys, selectedRows) => {
    const { sagaKey: id, changeFormData } = this.props;
    this.setState({
      selectedWorkerList: selectedRowKeys,
    });
    changeFormData(id, 'WORKER_LIST', selectedRows);
  };

  // 모달 타이틀
  modalTitle = type => {
    switch (type) {
      case 'searchEdu':
        return '안전교육 검색';
      case 'searchCmpny':
        return '거래처 검색';
      case 'addWorker':
        return '작업자 등록';
      default:
        return '';
    }
  };

  render() {
    const { sagaKey, changeFormData, result, formData, setFormData } = this.props;
    const { modalType, modalVisible, worker, workerList, selectedWorkerList, safetyEduList } = this.state;
    const eshsCmpnyList = (result && result.getEshsCmpnyList && result.getEshsCmpnyList.list) || [];
    const eshsHstCmpnyList = (result && result.getHstCompny && result.getHstCompny.eshsHstCmpnyList) || [];
    const eshsHstCmpnyUserList = (result && result.getHstCmpnyUser && result.getHstCmpnyUser.list) || [];

    let selectedCmpny = {};
    if (formData.WRK_CMPNY_CD || false) {
      selectedCmpny = eshsCmpnyList.filter(item => item.WRK_CMPNY_CD === formData.WRK_CMPNY_CD).pop() || {};
    }

    // 작업자 선택 (antd table rowSelection)
    const rowSelection = {
      columnWidth: '10%',
      selectedRowKeys: selectedWorkerList,
      onChange: this.workerTableRowSelect,
    };

    console.debug('폼데이터', formData);
    console.debug('스텟', this.state);
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
            {formData.EDU_NO && formData.EDU_NO !== '' ? (
              <>
                <StyledButton className="btn-primary btn-xs btn-first" onClick={() => this.submitFormData('UPDATE')} style={{ marginBottom: '5px' }}>
                  수정
                </StyledButton>
                {formData.WORKER_LIST && formData.WORKER_LIST.length > 0 && (
                  <StyledButton className="btn-primary btn-xs btn-first" onClick={() => this.submitFormData('SAVE')} style={{ marginBottom: '5px' }}>
                    저장
                  </StyledButton>
                )}
              </>
            ) : (
              <StyledButton className="btn-primary btn-xs btn-first" onClick={() => this.submitFormData('INSERT')} style={{ marginBottom: '5px' }}>
                추가
              </StyledButton>
            )}
            <StyledButton className="btn-primary btn-xs btn-first" onClick={() => console.debug('삭제')} style={{ marginBottom: '5px' }}>
              삭제
            </StyledButton>
            <StyledButton className="btn-primary btn-xs btn-first" onClick={() => this.initFormData()} style={{ marginBottom: '5px' }}>
              초기화
            </StyledButton>
          </div>
        </StyledSearchWrap>
        {/* 콘텐츠 영역 */}
        <ContentsWrapper>
          <EduInfoTable
            sagaKey={sagaKey}
            changeFormData={changeFormData}
            setFormData={setFormData}
            formData={formData}
            eshsHstCmpnyList={eshsHstCmpnyList}
            eshsHstCmpnyUserList={eshsHstCmpnyUserList}
          />
          <div className="middleTitle">
            <AppstoreTwoTone style={{ marginRight: '5px' }} />
            교육수강자
          </div>
          <div className="search-group-layer">
            <div className="searchCmpnyWrap">
              <label style={{ marginLeft: '20px' }}>
                거래처
                <Input
                  className="ant-input-sm"
                  style={{ width: '200px', marginLeft: '5px', marginRight: '5px' }}
                  value={selectedCmpny.WRK_CMPNY_NM || ''}
                  readOnly
                  onClick={() => {
                    if (formData.EDU_NO !== '') {
                      this.handleModalVisible('searchCmpny', true);
                    }
                  }}
                />
              </label>
            </div>
            <div
              className="searchCmpnyBtn"
              tabIndex={0}
              onClick={() => {
                if (formData.EDU_NO !== '') {
                  this.handleModalVisible('searchCmpny', true);
                }
              }}
              onKeyPress={() => {
                if (formData.EDU_NO !== '') {
                  this.handleModalVisible('searchCmpny', true);
                }
              }} // esLint
              role="button" // esLint
            >
              <CaretDownOutlined />
            </div>
            <StyledButton className="btn-primary btn-xs btn-first" onClick={() => this.handleGetWorkers()} style={{ marginBottom: '5px' }}>
              작업자 명단 불러오기
            </StyledButton>
            <StyledButton className="btn-primary btn-xs btn-first" onClick={() => this.handleModalVisible('addWorker', true)} style={{ marginBottom: '5px' }}>
              작업자 추가 등록
            </StyledButton>
          </div>
          <WorkerInfoTable workerList={workerList} rowSelection={rowSelection} />
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
          {modalType === 'searchCmpny' && (
            <EshsCmpnyComp
              sagaKey={this.props.sagaKey}
              getExtraApiData={this.props.getCallDataHandler}
              extraApiData={this.props.result}
              colData={formData.wrk_cmpny_cd}
              directSearchTable
              visible
              CONFIG={{ property: { isRequired: false, GUBUN: 'SW' } }}
              changeFormData={() => false}
              COMP_FIELD="WRK_CMPNY_CD"
              eshsCmpnyCompResult={(companyInfo, COMP_FIELD) => this.handleSelectCmpny(companyInfo, COMP_FIELD)}
            />
          )}
          {modalType === 'addWorker' && (
            <>
              <Descriptions size="default" bordered>
                <Descriptions.Item label="거래처" span={4}>
                  {selectedCmpny.WRK_CMPNY_NM === '' ? 'N/A' : selectedCmpny.WRK_CMPNY_NM}
                </Descriptions.Item>
                <Descriptions.Item label="이름" span={4}>
                  {this.renderInputColumns('WORKER_NM', worker.WORKER_NM)}
                </Descriptions.Item>
                <Descriptions.Item label={`주민등록번호("-" 제외)`} span={4}>
                  {this.renderInputColumns('WORKER_SSN', worker.WORKER_SSN)}
                </Descriptions.Item>
                <Descriptions.Item label="휴대폰(연락처)" span={4}>
                  {this.renderInputColumns('M_TEL', worker.M_TEL)}
                </Descriptions.Item>
                <Descriptions.Item label="긴급연락처" span={4}>
                  {this.renderInputColumns('TEL', worker.TEL)}
                </Descriptions.Item>
              </Descriptions>
              <StyledButtonWrapper className="btn-wrap-right" style={{ marginTop: '10px' }}>
                <StyledButton className="btn-primary btn-xs btn-first" onClick={() => this.addWorker()}>
                  저장
                </StyledButton>
                <StyledButton className="btn-primary btn-xs" onClick={() => this.handleModalVisible('', false)}>
                  취소
                </StyledButton>
              </StyledButtonWrapper>
            </>
          )}
        </AntdModal>
      </Styled>
    );
  }
}
EduMgt.propTypes = {
  sagaKey: PropTypes.string,
  result: PropTypes.object,
  formData: PropTypes.object,
  setFormData: PropTypes.func,
  getCallDataHandler: PropTypes.func,
  getCallDataHandlerReturnRes: PropTypes.func,
  changeFormData: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
};

EduMgt.defaultProps = {};

export default EduMgt;
