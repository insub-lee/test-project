import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FormGroup from './FormGroupStyled';

const HeaderAdder = ({ action: { addHeader } }) => {
  const [isFocus, setFocus] = useState(false);
  const [headerText, setHeaderText] = useState('');
  return (
    <FormGroup>
      <div className="input-group" style={{ width: 300 }}>
        <div className={`input-group-prepend ${isFocus ? 'has-length' : ''}`}>
          <span className="input-group-text py-1 px-3">Header 추가</span>
        </div>
        <input
          id="input-group-lg-size"
          type="text"
          className="form-control"
          placeholder="Large size"
          aria-describedby="input-group-lg-size"
          defaultValue={headerText}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={e => setHeaderText(e.target.value)}
        />
        <div className={`input-group-append ${isFocus ? 'has-length' : ''}`}>
          <button type="button" className="btn btn-outline-default" onClick={() => addHeader(headerText)}>
            <i className="fa fa-plus" />
          </button>
        </div>
      </div>
    </FormGroup>
  );
};

HeaderAdder.propTypes = {
  action: PropTypes.shape({
    addHeader: PropTypes.func,
  }),
};

HeaderAdder.defaultProps = {
  action: {
    addHeader: () => false,
  },
};

export default HeaderAdder;
