import React from 'react';
import PropTypes from 'prop-types';
import { Select, Input } from 'antd';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
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
          <AntdInput.Search
            value={KEYWORD}
            onChange={e => handleSearchChange(e, 'INPUT')}
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
  changeFormData: PropTypes.func,
  KEYWORD: PropTypes.string,
  CATEGORY_ID: PropTypes.number,
  handleSearchChange: PropTypes.func,
};

export default SearchComp;
