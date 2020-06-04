import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Input, Select } from 'antd';

import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import userSearchModal from 'apps/eshs/common/userSearchModal';
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
        userId: (this.props && this.props.formData && this.props.formData.userInfo && this.props.formData.userInfo.USER_ID) || 0,
        chkYear: String(currentYear),
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
    const { sagaKey: id, getCallDataHandler, viewStart, spinningOn } = this.props;
    const {
      searchData: { chkYear, userId },
    } = this.state;
    spinningOn();
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

    getCallDataHandler(id, apiAry, viewStart);
  };

  render() {
    const { formData } = this.props;
    const { years } = this.state;
    const userInfo = (formData && formData.userInfo) || {};
    const empNo = (formData && formData.userInfo && formData.userInfo.EMP_NO) || '';
    console.debug('empNo ', empNo);
    return (
      <>
        <div className="search-input-area">
          <div style={{ display: 'inline-block' }}>
            <userSearchModal visible colData={empNo} onClickRow={record => this.handleOnChangeSearchData('userId', record.USER_ID)} />
          </div>
          <b className="text-label">{` / ${userInfo.DEPT_NAME_KOR || ''} / `}</b>
          <b className="text-label">{`${userInfo.NAME_KOR || ''} ${userInfo.PSTN_NAME_KOR || ''}`}</b>
          &nbsp; &nbsp;
          <span className="text-label">년도</span>
          &nbsp;
          <AntdSelect
            className="select-sm mr5"
            defaultValue={currentYear}
            style={{ width: 120 }}
            onChange={value => this.handleOnChangeSearchData('chkYear', value)}
          >
            {years.map(y => (
              <Option key={y.text} value={y.value}>
                {y.text}
              </Option>
            ))}
          </AntdSelect>
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
};
SearchBar.defaultProps = {
  sagaKey: '',
  getCallDataHandler: () => {},
  formData: {},
  viewStart: () => {},
  spinningOn: () => {},
};

export default SearchBar;
