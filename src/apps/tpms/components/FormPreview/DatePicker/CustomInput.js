import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const CustomInput = ({ item, onClick }) => (
  <div className="react-datepicker-wrapper">
    <input
      type="text"
      name={item.get('name')}
      required={item.get('required')}
      placeholder={item.get('placeholder')}
      value={item.get('value') ? moment(item.get('value'), 'YYYY.MM.DD').format('YYYY.MM.DD') : ''}
      readOnly
      onClick={onClick}
    />
    <button type="button" className="icon_date" onClick={onClick}>
      버튼
    </button>
  </div>
);

CustomInput.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

CustomInput.defaultProps = {
  placeholder: '',
};

export default CustomInput;
