import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DatePicker, Select, Input, Modal, message } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledModalWrapper from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StackStatus from 'apps/eshs/admin/environment/air/stack/stackStatus';

import Moment from 'moment';
import Graph from './Graph';

const AntdSelect = StyledSelect(Select);
const AntdSearch = StyledSearchInput(Input);
const AntdModal = StyledModalWrapper(Modal);

const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;
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
      refStack
        ? {
            key: 'gasType',
            url: '/api/eshs/v1/common/eshsgastype',
            type: 'GET',
          }
        : {},
    ];
    if (!refStack) {
      this.isSearch();
    }
    getCallDataHandler(id, apiAry, this.initData);
  }

  initData = () => {
    const { result } = this.props;
    const gasList = result && result.gasType && result.gasType.list;
    this.setState({ gasList });
  };

  isSearch = () => {
    const { sagaKey: id, getCallDataHandler, refStack } = this.props;
    const { dateStrings, rangeDateStrings, seq, stackCd } = this.state;
    const setDate = refStack
      ? `START_DATE=${`${rangeDateStrings[0]}-01`}&&END_DATE=${`${rangeDateStrings[1]}-31`}&&STACK_CD=${stackCd}`
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
    const { result } = this.props;
    this.setState({ measureList: result && result.measure && result.measure.list });
  };

  chagneSelect = (value, option) => {
    this.setState({
      [option.key]: value,
    });
  };

  onChangeModal = () => {
    const { isModal } = this.state;
    this.setState({ isModal: !isModal });
  };

  dateChange = dateStrings => {
    this.setState({ dateStrings });
  };

  rangeDateChange = rangeDateStrings => {
    this.setState({ rangeDateStrings });
  };

  customOnRowClick = record => {
    this.setState({ stackCd: record.STACK_CD });
    this.onChangeModal();
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
    const { measureList, gasList, selectGubun, rangeDateStrings } = this.state;
    const { refStack } = this.props;

    return (
      <StyledContentsWrapper>
        <div className="selSaveWrapper alignLeft">
          <span className="textLabel">조회구분</span>
          <AntdSelect className="select-mid" onChange={(value, option) => this.chagneSelect(value, option)} value={this.state.selectGubun}>
            <Option value={1} key="selectGubun">
              측정항목
            </Option>
            <Option value={2} key="selectGubun">
              배출총량
            </Option>
          </AntdSelect>
          <div style={{ margin: '0 5px', display: 'inline-block' }}>
            {refStack ? (
              <RangePicker
                defaultValue={[Moment(rangeDateStrings[0], 'YYYY-MM'), Moment(rangeDateStrings[1], 'YYYY-MM')]}
                mode={['month', 'month']}
                format={['YYYY-MM', 'YYYY-MM']}
                onChange={(date, dateStrings) => this.rangeDateChange(dateStrings)}
              />
            ) : (
              <MonthPicker defaultValue={Moment(Moment(), 'YYYY-MM')} format="YYYY-MM" onChange={(date, dateStrings) => this.dateChange(dateStrings)} />
            )}
          </div>
          <span className="textLabel">측정회차(월)</span>
          <AntdSelect style={{ width: 100 }} className="select-mid mr5" onChange={(value, option) => this.chagneSelect(value, option)} value={this.state.seq}>
            <Option value={1} key="seq">
              1 회차
            </Option>
            <Option value={2} key="seq">
              2 회차
            </Option>
          </AntdSelect>
          {refStack ? (
            <AntdSearch style={{ width: 200 }} className="input-mid ant-input-inline mr5" value={this.state.stackCd} readOnly onClick={this.onChangeModal} />
          ) : (
            ''
          )}
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-primary btn-first" onClick={() => this.isSearch()}>
              검색
            </StyledButton>
          </StyledButtonWrapper>
        </div>
        {measureList ? (
          <StyledHtmlTable className="tableWrapper">
            <div style={{ overflowX: 'scroll' }}>
              <table>
                <tbody>
                  <tr>
                    <th>계통</th>
                    <th>STACK</th>
                    <th>측정여부(Y/N)</th>
                    <th>측정일자</th>
                    <th>분당 배출량</th>
                    <th>시간당 배출량</th>
                    {gasList && gasList.map(item => <th>{item.GAS_CD}</th>)}
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
            </div>
          </StyledHtmlTable>
        ) : (
          ''
        )}
        <StyledHtmlTable className="tableWrapper">
          <Graph graphData={measureList} gasList={gasList} selectGubun={selectGubun} refStack={refStack} />
        </StyledHtmlTable>
        {refStack ? (
          <AntdModal width={800} visible={this.state.isModal} title="Stack 정보" onCancel={this.onChangeModal} destroyOnClose footer={[]}>
            <StackStatus customOnRowClick={this.customOnRowClick} />
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
