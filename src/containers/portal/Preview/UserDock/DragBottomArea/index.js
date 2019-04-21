import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

const DragBottomAreaDropSpec = {
  hover(props) {
    const { scrollTopForDnD } = props;

    scrollTopForDnD();
  },
};

const collectDrop = connect => ({ connectDropTarget: connect.dropTarget() });

class DragBottomArea extends React.Component {
  render() {
    const { isDockItemDragged, connectDropTarget, position } = this.props;

    let style = {};
    if (position === 'right') {
      style = {
        position: 'fixed',
        width: '100%',
        height: '30px',
        background: 'transparent',
        bottom: '20px',
        display: 'none',
      };
    } else {
      style = {
        position: 'fixed',
        width: '30px',
        height: '100%',
        background: 'transparent',
        right: '0px',
        display: 'none',
      };
    }

    if (isDockItemDragged) {
      style.display = 'block';
    } else {
      style.display = 'none';
    }

    return connectDropTarget(<div style={style} />);
  }
}

DragBottomArea.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isDockItemDragged: PropTypes.bool.isRequired,
  position: PropTypes.string.isRequired,
};

export default DropTarget('SamplePage', DragBottomAreaDropSpec, collectDrop)(DragBottomArea);
