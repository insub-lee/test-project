import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StyledLogo from './StyledLogo';

const Logo = ({ img, href, title }) => (
  <StyledLogo img={img}>
    <Link to={href}>{title}</Link>
  </StyledLogo>
);

Logo.propTypes = {
  img: PropTypes.string,
  href: PropTypes.string,
  title: PropTypes.string,
};

Logo.defaultProps = {
  img: '',
  href: '/',
  title: '',
};

export default Logo;
