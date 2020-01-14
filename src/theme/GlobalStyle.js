import { createGlobalStyle } from 'styled-components';
import iconInfo from 'images/portal/icon-info.png';
import iconTalk from 'images/portal/icon-talk.png';
import iconMail from 'images/portal/icon-mail.png';
import iconTodo from 'images/portal/icon-todo.png';
import iconHithanks from 'images/portal/icon-hithanks.png';
import iconSettings from 'images/portal/icon_settings.png';
import iconCheckBefore from 'images/portal/icon-check-before.png';
import iconCheckAfter from 'images/portal/icon-check-after.png';

const GlobalStyle = createGlobalStyle`
/* @charset 'UTF-8'; */

/* body {overflow: hidden;} */
html {
  -ms-overflow-style: -ms-autohiding-scrollbar;
}

/* webkit scrollbar transparent - skin 적용시 크롬에서 눈에 띔 */
.custom-scrollbar > div::-webkit-scrollbar,
.FullScreen.Active::-webkit-scrollbar {
  width: 0 !important;
}

/* .custom-scrollbar > div, .FullScreen.Active { -ms-overflow-style: none; } */
.custom-scrollbar > div,
.FullScreen.Active {
  overflow: -moz-scrollbars-none;
}

.gipms {
  -ms-overflow-style: auto !important;
}

/* 알림 숫자 폰트 지정 (IE와 Chrome에서 폰트가 달리 적용됨) */
.ant-badge {
  font-family: 'Noto Sans Light', 'Malgun Gothic', 'Roboto', sans-serif;
}

/* 버튼 */
.ant-btn,
.ant-btn:hover,
.ant-btn:focus {
  border-color: transparent;
  border: 0;
}

.ant-btn-clicked:after {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border: 1px solid transparent;
  animation: none;
  opacity: 0;
  display: none;
}

.ant-btn:after {
  animation: none;
}

/* 체크박스 기본형 - 
  공통화하기 어려움 (예: 모듈에서 옵션으로 제공하는 체크박스를 적용하는 경우가 있음)
  CheckboxGroup 안에 Checkbox 컴포넌트 정의가 없어서 antd 스타일만 적용되는 경우가 있으므로
  여기(global.css)에서 재정의를 함.
*/
.ant-checkbox-wrapper + .ant-checkbox-wrapper {
  margin-left: 8px;
}

.ant-checkbox-wrapper + span,
.ant-checkbox + span {
  padding-left: 8px;
  padding-right: 8px;
}

.ant-checkbox-wrapper:hover .ant-checkbox-inner,
.ant-checkbox:hover .ant-checkbox-inner {
  border-color: #6e4e9e;
}

.ant-checkbox {
  top: -2px;
}

.ant-checkbox-checked:after {
  border: 1px solid #6e4e9e;
}

.ant-checkbox-checked .ant-checkbox-inner {
  background-color: #7a59ad;
  border-color: #6e4e9e;
}

.ant-checkbox-inner {
  width: 1.125rem;
  height: 1.125rem;
  border: #adb5bd solid 2px;
}

.ant-checkbox-checked .ant-checkbox-inner::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
  background-size: 50% 50%;
  position: absolute;
  display: block;
  width: 1.125rem;
  height: 1.125rem;
  content: '';
  background-repeat: no-repeat;
  background-position: 0.125rem 0.125rem;
  top: 0;
  left: 0;
  border: none;
  transform: none;
}

/* 비활성화(disabled) */
.ant-checkbox-disabled {
  cursor: not-allowed;
}

.ant-checkbox-disabled.ant-checkbox-checked .ant-checkbox-inner:after {
  -webkit-animation-name: none;
  animation-name: none;
  border-color: rgba(0, 0, 0, 0.25);
}

.ant-checkbox-disabled .ant-checkbox-input {
  cursor: not-allowed;
}

.ant-checkbox-disabled .ant-checkbox-inner {
  border-color: #d9d9d9 !important;
  background-color: #f5f5f5;
}

.ant-checkbox-disabled .ant-checkbox-inner:after {
  -webkit-animation-name: none;
  animation-name: none;
  border-color: #f5f5f5;
}

.ant-checkbox-disabled + span {
  color: rgba(0, 0, 0, 0.25);
  cursor: not-allowed;
}

/* CheckboxGroup */
.ant-checkbox-group-item {
  margin-right: 8px;
  width: 180px;
}

.ant-checkbox-group-item:last-child {
  margin-right: 0;
}

.ant-checkbox-group-item + .ant-checkbox-group-item {
  margin-left: 0;
}

/* 전체 레이아웃 */
.portalLayout .sc-bdVaJa {
  width: 100%;
}

.portalLayout .ant-layout-sider {
  flex: 0 0 300px !important;
  max-width: 300px !important;
  min-width: 300px !important;
  width: 300px !important;
  position: fixed;
  top: 90px;
  height: calc(100vh - 90px);
  background: #ffffff;
  border-top: 1px solid #c3c4c7;
  z-index: 990;
}

@media only screen and (max-width: 1024px) {
  .portalLayout .ant-layout-sider {
    display: none;
    /* 임시 */
  }

  .portalLayout .custom-scrollbar > div:first-child {
    overflow: hidden scroll !important;
  }

  /* custom scrollbar 수평 스크롤로 하단에 생기는 공간 없앰 */
}

/* Header toktok서브메뉴, 언어선택 서브메뉴 -- content 스타일: StyledHeader.js 정의됨*/
.ant-popover-placement-bottom > .ant-popover-content > .ant-popover-arrow,
.ant-popover-placement-bottomLeft > .ant-popover-content > .ant-popover-arrow,
.ant-popover-placement-bottomRight > .ant-popover-content > .ant-popover-arrow {
  box-shadow: unset;
}

.submenu01,
.submenu02 {
  margin: 0;
}

.submenu01 .ant-popover-arrow,
.submenu02 .ant-popover-arrow {
  border-top: 1px solid #c9c9c9;
  border-left: 1px solid #c9c9c9;
}

.submenu01 .ant-popover-inner-content {
  padding: 3px 5px;
  overflow: hidden;
  border: 1px solid #c9c9c9;
}

.submenu02 .ant-popover-inner-content {
  width: 80px;
  height: 20px;
  padding: 0 10px;
  border: 1px solid #c9c9c9;
}

/* 알림 Popover (content 제외) -- content 스타일: StyleUserNotice.js 정의됨*/
.alarmPopover {
  position: fixed;
  top: 30px !important;
  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.3);
}

.alarmPopover.ant-popover-placement-bottom,
.alarmPopover.ant-popover-placement-bottomLeft,
.alarmPopover.ant-popover-placement-bottomRight {
  padding-top: 12px;
}

.alarmPopover .ant-popover-arrow {
  top: 9px !important;
  left: 305px !important;
  width: 9px;
  height: 9px;
}

.alarmPopover .ant-popover-inner {
  min-width: 420px;
  height: 280px;
  /* border: 1px solid #a5a5a5; */
  border-radius: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.alarmPopover .ant-popover-inner-content {
  padding: 0 !important;
}

@media only screen and (max-width: 1024px) {
  .alarmPopover .ant-popover-arrow {
    left: auto !important;
    right: 15px;
  }
}

@media only screen and (max-width: 414px) {
  .alarmPopover {
    left: auto;
    right: 0;
    width: 100%;
  }

  .alarmPopover .ant-popover-inner {
    min-width: 320px;
  }
}

/* 알림 Popover(Mobile) (content 제외) -- content 스타일: StyleUserNotice.js 정의됨*/
.alarmPopoverMobile {
  position: fixed;
  top: 30px !important;
  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.3);
}

.alarmPopoverMobile.ant-popover-placement-bottom,
.alarmPopoverMobile.ant-popover-placement-bottomLeft,
.alarmPopoverMobile.ant-popover-placement-bottomRight {
  padding-top: 12px;
}

.alarmPopoverMobile .ant-popover-arrow {
  top: 9px !important;
  left: 306px !important;
  width: 9px;
  height: 9px;
}

.alarmPopoverMobile .ant-popover-inner {
  min-width: 420px;
  height: 625px;
  /* border: 1px solid #a5a5a5; */
  border-radius: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.alarmPopoverMobile .ant-popover-inner-content {
  padding: 0 !important;
}

@media only screen and (max-width: 1024px) {
  .alarmPopoverMobile .ant-popover-arrow {
    left: auto !important;
    right: 15px;
  }
}

@media only screen and (max-width: 414px) {
  .alarmPopoverMobile {
    left: auto;
    right: 0;
    width: 100%;
  }

  .alarmPopoverMobile .ant-popover-inner {
    min-width: 320px;
    height: calc(100vh - 42px);
  }
}

/* 담당자 정보 Popover (content 제외) -- content 스타일: StyleUserNotice.js 정의됨*/
/* .managerPopover {position:fixed; top: 30px !important;} */
.managerPopover.ant-popover-placement-bottom,
.managerPopover.ant-popover-placement-bottomLeft,
.managerPopover.ant-popover-placement-bottomRight {
  padding-top: 12px;
}

.managerPopover .ant-popover-arrow {
  /*top: 9px !important;*/
  top: 0 !important;
  left: 12px !important;
  width: 9px;
  height: 9px;
  background: #f3f3f3;
}

.managerPopover .ant-popover-inner {
  min-width: 300px;
  max-height: 220px;
  border-radius: 0;
  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  margin-top: -9px;
}

.managerPopover .ant-popover-inner-content {
  padding: 0 !important;
  max-height: 240px;
}

/* .managerPopover .popoverTitle {height: 30px;}
.managerPopover .popoverBody {max-height: 186px;} */
/* IE10+ specific styles go here */
/* @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  .managerPopover .popoverBody { max-height: 170px; margin-bottom: 6px; }
}
.managerPopover .popoverTitle, .managerPopover .popoverBody {color: #404040; font-size: 12px;} */

/* 알림 > 커스텀 체크박스 */
.customCheckboxType1 .ant-checkbox-inner {
  border: 0;
  background: url(${iconCheckBefore}) no-repeat 50% 70%;
}

.customCheckboxType1:hover .ant-checkbox-inner,
.customCheckboxType1:hover .ant-checkbox:hover .ant-checkbox-inner,
.customCheckboxType1 .ant-checkbox-input:focus + .ant-checkbox-inner,
.customCheckboxType1 .ant-checkbox-checked:after,
.customCheckboxType1 .ant-checkbox-checked .ant-checkbox-inner:after {
  border: 0;
}

.customCheckboxType1 .ant-checkbox-checked .ant-checkbox-inner {
  background-image: url(${iconCheckAfter});
}

/* 구성원 검색 Popover */
.userProfileMenu {
  padding-left: 5px;
}

.userProfileMenu .ant-popover-content .ant-popover-arrow {
  display: none;
}

.userProfileMenu .ant-popover-content .ant-popover-inner {
  -webkit-box-shadow: none;
  box-shadow: none;
}

.userProfileMenu .ant-popover-content .ant-popover-inner-content {
  min-width: 115px;
  /* min-height: 85px; */
  padding: 3px 7px;
  border-radius: 3px;
  background-color: #474747;
  box-shadow: unset;
}

.userProfileMenu .ant-popover-content .ant-popover-title {
  width: 100%;
  height: 42px;
  padding-left: 16px;
  color: #555555;
  font-size: 13px;
}

.userProfileMenu .userProfileMenuList {
  padding: 0;
}

.userProfileMenu .userProfileMenuList li:not(:last-child) {
  border-bottom: 1px solid #858585;
}

.userProfileMenu .ant-popover-content button {
  height: 25px;
  padding: 0 0 0 30px;
  color: #ffffff;
  font-size: 12px;
  line-height: 25px;
  border: 0;
  background-color: #474747;
}

.userProfileMenu .ant-popover-content .highlight {
  color: #fd8c08;
}

.userProfileMenu .ant-popover-content .icon-info {
  background: url(${iconInfo}) no-repeat 8px 50%;
}

.userProfileMenu .ant-popover-content .icon-talk {
  background: url(${iconTalk}) no-repeat 7px 50%;
}

.userProfileMenu .ant-popover-content .icon-mail {
  background: url(${iconMail}) no-repeat 0 50%;
}

.userProfileMenu .ant-popover-content .icon-todo {
  background: url(${iconTodo}) no-repeat 8px 50%;
}

.userProfileMenu .ant-popover-content .icon-hithanks {
  background: url(${iconHithanks}) no-repeat 7px 50%;
}

.userProfileMenu .ant-popover-content .icon-settings {
  background: url(${iconSettings}) no-repeat 7px 50%;
}

/* 미등록 App알림 수신 Popover */
.userMenuNotification {
  top: 42px !important;
  left: 350px !important;
}

.userMenuNotification .ant-popover-content .ant-popover-title {
  width: 100%;
  height: 42px;
  padding-left: 16px;
  color: #555555;
  font-size: 13px;
  text-align: center;
}

.userMenuNotification .ant-popover-content .ant-popover-arrow {
  top: 24px;
  left: 7px;
  border-left: 1px solid #a5a5a5;
  border-bottom: 1px solid #a5a5a5;
}

.userMenuNotification .ant-popover-content .ant-popover-inner {
  width: 232px;
  border: 1px solid #a5a5a5;
  border-radius: 0;
  box-shadow: unset;
}

.userMenuNotification .ant-popover-content .ant-popover-inner .ant-popover-title {
  width: 100%;
  height: 45px;
  padding: 0 16px;
  border-bottom: 1px solid #e5e5e5;
  color: #555555;
  font-size: 13px;
  line-height: 45px;
}

.userMenuNotification .ant-popover-content .ant-popover-inner-content {
  height: 315px;
  padding: 0;
}

.userMenuNotification .ant-badge.badgeCount {
  right: 20px;
}

/* 모달창 스타일 */
/* CASE 1: react-modal 에서 import 한 경우 */
.portalCommonModal .ReactModal__Overlay.ReactModal__Overlay--after-open {
  border: none;
  background: rgba(0, 0, 0, 0.25) !important;
  overflow: unset;
  z-index: 1020;
}

.portalCommonModal .ReactModal__Content.ReactModal__Content--after-open {
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  background: transparent !important;
  width: auto !important;
  height: auto !important;
  transform: none !important;
  overflow: hidden !important;
  padding: 0 !important;
  border-radius: 0 !important;
  border: 0 !important;
}

/* 로달창(Rodal) 스타일 -- 위젯(게시판) 더보기 클릭하면 나오는 모달창 */
.drillDownCon .rodal-dialog .rodal-close {
  top: 8px;
}

/* 창닫기 아이콘 버튼 */
.drillDownCon .rodal-dialog .rodal-close::before,
.drillDownCon .rodal-dialog .rodal-close::after {
  background: #ffffff;
}

@media only screen and (max-width: 1760px) {
  .drillDownCon .rodal-dialog {
    width: 100%;
    max-width: 1380px;
  }

  /* Desktop */
  .ant-esitmated-time-container {
    min-width: 200px;
  }
}

@media only screen and (max-width: 1460px) {
  .drillDownCon .rodal-dialog {
    width: 100%;
    max-width: 980px;
  }

  /* DesktopNarrow */
  .ant-esitmated-time-container {
    min-width: 200px;
  }
}

@media only screen and (max-width: 1160px) {
  .drillDownCon .rodal-dialog {
    width: 100%;
    max-width: 650px;
    height: calc(100vh - 150px) !important;
    margin-top: 50px;
  }

  /* Tablet */
  .ant-esitmated-time-container {
    width: 100% !important;
  }

  .ant-estimated-time-subcontainer {
    width: 100% !important;
  }
}

@media only screen and (max-width: 650px) {
  .drillDownCon .rodal-dialog {
    max-width: calc(100% - 20px);
  }

  /* Mobile */
  .ant-estimated-time-container {
    width: 100% !important;
  }

  .ant-estimated-time-subcontainer {
    width: 100% !important;
  }
}

/* 알림창 message */
.ant-message {
  z-index: 2000;
}

/* iframe : 스크롤바 생기지 않고 화면에 꽉 차게, dock 고정 | 고정해제 적용 */
.legacy {
  /* legacy iframe 사이즈 조절 */
  /*
  position: absolute !important;
  top: 0;
  left: 5px;
  bottom: 0;
  width: calc(100% - 5px) !important;
  */
  width: 100%; /* */
  border-width: 1px 0 0 0;
  border-color: #ffffff;
  height: calc(100vh - 42px) !important;
  background: #ffffff;
}

.testDiv {
  max-width: 100%;
  margin: 0 auto;
  display: -ms-flexbox;
  display: flex;
  padding: 0 16px;
  text-align: center;
  -ms-flex-direction: column;
  flex-direction: column;
}

.testDiv02 {
  /* position: fixed; */
  width: 0px;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 1000;
}

.testClass {
  position: fixed;
  z-index: 1;
  background: rgba(0, 0, 0, 0.2);
  right: calc(100% - 45px);
  bottom: 0px;
  width: 45px;
  height: 100%;
  padding-bottom: 20px;
  -webkit-transition: left 0.1s ease-out 0s, ease-out 0s, ease-out 0s, ease-out 0s;
  -o-transition: left 0.1s ease-out 0s, ease-out 0s, ease-out 0s, ease-out 0s;
  transition: left 0.1s ease-out 0s, ease-out 0s, ease-out 0s, ease-out 0s;
  opacity: 1;
}

.testClass02 {
  position: fixed;
  z-index: 1;
  background: rgba(0, 0, 0, 0.2);
  right: calc(100% - 406px);
  bottom: 0px;
  width: 360px;
  height: 100%;
  padding-bottom: 20px;
  -webkit-transition: left 0.1s ease-out 0s, ease-out 0s, ease-out 0s, ease-out 0s;
  -o-transition: left 0.1s ease-out 0s, ease-out 0s, ease-out 0s, ease-out 0s;
  transition: left 0.1s ease-out 0s, ease-out 0s, ease-out 0s, ease-out 0s;
  opacity: 1;
}

.links {
  width: 90%;
  margin: 0 auto;
}

.link {
  transition: all 0.3s ease-in-out;
  display: inline-block;
  width: 100px;
  height: 40px;
  line-height: 40px;
  border: 2px solid white;
  text-transform: capitalize;
  border-radius: 2px;
  margin: 5px;
  position: relative;
  overflow: hidden;
}

.l1:before {
  transition: all 0.1s linear;
  content: attr(value);
  display: block;
}

.l1:after {
  transition: all 0.3s ease-in-out;
  content: '';
  display: block;
  background-color: white;
  margin-top: 0px;
  height: 40px;
}

.l1:hover:after {
  margin-top: -40px;
}

.l1:hover {
  color: #e22575;
}

div.button {
  position: absolute;
  top: 50%;
  left: 59px;
  transform: translate(-50%, -50%);
}

div.button input {
  padding: 5px;
  width: 100%;
  font-size: 18px;
}

`;

export default GlobalStyle;
