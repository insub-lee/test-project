import React from 'react';
import PropTypes from 'prop-types';
// import { fromJS } from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
// import { put } from 'redux-saga/effects';

import Footer from 'containers/admin/App/Footer';
import { Input, Button, Select } from 'antd';
import Organization from 'containers/portal/components/Organization';
import MemberList from 'components/OrgReturnView';
import { BtnDkGray } from 'containers/store/components/uielements/buttons.style';


import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
// import * as constants from './constants';
import * as actions from './actions';
import VgroupTree from '../../components/VgroupTree';
import StyleVGroup from './StyleVGroup';
import StyleVGroupForm from './StyleVGroupForm';

const Option = Select.Option; // eslint-disable-line

class VgroupAdmin extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      // vgroupTreeList: [],
      managerSetMembers: [],
      userSetMembers: [],
      deptSetMembers: [],
      mOrgShow: false,
      uOrgShow: false,
      searchKeyword: '',
      selectedIndex: -1,
      // title: '',
      // GRP_CD: '',
      GRP_ID: 0,  //eslint-disable-line
      PRNT_ID: 0,  //eslint-disable-line
      NAME_KOR: '',
      NAME_ENG: '',
      NAME_CHN: '',
      SITE_ID: 1,
      showAddMember: false,
    };
    this.props.getVgroupTreeList(this.state.searchKeyword, this.state.SITE_ID);
    this.props.getVgroupComboList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.setVgroupTreeList.length > 0) {
      this.setState({
        managerSetMembers: nextProps.setVgroupManagerList,
        userSetMembers: nextProps.setVgroupMemberUList,
        deptSetMembers: nextProps.setVgroupMemberDList,
      });
    }
  }

  onChangeKeyword = (e) => {
    this.setState({ searchKeyword: e.target.value });
  }
  onChangeSite = (val) => {
    this.setState({
      SITE_ID: val,
      selectedIndex: -1,
      // GRP_CD: '',
      NAME_KOR: '',
      NAME_ENG: '',
      NAME_CHN: '',
      managerSetMembers: [],
      userSetMembers: [],
      deptSetMembers: [],
      showAddMember: false,
    });
    this.props.getVgroupTreeList(this.state.searchKeyword, val);
    this.props.getVgroupDtlInfo(-1, this.state.SITE_ID);
  }
  mOrgOpen = () => {
    this.setState({
      mOrgShow: true,
    });
  };
  mOrgClose = () => {
    this.setState({
      mOrgShow: false,
    });
  };
  uOrgOpen = () => {
    this.setState({
      uOrgShow: true,
    });
  };
  uOrgClose = () => {
    this.setState({
      uOrgShow: false,
    });
  };

  // // 관리자 갱신
  // updateManagerList = () => {
  //   this.props.vgroupManagerUpdate(this.state.GRP_ID, this.state.managerSetMembers);
  // };
  // // 멤버 갱신
  // updateMemberList = () => {
  //   this.props.vgroupMemberUpdate(
  //     this.state.GRP_ID,
  //     this.state.userSetMembers,
  //     this.state.deptSetMembers,
  //   );
  // };
  updateMember = () => {
    this.props.vgroupMemberUpdate(
      this.state.GRP_ID,
      this.state.managerSetMembers,
      this.state.userSetMembers,
      this.state.deptSetMembers,
    );
  }

  render() {
    // 조직도로부터 데이터 가져오는 함수
    const getDataFromOrgMng = (resultObj) => {
      const { managerSetMembers } = this.state;
      // const {
      //   handleSaveSettingMembers,
      // } = this.props;

      const managerSetMembersCopy = managerSetMembers.slice();
      // const managerSetMembersCopy = [];
      const managerSetMembersFromOrganization = resultObj.selectedUsers;

      managerSetMembersFromOrganization.map((obj) => {
        if (managerSetMembers.findIndex(o => o.USER_ID === obj.USER_ID) === -1) {
          managerSetMembersCopy.push(obj);
        }
        return managerSetMembersCopy;
      });

      this.setState({
        managerSetMembers: managerSetMembersCopy,
      });

      // put({ type: constants.SET_VGROUP_MANAGER_LIST, payload: managerSetMembersCopy });
    };

    const returnManagerList = (resultObj) => {
      this.setState({
        managerSetMembers: resultObj,
      });
    };

    const getDataFromOrgMem = (resultObj) => {
      const { userSetMembers } = this.state;
      // const {
      //   handleSaveSettingMembers,
      // } = this.props;

      const userSetMembersCopy = userSetMembers.slice();
      const userSetMembersFromOrganization = resultObj.selectedUsers;

      userSetMembersFromOrganization.map((obj) => {
        if (userSetMembers.findIndex(o => o.USER_ID === obj.USER_ID) === -1) {
          userSetMembersCopy.push(obj);
        }
        return userSetMembersCopy;
      });

      this.setState({
        userSetMembers: userSetMembersCopy,
      });

      const { deptSetMembers } = this.state;
      const deptSetMembersCopy = deptSetMembers.slice();
      const deptSetMembersFromOrganization = resultObj.checkedDept;

      deptSetMembersFromOrganization.map((obj) => {
        if (deptSetMembers.findIndex(o => o.id === obj.id) === -1) {
          deptSetMembersCopy.push(obj);
        }
        return deptSetMembersCopy;
      });

      this.setState({
        deptSetMembers: deptSetMembersCopy,
      });
    };

    const returnUserList = (resultObj) => {
      this.setState({
        userSetMembers: resultObj,
      });
    };
    const returnDeptList = (resultObj) => {
      this.setState({
        deptSetMembers: resultObj,
      });
    };

    const comboOptions = comboList => (
      comboList.map(item =>
        <Option value={item.SITE_ID}>{item.NAME_KOR}</Option>)
    );
    const handleTreeOnClick = (node) => {
      // 그룹 관리자/멤버 조회 및 출력
      this.props.getVgroupDtlInfo(node.GRP_ID, this.state.SITE_ID);

      this.setState({
        // title: node.title,
        // GRP_CD: node.GRP_CD,
        GRP_ID: node.GRP_ID,  //eslint-disable-line
        selectedIndex: node.GRP_ID,
        PRNT_ID: node.PRNT_ID, //eslint-disable-line
        NAME_KOR: node.NAME_KOR,
        NAME_ENG: node.NAME_ENG,
        NAME_CHN: node.NAME_CHN,
        showAddMember: true,
      });
    };
    const returnVgroupInsert = (SITE_ID, GRP_ID, PRNT_ID, NAME_KOR, NAME_ENG, NAME_CHN) => {
      this.setState({ selectedIndex: GRP_ID });
      this.props.vgroupInfoInsert(SITE_ID, GRP_ID, PRNT_ID, NAME_KOR, NAME_ENG, NAME_CHN);
    };
    const returnVgroupUpdate = (STIE_ID, GRP_ID, NAME_KOR, NAME_ENG, NAME_CHN) => {
      this.setState({ selectedIndex: GRP_ID });
      this.props.vgroupInfoUpdate(STIE_ID, GRP_ID, NAME_KOR, NAME_ENG, NAME_CHN);
    };
    const returnVgroupDelete = (STIE_ID, GRP_ID) => {
      const prntID = this.state.PRNT_ID;
      this.setState({
        selectedIndex: prntID,
        NAME_KOR: '',
        NAME_ENG: '',
        NAME_CHN: '',
        showAddMember: false,
      });
      this.props.vgroupInfoDelete(STIE_ID, GRP_ID);
    };
    const saveButton = () => (
      this.state.showAddMember ?
        <BtnDkGray onClick={this.updateMember}>저장</BtnDkGray> : ''
    );
    return (
      <div>
        <StyleVGroup>
          <h3 className="pageTitle list">가상그룹 관리</h3>
          <div className="pageContent" style={{ display: 'inline-block', width: '100%', height: 'calc(100vh - 170px)' }}>
            <div className="vgroupTreeWrapper">
              <div>
                <Select defaultValue={1} onChange={this.onChangeSite}>
                  <Option value={0}>공통</Option>
                  {comboOptions(this.props.setVgroupComboList)}
                </Select>
                <VgroupTree
                  treeData={this.props.setVgroupTreeList}
                  SITE_ID={this.state.SITE_ID}
                  selectedIndex={this.state.selectedIndex}
                  onClick={handleTreeOnClick}
                  returnVgroupInsert={returnVgroupInsert}
                  returnVgroupDelete={returnVgroupDelete}
                  returnVgroupUpdate={returnVgroupUpdate}
                />
              </div>
            </div>
            <div className="vgroupContents">
              <h4>{ /* this.state.title */ }가상그룹 명칭</h4>
              <StyleVGroupForm>
                <table className="adminTbl vGroupTbl">
                  <tbody>
                    {/* <tr>
                      <th>
                        <label htmlFor="v1">가상그룹 코드</label>
                      </th>
                      <td style={{ wordBreak: 'break-all' }}>
                        <Input id="v1" value={this.state.GRP_CD} readOnly className="readonly" />
                      </td>
                    </tr> */}
                    <tr>
                      <th>
                        <label htmlFor="v2">가상그룹 명(KOR)</label>
                      </th>
                      <td>
                        <Input id="v2" value={this.state.NAME_KOR} readOnly className="readonly" />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="v3">가상그룹 명(ENG)</label>
                      </th>
                      <td>
                        <Input id="v3" value={this.state.NAME_ENG} readOnly className="readonly" />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="v4">가상그룹 명(CHN)</label>
                      </th>
                      <td>
                        <Input id="v4" value={this.state.NAME_CHN} readOnly className="readonly" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </StyleVGroupForm>

              <h4>가상그룹 관리자</h4>
              <Organization
                show={this.state.mOrgShow}
                closeModal={this.mOrgClose}
                isTreeCheckbox={false}
                userTab={true}
                getDataFromOrganization={getDataFromOrgMng}
                selectedUsers={this.state.managerSetMembers.slice()}
              />
              <MemberList
                managerList={this.state.managerSetMembers}
                delFlag={true}
                returnManagerList={returnManagerList}
              />
              <div className="buttonWrapper">
                <Button onClick={this.mOrgOpen} title="조직도열기" className="addRow" disabled={!this.state.showAddMember} />
              </div>
              <h4 style={{ marginTop: 40 }}>가상그룹 멤버</h4>
              {this.state.uOrgShow ?
                <Organization
                  show={this.state.uOrgShow}
                  closeModal={this.uOrgClose}
                  userTab={true}
                  getDataFromOrganization={getDataFromOrgMem}
                  selectedUsers={this.state.userSetMembers.slice()}
                />
                :
                ''
              }
              <MemberList
                userList={this.state.userSetMembers}
                deptList={this.state.deptSetMembers}
                delFlag={true}
                isTreeCheckbox={true}
                returnUserList={returnUserList}
                returnDetpList={returnDeptList}
              />
              <div className="buttonWrapper">
                <Button onClick={this.uOrgOpen} title="조직도열기" className="addRow" disabled={!this.state.showAddMember} />
                {saveButton()}
              </div>
            </div>
            {/* <Footer /> */}
          </div>
          <Footer />
        </StyleVGroup>
      </div>
    );
  }
}

VgroupAdmin.propTypes = {
  getVgroupTreeList: PropTypes.func, //eslint-disable-line
  setVgroupTreeList: PropTypes.array, //eslint-disable-line
  getVgroupComboList: PropTypes.func, //eslint-disable-line
  setVgroupComboList: PropTypes.array, //eslint-disable-line
  getVgroupDtlInfo: PropTypes.func, //eslint-disable-line
  setVgroupManagerList: PropTypes.array, //eslint-disable-line
  setVgroupMemberUList: PropTypes.array, //eslint-disable-line
  setVgroupMemberDList: PropTypes.array, //eslint-disable-line
  managerSetMembers: PropTypes.array, //eslint-disable-line
  vgroupInfoInsert: PropTypes.func, //eslint-disable-line
  vgroupInfoUpdate: PropTypes.func, //eslint-disable-line
  vgroupInfoDelete: PropTypes.func, //eslint-disable-line
  vgroupManagerUpdate: PropTypes.func, //eslint-disable-line
  vgroupMemberUpdate: PropTypes.func, //eslint-disable-line
};

const mapDispatchToProps = dispatch => ({
  getVgroupTreeList: (searchKeyword, SITE_ID) =>
    dispatch(actions.getVgroupTreeList(searchKeyword, SITE_ID)),
  getVgroupComboList: () =>
    dispatch(actions.getVgroupComboList()),
  getVgroupDtlInfo: (grpId, SITE_ID) =>
    dispatch(actions.getVgroupDtlInfo(grpId, SITE_ID)),
  vgroupInfoInsert: (SITE_ID, GRP_ID, PRNT_ID, NAME_KOR, NAME_ENG, NAME_CHN) => {
    dispatch(actions.vgroupInfoInsert(SITE_ID, GRP_ID, PRNT_ID, NAME_KOR, NAME_ENG, NAME_CHN));
  },
  vgroupInfoUpdate: (SITE_ID, GRP_ID, NAME_KOR, NAME_ENG, NAME_CHN) => {
    dispatch(actions.vgroupInfoUpdate(SITE_ID, GRP_ID, NAME_KOR, NAME_ENG, NAME_CHN));
  },
  vgroupInfoDelete: (SITE_ID, GRP_ID) =>
    dispatch(actions.vgroupInfoDelete(SITE_ID, GRP_ID)),
  vgroupManagerUpdate: (GRP_ID, managerSetMembers) => {
    dispatch(actions.vgroupManagerUpdate(GRP_ID, managerSetMembers));
  },
  vgroupMemberUpdate: (GRP_ID, managerSetMembers, userSetMembers, deptSetMembers) => {
    dispatch(actions.vgroupMemberUpdate(GRP_ID, managerSetMembers, userSetMembers, deptSetMembers));
  },
});

const mapStateToProps = createStructuredSelector({
  setVgroupTreeList: selectors.makeSelectVgroupTreeList(),
  setVgroupComboList: selectors.makeSelectVgroupComboList(),
  setVgroupManagerList: selectors.makeSelectVgroupManagerList(),
  setVgroupMemberUList: selectors.makeSelectVgroupMemberUList(),
  setVgroupMemberDList: selectors.makeSelectVgroupMemberDList(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'VgroupAdmin', saga });
const withReducer = injectReducer({ key: 'VgroupAdmin', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(VgroupAdmin);
