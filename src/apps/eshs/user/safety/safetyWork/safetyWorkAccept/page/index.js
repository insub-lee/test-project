import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Input, Modal } from 'antd';
import { CaretDownOutlined, AppstoreTwoTone } from '@ant-design/icons';
import BizMicroDevBase from 'components/BizMicroDevBase';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledModalWrapper from 'commonStyled/EshsStyled/Modal/StyledSelectModal';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import SafetyWorkerTable from '../../commonComponents/SafetyWorker/viewPage';
import SafetyEquipTable from '../../commonComponents/SafetyEquip/viewPage';
import SafetyWorkInfo from '../../commonComponents/SafetyWorkInfo/viewPage';
import SearchSafetyWork from '../../commonComponents/safetyWorkSearch';
import EduMgtView from '../../safetyEdu/EduMgt/viewPage';
import ExmInfo from '../exmInfo';
import Styled from './Styled';

const AntdModal = StyledModalWrapper(Modal);

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
        fileList: [],
        responseList: [],
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

  handleGetSafetyWork = workNo => {
    const { formData } = this.state;
    const searchWorkNo = workNo || formData.WORK_NO;
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const type = 'searchOne';
    const apiInfo = {
      key: 'getSafetyWork',
      type: 'GET',
      url: `/api/eshs/v1/common/safetyWork?type=${type}&keyword=${searchWorkNo}`,
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
        fileList: [],
        responseList: [],
      },
    });
  };

  // 모달 핸들러
  handleModal = (type, visible) => {
    let title = '';
    switch (type) {
      case 'safetyEdu':
        title = '안전교육 조회';
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

  onChangeFormData = (field, value) => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [field]: value,
      },
    });
  };

  render() {
    const { modalType, modalTitle, modalVisible, formData } = this.state;
    console.debug('폼데이터', formData);
    console.debug('폼데이터', this.props);

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
            <StyledButton className="btn-primary btn-xs btn-first" onClick={() => alert('수정 관리자')} style={{ marginBottom: '5px' }}>
              수정 [관리자]
            </StyledButton>
          </div>
        </StyledSearchWrap>
        <ContentsWrapper>
          <SafetyWorkInfo
            formData={formData}
            handleModal={this.handleModal}
            handleWorkCategory={this.handleWorkCategory}
            handleUploadFileChange={this.handleUploadFileChange}
            fileList={this.state.fileList || []}
          />
          <div className="exmInfoWrap">
            <ExmInfo formData={formData} changeFormData={this.onChangeFormData} />
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
          title={modalTitle}
          width={modalType === 'cmpny' || modalType === 'equip' ? '790px' : '70%'}
          visible={modalVisible}
          footer={null}
          onOk={() => this.handleModal('', false)}
          onCancel={() => this.handleModal('', false)}
        >
          {modalType === 'safetyEdu' && <BizMicroDevBase component={EduMgtView} sagaKey="safetyEdu_search" />}
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
  workNo: PropTypes.string,
  // type - object
  result: PropTypes.object,
  profile: PropTypes.object,
  // type - func
  getCallDataHandler: PropTypes.func,
  getCallDataHandlerReturnRes: PropTypes.func,
};

export default SafetyWorkMain;
