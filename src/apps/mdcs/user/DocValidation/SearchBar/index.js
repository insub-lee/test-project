import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon, Input, Select } from 'antd';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';

const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParam: {
        DRAFT_TITLE: '',
        DOCNUMBER: '',
        CHECKTYPE: '',
      },
    };
  }

  componentDidMount = () => {};

  chageSearchParam = (target, value = '') => this.setState(prevState => ({ searchParam: { ...prevState?.searchParam, [target]: value } }));

  render() {
    const { getList, customButtons, onChangePageSize, typeSearch } = this.props;
    const { searchParam } = this.state;
    return (
      <>
        <StyledCustomSearchWrapper className="search-wrapper-inline">
          <div className="search-input-area">
            <AntdInput
              className="ant-input-sm mr5"
              style={{ width: 120 }}
              allowClear
              placeholder="No"
              onChange={e => this.chageSearchParam('DOCNUMBER', e?.target?.value)}
              onPressEnter={() => getList(searchParam)}
            />
            <AntdInput
              className="ant-input-sm mr5"
              style={{ width: 200 }}
              allowClear
              placeholder="제목"
              onChange={e => this.chageSearchParam('DRAFT_TITLE', e?.target?.value)}
              onPressEnter={() => getList(searchParam)}
            />
            {typeSearch ? (
              <AntdSelect
                placeholder="점검"
                className="select-sm mr5"
                style={{ width: 100 }}
                onChange={val => this.chageSearchParam('CHECKTYPE', val)}
                allowClear
              >
                <AntdSelect.Option value="Y">유효</AntdSelect.Option>
                <AntdSelect.Option value="R">개정</AntdSelect.Option>
                <AntdSelect.Option value="O">폐기</AntdSelect.Option>
              </AntdSelect>
            ) : (
              ''
            )}
          </div>
          <div className="btn-area">
            <StyledButton className="btn-gray btn-sm mr5" onClick={() => getList(searchParam)}>
              검색
            </StyledButton>
            {customButtons}
          </div>
        </StyledCustomSearchWrapper>
        <div style={{ width: '100%', height: '30px', textAlign: 'right' }}>
          <div style={{ float: 'left', marginBottom: '10px' }}>
            <AntdSelect defaultValue={10} className="select-sm" style={{ width: 100 }} onChange={val => onChangePageSize(val)}>
              <AntdSelect.Option value={10}>10 / page</AntdSelect.Option>
              <AntdSelect.Option value={20}>20 / page</AntdSelect.Option>
              <AntdSelect.Option value={30}>30 / page</AntdSelect.Option>
              <AntdSelect.Option value={40}>40 / page</AntdSelect.Option>
              <AntdSelect.Option value={50}>50 / page</AntdSelect.Option>
            </AntdSelect>
          </div>
        </div>
      </>
    );
  }
}

SearchBar.propTypes = {
  getList: PropTypes.func,
  customButtons: PropTypes.array,
  onChangePageSize: PropTypes.func,
  typeSearch: PropTypes.bool, // 점검 상태별 검색 visible
};

SearchBar.defaultProps = {
  getList: () => {},
  customButtons: [],
  onChangePageSize: () => false,
  typeSearch: true,
};

export default SearchBar;
