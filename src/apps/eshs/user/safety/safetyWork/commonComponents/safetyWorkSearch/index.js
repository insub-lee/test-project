import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Table } from 'antd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import Styled from './Styled';

const { Option } = Select;
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);
const AntdTable = StyledAntdTable(Table);

class SafetyWorkSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      site: '전체',
      searchType: 'WORK_NO',
      keyword: '',
      safetyWorkList: [],
    };
  }

  componentDidMount() {}

  handleGetSafetyWorkList = () => {
    const { site, searchType, keyword } = this.state;
    const { sagaKey: id, getCallDataHandler } = this.props;
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
        url: `/api/eshs/v1/common/safetyWork?type=${type}&searchType=${searchType}&site=${site}&keyword=${keyword}`,
      },
    ];
    getCallDataHandler(id, apiArr, this.getSafetyWorkCallback);
  };

  getSafetyWorkCallback = () => {
    const { result } = this.props;
    const safetyWorks = (result && result.getSafetyWorkList && result.getSafetyWorkList.safetyWorkList) || [];
    if (safetyWorks.length === 0) {
      message.error(<MessageContent>검색된 안전작업이 없습니다.</MessageContent>);
      return;
    }
    this.setState({
      safetyWorkList: safetyWorks,
    });
  };

  render() {
    const { rowSelect } = this.props;
    const { site, searchType, keyword, safetyWorkList } = this.state;
    const columns = [
      {
        title: '작업번호',
        dataIndex: 'WORK_NO',
        width: '20%',
        align: 'center',
      },
      {
        title: '지역',
        dataIndex: 'SITE',
        width: '10%',
        align: 'center',
      },
      {
        title: '주작업',
        dataIndex: 'WCATEGORY',
        width: '20%',
        align: 'center',
      },
      {
        title: '작업명',
        dataIndex: 'TITLE',
        width: '50%',
        align: 'center',
      },
    ];
    return (
      <Styled>
        <StyledCustomSearchWrapper>
          <div className="search-input-area">
            <span className="text-label">지역</span>
            <AntdSelect className="select-xs" style={{ width: '100px' }} value={site} onChange={val => this.setState({ site: val })}>
              <Option value="전체">전체</Option>
              <Option value="청주">청주</Option>
              <Option value="구미">구미</Option>
            </AntdSelect>
            <span className="text-label">검색구분</span>
            <AntdSelect className="select-xs" style={{ width: '100px' }} value={searchType} onChange={val => this.setState({ searchType: val })}>
              <Option value="WORK_NO">작업번호</Option>
              <Option value="WGUBUN">작업구분</Option>
              <Option value="TITLE">작업명</Option>
              <Option value="WCATEGORY">주작업</Option>
              <Option value="WLOC">작업장소</Option>
              <Option value="WRK_CMPNY_NM">작업업체</Option>
            </AntdSelect>
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
  // type - number
  // type - string
  sagaKey: PropTypes.string,
  // type - object
  result: PropTypes.object,
  // type - func
  getCallDataHandler: PropTypes.func,
  rowSelect: PropTypes.func,
};

export default SafetyWorkSearch;
