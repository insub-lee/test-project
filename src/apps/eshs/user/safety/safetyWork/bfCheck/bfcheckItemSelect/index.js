import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Table, Select } from 'antd';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

const AntdInput = StyledInput(Input);
const AntdTable = StyledAntdTable(Table);
const AntdSelect = StyledSelect(Select);
const { Option } = Select;

class BfcheckItemSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: 'WCATEGORY',
      searchValue: '',
      searchResult: props.brcheckItem,
      selectedItems: [],
    };
  }

  onSearch = () => {
    const { brcheckItem } = this.props;
    const { searchType, searchValue } = this.state;
    const regex = new RegExp(`${searchValue}`, 'gi');
    const nextSearchResult = brcheckItem.filter(item => regex.test(item[searchType]));
    this.setState({
      searchResult: nextSearchResult,
    });
  };

  handleChangeSelectItem = rowkeys => {
    const { brcheckItem } = this.props;
    this.setState({
      selectedItems: brcheckItem.filter((item, index) => rowkeys.includes(index)),
    });
  };

  render() {
    const { rowSelect, onSave } = this.props;
    const { searchType, searchValue, searchResult, selectedItems } = this.state;
    const rowSelection = {
      columnWidth: '5%',
      onChange: this.handleChangeSelectItem,
    };
    const columns = [
      {
        title: '작업종류',
        dataIndex: 'WCATEGORY',
        width: '30%',
        align: 'center',
      },
      {
        title: '항목코드',
        dataIndex: 'ITEM_CD',
        width: '15%',
        align: 'center',
      },
      {
        title: '항목명',
        dataIndex: 'ITEM_NM',
        width: '50%',
        align: 'center',
      },
    ];

    return (
      <>
        <StyledCustomSearchWrapper>
          <div className="search-input-area">
            <span className="text-label">검색구분</span>
            <AntdSelect
              className="select-sm"
              value={searchType}
              style={{ width: '100px', marginRight: '10px' }}
              onChange={e => this.setState({ searchType: e })}
            >
              <Option value="WCATEGORY">작업종류</Option>
              <Option value="ITEM_CD">코드</Option>
              <Option value="ITEM_NM">항목명</Option>
            </AntdSelect>
            <span className="text-label" style={{ marginRight: '10px' }}>
              검색어
            </span>
            <AntdInput
              className="ant-input-sm ant-input-inline"
              value={searchValue}
              style={{ width: '200px', marginRight: '10px' }}
              onChange={e => this.setState({ searchValue: e.target.value })}
            />
            <StyledButton className="btn-gray btn-sm btn-first" onClick={this.onSearch}>
              검색
            </StyledButton>
          </div>
        </StyledCustomSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <StyledButton className="btn-primary btn-sm btn-first" onClick={() => onSave(selectedItems)}>
            저장
          </StyledButton>
        </StyledButtonWrapper>
        <ContentsWrapper>
          <AntdTable
            columns={columns}
            dataSource={searchResult}
            rowSelection={rowSelection}
            footer={() => <div style={{ textAlign: 'center' }}>{`총 ${searchResult.length === 0 ? 0 : searchResult.length} 건`}</div>}
            onRow={record => ({
              onClick: () => rowSelect(record),
            })}
          />
        </ContentsWrapper>
      </>
    );
  }
}

BfcheckItemSelect.propTypes = {
  brcheckItem: PropTypes.array,
  rowSelect: PropTypes.func,
  onSave: PropTypes.func,
};

BfcheckItemSelect.defaultProps = {
  brcheckItem: [],
  rowSelect: () => console.log('func(record)'),
  onSave: () => console.log('func(selectedItems)'),
};

export default BfcheckItemSelect;
