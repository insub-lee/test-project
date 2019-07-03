import React from 'react';
import PropTypes from 'prop-types';

import Block from '../Block';

const FormBlock = ({ onClick }) => (
  <React.Fragment>
    <Block label="Input" icon="fa fa-edit fa-3x" onClick={() => onClick('text')} />
    <Block label="Number" icon="fa fa-edit fa-3x" onClick={() => onClick('number')} />
    <Block label="Textarea" icon="fa fa-edit fa-3x" onClick={() => onClick('textarea')} />
    <Block label="Checkbox" icon="xi-check-square-o xi-3x" onClick={() => onClick('checkbox')} />
    <Block label="Radio" icon="xi-radiobox-checked xi-3x" onClick={() => onClick('radio')} />
    <Block label="Grid" icon="fa fa-table fa-3x" onClick={() => onClick('grid')} />
    <Block label="Date Picker" icon="xi-calendar xi-3x" onClick={() => onClick('date-picker')} />
    <Block label="Month Picker" icon="xi-calendar xi-3x" onClick={() => onClick('month-picker')} />
    <Block label="Range Picker" icon="xi-calendar xi-3x" onClick={() => onClick('range-picker')} />
    <Block label="Week Picker" icon="xi-calendar xi-3x" onClick={() => onClick('week-picker')} />
    <Block label="Time Picker" icon="xi-timer-o xi-3x" onClick={() => onClick('time-picker')} />
    <Block label="Uploader" icon="xi-file-upload-o xi-3x" onClick={() => onClick('uploader')} />
    <Block label="Grid" icon="fa fa-table fa-3x" onClick={() => onClick('grid')} />
  </React.Fragment>
);

FormBlock.propTypes = {
  onClick: PropTypes.func,
};

FormBlock.propTypes = {
  onClick: () => false,
};

export default FormBlock;
