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
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import SafetyWorkerTable from '../../commonComponents/SafetyWorker/viewPage';
import SafetyEquipTable from '../../commonComponents/SafetyEquip/viewPage';
import SafetyWorkInfo from '../../commonComponents/SafetyWorkInfo/viewPage';
import SearchSafetyWork from '../../commonComponents/safetyWorkSearch';
import EduMgtView from '../../safetyEdu/EduMgt/viewPage';
import ExmInfo from '../exmInfo';

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
        // ------------------------------------------------------------------------ 파일업로드
        UPLOAD_FILES: [],
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
        UPLOAD_FILES: (searchSafetyWork.UPLOADED_FILES && JSON.parse(searchSafetyWork.UPLOADED_FILES)) || [],
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
      case 'safetyWork':
        title = '안전작업 조회';
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
    return (
      <>
        <StyledCustomSearchWrapper>
          <div className="search-input-area">
            <span className="text-label">작업번호</span>
            <AntdSearch
              className="ant-search-inline input-search-mid mr5"
              onClick={() => this.handleModal('safetyWork', true)}
              value={formData.WORK_NO}
              style={{ width: '200px', marginRight: '10px' }}
            />
            <StyledButton className="btn-gray btn-sm btn-first" onClick={() => this.handleGetSafetyWork()}>
              검색
            </StyledButton>
          </div>
        </StyledCustomSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <StyledButton className="btn-primary btn-sm btn-first" onClick={() => alert('수정 관리자')}>
            수정 [관리자]
          </StyledButton>
        </StyledButtonWrapper>
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
          className="modal-table-pad"
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
      </>
    );
  }
}

SafetyWorkMain.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandlerReturnRes: PropTypes.func,
};

export default SafetyWorkMain;
