import React, { Component } from 'react';
import PropTypes from 'prop-types';

import debounce from 'lodash/debounce';
import { Select, Modal, Spin } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import moment from 'moment';
import View from './View';
import MeterialModal from './MeterialModal';
const AntdModal = StyledAntdModal(Modal);

moment.locale('ko');
const AntdSelect = StyledSelect(Select);
const { Option } = Select;

// 선택된 레벨, 부모값이 일치하는 배열리턴
const getCategoryMapFilter = (type, flatData, prntCd) => {
  const result = flatData.filter(item => item.CODE !== prntCd);
  if (type === 'menu') {
    return result.map(item => ({
      title: item.CD_NAME,
      value: item.CODE,
      key: item.CODE,
      parentValue: item.PRNT_CD,
      selectable: true,
    }));
  }
  return result;
};

class ModifyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Loading
      isLoaded: true,
      isModal: false,
      YearOptions: [], // 연도 옵션 (2006 ~ currentYear + 1)
      // Menu, List 조회값
      lvl1: [], // 분류 리스트
      lvl2: [], // 부서 리스트
      lvl3: [], // 공정(장소) 리스트
      lvl4: [], // 세부공정 리스트
      lvl5: [],
      selectList: [], // 설비장비 리스트
      infoYear: moment().format('YYYY'),
      selected1: 'M000', // 선택된 분류
      selected1_NM: '', // 선택된 분류명
      selected2: '', // 선택된 부서
      selected2_NM: '', // 선택된 부서명
      selected3: '', // 선택된 공정(장소)
      selected3_NM: '', // 선택된 공정(장소)명
      selected4: '', // 선택된 세부공정
      selected4_NM: '', // 선택된 세부공정명
    };
    this.onChangeData = debounce(this.onChangeData, 500);
  }

  componentDidMount() {
    const { sagaKey: id, getExtraApiData } = this.props;
    const apiAry = [
      {
        key: 'getWorkStepCode',
        type: 'POST',
        url: '/api/eshs/v1/common/dangerWorkStepCode',
        params: {
          PARAM: { TYPE: 'GET', CODE: 'M000', DEPTH: 1, USE_YN: 'Y' },
        },
      },
      {
        key: 'modalSelectData',
        type: 'GET',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=45',
      },
      {
        key: 'modalData',
        type: 'GET',
        url: '/api/eshs/v1/common/eshsDanger',
      },
    ];
    getExtraApiData(id, apiAry, this.init);
  }

  // init
  init = () => {
    const {
      extraApiData: { getWorkStepCode },
    } = this.props;
    const { workStepCode } = getWorkStepCode;

    // 초기 분류 리스트 생성
    const initMenu = getCategoryMapFilter('menu', workStepCode, 'M000');

    // 연도 셀렉트박스 Options 생성 (2006년 ~ 현재 + 1년 까지)
    const currentYear = moment().format('YYYY');
    const YearOptions = [];
    for (let year = 2006; year <= Number(currentYear) + 1; year += 1) {
      YearOptions.push(year);
    }
    this.setState({
      lvl1: initMenu,
      YearOptions,
    });
  };

  // 분류, 부서, 공정(장소), 세부공정 메뉴정보 호출
  getCode = (prntCode, depth, useYn) => {
    const { sagaKey: id, submitExtraHandler } = this.props;
    let lastCode = prntCode;
    let lastDepth = depth;
    if (prntCode === '') {
      switch (depth) {
        case 2:
          lastCode = this.state.selected1;
          lastDepth -= 1;
          break;
        case 3:
          lastCode = this.state.selected2;
          lastDepth -= 1;
          break;
        case 4:
          lastCode = this.state.selected3;
          lastDepth -= 1;
          break;
        default:
          break;
      }
    }
    const url = '/api/eshs/v1/common/dangerWorkStepCode';
    const param = {
      PARAM: { TYPE: 'GET', CODE: lastCode, DEPTH: lastDepth, USE_YN: useYn },
    };
    submitExtraHandler(id, 'POST', url, param, this.getCodeCallback);
  };

  getCodeCallback = (id, response) => {
    const { PARAM, workStepCode } = response;
    const { CODE: prntCd, DEPTH: depth } = PARAM;
    const parent = workStepCode.find(item => item.CODE === prntCd);
    const menu = getCategoryMapFilter('menu', workStepCode, prntCd);
    const lastLv = prntCd === 'M000' ? depth : depth + 1;
    this.setState({
      [`lvl${lastLv}`]: menu,
      [`selected${depth}`]: prntCd,
      [`selected${depth}_NM`]: prntCd === 'M000' ? '' : parent.CD_NAME,
      [`selected${depth + 1}`]: '',
      [`selected${depth + 1}_NM`]: '',
    });
  };

  searchListApi = () => {
    const {
      infoYear,
      selected1,
      selected1_NM,
      selected2,
      selected2_NM,
      selected3,
      selected3_NM,
      selected4,
      selected4_NM,
      lvl5,
    } = this.state;
    const { sagaKey: id, submitExtraHandler } = this.props;
    if (selected4) {
      this.setState({ isLoaded: false });
      const url = '/api/eshs/v1/common/eshsBuilderCustomSearch/10341';
      const param = {
        PARAM: { whereString: [`AND W.INFO_YEAR = '${infoYear}'`, `AND W.PROCESS_CD = '${selected4}'`] },
      };
      // 콜백 FormData 변경을위한 추가정보
      const searchData = {
        INFO_YEAR: infoYear,
        SDIV_CD: selected1,
        SDIV_NM: selected1_NM,
        DIV_CD: selected2,
        DIV_NM: selected2_NM,
        PLACE_CD: selected3,
        PLACE_NM: selected3_NM,
        PROCESS_CD: selected4,
        PROCESS_NM: selected4_NM,
        SELECT_LIST: lvl5,
      };
      submitExtraHandler(id, 'POST', url, param, this.searchCallback, searchData);
    } else {
      this.setState({ isLoaded: true }, () =>
        message.error(<MessageContent>세부공정까지 모두 선택해주십시오.</MessageContent>),
      );
    }
  };

  // 검색후, formData 업데이트
  searchCallback = (id, response, searchData) => {
    const { setFormData, profile, formData } = this.props;
    const {
      INFO_YEAR,
      SDIV_CD,
      SDIV_NM,
      DIV_CD,
      DIV_NM,
      PLACE_CD,
      PLACE_NM,
      PROCESS_CD,
      PROCESS_NM,
      SELECT_LIST,
    } = searchData;
    const { list } = response;
    // 기존정보 조회
    const prevData = list.find(item => item.PROCESS_CD === PROCESS_CD);

    // 기존정보가 있을경우 FormData 업데이트, 없을 경우 초기값 설정
    let nextFormData = {};
    if (prevData) {
      nextFormData = {
        ...prevData,
        INFO_DATA: JSON.parse(prevData.INFO_DATA),
        UPD_USER_ID: profile.USER_ID,
        UPD_USER_NAME: profile.NAME_KOR,
        SDIV_NM,
        DIV_NM,
        PLACE_NM,
        PROCESS_NM,
      };
    } else {
      nextFormData = {
        ...formData,
        TASK_SEQ: -1,
        TASK_ORIGIN_SEQ: -1,
        INFO_DATA: {},
        INFO_YEAR,
        SDIV_CD,
        SDIV_NM,
        DIV_CD,
        DIV_NM,
        PLACE_CD,
        PLACE_NM,
        PROCESS_CD,
        PROCESS_NM,
      };
    }
    setFormData(id, nextFormData);
    this.setState({ isLoaded: true, selectList: SELECT_LIST });
  };

  onChangeState = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onChangeData = (name, value) => {
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, name, value);
    this.setState({ [name]: value });
  };

  onChangeDetailData = (name, value) => {
    const { sagaKey: id, changeFormData, formData } = this.props;
    changeFormData(id, 'INFO_DATA', { ...formData.INFO_DATA, [name]: value });
  };

  deleteMeterial = target => {
    const { sagaKey: id, changeFormData, formData } = this.props;

    const infoData = (formData && formData.INFO_DATA) || {};

    for (let i = 1; i <= 14; i += 1) {
      if (i >= target) {
        infoData[`C_NM${i}`] = infoData[`C_NM${i + 1}`];
        infoData[`C_NAME${i}`] = infoData[`C_NAME${i + 1}`];
        infoData[`C_GR${i}`] = infoData[`C_GR${i + 1}`];
      }
    }

    changeFormData(id, 'INFO_DATA', infoData);
    this.mySearch();
  };

  onChangeModal = () => {
    const { isModal } = this.state;
    this.setState({ isModal: !isModal });
  };

  saveBeforeProcess = () => {
    const { formData, sagaKey: id, changeFormData, saveTask } = this.props;
    changeFormData(id, 'INFO_DATA', formData.INFO_DATA && JSON.stringify(formData.INFO_DATA));
    saveTask(id, id, this.callbackHandle, 'INSERT');
  };

  modifyBeforeProcess = () => {
    const { sagaKey: id, submitExtraHandler, formData } = this.props;
    const temp = typeof formData.INFO_DATA !== 'string' ? JSON.stringify(formData.INFO_DATA) : formData.INFO_DATA;
    submitExtraHandler(
      id,
      'POST',
      '/api/eshs/v1/common/dangerInfo',
      { PARAM: { ...formData, INFO_DATA: temp } },
      this.callbackHandle,
      'UPDATE',
    );
  };

  callbackHandle = (id, response, type) => {
    this.searchListApi();
    let msg = '';
    switch (type) {
      case 'INSERT':
        msg = '위험정보가 등록되었습니다.';
        break;
      case 'UPDATE':
        msg = '위험정보가 수정되었습니다.';
        break;
      default:
        break;
    }
    if (msg !== '') message.success(<MessageContent>{msg}</MessageContent>);
  };

  render() {
    const {
      isLoaded,
      isModal,
      YearOptions,
      infoYear,
      lvl1,
      lvl2,
      lvl3,
      lvl4,
      selectList,
      selected1,
      selected2,
      selected3,
      selected4,
    } = this.state;
    const {
      sagaKey: id,
      extraApiData,
      changeFormData,
      getExtraApiData,
      formData,
      extraApiData: { modalData },
    } = this.props;
    const {
      INFO_YEAR,
      SDIV_CD,
      SDIV_NM,
      DIV_CD,
      DIV_NM,
      PLACE_CD,
      PLACE_NM,
      PROCESS_CD,
      PROCESS_NM,
      INFO_DATA,
      TASK_SEQ,
    } = formData;
    const validContent = !(SDIV_CD === 'M000' || DIV_CD === '' || PLACE_CD === '' || PROCESS_CD === '');
    return (
      <StyledContentsWrapper>
        {/* 검색 영역 */}
        <StyledCustomSearchWrapper className="search-wrapper-inline">
          <div className="search-input-area">
            <span className="text-label">참여 연도</span>
            <AntdSelect
              className="select-sm mr5"
              value={infoYear}
              style={{ width: '100px' }}
              onChange={value => this.onChangeState('infoYear', value)}
            >
              {YearOptions && YearOptions.map(YYYY => <Option value={`${YYYY}`}>{YYYY}</Option>)}
            </AntdSelect>
            {/* 1 Depth (분류) */}
            <span className="text-label">분류</span>
            <AntdSelect
              className="select-sm mr5"
              style={{ width: '200px' }}
              onChange={value => this.getCode(value, 1, 'Y')}
              value={selected1}
            >
              <Option value="M000">전체</Option>
              {lvl1.map(item => (
                <Option value={item.value}>{item.title}</Option>
              ))}
            </AntdSelect>
            {/* 2 Depth (부서) */}
            <span className="text-label">부서</span>
            <AntdSelect
              className="select-sm mr5"
              style={{ width: '200px' }}
              onChange={value => this.getCode(value, 2, 'Y')}
              value={selected1 === 'M000' ? '' : selected2}
              disabled={selected1 === 'M000'}
            >
              <Option value="">부서전체</Option>
              {lvl2.map(item => (
                <Option value={item.value}>{item.title}</Option>
              ))}
            </AntdSelect>
            {/* 2 Depth (공정(장소)) */}
            <span className="text-label">공정(장소)</span>
            <AntdSelect
              className="select-sm mr5"
              style={{ width: '200px' }}
              onChange={value => this.getCode(value, 3, 'Y')}
              value={selected1 === 'M000' || selected2 === '' ? '' : selected3}
              disabled={selected1 === 'M000' || selected2 === ''}
            >
              <Option value="">장소전체</Option>
              {lvl3.map(item => (
                <Option value={item.value}>{item.title}</Option>
              ))}
            </AntdSelect>
            {/* 4 Depth (세부공정) */}
            <span className="text-label">세부공정</span>
            <AntdSelect
              className="select-sm mr5"
              style={{ width: '200px' }}
              onChange={value => this.getCode(value, 4, 'Y')}
              value={selected1 === 'M000' || selected2 === '' || selected3 === '' ? '' : selected4}
              disabled={selected1 === 'M000' || selected2 === '' || selected3 === ''}
            >
              <Option value="">공정전체</Option>
              {lvl4.map(item => (
                <Option value={item.value}>{item.title}</Option>
              ))}
            </AntdSelect>
          </div>
          <div className="btn-area">
            <StyledButtonWrapper className="btn-wrap-inline">
              <StyledButton className="btn-gray btn-first btn-sm" onClick={() => this.searchListApi()}>
                검색
              </StyledButton>
              {/* 
                이 페이지는 리포트로 작업해줘야 할듯합니다.
                <StyledButton
                  className="btn-gray btn-first btn-sm"
                  onClick={() => message.success(<MessageContent>개발중입니다.</MessageContent>)}
                >
                  엑셀받기
                </StyledButton>
              */}
              {TASK_SEQ > 0 ? (
                <StyledButton className="btn-primary btn-first btn-sm" onClick={this.modifyBeforeProcess}>
                  수정
                </StyledButton>
              ) : (
                <StyledButton className="btn-primary btn-first btn-sm" onClick={this.saveBeforeProcess}>
                  저장
                </StyledButton>
              )}
            </StyledButtonWrapper>
          </div>
        </StyledCustomSearchWrapper>
        {/* 콘텐츠 영역 */}
        <Spin spinning={!isLoaded} tip="Data Loading...">
          {validContent ? (
            <View
              infoYear={INFO_YEAR}
              sdivNm={SDIV_NM}
              divNm={DIV_NM}
              processNm={PLACE_NM}
              placeNm={PROCESS_NM}
              selectData={selectList || []}
              INFO_DATA={INFO_DATA}
              modalData={modalData.list || []}
              onChangeData={this.onChangeDetailData}
              onChangeModal={this.onChangeModal}
              deleteMeterial={this.deleteMeterial}
            />
          ) : (
            <div style={{ height: '200px', textAlign: 'center' }}>
              <h3>세부공정까지 모두 선택 후, 검색해주십시오.</h3>
            </div>
          )}
        </Spin>
        {/* 모달 */}
        <AntdModal
          width={900}
          visible={this.state.isModal}
          title="유해화학물질 검색"
          onCancel={this.onChangeModal}
          destroyOnClose
          footer={null}
          className="modal-table-pad"
        >
          {isModal && (
            <MeterialModal
              sagaKey={id}
              getExtraApiData={getExtraApiData}
              extraApiData={extraApiData}
              changeFormData={changeFormData}
              onChangeModal={this.onChangeModal}
              isModal={isModal}
              formData={formData}
            />
          )}
        </AntdModal>
      </StyledContentsWrapper>
    );
  }
}

ModifyPage.propTypes = {
  sagaKey: PropTypes.string,
  extraApiData: PropTypes.object,
  formData: PropTypes.object,
  profile: PropTypes.object,
  getExtraApiData: PropTypes.func,
  changeFormData: PropTypes.func,
  saveTask: PropTypes.func,
  submitExtraHandler: PropTypes.func,
  setFormData: PropTypes.func,
};

ModifyPage.defaultProps = {};

export default ModifyPage;
