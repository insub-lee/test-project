import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Input, Select } from 'antd';

import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';

import UserModal from 'apps/eshs/admin/health/ChkResult/EmpChkResultDetail/comp/UserModal';
import moment from 'moment';

const currentYear = moment(new Date()).format('YYYY');
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);

const { Option } = Select;
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      years: [],
      chkYear: String(currentYear),
    };
  }

  componentDidMount() {
    const years = [{ text: '최근 5년', value: '' }];
    for (let i = 2000; i <= currentYear; i++) {
      years.push({ text: i, value: String(i) });
    }
    this.setState({ years });
  }

  handleYearOnChange = value => {
    this.setState({ chkYear: value }, this.handleOnChangeSearchData);
  };

  handleOnChangeSearchData = () => {
    const { sagaKey: id, getCallDataHandler, formData, viewStart } = this.props;
    const { chkYear } = this.state;

    const userId = (formData && formData.userInfo && formData.userInfo.USER_ID) || 0;

    const apiAry = [
      {
        key: 'RESULT',
        type: 'GET',
        url: `/api/eshs/v1/common/health/eshsHealthEmpChkResultDetail?user_id=${userId}&CHK_YEAR=${chkYear}`,
      },
    ];

    getCallDataHandler(id, apiAry, viewStart);
  };

  render() {
    const { result, profile, sagaKey, getCallDataHandler, userSearch, changeFormData, formData, viewStart } = this.props;
    const { years, chkYear } = this.state;
    const userInfo = (formData && formData.userInfo) || {};
    return (
      <div>
        <UserModal
          userSearch={userSearch}
          sagaKey={sagaKey}
          getCallDataHandler={getCallDataHandler}
          changeFormData={changeFormData}
          formData={formData}
          result={result}
          viewStart={viewStart}
          chkYear={chkYear}
        />
        <b className="textLabel">{` / ${userInfo.DEPT_NAME_KOR || ''} / `}</b>
        <b className="textLabel">{`${userInfo.NAME_KOR || ''} ${userInfo.PSTN_NAME_KOR || ''}`}</b>
        &nbsp; &nbsp;
        <span className="textLabel">년도</span>
        &nbsp;
        <AntdSelect className="select-sm mr5" defaultValue={currentYear} style={{ width: 120 }} onChange={value => this.handleYearOnChange(value)}>
          {years.map(y => (
            <Option key={y.text} value={y.value}>
              {y.text}
            </Option>
          ))}
        </AntdSelect>
      </div>
    );
  }
}

SearchBar.propTypes = {
  result: PropTypes.object,
  profile: PropTypes.object,
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  userSearch: PropTypes.bool,
  changeFormData: PropTypes.func,
  formData: PropTypes.object,
  viewStart: PropTypes.func,
};
SearchBar.defaultProps = {
  result: {},
  profile: {},
  sagaKey: '',
  getCallDataHandler: () => {},
  userSearch: false,
  changeFormData: () => {},
  formData: {},
  viewStart: () => {},
};

export default SearchBar;
