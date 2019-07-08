import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Descriptions } from 'antd';

import OptionLayer from 'components/WorkBuilder/Canvas/OptionLayer';
import { formStuffRenderer } from 'components/WorkBuilder/config';

import Styled from './Styled';

class ClickAbleDescriptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: props.formStuffs.map(() => false),
    };
  }

  setHover = (index, value) => {
    this.setState(prevState => {
      const { isHover } = prevState;
      isHover[index] = value;
      return { isHover };
    });
  };

  render() {
    const { setHover } = this;
    const { isHover } = this.state;
    const {
      box,
      formStuffs,
      viewTargetId,
      action: { activeLayer, removePanel },
    } = this.props;
    return formStuffs.length > 0 ? (
      <Descriptions bordered border size="small" column={box.property.column || 1}>
        {formStuffs.map((formStuff, index) => (
          <Descriptions.Item key={formStuff.id} label={formStuff.property.label} span={formStuff.property.span || 1}>
            <Styled
              className={`form-group ${viewTargetId === formStuff.id ? 'active-layer' : ''} ${isHover[index] ? 'hover-layer' : ''}`}
              onClick={e => {
                e.stopPropagation();
                activeLayer(formStuff.id, formStuff.type);
              }}
              onMouseOver={e => {
                e.stopPropagation();
                setHover(index, true);
              }}
              onMouseOut={e => {
                e.stopPropagation();
                setHover(index, false);
              }}
              onFocus={e => {
                e.stopPropagation();
                setHover(index, true);
              }}
              onBlur={e => {
                e.stopPropagation();
                setHover(index, false);
              }}
            >
              {formStuffRenderer[formStuff.type](formStuff)}
              {(viewTargetId === formStuff.id || isHover[index]) && (
                <OptionLayer object={formStuff} action={{ activeLayer, removePanel }} isActive={viewTargetId === formStuff.id} tableMode />
              )}
            </Styled>
          </Descriptions.Item>
        ))}
      </Descriptions>
    ) : (
      <div>등록된 Component가 없습니다.</div>
    );
  }
}

ClickAbleDescriptions.propTypes = {
  box: PropTypes.object.isRequired,
  activeLayer: PropTypes.func,
  action: PropTypes.object,
  viewTargetId: PropTypes.object.isRequired,
  formStuffs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ClickAbleDescriptions.defaultProps = {
  action: {
    activeLayer: () => false,
    removePanel: () => false,
  },
};

export default ClickAbleDescriptions;
