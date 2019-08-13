import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { BtnDkGray, BtnLgtGray } from 'containers/store/components/uielements/buttons.style';
import update from 'react-addons-update';
import Scrollbar from 'react-custom-scrollbars';
import Organization from 'containers/portal/components/Organization';
import * as actions from './actions';
import * as selectors from './selectors';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import UserProfileForSetting from './userProfileForSetting';
import WidgetSettingStyle from './widgetSettingStyle';
import { BtnIconAdd } from '../../../components/uielements/styles/buttons.style';

class WidgetSetting extends PureComponent {
  constructor(props) {
    super(props);

    props.handleLoadingSettingMembers();

    this.state = {
      userSetMembers: this.props.userSetMembers,
      deletedMemberIndex: [],
      isWidgetDragged: false,
      show: false,
    };
  }

  // ****************** 드래그 앤 드랍을 위한 함수들 ******************
  changeIsWidgetDragged = () => {
    const {
      isWidgetDragged
    } = this.state;

    if (!isWidgetDragged) {
      this.setState({
        isWidgetDragged: true,
      });
    } else {
      this.setState({
        isWidgetDragged: false,
      });
    }
  }

  dndChangePosition = (userId, afterUserId) => {
    const {
      userSetMembers,
    } = this.state;

    const index = userSetMembers.findIndex(i => i.USER_ID === userId);
    const afterIndex = userSetMembers.findIndex(i => i.USER_ID === afterUserId);

    let temp = userSetMembers[index];
    let temp2 = userSetMembers[afterIndex];

    let userSetMembersCopy = userSetMembers.slice();
    
    userSetMembersCopy.splice(index, 1, temp2);
    userSetMembersCopy.splice(afterIndex, 1, temp);

    this.setState({
      userSetMembers: userSetMembersCopy,
    });
  }
  // ****************** 드래그 앤 드랍을 위한 함수들 끝 ******************

  getUserProfiles = () => {
    const { userSetMembers } = this.state;

    const result = userSetMembers.map((userSetMember, index) => {
      if (userSetMember.isShow !== false) {
        return <UserProfileForSetting
        index={index} userSetMember={userSetMember} setDeletedMemberIndex={this.setDeletedMemberIndex} changeIsWidgetDragged={this.changeIsWidgetDragged} dndChangePosition={this.dndChangePosition} sortUserSetMembers={this.sortUserSetMembers} />;
      }
    });
    return result;
  }

  // ****************** 구성원 삭제 함수 ******************
  setDeletedMemberIndex = (USER_ID) => {
    const {
      userSetMembers,
      deletedMemberIndex
    } = this.state;
    const index = userSetMembers.findIndex(userSetMember => userSetMember.USER_ID === USER_ID);
    let userSetMembersCopy = update(userSetMembers, {
      [index]: {
        isShow: {
          $set: false,
        },
      },
    });

    this.setState({
      userSetMembers: userSetMembersCopy,
    });

    deletedMemberIndex.push(USER_ID);
  }

  removeMember = () => {
    const {
      deletedMemberIndex,
      userSetMembers,
    } = this.state;
    const {
      handleSaveSettingMembers,
      closeModal,
    } = this.props;

    const userSetMembersCopy = userSetMembers.filter(userSetMember => userSetMember.isShow !== false);

    handleSaveSettingMembers(userSetMembersCopy, deletedMemberIndex);

    this.setState({
      deletedMemberIndex: [],
    });

    closeModal();
  }
  // ****************** 구성원 삭제 함수 끝 ******************

  // ****************** 조직도 관련 함수 ******************
  setOrganizationShow = () => {
    this.setState({
      show: true,
    });
  }

  closeModalForOrganization = () => {
    this.setState({
      show: false,
    });
  }

  // 조직도로부터 데이터 가져오는 함수
  getDataFromOrganization = (resultObj) => {
    const { userSetMembers } = this.state;
    const {
      handleSaveSettingMembers,
    } = this.props;

    const userSetMembersFromOrganization = resultObj.selectedUsers;

    let userSetMembersCopy = userSetMembers.slice();
    userSetMembersFromOrganization.map(obj => {
      if (userSetMembers.findIndex((o) => o.USER_ID === obj.USER_ID) === -1) {
        userSetMembersCopy.push(obj);
      }
    });

    this.setState({
      userSetMembers: userSetMembersCopy,
    });
  }
  // ****************** 조직도 관련 함수 끝 ******************

  render() {
    const {
      closeModal,
      handleAddMember,
      handleDeleteMember,
      handleDndChangePositionMember,
      userSetMembers,
      handelDeleteAllMember,
      item,
    } = this.props;
    const { show } = this.state;
    const content = this.getUserProfiles();

    return (
      <WidgetSettingStyle>
        
        <Organization
          isModal={false}
          userTab={true}
          isTreeCheckbox={false}
          addCallback={handleAddMember}
          deleteCallback={handleDeleteMember}
          dndChangePositionCallback={handleDndChangePositionMember}
          deleteAllCallback={handelDeleteAllMember}
          selectedUsers={userSetMembers}
          isDraggable={true}
          item={item}
          show={true}
        />
        {/* <Organization
          // 모달 여부
          isModal={Boolean (Default : true)}
          show={Boolean}
          closeModal={Function}
          // isModal = true, isProfile = false일 때, 확인 버튼 클릭 시, 선택 목록의 데이터들을 받을 수 있는 콜백 함수
          getDataFromOrganization={Function}
          // isModal = false, isProfile = false일 때, 선택 목록 데이터들의 추가/삭제 콜백 함수(액션 발행 함수를 전달)
          addCallback={Function}
          deleteCallback={Function}
          deleteAllCallback={Function}
          
          // 조직도 탭 여부
          userTab={Boolean}
          pstnTab={Boolean}
          dutyTab={Boolean}
          grpTab={Boolean}

          // 조직도 우측 프로필 / 선택 목록 플래그, isProfile = false일 때, 조직도 우측은 선택 목록이 표시
          isProfile={Boolean (Default : false)}
          // isProfile = true일 때 필수, 프로필에 띄워 줄 구성원 데이터
          userProfile={Object}
          // isProfile = false일 때, 조직도의 선택 목록에 올려 줄 데이터
          selectedUsers={Array(Object)}
          checkedDept={Array(Object)}
          checkedPstn={Array(Object)}
          checkedDuty={Array(Object)}
          checkedGrp={Array(Object)}
          // isProfile = false일 때, 구성원의 드래그 앤 드랍 가능 여부
          isDraggable={Boolean}
          // isProfile = false, isDraggable = true일 때 필수, 드래그가 끝났을 때, DB에서 SORT_SQ를 변경시켜 줄 액션 발행 함수
          dndChangePositionCallback={Function}
          
          // 트리 체크박스 유무
          isTreeCheckbox={Boolean}

          // 가상그룹 탭에서 SITE_ID에 해당하는 가상 그룹을 보여주기 위한 SITE_ID 값
          siteIdParam={Number}
          // 가상그룹 탭에서 SITE_ID를 전달하지 않을 경우, 사이트를 선택해 주기 위한 SELECTBOX 여부
          isDeptSelectbox={Boolean}
        /> */}
      </WidgetSettingStyle>
    );
  }
}

WidgetSetting.propTypes = {
  item: PropTypes.object.isRequired,
  userSetMembers: PropTypes.array.isRequried,
  handleAddMember: PropTypes.func.isRequired,
  handleDeleteMember: PropTypes.func.isRequired,
  handleDndChangePositionMember: PropTypes.func,
  handelDeleteAllMember: PropTypes.func,

  // WidgetSettingModal 로부터 받은 함수
  closeModal: PropTypes.func.isRequired,

  handleLoadingSettingMembers: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userSetMembers: selectors.makeUserSetMembers(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleSaveSettingMembers: (userSetMembers, srchUserIdArr) => dispatch(actions.saveSettingMembers(userSetMembers, srchUserIdArr)),
    handleAddMember: (param, item) => dispatch(actions.addMember(param.users, item)),
    handleDeleteMember: (users, item) => dispatch(actions.deleteMember(users, item)),
    handleDndChangePositionMember: (param, item) => dispatch(actions.dndChangePositionMember(param.users, item)),
    handelDeleteAllMember: item => dispatch(actions.deleteAllMember(item)),

    handleLoadingSettingMembers: () => dispatch(actions.loadingSettingMembers()),
  };
}

const withReducer = injectReducer({ key: 'membersSetting', reducer });
const withSaga = injectSaga({ key: 'membersSetting', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WidgetSetting);
