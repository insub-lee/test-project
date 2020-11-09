import React, { Component } from 'react';
import PropTypes from 'prop-types';
import request from 'utils/request';

import { Icon, Input, Select } from 'antd';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParam: {
        DRAFT_TITLE: '',
        DOCNUMBER: '',
      },
    };
  }

  componentDidMount = () => {};

  chageSearchParam = (target, value = '') => this.setState(prevState => ({ searchParam: { ...prevState?.searchParam, [target]: value } }));

  render() {
    const { getList } = this.props;
    const { searchParam } = this.state;
    return (
      <StyledCustomSearchWrapper className="search-wrapper-inline">
        <div className="search-input-area mb10">
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
        </div>
        <div className="btn-area">
          <StyledButton className="btn-primary btn-sm" onClick={() => getList(searchParam)}>
            검색
          </StyledButton>
        </div>
      </StyledCustomSearchWrapper>
    );
  }
}

SearchBar.propTypes = {
  getList: PropTypes.func,
};

SearchBar.defaultProps = {
  getList: () => {},
};

export default SearchBar;
