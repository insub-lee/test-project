import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Input, Modal } from 'antd';
import { CaretDownOutlined, AppstoreTwoTone } from '@ant-design/icons';
import BizMicroDevBase from 'components/BizMicroDevBase';
import EshsCmpnyComp from 'components/BizBuilder/Field/EshsCmpnyComp';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledModalWrapper from 'commonStyled/EshsStyled/Modal/StyledSelectModal';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import SafetyEquipTable from '../../commonComponents/SafetyEquip';
import SafetyEquipSelect from '../../commonComponents/SafetyEquip/EquipSelect';
import SafetyWorkInfo from '../../commonComponents/SafetyEmergencyWorkInfo';
import SearchSafetyWork from '../../commonComponents/safetyWorkSearch';
import Styled from './Styled';

const AntdModal = StyledModalWrapper(Modal);

class emergencyWorkWrite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      formData: {
        WORK_NO: '',
        TITLE: '',
        WCATEGORY: '',
        SUB_WCATEGORY: [],
        WORK_DESC: '',
        WRK_CMPNY_CD: '',
        WLOC: '',
        WGUBUN: '신규',
        SITE: '청주',
        REQ_CMPNY_CD: '',
        REQ_DEPT_CD: '',
        REQ_EMP_NO: '',
        REQ_SUPERVISOR_EMP_NO: '',
        REQUEST_GB: '긴급',
        FIRE_MANAGER: '',
        EQUIP_LIST: [],
        fileList: [],
        responseList: [],
        REQ_CMPNY_NM: '',
        REQ_DEPT_NM: '',
        REQ_EMP_NM: '',
        REQUEST_DT: '',
      },
    };
  }

  componentDidMount() {
    const { sagaKey, getCallDataHandler, initWorkNo, profile } = this.props;
    const { init } = this.state;
    if (initWorkNo && initWorkNo !== '' && init) {
      this.setState(
        {
          init: false,
        },
        () => this.handleGetSafetyWork(initWorkNo),
      );
    }
    const apiArr = [
      {
        /* 거래처전체리스트 : /api/eshs/v1/common/EshsCmpnyList/null/null */
        key: 'getEshsCmpnyList',
        type: 'GET',
        url: `/api/eshs/v1/common/EshsCmpnyList?gubun=SW`,
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
    if (initWorkNo && initWorkNo !== '') {
      getCallDataHandler(sagaKey, apiArr);
    } else {
      getCallDataHandler(sagaKey, apiArr, this.initForm);
    }
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

  handleGetSafetyWork = workNo => {
    const { formData } = this.state;
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const type = 'searchOneEmergency';
    const WORK_NO = workNo || formData.WORK_NO;
    const apiInfo = {
      key: 'getSafetyWork',
      type: 'GET',
      url: `/api/eshs/v1/common/safetyWork?type=${type}&keyword=${WORK_NO}`,
    };
    if (WORK_NO === '') {
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
        SUB_WCATEGORY: (searchSafetyWork.SUB_WCATEGORY && searchSafetyWork.SUB_WCATEGORY.split(',')) || [],
        CREATE_DT: (searchSafetyWork.CREATE_DT && moment(searchSafetyWork.CREATE_DT).format('YYYY-MM-DD')) || '',
        fileList: [],
        responseList: [],
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
      case 'equip':
        title = '투입장비 선택';
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

  // 작업 수정 콜백
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
          WLOC: '',
          WGUBUN: '신규',
          SITE: '청주',
          REQ_SUPERVISOR_EMP_NO: '',
          REQUEST_GB: '긴급',
          FIRE_MANAGER: '',
          EQUIP_LIST: [],
          fileList: [],
          responseList: [],
          REQUEST_DT: '',
        },
      },
      () => message.success(<MessageContent>안전작업 정보를 삭제하였습니다.</MessageContent>),
    );
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
    const { result, viewType } = this.props;
    const eshsSwtbEquip = (result && result.getSwtbEquipList && result.getSwtbEquipList.list) || [];
    console.debug('렌더링-state', this.state);
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
            {viewType !== 'modal' && (
              <StyledButton className="btn-primary btn-xs btn-first" onClick={() => alert('준비중')} style={{ marginBottom: '5px' }}>
                일반작업으로 변경
              </StyledButton>
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
          {modalType === 'equip' && <SafetyEquipSelect equipList={eshsSwtbEquip} rowSelect={this.equipAdd} />}
          {modalType === 'safetyWork' && (
            <BizMicroDevBase component={SearchSafetyWork} sagaKey="safetyWorkEmergency_search" rowSelect={this.handleSafetyWorkSelect} />
          )}
        </AntdModal>
      </Styled>
    );
  }
}

emergencyWorkWrite.propTypes = {
  // type - number
  // type - string
  sagaKey: PropTypes.string,
  initWorkNo: PropTypes.string,
  viewType: PropTypes.string,
  // type - object
  result: PropTypes.object,
  profile: PropTypes.object,
  // type - func
  getCallDataHandler: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
  getCallDataHandlerReturnRes: PropTypes.func,
};

emergencyWorkWrite.defaultProps = {
  initWorkNo: '',
  viewType: '',
};

export default emergencyWorkWrite;
