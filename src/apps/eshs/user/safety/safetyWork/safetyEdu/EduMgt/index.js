import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Modal } from 'antd';
import { AppstoreTwoTone } from '@ant-design/icons';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import EshsCmpnyComp from 'components/BizBuilder/Field/EshsCmpnyComp';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import EduListTable from '../SafetyEduList';
import EduInfoTable from '../EduInfoTable';
import WorkerInfoTable from '../WorkerInfoTable';

const AntdModal = StyledContentsModal(Modal);
const AntdInput = StyledInput(Input);
const AntdSearch = StyledSearchInput(Input.Search);

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

  deleteCallback = (id, response) => {
    const { result } = response;
    if (result === 'success') {
      message.success(<MessageContent>안전교육 정보를 삭제하였습니다.</MessageContent>);
      this.initFormData();
    } else {
      message.error(<MessageContent>안전교육 정보 삭제에 실패하였습니다.</MessageContent>);
    }
  };

  updateCallback = (id, resposnse) => {
    const { result } = resposnse;
    if (result === 'success') {
      message.success(<MessageContent>안전교육 정보를 수정하였습니다.</MessageContent>);
    } else {
      message.error(<MessageContent>안전교육 정보 수정에 실패하였습니다.</MessageContent>);
    }
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
          submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/safetyEdu', submitData, this.updateCallback);
        }
        break;
      case 'DELETE':
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/safetyEdu', submitData, this.deleteCallback);
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
      { key: 'WORKER_SSN', size: 8, placeholder: '예) 19910207' },
      { key: 'WORKER_NM', size: 20 },
      { key: 'TEL', size: 13 },
      { key: 'M_TEL', size: 13 },
    ];
    const keyField = fieldList.find(field => field.key === key);
    return (
      <AntdInput
        className="ant-input-sm"
        maxLength={keyField.size}
        value={value}
        placeholder={keyField.placeholder || ''}
        onChange={e => this.changeWorkerFormData(keyField.key, e.target.value)}
      />
    );
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

    const ssn = formData.WORKER_SSN;
    const validSsn = ssn.length === 8;
    if (!validSsn) {
      message.error(<MessageContent>주민등록번호가 유효하지 않습니다.</MessageContent>);
      return false;
    }
    return true;
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
    return (
      <>
        <StyledCustomSearchWrapper>
          <div className="search-input-area">
            <span className="text-label">교육등록번호</span>
            <AntdSearch
              className="ant-search-inline input-search-mid mr5"
              onClick={() => this.handleModalVisible('searchEdu', true)}
              value={(formData.EDU_NO && formData.EDU_NO) || ''}
              style={{ width: '200px' }}
            />
            <span className="text-label">거래처</span>
            <AntdSearch
              className="ant-search-inline input-search-mid mr5"
              onClick={() => this.handleModalVisible('searchCmpny', true)}
              value={selectedCmpny.WRK_CMPNY_NM || ''}
              style={{ width: '200px' }}
            />
          </div>
        </StyledCustomSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          {formData.EDU_NO && formData.EDU_NO !== '' ? (
            <>
              <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.submitFormData('UPDATE')}>
                저장
              </StyledButton>
              <StyledButton className="btn-light btn-sm btn-first" onClick={() => this.submitFormData('DELETE')}>
                삭제
              </StyledButton>
            </>
          ) : (
            <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.submitFormData('INSERT')}>
              추가
            </StyledButton>
          )}
          <StyledButton className="btn-gray btn-sm btn-first" onClick={() => this.handleGetWorkers()}>
            거래처 작업자 불러오기
          </StyledButton>
          <StyledButton className="btn-gray btn-sm btn-first" onClick={() => this.handleModalVisible('addWorker', true)}>
            작업자 추가 등록
          </StyledButton>
          <StyledButton className="btn-gray btn-sm" onClick={() => this.initFormData()}>
            초기화
          </StyledButton>
        </StyledButtonWrapper>
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
          <div className="middleTitle" style={{ margin: '10px 0px -5px 10px' }}>
            <AppstoreTwoTone style={{ marginRight: '5px' }} />
            <span>교육수강자 ( * 선택한 작업자만 교육이수 됩니다. )</span>
          </div>
          <WorkerInfoTable workerList={workerList} rowSelection={rowSelection} />
        </ContentsWrapper>
        <AntdModal
          className="modal-table-pad"
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
            <StyledHtmlTable>
              <table>
                <colgroup>
                  <col width="20%"></col>
                  <col width="80%"></col>
                </colgroup>
                <tbody>
                  <tr>
                    <th>거래처</th>
                    <td>{selectedCmpny.WRK_CMPNY_NM === '' ? 'N/A' : selectedCmpny.WRK_CMPNY_NM}</td>
                  </tr>
                  <tr>
                    <th>이름</th>
                    <td>{this.renderInputColumns('WORKER_NM', worker.WORKER_NM)}</td>
                  </tr>
                  <tr>
                    <th>생년월일</th>
                    <td>{this.renderInputColumns('WORKER_SSN', worker.WORKER_SSN)}</td>
                  </tr>
                  <tr>
                    <th>휴대폰(연락처)</th>
                    <td>{this.renderInputColumns('M_TEL', worker.M_TEL)}</td>
                  </tr>
                  <tr>
                    <th>긴급연락처</th>
                    <td>{this.renderInputColumns('TEL', worker.TEL)}</td>
                  </tr>
                </tbody>
              </table>
              <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
                <StyledButton className="btn-primary mr5 btn-sm" onClick={() => this.addWorker()}>
                  저장
                </StyledButton>
                <StyledButton className="btn-light btn-sm" onClick={() => this.handleModalVisible('', false)}>
                  취소
                </StyledButton>
              </StyledButtonWrapper>
            </StyledHtmlTable>
          )}
        </AntdModal>
      </>
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
