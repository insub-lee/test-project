import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { WidgetBox } from './StyleWidget';

export default class WidgetsBox extends PureComponent {
  render() {
    const { children, item } = this.props;
    const boxStyle = {
      height: this.props.height,
      padding: this.props.padding,
      color: item.color,
      backgroundColor: item.bgColor,
    };

    let widgetBoxClass = 'widgetBody';
    if (item.user.isTitle) {
      widgetBoxClass = `${widgetBoxClass}`;
    }
    if (item.id === '0') {
      widgetBoxClass = `${widgetBoxClass} draggableCancel`;
    }

    return (
      <WidgetBox
        className={widgetBoxClass}
        style={boxStyle}
      >
        {children}
      </WidgetBox>
    );
  }
}

WidgetsBox.propTypes = {
  children: PropTypes.object.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  padding: PropTypes.number,
  item: PropTypes.object, // eslint-disable-line
};

WidgetsBox.defaultProps = {
  height: 'inherit',
  padding: 0,
};
