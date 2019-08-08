import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { Form, Button } from 'antd';
import Organization from 'containers/portal/components/Organization';
import OrganizationRole from 'components/OrganizationRole';
import AppMaNagerList from 'components/OrgReturnView';
import * as feed from 'components/Feedback/functions';

import { intlObj, lang } from 'utils/commonUtils';
import messages from '../messages';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import { LinkBtnLgtGray, BtnDkGray, LinkBtnList } from 'containers/admin/components/uielements/buttons.style';
import StyleUserForm from './StyleUserForm';

const FormItem = Form.Item;

class AppUserForm extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      APP_ID: prop.APP_ID,
      VER: prop.VER,
      uv: prop.uv,
      managerOrgShow: false,
      allOrgShow: false,
      managerSetMembers: [],
      userSetMembers: [],
      pstnSetMembers: [],
      deptSetMembers: [],
      dutySetMembers: [],
      grpSetMembers: [],
    };
    // this.props.getInitInfo();
    this.props.getAppUser(this.state.APP_ID, this.state.VER, lang.getLocale(), prop.history);
  }
  // componentDidUpdate(prevProps, prevState) { //eslint-disable-line
  componentWillReceiveProps(nextProps) {
    this.setState({
      managerSetMembers: nextProps.appManagerList,
      userSetMembers: nextProps.userList,
      pstnSetMembers: nextProps.pstnList,
      deptSetMembers: nextProps.deptList,
      dutySetMembers: nextProps.dutyList,
      grpSetMembers: nextProps.grpList,
    });
  }

  managerOrgOpen = () => {
    this.setState({
      managerOrgShow: true,
    });
  };
  managerOrgClose = () => {
    this.setState({
      managerOrgShow: false,
    });
  };
  allOrgOpen = () => {
    this.setState({
      allOrgShow: true,
    });
  };
  allOrgClose = () => {
    this.setState({
      allOrgShow: false,
    });
  };

  render() {
    const {
      history,
    } = this.props;

    // 조직도로부터 데이터 가져오는 함수
    const getDataFromOrganization = (resultObj) => {
      const managerSetMembersFromOrganization = resultObj.selectedUsers;

      this.setState({
        managerSetMembers: managerSetMembersFromOrganization,
      });
    };

    const returnManagerList = (resultObj) => {
      this.setState({
        managerSetMembers: resultObj,
      });
    };
    const returnUserList = (resultObj) => {
      this.setState({
        userSetMembers: resultObj,
      });
    };
    const returnDutyList = (resultObj) => {
      this.setState({
        dutySetMembers: resultObj,
      });
    };
    const returnPstnList = (resultObj) => {
      this.setState({
        pstnSetMembers: resultObj,
      });
    };
    const returnGrpList = (resultObj) => {
      this.setState({
        grpSetMembers: resultObj,
      });
    };
    const returnDetpList = (resultObj) => {
      this.setState({
        deptSetMembers: resultObj,
      });
    };
    // 조직도로부터 데이터 가져오는 함수
    const getDataFromOrganizationAll = (resultObj) => {
      // 구성원
      const userSetMembersFromOrganization = resultObj.selectedUsers;

      this.setState({
        userSetMembers: userSetMembersFromOrganization,
      });

      // 직워
      const pstnSetMembersFromOrganization = resultObj.checkedPstn;

      this.setState({
        pstnSetMembers: pstnSetMembersFromOrganization,
      });

      // 부서
      const deptSetMembersFromOrganization = resultObj.checkedDept;

      this.setState({
        deptSetMembers: deptSetMembersFromOrganization,
      });

      // 직책
      const dutySetMembersFromOrganization = resultObj.checkedDuty;

      this.setState({
        dutySetMembers: dutySetMembersFromOrganization,
      });

      // 가상그룹
      const grpSetMembersFromOrganization = resultObj.checkedGrp;

      this.setState({
        grpSetMembers: grpSetMembersFromOrganization,
      });
    };

    // 저장하기
    const appUserSaveOn = () => {
      this.props.appUserSave(
        this.state.APP_ID,
        this.state.VER,
        history,
        this.state.managerSetMembers,
        this.state.userSetMembers,
        this.state.pstnSetMembers,
        this.state.deptSetMembers,
        this.state.dutySetMembers,
        this.state.grpSetMembers,
        this.state.uv,
      );
    };

    const appUserSaveChk = () => {
      feed.showConfirm(`${intlObj.get(messages.updateGoing)}`, '', appUserSaveOn);
    };

    return (
      <div>
        {
          this.state.managerOrgShow ?
          // <Organization
          //   show={this.state.managerOrgShow}
          //   closeModal={this.managerOrgClose}
          //   userTab={true}
          //   getDataFromOrganization={getDataFromOrganization}
          //   isTreeCheckbox={false}
          //   // 조직도로 가져갈 데이터
          //   selectedUsers={this.state.managerSetMembers.slice()}
          // />
            <OrganizationRole
              show={this.state.managerOrgShow}
              closeModal={this.managerOrgClose}
              getDataFromOrganization={getDataFromOrganization}
              // 조직도로 가져갈 데이터
              selectedUsers={this.state.managerSetMembers.slice()}
              ROLE_CD="SM"
            />
          :
            ''
        }
        <Organization
          show={this.state.allOrgShow}
          closeModal={this.allOrgClose}
          userTab={true}
          pstnTab={true}
          dutyTab={true}
          grpTab={true}
          getDataFromOrganization={getDataFromOrganizationAll}
          // 조직도로 가져갈 데이터
          selectedUsers={this.state.userSetMembers.slice()}
          checkedDept={this.state.deptSetMembers.slice()}
          checkedPstn={this.state.pstnSetMembers.slice()}
          checkedDuty={this.state.dutySetMembers.slice()}
          checkedGrp={this.state.grpSetMembers.slice()}
        />
        <StyleUserForm>
          <Form>
            {/* <h2 className="pageTitle">{intlObj.get(messages.appUpdateTitle)}</h2>
            <h3 className="sectionTitle">{intlObj.get(messages.appInfo)}</h3> */}
            {/* 입력폼 테이블 */}

            {/* <h3 className="sectionTitle">{intlObj.get(messages.verInfo)}</h3> */}
            <div style={{ minHeight: 'calc(100vh - 310px)' }}>
              <h4>{intlObj.get(messages.manager)} ({intlObj.get(messages.groupCharge)})</h4>
              <FormItem>
                <div style={{ position: 'relative' }}>
                  <div className="appManagerListBox">
                    {
                      this.state.managerSetMembers.length > 0 ?
                        (<AppMaNagerList
                          managerList={this.state.managerSetMembers}
                          delFlag={true}
                          returnManagerList={returnManagerList}
                        />
                        ) : ('')
                    }
                  </div>
                  <Button
                    className="btnText edit"
                    onClick={this.managerOrgOpen}
                  >
                    {intlObj.get(messages.edit)}
                  </Button>
                </div>
              </FormItem>

              {/* <h3 className="sectionTitle">{intlObj.get(messages.permissions)}</h3> */}
              <h4>{intlObj.get(messages.target)}</h4>
              <FormItem>
                <div style={{ position: 'relative' }}>
                  <div className="appManagerListBox">
                    {/* {this.state.userSetMembers.length > 0 ?
                      (<AppMaNagerList
                        userList={this.state.userSetMembers}
                        pstnList={this.state.pstnSetMembers}
                        delFlag={true}
                      />
                      ) : ('')
                    } */}
                    <AppMaNagerList
                      userList={this.state.userSetMembers}
                      pstnList={this.state.pstnSetMembers}
                      deptList={this.state.deptSetMembers}
                      dutyList={this.state.dutySetMembers}
                      grpList={this.state.grpSetMembers}
                      returnUserList={returnUserList}
                      returnDutyList={returnDutyList}
                      returnPstnList={returnPstnList}
                      returnGrpList={returnGrpList}
                      returnDetpList={returnDetpList}
                      delFlag={true}
                    />
                  </div>
                  <Button
                    className="btnText edit"
                    onClick={this.allOrgOpen}
                  >
                    {intlObj.get(messages.edit)}
                  </Button>
                </div>
              </FormItem>
            </div>

            <div className="buttonWrapper">
              <Link to="/admin/adminmain/app" style={{ float: 'left' }}>
                <LinkBtnList>{intlObj.get(messages.list)}</LinkBtnList>
              </Link>
              <Link to="/admin/adminmain/app">
                <LinkBtnLgtGray>{intlObj.get(messages.cancel)}</LinkBtnLgtGray>
              </Link>
              <BtnDkGray onClick={appUserSaveChk}>{intlObj.get(messages.save)}</BtnDkGray>
            </div>
          </Form>
        </StyleUserForm>
      </div>
    );
  }
}

AppUserForm.propTypes = {
  history: PropTypes.object, //eslint-disable-line
  appUserSave: PropTypes.func, //eslint-disable-line
  handleSaveSettingMembers: PropTypes.func, //eslint-disable-line
  getAppUser: PropTypes.func, //eslint-disable-line
  appManagerList: PropTypes.array, //eslint-disable-line
  userList: PropTypes.array, //eslint-disable-line
  dutyList: PropTypes.array, //eslint-disable-line
  pstnList: PropTypes.array, //eslint-disable-line
  grpList: PropTypes.array, //eslint-disable-line
  deptList: PropTypes.array, //eslint-disable-line
};

const mapDispatchToProps = dispatch => (
  {
    getAppUser: (APP_ID, VER, LANG, history) => {
      dispatch(actions.getAppUser(APP_ID, VER, LANG, history));
    },

    appUserSave: (
      APP_ID,
      VER,
      history,
      managerSetMembers,
      userSetMembers,
      pstnSetMembers,
      deptSetMembers,
      dutySetMembers,
      grpSetMembers,
      uv,
    ) => {
      dispatch(actions.appUserSave(
        APP_ID,
        VER,
        history,
        managerSetMembers,
        userSetMembers,
        pstnSetMembers,
        deptSetMembers,
        dutySetMembers,
        grpSetMembers,
        uv,
      ));
    },
  }
);

const mapStateToProps = createStructuredSelector({
  appManagerList: selectors.makeSelectAppManagerList(),
  userList: selectors.makeSelectUserList(),
  dutyList: selectors.makeSelectDutyList(),
  pstnList: selectors.makeSelectPstnList(),
  grpList: selectors.makeSelectGrpList(),
  deptList: selectors.makeSelectDeptList(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'admin/AdminMain/App/AppUserForm', saga });
const withReducer = injectReducer({ key: 'admin/AdminMain/App/AppUserForm', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AppUserForm);
