import React, { Component } from 'react';
import { Select, DatePicker } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import moment from 'moment';

const AntdSelect = StyledSelect(Select);
const AntdDatePicker = StyledDatePicker(DatePicker);

class ChkMstView extends Component {
  state = {
    userInfo: {},
    list: [],
    CHK_YEAR: '',
    yearList: [],
    CHK_TYPE_CD_NODE_ID: '',
  };

  componentWillMount() {
    const today = new Date();
    const currYear = today.getFullYear();
    const yearList = [];
    for (let i=currYear; i>=1998; i--) {
      yearList.push(i);
    }
    this.setState({
      yearList,
      CHK_YEAR: currYear,
    });

    const { sagaKey, getCallDataHandler, selectedRow, spinningOn } = this.props;
    const apiAry = [
      {
        key: 'userDetail',
        url: `/api/common/v1/account/userDetail/${selectedRow.USER_ID}`,
        type: 'GET',
        params: {},
      },
      {
        key: 'hospitalList',
        url: `/api/eshs/v1/common/health/healthChkHospital`,
        type: 'GET',
        params: {},
      },
      {
        key: 'chkTypeList',
        url: '/api/admin/v1/common/categoryMapList',
        type: 'POST',
        params: {
          PARAM: { NODE_ID: 675 }
        },
      },
      {
        key: 'nChkReasonList',
        url: '/api/admin/v1/common/categoryMapList',
        type: 'POST',
        params: {
          PARAM: { NODE_ID: 687 }
        },
      },
      {
        key: 'chkMstList',
        url: `/api/eshs/v1/common/health/healthChkReservationMstList`,
        type: 'POST',
        params: {
          PARAM: { SCH_USER_ID: selectedRow.USER_ID, CHK_YEAR: currYear }
        },
      },
    ];
    spinningOn();
    getCallDataHandler(sagaKey, apiAry, this.initData);
  };

  initData = () => {
    const { result, spinningOff } = this.props;
    this.setState({ 
      userInfo: result && result.userDetail && result.userDetail.data ? result.userDetail.data : {},
      list: result && result.chkMstList && result.chkMstList.list ? result.chkMstList.list : [],
      CHK_TYPE_CD_NODE_ID: result && result.chkMstList && result.chkMstList.list ? result.chkMstList.list[0].CHK_TYPE_CD_NODE_ID : '',
    });
    spinningOff();
  };

  render() {
    const { userInfo, list } = this.state;
    const { result } = this.props;

    return (
      <StyledContentsWrapper>
      {userInfo && Object.keys(userInfo).length > 0 && (
        <>
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
                  <td colSpan={3}>{userInfo.DEPT_NAME_KOR}</td>
                </tr>
                <tr>
                  <th>직위</th>
                  <td>{userInfo.PSTN_NAME_KOR}</td>
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
                  <td>{userInfo.OFFICE_TEL_NO}</td>
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
          <StyledCustomSearchWrapper style={{ marginTop: 20 }}>
            <div className="search-input-area">
              <AntdSelect value={this.state.CHK_YEAR} className="select-sm mr5" style={{ width: 100 }}>
              {this.state.yearList && this.state.yearList.map(year => (
                <AntdSelect.Option value={year}>{`${year}년`}</AntdSelect.Option>
              ))}
              </AntdSelect>
              <StyledButton className="btn-gray btn-sm mr5" onClick={() => { alert('개발중입니다.'); }}>검색</StyledButton>
              <StyledButton className="btn-primary btn-sm mr5" onClick={() => { alert('개발중입니다.'); }}>저장</StyledButton>
              <StyledButton className="btn-primary btn-sm mr5" onClick={() => { alert('개발중입니다.'); }}>검진추가</StyledButton>
              <StyledButton className="btn-gray btn-sm mr5" onClick={() => { alert('개발중입니다.'); }}>문진표조회</StyledButton>
              <StyledButton className="btn-gray btn-sm" onClick={() => { alert('개발중입니다.'); }}>검진결과조회</StyledButton>
            </div> 
          </StyledCustomSearchWrapper>
          {list && list.length > 0 && (
            <StyledHtmlTable>
              <table>
                <colgroup>
                  <col width="10%" />
                  <col width="30%" />
                  <col width="20%" />
                  <col width="20%" />
                  <col width="20%" />
                </colgroup>
                <thead>
                  <tr>
                    <th colSpan={2}>
                    {result && result.chkTypeList && result.chkTypeList.categoryMapList && (
                      <AntdSelect value={this.state.CHK_TYPE_CD_NODE_ID} className="select-sm" placeholder="검종" style={{ width: 100 }}>
                      {result.chkTypeList.categoryMapList.map(cate => (
                        <AntdSelect.Option value={cate.NODE_ID}>{cate.NAME_KOR}</AntdSelect.Option>
                      ))}
                      </AntdSelect>
                    )}
                    </th>
                    <th colSpan={3}>{userInfo.DEPT_NAME_KOR}</th>
                  </tr>
                  <tr>
                    <th></th>
                    <th>검진기관</th>
                    <th>예약일</th>
                    <th>검진일</th>
                    <th>미수검사유</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(item => (
                    <tr className="tr-center">
                      <td>{item.IS_MATE === '0' ? `${item.CHK_SEQ}차` : '배우자'}</td>
                      <td>
                      {result && result.hospitalList && result.hospitalList.list && (
                        <AntdSelect value={item.HOSPITAL_CODE} className="select-sm" placeholder="검진기관" style={{ width: 200 }}>
                        {result.hospitalList.list.map(hospital => (
                          <AntdSelect.Option value={hospital.HOSPITAL_CODE}>{hospital.HOSPITAL_NAME}</AntdSelect.Option>
                        ))}
                        </AntdSelect>
                      )}
                      </td>
                      <td>
                        <AntdDatePicker value={item.APP_DT ? moment(item.APP_DT) : ''} className="ant-picker-sm" />
                      </td>
                      <td>
                        <AntdDatePicker value={item.CHK_DT ? moment(item.CHK_DT) : ''} className="ant-picker-sm" />
                      </td>
                      <td>
                      {result && result.nChkReasonList && result.nChkReasonList.categoryMapList && (
                        <AntdSelect className="select-sm" placeholder="미수검사유" style={{ width: 150 }}>
                        {result.nChkReasonList.categoryMapList.map(cate => (
                          <AntdSelect.Option value={cate.NODE_ID}>{cate.NAME_KOR}</AntdSelect.Option>
                        ))}
                        </AntdSelect>
                      )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </StyledHtmlTable>
          )}
          <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
            <StyledButton className="btn-light btn-sm" onClick={this.props.onCancelPopup}>닫기</StyledButton>
          </StyledButtonWrapper>
        </>
      )}
      </StyledContentsWrapper>
    );
  }
}

export default ChkMstView;