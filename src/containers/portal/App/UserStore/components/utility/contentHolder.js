import React from 'react';
import PropTypes from 'prop-types';
import ContentHolderWrapper from './contentHolder.style';

const ContentHolder = ({ children, style }) => (
  <ContentHolderWrapper className="storeBoxListWrapper" style={style}>
    {children}
  </ContentHolderWrapper>
);

ContentHolder.propTypes = {
  style: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

ContentHolder.defaultProps = {
  children: [],
};

export default ContentHolder;
