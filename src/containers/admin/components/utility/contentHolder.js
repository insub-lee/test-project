import React from 'react';
import PropTypes from 'prop-types';
import ContentHolderWrapper from './contentHolder.style';

const ContentHolder = ({ style, children }) => (
  <ContentHolderWrapper className="storeBoxListWrapper" style={style}>
    {children}
  </ContentHolderWrapper>
);

ContentHolder.propTypes = {
  style: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

ContentHolder.defaultProps = {
  style: {},
  children: null,
};

export default ContentHolder;
