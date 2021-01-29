import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Input, Modal } from 'antd';
import { AppstoreTwoTone } from '@ant-design/icons';
import BizMicroDevBase from 'components/BizMicroDevBase';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import ContentsPrint from 'components/ContentsPrint';
import SafetyWorkerTable from '../../commonComponents/SafetyWorker/viewPage';
import SafetyEquipTable from '../../commonComponents/SafetyEquip/viewPage';
import SafetyWorkInfo from '../../commonComponents/SafetyWorkInfo/viewPage';
import SearchSafetyWork from '../../commonComponents/safetyWorkSearch';
import safetyWorkWrite from '../../safetyWorkWrite/page';
import EduMgtView from '../../safetyEdu/EduMgt/viewPage';
import { saveProcessRule } from 'apps/eshs/common/workProcessRule';
import CustomWorkProcess from 'apps/Workflow/CustomWorkProcess';

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
      pageViewType: 'VIEW',
      appvLineText: '',
      processRule: {},
      tempProcessRule:{},
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

  componentDidMount() {
    this.init();
  }

  // 첫진입시 1회만 초기화
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
    const searchSafetyWork = response?.safetyWork || {};
    // console.debug('res ', response);

    if (!searchSafetyWork.WORK_NO) {
      message.error(<MessageContent>요청하신 작업정보를 찾을 수 없습니다.</MessageContent>);
    }
    const appLine = response?.safetyWork?.APP_LINE || [];
    let appvLineText = '';
    if (0 in appLine) {
      appLine.forEach(appv => {
        if (appv.STEP === 1) appvLineText += `${appv.PROCESS_NAME}:담당:${appv.DRAFT_USER_NAME}(${appv.APPV_STATUS_NAME})`;
        else appvLineText += `, ${appv.STEP - 1}차:${appv.DRAFT_USER_NAME}(${appv.APPV_STATUS_NAME})`;
      });
    }
    this.setState({
      formData: {
        ...searchSafetyWork,
        FROM_DT: moment(searchSafetyWork.FROM_DT).format('YYYY-MM-DD'),
        REQUEST_DT: (searchSafetyWork.REQUEST_DT && moment(searchSafetyWork.REQUEST_DT).format('YYYY-MM-DD')) || '',
        SUB_WCATEGORY: (searchSafetyWork.SUB_WCATEGORY && searchSafetyWork.SUB_WCATEGORY.split(',')) || [],
        UPLOAD_FILES: (searchSafetyWork.UPLOADED_FILES && JSON.parse(searchSafetyWork.UPLOADED_FILES)) || [],
      },
      appvLineText,
    });
  };

  // 모달 핸들러
  handleModal = (type, visible) => {
    const { workNo } = this.props;
    const { modalType } = this.state;
    let title = '';
    switch (type) {
      case 'safetyEdu':
        title = '안전교육 조회';
        break;
      case 'safetyWork':
        title = '안전작업 조회';
        break;
      case 'changeType':
        title = '일반작업 전환';
        break;
      case 'workProcess':
        title = '결재선';
        break;
      default:
        break;
    }

    if (modalType === 'changeType' && !visible) {
      return this.setState({
        modalType: type,
        modalTitle: title,
        modalVisible: visible,
      },
        () => this.handleGetSafetyWork(workNo)
      );
    }

    return this.setState({
      modalType: type,
      modalTitle: title,
      modalVisible: visible,
    });
  };

  handleChangeViewType = type => {
    const { pageViewType } = this.state;
    const { workNo } = this.props;
    if (pageViewType === 'UPDATE' && type === 'VIEW') {
      this.setState(
        {
          pageViewType: type,
        },
        () => this.handleGetSafetyWork(workNo),
      );
    } else {
      this.setState({
        pageViewType: type,
      });
    }
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

  saveProcessRule = () => {
    const { relKey, relKey2 } = this.props;
    const { processRule, formData } = this.state;

    saveProcessRule(
      {
        ...processRule,
        DRAFT_DATA: {},
        REL_KEY: relKey,
        REL_KEY2: formData[relKey2],
        DRAFT_TITLE: `${formData.TITLE}(작업번호:${formData[relKey2]})`,
      },
      draftId => {
        if (draftId) {
          return this.setState({
            formData: { ...formData, DRAFT_ID: draftId, STTLMNT_STATUS: '1' },
            tempProcessRule: {},
          });
        }
        return false;
      },
    );
  }

  render() {
    const { authority, workNo, profile:{EMP_NO}, prcId } = this.props;
    const { modalType, modalTitle, modalVisible, formData, appvLineText, pageViewType, processRule } = this.state;
    console.debug('sttlmnt_Status ', formData?.STTLMNT_STATUS);
    console.debug('REQ_EMP_NO ', formData?.REQ_EMP_NO);
    console.debug('EMP_NO ', EMP_NO);
    return (
      <div>
        {pageViewType === 'VIEW' && (
          <>
            <StyledCustomSearchWrapper>
              <div style={{ height: '30px' }}>
                <div className="search-input-area" style={{ float: 'left' }}>
                  <span className="text-label">작업번호</span>
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
                <div style={{ float: 'right' }}>
                  <span className="text-label">{appvLineText}</span>
                </div>
              </div>
            </StyledCustomSearchWrapper>
            <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
              <ContentsPrint footerType="keyfoundry" buttonName="인쇄" printTitle={`Safety Work Infomation : ${formData.WORK_NO}`}>
                <SafetyWorkInfo
                  formData={formData}
                  handleModal={this.handleModal}
                  handleWorkCategory={this.handleWorkCategory}
                  handleUploadFileChange={this.handleUploadFileChange}
                />
                {formData.WORKER_LIST.length > 0 && (
                  <>
                    <div className="middleTitle">
                      <AppstoreTwoTone style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                      <span className="middleTitleText">작업자</span>
                    </div>
                    <div>
                      <SafetyWorkerTable workerList={formData.WORKER_LIST} handleWorkerPosition={this.handleWorkerPosition} workerRemove={this.workerRemove} />
                    </div>
                  </>
                )}
                {formData.EQUIP_LIST.length > 0 && (
                  <>
                    <div className="middleTitle">
                      <AppstoreTwoTone style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                      <span className="middleTitleText">투입장비</span>
                    </div>
                    <div>
                      <SafetyEquipTable equipList={formData.EQUIP_LIST} equipRemove={this.equipRemove} />
                    </div>
                  </>
                )}
              </ContentsPrint>
              <StyledButton className="btn-gray btn-sm btn-first" onClick={() => this.handleModal('safetyEdu', true)}>
                안전교육 조회
              </StyledButton>
              {formData.REQUEST_GB === '긴급' && (
                <StyledButton className="btn-gray btn-sm btn-first" onClick={() => this.handleModal('changeType', true)}>
                  일반작업 전환
                </StyledButton>
              )}
              {authority && authority.includes('U') && (
                <StyledButton className="btn-gray btn-sm btn-first" onClick={() => this.handleChangeViewType('UPDATE')}>
                  수정
                </StyledButton>
              )}
                  {(formData?.STTLMNT_STATUS === '0' || formData?.STTLMNT_STATUS === '2F') && formData?.REQ_EMP_NO === EMP_NO  && (
                    <>
                      <StyledButton className="btn-primary btn-sm btn-first" onClick={this.saveProcessRule}>
                        상신
                      </StyledButton>
                      <StyledButton className="btn-gray btn-sm btn-first" onClick={() => this.handleModal('workProcess', true)}>
                        결재선
                      </StyledButton>
                    </>
                  )}
            </StyledButtonWrapper>
            <ContentsWrapper>
              <SafetyWorkInfo
                formData={formData}
                handleModal={this.handleModal}
                handleWorkCategory={this.handleWorkCategory}
                handleUploadFileChange={this.handleUploadFileChange}
              />
              {formData.WORKER_LIST.length > 0 && (
                <>
                  <div className="middleTitle">
                    <AppstoreTwoTone style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                    <span className="middleTitleText">작업자</span>
                  </div>
                  <div>
                    <SafetyWorkerTable workerList={formData.WORKER_LIST} handleWorkerPosition={this.handleWorkerPosition} workerRemove={this.workerRemove} />
                  </div>
                </>
              )}
              {formData.EQUIP_LIST.length > 0 && (
                <>
                  <div className="middleTitle">
                    <AppstoreTwoTone style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                    <span className="middleTitleText">투입장비</span>
                  </div>
                  <div>
                    <SafetyEquipTable equipList={formData.EQUIP_LIST} equipRemove={this.equipRemove} />
                  </div>
                </>
              )}
            </ContentsWrapper>
            <AntdModal
              title={modalTitle}
              width="70%"
              visible={modalVisible}
              footer={null}
              onOk={() => this.handleModal('', false)}
              onCancel={() => this.handleModal('', false)}
            >
              {modalType === 'safetyEdu' && <BizMicroDevBase component={EduMgtView} sagaKey="safetyEdu_search" />}
              {modalType === 'safetyWork' && (
                <BizMicroDevBase component={SearchSafetyWork} sagaKey="safetyWork_search" rowSelect={this.handleSafetyWorkSelect} />
              )}
              {modalType === 'changeType' && (
                <div style={{ padding: '20px' }}>
                  <BizMicroDevBase
                    component={safetyWorkWrite}
                    isChange
                    workNo={workNo}
                    isWorkFlow={false}
                    authority={authority}
                    relKey="안전작업허가(작업부서)"
                    relKey2="WORK_NO"
                    sagaKey="safetyWork"
                    prcId={110}
                    safetyWorkViewPageFunc={this.handleChangeViewType}
                  />
                </div>
              )}

             {modalType === 'workProcess' && (
                <>
                  <CustomWorkProcess
                    processRule={processRule}
                    PRC_ID={prcId}
                    draftId={formData.REQUEST_DRAFT_ID || -1}
                    viewType={formData.REQUEST_DRAFT_ID ? 'VIEW' : 'INPUT'}
                    setProcessRule={(_, prcRule) => this.setState({ tempProcessRule: prcRule })}
                  />
                  <StyledButtonWrapper className="btn-wrap-center btn-wrap-mb-10" style={{ height:'40px' }}>
                    <StyledButton
                      className="btn-primary btn-sm btn-first"
                      onClick={() =>
                        this.setState(
                          prevState => ({
                            processRule: prevState.tempProcessRule,
                          }),
                          () => this.handleModal('', false),
                        )
                      }
                    >
                      저장
                    </StyledButton>
                    <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleModal('', false)}>
                      닫기
                    </StyledButton>
                  </StyledButtonWrapper>
                </>
              )}
            </AntdModal>
          </>
        )}
        {pageViewType === 'UPDATE' && (
          <BizMicroDevBase
            component={safetyWorkWrite}
            workNo={workNo}
            isWorkFlow={false}
            authority={authority}
            relKey="안전작업허가(작업부서)"
            relKey2="WORK_NO"
            sagaKey="safetyWork"
            prcId={110}
            safetyWorkViewPageFunc={this.handleChangeViewType}
          />
        )}
      </div>
    );
  }
}

SafetyWorkMain.propTypes = {
  sagaKey: PropTypes.string,
  workNo: PropTypes.string,
  authority: PropTypes.array,
  getCallDataHandlerReturnRes: PropTypes.func,
};

SafetyWorkMain.defaultProps = {
  authority: [],
};

export default SafetyWorkMain;
