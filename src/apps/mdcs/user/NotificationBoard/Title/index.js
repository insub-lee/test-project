import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import Styled from './Styled';

const Title = ({ title }) => (
  <Styled className="widgetHeader">
    <p>{title}</p>
    <Link to="/apps/mdcs/user/NotificationBoard/List">
      <Icon type="plus-square" />
    </Link>
  </Styled>
);

Title.propTypes = {
  title: PropTypes.string,
};

Title.defaultProps = {
  title: '',
};

export default Title;
