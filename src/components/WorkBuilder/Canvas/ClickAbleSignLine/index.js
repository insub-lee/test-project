import React from 'react';
import PropTypes from 'prop-types';

import Styled from './Styled';

const ClickAbleSignLine = ({ signLine, viewTargetId, action: { activeLayer } }) => (
  <Styled id="sign-line-box">
    <div
      className={`sign-liner ${viewTargetId === 'sign-line-box' ? 'active-layer' : ''}`}
      onClick={e => {
        e.stopPropagation();
        activeLayer('sign-line-box', 'SignLine', false);
      }}
      role="button"
      onKeyPress={() => false}
      tabIndex="0"
    >
      {signLine.map(sign => (
        <div className="sign-box">
          <div className="title">{sign.label}</div>
          <div className="sign-user" />
        </div>
      ))}
      <div className="layout-option-layer">
        <div className="layout-option-title">Sign Line</div>
      </div>
    </div>
  </Styled>
);

ClickAbleSignLine.propTypes = {
  signLine: PropTypes.arrayOf(PropTypes.object),
  viewTargetId: PropTypes.string,
  action: PropTypes.object,
};

ClickAbleSignLine.defaultProps = {
  signLine: [],
  viewTargetId: '',
  action: {
    activeLayer: () => false,
  },
};

export default ClickAbleSignLine;
