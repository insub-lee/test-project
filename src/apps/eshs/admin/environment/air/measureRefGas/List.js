import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DatePicker, Select, Input, Modal, message, Table } from 'antd';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearch from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledModalWrapper from 'components/BizBuilder/styled/Modal/StyledAntdModalPad';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';

import Moment from 'moment';
import Graph from './Graph';
import LineComp from './Graph/LineComp';

const { Option } = Select;
const { RangePicker } = DatePicker;

const AntdSelect = StyledSelect(Select);
const AntdSearch = StyledSearchInput(Input.Search);
const AntdModal = StyledModalWrapper(Modal);
const AntdTable = StyledAntdTable(Table);
const AntdRangePicker = StyledDatePicker(RangePicker);

Moment.locale('ko');

const avgs = ['Acid', 'Toxic', 'VOC'];

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measureList: [],
      rangeDateStrings: [Moment(Moment().subtract(1, 'years')).format('YYYY-MM'), Moment().format('YYYY-MM')],
      selectGubun: 1,
      isModal: false,
      chartData: [],
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler, spinningOn } = this.props;
    spinningOn();
    const apiAry = [
      {
        key: 'gasType',
        url: '/api/eshs/v1/common/eshsgastype',
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  }

  initData = () => {
    const {
      result: { gasType },
      spinningOff,
    } = this.props;

    this.setState({ gasList: (gasType && gasType.list) || [] }, spinningOff);
  };

  isSearch = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn } = this.props;
    const { rangeDateStrings, gasCd } = this.state;
    const setDate = `START_DATE=${Moment(rangeDateStrings[0]).format('YYYY-MM-01')}&END_DATE=${Moment(rangeDateStrings[1])
      .endOf('month')
      .format('YYYY-MM-DD')}`;
    const apiAry = [
      {
        key: 'measure',
        url: `/api/eshs/v1/common/eshsmeasure?${setDate}&GAS_CD=${gasCd}`,
        type: 'POST',
      },
    ];
    if (gasCd) {
      spinningOn();
      getCallDataHandler(id, apiAry, this.listData);
    } else {
      message.warning('GAS 종류를 먼저 선택해주세요.');
    }
  };

  listData = () => {
    const {
      result: { measure },
    } = this.props;
    const measureList = (measure && measure.list) || [];
    const stackList = (measure && measure.stackList) || [];
    if (measureList.length <= 0) {
      message.warning('측정된 데이터가 없습니다.');
    }

    this.setState({ measureList, stackList }, this.setChartData);
  };

  onChangeState = (name, value) => {
    if (name === 'selectGubun') return this.setState({ [name]: value }, this.setChartData);
    return this.setState({ [name]: value });
  };

  setChartData = () => {
    const { spinningOff } = this.props;
    const { selectGubun, measureList } = this.state;
    const gubun = selectGubun === 1 ? 'METRIC' : 'TOTAL';
    const chartData = measureList.map((item, index) => ({
      seq: `${item.SEQ}차`,
      date: item.MEASURE_DT,
      dataKey: `${item.MEASURE_DT} / ${item.SEQ}차`,
      Acid: item[`Acid_${gubun}`] || 0,
      Toxic: item[`Toxic_${gubun}`] || 0,
      VOC: item[`VOC_${gubun}`] || 0,
    }));
    return this.setState({ chartData }, spinningOff);
  };

  onChangeModal = () => {
    const { isModal } = this.state;
    this.setState({ isModal: !isModal });
  };

  onRowClick = record => {
    this.setState({ gasCd: record.GAS_CD, gasWeight: record.GAS_WEIGHT });
    this.onChangeModal();
  };

  calculate = (gasCd, hourFlow, density, workDay, gasWeight) => {
    let calculateData;
    if (density) {
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
          calculateData = (((hourFlow * density) / 22.4 / 1000000) * gasWeight * 24 * workDay).toFixed(9);
          break;
        case 'Cr':
        case 'Pb':
        case 'Ni':
        case 'As':
        case '먼지':
          calculateData = (((hourFlow * density) / 1000000) * 24 * workDay).toFixed(9);
          break;
        default:
          calculateData = density;
          break;
      }
    } else {
      calculateData = density;
    }

    return calculateData;
  };

  columns = [
    {
      title: '가스종류명',
      dataIndex: 'GAS_CD',
      align: 'center',
    },
    {
      title: '가스분자량',
      dataIndex: 'GAS_WEIGHT',
      align: 'right',
    },
    {
      title: '법적허용 농도(PPM)',
      dataIndex: 'PERMISSION_DENSITY',
      align: 'center',
    },
    {
      title: '단위',
      dataIndex: 'UNIT',
      align: 'left',
    },
  ];

  render() {
    const { measureList, stackList, gasList, selectGubun, rangeDateStrings, gasWeight, gasCd, chartData } = this.state;
    return (
      <StyledContentsWrapper>
        <StyledCustomSearch className="search-wrapper-inline">
          <div className="search-input-area">
            <span className="text-label">조회구분</span>
            <AntdSelect className="select-sm mr5" onChange={value => this.onChangeState('selectGubun', value)} value={this.state.selectGubun}>
              <Option value={1} key="selectGubun">
                측정항목
              </Option>
              <Option value={2} key="selectGubun">
                배출총량
              </Option>
            </AntdSelect>
            <AntdRangePicker
              className="ant-picker-sm mr5"
              value={[Moment(rangeDateStrings[0], 'YYYY-MM'), Moment(rangeDateStrings[1], 'YYYY-MM')]}
              open={this.state.isopen}
              mode={['month', 'month']}
              format={['YYYY-MM', 'YYYY-MM']}
              disabledDate={current => current && current < Moment().endOf('month')}
              onOpenChange={status => {
                if (rangeDateStrings[1] - rangeDateStrings[0] > 28857600000) {
                  message.warning('기간은 최대 1년까지 검색가능합니다.');
                  return this.setState({
                    rangeDateStrings: [Moment(rangeDateStrings[0], 'YYYY-MM'), Moment(rangeDateStrings[0], 'YYYY-MM').add(11, 'M')],
                    isopen: status,
                  });
                }
                return this.setState({ isopen: status });
              }}
              onPanelChange={value => {
                if (value[0] < Moment().endOf('month') && value[1] < Moment().endOf('month')) {
                  this.setState({
                    rangeDateStrings: value,
                  });
                } else {
                  message.warning('날짜가 올바르지 않습니다.');
                }
              }}
            />
            <AntdSearch style={{ width: 200 }} className="input-search-sm ant-search-inline" value={this.state.gasCd} readOnly onClick={this.onChangeModal} />
          </div>
          <div className="btn-area">
            <StyledButton className="btn-gray btn-sm" onClick={() => this.isSearch()}>
              검색
            </StyledButton>
          </div>
        </StyledCustomSearch>
        {measureList.length > 0 ? (
          <StyledHtmlTable>
            <div style={{ height: measureList.length > 10 && 400, overflow: 'scroll', msOverflowStyle: 'scrollbar' }}>
              <table>
                <colgroup>
                  <col width="150px" />
                  {stackList.map((item, sIdx) => (
                    <col key={`COL_COL_${sIdx}`} width="100px" />
                  ))}
                  <col width="100px" />
                  <col width="100px" />
                  <col width="100px" />
                </colgroup>
                <tbody>
                  <tr>
                    <td style={{ textAlign: 'center' }}>구분</td>
                    <td colSpan={stackList.length} style={{ textAlign: 'center' }}>
                      {this.state.gasCd}
                    </td>
                    <td colSpan={avgs.length} style={{ textAlign: 'center' }}>
                      평균
                    </td>
                  </tr>
                  <tr>
                    <th>회차</th>
                    {stackList.map((item, sIdx) => (
                      <th key={`COL_THS_${sIdx}`}>{item.STACK_CD}</th>
                    ))}
                    {avgs.map((avg, aIdx) => (
                      <th key={`COL_THA_${aIdx}`}>{avg}</th>
                    ))}
                  </tr>
                  {measureList.map((item, mIdx) => (
                    <tr key={`ROW_TR_${mIdx}`}>
                      <td align="center">{`${item.MEASURE_DT} / ${item.SEQ}차`}</td>
                      {selectGubun === 1
                        ? stackList.map((stackItem, index) => {
                            const idx = item.DENSITY.findIndex(gasItem => JSON.parse(gasItem.value).stack_cd === stackItem.STACK_CD);
                            if (idx > -1) {
                              return (
                                <td key={`STACK_${mIdx}_${index}`} align="center">
                                  {JSON.parse(item.DENSITY[idx].value).density}
                                </td>
                              );
                            }
                            return (
                              <td key={`STACK_${mIdx}_${index}`} align="center">
                                0
                              </td>
                            );
                          })
                        : stackList.map((stackItem, index) => {
                            const idx = item.DENSITY.findIndex(gasItem => JSON.parse(gasItem.value).stack_cd === stackItem.STACK_CD);
                            if (idx > -1) {
                              return (
                                <td key={`STACK_${mIdx}_${index}`} align="center">
                                  {this.calculate(
                                    gasCd,
                                    JSON.parse(item.DENSITY[idx].value).hour_flow,
                                    JSON.parse(item.DENSITY[idx].value).density,
                                    JSON.parse(item.DENSITY[idx].value).work_day,
                                    gasWeight,
                                  )}
                                </td>
                              );
                            }
                            return (
                              <td key={`STACK_${mIdx}_${index}`} align="center">
                                0
                              </td>
                            );
                          })}
                      {avgs.map((avg, index) => (
                        <td align="center" key={`COL_AVG_${index}`}>
                          {item[`${avg}_${selectGubun === 1 ? 'METRIC' : 'TOTAL'}`]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </StyledHtmlTable>
        ) : (
          ''
        )}
        <div style={{ overflow: 'auto', msOverflowStyle: 'scrollbar' }}>
          {/* {measureList.length > 0 ? <Graph graphData={measureList} stackList={stackList} selectGubun={selectGubun} gasCd={gasCd} gasWeight={gasWeight} /> : ''} */}
          {measureList.length > 0 ? <LineComp data={chartData} /> : ''}
        </div>
        <AntdModal width={800} visible={this.state.isModal} title="Gas 정보" onCancel={this.onChangeModal} destroyOnClose footer={[]}>
          <AntdTable
            className="table-wrapper"
            dataSource={gasList}
            columns={this.columns}
            onRow={record => ({
              onClick: () => {
                this.onRowClick(record);
              },
            })}
          />
        </AntdModal>
      </StyledContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.any,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
};

List.defaultProps = {};

export default List;
