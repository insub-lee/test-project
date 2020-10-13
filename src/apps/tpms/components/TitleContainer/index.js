import React from 'react';
import PropTypes from 'prop-types';
// import { NavLink } from 'react-router-dom';
import ContainerWrapper from './ContainerWrapper';
import TitleWrap from './TitleWrap';
import BodyWrap from './BodyWrap';

const TitleContainer = ({ title, nav, children, noPadding, noBackground }) => (
  <ContainerWrapper>
    <TitleWrap>
      <div className="big">{title}</div>
      <div className="navigation">
        <span className="icon icon_home">HOME</span>
        {nav.map(item => (
          <React.Fragment key={item.link}>
            <span style={{ margin: '0 6px' }}>/</span>
            <span style={{ color: '#777777' }}>{item.title}</span>
            {/*
            <NavLink to={item.link} style={{ color: '#777777' }}>
              {item.title}
            </NavLink>
            */}
          </React.Fragment>
        ))}
      </div>
    </TitleWrap>
    <BodyWrap noPadding={noPadding} noBackground={noBackground}>
      <div className="sub_con">{children}</div>
    </BodyWrap>
  </ContainerWrapper>
);

TitleContainer.propTypes = {
  title: PropTypes.string,
  nav: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  noPadding: PropTypes.bool,
  noBackground: PropTypes.bool,
};

TitleContainer.defaultProps = {
  title: null,
  nav: [],
  children: null,
  noPadding: false,
  noBackground: false,
};

export default TitleContainer;
