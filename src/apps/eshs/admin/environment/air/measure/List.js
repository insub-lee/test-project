import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DatePicker, Select, message, Button } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearch from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';

import Moment from 'moment';

const { Option } = Select;
const { MonthPicker } = DatePicker;

const AntdSelect = StyledSelect(Select);
const AntdMonthPicker = StyledDatePicker(MonthPicker);
const AntdButton = StyledAntdButton(Button);

Moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measureList: [],
      dateStrings: Moment().format('YYYY-MM'),
      seq: 1,
      selectGubun: 1,
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'gasType',
        url: '/api/eshs/v1/common/eshsgastype',
        type: 'GET',
      },
    ];
    this.isSearch();
    getCallDataHandler(id, apiAry, this.initData);
  }

  initData = () => {
    const { result } = this.props;
    const gasList = result && result.gasType && result.gasType.list;
    this.setState({ gasList });
  };

  isSearch = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { dateStrings, seq } = this.state;
    const apiAry = [
      {
        key: 'measure',
        url: `/api/eshs/v1/common/eshsmeasure?START_DATE=${`${dateStrings}-01`}&&END_DATE=${`${dateStrings}-31`}&&SEQ=${seq}`,
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

  render() {
    const { measureList, gasList, selectGubun } = this.state;

    return (
      <StyledContentsWrapper>
        <StyledCustomSearch className="search-wrapper-inline">
          <div className="search-input-area">
            <span className="text-label">조회구분</span>
            <AntdSelect className="select-mid" onChange={(value, option) => this.chagneSelect(value, option)} value={this.state.selectGubun}>
              <Option value={1} key="selectGubun">
                측정항목
              </Option>
              <Option value={2} key="selectGubun">
                배출총량
              </Option>
            </AntdSelect>
            <div style={{ margin: '0 5px', display: 'inline-block' }}>
              <AntdMonthPicker
                className="ant-picker-mid mr5"
                defaultValue={Moment(Moment(), 'YYYY-MM')}
                format="YYYY-MM"
                onChange={(date, dateStrings) => this.dateChange(dateStrings)}
              />
            </div>
            <span className="text-label">측정회차(월)</span>
            <AntdSelect className="select-mid mr5" onChange={(value, option) => this.chagneSelect(value, option)} value={this.state.seq}>
              <Option value={1} key="seq">
                1
              </Option>
              <Option value={2} key="seq">
                2
              </Option>
            </AntdSelect>
          </div>
          <div className="btn-area">
            <StyledButton className="btn-gray btn-first btn-sm" onClick={() => this.isSearch()}>
              검색
            </StyledButton>
          </div>
        </StyledCustomSearch>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <AntdButton className="btn-primary btn-sm" onClick={() => message.info('개발 중 입니다.')}>
            <FileExcelOutlined />
            엑셀 올리기
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
                  {gasList && gasList.map(item => <th style={{ position: 'sticky', top: 0 }}>{item.GAS_CD}</th>)}
                </tr>
                {measureList.map(item => (
                  <tr>
                    <td>{item.GUBUN_NAME}</td>
                    <td>{item.STACK_CD}</td>
                    <td>{item.IS_MEASURE}</td>
                    <td>{item.MEASURE_DT}</td>
                    <td>{item.MINUTE_FLOW}</td>
                    <td>{item.HOUR_FLOW}</td>
                    <>
                      {selectGubun === 1 ? (
                        <>
                          {gasList &&
                            gasList.map(gasType => (
                              <td>
                                {item.GAS.map(gasItem => (
                                  <>{gasType.GAS_CD === JSON.parse(gasItem.value).GAS_CD ? JSON.parse(gasItem.value).DENSITY : undefined}</>
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
                                    {gasType.GAS_CD === JSON.parse(gasItem.value).GAS_CD
                                      ? this.calculate(
                                          gasType.GAS_CD,
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
      </StyledContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.any,
};

List.defaultProps = {};

export default List;
