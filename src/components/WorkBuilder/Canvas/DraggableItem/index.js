import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DraggableStyled from './DraggableStyled';
import CanvasFormLayer from './CanvasFormLayer';
import OptionLayer from '../OptionLayer';

class DraggableItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    };
  }

  setHover = value => {
    this.setState({ isHover: value });
  };

  render() {
    const { setHover } = this;
    const { isHover } = this.state;
    const {
      property: { box, formStuffs },
      provided,
      viewTargetId,
      id,
      action,
    } = this.props;
    return (
      <DraggableStyled
        className={`${viewTargetId === id ? 'active-layer' : ''} ${isHover ? 'hover-layer' : ''}`}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        id={id}
        onClick={e => {
          e.stopPropagation();
          action.activeLayer(id, box.type);
        }}
        onMouseOver={e => {
          e.stopPropagation();
          setHover(true);
        }}
        onMouseOut={e => {
          e.stopPropagation();
          setHover(false);
        }}
        onFocus={e => {
          e.stopPropagation();
          setHover(true);
        }}
        onBlur={e => {
          e.stopPropagation();
          setHover(false);
        }}
      >
        <CanvasFormLayer property={{ formStuffs, box }} viewTargetId={viewTargetId} action={action} />
        {(viewTargetId === id || isHover) && <OptionLayer object={box} action={action} isActive={viewTargetId === id} />}
      </DraggableStyled>
    );
  }
}

DraggableItem.propTypes = {
  panelIndex: PropTypes.number.isRequired,
  viewTargetId: PropTypes.string,
  id: PropTypes.string.isRequired,
  action: PropTypes.object,
  property: PropTypes.object.isRequired,
  provided: PropTypes.object.isRequired,
};

DraggableItem.defaultProps = {
  viewTargetId: '',
  action: {
    activeLayer: () => false,
    removeLayer: () => false,
  },
};

export default DraggableItem;
