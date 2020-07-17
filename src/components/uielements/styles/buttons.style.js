import styled from 'styled-components';
// import { palette } from 'styled-theme';
import notifyMark from 'images/common/widget-notify-mark.png';
import settings from 'images/common/widget-icon-settings.png';
import reload from 'images/common/widget-icon-reload.png';
import popup from 'images/common/widget-icon-popup.png';
import find from 'images/common/widget-icon-find.png';
import addCircle from 'images/common/widget-icon-add.png';
import draggableSymbol from 'images/common/widget-icon-draggable.png';
import draggableSymbol2 from 'images/common/widget-icon-draggable2.png';
import draggableSymbol2Over from 'images/common/widget-icon-draggable2-over.png';
import widgetElmtDel from 'images/common/widget-icon-delete.png';
import ShareRedIcon from 'images/bizstore/icon-share.png';

const BtnIconNotify = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 34px;
  background: url(${notifyMark}) no-repeat 1px 1px;
`;

const BtnIconSettings = styled.button`
  width: 32px;
  height: 45px;
  background: url(${settings}) no-repeat center;
`;

const BtnIconReload = styled.button`
  display: inline-block;
  width: 32px;
  height: 45px;
  background: url(${reload}) no-repeat center;
`;

const BtnIconSeeDetails = styled.button`
  display: inline-block;
  width: 33px;
  height: 45px;
  background: url(${popup}) no-repeat center;
`;

const BtnIconFind = styled.button`
  display: inline-block;
  width: 32px;
  height: 32px;
  background: url(${find}) no-repeat 50% 50%;
`;

const BtnIconAdd = styled.button`
  width: 24px;
  height: 24px;
  border: 1px solid #909090;
  border-radius: 50%;
  background: url(${addCircle}) no-repeat 50% 50%;

  &:focus {
    border: 1px solid #909090;
  }
`;

const BtnIconDragSymbol = styled.button`
  width: 22px;
  height: 100%;
  background: url(${draggableSymbol}) no-repeat 50% 10px;
`;

const BtnIconDragSymbol2 = styled.div`
  width: 69px;
  height: 100%;
  background: url(${draggableSymbol2}) no-repeat 50% 50%;
  cursor: n-resize;

  &:hover {
    background-image: url(${draggableSymbol2Over});
  }
`;

const BtnIconWidgetDel = styled.button`
  width: 23px;
  height: 25px;
  cursor: pointer;
  background: url(${widgetElmtDel}) no-repeat 50% 50%;
`;

/* 공유하기 */
const BtnRedShare = styled.button`
  display: inline-block;
  min-width: 90px;
  height: 32px;
  padding: 0 10px 0 30px;
  border: 0;
  color: #f85023;
  font-size: 14px;
  line-height: 32px;
  background: #ffffff url(${ShareRedIcon}) no-repeat 7px 50%;
  cursor: pointer;

  @media only screen and (max-width: 1024px) {
    height: 25px;
    padding: 0 5px 0 30px;
    font-size: 12px;
    line-height: 1;
  }
`;
export {
  BtnIconNotify,
  BtnIconSettings,
  BtnIconReload,
  BtnIconSeeDetails,
  BtnIconFind,
  BtnIconAdd,
  BtnIconDragSymbol,
  BtnIconWidgetDel,
  BtnIconDragSymbol2,
  BtnRedShare,
};
