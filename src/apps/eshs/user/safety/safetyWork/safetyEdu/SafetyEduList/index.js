import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Table, Column, AutoSizer } from 'react-virtualized';
import { Input, Table, Select } from 'antd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledSelect from 'commonStyled/EshsStyled/Select/StyledSelect';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import Styled from './Styled';

const { Option } = Select;
const AntdInput = StyledInput(Input);
const AntdTable = StyledLineTable(Table);

class SafetyEduList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: 'EDU_NO',
      searchValue: '',
    };
  }

  searchSafetyEdu = () => {
    const { searchSafetyEdu } = this.props;
    const { searchType, searchValue } = this.state;
    searchSafetyEdu(searchType, searchValue);
    // if (searchValue !== '') {
    // } else {
    //   message.error(<MessageContent>검색어를 입력해 주십시오.</MessageContent>);
    // }
  };

  render() {
    const { safetyEduList, selectSafetyEdu } = this.props;
    const columns = [
      {
        title: '교육등록번호',
        dataIndex: 'EDU_NO',
        width: '20%',
        align: 'center',
      },
      {
        title: '연도',
        dataIndex: 'EDU_YEAR',
        width: '8%',
        align: 'center',
      },
      {
        title: '작업번호',
        dataIndex: 'WORK_NO',
        width: '20%',
        align: 'center',
      },
      {
        title: '지역',
        dataIndex: 'SITE',
        width: '8%',
        align: 'center',
      },
      {
        title: '교육일자',
        dataIndex: 'EDU_DT',
        width: '14%',
        align: 'center',
      },
      {
        title: '교육장소',
        dataIndex: 'EDU_LOC',
        width: '30%',
        align: 'center',
      },
    ];

    return (
      <Styled>
        <StyledSearchWrap>
          <div className="search-group-layer">
            <StyledSelect style={{ display: 'inline' }}>
              <Select defaultValue="EDU_NO" style={{ width: '120px' }} onChange={e => this.setState({ searchType: e })}>
                <Option value="EDU_NO">등록번호</Option>
                <Option value="EDU_YEAR">연도</Option>
                <Option value="WORK_NO">작업번호</Option>
                <Option value="SITE">지역</Option>
                <Option value="EDU_DT">교육일자</Option>
                <Option value="EDU_LOC">교육장소</Option>
              </Select>
            </StyledSelect>
            <AntdInput
              className="ant-input-sm"
              style={{ width: '200px', display: 'inline', marginLeft: '10px', marginRight: '10px' }}
              onChange={e => this.setState({ searchValue: e.target.value })}
            />
            <StyledButton className="btn-primary btn-xs btn-first" onClick={() => this.searchSafetyEdu()}>
              검색
            </StyledButton>
          </div>
        </StyledSearchWrap>
        <>
          <AntdTable
            columns={columns}
            dataSource={safetyEduList}
            onRow={record => ({
              onClick: () => selectSafetyEdu(record),
            })}
            footer={() => <div style={{ textAlign: 'center' }}>{`총 ${safetyEduList.length === 0 ? 0 : safetyEduList.length} 건`}</div>}
          />
        </>
      </Styled>
    );
  }
}

SafetyEduList.propTypes = {
  safetyEduList: PropTypes.array,
  searchSafetyEdu: PropTypes.func,
  selectSafetyEdu: PropTypes.func,
};

SafetyEduList.defaultProps = {
  safetyEduList: [],
  searchSafetyEdu: () => false,
  selectSafetyEdu: () => false,
};

export default SafetyEduList;
