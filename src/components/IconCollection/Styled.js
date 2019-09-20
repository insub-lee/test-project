import styled from 'styled-components';

import iconTabs from 'images/portal/icon-tabs.png';
import iconList from 'images/portal/icon-list.png';
import iconClose from 'images/portal/btn-close.png';
import iconPen from 'images/portal/icon-pen.png';
import iconPin from 'images/portal/icon-pin.png';
import iconworkCard from 'images/portal/icon-workCard.png';
import iconworkFolder from 'images/portal/icon-folder.png';

const Styled = styled.i`
  display: inline-block;
  vertical-align: middle;
  &.icon-tabs {
    background: url(${iconTabs}) no-repeat center;
    width: 40px;
    height: 34px;
  }
  &.icon-list {
    background: url(${iconList}) no-repeat center;
    width: 15px;
    height: 25px;
    margin-right: 8px;
    background-size: 15px;
  }
  &.icon-close {
    background: url(${iconClose}) no-repeat center;
    width: 15px;
    height: 15px;
  }
  &.icon-pen {
    background: url(${iconPen}) no-repeat center;
    width: 15px;
    height: 15px;
    background-size: 100%;
    margin-right: 5px;
    margin-top: -5px;
  }
  &.icon-pin {
    background: url(${iconPin}) no-repeat center;
    width: 15px;
    height: 15px;
    background-size: 100%;
  }
  &.icon-workCard {
    background: url(${iconworkCard}) no-repeat center;
    width: 15px;
    height: 15px;
    background-size: 100%;
  }
  &.icon-workFolder {
    background: url(${iconworkFolder}) no-repeat center;
    width: 15px;
    height: 15px;
    background-size: 100%;
  }
`;

export default Styled;
