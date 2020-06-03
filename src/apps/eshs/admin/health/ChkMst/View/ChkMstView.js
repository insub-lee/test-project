import React, { Component } from 'react';
import { Input } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';


class ChkMstView extends Component {
  state = {
    userInfo: {}
  };

  componentWillMount() {
    const { sagaKey, getCallDataHandler, selectedRow } = this.props;
    console.debug('selectedRow >> ', selectedRow);
    const apiAry = [
      {
        key: 'userDetail',
        url: `/api/common/v1/account/userDetail/${selectedRow.USER_ID}`,
        type: 'GET',
        params: {},
      },
    ];
    getCallDataHandler(sagaKey, apiAry, this.initData);
  };

  initData = () => {
    const { result } = this.props;
    this.setState({ 
      userInfo: result && result.userDetail && result.userDetail.data ? result.userDetail.data : {}
    });
  }

  render() {
    const { userInfo } = this.state;

    return (
      <StyledContentsWrapper>
      {userInfo && Object.keys(userInfo).length > 0 && (
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="10%" />
              <col width="15%" />
              <col width="10%" />
              <col width="15%" />
              <col width="10%" />
              <col width="15%" />
              <col width="10%" />
              <col width="15%" />
            </colgroup>
            <tbody>
              <tr>
                <th>사번</th>
                <td>{userInfo.EMP_NO}</td>
                <th>이름</th>
                <td>{userInfo.NAME_KOR}</td>
                <th>소속</th>
                <td colSpan={3}>{userInfo.DEPT_NAME}</td>
              </tr>
              <tr>
                <th>직위</th>
                <td>{userInfo.JIKWI_NM}</td>
                <th>직무</th>
                <td>{userInfo.STLTX}</td>
                <th>근무지</th>
                <td>{userInfo.GTEXT}</td>
                <th>상태</th>
                <td>{userInfo.STATUS_NAME}</td>
              </tr>
              <tr>
                <th>그룹입사</th>
                <td></td>
                <th>회사입사</th>
                <td>{userInfo.GRDAT}</td>
                <th>근속년수</th>
                <td>{`${userInfo.WORK_YEAR}년`}</td>
                <th>군휴직기간</th>
                <td></td>
              </tr>
              <tr>
                <th>주민번호</th>
                <td>{userInfo.REGNO ? `${userInfo.REGNO.substring(0, 6)}-${userInfo.REGNO.substring(6, 13)}` : ''}</td>
                <th>연령</th>
                <td>{`만 ${userInfo.AGE}세`}</td>
                <th>의보번호</th>
                <td></td>
                <th>전소속</th>
                <td></td>
              </tr>
              <tr>
                <th>사내전화</th>
                <td></td>
                <th>자택전화</th>
                <td></td>
                <th>핸드폰</th>
                <td colSpan={3}>{userInfo.MOBILE_TEL_NO}</td>
              </tr>
              <tr>
                <th>주소</th>
                <td colSpan={5}></td>
                <th>본인</th>
                <td></td>
              </tr>
              <tr>
                <th>배우자명</th>
                <td>{userInfo.FAM_NAME}</td>
                <th>주민번호</th>
                <td colSpan={3}>{userInfo.FAM_REGNO ? `${userInfo.REGNO.substring(0, 6)}-${userInfo.REGNO.substring(6, 13)}` : ''}</td>
                <th>배우자</th>
                <td></td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
      )}
      </StyledContentsWrapper>
    );
  }
}

export default ChkMstView;