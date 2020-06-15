import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';

import SearchBar from 'apps/eshs/admin/health/ChkResult/EmpChkResultDetail/comp/SearchBar';
import SelfCheckList from 'apps/eshs/admin/health/MyHealthPage/SelfEmpResultDetail/comp/SelfCheckList';
import SelfDetailList from 'apps/eshs/admin/health/MyHealthPage/SelfEmpResultDetail/comp/SelfDetailList';
import moment from 'moment';

const currentYear = moment(new Date()).format('YYYY');

class View extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  componentDidMount() {
    const {
      sagaKey: id,
      getCallDataHandler,
      profile: { USER_ID },
      defaultUser,
      spinningOn,
      chkYear,
    } = this.props;
    spinningOn();
    const apiAry = [
      {
        key: 'RESULT',
        type: 'GET',
        url: `/api/eshs/v1/common/health/eshsHealthSelfResultDetail?user_id=${defaultUser || USER_ID}&CHK_YEAR=${chkYear || currentYear}`,
      },
      {
        key: 'userDetail',
        type: 'GET',
        url: `/api/common/v1/account/userDetail/${defaultUser || USER_ID}`,
      },
    ];
    getCallDataHandler(id, apiAry, this.appStart);
  }

  appStart = () => {
    const { sagaKey: id, result, spinningOff, setFormData, formData } = this.props;
    const userDetail = (result && result.userDetail && result.userDetail.data) || {};
    setFormData(id, { ...formData, userInfo: userDetail, empNo: userDetail.EMP_NO });
    spinningOff();
  };

  apiAry = (userId, chkYear) => {
    this.setState({ text: '' });
    return [
      {
        key: 'userDetail',
        type: 'GET',
        url: `/api/common/v1/account/userDetail/${userId}`,
      },
      {
        key: 'RESULT',
        type: 'GET',
        url: `/api/eshs/v1/common/health/eshsHealthSelfResultDetail?user_id=${userId}&CHK_YEAR=${chkYear}`,
      },
    ];
  };

  render() {
    const { result, userSearch, profile, sagaKey, getCallDataHandler, formData, spinningOn, spinningOff, chkYear, defaultUser } = this.props;
    const list = (result && result.RESULT && result.RESULT.list) || [];
    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper className="search-wrapper-inline">
          <SearchBar
            profile={profile}
            userSearch={userSearch}
            defaultUser={defaultUser || profile.USER_ID}
            sagaKey={sagaKey}
            getCallDataHandler={getCallDataHandler}
            result={result}
            chkYear={chkYear}
            formData={formData}
            viewStart={this.appStart}
            spinningOn={spinningOn}
            spinningOff={spinningOff}
            customApi={this.apiAry}
          />
        </StyledCustomSearchWrapper>
        <StyledHtmlTable>
          <SelfDetailList list={list} rowClick={text => this.setState({ text })} text={this.state.text} />
          <br />
          <SelfCheckList list={list} />
        </StyledHtmlTable>
      </StyledContentsWrapper>
    );
  }
}

View.propTypes = {
  result: PropTypes.object,
  profile: PropTypes.object,
  sagaKey: PropTypes.string,
  defaultUser: PropTypes.number,
  getCallDataHandler: PropTypes.func,
  userSearch: PropTypes.bool,
  changeFormData: PropTypes.func,
  setFormData: PropTypes.func,
  formData: PropTypes.object,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  chkYear: PropTypes.string,
};
View.defaultProps = {
  result: {},
  profile: {},
  sagaKey: '',
  defaultUser: null,
  getCallDataHandler: () => {},
  changeFormData: () => {},
  setFormData: () => {},
  formData: {},
  spinningOn: () => {},
  spinningOff: () => {},
};

export default View;
