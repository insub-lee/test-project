import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

const DragTopAreaDropSpec = {
  hover(props) {
    const { scrollDownForDnD } = props;

    scrollDownForDnD();
  },
};

const collectDrop = connect => ({ connectDropTarget: connect.dropTarget() });

class DragTopArea extends React.Component {
  render() {
    const { isDockItemDragged, connectDropTarget, position } = this.props;

    let style = {};
    if (position === 'right') {
      style = {
        position: 'fixed',
        width: '100%',
        height: '30px',
        background: 'transparent',
        top: '60px',
        display: 'none',
      };
    } else {
      style = {
        position: 'fixed',
        width: '30px',
        height: '100%',
        background: 'transparent',
        left: '0px',
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

DragTopArea.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isDockItemDragged: PropTypes.bool.isRequired,
  position: PropTypes.string.isRequired,
};

export default DropTarget('SamplePage', DragTopAreaDropSpec, collectDrop)(DragTopArea);
