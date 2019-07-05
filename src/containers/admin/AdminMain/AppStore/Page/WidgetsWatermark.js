import React from 'react';
import styled from 'styled-components';

// const watermarkText = (
//   <svg>
//     <defs>
//       <pattern height="36" id="twitterhandle" width="120" patternUnits="userSpaceOnUse">
//         <text id="name" fontSize="16" y="30">
//           X0000000 X0000000 X0000000 X0000000 X0000000 X0000000 X0000000 X0000000
//           X0000000 X0000000 X0000000 X0000000 X0000000 X0000000 X0000000 X0000000
//           X0000000 X0000000 X0000000 X0000000
//         </text>
//       </pattern>
//       <pattern id="combo" xlinkHref="#twitterhandle" patternTransform="rotate(-45)" />
//     </defs>
//     <rect height="100%" width="100%" fill="url(#combo)" />
//   </svg>
// );

const StyleWatermark = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: rgba(0,0,0,0.2);
`;

const WidgetsWatermark = () => (
  <StyleWatermark />
);

export default WidgetsWatermark;
