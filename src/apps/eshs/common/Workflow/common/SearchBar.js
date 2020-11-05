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
      relKeys: [],
      searchParam: {
        DRAFT_TITLE: '',
        REL_KEY: '',
      },
    };
  }

  componentDidMount = () => {
    this.getEshsDraftGubun(res => this.setState({ relKeys: res || [] }));
  };

  getEshsDraftGubun = async (callBack = undefined) => {
    const { spinningOn, spinningOff } = this.props;
    spinningOn();
    await request({
      method: 'GET',
      url: '/api/workflow/v1/common/eshs/getEshsRelKey',
      data: { PARAM: {} },
      json: true,
    }).then(({ response }) => {
      spinningOff();
      if (typeof callBack === 'function') return callBack(response?.result);
      return response?.result;
    });
  };

  chageSearchParam = (target, value = '') => this.setState(prevState => ({ searchParam: { ...prevState?.searchParam, [target]: value } }));

  render() {
    const { getList } = this.props;
    const { relKeys, searchParam } = this.state;
    return (
      <StyledCustomSearchWrapper className="search-wrapper-inline">
        <div className="search-input-area mb10">
          <AntdSelect placeholder="종류" className="select-sm mr5" style={{ width: 200 }} onChange={val => this.chageSearchParam('REL_KEY', val)} allowClear>
            {relKeys.map(({ REL_KEY }, index) => (
              <AntdSelect.Option key={`REL_KEY_${index}`} value={REL_KEY}>
                {REL_KEY}
              </AntdSelect.Option>
            ))}
          </AntdSelect>
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
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  getList: PropTypes.func,
};

SearchBar.defaultProps = {
  spinningOn: () => {},
  spinningOff: () => {},
  getList: () => {},
};

export default SearchBar;
