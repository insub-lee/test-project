import React from 'react';
import { Table, Select } from 'antd';
import PropTypes from 'prop-types';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import moment from 'moment';
import { debounce } from 'lodash';

const AntdTable = StyledLineTable(Table);
const AntdSelect = StyledSelect(Select);
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
      },
      {
        title: '모델',
        dataIndex: 'MODEL',
        key: 'MODEL',
      },
      {
        title: 'SIZE',
        dataIndex: 'SIZE1',
        key: 'SIZE1',
      },
      {
        title: '검정#',
        dataIndex: 'APP_NO',
        key: 'APP_NO',
      },
      {
        title: 'VENDOR',
        dataIndex: 'VENDOR_NM',
        key: 'VENDOR_NM',
      },
      {
        title: '단가',
        dataIndex: searchValue.type.toUpperCase() === 'KIND' ? 'KIND_UNITPRICE' : 'STOCK_UNITPRICE',
        key: searchValue.type.toUpperCase() === 'KIND' ? 'KIND_UNITPRICE' : 'STOCK_UNITPRICE',
        width: '85px',
      },
      {
        title: '전월재고',
        children: [
          {
            title: '수량',
            dataIndex: 'LAST_MONTH_QTY',
            key: 'LAST_MONTH_QTY',
          },
          {
            title: '금액',
            dataIndex: 'LAST_MONTH_AMT',
            key: 'LAST_MONTH_AMT',
          },
        ],
      },
      {
        title: '지급',
        children: [
          {
            title: '수량',
            dataIndex: 'RELEASE_QTY',
            key: 'RELEASE_QTY',
          },
          {
            title: '금액',
            dataIndex: 'RELEASE_AMT',
            key: 'RELEASE_AMT',
          },
        ],
      },
      {
        title: '구매',
        children: [
          {
            title: '수량',
            dataIndex: 'ENTRY_QTY',
            key: 'ENTRY_QTY',
          },
          {
            title: '금액',
            dataIndex: 'ENTRY_AMT',
            key: 'ENTRY_AMT',
          },
        ],
      },
      {
        title: '현재고',
        children: [
          {
            title: '수량',
            dataIndex: 'STOCK_QTY',
            key: 'STOCK_QTY',
          },
          {
            title: '금액',
            dataIndex: 'STOCK_AMT',
            key: 'STOCK_AMT',
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
        url: `/api/eshs/v1/common/protectionstock?SITE=${searchValue.site}&YEAR=${searchValue.year}&MONTH=${searchValue.month}&DEPT_ID=${searchValue.deptId}`,
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
    this.setState({ isHeadquarterSelect: true });
    const apiArr = [
      {
        key: 'deptListUnderHq',
        type: 'GET',
        url: `/api/eshs/v1/common/EshsHqAndDeptList?DEPT_ID=${headquarterId}`,
      },
    ];
    getExtraApiData(id, apiArr, this.setDeptList);
  };

  setDeptList = () => {
    const { extraApiData } = this.props;
    this.setState({
      departmentList: (extraApiData.deptListUnderHq && extraApiData.deptListUnderHq.dept) || [],
    });
  };

  handleSearchChange = (key, value) => {
    const { getSearchData } = this;
    this.setState(
      prevState => ({
        searchValue: Object.assign(prevState.searchValue, { [key]: value }),
      }),
      getSearchData,
    );
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
          <StyledCustomSearchWrapper>
            <div style={{ display: 'inline-block', marginBottom: '10px', width: '40%' }}>
              <AntdSelect
                defaultValue={searchValue.site}
                className="select-mid mr5"
                onChange={value => handleSearchChange('site', value)}
                style={{ width: '20%' }}
              >
                <Select.Option value="317">청주</Select.Option>
                <Select.Option value="318">구미</Select.Option>
              </AntdSelect>
              <AntdSelect
                defaultValue={searchValue.year}
                className="select-mid mr5"
                onChange={value => handleSearchChange('year', value)}
                style={{ width: '20%' }}
              >
                {yearList.map(year => (
                  <Select.Option value={year}>{year}년</Select.Option>
                ))}
              </AntdSelect>
              <AntdSelect
                defaultValue={searchValue.month}
                className="select-mid mr5"
                onChange={value => handleSearchChange('month', value)}
                style={{ width: '20%' }}
              >
                {monthList.map(month => (
                  <Select.Option value={month}>{month}월</Select.Option>
                ))}
              </AntdSelect>
              <AntdSelect
                defaultValue={searchValue.type}
                className="select-mid mr5"
                onChange={value => handleSearchChange('type', value)}
                style={{ width: '20%' }}
              >
                <Select.Option value="kind">품목별</Select.Option>
                <Select.Option value="unitprice">단가별</Select.Option>
                <Select.Option value="team">팀선택</Select.Option>
              </AntdSelect>
            </div>
            <div>
              {isSelectTeam ? (
                <div style={{ width: '40%', marginBottom: '10px' }}>
                  <AntdSelect defaultValue="" className="select-mid mr5" onChange={handleHqChange} style={{ width: '35%' }}>
                    <Select.Option value="">본부 전체</Select.Option>
                    {headquarterList.map(headquarter => (
                      <Select.Option value={headquarter.DEPT_ID}>{headquarter.NAME_KOR}</Select.Option>
                    ))}
                  </AntdSelect>
                  <AntdSelect
                    disabled={!isHeadquarterSelect}
                    defaultValue=""
                    className="select-mid"
                    onChange={value => handleSearchChange('deptId', value)}
                    style={{ width: '60%' }}
                  >
                    {departmentList.map(department => (
                      <Select.Option value={department.DEPT_ID}>{department.NAME_KOR}</Select.Option>
                    ))}
                  </AntdSelect>
                </div>
              ) : null}
              <StyledButton className="btn-primary" onClick={() => console.debug('@@@@@EXCEL DOWNLOAD@@@@@')}>
                엑셀받기
              </StyledButton>
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
