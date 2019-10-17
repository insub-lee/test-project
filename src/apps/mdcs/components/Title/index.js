import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import Styled from './Styled';

const Title = ({ title, workSeq }) => (
  <Styled className="widgetHeader">
    <p>{title}</p>
    <Link to={`/apps/workBuilder/${workSeq}`}>
      <Icon type="plus-square" />
    </Link>
  </Styled>
);

Title.propTypes = {
  title: PropTypes.string,
  workSeq: PropTypes.number,
};

Title.defaultProps = {
  title: '',
  workSeq: '',
};

export default Title;
