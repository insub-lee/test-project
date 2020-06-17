import React from 'react';
import PropTypes from 'prop-types';
import { Select, Input } from 'antd';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdSearch = StyledSearchInput(Input.Search);
class SearchComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      subCategories: [],
    };
  }

  componentDidMount() {
    this.getCategoryList();
  }

  getCategoryList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'codeCategory',
        type: 'POST',
        url: `/api/admin/v1/common/categoryMapList`,
        params: { PARAM: { NODE_ID: 1951 } },
      },
    ];

    getCallDataHandler(id, apiArr, this.setCategory);
  };

  setCategory = () => {
    const { result } = this.props;
    const category = result.codeCategory.categoryMapList.filter(item => item.PARENT_NODE_ID === 1951);
    this.setState({
      categories: category,
    });
  };

  getSubCategories = value => {
    const { result } = this.props;
    const category = result.codeCategory.categoryMapList.filter(item => item.PARENT_NODE_ID === Number(value));
    this.setState({
      subCategories: category,
    });
  };

  setSubCategories = () => {
    const { result } = this.props;
    this.setState({
      subCategories: (result.codeCategory && result.codeCategory.categoryMapList && result.subCategories.categoryMapList.slice(1)) || [],
    });
  };

  setSearchList = () => {
    const { sagaKey: id, result, changeFormData } = this.props;
    changeFormData(id, 'dataSource', (result.materialList && result.materialList.list) || []);
  };

  handleCategoryChange = (value, name, isSub) => {
    const { getSubCategories } = this;
    const { handleSearchChange } = this.props;
    if (!isSub) {
      getSubCategories(value);
      handleSearchChange(value, name, false);
    } else {
      handleSearchChange(value, name, true);
    }
  };

  render() {
    const { handleCategoryChange } = this;
    const { categories, subCategories } = this.state;
    const { KEYWORD, CATEGORY_ID, SUB_CATEGORY_ID, handleSearchChange } = this.props;
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <AntdSelect
              className="select-mid"
              defaultValue="전체 보기"
              value={CATEGORY_ID}
              onChange={value => handleCategoryChange(value, 'SELECT', false)}
              style={{ width: '15%' }}
            >
              {categories.map(item => (
                <Select.Option value={item.NODE_ID}>{item.NAME_KOR}</Select.Option>
              ))}
              <Select.Option value="">전체 보기</Select.Option>
            </AntdSelect>
            <AntdSelect
              className="select-mid"
              value={CATEGORY_ID ? SUB_CATEGORY_ID : null}
              onChange={value => handleCategoryChange(value, 'SELECT', true)}
              style={{ width: '15%' }}
              disabled={!CATEGORY_ID}
            >
              {subCategories.map(item => (
                <Select.Option value={item.NODE_ID}>{item.NAME_KOR}</Select.Option>
              ))}
            </AntdSelect>
            <AntdSearch
              value={KEYWORD}
              onChange={e => handleSearchChange(e, 'INPUT')}
              className="ant-search-inline input-search-mid mr5"
              placeholder="검색"
              style={{ width: '20%' }}
            />
          </StyledCustomSearchWrapper>
        </StyledContentsWrapper>
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
  SUB_CATEGORY_ID: PropTypes.number,
  handleSearchChange: PropTypes.func,
};

export default SearchComp;
