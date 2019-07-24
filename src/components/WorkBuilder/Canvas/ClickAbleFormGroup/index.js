import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

import OptionLayer from 'components/WorkBuilder/Canvas/OptionLayer';
import { allFormStuffs } from 'components/WorkBuilder/config';

import Styled from './Styled';

class ClickAbleFormGroup extends Component {
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
      action: { activeLayer, removePanel },
    } = this.props;
    return (
      <Styled
        className={`form-group ${viewTargetId === formStuff.id ? 'active-layer' : ''} ${isHover ? 'hover-layer' : ''}`}
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
        <Form.Item label={formStuff.property.label}>{allFormStuffs[formStuff.type].previewRenderer(formStuff)}</Form.Item>
        {(viewTargetId === formStuff.id || isHover) && (
          <OptionLayer object={formStuff} action={{ activeLayer, removePanel }} isActive={viewTargetId === formStuff.id} />
        )}
      </Styled>
    );
  }
}

ClickAbleFormGroup.propTypes = {
  id: PropTypes.string.isRequired,
  activeLayer: PropTypes.func,
  formStuff: PropTypes.object.isRequired,
  action: PropTypes.object,
  viewTargetId: PropTypes.string.isRequired,
};

ClickAbleFormGroup.defaultProps = {
  action: {
    activeLayer: () => false,
    removePanel: () => false,
  },
};

export default ClickAbleFormGroup;
