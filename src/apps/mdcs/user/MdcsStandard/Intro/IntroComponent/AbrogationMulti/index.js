import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';

import StyledButton from 'apps/mdcs/styled/StyledButton';

import TaskTransfer from './TaskTransfer';

/* DESC: 폐기 기안 (일괄) */
class AbrogationMulti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: undefined,
      revisionList: [],
      sourceList: [],
      selectedList: [],
    };
  }

  onChangeSearchValue = e => {
    this.setState({ searchValue: e.target.value });
  };

  onInitDataBind = (id, response) => {
    const { revisionList } = response;
    const { selectedList } = this.state;
    let sourceList = [];
    if (selectedList.length > 0) {
    } else {
      sourceList = revisionList;
    }
    this.setState({ revisionList, sourceList });
  };

  onSearchRevisionData = () => {
    const { sagaKey, submitHandlerBySaga } = this.props;
    const { searchValue } = this.state;
    submitHandlerBySaga(sagaKey, 'POST', `/api/mdcs/v1/common/mdcsrevisionListHandler`, { PARAM: { DOCNUMBER: searchValue || '' } }, this.onInitDataBind);
  };

  setSelectedList = selectedList => this.setState({ selectedList });

  submitKeys = () => console.debug('aaaa');

  render() {
    const { options, values, searchValue, action } = this.props;
    const { sourceList, selectedList } = this.state;
    return (
      <>
        <li>
          <div className="label-txt">문서종류</div>
          <Select placeholder="문서종류" onChange={action.onChangeByStep1} defaultValue="all">
            <Select.Option key="all" value="all">
              전체
            </Select.Option>
            {options[0]}
          </Select>
        </li>
        <li>
          <div className="label-txt">문서번호검색</div>
          <Input onPressEnter={this.onSearchRevisionData} onChange={this.onChangeSearchValue} />
        </li>
        <div className="btn-wrap">
          <StyledButton className="btn-primary" onClick={this.onSearchRevisionData}>
            검색
          </StyledButton>
        </div>
        <TaskTransfer sourceList={sourceList} selectedList={selectedList} setSelectedList={this.setSelectedList} submitKeys={this.submitKeys} />
      </>
    );
  }
}
AbrogationMulti.propTypes = {
  options: PropTypes.arrayOf(PropTypes.any),
  values: PropTypes.arrayOf(PropTypes.any),
  searchValue: PropTypes.string,
  action: PropTypes.shape({
    onChangeByStep1: PropTypes.func,
    onChangeByStep2: PropTypes.func,
    onChangeByStep3: PropTypes.func,
    onChangeByStep4: PropTypes.func,
    onChangeByStep: PropTypes.func,
    onSearchRevisionData: PropTypes.func,
    onChangeSearchValue: PropTypes.func,
  }),
};

AbrogationMulti.defaultProps = {
  options: [],
  values: [],
  searchValue: '',
  action: {
    onChangeByStep1: () => {},
    onChangeByStep2: () => {},
    onChangeByStep3: () => {},
    onChangeByStep4: () => {},
    onChangeByStep: () => {},
    onSearchRevisionData: () => {},
    onChangeSearchValue: () => {},
  },
};

export default AbrogationMulti;
