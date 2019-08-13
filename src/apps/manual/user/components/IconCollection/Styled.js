import styled from 'styled-components';

import iconTabs from '../../images/icon-tabs.png';
import iconList from '../../images/icon-list.png';
import iconClose from '../../images/btn-close.png';
import iconCloseSoft from '../../images/btn-close-soft.png';
import iconPen from '../../images/icon-pen.png';
import iconPlus from '../../images/icon-plus.png';
import iconArrUp from '../../images/icon-arr-up.png';

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
  &.icon-plus {
    background: url(${iconPlus}) no-repeat center;
    width: 14px;
    height: 14px;
    background-size: 14px;
  }
  &.icon-pen {
    background: url(${iconPen}) no-repeat center;
    width: 15px;
    height: 15px;
    background-size: 100%;
    margin-right: 5px;
    margin-top: -5px;
  }
  &.icon-close-soft {
    background: url(${iconCloseSoft}) no-repeat center;
    width: 14px;
    height: 14px;
    background-size: 14px;
  }
  &.icon-arr-up {
    background: url(${iconArrUp}) no-repeat center;
    width: 14px;
    height: 14px;
    background-size: 14px;
  }
`;

export default Styled;
