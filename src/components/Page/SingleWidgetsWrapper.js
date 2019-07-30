import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SingleStyleWidget } from './SingleStyleWidget';
import WidgetHeader from './WidgetsHeader';
import WidgetBox from './WidgetsBox';

export default class SingleWidgetsWrapper extends PureComponent {
  render() {
    console.debug('>>>>>>>>>widget props: ', this.props);
    /* eslint-disable */
    const { width, gutterTop, gutterRight, gutterBottom, gutterLeft, padding, children, item } = this.props;
    /* eslint-disable */

    const wrapperStyle = {
      marginTop: gutterTop,
      marginRight: gutterRight,
      marginBottom: gutterBottom,
      marginLeft: gutterLeft,
      padding,
      // color: item.color,
      backgroundColor: item.bgColor ? item.bgColor : 'white',
      width,
    };

    const skinInfo = item.user && item.user.skin ? `wSkin${item.user.skin}` : '' ;
    const isFullSize = item.size === 'FullSize';
    // 차후 wrapper, header, box 별 bgColor, color이 생기면 if의 조건을 해당 색상으로 변경해줘야함
    if (item.bgColor) {
      wrapperStyle.backgroundColor = item.bgColor;
    }

    if (item.color) {
      wrapperStyle.color = item.color;
    }

    return (
      <div
        style={{
          position: 'relative',
          top: 0,
          left: 0,
          width: 'calc(100% - 8px)',
        }}
      >
        <SingleStyleWidget className={`isoSingleWidgetsWrapper ${skinInfo !== '' && isFullSize ? skinInfo : ''}`} style={wrapperStyle}>
          {isFullSize && <WidgetHeader item={item} />}
          <WidgetBox item={item}>{children}</WidgetBox>
        </SingleStyleWidget>
      </div>
    );
  }
}

SingleWidgetsWrapper.propTypes = {
  item: PropTypes.object, // eslint-disable-line
  width: PropTypes.string, // eslint-disable-line
  gutterTop: PropTypes.string, // eslint-disable-line
  gutterRight: PropTypes.string, // eslint-disable-line
  gutterBottom: PropTypes.number, // eslint-disable-line
  gutterLeft: PropTypes.string, // eslint-disable-line
  padding: PropTypes.string, // eslint-disable-line
  children: PropTypes.object.isRequired,
};
