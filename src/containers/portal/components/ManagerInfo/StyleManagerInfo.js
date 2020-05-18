import styled from 'styled-components';

import IconManager from 'images/portal/icon-manager-black.png';
import IconManagerw from 'images/portal/icon-manager.png';

const StyleManagerInfo = styled.div`
  display: inline-block;
  button {
    width: 15px;
    height: 22px;
    background: #fff url(${IconManager}) no-repeat center;
    border: 1px solid #666;
    margin-left: 5px;
    background-size: 12px;

    &:hover {
      border: 1px solid #666;
      background: #666 url(${IconManagerw}) no-repeat center;
      background-size: 12px;
    }
  }
`;

export default StyleManagerInfo;
