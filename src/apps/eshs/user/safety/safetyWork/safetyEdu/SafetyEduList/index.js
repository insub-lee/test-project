import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Table, Column, AutoSizer } from 'react-virtualized';
import { Input, Table, Select } from 'antd';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';

const { Option } = Select;
const AntdInput = StyledInput(Input);
const AntdTable = StyledAntdTable(Table);
const AntdSelect = StyledSelect(Select);

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
      <>
        <StyledCustomSearchWrapper>
          <div className="search-input-area">
            <span className="text-label">검색구분</span>
            <AntdSelect className="select-mid" defaultValue="EDU_NO" style={{ width: '120px' }} onChange={e => this.setState({ searchType: e })}>
              <Option value="EDU_NO">등록번호</Option>
              <Option value="EDU_YEAR">연도</Option>
              <Option value="WORK_NO">작업번호</Option>
              <Option value="SITE">지역</Option>
              <Option value="EDU_DT">교육일자</Option>
              <Option value="EDU_LOC">교육장소</Option>
            </AntdSelect>
            <AntdInput
              className="ant-input-mid"
              style={{ width: '200px', display: 'inline', marginLeft: '10px', marginRight: '10px' }}
              onChange={e => this.setState({ searchValue: e.target.value })}
            />
            <StyledButton className="btn-gray btn-sm btn-first" onClick={() => this.searchSafetyEdu()}>
              검색
            </StyledButton>
          </div>
        </StyledCustomSearchWrapper>
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
      </>
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
