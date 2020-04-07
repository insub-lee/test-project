import React from 'react';
import PropTypes from 'prop-types';
import { Select, Input } from 'antd';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';

import { debounce } from 'lodash';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
class SearchComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      keyword: '',
      CATEGORY_ID: '',
    };
    this.getSearchList = debounce(this.getSearchList, 300);
  }

  componentDidMount() {
    this.getCategoryList();
    this.getSearchList();
  }

  getCategoryList = () => {
    const mapId = 82;
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'harmfulList',
        type: 'GET',
        url: `/api/admin/v1/common/categoryMapList?MAP_ID=${mapId}`,
      },
    ];

    getCallDataHandler(id, apiArr, this.setCategoryList);
  };

  setCategoryList = () => {
    const { result } = this.props;
    this.setState({
      category:
        (result.harmfulList && result.harmfulList.categoryMapList && result.harmfulList.categoryMapList.filter(item => item.PARENT_NODE_ID === 1819)) || [],
    });
  };

  handleSearchChange = e => {
    if (typeof e === 'object') {
      return this.setState(
        {
          keyword: e.target.value,
        },
        this.getSearchList,
      );
    }
    if (typeof e === 'number' || !e.length) {
      console.debug(typeof e, e);
      return this.setState(
        {
          CATEGORY_ID: e,
        },
        this.getSearchList,
      );
    }
    return null;
  };

  handleCategoryChange = value => {
    this.setState(
      {
        category: value,
      },
      this.getSearchList,
    );
  };

  getSearchList = () => {
    const { CATEGORY_ID, keyword } = this.state;
    const { sagaKey: id, getCallDataHandler, apiUrl } = this.props;
    const apiArr = [
      {
        key: 'materialList',
        type: 'GET',
        url: `${apiUrl}?CATEGORY_ID=${CATEGORY_ID}&keyword=${keyword}`,
      },
    ];
    getCallDataHandler(id, apiArr, this.setSearchList);
  };

  setSearchList = () => {
    const { sagaKey: id, result, changeFormData } = this.props;
    changeFormData(id, 'dataSource', (result.materialList && result.materialList.list) || []);
  };

  render() {
    const { handleSearchChange } = this;
    const { category, keyword } = this.state;
    return (
      <>
        <StyledSearchWrap>
          <AntdSelect className="select-mid" defaultValue="전체 보기" onChange={handleSearchChange} style={{ width: '15%' }}>
            {category.map(item => (
              <Select.Option value={item.NODE_ID}>{item.NAME_KOR}</Select.Option>
            ))}
            <Select.Option value="">전체 보기</Select.Option>
          </AntdSelect>
          <AntdInput.Search
            value={keyword}
            onChange={handleSearchChange}
            className="ant-input-mid ant-input-inline search-item input-width160"
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
  apiUrl: PropTypes.string,
  changeFormData: PropTypes.func,
};

export default SearchComp;
