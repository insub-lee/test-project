import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import defaultLogo from '../../../images/defaultLogo.png';

const H1 = styled.h1`
  //padding-top: 12px;
  float: left;
  margin-right: 35px;
  height: 100%;
  display: table;

  a {
    vertical-align: middle;
    display: table-cell;
  }
`;

const Logo = ({ logo, alt }) => (
  <H1>
    <Link to="/">
      <img src={logo} alt={alt} />
    </Link>
  </H1>
);

Logo.propTypes = {
  logo: PropTypes.string,
  alt: PropTypes.string,
};

Logo.defaultProps = {
  logo: defaultLogo,
  alt: 'Magnachip',
};

export default Logo;
