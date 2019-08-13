import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { WidgetWrapper } from './StyleWidget';
import WidgetHeader from './WidgetsHeader';
import WidgetBox from './WidgetsBox';

export default class WidgetsWrapper extends Component {
  shouldComponentUpdate(nextProps) {
    const { item } = this.props;
    if (!_.isEqual(item, nextProps.item)) {
      return true;
    }
    return false;
  }
  render() {
    const {
      width,
      gutterTop,
      gutterRight,
      gutterBottom,
      gutterLeft,
      padding,
      children,
      item,
    } = this.props;

    const wrapperStyle = {
      marginTop: gutterTop,
      marginRight: gutterRight,
      marginBottom: gutterBottom,
      marginLeft: gutterLeft,
      padding,
      // color: item.color,
      // backgroundColor: item.bgColor ? item.bgColor : 테마,
      width,
    };

    const skinInfo = item.user.skin;
    const selectSkin = `isoWidgetsWrapper wSkin${skinInfo}`;

    // 차후 wrapper, header, box 별 bgColor, color이 생기면 if의 조건을 해당 색상으로 변경해줘야함
    if (item.bgColor) {
      wrapperStyle.backgroundColor = item.bgColor;
    }

    if (item.color) {
      wrapperStyle.color = item.color;
    }

    if (item.size === 'FullSize') {
      wrapperStyle.height = 'auto';
    }

    return (
      <div
        style={{
          position: 'relative',
          height: '100%',
          overflow: item.size === 'FullSize' ? 'auto' : 'hidden',
          borderRadius: 2,
        }}
      >
        <WidgetWrapper
          className={selectSkin}
          style={wrapperStyle}
        >
          <WidgetHeader item={item} />
          <WidgetBox
            item={item}
          >
            {children}
          </WidgetBox>
        </WidgetWrapper>
      </div>
    );
  }
}

WidgetsWrapper.propTypes = {
  item: PropTypes.object, // eslint-disable-line
  width: PropTypes.string, // eslint-disable-line
  gutterTop: PropTypes.string, // eslint-disable-line
  gutterRight: PropTypes.string, // eslint-disable-line
  gutterBottom: PropTypes.number, // eslint-disable-line
  gutterLeft: PropTypes.string, // eslint-disable-line
  padding: PropTypes.string, // eslint-disable-line
  children: PropTypes.object.isRequired,
};
