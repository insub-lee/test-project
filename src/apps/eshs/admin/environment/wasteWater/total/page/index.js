import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Modal, Spin, DatePicker } from 'antd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import DischargeWaterTable from '../infoTable/dischargeWater';
import ExcelParser from '../excelParser/waterTotal';
import LineChart from '../graph/lineChart';
import Styled from './Styled';

const { MonthPicker } = DatePicker;
const AntdModal = StyledContentsModal(Modal);
const AntdMonthPicker = StyledDatePicker(MonthPicker);

class QualityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      waterType: '방류수',
      division: '',
      sMonth: moment()
        .subtract(1, 'M')
        .format('YYYY-MM'),
      eMonth: moment().format('YYYY-MM'),
      modalTitle: '',
      modalVisible: false,
      searchWaterType: '',
      searchDivision: '',
      listData: [],
    };
  }

  // 검색버튼
  onSearch = () => {
    const { sMonth, eMonth } = this.state;
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    this.setState({ isSearching: true });
    const submitData = {
      PARAM: {
        type: 'SEARCH',
        sMonth,
        eMonth,
      },
    };
    submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/wwTotal', submitData, this.searchCallback);
  };

  searchCallback = (id, response) => {
    const { list } = response;
    this.setState({
      isSearching: false,
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
        ...excelData,
        type: 'UPSERT',
      },
    };
    submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/wwTotal', submitData, this.uploadExcelCallback);
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
    const { isSearching, waterType, sMonth, eMonth, modalTitle, modalVisible, listData } = this.state;
    console.debug('스텟확인', this.state);
    return (
      <Styled>
        <StyledCustomSearchWrapper>
          <Spin tip="검색중 ..." spinning={isSearching}>
            <div className="search-input-area">
              <span className="text-label">기간</span>
              <AntdMonthPicker
                className="ant-picker-sm mr5"
                defaultValue={moment(sMonth, 'YYYY-MM')}
                mode="month"
                format="YYYY-MM"
                onChange={(date, str) => this.setState({ sMonth: str })}
              />
              ~
              <AntdMonthPicker
                className="ant-picker-sm"
                style={{ marginLeft: '5px' }}
                defaultValue={moment(eMonth, 'YYYY-MM')}
                mode="month"
                format="YYYY-MM"
                onChange={(date, str) => this.setState({ eMonth: str })}
              />
              <StyledButton className="btn-gray btn-sm btn-first" style={{ marginLeft: '5px' }} onClick={() => this.onSearch()}>
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
              <DischargeWaterTable listData={listData} />
            </div>
            <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top', padding: '5px' }}>
              <div className="chart_wrap">
                <div className="chart_title">COD</div>
                <LineChart chartName="COD" xField="TOTAL_MONTH" xFieldNm="기간" yField="COD_TOTAL" yFieldNm="COD_TOTAL" listData={listData || []} />
              </div>
              <div className="chart_wrap">
                <div className="chart_title">BOD</div>
                <LineChart chartName="BOD" xField="TOTAL_MONTH" xFieldNm="기간" yField="BOD_TOTAL" yFieldNm="BOD_TOTAL" listData={listData || []} />
              </div>
              <div className="chart_wrap">
                <div className="chart_title">SS</div>
                <LineChart chartName="SS" xField="TOTAL_MONTH" xFieldNm="기간" yField="SS_TOTAL" yFieldNm="SS_TOTAL" listData={listData || []} />
              </div>
              <div className="chart_wrap">
                <div className="chart_title">T-N</div>
                <LineChart chartName="F" xField="TOTAL_MONTH" xFieldNm="기간" yField="F_TOTAL" yFieldNm="F_TOTAL" listData={listData || []} />
              </div>
              <div className="chart_wrap">
                <div className="chart_title">T-P</div>
                <LineChart chartName="TN" xField="TOTAL_MONTH" xFieldNm="기간" yField="TN_TOTAL" yFieldNm="TN_TOTAL" listData={listData || []} />
              </div>
              <div className="chart_wrap">
                <div className="chart_title">Flow</div>
                <LineChart chartName="TP" xField="TOTAL_MONTH" xFieldNm="기간" yField="TP_TOTAL" yFieldNm="TP_TOTAL" listData={listData || []} />
              </div>
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
          <ExcelParser getUploadList={this.getUploadList} />
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
