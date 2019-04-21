import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

class NotDraggable extends Component {
  deleteItem = () => {
    const {
      type,
      user,
      dept,
      pstn,
      duty,
      grp,
      deleteCallback,
    } = this.props;

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
  }
  render() {
    return (
      <div>
        <div style={{ width: 'calc(100% - 30px)', float: 'left', paddingLeft: 10 }}>
          {this.props.children}
        </div>
        <div style={{ width: 20, float: 'left' }}>
          <DeleteItem onClick={this.deleteItem} />
        </div>
      </div>
    );
  }
}

NotDraggable.propTypes = {
  user: PropTypes.object,
  dept: PropTypes.object,
  pstn: PropTypes.object,
  duty: PropTypes.object,
  grp: PropTypes.object,
  type: PropTypes.string.isRequired, // user, dept, pstn, duty, grp
  deleteCallback: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

NotDraggable.defaultProps = {
  user: undefined,
  dept: undefined,
  pstn: undefined,
  duty: undefined,
  grp: undefined,
};

export default NotDraggable;
