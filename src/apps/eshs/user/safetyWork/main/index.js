import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { Input, Modal, Descriptions, Checkbox } from 'antd';
import { CaretDownOutlined, AppstoreTwoTone } from '@ant-design/icons';
// import * as selectors from 'containers/common/Auth/selectors';
import HstCmpnyUserSelectComp from 'apps/eshs/user/safetyEdu/HstCmpnyUserTable';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledModalWrapper from 'commonStyled/EshsStyled/Modal/StyledSelectModal';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import Styled from './Styled';

// safetyWork Tables
import SafetyWorkInfo from '../SafetyWorkInfo';

const AntdModal = StyledModalWrapper(Modal);

class SafetyWorkMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: '',
      modalVisible: false,
      formData: {
        WORK_NO: '', //                 작업번호        (String, 13)
        TITLE: '', //                   작업명          (String, 100)
        WCATEGORY: '', //               작업종류        (String, 40)
        WORK_DESC: '', //               작업내용        (String, 300)
        WRK_CMPNY_CD: '', //            작업업체 코드   (String, 10)
        WLOC: '', //                    작업장소        (String, 100)
        WGUBUN: '신규', //              작업구분        (String, 4)   [신규, 변경, 이설, 철거, 기타]
        SITE: '청주', //                지역            (String, 4)   [이천, 청주, 구미]
        DGUBUN: 'C-1', //               작업동          (String, 50)  [C-1, C-2, R, 청주기타, F1동, F3동, A1동, D.I동, 기숙사동, 구미기타]
        FROM_DT: '', //                 허가 요청날짜   (Date)
        TO_DT: '', //                   허가 요청날짜   (Date)
        FROM_TIME: '', //               허가 요청시간   (String, 2)
        TO_TIME: '', //                 허가 요청시간   (String, 2)
        PLEDGE_NO: '', //               서약서 번호     (String, 13)
        DETB_DANEST: '', //             위험성 평가번호 (String, 13)
        REQ_CMPNY_CD: '', //            발주회사        (String, 2)
        REQ_DEPT_CD: '', //             발주회사 부서   (String, 20)
        REQ_EMP_NO: '', //              발주회사 담당자 (String, 10)
        REQ_SUPERVISOR_EMP_NO: '', //   발주회사 감독자 (String, 10)
        EXM_CMPNY_CD: '', //            검토 회사 코드  (String, 2)
        EXM_DEPT_CD: '', //             검토 회사 부서  (String, 20)
        EXM_EMP_NO: '', //              검토 회사 담당자(String, 10)
        REQUEST_GB: '', //              신청구분        (String, 6)   [일반, 긴급, 미허가]
        FINAL_OK_EMP_NO: '', //         최종결재자 사번 (String, 10)
        FIRE_MANAGER: '', //            화재감시 담당   (String, 50)
        // ------------------------------------------------------------------------ 상단 State 실제 formData
        REQ_SUPERVISOR_EMP_NM: '', //   발주회사 감독자명
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
    getCallDataHandler(sagaKey, apiArr, this.getSearchListData);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  handleModal = (type, visible) => {
    this.setState({
      modalType: type,
      modalVisible: visible,
    });
  };

  // 감독자 선택
  handleHstUserSelect = record => {
    const { formData } = this.state;
    this.setState({
      modalType: '',
      modalVisible: false,
      formData: {
        ...formData,
        REQ_SUPERVISOR_EMP_NO: record.SQ_SWTB_HST_CMPNY_EMP,
        REQ_SUPERVISOR_EMP_NM: record.EMP_NM,
      },
    });
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

  render() {
    const { modalType, modalVisible, formData } = this.state;
    const { result, profile } = this.props;
    // getCallData
    const eshsCmpnyList = (result && result.getEshsCmpnyList && result.getEshsCmpnyList.list) || [];
    const eshsHstCmpnyUserList = (result && result.getHstCmpnyUser && result.getHstCmpnyUser.list) || [];
    console.debug('렌더링-props', this.props);
    console.debug('렌더링-state', formData);
    return (
      <Styled>
        <StyledSearchWrap>
          <div className="search-group-layer">
            <div className="searchCmpnyWrap">
              <label>
                작업번호
                <Input className="ant-input-sm" style={{ width: '150px', marginLeft: '5px', marginRight: '5px' }} readOnly />
              </label>
            </div>
            <div
              className="searchCmpnyBtn"
              tabIndex={0}
              onClick={() => console.debug('임시')}
              onKeyPress={() => console.debug('임시')} // esLint
              role="button" // esLint
            >
              <CaretDownOutlined />
            </div>
            <StyledButton className="btn-primary btn-xs btn-first" onClick={() => console.debug('검색')} style={{ marginBottom: '5px' }}>
              검색
            </StyledButton>
            <StyledButton className="btn-primary btn-xs btn-first" onClick={() => console.debug('추가 / 연장')} style={{ marginBottom: '5px' }}>
              추가 / 연장
            </StyledButton>
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
          <SafetyWorkInfo formData={formData} profile={profile} handleModal={this.handleModal} handleChangeFormData={this.handleChangeFormData} />
          <div className="middleTitle">
            <AppstoreTwoTone style={{ marginRight: '5px', verticalAlign: 'middle' }} />
            <span className="middleTitleText">작업자</span>
            <StyledButton className="btn-primary btn-xxs btn-first" onClick={() => console.debug('+버튼')}>
              작업자 인원 추가
            </StyledButton>
            <StyledButton className="btn-primary btn-xxs btn-first" onClick={() => console.debug('안전교육 등록')}>
              안전교육 등록
            </StyledButton>
            <StyledButton className="btn-primary btn-xxs btn-first" onClick={() => console.debug('안전교육 수료자')}>
              안전교육 수료자 가져오기
            </StyledButton>
          </div>
          <div>작업자 테이블 들어올곳</div>
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
          width={700}
          visible={modalVisible}
          footer={null}
          onOk={() => this.handleModal('', false)}
          onCancel={() => this.handleModal('', false)}
        >
          {modalType === 'hstUser' && <HstCmpnyUserSelectComp eshsHstCmpnyUserList={eshsHstCmpnyUserList} rowOnclick={this.handleHstUserSelect} />}
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
};

export default SafetyWorkMain;
