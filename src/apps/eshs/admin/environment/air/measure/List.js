import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DatePicker, Select, Button, Modal } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearch from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import Moment from 'moment';
import ExcelParser from './excelParser';

const { Option } = Select;
const { MonthPicker } = DatePicker;

const AntdSelect = StyledSelect(Select);
const AntdMonthPicker = StyledDatePicker(MonthPicker);
const AntdModal = StyledContentsModal(Modal);
const AntdButton = StyledAntdButton(Button);

Moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpload: false,
      measureList: [],
      dateStrings: Moment().format('YYYY-MM'),
      gasList: ['HCl', 'HF', 'HCHO', 'Cr', 'Pb', 'Ni', 'As', '벤젠', '페놀', 'NH3', 'Sox', 'Nox', '먼지', 'THC', '악취'],
      seq: 1,
      selectGubun: 1,
      modalTitle: '',
      modalVisible: false,
    };
  }

  isSearch = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { dateStrings, seq } = this.state;

    // 해당월의 마지막 날짜 구하기
    const arr = dateStrings.split('-');
    const date = new Date(Number(arr[0]), Number(arr[1]), 0);
    const lastDateStr = Moment(date).format('YYYY-MM-DD');

    const apiAry = [
      {
        key: 'measure',
        url: `/api/eshs/v1/common/eshsmeasure?START_DATE=${`${dateStrings}-01`}&&END_DATE=${lastDateStr}&&SEQ=${seq}`,
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.listData);
  };

  listData = () => {
    const { result } = this.props;
    this.setState({ measureList: result && result.measure && result.measure.list });
  };

  chagneSelect = (value, option) => {
    this.setState({
      [option.key]: value,
    });
  };

  dateChange = dateStrings => {
    this.setState({ dateStrings });
  };

  calculate = (gasCd, hourFlow, density, workDay, gasWeight) => {
    let calculateData;
    switch (gasCd) {
      case 'HCl':
      case 'HF':
      case 'HCHO':
      case '벤젠':
      case '페놀':
      case 'NH3':
      case 'Sox':
      case 'Nox':
      case 'THC':
        calculateData = ((hourFlow * density) / 22.4 / 1000000) * gasWeight * 24 * workDay;
        break;
      case 'Cr':
      case 'Pb':
      case 'Ni':
      case 'As':
      case '먼지':
        calculateData = ((hourFlow * density) / 1000000) * 24 * workDay;
        break;
      default:
        calculateData = density;
        break;
    }
    return calculateData;
  };

  // 모달 핸들러
  handleModal = (type, visible) => {
    let title = '';
    switch (type) {
      case 'EXCEL':
        title = '대기측정결과 업로드';
        this.setState({
          modalTitle: title,
          modalVisible: visible,
        });
        break;
      default:
        this.setState({
          modalTitle: title,
          modalVisible: visible,
        });
        break;
    }
  };

  // 엑셀파일 등록시 - 추출된 데이터 가져오기 및 모달 닫기
  getUploadList = (arr1, arr2) => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    this.setState({ isUpload: true });
    const submitData = {
      PARAM: {
        type: 'EXCEL',
        EXCEL_DATA1: arr1,
        EXCEL_DATA2: arr2,
      },
    };
    submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsmeasure', submitData, this.uploadExcelCallback);
  };

  uploadExcelCallback = (id, response) => {
    const { result } = response;
    if (result === -1) {
      this.setState({
        isUpload: false,
      });
      return message.error(<MessageContent>대기측정결과 저장에 실패하였습니다.</MessageContent>);
    }
    this.setState({
      modalTitle: '',
      modalVisible: false,
      isUpload: false,
    });
    return message.success(<MessageContent>대기측정결과가 저장되었습니다.</MessageContent>);
  };

  render() {
    const { measureList, gasList, selectGubun, modalTitle, modalVisible, isUpload } = this.state;

    return (
      <StyledContentsWrapper>
        <StyledCustomSearch className="search-wrapper-inline">
          <div className="search-input-area">
            <span className="text-label">조회구분</span>
            <AntdSelect className="select-sm" onChange={(value, option) => this.chagneSelect(value, option)} value={this.state.selectGubun}>
              <Option value={1} key="selectGubun">
                측정항목
              </Option>
              <Option value={2} key="selectGubun">
                배출총량
              </Option>
            </AntdSelect>
            <div style={{ margin: '0 5px', display: 'inline-block' }}>
              <AntdMonthPicker
                className="ant-picker-sm mr5"
                defaultValue={Moment(Moment(), 'YYYY-MM')}
                format="YYYY-MM"
                onChange={(date, dateStrings) => this.dateChange(dateStrings)}
              />
            </div>
            <span className="text-label">측정회차</span>
            <AntdSelect className="select-sm" onChange={(value, option) => this.chagneSelect(value, option)} value={this.state.seq}>
              <Option value={1} key="seq">
                1
              </Option>
              <Option value={2} key="seq">
                2
              </Option>
            </AntdSelect>
          </div>
          <div className="btn-area">
            <StyledButton className="btn-gray btn-sm" onClick={() => this.isSearch()}>
              검색
            </StyledButton>
          </div>
        </StyledCustomSearch>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <AntdButton className="btn-gray btn-xs" onClick={() => this.handleModal('EXCEL', true)}>
            <FileExcelOutlined />
            엑셀 업로드
          </AntdButton>
        </StyledButtonWrapper>
        {measureList ? (
          <StyledHtmlTable style={{ height: measureList.length > 10 && 400, overflow: 'scroll', msOverflowStyle: 'scrollbar' }}>
            <table>
              <tbody>
                <tr>
                  <th style={{ position: 'sticky', top: 0 }}>계통</th>
                  <th style={{ position: 'sticky', top: 0 }}>STACK</th>
                  <th style={{ position: 'sticky', top: 0 }}>측정여부(Y/N)</th>
                  <th style={{ position: 'sticky', top: 0 }}>측정일자</th>
                  <th style={{ position: 'sticky', top: 0 }}>분당 배출량</th>
                  <th style={{ position: 'sticky', top: 0 }}>시간당 배출량</th>
                  {gasList && gasList.map(item => <th style={{ position: 'sticky', top: 0 }}>{item}</th>)}
                </tr>
                {measureList.map(item => (
                  <tr>
                    <td>{item.GUBUN_NAME}</td>
                    <td>{item.STACK_CD}</td>
                    <td>{item.IS_MEASURE}</td>
                    <td>{item.MEASURE_DT}</td>
                    <td>{item.MINUTE_FLOW.toFixed(2)}</td>
                    <td>{item.HOUR_FLOW}</td>
                    <>
                      {selectGubun === 1 ? (
                        <>
                          {gasList &&
                            gasList.map(gasType => (
                              <td>
                                {item.GAS.map(gasItem => (
                                  <>{gasType === JSON.parse(gasItem.value).GAS_CD ? JSON.parse(gasItem.value).DENSITY : undefined}</>
                                ))}
                              </td>
                            ))}
                        </>
                      ) : (
                        <>
                          {gasList &&
                            gasList.map(gasType => (
                              <td>
                                {item.GAS.map(gasItem => (
                                  <>
                                    {gasType === JSON.parse(gasItem.value).GAS_CD
                                      ? this.calculate(
                                          gasType,
                                          item.HOUR_FLOW,
                                          JSON.parse(gasItem.value).DENSITY,
                                          item.WORK_DAY,
                                          JSON.parse(gasItem.value).GAS_WEIGHT,
                                        )
                                      : undefined}
                                  </>
                                ))}
                              </td>
                            ))}
                        </>
                      )}
                    </>
                  </tr>
                ))}
              </tbody>
            </table>
          </StyledHtmlTable>
        ) : (
          ''
        )}
        <AntdModal
          className="modal-table-pad"
          title={modalTitle}
          width="40%"
          visible={modalVisible}
          footer={null}
          destroyOnClose
          maskClosable={false}
          onOk={() => this.handleModal('', false)}
          onCancel={() => this.handleModal('', false)}
        >
          <ExcelParser getUploadList={this.getUploadList} isUpload={isUpload} />
        </AntdModal>
      </StyledContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
  result: PropTypes.any,
};

List.defaultProps = {};

export default List;
