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

const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;

const AntdSelect = StyledSelect(Select);
const AntdSearch = StyledSearchInput(Input.Search);
const AntdModal = StyledModalWrapper(Modal);
const AntdMonthPicker = StyledDatePicker(MonthPicker);
const AntdRangePicker = StyledDatePicker(RangePicker);

Moment.locale('ko');

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
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler, refStack } = this.props;
    const apiAry = [
      {
        key: 'gasType',
        url: '/api/eshs/v1/common/eshsgastype',
        type: 'GET',
      },
    ];
    if (!refStack) {
      this.isSearch();
    }
    getCallDataHandler(id, apiAry, this.initData);
  }

  initData = () => {
    const {
      result: { gasType },
    } = this.props;
    this.setState({ gasList: (gasType && gasType.list) || [] });
  };

  isSearch = () => {
    const { sagaKey: id, getCallDataHandler, refStack } = this.props;
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
    const { refStack } = this.props;
    const { measureList, gasList } = this.state;
    const hour = measureList && measureList.map(element => Number(element.HOUR_FLOW).toFixed(3));
    const minute = measureList && measureList.map(element => Number(element.MINUTE_FLOW).toFixed(3));
    const temp = this.densityList();
    const gasDensityList =
      gasList &&
      gasList.map(
        item =>
          temp &&
          temp.reduce(
            (accumulator, currentValue) => ({
              ...accumulator,
              [item.GAS_CD]: accumulator[item.GAS_CD] ? accumulator[item.GAS_CD].concat(currentValue[item.GAS_CD] || []) : [currentValue[item.GAS_CD]] || [],
            }),
            {},
          ),
      );
    if (!refStack) {
      const acid = this.avg('Acid');
      const toxic = this.avg('Toxic');
      const VOC = this.avg('VOC');
      this.setState({ gasDensityList, hour, minute, acid, toxic, VOC });
    } else {
      const avg = this.avg();
      this.setState({ gasDensityList, hour, minute, avg });
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
    const { measureList, gasList, selectGubun, rangeDateStrings, gasDensityList, hour, minute, acid, toxic, VOC, avg } = this.state;
    const { refStack } = this.props;
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
                  this.setState({ isopen: status });
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
            <StyledButton className="btn-primary btn-sm" onClick={() => this.isSearch()}>
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
                          gasList.map(gasType => (
                            <td>
                              {item.GAS.map(gasItem => (gasType.GAS_CD === JSON.parse(gasItem.value).GAS_CD ? JSON.parse(gasItem.value).DENSITY : undefined))}
                            </td>
                          ))
                        : gasList &&
                          gasList.map(gasType => (
                            <td>
                              {item.GAS.map(gasItem =>
                                gasType.GAS_CD === JSON.parse(gasItem.value).GAS_CD
                                  ? this.calculate(
                                      gasType.GAS_CD,
                                      JSON.parse(gasItem.value).HOUR_FLOW,
                                      JSON.parse(gasItem.value).DENSITY,
                                      JSON.parse(gasItem.value).WORK_DAY,
                                      JSON.parse(gasItem.value).GAS_WEIGHT,
                                    )
                                  : undefined,
                              )}
                            </td>
                          ))}
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={4}>최고농도(MAX)</td>
                    <td>{Math.max.apply(null, minute)}</td>
                    <td>{Math.max.apply(null, hour)}</td>
                    {gasList &&
                      gasList.map(item => (
                        <td>
                          {gasDensityList &&
                            gasDensityList.map(
                              density =>
                                density[item.GAS_CD] &&
                                density[item.GAS_CD].reduce((previous, current) => (Number(previous) > Number(current) ? previous : current)),
                            )}
                        </td>
                      ))}
                  </tr>
                  <tr>
                    <td colSpan={4}>최저농도(MIN)</td>
                    <td>{Math.min.apply(null, minute)}</td>
                    <td>{Math.min.apply(null, hour)}</td>
                    {gasList &&
                      gasList.map(item => (
                        <td>
                          {gasDensityList &&
                            gasDensityList.map(
                              density =>
                                density[item.GAS_CD] &&
                                density[item.GAS_CD].reduce((previous, current) => (Number(previous) > Number(current) ? current : previous)),
                            )}
                        </td>
                      ))}
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
                        <td colSpan={5}>VOCs 평균</td>
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
        <StyledHtmlTable>
          <Graph graphData={measureList} gasList={gasList} selectGubun={selectGubun} refStack={refStack} />
        </StyledHtmlTable>
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
