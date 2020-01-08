import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { Divider } from 'antd';

import Styled from './Styled';
import ActionButton from '../ActionButton';

const REG_NUMBER = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;

const getValueAndType = cssString => {
  const value = parseFloat(cssString).toString();
  const type = cssString.replace(value, '');
  return { value, type };
};

const getMaxSize = ({ current, diffTarget }, limit = 0) => parseFloat(current) + parseFloat(diffTarget) - limit;

const getNodeAndValue = ref => {
  const node = ref.current;
  const { value } = node;
  return {
    node,
    value,
  };
};
const isInvalidWidth = stringValue =>
  (Number(stringValue) >= 10 && !Number.isNaN(stringValue) && REG_NUMBER.test(stringValue)) || (stringValue !== '' && !Number.isNaN(Number(stringValue)));
const isInvalidHeight = stringValue =>
  (!Number.isNaN(stringValue) && REG_NUMBER.test(stringValue)) || (stringValue !== '' && !Number.isNaN(Number(stringValue)));

class StyleGuide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidWidth: false,
      invalidHeight: false,
    };
    this.widthInputRef = React.createRef();
    this.heightInputRef = React.createRef();
  }

  onChangeWidthValue = (e, currentValue, currentType, maxSize) => {
    const { value } = e.target;
    this.checkWidthValue(value, currentValue, currentType, maxSize);
  };

  updateStyleWidth = debounce((invalidWidth, widthType, value, widthValue, prevWidthValue) => {
    if (invalidWidth) {
      this.setState({ invalidWidth: true });
    } else {
      const { updateStyleWidth } = this.props;
      this.setState({ invalidWidth: false }, () => {
        if (widthType === '%' && Number(value) < 10) {
          updateStyleWidth(`${10}${widthType}`, parseFloat('10') - parseFloat(prevWidthValue));
        } else {
          updateStyleWidth(`${widthValue}${widthType}`, parseFloat(widthValue) - parseFloat(prevWidthValue));
        }
        const { node } = getNodeAndValue(this.widthInputRef);
        node.value = widthValue;
      });
    }
  }, 300);

  onChangeHeightValue = (e, currentValue, currentType) => {
    const { value } = e.target;
    this.checkHeightValue(value, currentType);
  };

  checkWidthValue = (value, currentValue, currentType, maxSize) => {
    if (isInvalidWidth(value)) {
      const widthValue = currentType === '%' && Number(value) >= maxSize ? `${maxSize}` : value;
      // e.target.value = widthValue;
      this.updateStyleWidth(false, currentType, value, widthValue, currentValue);
    } else {
      this.updateStyleWidth(true);
    }
  };

  checkHeightValue = (value, currentType) => {
    if (isInvalidHeight(value)) {
      let heightValue = value;
      if (currentType === '%' && Number(value) > 100) {
        heightValue = '100';
      }
      if (currentType === 'px' && Number(value) < 10) {
        heightValue = '10';
      }
      // e.target.value = heightValue;
      this.updateStyleHeight(false, currentType, value, heightValue);
    } else {
      this.updateStyleHeight(true);
    }
  };

  updateStyleHeight = debounce((invalidHeight, heightType, value, heightValue) => {
    if (invalidHeight) {
      this.setState({ invalidHeight: true });
    } else {
      const { updateStyleHeight } = this.props;
      this.setState({ invalidHeight: false }, () => {
        updateStyleHeight(`${heightValue}${heightType}`);
        const { node } = getNodeAndValue(this.heightInputRef);
        node.value = heightValue;
      });
    }
  }, 300);

  widthUpCount = (e, currentValue, currentType, maxSize) => {
    e.stopPropagation();
    const { node, value } = getNodeAndValue(this.widthInputRef);
    node.value = Number.isNaN(value) ? '10' : (Number(value) + 1).toString();
    this.checkWidthValue(node.value, currentValue, currentType, maxSize);
  };

  widthDownCount = (e, currentValue, currentType, maxSize) => {
    e.stopPropagation();
    const { node, value } = getNodeAndValue(this.widthInputRef);
    node.value = Number.isNaN(value) ? '10' : (Number(value) - 1).toString();
    this.checkWidthValue(node.value, currentValue, currentType, maxSize);
  };

  heightUpCount = (e, currentValue, currentType) => {
    e.stopPropagation();
    const { node, value } = getNodeAndValue(this.heightInputRef);
    node.value = Number.isNaN(value) ? '60' : (Number(value) + 1).toString();
    this.checkHeightValue(node.value, currentType);
  };

  heightDownCount = (e, currentValue, currentType) => {
    e.stopPropagation();
    const { node, value } = getNodeAndValue(this.heightInputRef);
    node.value = Number.isNaN(value) ? '60' : (Number(value) - 1).toString();
    this.checkHeightValue(node.value, currentType);
  };

  render() {
    const { invalidWidth, invalidHeight } = this.state;
    const {
      active,
      updateStyleRowHeight,
      style: { width, height },
      widthOption,
    } = this.props;
    const { value: widthValue, type: widthType } = getValueAndType(width);
    const { value: heightValue, type: heightType } = getValueAndType(height);
    const maxWidthSize = getMaxSize(widthOption, 10);
    return (
      <Styled className={`style-guide ${active && 'active'}`}>
        {active && (
          <div className="style-guide-width">
            <input
              ref={this.widthInputRef}
              type="number"
              placeholder="width"
              defaultValue={widthValue}
              onClick={e => e.stopPropagation()}
              onChange={e => this.onChangeWidthValue(e, widthValue, widthType, maxWidthSize)}
              className={invalidWidth ? 'invalid' : ''}
              min={10}
            />
            <span>{widthType}</span>
            <div className="input-action-buttons">
              <ActionButton type="button" onClick={e => this.widthUpCount(e, widthValue, widthType, maxWidthSize)}>
                <i className="fa fa-caret-up fa-2x" />
              </ActionButton>
              <Divider style={{ margin: '1px 0' }} />
              <ActionButton type="button" onClick={e => this.widthDownCount(e, widthValue, widthType, maxWidthSize)}>
                <i className="fa fa-caret-down fa-2x" />
              </ActionButton>
            </div>
          </div>
        )}
        {active && (
          <div className="style-guide-height">
            <input
              ref={this.heightInputRef}
              type="number"
              placeholder="height"
              defaultValue={heightValue}
              onClick={e => e.stopPropagation()}
              onChange={e => this.onChangeHeightValue(e, heightValue, heightType)}
              className={invalidHeight ? 'invalid' : ''}
              min={10}
            />
            <span>{heightType}</span>
            <div className="input-action-buttons">
              <ActionButton type="button" onClick={e => this.heightUpCount(e, heightValue, heightType)}>
                <i className="fa fa-caret-up fa-2x" />
              </ActionButton>
              <Divider style={{ margin: '1px 0' }} />
              <ActionButton type="button" onClick={e => this.heightDownCount(e, heightValue, heightType)}>
                <i className="fa fa-caret-down fa-2x" />
              </ActionButton>
            </div>
          </div>
        )}
        {active && (
          <div className="style-guide-center">
            <div className="action-buttons">
              <ActionButton
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  updateStyleRowHeight();
                }}
              >
                *행 적용
              </ActionButton>
            </div>
          </div>
        )}
      </Styled>
    );
  }
}

StyleGuide.propTypes = {
  style: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
  }),
  widthOption: PropTypes.shape({
    current: PropTypes.string,
    diffTarget: PropTypes.string,
  }),
  active: PropTypes.bool,
  updateStyleWidth: PropTypes.func,
  updateStyleHeight: PropTypes.func,
  updateStyleRowHeight: PropTypes.func,
};

StyleGuide.defaultProps = {
  style: {
    width: '0%',
    height: '0%',
  },
  widthOption: {
    current: '0%',
    diffTarget: '0%',
  },
  active: false,
  updateStyleWidth: () => {},
  updateStyleHeight: () => {},
  updateStyleRowHeight: () => {},
};

export default StyleGuide;
