import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ContainerWrapper from './ContainerWrapper';
import TitleWrap from './TitleWrap';

const OnlyTitle = ({ title, nav, children }) => (
  <ContainerWrapper>
    <TitleWrap>
      <div className="big">{title}</div>
      <div className="navigation">
        <span className="icon icon_home">HOME</span>
        {nav.map(item => (
          <React.Fragment key={item.link}>
            <span style={{ margin: '0 6px' }}>/</span>
            <NavLink to={item.link} style={{ color: '#777777' }}>
              {item.title}
            </NavLink>
          </React.Fragment>
        ))}
      </div>
    </TitleWrap>
    {children}
  </ContainerWrapper>
);

OnlyTitle.propTypes = {
  title: PropTypes.string,
  nav: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

OnlyTitle.defaultProps = {
  title: null,
  nav: [],
  children: null,
};

export default OnlyTitle;
