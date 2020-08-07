import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DatePicker, Select, Input, Modal, message } from 'antd';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearch from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledModalWrapper from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import BizBuilderBase from 'components/BizBuilderBase';

import Moment from 'moment';
import Graph from './Graph';
import LineComp from './Graph/LineComp';

const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;

const AntdSelect = StyledSelect(Select);
const AntdSearch = StyledSearchInput(Input.Search);
const AntdModal = StyledModalWrapper(Modal);
const AntdMonthPicker = StyledDatePicker(MonthPicker);
const AntdRangePicker = StyledDatePicker(RangePicker);

Moment.locale('ko');

// 환경안전팀 전서현 요청 특정 가스만 노출 2020.07.28
const businessRequestGas = ['HCl', 'HF', 'HCHO', 'Cr', 'Pb', 'Ni', 'NH3', 'Nox', '먼지', 'THC', '벤젠', '페놀'];

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measureList: [],
      dateStrings: Moment().format('YYYY-MM'),
      rangeDateStrings: [Moment(Moment().subtract(1, 'years')).format('YYYY-MM'), Moment().format('YYYY-MM')],
      seq: 1,
      selectGubun: 1,
      isModal: false,
      lineChartData: [],
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler, refStack, spinningOn } = this.props;
    const apiAry = [
      {
        key: 'gasType',
        url: '/api/eshs/v1/common/eshsgastype',
        type: 'GET',
      },
    ];
    spinningOn();
    if (!refStack) {
      this.isSearch();
    }
    getCallDataHandler(id, apiAry, this.initData);
  }

  initData = () => {
    const {
      result: { gasType },
      spinningOff,
    } = this.props;
    this.setState({ gasList: (gasType && gasType.list && gasType.list.filter(gas => businessRequestGas.indexOf(gas.GAS_CD) > -1)) || [] }, spinningOff);
  };

  isSearch = () => {
    const { sagaKey: id, getCallDataHandler, refStack, spinningOff } = this.props;
    const { dateStrings, rangeDateStrings, seq, stackCd } = this.state;
    const setDate = refStack
      ? `START_DATE=${Moment(rangeDateStrings[0]).format('YYYY-MM-01')}&&END_DATE=${Moment(rangeDateStrings[1])
          .endOf('month')
          .format('YYYY-MM-DD')}&&STACK_CD=${stackCd}`
      : `START_DATE=${`${dateStrings}-01`}&&END_DATE=${`${dateStrings}-31`}`;
    const apiAry = [
      {
        key: 'measure',
        url: `/api/eshs/v1/common/eshsmeasure?${setDate}&&SEQ=${seq}`,
        type: 'GET',
      },
    ];
    if (!refStack || (refStack && stackCd)) {
      getCallDataHandler(id, apiAry, this.listData);
    } else {
      spinningOff();
      message.warning('stack 종류를 먼저 선택해주세요.');
    }
  };

  listData = () => {
    const {
      result: { measure },
    } = this.props;
    this.setState({ measureList: (measure && measure.list) || [] }, this.dataSet);
  };

  onChangeState = (name, value) => {
    if (name === 'selectGubun') {
      this.setState(
        {
          [name]: value,
        },
        this.dataSet,
      );
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  onChangeModal = () => {
    const { isModal } = this.state;
    this.setState({ isModal: !isModal });
  };

  customOnRowClick = record => {
    this.setState({ stackCd: record.STACK_CD });
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

  densityList = name => {
    const { measureList, selectGubun } = this.state;
    let list;
    if (name) {
      list = measureList && measureList.filter(element => element.GUBUN_NAME === name);
    } else {
      list = measureList;
    }
    const temp =
      list &&
      list
        .map(element => element.GAS.map(gasItem => JSON.parse(gasItem.value)))
        .map(i =>
          i.reduce(
            (accumulator, currentValue) => ({
              ...accumulator,
              [`DATE`]: currentValue.MEASURE_DT,
              [currentValue.GAS_CD]:
                selectGubun === 1
                  ? currentValue.DENSITY
                  : this.calculate(currentValue.GAS_CD, currentValue.HOUR_FLOW, currentValue.DENSITY, currentValue.WORK_DAY, currentValue.GAS_WEIGHT),
            }),
            {},
          ),
        );

    return temp;
  };

  dataSet = () => {
    const { refStack, spinningOff } = this.props;
    const { measureList, gasList } = this.state;
    if (!measureList.length) {
      spinningOff();
      return message.warning('검색된 데이터가 없습니다.');
    }
    const hour = measureList && measureList.map(element => Number(element.HOUR_FLOW).toFixed(3));
    const minute = measureList && measureList.map(element => Number(element.MINUTE_FLOW).toFixed(3));
    const temp = this.densityList();
    const gasDensity = {};

    gasList &&
      gasList.forEach(item => {
        gasDensity[`${item.GAS_CD}_MAX`] = 0;
        gasDensity[`${item.GAS_CD}_MIN`] = 0;
        temp &&
          temp.forEach(gass => {
            gasDensity[`${item.GAS_CD}_MAX`] = gasDensity[`${item.GAS_CD}_MAX`] < gass[item.GAS_CD] ? gass[item.GAS_CD] : gasDensity[`${item.GAS_CD}_MAX`];
            gasDensity[`${item.GAS_CD}_MIN`] = gasDensity[`${item.GAS_CD}_MIN`] > gass[item.GAS_CD] ? gass[item.GAS_CD] : gasDensity[`${item.GAS_CD}_MIN`];
          });
      });

    if (!refStack) {
      const acid = this.avg('Acid');
      const toxic = this.avg('Toxic');
      const VOC = this.avg('VOC');
      this.setState({ gasDensity, hour, minute, acid, toxic, VOC, lineChartData: temp }, spinningOff);
    } else {
      const avg = this.avg();
      this.setState({ gasDensity, hour, minute, avg, lineChartData: temp }, spinningOff);
    }
  };

  avg = name => {
    const { measureList, gasList } = this.state;
    let avg;
    if (name) {
      avg = measureList && measureList.filter(element => element.GUBUN_NAME === name);
    } else {
      avg = measureList;
    }
    const hour = avg.reduce((pre, cur) => ({ HOUR_FLOW: Number(pre.HOUR_FLOW) + Number(cur.HOUR_FLOW) }), { HOUR_FLOW: 0 });
    const temp = this.densityList(name);
    const avgList =
      gasList &&
      gasList
        .map(
          item =>
            temp &&
            temp.reduce(
              (accumulator, currentValue) => ({
                ...accumulator,
                [item.GAS_CD]: accumulator[item.GAS_CD]
                  ? Number(accumulator[item.GAS_CD]) + Number(currentValue[item.GAS_CD]) || 0
                  : currentValue[item.GAS_CD] || 0,
              }),
              {},
            ),
        )
        .reduce((result, item) => ({ ...result, ...item }), {});

    return { ...avgList, LENGTH: avg.length, HOUR_FLOW: hour.HOUR_FLOW };
  };

  render() {
    const { measureList, gasList, selectGubun, rangeDateStrings, gasDensity, hour, minute, acid, toxic, VOC, avg, lineChartData } = this.state;
    const { refStack } = this.props;
    console.debug('여기는 props', this.props);
    return (
      <StyledContentsWrapper>
        <StyledCustomSearch className="search-wrapper-inline">
          <div className="search-input-area">
            <span className="text-label">조회구분</span>
            <AntdSelect className="select-mid mr5" onChange={value => this.onChangeState('selectGubun', value)} value={this.state.selectGubun}>
              <Option value={1} key="selectGubun">
                측정항목
              </Option>
              <Option value={2} key="selectGubun">
                배출총량
              </Option>
            </AntdSelect>
            {refStack ? (
              // mode 사용 시 open value 관리해야함
              <AntdRangePicker
                className="ant-picker-mid mr5"
                value={[Moment(rangeDateStrings[0], 'YYYY-MM'), Moment(rangeDateStrings[1], 'YYYY-MM')]}
                style={{ width: 300 }}
                open={this.state.isopen}
                mode={['month', 'month']}
                format={['YYYY-MM', 'YYYY-MM']}
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
            ) : (
              <AntdMonthPicker
                className="ant-picker-mid mr5"
                defaultValue={Moment(Moment(), 'YYYY-MM')}
                format="YYYY-MM"
                onChange={(date, dateStrings) => this.onChangeState('dateStrings', dateStrings)}
              />
            )}
            <span className="text-label">측정회차(월)</span>
            <AntdSelect style={{ width: 100 }} className="select-mid mr5" onChange={value => this.onChangeState('seq', value)} value={this.state.seq}>
              <Option value={1} key="seq">
                1 회차
              </Option>
              <Option value={2} key="seq">
                2 회차
              </Option>
            </AntdSelect>
            {refStack ? (
              <AntdSearch
                style={{ width: 200 }}
                className="input-search-mid ant-search-inline mr5"
                value={this.state.stackCd}
                readOnly
                onClick={this.onChangeModal}
              />
            ) : (
              ''
            )}
          </div>
          <div className="btn-area">
            <StyledButton className="btn-gray btn-sm" onClick={this.isSearch}>
              검색
            </StyledButton>
          </div>
        </StyledCustomSearch>
        {measureList.length > 0 ? (
          <StyledHtmlTable>
            <div style={{ height: measureList.length > 10 && 400, overflow: 'scroll', msOverflowStyle: 'scrollbar' }}>
              <table>
                <colgroup>
                  <col width={100} />
                  <col width={100} />
                  <col width={100} />
                  <col width={100} />
                  <col width={100} />
                  <col width={100} />
                  {gasList && gasList.map(() => <col width={100} />)}
                </colgroup>
                <thead>
                  <tr>
                    <th style={{ position: 'sticky', top: 0 }}>계통</th>
                    <th style={{ position: 'sticky', top: 0 }}>STACK</th>
                    <th style={{ position: 'sticky', top: 0 }}>측정여부(Y/N)</th>
                    <th style={{ position: 'sticky', top: 0 }}>측정일자</th>
                    <th style={{ position: 'sticky', top: 0 }}>분당 배출량</th>
                    <th style={{ position: 'sticky', top: 0 }}>시간당 배출량</th>
                    {gasList && gasList.map(item => <th style={{ position: 'sticky', top: 0 }}>{item.GAS_CD}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {measureList.map(item => (
                    <tr>
                      <td>{item.GUBUN_NAME}</td>
                      <td>{item.STACK_CD}</td>
                      <td>{item.IS_MEASURE}</td>
                      <td>{JSON.parse(item.GAS[0].value).MEASURE_DT}</td>
                      <td>{Number(JSON.parse(item.GAS[0].value).MINUTE_FLOW).toFixed(3)}</td>
                      <td>{Number(JSON.parse(item.GAS[0].value).HOUR_FLOW).toFixed(3)}</td>
                      {selectGubun === 1
                        ? gasList &&
                          gasList.map(gasType => {
                            const idx = item.GAS.findIndex(gasItem => JSON.parse(gasItem.value).GAS_CD === gasType.GAS_CD);
                            if (idx > -1) {
                              return <td>{JSON.parse(item.GAS[idx].value).DENSITY || 0}</td>;
                            }
                            return <td>0</td>;
                          })
                        : gasList &&
                          gasList.map(gasType => {
                            const idx = item.GAS.findIndex(gasItem => JSON.parse(gasItem.value).GAS_CD === gasType.GAS_CD);

                            if (idx > -1) {
                              return (
                                <td>
                                  {this.calculate(
                                    gasType.GAS_CD,
                                    JSON.parse(item.GAS[idx].value).HOUR_FLOW,
                                    JSON.parse(item.GAS[idx].value).DENSITY,
                                    JSON.parse(item.GAS[idx].value).WORK_DAY,
                                    JSON.parse(item.GAS[idx].value).GAS_WEIGHT,
                                  )}
                                </td>
                              );
                            }
                            return <td>0</td>;
                          })}
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={4}>최고농도(MAX)</td>
                    <td>{Math.max.apply(null, minute)}</td>
                    <td>{Math.max.apply(null, hour)}</td>
                    {gasList && gasList.map(item => <td>{(gasDensity && gasDensity[`${item.GAS_CD}_MAX`]) || 0}</td>)}
                  </tr>
                  <tr>
                    <td colSpan={4}>최저농도(MIN)</td>
                    <td>{Math.min.apply(null, minute)}</td>
                    <td>{Math.min.apply(null, hour)}</td>
                    {gasList && gasList.map(item => <td>{(gasDensity && gasDensity[`${item.GAS_CD}_MIN`]) || 0}</td>)}
                  </tr>
                  {refStack ? (
                    <tr>
                      <td colSpan={5}>평균</td>
                      <td>{avg && (avg.HOUR_FLOW / avg.LENGTH).toFixed(3)}</td>
                      {gasList &&
                        gasList.map(item => (
                          <td>{avg && avg[item.GAS_CD] && (avg[item.GAS_CD] !== 0 ? avg[item.GAS_CD] / avg.LENGTH : avg[item.GAS_CD]).toFixed(3)}</td>
                        ))}
                    </tr>
                  ) : (
                    <>
                      <tr>
                        <td colSpan={5}>ACID 평균</td>
                        <td>{acid && (acid.HOUR_FLOW / acid.LENGTH).toFixed(3)}</td>
                        {gasList &&
                          gasList.map(item => (
                            <td>{acid && acid[item.GAS_CD] && (acid[item.GAS_CD] !== 0 ? acid[item.GAS_CD] / acid.LENGTH : acid[item.GAS_CD]).toFixed(3)}</td>
                          ))}
                      </tr>
                      <tr>
                        <td colSpan={5}>TOXIC 평균</td>
                        <td>{toxic && (toxic.HOUR_FLOW / toxic.LENGTH).toFixed(3)}</td>
                        {gasList &&
                          gasList.map(item => (
                            <td>
                              {toxic && toxic[item.GAS_CD] && (toxic[item.GAS_CD] !== 0 ? toxic[item.GAS_CD] / toxic.LENGTH : toxic[item.GAS_CD]).toFixed(3)}
                            </td>
                          ))}
                      </tr>
                      <tr>
                        <td colSpan={5}>VOC 평균</td>
                        <td>{VOC && (VOC.HOUR_FLOW / VOC.LENGTH).toFixed(3)}</td>
                        {gasList &&
                          gasList.map(item => (
                            <td>{VOC && VOC[item.GAS_CD] && (VOC[item.GAS_CD] !== 0 ? VOC[item.GAS_CD] / VOC.LENGTH : VOC[item.GAS_CD]).toFixed(3)}</td>
                          ))}
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </StyledHtmlTable>
        ) : (
          ''
        )}
        <div style={{ overflow: 'auto', msOverflowStyle: 'scrollbar' }}>
          {refStack ? (
            measureList.length > 0 && <LineComp data={lineChartData} gasList={gasList} />
          ) : (
            <Graph graphData={measureList} gasList={gasList} selectGubun={selectGubun} refStack={refStack} />
          )}
        </div>
        {refStack ? (
          <AntdModal width={800} visible={this.state.isModal} title="Stack 정보" onCancel={this.onChangeModal} destroyOnClose footer={[]}>
            <BizBuilderBase
              sagaKey="stackModal"
              workSeq={4401}
              viewType="LIST"
              listMetaSeq={4461}
              customOnRowClick={this.customOnRowClick}
              ViewCustomButtons={() => null}
            />
          </AntdModal>
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
  refStack: PropTypes.bool,
};

List.defaultProps = {};

export default List;
