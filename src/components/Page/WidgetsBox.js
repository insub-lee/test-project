import React from 'react';
import PropTypes from 'prop-types';
import { WidgetBox } from './StyleWidget';

const WidgetsBox = ({
  children, item,
}) => {
  const boxStyle = {
    backgroundColor: item.bgColor, color: item.color,
  };
  const sizeWInfo = item.position[2];
  const sizeHInfo = item.position[3];
  const selectSize = item.user && item.user.isTitle ?
    `widgetBody sizeW${sizeWInfo} sizeH${sizeHInfo}` : `widgetBody fullHeight sizeW${sizeWInfo} sizeH${sizeHInfo}`;
  return (
    <WidgetBox
      className={selectSize}
      style={boxStyle}
    >
      {children}
    </WidgetBox>
  );
};

WidgetsBox.propTypes = {
  children: PropTypes.object.isRequired,
  // height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // padding: PropTypes.number,
  item: PropTypes.object, // eslint-disable-line
};

WidgetsBox.defaultProps = {
  // height: 'inherit',
  // padding: 0,
};

export default WidgetsBox;
