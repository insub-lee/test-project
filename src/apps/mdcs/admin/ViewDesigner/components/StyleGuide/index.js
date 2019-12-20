import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import Styled from './Styled';
import ActionButton from '../ActionButton';

class StyleGuide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widthValue: '',
      widthType: '',
      heightValue: '',
      heightType: '',
      maxWidth: 100,
    };
  }

  componentDidMount() {
    const {
      style: { width, height },
      widthOption,
    } = this.props;
    this.setDefault(width, height, widthOption);
  }

  componentDidUpdate(prevProps) {
    const { active: prevActive } = prevProps;
    const { active } = this.props;
    if (prevActive !== active && active) {
      const {
        style: { width, height },
        widthOption,
      } = this.props;
      this.setDefault(width, height, widthOption);
    }
  }

  onChangeWidthValue = e => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((Number(value) >= 10 && !isNaN(value) && reg.test(value)) || (value !== '' && !isNaN(Number(value)))) {
      const { widthType, maxWidth } = this.state;
      const widthValue = widthType === '%' && Number(value) > maxWidth ? `${maxWidth}` : value;
      e.target.value = widthValue;
      this.updateStyleWidth(false, widthType, value, widthValue);
    } else {
      this.updateStyleWidth(true);
    }
  };

  updateStyleWidth = debounce((isInvalidWidth, widthType, value, widthValue) => {
    if (isInvalidWidth) {
      this.setState({ isInvalidWidth: true });
    } else {
      const { updateStyleWidth } = this.props;
      let prevWidthValue = '';
      this.setState(
        prevState => {
          prevWidthValue = prevState.widthValue;
          return { widthValue: widthType === '%' && Number(value) < 10 ? '10' : widthValue, isInvalidWidth: false };
        },
        () => {
          if (widthType === '%' && Number(value) < 10) {
            updateStyleWidth(`${10}${widthType}`, parseFloat('10') - parseFloat(prevWidthValue));
          } else {
            updateStyleWidth(`${widthValue}${widthType}`, parseFloat(widthValue) - parseFloat(prevWidthValue));
          }
        },
      );
    }
  }, 500);

  onChangeHeightValue = e => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || (value !== '' && !isNaN(Number(value)))) {
      const { heightType } = this.state;
      const heightValue = heightType === '%' && Number(value) > 100 ? '100' : value;
      e.target.value = heightValue;
      this.updateStyleHeight(false, heightType, value, heightValue);
    } else {
      this.updateStyleHeight(true);
    }
  };

  updateStyleHeight = debounce((isInvalidHeight, heightType, value, heightValue) => {
    if (isInvalidHeight) {
      this.setState({ isInvalidHeight: true });
    } else {
      const { updateStyleHeight } = this.props;
      this.setState({ heightValue, isInvalidHeight: false }, () => {
        updateStyleHeight(`${heightValue}${heightType}`);
      });
    }
  }, 500);

  setDefault = (width, height, { current, diffTarget }) => {
    const widthValue = parseFloat(width).toString();
    const widthType = width.replace(widthValue, '');
    const heightValue = parseFloat(height).toString();
    const heightType = height.replace(heightValue, '');

    const maxWidth = parseFloat(current) + parseFloat(diffTarget);
    this.setState({ widthValue, widthType, heightValue, heightType, maxWidth: maxWidth - 10 });
  };

  render() {
    const { widthValue, widthType, heightValue, heightType, isInvalidWidth, isInvalidHeight } = this.state;
    const { active, updateStyleRowHeight } = this.props;
    return (
      <Styled className={`style-guide ${active && 'active'}`}>
        {active && (
          <div className="style-guide-width">
            <input
              key={widthValue}
              type="number"
              placeholder="width"
              defaultValue={widthValue}
              onClick={e => e.stopPropagation()}
              onChange={this.onChangeWidthValue}
              className={isInvalidWidth ? 'invalid' : ''}
              min="10"
            />
            <span>{widthType}</span>
          </div>
        )}
        {active && (
          <div className="style-guide-height">
            <input
              key={heightValue}
              type="number"
              placeholder="height"
              defaultValue={heightValue}
              onClick={e => e.stopPropagation()}
              onChange={this.onChangeHeightValue}
              className={isInvalidHeight ? 'invalid' : ''}
              min="10"
            />
            <span>{heightType}</span>
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
