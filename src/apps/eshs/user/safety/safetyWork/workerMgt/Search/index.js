import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Input, Table, Select } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import Styled from './Styled';

const AntdSelect = StyledSelect(Select);
const AntdTable = StyledAntdTable(Table);
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
      cmpnyList: [],
      selectedRowKeys: [],
      selectedWorkers: [],
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = {
      key: 'getCmpnyList',
      type: 'GET',
      url: `/api/eshs/v1/common/EshsCmpnyList?gubun=SW`,
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.getCmpnyListAfter);
  }

  componentWillUnmount() {
    const { sagaKey: id, removeReduxState } = this.props;
    removeReduxState(id);
  }

  changeSearchValue = (type, value) => {
    const { searchValue } = this.state;
    this.setState({
      searchValue: {
        ...searchValue,
        [type]: value,
      },
    });
  };

  getCmpnyListAfter = (id, response) => {
    this.setState({
      cmpnyList: (response && response.list) || [],
    });
  };

  handleGetWorkers = (type, value) => {
    const { searchValue, cmpnyList } = this.state;
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const { searchType, year } = searchValue;
    let keyword = value;
    if (searchType === 'cmpny') {
      const regex = new RegExp(`${value}`, 'gi');
      const selectedCmpny = cmpnyList.find(item => regex.test(item.WRK_CMPNY_NM));
      keyword = selectedCmpny?.WRK_CMPNY_CD;
    }
    const apiInfo = {
      key: 'getWorkers',
      type: 'GET',
      url: `/api/eshs/v1/common/eshsWorker?type=${type}&searchType=${searchType}&keyword=${keyword}&year=${year}`,
    };
    getCallDataHandlerReturnRes(id, apiInfo);
  };

  onChangeRowSelection = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys,
      selectedWorkers: selectedRows,
    });
  };

  renderYearSelect = () => {
    const { searchValue } = this.state;
    const endYear = Number(moment().format('YYYY'));
    const options = [];
    for (let year = 2006; year <= endYear; year += 1) {
      options.push(year);
    }
    return (
      <AntdSelect
        className="select-mid mr5"
        style={{ width: '100px' }}
        value={searchValue.year}
        onChange={e => this.changeSearchValue('year', e)}
      >
        <Option value="">년도</Option>
        {options.map(YYYY => (
          <Option value={`${YYYY}`}>{YYYY}</Option>
        ))}
      </AntdSelect>
    );
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
    const { result, onSave } = this.props;
    const { searchValue, selectedRowKeys, selectedWorkers } = this.state;
    const eshsWorkerList = (result && result.getWorkers && result.getWorkers.workerList) || [];
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onChangeRowSelection,
    };
    const columns = [
      {
        title: '교육이수',
        dataIndex: 'EDU_CHECK',
        width: '10%',
        align: 'center',
        render: value => {
          if (value === -1) return <CloseOutlined style={{ color: '#ff6666' }} />;
          return <CheckOutlined style={{ color: '#71da71' }} />;
        },
      },
      {
        title: '업체',
        dataIndex: 'WRK_CMPNY_NM',
        width: '30%',
        align: 'center',
      },
      {
        title: '성명',
        dataIndex: 'WORKER_NM',
        width: '15%',
        align: 'center',
      },
      {
        title: '생년월일',
        dataIndex: 'WORKER_SSN',
        width: '15%',
        align: 'center',
        render: value => <span>{value.substr(0, 6)}</span>,
      },
      {
        title: '핸드폰(연락처)',
        dataIndex: 'M_TEL',
        width: '15%',
        align: 'center',
      },
      {
        title: '긴급연락처',
        dataIndex: 'TEL',
        width: '15%',
        align: 'center',
      },
    ];

    return (
      <Styled>
        <StyledCustomSearchWrapper>
          <div className="search-input-area">
            {this.renderYearSelect()}
            <AntdSelect
              className="select-mid mr5"
              style={{ width: '100px' }}
              value={searchValue.searchType}
              onChange={e => this.changeSearchValue('searchType', e)}
            >
              <Option value="cmpny">업체</Option>
              <Option value="name">성명</Option>
              <Option value="ssn">생년월일</Option>
            </AntdSelect>
            <AntdInput
              className="ant-input-mid ant-input-inline"
              style={{ width: '300px', marginRight: '10px' }}
              defaultValue={searchValue.keyword}
              onChange={e => this.changeSearchValue('keyword', e.target.value)}
            />
            <StyledButton
              className="btn-gray btn-sm btn-first"
              onClick={() => this.handleGetWorkers('searchByEdu', searchValue.keyword)}
            >
              검색
            </StyledButton>
          </div>
        </StyledCustomSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <StyledButton className="btn-primary btn-xs btn-first" onClick={() => onSave(selectedWorkers)}>
            저장
          </StyledButton>
        </StyledButtonWrapper>
        <AntdTable
          columns={columns}
          pagination={false}
          rowSelection={rowSelection}
          scroll={{ y: 392 }}
          dataSource={eshsWorkerList}
          footer={() => (
            <div style={{ textAlign: 'center' }}>{`총 ${
              eshsWorkerList.length === 0 ? 0 : eshsWorkerList.length
            } 명`}</div>
          )}
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
  onSave: PropTypes.func, // 저장버튼
};

export default List;
