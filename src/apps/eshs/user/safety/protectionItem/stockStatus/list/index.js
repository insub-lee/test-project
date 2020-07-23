import React from 'react';
import { Table, Select } from 'antd';
import PropTypes from 'prop-types';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import moment from 'moment';
import { debounce } from 'lodash';
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';

const AntdTable = StyledAntdTable(Table);
const AntdSelect = StyledSelect(Select);

const excelColumns = [
  {
    title: '품목',
    width: 150,
    field: 'KIND',
  },
  {
    title: '모델',
    width: 150,
    field: 'MODEL',
  },
  {
    title: 'Size',
    width: 100,
    field: 'SIZE1',
  },
  {
    title: '검정#',
    width: 120,
    field: 'APP_NO',
  },
  {
    title: 'Vendor',
    width: 100,
    field: 'VENDOR_NM',
  },
  {
    title: '단가',
    width: 100,
  },
  {
    title: '전월재고',
    width: 100,
    field: 'LAST_MONTH_QTY',
  },
  {
    title: '금액',
    width: 100,
    field: 'LAST_MONTH_AMT',
  },
  {
    title: '월지급',
    width: 100,
    field: 'RELEASE_QTY',
  },
  {
    title: '금액',
    width: 100,
    field: 'RELEASE_AMT',
  },
  {
    title: '구매',
    width: 100,
    field: 'ENTRY_QTY',
  },
  {
    title: '금액',
    width: 100,
    field: 'ENTRY_AMT',
  },
  {
    title: '현재고',
    width: 100,
    field: 'STOCK_QTY',
  },
  {
    title: '금액',
    width: 100,
    field: 'STOCK_AMT',
  },
];
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      searchValue: {
        site: '317',
        year: moment().format('YYYY'),
        month: moment().format('M'),
        type: 'kind',
        deptId: '',
        hqId: '',
      },
      headquarterList: [],
      departmentList: [],
      isHeadquarterSelect: false,
    };
    this.getSearchData = debounce(this.getSearchData, 500);
  }

  columns = () => {
    const { searchValue } = this.state;
    return [
      {
        title: '품목',
        dataIndex: 'KIND',
        key: 'KIND',
        align: 'center',
      },
      {
        title: '모델',
        dataIndex: 'MODEL',
        key: 'MODEL',
        align: 'center',
      },
      {
        title: 'SIZE',
        dataIndex: 'SIZE1',
        key: 'SIZE1',
        align: 'center',
      },
      {
        title: '검정#',
        dataIndex: 'APP_NO',
        key: 'APP_NO',
        align: 'center',
      },
      {
        title: 'VENDOR',
        dataIndex: 'VENDOR_NM',
        key: 'VENDOR_NM',
        align: 'center',
      },
      {
        title: '단가',
        dataIndex: searchValue.type.toUpperCase() === 'KIND' ? 'KIND_UNITPRICE' : 'STOCK_UNITPRICE',
        key: searchValue.type.toUpperCase() === 'KIND' ? 'KIND_UNITPRICE' : 'STOCK_UNITPRICE',
        width: '85px',
        align: 'center',
      },
      {
        title: '전월재고',
        align: 'center',

        children: [
          {
            title: '수량',
            dataIndex: 'LAST_MONTH_QTY',
            key: 'LAST_MONTH_QTY',
            align: 'center',
          },
          {
            title: '금액',
            dataIndex: 'LAST_MONTH_AMT',
            key: 'LAST_MONTH_AMT',
            align: 'center',
          },
        ],
      },
      {
        title: '지급',
        align: 'center',

        children: [
          {
            title: '수량',
            dataIndex: 'RELEASE_QTY',
            key: 'RELEASE_QTY',
            align: 'center',
          },
          {
            title: '금액',
            dataIndex: 'RELEASE_AMT',
            key: 'RELEASE_AMT',
            align: 'center',
          },
        ],
      },
      {
        title: '구매',
        align: 'center',

        children: [
          {
            title: '수량',
            dataIndex: 'ENTRY_QTY',
            key: 'ENTRY_QTY',
            align: 'center',
          },
          {
            title: '금액',
            dataIndex: 'ENTRY_AMT',
            key: 'ENTRY_AMT',
            align: 'center',
          },
        ],
      },
      {
        title: '현재고',
        align: 'center',

        children: [
          {
            title: '수량',
            dataIndex: 'STOCK_QTY',
            key: 'STOCK_QTY',
            align: 'center',
          },
          {
            title: '금액',
            dataIndex: 'STOCK_AMT',
            key: 'STOCK_AMT',
            align: 'center',
          },
        ],
      },
    ];
  };

  componentDidMount() {
    this.getListData();
    this.getDepartmentList();
  }

  getListData = () => {
    const { setListData } = this;
    const { searchValue } = this.state;
    const { sagaKey: id, getExtraApiData } = this.props;
    const apiArr = [
      {
        key: 'getListData',
        url: `/api/eshs/v1/common/protectionstock?SITE=${searchValue.site}&YEAR=${searchValue.year}&MONTH=${searchValue.month}&HQ_ID=${searchValue.hqId}&DEPT_ID=${searchValue.deptId}`,
        type: 'GET',
      },
    ];

    getExtraApiData(id, apiArr, setListData);
  };

  setListData = () => {
    const { extraApiData } = this.props;
    this.setState({ dataSource: extraApiData.getListData && extraApiData.getListData.list });
  };

  getDepartmentList = () => {
    const { setDeraptmentList } = this;
    const { sagaKey: id, getExtraApiData } = this.props;
    const headquarterId = 72761;
    const apiArr = [
      {
        key: 'deptList',
        url: `/api/eshs/v1/common/EshsHqAndDeptList?DEPT_ID=${headquarterId}`,
        type: 'GET',
      },
    ];

    getExtraApiData(id, apiArr, () => setDeraptmentList(headquarterId));
  };

  setDeraptmentList = headquarterId => {
    const { extraApiData } = this.props;
    this.setState({
      headquarterList: (extraApiData.deptList && extraApiData.deptList.dept && extraApiData.deptList.dept.filter(dept => dept.PRNT_ID === headquarterId)) || [],
    });
  };

  handleHqChange = headquarterId => {
    const { sagaKey: id, getExtraApiData } = this.props;

    if (!headquarterId) {
      return this.setState(prevState => ({
        isHeadquarterSelect: false,
        searchValue: Object.assign(prevState.searchValue, { deptId: '' }, { hqId: headquarterId }),
      }));
    }

    this.setState({ isHeadquarterSelect: true });
    const apiArr = [
      {
        key: 'deptListUnderHq',
        type: 'GET',
        url: `/api/eshs/v1/common/EshsHqAndDeptList?DEPT_ID=${headquarterId}`,
      },
    ];

    const selectHqCallback = () => {
      this.setDeptList();
    };

    return getExtraApiData(id, apiArr, selectHqCallback);
  };

  setDeptList = () => {
    const { extraApiData } = this.props;
    this.setState(prevState => ({
      departmentList: (extraApiData.deptListUnderHq && extraApiData.deptListUnderHq.dept) || [],
      searchValue: Object.assign(prevState.searchValue, { deptId: '' }),
    }));
  };

  handleSearchChange = (key, value) => {
    this.setState(prevState => ({
      searchValue: Object.assign(prevState.searchValue, { [key]: value }),
    }));
  };

  getSearchData = () => {
    this.getListData();
  };

  createYearList = () => {
    const currentYear = moment().year();
    const yearList = [];
    for (let i = 2003; i <= Number(currentYear); i += 1) {
      yearList.push(i.toString());
    }
    return yearList;
  };

  monthList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  yearList = this.createYearList();

  render() {
    const { handleSearchChange, monthList, yearList, columns, handleHqChange } = this;
    const { dataSource, searchValue, headquarterList, departmentList, isHeadquarterSelect } = this.state;
    const isSelectTeam = searchValue.type.toUpperCase() === 'TEAM';
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper className="search-wrapper-inline">
            <div className="search-input-area mb10">
              <AntdSelect
                defaultValue={searchValue.site}
                className="select-sm mr5"
                onChange={value => handleSearchChange('site', value)}
                style={{ width: 100 }}
              >
                <Select.Option value="317">청주</Select.Option>
                <Select.Option value="318">구미</Select.Option>
              </AntdSelect>
              <AntdSelect
                defaultValue={searchValue.year}
                className="select-sm mr5"
                onChange={value => handleSearchChange('year', value)}
                style={{ width: 100 }}
              >
                {yearList.map(year => (
                  <Select.Option value={year}>{year}년</Select.Option>
                ))}
              </AntdSelect>
              <AntdSelect
                defaultValue={searchValue.month}
                className="select-sm mr5"
                onChange={value => handleSearchChange('month', value)}
                style={{ width: 100 }}
              >
                {monthList.map(month => (
                  <Select.Option value={month}>{month}월</Select.Option>
                ))}
              </AntdSelect>
              <AntdSelect
                defaultValue={searchValue.type}
                className="select-sm mr5"
                onChange={value => handleSearchChange('type', value)}
                style={{ width: 100 }}
              >
                <Select.Option value="kind">품목별</Select.Option>
                <Select.Option value="unitprice">단가별</Select.Option>
                <Select.Option value="team">팀선택</Select.Option>
              </AntdSelect>

              {isSelectTeam ? (
                <>
                  <AntdSelect defaultValue="" className="select-sm mr5" onChange={handleHqChange} style={{ width: 150 }}>
                    <Select.Option value="">본부 전체</Select.Option>
                    {headquarterList.map(headquarter => (
                      <Select.Option value={headquarter.DEPT_ID}>{headquarter.NAME_KOR}</Select.Option>
                    ))}
                  </AntdSelect>
                  <AntdSelect
                    disabled={!isHeadquarterSelect}
                    defaultValue=""
                    value={searchValue.deptId}
                    className="select-sm"
                    onChange={value => handleSearchChange('deptId', value)}
                    style={{ width: 250 }}
                  >
                    {departmentList.map(department => (
                      <Select.Option value={department.DEPT_ID}>{department.NAME_KOR}</Select.Option>
                    ))}
                  </AntdSelect>
                </>
              ) : null}
            </div>
            <div className="btn-area">
              <StyledButton className="btn-gray btn-sm mr5" onClick={this.getSearchData}>
                검색
              </StyledButton>
              <ExcelDownloadComp
                isBuilder={false}
                fileName={`ESH_StockList${moment().format('YYYYMMDD')}`}
                sheetName={`ESH_StockList${moment().format('YYYYMMDD')}`}
                className="testClassName"
                btnText="엑셀 다운로드"
                listData={dataSource}
                btnSize="btn-sm"
                fields={excelColumns.map(item => ({
                  ...item,
                  style: {
                    font: { sz: '12' },
                    alignment: { vertical: 'center', horizontal: 'center', wrapText: true },
                  },
                  field: item.title === '단가' ? (searchValue.type.toUpperCase() === 'KIND' ? 'KIND_UNITPRICE' : 'STOCK_UNITPRICE') : item.field,
                }))}
                columns={excelColumns.map(item => ({
                  ...item,
                  filter: 'agTextColumnFilter',
                  width: { wpx: item.width },
                  style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '', bold: true }, alignment: { vertical: 'center', horizontal: 'center' } },
                  field: item.title === '단가' ? (searchValue.type.toUpperCase() === 'KIND' ? 'KIND_UNITPRICE' : 'STOCK_UNITPRICE') : item.field,
                }))}
              />
            </div>
          </StyledCustomSearchWrapper>
          <div style={{ padding: '10px' }}>
            <AntdTable
              columns={columns()}
              dataSource={dataSource}
              pagination={false}
              footer={() => <span>{`${(dataSource && dataSource.length) || 0} 건`}</span>}
            />
          </div>
        </StyledContentsWrapper>
      </>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getExtraApiData: PropTypes.func,
  extraApiData: PropTypes.object,
};

List.defaultProps = {};

export default List;
