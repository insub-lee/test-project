import React from 'react';
import PropTypes from 'prop-types';

const TitleRenderer = ({ data, value, setSelectedDraft, pathname }) => (
  <a
    title={value}
    className="ellipsis"
    style={{ display: 'block', width: '400px' }}
    onClick={e => {
      e.preventDefault();
      setSelectedDraft(data, true, pathname);
    }}
  >
    {value}
  </a>
);

TitleRenderer.propTypes = {
  data: PropTypes.object,
  value: PropTypes.string,
  setSelectedDraft: PropTypes.func,
  pathname: PropTypes.string,
};

TitleRenderer.defaultProps = {
  data: {},
  value: '',
  setSelectedDraft: () => false,
  pathname: '',
};

export default TitleRenderer;
