import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Input, Select } from 'antd';

import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import UserSearchModal from 'apps/eshs/common/userSearchModal';
import moment from 'moment';

const currentYear = moment(new Date()).format('YYYY');
const AntdSelect = StyledSelect(Select);
const { Option } = Select;
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      years: [],
      searchData: {
        userId: (this.props && this.props.defaultUser) || 0,
        chkYear: (this.props && this.props.chkYear) || String(currentYear),
      },
    };
  }

  componentDidMount() {
    const years = [{ text: '최근 5년', value: '' }];
    for (let i = currentYear; i >= 1998; i--) {
      years.push({ text: i, value: String(i) });
    }
    this.setState({ years });
  }

  handleOnChangeSearchData = (target, value) => {
    const { searchData } = this.state;
    this.setState({
      searchData: { ...searchData, [target]: value },
    });
  };

  handleOnSearch = () => {
    const { sagaKey: id, getCallDataHandler, viewStart, spinningOn, customApi } = this.props;
    const {
      searchData: { chkYear, userId },
    } = this.state;
    spinningOn();
    if (typeof customApi === 'function') return getCallDataHandler(id, customApi(userId, chkYear), viewStart);

    const apiAry = [
      {
        key: 'userDetail',
        type: 'GET',
        url: `/api/common/v1/account/userDetail/${userId}`,
      },
      {
        key: 'RESULT',
        type: 'GET',
        url: `/api/eshs/v1/common/health/eshsHealthEmpChkResultDetail?user_id=${userId}&CHK_YEAR=${chkYear}`,
      },
    ];

    return getCallDataHandler(id, apiAry, viewStart);
  };

  render() {
    const { formData, userSearch, profile, chkYear, yearSearch } = this.props;
    const { years } = this.state;
    const userInfo = (formData && formData.userInfo) || {};
    const empNo = (profile && profile.EMP_NO) || '';
    return (
      <>
        <div className="search-input-area">
          {userSearch ? (
            <UserSearchModal colData={empNo} onClickRow={record => this.handleOnChangeSearchData('userId', record.USER_ID)} />
          ) : (
            <span className="text-label">{userInfo.EMP_NO || ''}</span>
          )}
          <span className="text-label">{`/ ${userInfo.DEPT_NAME_KOR || ''} / ${userInfo.NAME_KOR || ''} ${userInfo.PSTN_NAME_KOR || ''}`}</span>
          {yearSearch && (
            <>
              &nbsp; &nbsp;
              <span className="text-label">년도</span>
              &nbsp;
              <AntdSelect
                className="select-sm mr5"
                defaultValue={chkYear || currentYear}
                style={{ width: 120 }}
                onChange={value => this.handleOnChangeSearchData('chkYear', value)}
              >
                {years.map(y => (
                  <Option key={y.text} value={y.value}>
                    {y.text}
                  </Option>
                ))}
              </AntdSelect>
            </>
          )}
        </div>
        <div className="btn-area">
          <StyledButton className="btn-primary btn-sm" onClick={this.handleOnSearch}>
            검색
          </StyledButton>
        </div>
      </>
    );
  }
}

SearchBar.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  formData: PropTypes.object,
  viewStart: PropTypes.func,
  spinningOn: PropTypes.func,
  userSearch: PropTypes.bool,
  profile: PropTypes.object,
  chkYear: PropTypes.string,
  customApi: PropTypes.any,
  defaultUser: PropTypes.number,
  yearSearch: PropTypes.bool,
};
SearchBar.defaultProps = {
  sagaKey: '',
  getCallDataHandler: () => {},
  formData: {},
  viewStart: () => {},
  spinningOn: () => {},
  customApi: undefined,
  defaultUser: 0,
  yearSearch: true,
};

export default SearchBar;
