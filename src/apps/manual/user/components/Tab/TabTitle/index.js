import React from 'react';
import PropTypes from 'prop-types';

import Styled from './Styled';

const TabTitle = ({ title }) => (
  <Styled>
    <div className="tab-dividers" />
    <div className="tab-background">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <symbol id="tab-geometry-left" viewBox="0 0 214 36">
            <path d="M17 0h197v36H0v-2c4.5 0 9-3.5 9-8V8c0-4.5 3.5-8 8-8z" />
          </symbol>
          <symbol id="tab-geometry-right" viewBox="0 0 214 36">
            <use xlinkHref="#tab-geometry-left" />
          </symbol>
          <clipPath id="crop">
            <rect className="mask" width="100%" height="100%" x="0" />
          </clipPath>
        </defs>
        <svg width="52%" height="100%">
          <use xlinkHref="#tab-geometry-left" width="214" height="36" className="tab-geometry" />
        </svg>
        <g transform="scale(-1, 1)">
          <svg width="52%" height="100%" x="-100%" y="0">
            <use xlinkHref="#tab-geometry-right" width="214" height="36" className="tab-geometry" />
          </svg>
        </g>
      </svg>
    </div>
    <div className="tab-content">
      <div className="tab-title">{title}</div>
    </div>
  </Styled>
);

TabTitle.propTypes = {
  title: PropTypes.string,
};

TabTitle.defaultProps = {
  title: '',
};

export default TabTitle;
