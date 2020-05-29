import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DatePicker, Select, Input, Modal, message, Table } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledModalWrapper from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';

import Moment from 'moment';
import Graph from './Graph';

const { Option } = Select;
const { RangePicker } = DatePicker;

const AntdSelect = StyledSelect(Select);
const AntdSearch = StyledSearchInput(Input.Search);
const AntdModal = StyledModalWrapper(Modal);
const AntdTable = StyledAntdTable(Table);
const AntdRangePicker = StyledDatePicker(RangePicker);

Moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measureList: [],
      rangeDateStrings: [Moment(Moment().subtract(1, 'years')).format('YYYY-MM'), Moment().format('YYYY-MM')],
      selectGubun: 1,
      isModal: false,
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
    getCallDataHandler(id, apiAry, this.initData);
  }

  initData = () => {
    const {
      result: { gasType },
    } = this.props;
    this.setState({ gasList: (gasType && gasType.list) || [] });
  };

  isSearch = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
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
      getCallDataHandler(id, apiAry, this.listData);
    } else {
      message.warning('GAS 종류를 먼저 선택해주세요.');
    }
  };

  listData = () => {
    const {
      result: { measure },
    } = this.props;
    this.setState({ measureList: (measure && measure.list) || [], stackList: (measure && measure.stackList) || [] }, this.dataSet);
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
    const { measureList, stackList, gasList, selectGubun, rangeDateStrings, gasWeight, gasCd } = this.state;
    return (
      <StyledContentsWrapper>
        <div className="selSaveWrapper alignLeft">
          <span className="textLabel">조회구분</span>
          <AntdSelect className="select-mid mr5" onChange={value => this.onChangeState('selectGubun', value)} value={this.state.selectGubun}>
            <Option value={1} key="selectGubun">
              측정항목
            </Option>
            <Option value={2} key="selectGubun">
              배출총량
            </Option>
          </AntdSelect>
          <AntdRangePicker
            className="ant-picker-mid mr5"
            value={[Moment(rangeDateStrings[0], 'YYYY-MM'), Moment(rangeDateStrings[1], 'YYYY-MM')]}
            open={this.state.isopen}
            mode={['month', 'month']}
            format={['YYYY-MM', 'YYYY-MM']}
            disabledDate={current => current && current < Moment().endOf('month')}
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
          <AntdSearch
            style={{ width: 200 }}
            className="input-search-mid ant-search-inline mr5"
            value={this.state.gasCd}
            readOnly
            onClick={this.onChangeModal}
          />
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-primary btn-sm" onClick={() => this.isSearch()}>
              검색
            </StyledButton>
          </StyledButtonWrapper>
        </div>
        {measureList.length > 0 ? (
          <StyledHtmlTable className="tableWrapper">
            <div style={{ overflowX: 'scroll' }}>
              <table>
                <colgroup>
                  <col width="150px" />
                  {stackList.map(() => (
                    <col width="100px" />
                  ))}
                </colgroup>
                <tbody>
                  <tr>
                    <td style={{ textAlign: 'center' }}>구분</td>
                    <td colSpan={stackList.length} style={{ textAlign: 'center' }}>
                      {this.state.gasCd}
                    </td>
                  </tr>
                  <tr>
                    <th>회차</th>
                    {stackList.map(item => (
                      <th>{item.STACK_CD}</th>
                    ))}
                  </tr>
                  {measureList.map(item => (
                    <tr>
                      <td>{`${item.MEASURE_DT} / ${item.SEQ}차`}</td>
                      {selectGubun === 1
                        ? item.DENSITY.map(gasItem => (
                            <td>
                              {stackList.map(stackItem => (stackItem.STACK_CD === JSON.parse(gasItem.value).stack_cd ? JSON.parse(gasItem.value).density : ''))}
                            </td>
                          ))
                        : item.DENSITY.map(gasItem => (
                            <td>
                              {stackList.map(stackItem =>
                                stackItem.STACK_CD === JSON.parse(gasItem.value).stack_cd
                                  ? this.calculate(
                                      gasCd,
                                      JSON.parse(gasItem.value).hour_flow,
                                      JSON.parse(gasItem.value).density,
                                      JSON.parse(gasItem.value).work_day,
                                      gasWeight,
                                    )
                                  : '',
                              )}
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
        <StyledHtmlTable className="tableWrapper">
          {measureList.length > 0 ? <Graph graphData={measureList} stackList={stackList} selectGubun={selectGubun} gasCd={gasCd} gasWeight={gasWeight} /> : ''}
        </StyledHtmlTable>
        <AntdModal width={800} visible={this.state.isModal} title="Gas 정보" onCancel={this.onChangeModal} destroyOnClose footer={[]}>
          <AntdTable
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
};

List.defaultProps = {};

export default List;
