import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';

import ChkEmpResultTable from 'apps/eshs/admin/health/ChkResult/EmpChkResultDetail/comp/ChkEmpResultTable';
import ChkItemResultTable from 'apps/eshs/admin/health/ChkResult/EmpChkResultDetail/comp/ChkItemResultTable';
import SearchBar from 'apps/eshs/admin/health/ChkResult/EmpChkResultDetail/comp/SearchBar';

import moment from 'moment';

const currentYear = moment(new Date()).format('YYYY');

class View extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      sagaKey: id,
      getCallDataHandler,
      profile: { USER_ID },
      defaultUser,
      spinningOn,
    } = this.props;
    spinningOn();
    const apiAry = [
      {
        key: 'RESULT',
        type: 'GET',
        url: `/api/eshs/v1/common/health/eshsHealthEmpChkResultDetail?user_id=${defaultUser || USER_ID}&CHK_YEAR=${currentYear}`,
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

  render() {
    const { result, userSearch, profile, sagaKey, getCallDataHandler, defaultUser, changeFormData, formData, spinningOn, spinningOff } = this.props;
    const data = (result && result.RESULT && result.RESULT.result) || {};
    const list = (data && data.list) || [];
    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper className="search-wrapper-inline">
          <SearchBar
            profile={profile}
            userSearch={userSearch}
            sagaKey={sagaKey}
            getCallDataHandler={getCallDataHandler}
            result={result}
            defaultUser={defaultUser}
            changeFormData={changeFormData}
            formData={formData}
            viewStart={this.appStart}
            spinningOn={spinningOn}
            spinningOff={spinningOff}
          />
        </StyledCustomSearchWrapper>
        <StyledHtmlTable>
          {0 in list ? (
            list.map(c => <ChkEmpResultTable key={c.CHK_CD} chkCd={c.CHK_CD} empInfo={{ ...c, ...data[`DIS_${c.CHK_CD}`] }} />)
          ) : (
            <ChkEmpResultTable noData />
          )}
          <br />
          <font color="#666666">
            ※ <b>검진일자</b>를 클릭하시면 검진 결과통보서를 출력하실 수 있습니다.
            <br />※ <b>검사종목</b>을 클릭하시면 추이를 보실 수 있습니다.
            <br />
          </font>
          <br />
          <ChkItemResultTable data={data} />
        </StyledHtmlTable>
      </StyledContentsWrapper>
    );
  }
}

View.propTypes = {
  result: PropTypes.object,
  profile: PropTypes.object,
  sagaKey: PropTypes.string,
  defaultUser: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  userSearch: PropTypes.bool,
  changeFormData: PropTypes.func,
  setFormData: PropTypes.func,
  formData: PropTypes.object,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
};
View.defaultProps = {
  result: {},
  profile: {},
  sagaKey: '',
  defaultUser: '',
  getCallDataHandler: () => {},
  userSearch: false,
  changeFormData: () => {},
  setFormData: () => {},
  formData: {},
  spinningOn: () => {},
  spinningOff: () => {},
};

export default View;
