import React from 'react';
import PropTypes from 'prop-types';
import { Select, Input } from 'antd';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';

const AntdSelect = StyledSelect(Select);
const AntdSearch = StyledSearchInput(Input.Search);
class SearchComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
    };
  }

  componentDidMount() {
    this.getCategoryList();
  }

  getCategoryList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'harmfulList',
        type: 'POST',
        url: `/api/admin/v1/common/categoryMapList`,
        params: { PARAM: { NODE_ID: 1976 } },
      },
    ];

    getCallDataHandler(id, apiArr, this.setCategoryList);
  };

  setCategoryList = () => {
    const { result } = this.props;
    this.setState({
      category: (result.harmfulList && result.harmfulList.categoryMapList && result.harmfulList.categoryMapList.slice(1)) || [],
    });
  };

  setSearchList = () => {
    const { sagaKey: id, result, changeFormData } = this.props;
    changeFormData(id, 'dataSource', (result.materialList && result.materialList.list) || []);
  };

  render() {
    // const { handleSearchChange } = this;
    const { category } = this.state;
    const { KEYWORD, CATEGORY_ID, handleSearchChange } = this.props;
    return (
      <>
        <StyledSearchWrap>
          <AntdSelect
            className="select-mid"
            defaultValue="전체 보기"
            value={CATEGORY_ID}
            onChange={value => handleSearchChange(value, 'SELECT')}
            style={{ width: '15%' }}
          >
            {category.map(item => (
              <Select.Option value={item.NODE_ID}>{item.NAME_KOR}</Select.Option>
            ))}
            <Select.Option value="">전체 보기</Select.Option>
          </AntdSelect>
          <AntdSearch
            value={KEYWORD}
            onChange={e => handleSearchChange(e, 'INPUT')}
            className="input-search-mid ant-input-inline"
            placeholder="검색"
            style={{ width: '20%' }}
          />
        </StyledSearchWrap>
      </>
    );
  }
}

SearchComp.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.object,
  changeFormData: PropTypes.func,
  KEYWORD: PropTypes.string,
  CATEGORY_ID: PropTypes.number,
  handleSearchChange: PropTypes.func,
};

export default SearchComp;
