import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import Styled from './Styled';
// 메뉴 콘텐츠
// import MenuTable from '../infoTable/mainMenuTable'; // 배출시설 가동시간
import ExhaustActTable from '../../infoTable/viewTable/exhaustActTable'; // 방지시설 가동시간
import CleanActTable from '../../infoTable/viewTable/cleanActTable'; // 방지시설 가동시간
import FlowTable from '../../infoTable/viewTable/flowTable'; // 용수공급원별 사용량
import SludgeTable from '../../infoTable/viewTable/sludgeTable'; // Sludge 발생 및 처리량
import AdditionTable from '../../infoTable/viewTable/additionTable'; // 원료,첨가제 사용량
import WattmeterTable from '../../infoTable/viewTable/wattmeterTable'; // 전력사용량
import UsedChemicalTable from '../../infoTable/viewTable/usedChemicalTable'; // 약품사용량
import PokgijoTable from '../../infoTable/viewTable/pokgijoTable'; // 폭기조 운전상태
import CleanRepairTable from '../../infoTable/viewTable/cleanRepairTable'; // 방지시설 유지보수
import WaterQualCheckTable from '../../infoTable/viewTable/waterQualCheckTable'; // 오염물질 측정 내용
import CodCheckTable from '../../infoTable/viewTable/codCheckTable'; // 유기물 등 오염물질 자동측정 결과
// import CheckInfoTable from '../infoTable/checkTable'; // 지도, 검침사항
// import BigoTable from '../infoTable/bigoTable'; // 특이사항, 비고

class DiaryViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false, // 로딩
      mainFormData: {
        GROUP_UNIT_CD: '017', // 회사(매그너칩 고정)
        OP_DT: '', // 일지날짜
        TEMPERATURE: '', // 온도
        WEATHER: '', // 날씨
        APPROVAL_STATE: '', // 결재상태
        EMP_NO: '', // 담당자
        DAY: '', // 요일
      },
      exhaust: {}, // 배출시설
      clean: {}, // 방지시설
      usedFlow: [], // 용수공급원별 사용량
      waterFlow: [], // 폐수발생량
      sludge: [], // 슬러지
      addition: [], // 원료 첨가제
      wattMetter: [], // 전력사용량
      usedChemical: [], // 약품 사용량
      pokjijo: [], // 폭기조 운전상태
      cleanRepair: [], // 방지시설 유지보수
      waterQual: [], // 오염줄질 측정 내용
      codCheck: {}, // 유기물 등 오염물질 자동측정 결과
      check: [], // 지도, 점검사항
      bigo: [], // 비고, 특이사항
      processRule: {}, // 결재 프로세스 룰
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandlerReturnRes, opDt } = this.props;
    this.setState({ isLoading: true });
    const apiInfo = {
      key: 'getDiaryInfo',
      type: 'POST',
      url: `/api/eshs/v1/common/wwDiary`,
      params: { PARAM: { type: 'GET_DIARY_VIEW_INFO', search_dt: opDt } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.initCallback);
  }

  initCallback = (id, response) => {
    const { mainFormData } = this.state;
    const {
      MAIN_INFO,
      EXHAUST,
      CLEAN,
      USED_FLOW,
      WATER_FLOW,
      SLUDGE,
      ADDITION,
      WATT_METER,
      USED_CHEMICAL,
      POKGIJO,
      CLEAN_REPAIR,
      WATER_QUAL,
      COD_CHECK,
      CHECK,
      BIGO,
    } = response;
    this.setState({
      isLoading: false,
      mainFormData: {
        ...mainFormData,
        TEMPERATURE: (MAIN_INFO && MAIN_INFO.TEMPERATURE) || undefined, // 온도
        WEATHER: (MAIN_INFO && MAIN_INFO.WEATHER) || undefined, // 날씨
        APPROVAL_STATE: (MAIN_INFO && MAIN_INFO.APPROVAL_STATE) || undefined, // 결재상태
        EMP_NO: (MAIN_INFO && MAIN_INFO.EMP_NO) || undefined, // 담당자
        EMP_NM: (MAIN_INFO && MAIN_INFO.EMP_NM) || undefined, // 담당자명
        DRAFT_ID: (MAIN_INFO && MAIN_INFO.DRAFT_ID) || -1, // 담당자명
        OP_DT: (MAIN_INFO && MAIN_INFO.OP_DT) || '', // 일지날짜
        DAY: (MAIN_INFO && MAIN_INFO.DAY) || '', // 일지요일
      },
      exhaust: {
        ...EXHAUST,
      },
      clean: {
        ...CLEAN,
      },
      usedFlow: USED_FLOW,
      waterFlow: WATER_FLOW,
      sludge: SLUDGE,
      addition: ADDITION,
      wattMetter: WATT_METER,
      usedChemical: USED_CHEMICAL,
      pokgijo: POKGIJO,
      cleanRepair: CLEAN_REPAIR,
      waterQual: WATER_QUAL,
      codCheck: { ...COD_CHECK },
      check: CHECK,
      bigo: BIGO,
    });
  };

  render() {
    const {
      isLoading,
      mainFormData,
      exhaust,
      clean,
      usedFlow,
      waterFlow,
      sludge,
      addition,
      wattMetter,
      usedChemical,
      pokgijo,
      cleanRepair,
      waterQual,
      codCheck,
    } = this.state;
    console.debug('메인폼', this.state);
    return (
      <Styled>
        <Spin tip="일지정보 불러오는 중..." spinning={isLoading}>
          <div className="main-info">
            <div className="title">
              <h1 className="pd05">배출시설 및 방지시설 운영일지</h1>
              <p className="pd05">{`${mainFormData.OP_DT} ${mainFormData.DAY}   날씨 : ${mainFormData.WEATHER}  온도 : ${mainFormData.TEMPERATURE}`}</p>
            </div>
          </div>
          <div className="selected-menu-table">
            <ExhaustActTable exhaustData={exhaust} />
            <CleanActTable cleanData={clean} />
            <FlowTable title="용수공급원별 사용량" flowData={usedFlow} />
            <FlowTable title="폐수발생량" flowData={waterFlow} />
            <SludgeTable sludgeData={sludge} />
            <AdditionTable additionData={addition} />
            <WattmeterTable wattMetterData={wattMetter} />
            <UsedChemicalTable usedChemicalData={usedChemical} />
            <PokgijoTable pokgijoData={pokgijo} />
            <CleanRepairTable cleanRepairData={cleanRepair} />
            <WaterQualCheckTable waterQualData={waterQual} />
            <CodCheckTable codCheckData={codCheck} />
          </div>
        </Spin>
      </Styled>
    );
  }
}

DiaryViewPage.propTypes = {
  sagaKey: PropTypes.string,
  opDt: PropTypes.string,
  getCallDataHandlerReturnRes: PropTypes.func,
  // prcId: PropTypes.number,
  // relKey: PropTypes.string,
  // relKey2: PropTypes.string,
  // submitHandlerBySaga: PropTypes.func,
};

DiaryViewPage.defaultProps = {};

export default DiaryViewPage;
