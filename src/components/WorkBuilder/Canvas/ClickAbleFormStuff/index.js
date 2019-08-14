import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { allFormStuffs } from 'components/WorkBuilder/config';
import OptionLayer from 'components/WorkBuilder/Canvas/OptionLayer';

import Styled from './Styled';

class ClickAbleFormStuff extends Component {
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
      formStuff,
      viewTargetId,
      action: { activeLayer, removeLayer },
    } = this.props;
    return (
      <Styled
        className={`${viewTargetId === formStuff.id ? 'active-layer' : ''} ${isHover ? 'hover-layer' : ''}`}
        onClick={e => {
          e.stopPropagation();
          activeLayer(formStuff.id, formStuff.type);
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
        {allFormStuffs[formStuff.type] && allFormStuffs[formStuff.type].previewRenderer(formStuff)}
        {(formStuff.id === viewTargetId || isHover) && <OptionLayer object={formStuff} action={{ removeLayer }} isActive={formStuff.id === viewTargetId} />}
      </Styled>
    );
  }
}

ClickAbleFormStuff.propTypes = {
  action: PropTypes.object,
  formStuff: PropTypes.object.isRequired,
  viewTargetId: PropTypes.string,
};

ClickAbleFormStuff.defaultProps = {
  action: {
    activeLayer: () => false,
    removeLayer: () => false,
  },
  viewTargetId: '',
};

export default ClickAbleFormStuff;
