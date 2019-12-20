import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import styled from 'styled-components';
import iconDelete from 'images/common/widget-icon-delete.png';

const DeleteItem = styled.button`
  width: 100%;
  height: 30px;
  background: url(${iconDelete}) no-repeat 0 50%;
  opacity: 0.3;

  &:hover {
    opacity: 1;
  }
`;

const DraggableDragSpec = {
  beginDrag(props) {
    const { user, setIsDragged } = props;

    setIsDragged();
    return {
      EMP_NO: user.EMP_NO,
    };
  },
  endDrag(props) {
    const { dndChangePositionCallback, setIsDraggedEnd } = props;

    setIsDraggedEnd();
    dndChangePositionCallback();
  },
};
const DraggableDropSpec = {
  hover(props, monitor) {
    const draggedEmpNo = monitor.getItem().EMP_NO;
    if (draggedEmpNo !== props.user.EMP_NO) {
      props.dndChangePosition(draggedEmpNo, props.user.EMP_NO);
    }
  },
};
const collectDrag = connect => ({ connectDragSource: connect.dragSource() });
const collectDrop = connect => ({ connectDropTarget: connect.dropTarget() });

class Draggable extends Component {
  deleteItem = () => {
    const { type, user, dept, pstn, duty, grp, deleteCallback } = this.props;

    let id = '';

    switch (type) {
      case 'user':
        id = user.USER_ID;
        break;
      case 'dept':
        id = { dept };
        break;
      case 'pstn':
        id = { pstn };
        break;
      case 'duty':
        id = { duty };
        break;
      case 'grp':
        id = { grp };
        break;
      default:
        break;
    }

    // 콜백 함수 호출
    deleteCallback(id, type);
  };

  render() {
    const { connectDragSource, connectDropTarget } = this.props;

    /* eslint-disable */
    return connectDropTarget(connectDragSource(
      <div>
        <div style={{width:'calc(100% - 30px)', float:'left', paddingLeft: 10}}>
          {this.props.children}
        </div>
        <div style={{width: 20, float:'left'}}>
          <DeleteItem onClick={this.deleteItem} />
        </div>
      </div>
    ));
    /* eslint-disable */
  }
}

Draggable.propTypes = {
  user: PropTypes.object,
  dept: PropTypes.object,
  pstn: PropTypes.object,
  duty: PropTypes.object,
  grp: PropTypes.object,
  type: PropTypes.string.isRequired, // user, dept, pstn, duty, grp
  deleteCallback: PropTypes.func.isRequired,
  dndChangePosition: PropTypes.func.isRequired,
  dndChangePositionCallback: PropTypes.func,

  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,

  setIsDragged: PropTypes.func,
  setIsDraggedEnd: PropTypes.func,
};

Draggable.defaultProps = {
  user: undefined,
  dept: undefined,
  pstn: undefined,
  duty: undefined,
  grp: undefined,

  setIsDragged: undefined,
  setIsDraggedEnd: undefined,
};

const dragHighOrderApp = DragSource('Draggable', DraggableDragSpec, collectDrag)(Draggable);
export default DropTarget('Draggable', DraggableDropSpec, collectDrop)(dragHighOrderApp);
