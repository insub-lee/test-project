import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CompactPicker } from 'react-color';

const ColorPickerWithState = ({ defaultColor, name, onChangeComplete }) => {
  const [color, setColor] = useState(defaultColor);
  useEffect(() => {
    setColor(defaultColor);
  }, [defaultColor]);
  const onChangeCompleteColor = ({ hex }) => {
    setColor(hex);
    onChangeComplete({ target: { name, value: hex } });
  };
  return <CompactPicker color={color} onChangeComplete={onChangeCompleteColor} />;
};
ColorPickerWithState.propTypes = {
  defaultColor: PropTypes.string,
  name: PropTypes.string,
  onChangeComplete: PropTypes.func,
};
ColorPickerWithState.defaultProps = {
  defaultColor: '#000000',
  name: '',
  onChangeComplete: () => {},
};
export default ColorPickerWithState;
