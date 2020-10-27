import React from 'react';
import PropTypes from 'prop-types';
import StyledTextArea from './StyledTextArea';

const TextArea = ({ id, name, cols, rows, placeholder, value, isReadOnly, onChangeEvent }) => (
  <StyledTextArea>
    <textarea
      id={id}
      name={name}
      cols={cols}
      rows={rows}
      placeholder={placeholder}
      value={value}
      readOnly={isReadOnly}
      onChange={e => onChangeEvent(e.target.value)}
    >
      {value}
    </textarea>
  </StyledTextArea>
);

TextArea.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  cols: PropTypes.string,
  rows: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  isReadOnly: PropTypes.bool,
  onChangeEvent: PropTypes.func,
};

TextArea.defaultProps = {
  id: '',
  name: '',
  cols: '',
  rows: '',
  placeholder: '',
  value: '',
  isReadOnly: false,
  onChangeEvent: () => false,
};

export default TextArea;
