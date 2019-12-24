import React from 'react';
import PropTypes from 'prop-types';

const TitleRenderer = ({ data, value, category, history }) => (
  <a
    href={`/apps/WorkFlow/User/Draft/View/${category}/${data.DRAFT_ID}/${data.QUE_ID}`}
    onClick={e => {
      e.preventDefault();
      history.push(`/apps/WorkFlow/User/Draft/View/${category}/${data.DRAFT_ID}/${data.QUE_ID}`);
    }}
  >
    {value}
  </a>
);

TitleRenderer.propTypes = {
  data: PropTypes.object,
  value: PropTypes.string,
  category: PropTypes.string,
  history: PropTypes.object.isRequired,
};

TitleRenderer.defaultProps = {
  data: {},
  value: '',
  category: '',
};

export default TitleRenderer;
