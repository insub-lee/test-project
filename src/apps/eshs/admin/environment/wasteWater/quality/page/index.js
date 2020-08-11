import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Modal, Select, Spin, DatePicker } from 'antd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import RawWaterExcelParser from '../excelParser/rawWater';
import WasteWaterExcelParser from '../excelParser/wasteWater';
import RawWaterTable from '../infoTable/rawWaterInfo';
import DischargeWaterTable from '../infoTable/dischargeWater';
import ScatterChart from '../graph/scatterChart';
import Styled from './Styled';

const AntdModal = StyledContentsModal(Modal);
const AntdSelect = StyledSelect(Select);
const AntdRangeDatePicker = StyledDatePicker(DatePicker.RangePicker);
const { Option } = Select;

class QualityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      waterType: '원수',
      division: 'HF계',
      searchRange: [moment().subtract(1, 'M'), moment()],
      modalTitle: '',
      modalVisible: false,
      searchWaterType: '',
      searchDivision: '',
      listData: [],
    };
  }

  // waterType onChange
  onChangeWaterType = value => {
    switch (value) {
      case '원수':
        this.setState({
          waterType: value,
          division: 'HF계',
        });
        break;
      case '방류수':
        this.setState({
          waterType: value,
          division: '',
        });
        break;
      default:
        break;
    }
  };

  // 검색버튼
  onSearch = () => {
    const { searchRange, waterType, division } = this.state;
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    this.setState({ isSearching: true });
    const submitData = {
      PARAM: {
        type: 'SEARCH',
        sDate: searchRange[0],
        eDate: searchRange[1],
        waterType,
        division,
      },
    };
    submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/wwQuality', submitData, this.searchCallback);
  };

  searchCallback = (id, response) => {
    const { list, param } = response;
    this.setState({
      isSearching: false,
      searchWaterType: param.waterType || '',
      searchDivision: param.division || '',
      listData: list || [],
    });
  };

  // 모달 핸들러
  handleModal = (modalType, bool) => {
    const { waterType } = this.state;
    let title = '';
    switch (modalType) {
      case 'EXCEL':
        title = `${waterType} 정보 엑셀 업로드`;
        this.setState({
          modalTitle: title,
          modalVisible: bool,
        });
        break;
      default:
        this.setState({
          modalTitle: title,
          modalVisible: bool,
        });
        break;
    }
  };

  // 엑셀파일 등록시 - 추출된 데이터 가져오기 및 모달 닫기
  getUploadList = excelData => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const submitData = {
      PARAM: {
        type: 'UPSERT',
        EXCEL_DATA: excelData,
      },
    };
    submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/wwQuality', submitData, this.uploadExcelCallback);
    this.setState({
      modalTitle: '',
      modalVisible: false,
    });
  };

  uploadExcelCallback = (id, response) => {
    const { result } = response;
    if (result === -1) {
      return message.error(<MessageContent>수질정보 저장에 실패하였습니다.</MessageContent>);
    }
    return message.success(<MessageContent>수질정보가 저장되었습니다.</MessageContent>);
  };

  render() {
    const { isSearching, waterType, division, searchRange, modalTitle, modalVisible, listData, searchWaterType, searchDivision } = this.state;
    return (
      <Styled>
        <StyledCustomSearchWrapper>
          <Spin tip="검색중 ..." spinning={isSearching}>
            <div className="search-input-area">
              <span className="text-label">분류</span>
              <AntdSelect defaultValue={waterType} className="select-sm" style={{ width: '100px' }} onChange={val => this.onChangeWaterType(val)}>
                <Option value="원수">원수</Option>
                <Option value="방류수">방류수</Option>
              </AntdSelect>
              <span className="text-label">구분</span>
              <AntdSelect
                value={division}
                className="select-sm"
                style={{ width: '100px' }}
                onChange={val => this.setState({ division: val })}
                disabled={waterType === '방류수'}
              >
                <Option value="HF계">HF계</Option>
                <Option value="A/A계">A/A계</Option>
                <Option value="유기계">유기계</Option>
              </AntdSelect>
              <span className="text-label">기간</span>
              <AntdRangeDatePicker
                className="ant-picker-sm mr5"
                defaultValue={searchRange}
                format="YYYY-MM-DD"
                onChange={(date, str) => this.setState({ searchRange: str })}
              />
              <StyledButton className="btn-gray btn-sm btn-first" onClick={() => this.onSearch()}>
                검색
              </StyledButton>
            </div>
          </Spin>
        </StyledCustomSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <StyledButton className="btn-gray btn-sm ml5" onClick={() => this.handleModal('EXCEL', true)}>
            {`(${waterType}) Excel 업로드`}
          </StyledButton>
        </StyledButtonWrapper>
        {listData.length > 0 && (
          <>
            <div style={{ display: 'inline-block', width: '50%', padding: '5px' }}>
              {searchWaterType === '원수' && <RawWaterTable division={searchDivision} listData={listData} />}
              {searchWaterType === '방류수' && <DischargeWaterTable listData={listData} />}
            </div>
            <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top', padding: '5px' }}>
              {(searchDivision === 'HF계' || searchDivision === 'A/A계') && (
                <>
                  <div className="chart_wrap">
                    <div className="chart_title">
                      <span>F</span>
                    </div>
                    <ScatterChart chartName="F" xField="WQ_DT" xFieldNm="날짜" yField="F" yFieldNm="F" listData={listData || []} />
                  </div>
                  <div className="chart_wrap">
                    <div className="chart_title">BOD</div>
                    <ScatterChart chartName="BOD" xField="WQ_DT" xFieldNm="날짜" yField="BOD" yFieldNm="BOD" listData={listData || []} />
                  </div>
                  <div className="chart_wrap">
                    <div className="chart_title">CODmn</div>
                    <ScatterChart chartName="CODmn" xField="WQ_DT" xFieldNm="날짜" yField="COD_MN" yFieldNm="COD_MN" listData={listData || []} />
                  </div>
                  <div className="chart_wrap">
                    <div className="chart_title">SS</div>
                    <ScatterChart chartName="SS" xField="WQ_DT" xFieldNm="날짜" yField="SS" yFieldNm="SS" listData={listData || []} />
                  </div>
                  <div className="chart_wrap">
                    <div className="chart_title">T-N</div>
                    <ScatterChart chartName="T-N" xField="WQ_DT" xFieldNm="날짜" yField="TN" yFieldNm="TN" listData={listData || []} />
                  </div>
                  <div className="chart_wrap">
                    <div className="chart_title">T-P</div>
                    <ScatterChart chartName="T-P" xField="WQ_DT" xFieldNm="날짜" yField="TP" yFieldNm="TP" listData={listData || []} />
                  </div>
                </>
              )}
              {searchDivision === '유기계' && (
                <>
                  <div className="chart_wrap">
                    <div className="chart_title">
                      <span>F</span>
                    </div>
                    <ScatterChart chartName="F" xField="WQ_DT" xFieldNm="날짜" yField="F" yFieldNm="F" listData={listData || []} />
                  </div>
                  <div className="chart_wrap">
                    <div className="chart_title">BOD</div>
                    <ScatterChart chartName="BOD" xField="WQ_DT" xFieldNm="날짜" yField="BOD" yFieldNm="BOD" listData={listData || []} />
                  </div>
                  <div className="chart_wrap">
                    <div className="chart_title">CODmn</div>
                    <ScatterChart chartName="CODmn" xField="WQ_DT" xFieldNm="날짜" yField="COD_MN" yFieldNm="COD_MN" listData={listData || []} />
                  </div>
                  <div className="chart_wrap">
                    <div className="chart_title">CODcr</div>
                    <ScatterChart chartName="CODmn" xField="WQ_DT" xFieldNm="날짜" yField="COD_CR" yFieldNm="COD_CR" listData={listData || []} />
                  </div>
                  <div className="chart_wrap">
                    <div className="chart_title">SS</div>
                    <ScatterChart chartName="SS" xField="WQ_DT" xFieldNm="날짜" yField="SS" yFieldNm="SS" listData={listData || []} />
                  </div>
                  <div className="chart_wrap">
                    <div className="chart_title">T-N</div>
                    <ScatterChart chartName="T-N" xField="WQ_DT" xFieldNm="날짜" yField="TN" yFieldNm="TN" listData={listData || []} />
                  </div>
                  <div className="chart_wrap">
                    <div className="chart_title">T-P</div>
                    <ScatterChart chartName="T-P" xField="WQ_DT" xFieldNm="날짜" yField="TP" yFieldNm="TP" listData={listData || []} />
                  </div>
                </>
              )}
              {searchWaterType === '방류수' && (
                <>
                  <div className="chart_wrap">
                    <div className="chart_title">
                      <span>COD</span>
                    </div>
                    <ScatterChart chartName="COD" xField="WQ_DT" xFieldNm="날짜" yField="COD" yFieldNm="COD" listData={listData || []} />
                  </div>
                  <div className="chart_wrap">
                    <div className="chart_title">BOD</div>
                    <ScatterChart chartName="BOD" xField="WQ_DT" xFieldNm="날짜" yField="BOD" yFieldNm="BOD" listData={listData || []} />
                  </div>
                  <div className="chart_wrap">
                    <div className="chart_title">SS</div>
                    <ScatterChart chartName="SS" xField="WQ_DT" xFieldNm="날짜" yField="SS" yFieldNm="SS" listData={listData || []} />
                  </div>
                  <div className="chart_wrap">
                    <div className="chart_title">T-N</div>
                    <ScatterChart chartName="T-N" xField="WQ_DT" xFieldNm="날짜" yField="TN" yFieldNm="TN" listData={listData || []} />
                  </div>
                  <div className="chart_wrap">
                    <div className="chart_title">T-P</div>
                    <ScatterChart chartName="T-P" xField="WQ_DT" xFieldNm="날짜" yField="TP" yFieldNm="TP" listData={listData || []} />
                  </div>
                  <div className="chart_wrap">
                    <div className="chart_title">Flow</div>
                    <ScatterChart chartName="Flow" xField="WQ_DT" xFieldNm="날짜" yField="FLOW" yFieldNm="FLOW" listData={listData || []} />
                  </div>
                </>
              )}
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
          onOk={() => this.handleModal('', false)}
          onCancel={() => this.handleModal('', false)}
        >
          {waterType === '원수' && <RawWaterExcelParser getUploadList={this.getUploadList} />}
          {waterType === '방류수' && <WasteWaterExcelParser getUploadList={this.getUploadList} />}
        </AntdModal>
      </Styled>
    );
  }
}

QualityPage.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandlerReturnRes: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
};

QualityPage.defaultProps = {};

export default QualityPage;
