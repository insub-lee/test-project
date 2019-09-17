import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import Styled from './Styled';

const WriteTabTitle = ({ title, onRemove, flag }) => (
  <Styled>
    {title}{' '}
    <button type="button" className={`btn-m-minus ${flag}`} onClick={onRemove}>
      <Icon type="minus-circle" />
    </button>
  </Styled>
);

WriteTabTitle.propTypes = {
  title: PropTypes.string,
};

WriteTabTitle.defaultProps = {
  title: '',
};

export default WriteTabTitle;
