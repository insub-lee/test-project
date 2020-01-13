import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';

/* DESC: 폐기 기안 (일괄) */
const AbrogationMulti = ({ options, values, searchValue, action }) => (
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
      <Input onPressEnter={action.onSearchRevisionData} value={searchValue} onChange={action.onChangeSearchValue} />
    </li>
  </>
);

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
