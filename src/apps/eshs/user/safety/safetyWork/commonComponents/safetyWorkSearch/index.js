import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Input, Select, Table, Spin, DatePicker } from 'antd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledPicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import Styled from './Styled';

const { Option } = Select;
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);
const AntdTable = StyledAntdTable(Table);
const AntdDatePicker = StyledPicker(DatePicker);

const currentDate = moment(new Date()).format('YYYY-MM-DD');

class SafetyWorkSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      site: '전체',
      searchType: 'WORK_NO',
      sDate: currentDate,
      eDate: currentDate,
      keyword: '',
      safetyWorkList: [],
      isSearching: false,
    };
  }

  componentDidMount() {}

  handleGetSafetyWorkList = () => {
    const { site, searchType, keyword, sDate, eDate } = this.state;
    const { sagaKey: id, getCallDataHandler } = this.props;
    this.setState({
      isSearching: true,
    });
    let type = 'searchList';
    switch (id) {
      case 'safetyWorkEmergency_search':
        type = 'searchListEmergency';
        break;
      case 'illegalSafetyWork_search':
        type = 'searchListIllegal';
        break;
      default:
        break;
    }
    const apiArr = [
      {
        key: 'getSafetyWorkList',
        type: 'GET',
        url: `/api/eshs/v1/common/safetyWork?type=${type}&searchType=${searchType}&site=${site}&keyword=${keyword}&sDate=${sDate}&eDate=${eDate}`,
      },
    ];
    getCallDataHandler(id, apiArr, this.getSafetyWorkCallback);
  };

  getSafetyWorkCallback = () => {
    const { result } = this.props;
    const safetyWorks = (result && result.getSafetyWorkList && result.getSafetyWorkList.safetyWorkList) || [];
    if (safetyWorks.length === 0)
      return this.setState(
        {
          isSearching: false,
        },
        () => message.error(<MessageContent>검색된 안전작업이 없습니다.</MessageContent>),
      );
    return this.setState({
      isSearching: false,
      safetyWorkList: safetyWorks,
    });
  };

  render() {
    const { rowSelect, uesdSearchType } = this.props;
    const { site, searchType, keyword, safetyWorkList, isSearching, sDate, eDate } = this.state;
    const columns = [
      {
        title: '작업번호',
        dataIndex: 'WORK_NO',
        align: 'center',
      },
      {
        title: '지역',
        dataIndex: 'SITE',
        align: 'center',
      },
      {
        title: '주작업',
        dataIndex: 'WCATEGORY',
        align: 'center',
      },
      {
        title: '작업명',
        dataIndex: 'TITLE',
        align: 'center',
      },
      {
        title: '작업장소',
        dataIndex: 'WLOC',
        align: 'center',
      },
      {
        title: '작업업체',
        dataIndex: 'WRK_CMPNY_NM',
        align: 'center',
      },
      {
        title: '주관회사',
        dataIndex: 'REQ_CMPNY_NM',
        align: 'center',
      },
      {
        title: '주관부서',
        dataIndex: 'REQ_DEPT_NM',
        align: 'center',
      },
    ];
    return (
      <Styled>
        <Spin tip="검색중 ..." spinning={isSearching}>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <span className="text-label">지역</span>
              <AntdSelect className="select-xs" style={{ width: '100px' }} value={site} onChange={val => this.setState({ site: val })}>
                <Option value="전체">전체</Option>
                <Option value="청주">청주</Option>
                <Option value="구미">구미</Option>
              </AntdSelect>
              {uesdSearchType ? (
                <>
                  <span className="text-label">검색구분</span>
                  <AntdSelect className="select-xs" style={{ width: '100px' }} value={searchType} onChange={val => this.setState({ searchType: val })}>
                    <Option value="WORK_NO">작업번호</Option>
                    <Option value="WGUBUN">작업구분</Option>
                    <Option value="TITLE">작업명</Option>
                    <Option value="WCATEGORY">주작업</Option>
                    <Option value="WLOC">작업장소</Option>
                    <Option value="WRK_CMPNY_NM">작업업체</Option>
                  </AntdSelect>
                </>
              ) : (
                ''
              )}
              <span className="text-label">작업기간</span>
              <AntdDatePicker
                defaultValue={moment(sDate, 'YYYY-MM-DD')}
                className="ant-picker-xs mr5"
                style={{ width: 110 }}
                onChange={date => this.setState({ sDate: date.format('YYYY-MM-DD') })}
              />
              <span> ~ </span>
              <AntdDatePicker
                defaultValue={moment(eDate, 'YYYY-MM-DD')}
                className="ant-picker-xs mr5"
                style={{ width: 110 }}
                onChange={date => this.setState({ eDate: date.format('YYYY-MM-DD') })}
              />
              <span className="text-label">검색어</span>
              <AntdInput
                className="ant-input-xs ant-input-inline"
                value={keyword}
                onChange={e => this.setState({ keyword: e.target.value })}
                style={{ width: '200px' }}
              />
              <StyledButton className="btn-gray btn-xs btn-first" onClick={() => this.handleGetSafetyWorkList()} style={{ marginLeft: '10px' }}>
                검색
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>
        </Spin>
        <ContentsWrapper>
          <AntdTable
            columns={columns}
            dataSource={safetyWorkList}
            footer={() => <div style={{ textAlign: 'center' }}>{`총 ${safetyWorkList.length === 0 ? 0 : safetyWorkList.length} 건`}</div>}
            onRow={record => ({
              onClick: () => rowSelect(record),
            })}
          />
        </ContentsWrapper>
      </Styled>
    );
  }
}

SafetyWorkSearch.propTypes = {
  sagaKey: PropTypes.string,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  rowSelect: PropTypes.func,
  uesdSearchType: PropTypes.bool,
};

SafetyWorkSearch.defaultProps = {
  uesdSearchType: true,
};

export default SafetyWorkSearch;
