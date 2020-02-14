/* eslint-disable import/no-unresolved */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form, Button, Icon, Switch } from 'antd';
import { intlObj, lang } from 'utils/commonUtils';
import { injectIntl } from 'react-intl';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as feed from 'components/Feedback/functions';
import * as actionsLoading from 'containers/common/Loading/actions';
import AppMaNagerList from 'components/OrgDetailReturnView';
import Organization from 'containers/portal/components/Organization';
import OrganizationRole from 'components/OrganizationRole';
import StyledButton from 'components/Button/StyledButton';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from '../../messages';
import { StyleBizMenuAuthSetting } from './StyleBizMenuAuthSetting';

const FormItem = Form.Item;

// A - 관리자, U - 사용자
const ADMIN_GRP = 'A';
const USER_GRP = 'U';

// ACNT_TYPE : U - 구성원, P - 직위, D - 부서, T - 직책, V - 가상그룹
const USER = 'U';
const DEPT = 'D';
const PSTN = 'P';
const DUTY = 'T';
const GRP = 'V';

// 각 ACNT_TYPE 별 id가 다름.
function convertOrgData(newarr, ACNT_ID, AUTH_GRP, ACNT_TYPE) {
  return newarr.map(m => {
    const m2 = m;
    m2.ACNT_ID = m2[ACNT_ID] !== undefined ? m2[ACNT_ID] : m2[ACNT_ID.toUpperCase()];
    m2.AUTH_GRP = AUTH_GRP;
    m2.ACNT_TYPE = ACNT_TYPE;
    return m2;
  });
}

function acntIdStringtoInteger(list) {
  return list.map(m => {
    const m2 = m;
    m2.ACNT_ID = Number(m2.ACNT_ID);
    return m2;
  });
}

function getOrgData(data, ACNT_TYPE) {
  return data.filter(o => o.ACNT_TYPE === ACNT_TYPE);
}

class BizMenuAuthSetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        MENU_ID: -1,
        A: {
          users: [],
          depts: [],
          pstns: [],
          dutys: [],
          grps: [],
        },
        U: {
          users: [],
          depts: [],
          pstns: [],
          dutys: [],
          grps: [],
        },
      },
      INHERIT: false,
      orgShow: false,
      AUTH_GRP: ADMIN_GRP,
    };
  }

  componentDidMount() {
    const { match, getBizMenuAuthInfo, loadingOn } = this.props;
    const { params } = match;
    const { BIZGRP_ID, MENU_ID } = params;
    this.setState(
      {
        MENU_ID: Number(MENU_ID),
      },
      () => {
        loadingOn();
        getBizMenuAuthInfo(Number(BIZGRP_ID), Number(MENU_ID));
      },
    );
  }

  componentDidUpdate() {
    const { match, dataP } = this.props;
    const { params } = match;
    const { BIZGRP_ID, MENU_ID } = params;
    const { data } = this.state;

    if (MENU_ID && Number(this.state.MENU_ID) !== Number(MENU_ID)) {
      this.setState(
        {
          MENU_ID: Number(MENU_ID),
        },
        () => {
          this.props.loadingOn();
          this.props.getBizMenuAuthInfo(Number(BIZGRP_ID), Number(MENU_ID));
        },
      );
    }
    if (dataP.MENU_ID && data.MENU_ID !== dataP.MENU_ID) {
      let mData = { ...data, ...dataP };
      if (dataP.A) {
        // 관리자 권한
        mData = {
          ...mData,
          A: {
            users: getOrgData(mData[ADMIN_GRP], USER),
            depts: getOrgData(mData[ADMIN_GRP], DEPT),
            pstns: getOrgData(mData[ADMIN_GRP], PSTN),
            dutys: getOrgData(mData[ADMIN_GRP], DUTY),
            grps: getOrgData(mData[ADMIN_GRP], GRP),
          },
        };
      }
      if (dataP.U) {
        // 조회 권한
        mData = {
          ...mData,
          U: {
            users: getOrgData(mData[USER_GRP], USER),
            depts: getOrgData(mData[USER_GRP], DEPT),
            pstns: getOrgData(mData[USER_GRP], PSTN),
            dutys: getOrgData(mData[USER_GRP], DUTY),
            grps: getOrgData(mData[USER_GRP], GRP),
          },
        };
      }
      this.setState({
        data: mData,
      });
    }
  }

  onChangeData(newData) {
    this.setState(prevState => ({
      data: { ...prevState.data, ...newData },
    }));
  }

  managerOrgOpen = type => {
    this.setState({
      orgShow: true,
      AUTH_GRP: type,
    });
  };

  orgClose = () => {
    this.setState({
      orgShow: false,
    });
  };

  getOrgObj = () => {
    const { data, orgShow, AUTH_GRP } = this.state;
    if (orgShow) {
      const oldUsers = data[AUTH_GRP].users || [];
      const oldDepts = data[AUTH_GRP].depts || [];
      const oldPstns = data[AUTH_GRP].pstns || [];
      const oldDutys = data[AUTH_GRP].dutys || [];
      const oldGrps = data[AUTH_GRP].grps || [];

      if (AUTH_GRP === ADMIN_GRP) {
        return (
          // 업무그룹 관리자만 등록 가능 했던 방식 수정
          // <OrganizationRole
          <Organization
            // 업무그룹 관리자만 등록 가능 했던 방식 수정
            userTab
            pstnTab
            dutyTab
            grpTab
            //
            show={this.state.orgShow}
            closeModal={this.orgClose}
            // 조직도 모달창으로 가져갈 데이터
            selectedUsers={oldUsers.slice()}
            checkedDept={oldDepts.slice()}
            checkedPstn={oldPstns.slice()}
            checkedDuty={oldDutys.slice()}
            checkedGrp={oldGrps.slice()}
            // 조직도 모달창으로부터 데이터 가져오는 함수
            getDataFromOrganization={result => {
              const mData = {
                users: convertOrgData(result.selectedUsers, 'USER_ID', AUTH_GRP, USER),
                pstns: convertOrgData(result.checkedDept, 'id', AUTH_GRP, DEPT),
                depts: convertOrgData(result.checkedPstn, 'id', AUTH_GRP, PSTN),
                dutys: convertOrgData(result.checkedDuty, 'id', AUTH_GRP, DUTY),
                grps: convertOrgData(result.checkedGrp, 'id', AUTH_GRP, GRP),
              };

              this.onChangeData({ A: mData });
            }}
            // 업무그룹 관리자만 등록 가능 했던 방식 수정
            // ROLE_CD="BM"
          />
        );
      }
      return (
        <Organization
          show={this.state.orgShow}
          closeModal={this.orgClose}
          userTab
          pstnTab
          dutyTab
          grpTab
          /*
            <부서/사용자 선택 중 옵션 flag>
            onlyDept - 사용자 선택 제외한 부서만 선택
            onlyUser - 부서 선택 제외한 사용자만 선택
            selectSingleDept - 하나의(단일) 부서만 선택 가능
            selectSingleUser - 하나의(단일) 사용자만 선택 가능
          */
          // onlyDept
          // selectSingleDept
          // onlyUser
          // selectSingleUser
          // 조직도 모달창으로 가져갈 데이터
          selectedUsers={oldUsers.slice()}
          checkedDept={oldDepts.slice()}
          checkedPstn={oldPstns.slice()}
          checkedDuty={oldDutys.slice()}
          checkedGrp={oldGrps.slice()}
          // 조직도 모달창으로부터 데이터 가져오는 함수
          getDataFromOrganization={result => {
            const mData = {
              users: convertOrgData(result.selectedUsers, 'USER_ID', AUTH_GRP, USER),
              pstns: convertOrgData(result.checkedPstn, 'id', AUTH_GRP, PSTN),
              depts: convertOrgData(result.checkedDept, 'id', AUTH_GRP, DEPT),
              dutys: convertOrgData(result.checkedDuty, 'id', AUTH_GRP, DUTY),
              grps: convertOrgData(result.checkedGrp, 'id', AUTH_GRP, GRP),
            };

            this.onChangeData({ U: mData });
          }}
        />
      );
    }
    return null;
  };

  render() {
    const { data } = this.state;
    const { dataP, updateBizMenuAuth, history } = this.props;
    const {
      match: {
        params: { BIZGRP_ID, MENU_ID },
      },
    } = this.props;
    const { CHILD_CNT } = dataP;
    return (
      <div>
        <div className="title-wrapper">
          <h2 className="adTitle">{lang.get('NAME', data)}</h2>
        </div>
        {this.getOrgObj()}
        <StyleBizMenuAuthSetting>
          <Form>
            <h2 className="pageTitle">권한 설정</h2>
            <div className="formTable">
              <table>
                <tbody>
                  <tr>
                    <th className="top">
                      <span className="">{intlObj.get(messages.bizGroupManagement)}</span>
                    </th>
                    <td>
                      <FormItem>
                        <div style={{}}>
                          <div className="appManagerListBox">
                            {data.A ? (
                              <AppMaNagerList
                                grpType={ADMIN_GRP}
                                userList={data.A.users}
                                pstnList={data.A.pstns}
                                deptList={data.A.depts}
                                dutyList={data.A.dutys}
                                grpList={data.A.grps}
                                returnUserList={result => {
                                  const nData = { ...data.A };
                                  delete nData.users;
                                  this.onChangeData({ A: { ...nData, users: result } });
                                }}
                                returnPstnList={result => {
                                  const nData = { ...data.A };
                                  delete nData.pstns;
                                  this.onChangeData({ A: { ...nData, pstns: result } });
                                }}
                                returnDetpList={result => {
                                  const nData = { ...data.A };
                                  delete nData.depts;
                                  this.onChangeData({ A: { ...nData, depts: result } });
                                }}
                                returnDutyList={result => {
                                  const nData = { ...data.A };
                                  delete nData.dutys;
                                  this.onChangeData({ A: { ...nData, dutys: result } });
                                }}
                                returnGrpList={result => {
                                  const nData = { ...data.A };
                                  delete nData.grps;
                                  this.onChangeData({ A: { ...nData, grps: result } });
                                }}
                                delFlag
                              />
                            ) : (
                              ''
                            )}
                          </div>
                          <div className="btnText-wrap">
                            <Button
                              className="btnText"
                              onClick={() => {
                                this.managerOrgOpen(ADMIN_GRP);
                              }}
                            >
                              <Icon type="plus-circle" />
                              {intlObj.get(messages.find)}
                            </Button>
                          </div>
                        </div>
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="top">
                      <span className="">사용자</span>
                    </th>
                    <td>
                      <FormItem>
                        <div style={{}}>
                          <div className="appManagerListBox">
                            {data.U ? (
                              <AppMaNagerList
                                grpType={USER_GRP}
                                userList={data.U.users}
                                pstnList={data.U.pstns}
                                deptList={data.U.depts}
                                dutyList={data.U.dutys}
                                grpList={data.U.grps}
                                returnUserList={result => {
                                  const nData = { ...data.U };
                                  delete nData.users;
                                  this.onChangeData({ U: { ...nData, users: result } });
                                }}
                                returnPstnList={result => {
                                  const nData = { ...data.U };
                                  delete nData.pstns;
                                  this.onChangeData({ U: { ...nData, pstns: result } });
                                }}
                                returnDetpList={result => {
                                  const nData = { ...data.U };
                                  delete nData.depts;
                                  this.onChangeData({ U: { ...nData, depts: result } });
                                }}
                                returnDutyList={result => {
                                  const nData = { ...data.U };
                                  delete nData.dutys;
                                  this.onChangeData({ U: { ...nData, dutys: result } });
                                }}
                                returnGrpList={result => {
                                  const nData = { ...data.U };
                                  delete nData.grps;
                                  this.onChangeData({ U: { ...nData, grps: result } });
                                }}
                                delFlag
                              />
                            ) : (
                              ''
                            )}
                          </div>
                          <div className="btnText-wrap">
                            <Button
                              className="btnText"
                              onClick={() => {
                                this.managerOrgOpen(USER_GRP);
                              }}
                            >
                              <Icon type="plus-circle" />
                              {intlObj.get(messages.find)}
                            </Button>
                          </div>
                        </div>
                      </FormItem>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {data.SEC_YN === 'Y' && (
              <div className="buttonWrapper">
                {CHILD_CNT && CHILD_CNT > 0 ? (
                  <>
                    하위메뉴 일괄적용
                    <Switch
                      checkedChildren={<Icon type="check" />}
                      unCheckedChildren={<Icon type="close" />}
                      onChange={checked => this.setState({ INHERIT: checked })}
                    />
                  </>
                ) : (
                  ''
                )}
                <StyledButton
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    feed.showConfirm(intlObj.get(messages.saveConfirm), '', () => {
                      const { A, U } = dataP;
                      const delList = [];
                      const newA = [...data.A.users, ...data.A.pstns, ...data.A.depts, ...data.A.dutys, ...data.A.grps]; // object to Array
                      const newU = [...data.U.users, ...data.U.pstns, ...data.U.depts, ...data.U.dutys, ...data.U.grps]; // object to Array

                      if (newA.findIndex(item => !item.AUTH_TYPE) > -1 || newU.findIndex(item => !item.AUTH_TYPE) > -1) {
                        feed.error('권한이 선택 되지 않았습니다.');
                        return '';
                      }

                      A.forEach(m => {
                        if (newA.findIndex(i => Number(i.ACNT_ID) === Number(m.ACNT_ID) && i.ACNT_TYPE === m.ACNT_TYPE) === -1) {
                          delList.push(m);
                        }
                      });

                      U.forEach(m => {
                        if (newU.findIndex(i => Number(i.ACNT_ID) === Number(m.ACNT_ID) && i.ACNT_TYPE === m.ACNT_TYPE) === -1) {
                          delList.push(m);
                        }
                      });

                      if (data.SYS_YN === 'X') {
                        data.SYS_YN = 'N';
                      }

                      const resultData = { ...data };
                      resultData.delList = acntIdStringtoInteger(delList);
                      resultData.A = acntIdStringtoInteger(newA);
                      resultData.U = acntIdStringtoInteger(newU);
                      const { INHERIT } = this.state;
                      updateBizMenuAuth(resultData, Number(BIZGRP_ID), Number(MENU_ID), INHERIT, history);
                    });
                  }}
                >
                  {intlObj.get(messages.save)}
                </StyledButton>
              </div>
            )}
          </Form>
        </StyleBizMenuAuthSetting>
      </div>
    );
  }
}
BizMenuAuthSetting.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  dataP: PropTypes.object.isRequired,
  updateBizMenuAuth: PropTypes.func.isRequired,
  getBizMenuAuthInfo: PropTypes.func.isRequired,
  loadingOn: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    getBizMenuAuthInfo: (BIZGRP_ID, MENU_ID) => dispatch(actions.getBizMenuAuthInfo(BIZGRP_ID, MENU_ID)),
    updateBizMenuAuth: (dataList, BIZGRP_ID, MENU_ID, INHERIT) => dispatch(actions.updateBizMenuAuth(dataList, BIZGRP_ID, MENU_ID, INHERIT)),
    loadingOn: () => dispatch(actionsLoading.loadingOn()),
  };
}

const mapStateToProps = createStructuredSelector({
  dataP: selectors.makeBizMenuAuthInfo(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'admin/AdminMain/Menu/BizMenuReg/BizMenuAuthSetting', reducer });
const withSaga = injectSaga({ key: 'admin/AdminMain/Menu/BizMenuReg/BizMenuAuthSetting', saga });

export default injectIntl(compose(withReducer, withSaga, withConnect)(BizMenuAuthSetting));
