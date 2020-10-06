import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Modal, Select, Spin, DatePicker } from 'antd';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import CustomWorkProcess from 'apps/Workflow/CustomWorkProcess'; // 결재선 지정
import { saveProcessRule } from 'apps/eshs/common/workProcessRule'; // 결재선 저장함수
import Styled from './Styled';
// 메뉴 콘텐츠
import MenuTable from '../infoTable/mainMenuTable'; // 배출시설 가동시간
import ExhaustActTable from '../infoTable/exhaustActTable'; // 방지시설 가동시간
import CleanActTable from '../infoTable/cleanActTable'; // 용수 공급원별 사용량
import FlowTable from '../infoTable/flowTable'; // 폐수발생량
import SludgeTable from '../infoTable/sludgeTable'; // Sludge 발생 및 처리량
import AdditionTable from '../infoTable/additionTable'; // 원료,첨가제 사용량
import WattmeterTable from '../infoTable/wattmeterTable'; // 전력사용량
import UsedChemicalTable from '../infoTable/usedChemicalTable'; // 약품사용량
import PokgijoTable from '../infoTable/pokgijoTable'; // 폭기조 운전상태
import CleanRepairTable from '../infoTable/cleanRepairTable'; // 방지시설 유지보수
import WaterQualCheckTable from '../infoTable/waterQualCheckTable'; // 오염물질 측정 내용
import CodCheckTable from '../infoTable/codCheckTable'; // 유기물 등 오염물질 자동측정 결과
import CheckInfoTable from '../infoTable/checkTable'; // 지도, 검침사항
import BigoTable from '../infoTable/bigoTable'; // 특이사항, 비고
// 모달 컨텐츠
import CleanRepairModal from '../modalContents/cleanRepairModal'; // 방지시설 추가, 수정 모달
import CheckInfoModal from '../modalContents/checkInfoModal'; // 지도,점검사항 추가, 수정 모달
import BigoInfoModal from '../modalContents/bigoInfoModal'; // 특이사항,비고 추가, 수정 모달

const AntdModal = StyledContentsModal(Modal);
const AntdSelect = StyledSelect(Select);
const AntdDatePicker = StyledDatePicker(DatePicker);
const { Option } = Select;

class QualityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: 'input',
      modalTitle: '', // 모달제목
      modalType: '', // 모달타입
      modalVisible: false, // 모달사용
      modalData: {}, // 모달데이터 (모달내 컨텐츠에서 사용될 데이터)
      isSearch: false, // 검색중
      isSearchMenu: false, // 메뉴에 필요한 데이터 로드 여부
      selectedMenu: '', // 선택된 일지 하위메뉴
      searchDate: moment().format('YYYY-MM-DD'), // 검색일자
      renderData: undefined, // 콘텐츠 렌더링에 필요한 데이터
      hasData: {}, // 검색한 일자의 하위메뉴들에 등록된 데이터 유무 (등록된 데이터가 없을경우 아이콘 출력)
      mainFormData: {
        GROUP_UNIT_CD: '017', // 회사(매그너칩 고정)
        OP_DT: undefined, // 일지날짜
        TEMPERATURE: undefined, // 온도
        WEATHER: undefined, // 날씨
        APPROVAL_STATE: undefined, // 결재상태
        EMP_NO: undefined, // 담당자
        DRAFT_ID: -1,
      },
      formData: undefined,
      processRule: {}, // 결재 프로세스 룰
      tempProcessRule: {},
    };
  }

  // 검색버튼 액션 - 일지기본정보 및 각 항목별 저장된 내용이 있는지 가져옴
  onClickSearch = () => {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const { searchDate } = this.state;
    this.setState({
      isSearch: true,
    });
    const apiInfo = {
      key: 'getDiaryInfo',
      type: 'POST',
      url: `/api/eshs/v1/common/wwDiary`,
      params: { PARAM: { type: 'GET_DIARY_INFO', search_dt: searchDate } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.searchCallback);
  };

  // 검색버튼 콜백 - 선택된 메뉴가 있다면 그 항목의 FormData / RenderData를 읽어옴
  searchCallback = (id, response) => {
    const { selectedMenu, mainFormData, searchDate } = this.state;
    const { MAIN_INFO, DIARY_INFO } = response;
    this.setState(
      {
        isSearch: false,
        mainFormData: {
          ...mainFormData,
          TEMPERATURE: (MAIN_INFO && MAIN_INFO.TEMPERATURE) || undefined, // 온도
          WEATHER: (MAIN_INFO && MAIN_INFO.WEATHER) || undefined, // 날씨
          APPROVAL_STATE: (MAIN_INFO && MAIN_INFO.APPROVAL_STATE) || undefined, // 결재상태
          EMP_NO: (MAIN_INFO && MAIN_INFO.EMP_NO) || undefined, // 담당자
          EMP_NM: (MAIN_INFO && MAIN_INFO.EMP_NM) || undefined, // 담당자명
          DRAFT_ID: (MAIN_INFO && MAIN_INFO.DRAFT_ID) || -1, // 담당자명
          OP_DT: searchDate,
        },
        hasData: {
          ...DIARY_INFO,
        },
      },
      () => this.onClickMenu(selectedMenu),
    );
  };

  // 저장, 수정, 삭제
  submitFormData = type => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { mainFormData, formData, modalData } = this.state;
    let submitData = {};
    switch (type) {
      case 'SAVE_MST_INFO': // 일지 기본정보
        submitData = {
          PARAM: {
            ...mainFormData,
            type,
          },
        };
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/wwDiary', submitData, this.onClickSearch);
        break;
      case 'SAVE_EXHAUST_ACT': // 배출시설 가동시간 저장/수정
        submitData = {
          PARAM: {
            type,
            GROUP_UNIT_CD: mainFormData.GROUP_UNIT_CD,
            OP_DT: mainFormData.OP_DT,
            LIST: formData,
          },
        };
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/wwAct', submitData, this.onClickSearch);
        break;
      case 'SAVE_CLEAN_ACT': // 방지시설 가동시간 저장/수정
        submitData = {
          PARAM: {
            type,
            GROUP_UNIT_CD: mainFormData.GROUP_UNIT_CD,
            OP_DT: mainFormData.OP_DT,
            LIST: formData,
          },
        };
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/wwAct', submitData, this.onClickSearch);
        break;
      case 'SAVE_USED_FLOW': // 용수공급원별 사용량 (검침시간 추가 저장)
        submitData = {
          PARAM: {
            type,
            LIST: formData,
          },
        };
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/wwflow', submitData, this.onClickSearch);
        break;
      case 'SAVE_WATER_FLOW': // 폐수발생량 사용량 (검침시간 추가 저장)
        submitData = {
          PARAM: {
            type,
            LIST: formData,
          },
        };
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/wwflow', submitData, this.onClickSearch);
        break;
      case 'SAVE_CLEAN_REPAIR_INFO': // 방지시설 유지보수 정보 저장
        submitData = {
          PARAM: {
            type,
            GROUP_UNIT_CD: mainFormData.GROUP_UNIT_CD,
            OP_DT: mainFormData.OP_DT,
            ...modalData,
          },
        };
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/wwCleanRepair', submitData, this.modalDataSubmitCallback);
        break;
      case 'SAVE_COD_CHK_INFO': // 유기물 등 오염물질 자동측정 결과
        submitData = {
          PARAM: {
            type,
            GROUP_UNIT_CD: mainFormData.GROUP_UNIT_CD,
            OP_DT: mainFormData.OP_DT,
            ...formData,
            AVG: formData.AVG || 0,
            CHK_02: formData.CHK_02 || 0,
            CHK_04: formData.CHK_04 || 0,
            CHK_06: formData.CHK_06 || 0,
            CHK_08: formData.CHK_08 || 0,
            CHK_10: formData.CHK_10 || 0,
            CHK_12: formData.CHK_12 || 0,
            CHK_14: formData.CHK_14 || 0,
            CHK_16: formData.CHK_16 || 0,
            CHK_18: formData.CHK_18 || 0,
            CHK_20: formData.CHK_20 || 0,
            CHK_22: formData.CHK_22 || 0,
            CHK_24: formData.CHK_24 || 0,
          },
        };
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/wwCodCheck', submitData, this.modalDataSubmitCallback);
        break;
      case 'SAVE_CHECK_INFO': // 지도,점검사항 저장
        submitData = {
          PARAM: {
            type,
            GROUP_UNIT_CD: mainFormData.GROUP_UNIT_CD,
            OP_DT: mainFormData.OP_DT,
            ...modalData,
          },
        };
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/wwCheckInfo', submitData, this.modalDataSubmitCallback);
        break;
      case 'SAVE_BIGO_INFO': // 특이사항, 비고 저장
        submitData = {
          PARAM: {
            type,
            GROUP_UNIT_CD: mainFormData.GROUP_UNIT_CD,
            OP_DT: mainFormData.OP_DT,
            ...modalData,
          },
        };
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/wwBigo', submitData, this.modalDataSubmitCallback);
        break;
      default:
        break;
    }
  };

  modalDataSubmitCallback = () => {
    this.setState(
      {
        modalType: '',
        modalVisible: false,
        modalTitle: '',
        modalData: {},
      },
      () => this.onClickSearch(),
    );
  };

  onClickMenu = menuName => {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const { mainFormData } = this.state;
    this.setState({
      isSearchMenu: false,
    });
    let apiInfo = {};
    switch (menuName) {
      case 'EXHAUST_ACT': // 배출시설 가동시간
        apiInfo = {
          key: 'getExhaustActInfo',
          type: 'POST',
          url: `/api/eshs/v1/common/wwAct`,
          params: { PARAM: { type: 'GET_EXHAUST_ACT_INFO', search_dt: mainFormData.OP_DT, group_unit_cd: mainFormData.GROUP_UNIT_CD } },
        };
        getCallDataHandlerReturnRes(id, apiInfo, this.getActDataCallback);
        break;
      case 'CLEAN_ACT': // 방지시설 가동시간
        apiInfo = {
          key: 'getCleanActInfo',
          type: 'POST',
          url: `/api/eshs/v1/common/wwAct`,
          params: { PARAM: { type: 'GET_CLEAN_ACT_INFO', search_dt: mainFormData.OP_DT, group_unit_cd: mainFormData.GROUP_UNIT_CD } },
        };
        getCallDataHandlerReturnRes(id, apiInfo, this.getActDataCallback);
        break;
      case 'USED_FLOW': // 용수공급원별 사용량
        apiInfo = {
          key: 'getUsedFlowInfo',
          type: 'POST',
          url: `/api/eshs/v1/common/wwflow`,
          params: { PARAM: { type: 'GET_USED_FLOW_INFO', search_dt: mainFormData.OP_DT, group_unit_cd: mainFormData.GROUP_UNIT_CD } },
        };
        getCallDataHandlerReturnRes(id, apiInfo, this.getListCallback);
        break;
      case 'WATER_FLOW': // 폐수발생량
        apiInfo = {
          key: 'getWaterFlowInfo',
          type: 'POST',
          url: `/api/eshs/v1/common/wwflow`,
          params: { PARAM: { type: 'GET_WATER_FLOW_INFO', search_dt: mainFormData.OP_DT, group_unit_cd: mainFormData.GROUP_UNIT_CD } },
        };
        getCallDataHandlerReturnRes(id, apiInfo, this.getListCallback);
        break;
      case 'SLUDGE': // Sludge 처리 시설
        apiInfo = {
          key: 'getSludgeInfo',
          type: 'POST',
          url: `/api/eshs/v1/common/wwSludge`,
          params: { PARAM: { type: 'GET_SLUDGE_INFO', search_dt: mainFormData.OP_DT, group_unit_cd: mainFormData.GROUP_UNIT_CD } },
        };
        getCallDataHandlerReturnRes(id, apiInfo, this.getListCallback);
        break;
      case 'ADDITION': // 원료, 첨가제 사용량
        apiInfo = {
          key: 'getAdditionInfo',
          type: 'POST',
          url: `/api/eshs/v1/common/wwAddition`,
          params: { PARAM: { type: 'GET_ADDITION_INFO', search_dt: mainFormData.OP_DT, group_unit_cd: mainFormData.GROUP_UNIT_CD } },
        };
        getCallDataHandlerReturnRes(id, apiInfo, this.getListCallback);
        break;
      case 'WATTMETER': // 전력 사용량
        apiInfo = {
          key: 'getWattmeterInfo',
          type: 'POST',
          url: `/api/eshs/v1/common/wwWattmeter`,
          params: { PARAM: { type: 'GET_WATTMETER_INFO', search_dt: mainFormData.OP_DT, group_unit_cd: mainFormData.GROUP_UNIT_CD } },
        };
        getCallDataHandlerReturnRes(id, apiInfo, this.getListCallback);
        break;
      case 'USED_CHEMICAL': // 약품 사용량
        apiInfo = {
          key: 'getUsedChemicalInfo',
          type: 'POST',
          url: `/api/eshs/v1/common/wwUsedChemical`,
          params: { PARAM: { type: 'GET_USED_CHEMICAL_INFO', search_dt: mainFormData.OP_DT, group_unit_cd: mainFormData.GROUP_UNIT_CD } },
        };
        getCallDataHandlerReturnRes(id, apiInfo, this.getListCallback);
        break;
      case 'POKGIJO': // 폭기조 운전상태
        apiInfo = {
          key: 'getPokgijoInfo',
          type: 'POST',
          url: `/api/eshs/v1/common/wwPokgijo`,
          params: { PARAM: { type: 'GET_POKGIJO_INFO', search_dt: mainFormData.OP_DT, group_unit_cd: mainFormData.GROUP_UNIT_CD } },
        };
        getCallDataHandlerReturnRes(id, apiInfo, this.getListCallback);
        break;
      case 'CLEAN_REPAIR': // 방지시설 유지보수
        apiInfo = {
          key: 'getCleanRepairInfo',
          type: 'POST',
          url: `/api/eshs/v1/common/wwCleanRepair`,
          params: { PARAM: { type: 'GET_CLEAN_REPAIR_INFO', search_dt: mainFormData.OP_DT, group_unit_cd: mainFormData.GROUP_UNIT_CD } },
        };
        getCallDataHandlerReturnRes(id, apiInfo, this.getListCallback);
        break;
      case 'WATER_QUAL': // 오염물질 측정 내용
        apiInfo = {
          key: 'getWaterQualCheckInfo',
          type: 'POST',
          url: `/api/eshs/v1/common/wwQualCheck`,
          params: { PARAM: { type: 'GET_WATER_QUAL_INFO', search_dt: mainFormData.OP_DT, group_unit_cd: mainFormData.GROUP_UNIT_CD } },
        };
        getCallDataHandlerReturnRes(id, apiInfo, this.getListCallback);
        break;
      case 'COD_CHK': // 유기물 등 오염물질 자동측정 결과
        apiInfo = {
          key: 'getCodCheckInfo',
          type: 'POST',
          url: `/api/eshs/v1/common/wwCodCheck`,
          params: { PARAM: { type: 'GET_COD_CHK_INFO', search_dt: mainFormData.OP_DT, group_unit_cd: mainFormData.GROUP_UNIT_CD } },
        };
        getCallDataHandlerReturnRes(id, apiInfo, this.getListCallback);
        break;
      case 'CHECK_INFO': // 지도 / 점검 사항
        apiInfo = {
          key: 'getCheckInfo',
          type: 'POST',
          url: `/api/eshs/v1/common/wwCheckInfo`,
          params: { PARAM: { type: 'GET_CHECK_INFO', search_dt: mainFormData.OP_DT, group_unit_cd: mainFormData.GROUP_UNIT_CD } },
        };
        getCallDataHandlerReturnRes(id, apiInfo, this.getListCallback);
        break;
      case 'BIGO': // 특이사항 / 비고
        apiInfo = {
          key: 'getBigoInfo',
          type: 'POST',
          url: `/api/eshs/v1/common/wwBigo`,
          params: { PARAM: { type: 'GET_BIGO_INFO', search_dt: mainFormData.OP_DT, group_unit_cd: mainFormData.GROUP_UNIT_CD } },
        };
        getCallDataHandlerReturnRes(id, apiInfo, this.getListCallback);
        break;
      default:
        break;
    }
    this.setState({
      selectedMenu: menuName,
    });
  };

  // 가동시간 Callback;
  getActDataCallback = (id, response) => {
    const { TARGET, RENDER_INFO } = response;
    const { CODE_LIST, ACT_LIST } = RENDER_INFO;
    const targetCd = `${TARGET}_CD`;
    let initFormData = ACT_LIST;
    if (initFormData.length === 0) {
      initFormData = CODE_LIST.map(item => ({ [targetCd]: item[targetCd] }));
    }
    this.setState({
      isSearchMenu: true,
      renderData: {
        ...RENDER_INFO,
      },
      formData: initFormData,
    });
  };

  // 메뉴클릭 콜백
  getListCallback = (id, response) => {
    const { RENDER_INFO } = response;
    if (Array.isArray(RENDER_INFO)) {
      this.setState({
        isSearchMenu: true,
        formData: RENDER_INFO || [],
      });
    } else {
      this.setState({
        isSearchMenu: true,
        formData: RENDER_INFO || {},
      });
    }
  };

  onChangeMainFormData = (field, value) => {
    const { mainFormData } = this.state;
    this.setState({
      isSearchMenu: true,
      mainFormData: {
        ...mainFormData,
        [field]: value,
      },
    });
  };

  actAllCheck = row => {
    const {
      OP_01,
      OP_02,
      OP_03,
      OP_04,
      OP_05,
      OP_06,
      OP_07,
      OP_08,
      OP_09,
      OP_10,
      OP_11,
      OP_12,
      OP_13,
      OP_14,
      OP_15,
      OP_16,
      OP_17,
      OP_18,
      OP_19,
      OP_20,
      OP_21,
      OP_22,
      OP_23,
      OP_24,
    } = row;
    return (
      OP_01 === 'Y' &&
      OP_02 === 'Y' &&
      OP_03 === 'Y' &&
      OP_04 === 'Y' &&
      OP_05 === 'Y' &&
      OP_06 === 'Y' &&
      OP_07 === 'Y' &&
      OP_08 === 'Y' &&
      OP_09 === 'Y' &&
      OP_10 === 'Y' &&
      OP_11 === 'Y' &&
      OP_12 === 'Y' &&
      OP_13 === 'Y' &&
      OP_14 === 'Y' &&
      OP_15 === 'Y' &&
      OP_16 === 'Y' &&
      OP_17 === 'Y' &&
      OP_18 === 'Y' &&
      OP_19 === 'Y' &&
      OP_20 === 'Y' &&
      OP_21 === 'Y' &&
      OP_22 === 'Y' &&
      OP_23 === 'Y' &&
      OP_24 === 'Y'
    );
  };

  // 가동시간 FormChange (단일변경)
  onChangeActFormData = (target, code, op, val) => {
    const { formData } = this.state;
    const value = val === true ? 'Y' : 'N';
    const targetForm = formData.find(item => item[target] === code);

    let nextTargetForm = {
      ...targetForm,
      [op]: value,
    };
    const allCheckYn = this.actAllCheck(nextTargetForm);
    if (allCheckYn) {
      nextTargetForm = {
        ...nextTargetForm,
        OP_ALL: 'Y',
      };
    } else {
      nextTargetForm = {
        ...nextTargetForm,
        OP_ALL: 'N',
      };
    }
    const nextFormData = formData.map(item => {
      if (item[target] === code) {
        return nextTargetForm;
      }
      return item;
    });
    this.setState({
      formData: nextFormData,
    });
  };

  // 가동시간 Row 전체 변경
  onChangeAllActFormData = (target, code, val) => {
    const { formData } = this.state;
    const value = val === true ? 'Y' : 'N';
    const nextFormData = formData.map(item => {
      if (item[target] === code) {
        return {
          ...item,
          OP_ALL: value,
          OP_01: value,
          OP_02: value,
          OP_03: value,
          OP_04: value,
          OP_05: value,
          OP_06: value,
          OP_07: value,
          OP_08: value,
          OP_09: value,
          OP_10: value,
          OP_11: value,
          OP_12: value,
          OP_13: value,
          OP_14: value,
          OP_15: value,
          OP_16: value,
          OP_17: value,
          OP_18: value,
          OP_19: value,
          OP_20: value,
          OP_21: value,
          OP_22: value,
          OP_23: value,
          OP_24: value,
        };
      }
      return item;
    });
    this.setState({
      formData: nextFormData,
    });
  };

  // 폼데이터 변경
  onChangeFormData = (field, value, key) => {
    const { selectedMenu, formData } = this.state;
    if (Array.isArray(formData)) {
      const nextFormData = formData.map((row, rowIndex) => {
        if (key === rowIndex) {
          return {
            ...row,
            [field]: value,
          };
        }
        return row;
      });
      this.setState({
        formData: nextFormData,
      });
    } else if (selectedMenu === 'COD_CHK') {
      const nextFormData = {
        ...formData,
        [field]: value,
      };
      this.setState(
        {
          formData: {
            ...formData,
            [field]: value,
          },
        },
        () => this.CodChkcalcAvg(nextFormData),
      );
    } else {
      this.setState({
        formData: {
          ...formData,
          [field]: value,
        },
      });
    }
  };

  // 평균값 계산
  CodChkcalcAvg = formData => {
    const { CHK_02, CHK_04, CHK_06, CHK_08, CHK_10, CHK_12, CHK_14, CHK_16, CHK_18, CHK_20, CHK_22, CHK_24 } = formData;
    const sum =
      (CHK_02 || 0) +
      (CHK_04 || 0) +
      (CHK_06 || 0) +
      (CHK_08 || 0) +
      (CHK_10 || 0) +
      (CHK_12 || 0) +
      (CHK_14 || 0) +
      (CHK_16 || 0) +
      (CHK_18 || 0) +
      (CHK_20 || 0) +
      (CHK_22 || 0) +
      (CHK_24 || 0);
    const avg = sum / 12;
    this.setState({
      formData: {
        ...formData,
        AVG: Number(avg.toFixed(4)),
      },
    });
  };

  // 모달내 폼데이터 수정
  onChangeModalFormData = (field, value) => {
    const { modalData } = this.state;
    this.setState({
      modalData: {
        ...modalData,
        [field]: value,
      },
    });
  };

  // 모달 핸들러
  modalHandler = (type, bool, data) => {
    let title = '';
    let mdData = {};
    switch (type) {
      case 'CLEAN_REPAIR':
        title = 'Daily Report - 방지시설 유지보수 관리';
        mdData = data || {};
        break;
      case 'CHECK_INFO':
        title = 'Daily Report - 지도/점검 관리 ';
        mdData = data || {};
        break;
      case 'BIGO':
        title = 'Daily Report - 특이사항/비고 관리 ';
        mdData = data || {};
        break;
      case 'WORK_PROCESS':
        title = '결재선 지정';
        mdData = data || {};
        break;
      default:
        break;
    }
    this.setState({
      modalType: type,
      modalVisible: bool,
      modalTitle: title,
      modalData: mdData,
    });
  };

  saveProcessRule = () => {
    const { relKey, relKey2 } = this.props;
    const { processRule, formData } = this.state;
    saveProcessRule({
      ...processRule,
      DRAFT_DATA: {},
      REL_KEY: relKey,
      REL_KEY2: formData[relKey2],
      DRAFT_TITLE: formData.TITLE,
    }).then(draftId => {
      if (draftId) {
        return this.setState({
          formData: { ...formData, DRAFT_ID: draftId },
          tempProcessRule: {},
        });
      }
      return false;
    });
  };

  render() {
    const {
      isSearch,
      viewType,
      modalVisible,
      modalType,
      modalTitle,
      modalData,
      isSearchMenu,
      selectedMenu,
      searchDate,
      hasData,
      renderData,
      mainFormData,
      formData,
      processRule,
    } = this.state;
    const { prcId: PRC_ID } = this.props;
    return (
      <Styled>
        <StyledCustomSearchWrapper>
          <Spin tip="검색중 ..." spinning={isSearch}>
            <div className="search-input-area">
              <span className="text-label">지역</span>
              <AntdSelect defaultValue="청주" className="select-sm" style={{ width: '70px' }} disabled>
                <Option value="청주">청주</Option>
                <Option value="구미">구미</Option>
              </AntdSelect>
              <span className="text-label">구분</span>
              <AntdSelect defaultValue="매그너칩반도체" className="select-sm" style={{ width: '125px' }} disabled>
                <Option value="매그너칩반도체">매그너칩반도체</Option>
              </AntdSelect>
              <span className="text-label">일자</span>
              <AntdDatePicker
                className="ant-picker-sm mr5"
                format="YYYY-MM-DD"
                defaultValue={moment(searchDate, 'YYYY-MM-DD')}
                style={{ width: '120px' }}
                onChange={(date, str) => this.setState({ searchDate: str })}
              />
              <StyledButton className="btn-gray btn-sm btn-first" onClick={() => this.onClickSearch()}>
                검색
              </StyledButton>
            </div>
          </Spin>
        </StyledCustomSearchWrapper>
        {mainFormData.OP_DT && (
          <>
            <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
              <StyledButton className="btn-primary btn-sm ml5" onClick={() => this.submitFormData('SAVE_MST_INFO')}>
                {hasData.MST > 0 ? '수정' : '저장'}
              </StyledButton>
              {hasData.MST > 0 && (
                <>
                  {mainFormData.APPROVAL_STATE === '0' && (
                    <StyledButton className="btn-primary btn-sm ml5" onClick={this.saveProcessRule}>
                      상신
                    </StyledButton>
                  )}
                  <StyledButton className="btn-gray btn-sm ml5" onClick={() => this.modalHandler('WORK_PROCESS', true)}>
                    결재선 지정
                  </StyledButton>
                </>
              )}
            </StyledButtonWrapper>
            <div className="menu-table">
              <MenuTable
                viewType={viewType}
                formData={mainFormData}
                onChangeMainFormData={this.onChangeMainFormData}
                onClickMenu={this.onClickMenu}
                hasData={hasData}
              />
            </div>
            <div className="selected-menu-table">
              {selectedMenu === 'EXHAUST_ACT' && isSearchMenu && (
                <ExhaustActTable
                  renderData={renderData}
                  formData={formData}
                  onChangeActFormData={this.onChangeActFormData}
                  onChangeAllActFormData={this.onChangeAllActFormData}
                  submitFormData={this.submitFormData}
                />
              )}
              {selectedMenu === 'CLEAN_ACT' && isSearchMenu && (
                <CleanActTable
                  renderData={renderData}
                  formData={formData}
                  onChangeActFormData={this.onChangeActFormData}
                  onChangeAllActFormData={this.onChangeAllActFormData}
                  submitFormData={this.submitFormData}
                />
              )}
              {(selectedMenu === 'USED_FLOW' || selectedMenu === 'WATER_FLOW') && isSearchMenu && (
                <FlowTable formData={formData} submitFormData={this.submitFormData} onChangeFormData={this.onChangeFormData} />
              )}
              {selectedMenu === 'SLUDGE' && isSearchMenu && <SludgeTable formData={formData} />}
              {selectedMenu === 'ADDITION' && isSearchMenu && <AdditionTable formData={formData} />}
              {selectedMenu === 'WATTMETER' && isSearchMenu && <WattmeterTable formData={formData} />}
              {selectedMenu === 'USED_CHEMICAL' && isSearchMenu && <UsedChemicalTable formData={formData} />}
              {selectedMenu === 'POKGIJO' && isSearchMenu && <PokgijoTable formData={formData} />}
              {selectedMenu === 'CLEAN_REPAIR' && isSearchMenu && <CleanRepairTable formData={formData} modalHandler={this.modalHandler} />}
              {selectedMenu === 'WATER_QUAL' && isSearchMenu && <WaterQualCheckTable formData={formData} />}
              {selectedMenu === 'COD_CHK' && isSearchMenu && (
                <CodCheckTable formData={formData} onChangeFormData={this.onChangeFormData} submitFormData={this.submitFormData} />
              )}
              {selectedMenu === 'CHECK_INFO' && isSearchMenu && <CheckInfoTable formData={formData} modalHandler={this.modalHandler} />}
              {selectedMenu === 'BIGO' && isSearchMenu && <BigoTable formData={formData} modalHandler={this.modalHandler} />}
            </div>
          </>
        )}
        <AntdModal
          className="modal-table-pad"
          title={modalTitle}
          width="65%"
          visible={modalVisible}
          footer={null}
          destroyOnClose
          maskClosable={false}
          onOk={() => this.modalHandler('', false)}
          onCancel={() => this.modalHandler('', false)}
        >
          {modalType === 'CLEAN_REPAIR' && (
            <CleanRepairModal
              opDt={mainFormData.OP_DT}
              formData={modalData}
              submitFormData={this.submitFormData}
              onChangeFormData={this.onChangeModalFormData}
            />
          )}
          {modalType === 'CHECK_INFO' && (
            <CheckInfoModal opDt={mainFormData.OP_DT} formData={modalData} submitFormData={this.submitFormData} onChangeFormData={this.onChangeModalFormData} />
          )}
          {modalType === 'BIGO' && (
            <BigoInfoModal opDt={mainFormData.OP_DT} formData={modalData} submitFormData={this.submitFormData} onChangeFormData={this.onChangeModalFormData} />
          )}
          {modalType === 'WORK_PROCESS' && (
            <>
              <CustomWorkProcess
                processRule={processRule}
                PRC_ID={PRC_ID}
                draftId={mainFormData.DRAFT_ID || -1}
                viewType={mainFormData.DRAFT_ID ? 'VIEW' : 'INPUT'}
                setProcessRule={(_, prcRule) => this.setState({ tempProcessRule: prcRule })}
              />
              <StyledButtonWrapper className="btn-wrap-center btn-wrap-mb-10">
                <StyledButton
                  className="btn-primary btn-xxs btn-first"
                  onClick={() =>
                    this.setState(
                      prevState => ({
                        processRule: prevState.tempProcessRule,
                      }),
                      () => this.modalHandler('', false),
                    )
                  }
                >
                  저장
                </StyledButton>
                <StyledButton className="btn-primary btn-xxs btn-first" onClick={() => this.modalHandler('', false)}>
                  닫기
                </StyledButton>
              </StyledButtonWrapper>
            </>
          )}
        </AntdModal>
      </Styled>
    );
  }
}

QualityPage.propTypes = {
  prcId: PropTypes.number,
  sagaKey: PropTypes.string,
  relKey: PropTypes.string,
  relKey2: PropTypes.string,
  getCallDataHandlerReturnRes: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
};

QualityPage.defaultProps = {};

export default QualityPage;
