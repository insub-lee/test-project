import React from 'react';
import PropTypes from 'prop-types';
import StyledMouseOverIcons from './StyledMouseOverIcons';

class MouseOverIcons extends React.Component {
  exitDockItem = () => {
    const { dockId } = this.props;
    const { exitDockItem } = this.props;

    exitDockItem(dockId);
  }

  fixDockItem = () => {
    const { dockId } = this.props;
    const { fixDockItem } = this.props;

    fixDockItem(dockId);
  }

  unfixDockItem = () => {
    const { dockId } = this.props;
    const { unfixDockItem } = this.props;

    unfixDockItem(dockId);
  }

  checker = () => {
    const { dockYn, execYn } = this.props;

    if (dockYn === 'Y' && execYn === 'Y') {
      return 'YY';
    } else if (dockYn === 'Y' && execYn === 'N') {
      return 'YN';
    } else if (dockYn === 'N' && execYn === 'Y') {
      return 'NY';
    }
    return 'NN';
  }

  render() {
    const {
      isMouseOver,
    } = this.props;

    let result = [];
    const content = {
      // dock 고정, 실행 중
      YY: [
        <div className="mouseOverIcons removeDockItemBtn" onClick={this.unfixDockItem} onKeyDown={() => {}} role="button" tabIndex="0" key={1} />,
        <div className="mouseOverIcons exitDockItemBtn" onClick={this.exitDockItem} role="button" tabIndex="0" onKeyDown={() => {}} key={2} />,
      ],
      // dock 고정, 실행 중 아님
      YN: [
        <div className="mouseOverIcons removeDockItemBtn fullWidth" onClick={this.unfixDockItem} onKeyDown={() => {}} role="button" tabIndex="0" key={1} />,
      ],
      // dock 고정 아님, 실행 중
      NY: [
        <div className="mouseOverIcons addDockItemBtn" onClick={this.fixDockItem} onKeyDown={() => {}} role="button" tabIndex="0" key={1} />,
        <div className="mouseOverIcons exitDockItemBtn" onClick={this.exitDockItem} role="button" tabIndex="0" onKeyDown={() => {}} key={2} />,
      ],
    };

    result = content[this.checker()];

    const btnStyle = {};
    if (isMouseOver) {
      btnStyle.display = 'block';
    } else {
      btnStyle.display = 'none';
    }

    return (
      <StyledMouseOverIcons
        style={btnStyle}
      >
        {result}
      </StyledMouseOverIcons>
    );
  }
}

MouseOverIcons.propTypes = {
  isMouseOver: PropTypes.bool.isRequired,
  dockId: PropTypes.number.isRequired,
  exitDockItem: PropTypes.func.isRequired,
  dockYn: PropTypes.string.isRequired,
  execYn: PropTypes.string.isRequired,
  fixDockItem: PropTypes.func.isRequired,
  unfixDockItem: PropTypes.func.isRequired,
};

export default MouseOverIcons;
