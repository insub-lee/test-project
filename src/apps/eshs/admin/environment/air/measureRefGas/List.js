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

import Moment from 'moment';
import Graph from './Graph';

const AntdSelect = StyledSelect(Select);
const AntdSearch = StyledSearchInput(Input);
const AntdModal = StyledModalWrapper(Modal);
const AntdTable = StyledAntdTable(Table);

const { Option } = Select;
const { RangePicker } = DatePicker;
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
    const setDate = `START_DATE=${`${rangeDateStrings[0]}-01`}&&END_DATE=${`${rangeDateStrings[1]}-31`}&&GAS_CD=${gasCd}`;
    const apiAry = [
      {
        key: 'measure',
        url: `/api/eshs/v1/common/eshsmeasure?${setDate}`,
        type: 'POST',
      },
    ];
    if (gasCd) {
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

  onRowClick = record => {
    this.setState({ gasCd: record.GAS_CD });
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
    const { measureList, gasList, selectGubun, rangeDateStrings, avg } = this.state;
    return (
      <StyledContentsWrapper>
        <div className="selSaveWrapper alignLeft">
          <span className="textLabel">조회구분</span>
          <AntdSelect className="select-mid" onChange={value => this.onChangeState('selectGubun', value)} value={this.state.selectGubun}>
            <Option value={1} key="selectGubun">
              측정항목
            </Option>
            <Option value={2} key="selectGubun">
              배출총량
            </Option>
          </AntdSelect>
          <div style={{ margin: '0 5px', display: 'inline-block' }}>
            <RangePicker
              defaultValue={[Moment(rangeDateStrings[0], 'YYYY-MM'), Moment(rangeDateStrings[1], 'YYYY-MM')]}
              mode={['month', 'month']}
              format={['YYYY-MM', 'YYYY-MM']}
              onChange={(date, dateStrings) => this.onChangeState('rangeDateStrings', dateStrings)}
            />
          </div>
          <AntdSearch style={{ width: 200 }} className="input-mid ant-input-inline mr5" value={this.state.gasCd} readOnly onClick={this.onChangeModal} />
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-primary btn-first" onClick={() => this.isSearch()}>
              검색
            </StyledButton>
          </StyledButtonWrapper>
        </div>
        {measureList.length > 0 ? (
          <StyledHtmlTable className="tableWrapper">
            <div style={{ overflowX: 'scroll' }}>
              <table>
                <tbody>
                  <tr>
                    <th>계통</th>
                    <th>STACK</th>
                    <th>측정일자</th>
                    {measureList && measureList.map(item => <th>{item.STACK_CD}</th>)}
                  </tr>
                  {measureList.map(item => (
                    <tr>
                      <td>{item.GUBUN_NAME}</td>
                      <td>{item.STACK_CD}</td>
                      <td>{item.MEASURE_DT}</td>
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
        <StyledHtmlTable className="tableWrapper">{/* <Graph graphData={measureList} gasList={gasList} selectGubun={selectGubun} /> */}</StyledHtmlTable>
        <AntdModal width={800} visible={this.state.isModal} title="Stack 정보" onCancel={this.onChangeModal} destroyOnClose footer={[]}>
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
