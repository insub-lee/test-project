import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import UserProfile from '../../../components/UserProfile';

const userProfileDragSpec = {
  beginDrag(props) {
    const { changeIsWidgetDragged } = props;
    changeIsWidgetDragged();
    return {
      USER_ID: props.userSetMember.USER_ID,
    };
  },
};

const userProfileDropSpec = {
  hover(props, monitor) {
    const draggedUserId = monitor.getItem().USER_ID;
    if (draggedUserId !== props.userSetMember.USER_ID) {
      props.dndChangePosition(draggedUserId, props.userSetMember.USER_ID);
    }
  },
};

const collectDrag = connect => ({ connectDragSource: connect.dragSource() });
const collectDrop = connect => ({ connectDropTarget: connect.dropTarget() });

class UserProfileForSetting extends PureComponent {
  render() {
    const {
      index,
      userSetMember,
      setDeletedMemberIndex,
      connectDragSource,
      connectDropTarget,
    } = this.props;

    return connectDropTarget(connectDragSource(
      <div key={index}>
        <div onClick={() => { setDeletedMemberIndex(userSetMember.USER_ID); }} i={userSetMember.USER_ID} style={{ display: 'inline-block' }}>X</div>
        <UserProfile profile={userSetMember} />
        <hr style={{ borderColor: 'white', borderBottom: 'none', marginTop: '10px' }} />
      </div>
    ));
  }
}

UserProfileForSetting.propTypes = {
  index: PropTypes.number.isRequired,
  userSetMember: PropTypes.object.isRequired,
  setDeletedMemberIndex: PropTypes.func.isRequired,

  // 드래그 앤 드랍을 위한 함수들
  changeIsWidgetDragged: PropTypes.func.isRequired,
  dndChangePosition: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

const dragHighOrderApp = DragSource('UserProfileForSetting', userProfileDragSpec, collectDrag)(UserProfileForSetting);
export default DropTarget('UserProfileForSetting', userProfileDropSpec, collectDrop)(dragHighOrderApp);
