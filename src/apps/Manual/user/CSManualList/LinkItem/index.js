import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'components/FormStuff/Checkbox';
import Styled from './Styled';

const LinkItem = ({ item }) => (
  <Styled>
    <Checkbox />
    <a href={item.link}>{item.MUAL_NAME}</a>
  </Styled>
);

LinkItem.propTypes = {
  item: PropTypes.shape({
    link: PropTypes.string,
    title: PropTypes.string,
  }),
};

LinkItem.defaultProps = {
  item: {
    link: '',
    title: '',
  },
};

export default LinkItem;
