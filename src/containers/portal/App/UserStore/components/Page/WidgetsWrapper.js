import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { WidgetWrapper } from './StyleWidget';
import WidgetHeader from './WidgetsHeader';
import WidgetBox from './WidgetsBox';
// import Watermark from './WidgetsWatermark';

export default class WidgetsWrapper extends PureComponent {
  render() {
    const { width, gutterTop, gutterRight, gutterBottom, gutterLeft, padding, children, item } = this.props;

    const wrapperStyle = {
      marginTop: gutterTop,
      marginRight: gutterRight,
      marginBottom: gutterBottom,
      marginLeft: gutterLeft,
      padding,
      color: item.color,
      backgroundColor: item.bgColor,
      width,
    };

    return (
      <div style={{ position: 'relative', height: '100%' }}>
        <WidgetWrapper className="isoWidgetsWrapper" style={wrapperStyle}>
          <WidgetHeader item={item} />
          <WidgetBox item={item}>{children}</WidgetBox>
        </WidgetWrapper>
        {/* <Watermark /> */}
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
