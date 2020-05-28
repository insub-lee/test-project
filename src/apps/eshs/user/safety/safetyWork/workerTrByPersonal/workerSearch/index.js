import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Input, Table, Select } from 'antd';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import Styled from './Styled';

const AntdSelect = StyledSelect(Select);
const AntdTable = StyledLineTable(Table);
const AntdInput = StyledInput(Input);
const { Option } = Select;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: {
        year: '',
        searchType: 'cmpny',
        wrkCmpnyNm: '',
        keyword: '',
      },
    };
  }

  componentWillUnmount() {
    const { sagaKey: id, removeReduxState } = this.props;
    removeReduxState(id);
  }

  changeSearchValue = (type, value) => {
    const { searchValue } = this.state;
    if (type === 'year' && searchValue.searchType === 'cmpny') {
      this.setState(
        {
          searchValue: {
            ...searchValue,
            [type]: value,
          },
        },
        () => {
          this.getCmpnyListbyYear(value);
        },
      );
    } else if (type === 'searchType' && value !== 'cmpny' && searchValue.searchType === 'cmpny') {
      this.setState({
        searchValue: {
          ...searchValue,
          [type]: value,
          keyword: '',
        },
      });
    } else {
      this.setState({
        searchValue: {
          ...searchValue,
          [type]: value,
        },
      });
    }
  };

  getCmpnyListbyYear = year => {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = {
      key: 'getCmpnyList',
      type: 'GET',
      url: `/api/eshs/v1/common/EshsCmpnyList?searchType=year&searchText=${year}&gubun=SW`,
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.getCmpnyListAfter);
  };

  getCmpnyListAfter = (id, response) => {
    const { searchValue } = this.state;
    const cmpnyList = (response && response.list) || [];
    let selectCmpnyCd = '';
    let selectCmpnyNm = '';
    if (cmpnyList.length > 0) {
      selectCmpnyCd = cmpnyList[0].WRK_CMPNY_CD;
      selectCmpnyNm = cmpnyList[0].WRK_CMPNY_NM;
    }
    this.setState(
      {
        searchValue: {
          ...searchValue,
          keyword: selectCmpnyCd,
          wrkCmpnyNm: selectCmpnyNm,
        },
      },
      () => {
        if (selectCmpnyCd !== '') this.handleGetWorkers('searchByEdu', selectCmpnyCd);
      },
    );
  };

  handleGetWorkers = (type, keyword) => {
    const { searchValue } = this.state;
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = {
      key: 'getWorkers',
      type: 'GET',
      url: `/api/eshs/v1/common/eshsWorker?type=${type}&searchType=${searchValue.searchType}&keyword=${keyword}&year=${searchValue.year}`,
    };
    getCallDataHandlerReturnRes(id, apiInfo);
  };

  renderYearSelect = () => {
    const { searchValue } = this.state;
    const endYear = Number(moment().format('YYYY'));
    const options = [];
    for (let year = 2006; year <= endYear; year += 1) {
      options.push(year);
    }
    return (
      <AntdSelect className="select-xs mr5" style={{ width: '100px' }} value={searchValue.year} onChange={e => this.changeSearchValue('year', e)}>
        <Option value="">년도</Option>
        {options.map(YYYY => (
          <Option value={`${YYYY}`}>{YYYY}</Option>
        ))}
      </AntdSelect>
    );
  };

  renderCmpnySelect = cmpnyList => {
    if (cmpnyList.length > 0) {
      return cmpnyList.map(cmpny => <Option value={cmpny.WRK_CMPNY_CD}>{cmpny.WRK_CMPNY_NM}</Option>);
    }
    return <Option value="">해당 년도에는 등록된 업체가 없습니다.</Option>;
  };

  onChangeCmpnySelect = wrkCmpnyCd => {
    const { searchValue } = this.state;
    const { result } = this.props;
    const eshsCmpnyList = (result && result.getCmpnyList && result.getCmpnyList.list) || [];
    const selectedCmpnyInfo = eshsCmpnyList.find(cmpny => cmpny.WRK_CMPNY_CD === wrkCmpnyCd);
    this.setState(
      {
        searchValue: {
          ...searchValue,
          wrkCmpnyNm: selectedCmpnyInfo.WRK_CMPNY_NM,
          keyword: selectedCmpnyInfo.WRK_CMPNY_CD,
        },
      },
      () => this.handleGetWorkers(selectedCmpnyInfo.WRK_CMPNY_CD),
    );
  };

  render() {
    const { result, onRow } = this.props;
    const { searchValue } = this.state;
    const eshsCmpnyList = (result && result.getCmpnyList && result.getCmpnyList.list) || [];
    const eshsWorkerList = (result && result.getWorkers && result.getWorkers.workerList) || [];
    const columns = [
      {
        title: '성명',
        dataIndex: 'WORKER_NM',
        width: '20%',
        align: 'center',
      },
      {
        title: '생년월일',
        dataIndex: 'WORKER_SSN',
        width: '20%',
        align: 'center',
        render: value => <span>{value.substr(0, 6)}</span>,
      },
      {
        title: '핸드폰(연락처)',
        dataIndex: 'M_TEL',
        width: '20%',
        align: 'center',
      },
      {
        title: '긴급연락처',
        dataIndex: 'TEL',
        width: '20%',
        align: 'center',
      },
      {
        title: '업체',
        dataIndex: '',
        width: '20%',
        align: 'center',
        render: () => <span>{`${searchValue.wrkCmpnyNm} (${searchValue.year})`}</span>,
      },
    ];

    return (
      <Styled>
        <StyledSearchWrap>
          <div className="search-group-layer">
            <div className="searchCmpnyWrap">
              {this.renderYearSelect()}
              <AntdSelect
                className="select-xs mr5"
                style={{ width: '100px' }}
                value={searchValue.searchType}
                onChange={e => this.changeSearchValue('searchType', e)}
              >
                <Option value="cmpny">업체</Option>
                <Option value="name">성명</Option>
                <Option value="ssn">생년월일</Option>
              </AntdSelect>
              {searchValue.searchType === 'cmpny' ? (
                <AntdSelect
                  className="select-xs mr5"
                  style={{ width: '300px' }}
                  value={searchValue.keyword}
                  onChange={e => this.onChangeCmpnySelect(e)}
                  disabled={eshsCmpnyList.length === 0}
                >
                  {this.renderCmpnySelect(eshsCmpnyList)}
                </AntdSelect>
              ) : (
                <AntdInput
                  className="ant-input-xs ant-input-inline"
                  style={{ width: '300px' }}
                  defaultValue={searchValue.keyword}
                  onChange={e => this.changeSearchValue('keyword', e.target.value)}
                />
              )}
              <StyledButton
                className="btn-primary btn-xs btn-first"
                onClick={() => this.handleGetWorkers('searchByEdu', searchValue.keyword)}
                style={{ marginLeft: '10px' }}
              >
                검색
              </StyledButton>
            </div>
          </div>
        </StyledSearchWrap>
        <AntdTable
          columns={columns}
          pagination={false}
          dataSource={eshsWorkerList}
          onRow={record => ({
            onClick: () => {
              onRow(record);
            },
          })}
          footer={() => <div style={{ textAlign: 'center' }}>{`총 ${eshsWorkerList.length === 0 ? 0 : eshsWorkerList.length} 명`}</div>}
        />
      </Styled>
    );
  }
}
List.propTypes = {
  sagaKey: PropTypes.string,
  result: PropTypes.object,
  getCallDataHandlerReturnRes: PropTypes.func,
  removeReduxState: PropTypes.func,
  onRow: PropTypes.func,
};

export default List;
