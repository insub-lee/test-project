import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const WatermarkPattern = styled.div`
  display: none;

  @media only screen and (max-width: 1024px) {
    position: fixed;
    display: block;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 99999;
    pointer-events: none;

    #svgpattern {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0.1;
    }
  }
`;

const Watermark = props => (
  <WatermarkPattern>
    <svg id="svgpattern" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="empNum" patternUnits="userSpaceOnUse" width="100" height="45">
          <text x="30" y="30" fontSize="16" id="name" style={{ textAlign: 'center' }}>
            {props.profile.EMP_NO}
          </text>
        </pattern>
        <pattern id="empNumPttn" xlinkHref="#empNum" patternTransform="rotate(-45)" />
      </defs>
      <rect width="100%" height="100%" fill="url(#empNumPttn)" />
    </svg>
  </WatermarkPattern>
);

Watermark.propTypes = {
  profile: PropTypes.object.isRequired,
};
export default Watermark;
