import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Modal, DatePicker } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';

import AcpEmpComp from 'apps/eshs/admin/safety/safetyImprove/comp/AcpEmpComp';
import EachTypePieChartComp from 'apps/eshs/admin/safety/safetyImprove/comp/EachTypePieChartComp';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import moment from 'moment';

const toDay = moment(new Date()).format('YYYY-MM-DD');

const AntdSearchInput = StyledSearchInput(Input.Search);
const AntdModal = StyledAntdModal(Modal);
const AntdRangeDatePicker = StyledDatePicker(DatePicker.RangePicker);

const tableRow = [
  { text: '구분', dataIndex: 'NAME' },
  { text: '발생 건수', dataIndex: 'OCNT' },
  { text: '조치 건수', dataIndex: 'PCNT' },
  { text: '조치율', dataIndex: 'PERCENTS' },
];

const pieChartDatas = [
  { text: '유형별 발생 건수', dataIndex: 'OCNT', render: (text, record) => ({ ...record, value: text }), labelRender: undefined },
  { text: '유형별 조치 건수', dataIndex: 'PCNT', render: (text, record) => ({ ...record, value: text }), labelRender: undefined },
  {
    text: '유형별 조치율',
    dataIndex: 'PERCENTS',
    render: (text, record) => ({ ...record, value: Math.round(text * 100) }),
    // labelRender: value => `${Math.round(value * 100)}%`,
    labelRender: undefined,
  },
];

const getColor = text => {
  switch (text) {
    case '전기':
      return '#F8360C';
    case '장비':
      return '#02B9E8';
    case '안전':
      return '#C606FB';
    case '기타':
      return '#DAC105';
    case 'U/T':
      return '#1229B8';
    case 'GAS':
      return '#0AF04B';
    case 'CHE':
      return '#D4CFA6';
    case '5S':
      return '#05F9E9';
    default:
      return '#F605F9';
  }
};

class EachTypeStatusComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParam: {
        REQ_FROM: `${toDay.substring(0, 4)}-01-01`,
        REQ_TO: toDay,
        ACP_DEPT: undefined,
        ACP_DEPT_NM: undefined,
      },
      selectData: {
        REQ_FROM: `${toDay.substring(0, 4)}-01-01`,
        REQ_TO: toDay,
        ACP_DEPT: undefined,
        ACP_DEPT_NM: '모든 팀',
      },
      modalObj: {
        title: '',
        visible: false,
        content: [],
      },
      list: [],
      statusRow: [],
    };
  }

  componentDidMount = () => this.search();

  search = () => {
    const { searchParam } = this.state;
    const { sagaKey: id, getCallDataHandler, spinningOn, spinningOff } = this.props;

    spinningOn();
    const apiAry = [
      {
        key: 'data',
        type: 'POST',
        url: '/api/eshs/v1/common/eshsSafetyImproveEachTypeStatus',
        params: { PARAM: searchParam },
      },
    ];

    getCallDataHandler(id, apiAry, this.searchAfter);
  };

  searchAfter = () => {
    const { result, spinningOff } = this.props;
    const selectData = (result && result.data && result.data.PARAM) || {};
    const list = (result && result.data && result.data.list) || [];

    const statusRow = [];

    tableRow.forEach((row, rowIndex) => {
      const cols = [];
      let total = 0;
      cols.push(<th key={`${rowIndex}_TEXT`}>{row.text}</th>);
      list.forEach((col, colIndex) => {
        if (!rowIndex) cols.push(<th key={`${rowIndex}_${colIndex}`}>{col[row.dataIndex]}</th>);
        else if (row.dataIndex === 'PERCENTS') cols.push(<td key={`${rowIndex}_${colIndex}`}>{`${Math.round(col[row.dataIndex] * 100)}%`}</td>);
        else cols.push(<td key={`${rowIndex}_${colIndex}`}>{col[row.dataIndex]}</td>);
        total += col[row.dataIndex];
      });

      // total Column push
      if (!rowIndex) cols.push(<th key={`${rowIndex}_TOTAL`}>TOTAL</th>);
      else if (row.dataIndex === 'PERCENTS') cols.push(<td key={`${rowIndex}_TOTAL`}>{`${Math.round((total / list.length) * 100)}%`}</td>);
      else cols.push(<td key={`${rowIndex}_TOTAL`}>{total}</td>);

      statusRow.push(
        <tr key={rowIndex} style={{ textAlign: 'center' }}>
          {cols}
        </tr>,
      );
    });

    return this.setState(
      {
        selectData: { ...selectData, ACP_DEPT_NM: selectData.ACP_DEPT ? selectData.ACP_DEPT_NM : '모든 팀' },
        statusRow,
        list: list.map(item => ({ ...item, color: getColor(item.NAME) })),
      },
      spinningOff,
    );
  };

  changeModalObj = (title = '', visible = false, content = []) => this.setState({ modalObj: { title, visible, content } });

  onChangeRangeDatePicker = (target, arrDate) =>
    this.setState(prevState => ({ searchParam: { ...prevState.searchParam, [`${target}_FROM`]: arrDate[0], [`${target}_TO`]: arrDate[1] } }));

  showMessage = text => {
    this.props.spinningOff();
    return message.info(<MessageContent>{text}</MessageContent>);
  };

  render() {
    const { searchParam, selectData, modalObj, statusRow, list } = this.state;
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper className="search-wrapper-inline">
            <div className="search-input-area">
              <span className="text-label">발행 기간</span>
              <AntdRangeDatePicker
                className="ant-picker-sm mr5"
                defaultValue={[moment(searchParam.REQ_FROM), moment(searchParam.REQ_TO)]}
                format="YYYY-MM-DD"
                style={{ width: '200' }}
                allowClear={false}
                onChange={(val1, val2) => this.onChangeRangeDatePicker('REQ', val2)}
              />
              <AntdSearchInput
                style={{ width: '200px' }}
                className="input-search-sm mr5"
                value={searchParam.ACP_DEPT ? searchParam.ACP_DEPT : undefined}
                placeholder="부서 선택"
                onSearch={() =>
                  this.changeModalObj('안전 관계자', true, [
                    <AcpEmpComp
                      key="dangerHazard"
                      onClickRow={data =>
                        this.setState(
                          prevState => ({
                            searchParam: { ...prevState.searchParam, ACP_DEPT: data.DEPT_CD, ACP_DEPT_NM: data.DEPT_NAME },
                          }),
                          this.changeModalObj,
                        )
                      }
                    />,
                  ])
                }
                onChange={e => {
                  const { value } = e.target;
                  return this.setState(prevState => ({ searchParam: { ...prevState.searchParam, ACP_DEPT: value, ACP_DEPT_NM: '' } }));
                }}
              />
              <span className="text-label mr5">{searchParam.ACP_DEPT_NM || undefined}</span>
            </div>

            <div className="btn-area">
              <StyledButton className="btn-gray btn-sm mr5" onClick={this.search}>
                검색
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>

          <StyledHtmlTable>
            <table className="table-border">
              <colgroup>
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
              </colgroup>
              <thead>
                <tr>
                  <th colSpan={10}>유형별 현황</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>기간</th>
                  <td colSpan={9} align="left">
                    {selectData.REQ_TO
                      ? `${moment(selectData.REQ_FROM).format('YYYY년 MM월 DD일')} ~ ${moment(selectData.REQ_TO).format('YYYY년 MM월 DD일')}`
                      : ''}
                  </td>
                </tr>
                <tr>
                  <th>조치부서</th>
                  <td colSpan={9} align="left">
                    {selectData.ACP_DEPT_NM || ''}
                  </td>
                </tr>
                {statusRow}
                <tr>
                  <th>구분</th>
                  <td colSpan={9} align="center">
                    {list.map(item => (
                      <>
                        <div
                          style={{
                            backgroundColor: item.color,
                            display: 'inline-block',
                            width: '30px',
                            height: '18px',
                            marginRight: '5px',
                            verticalAlign: 'middle',
                          }}
                        ></div>
                        <b style={{ verticalAlign: 'middle', marginRight: '10px' }}>{item.NAME || ''}</b>
                      </>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td colSpan={10}>
                    <div style={{ width: '100%' }}>
                      {pieChartDatas.map(pieChart => (
                        <div
                          key={`${pieChart.dataIndex}_PIECHART`}
                          style={{ height: '400px', width: '33%', display: 'inline-block', border: '1px solid #e8e8e8', textAlign: 'center', margin: '0 auto' }}
                        >
                          <p style={{ fontSize: '18px', fontWeight: '500', marginTop: '10px' }}>{pieChart.text}</p>
                          <EachTypePieChartComp data={list.map(item => pieChart.render(item[pieChart.dataIndex], item))} labelRender={pieChart.labelRender} />
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
        </StyledContentsWrapper>
        <AntdModal
          title={modalObj.title || ''}
          visible={modalObj.visible}
          width={1100}
          onCancel={() => this.changeModalObj()}
          footer={
            <StyledButton className="btn-gray btn-sm mr5 ml5" onClick={() => this.changeModalObj()}>
              닫기
            </StyledButton>
          }
          destroyOnClose
        >
          {modalObj.content}
        </AntdModal>
      </>
    );
  }
}

EachTypeStatusComp.propTypes = {
  result: PropTypes.object,
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  removeReduxState: PropTypes.func,
  profile: PropTypes.object,
  submitHandlerBySaga: PropTypes.func,
  isAdmin: PropTypes.bool,
};
EachTypeStatusComp.defaultProps = {
  result: {},
  getCallDataHandler: () => {},
  spinningOn: () => {},
  spinningOff: () => {},
  removeReduxState: () => {},
  profile: {},
  submitHandlerBySaga: () => {},
};

export default EachTypeStatusComp;
