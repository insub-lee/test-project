import React from 'react';
import PropTypes from 'prop-types';

const TitleRenderer = ({ data, value, setSelectedDraft }) => (
  <a
    onClick={e => {
      e.preventDefault();
      setSelectedDraft(data, true);
    }}
  >
    {value}
  </a>
);

TitleRenderer.propTypes = {
  data: PropTypes.object,
  value: PropTypes.string,
  setSelectedDraft: PropTypes.func,
};

TitleRenderer.defaultProps = {
  data: {},
  value: '',
};

export default TitleRenderer;
