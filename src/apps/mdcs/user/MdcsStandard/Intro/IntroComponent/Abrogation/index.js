import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';

/* DESC: 폐기 기안 */
const Abrogation = ({ options, values, searchValue, action }) => (
  <>
    <li>
      <div className="label-txt">문서번호검색</div>
      <Input onPressEnter={action.onSearchRevisionData} value={searchValue} onChange={action.onChangeSearchValue} />
    </li>
    {/*
    <li>
      <div className="label-txt">대분류</div>
      <Select placeholder="대분류(문서구분)" onChange={action.onChangeByStep1} value={values[0]}>
        {options[0]}
      </Select>
    </li>
    <li>
      <div className="label-txt">중분류</div>
      <Select placeholder="중분류" onChange={action.onChangeByStep2} value={values[1]}>
        {options[1]}
      </Select>
    </li>
    <li>
      <div className="label-txt">소분류</div>
      <Select placeholder="소분류(업무기능)" onChange={action.onChangeByStep3} value={values[2]}>
        {options[2]}
      </Select>
    </li>
    <li>
      <div className="label-txt">문서LEVEL</div>
      <Select placeholder="문서LEVEL/종류" onChange={action.onChangeByStep4} value={values[3]}>
        {options[3]}
      </Select>
    </li>
    */}
  </>
);

Abrogation.propTypes = {
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

Abrogation.defaultProps = {
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

export default Abrogation;
