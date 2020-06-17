import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { Input } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
const AntdSearch = StyledSearchInput(Input.Search);

class SearchComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getSearchData = debounce(this.getSearchData, 300);
  }

  getSearchData = () => {
    const { sagaKey: id, getCallDataHandler, apiUrl } = this.props;
    const { KEYWORD } = this.props;
    const apiArr = [
      {
        key: 'materialList',
        type: 'GET',
        url: `${apiUrl}?KEYWORD=${KEYWORD}`,
      },
    ];
    getCallDataHandler(id, apiArr, this.setDataSource);
  };

  setDataSource = () => {
    const { result, sagaKey: id, changeFormData } = this.props;
    changeFormData(id, 'dataSource', (result.materialList && result.materialList.list) || []);
  };

  render() {
    const { KEYWORD, handleSearchChange } = this.props;
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <span className="text-label">화학물질 검색</span>
              <AntdSearch
                className="ant-search-inline input-search-mid mr5"
                placeholder="검색"
                onChange={e => handleSearchChange(e, 'INPUT')}
                value={KEYWORD}
                style={{ width: '200px' }}
              />
            </div>
          </StyledCustomSearchWrapper>
        </StyledContentsWrapper>
      </>
    );
  }
}

SearchComp.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  apiUrl: PropTypes.string,
  result: PropTypes.object,
  changeFormData: PropTypes.func,
  handleSearchChange: PropTypes.func,
  KEYWORD: PropTypes.string,
};

SearchComp.defaultProps = {
  sagaKey: '',
  getCallDataHandler: () => {},
  apiUrl: '',
  result: {},
  changeFormData: () => {},
  KEYWORD: '',
};

export default SearchComp;
