import styled from 'styled-components';
// import { palette } from 'styled-theme';
import TriangleIcon from 'images/bizstore/arrow-triangle.png';
import ShareWhiteIcon from 'images/bizstore/icon-share-white.png';
import RgtIcon from 'images/bizstore/icon-menu-rgt2.png';
import ShareRedIcon from 'images/bizstore/icon-share.png';
import WriteIcon from 'images/bizstore/icon-write.png';
import ReviewIcon from 'images/bizstore/icon-rating.png';
import DeleteIcon from 'images/bizstore/icon-modal-delete.png';
import SeeMoreBtnDown from 'images/bizstore/arrow-down2.png';
import SeeMoreBtnUp from 'images/bizstore/arrow-up2.png';

import TreeIcon from 'images/bizstore/icon-category-rgt.png';
import AppIcon from 'images/bizstore/icon-menu-rgt3.png';
import DeleteBtnIcon from 'images/bizstore/icon-delete.png';
import ListBtnIcon from 'images/bizstore/icon-list.png';
import LinkBtnUpdateIcon from 'images/common/icon-update.png';

import PreviewIcon from 'images/common/icon-preview.png';
import SettingsIcon from 'images/common/icon-settings.png';

import PlusIcon from 'images/bizstore/icon-plus.png';
import PrevIcon from 'images/bizstore/icon-prev.png';
import NextIcon from 'images/bizstore/icon-next.png';

// Gray Tone 버튼
const BtnBlack = styled.button`
  
`;

// BtnDkGray = Dark Gray (검정색에 가까운 회색)
const BtnDkGray = styled.button`
  min-width:90px;
  height:30px;
  padding: 0 15px;
  background-color:#333333;
  border: 1px solid #333333;
  border-radius: 3px;
  font-size:13px;
  color:#ffffff;
  line-height: 29px;
  cursor: pointer;

  &:hover, &:focus {
    background-color:#333333;
    border:1px solid #333333;
    color:#ffffff;
    border-color:#333333;
  }

  &.disabled, &:disabled {
    background-color:#909090;
    border:1px solid #909090;
    color:#dadada;
    cursor: default;
  }
`;

// BtnSearchDkGray = 조회 Dark Gray (검정색에 가까운 회색)
const BtnSearchDkGray = styled.button`
  min-width:90px;
  height:30px;
  padding: 0 15px;
  background-color:#333333;
  border: 1px solid #333333;
  border-radius: 30px;
  font-size:13px;
  color:#ffffff;
  line-height: 29px;
  cursor: pointer;

  &:hover, &:focus {
    background-color:#333333;
    border:1px solid #333333;
    color:#ffffff;
    border-color:#333333;
  }

  &.disabled, &:disabled {
    background-color:#909090;
    border:1px solid #909090;
    color:#dadada;
    cursor: default;
  }
`;

// 링크(link) 버튼 : Dark Gray (검정색에 가까운 회색)
const LinkBtnDkGray = styled.span`
  display: inline-block;
  min-width:90px;
  height:30px;
  padding: 0 15px;
  background-color:#333333;
  border: 1px solid #333333;
  border-radius: 3px;
  font-size:13px;
  color:#ffffff;
  text-align: center;
  line-height: 29px;
  cursor: pointer;

  &:hover, &:focus, a, a:hover, a:focus {
    background-color:#333333;
    border:1px solid #333333;
    color:#ffffff;
    border-color:#333333;
  }

  &.disabled {
    background-color:#909090;
    border:1px solid #909090;
    color:#dadada;
    cursor: default;
  }

  a {
    display: block;
    height: 29px;
  }
`;

// Gray (중간 회색)
const BtnGray = styled.button`
  min-width:90px;
  height:30px;
  padding: 0 15px;  
  background-color:#696969;
  border: 1px solid #696969;
  border-radius: 3px;
  font-size:13px;
  color:#ffffff;
  line-height: 29px;
  cursor: pointer;

  &:hover, &:focus {
    background-color:#696969;
    border:1px solid #696969;
    color:#ffffff;
    border-color:#696969;
  }
`;

// Light Gray (밝은 회색)
const BtnLgtGray = styled.button`
  min-width:90px;
  height:30px;
  padding: 0 15px;
  background-color:#dadada;
  border: 1px solid #dadada;
  border-radius: 3px;
  font-size:13px;
  color:#333333;
  text-align: center;
  line-height: 29px;
  cursor: pointer;

  &:hover, &:focus {
    background-color:#dadada;
    border:1px solid #dadada;
    color:#333333;
  }
`;
// 링크(link) 버튼 : Light Gray (밝은 회색)
const LinkBtnLgtGray = styled.span`
  display: inline-block;
  min-width:90px;
  height:30px;
  padding: 0 15px;
  background-color:#dadada;
  border: 1px solid #dadada;
  border-radius: 3px;
  font-size:13px;
  color:#333333;
  text-align: center;
  line-height: 29px;
  cursor: pointer;

  &:hover, &:focus, a, a:hover, a:focus {
    background-color:#dadada;
    border:1px solid #dadada;
    color:#333333;
  }

  a {
    display: block;
    height: 29px;
  }
`;

// 앱 '사용중' 버튼
const BtnLgtGrayRegisted = styled.button`
  min-width: 90px;
  height:30px;
  padding: 0 15px;
  background-color: #e0e0e0;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  color: #f35610;
  line-height: 29px;
  pointer-events: none;
  vertical-align: middle;

  @media only screen and (max-width: 1024px) {
    height: 25px;
    padding: 0 10px;
    font-size: 12px;
    line-height: 25px;
  }
`;

/* 카테고리 등록 */
const BtnRedCgrRegist = styled.button`
  min-width: 130px;
  height: 32px;
  padding: 0 15px;
  border: 0;
  color: #ffffff;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -1px;
  border-radius: 3px;
  background-color: #f35610;
  cursor: pointer;

  @media only screen and (max-width: 1024px) {
    min-width: 90px;
    height: 25px;
    padding: 0 10px;
    font-size: 12px;
    line-height: 25px;
  }
`;
/* 메뉴 등록 */
const BtnRedMnRegist = styled.button`
  min-width: 110px;
  height: 32px;
  padding: 0 15px;
  border: 0;
  color: #ffffff;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -1px;
  border-radius: 3px;
  background-color: #f35610;
  cursor: pointer;

  @media only screen and (max-width: 1024px) {
    min-width: 90px;
    height: 25px;
    padding: 0 10px;
    font-size: 12px;
    line-height: 25px;
  }
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
  background:#ffffff url(${ShareRedIcon}) no-repeat 7px 50%;
  cursor: pointer;

  @media only screen and (max-width: 1024px) {
    height: 25px;
    padding: 0 5px 0 30px;
    font-size: 12px;
    line-height: 1;
  }
`;

/* 화살표 아이콘 */
const BtnWhiteArr = styled.button`
  min-width: 80px;
  height: 27px;
  padding: 0 10px 0 20px;
  border: 1px solid #d2d2d2 !important;
  border-radius: 3px;
  color: #555555;
  font-size: 13px;
  background:#ffffff url(${TriangleIcon}) no-repeat 8px 50%;
  letter-spacing: -0.5px;
  line-height: 26px;
  cursor: pointer;

  &:hover, &:focus {
    border-color: #d2d2d2;
  }

  @media only screen and (max-width: 1024px) {
    min-width: 60px;
    height: 25px;
    padding: 0 5px 0 10px;
    font-size: 10px;
    background-size: 5px 6px;
    background-position: 7px 50%;
    line-height: 1;
  }
`;
/* 연필 아이콘 - FAQ, Q&A 작성 */
const BtnWhiteWrite = styled.button`
  min-width: 98px;
  height: 30px;
  padding: 7px 10px 7px 30px;
  border: 1px solid #d2d2d2 !important;
  border-radius: 3px;
  color: #555555;
  font-size: 12px;
  line-height: 1;
  text-align: left;
  background:#ffffff url(${WriteIcon}) no-repeat 10px 50%;
  cursor: pointer;

  &:hover, &:focus {
    border-color: #d2d2d2;
  }
`;
/* 리뷰 아이콘 - 별점 작성 */
const BtnWhiteRate = styled.button`
  min-width: 90px;
  height: 30px;
  padding: 7px 10px 7px 30px;
  border: 1px solid #d2d2d2 !important;
  border-radius: 3px;
  color: #555555;
  font-size: 12px;
  line-height: 1;
  text-align: left;
  background:#ffffff url(${ReviewIcon}) no-repeat 10px 50%;
  cursor: pointer;

  &:hover, &:focus {
    border-color: #d2d2d2;
  }
`;
/* 삭제 */
const BtnWhiteDel = styled.button`
  min-width: 56px;
  height: 30px;
  padding: 0 10px 0 22px;
  color: #333333;
  font-size: 13px;
  line-height: 29px;
  border: none;
  background: url(${DeleteIcon}) no-repeat 6px 50%;
  cursor: pointer;

  &:hover, &:focus {
    background-color: transparent;
    border: none;
  }
`;
/* 추가 */
const BtnWhiteAdd = styled.button`
  
`;

/* 참석자 추가 */
const BtnWhiteAttdAdd = styled.button`
min-width: 30px;
height: 30px;
padding: 0 0 0 0;
color: #404040;
font-size: 20px;
line-height: 30px;
text-align:center;
border: 1px solid #dadbdb;
border-radius: 50%;
background: url(${PlusIcon}) no-repeat 15px 50%;
cursor: pointer;
`;

const BtnDelete = styled.button`
  height:30px;
  padding: 0 6px 0 22px;
  color: #333333;
  font-size: 13px;
  line-height: 29px;
  border: none;
  background:#ffffff url(${DeleteBtnIcon}) no-repeat 6px 50%;
  cursor: pointer;
`;

const LinkBtnList = styled.span`
  display: inline-block;
  height:30px;
  padding: 0 6px 0 25px;
  color: #333333;
  font-size: 14px;
  line-height: 29px;
  border: none;
  background:#ffffff url(${ListBtnIcon}) no-repeat 6px 50%;
  cursor: pointer;
`;

const LinkBtnUpdate = styled.span`
  display: inline-block;
  height:30px;
  padding: 0 6px 0 25px;
  color: #333333;
  font-size: 14px;
  line-height: 29px;
  border: none;
  background:#ffffff url(${LinkBtnUpdateIcon}) no-repeat 6px 50%;
  cursor: pointer;
`;
/* 아이콘 > 공유 */
const BtnIconShare = styled.button`
  width: 50px;
  height: 30px;
  border-radius: 3px;
  background:#858585 url(${ShareWhiteIcon}) no-repeat 50% 50%;
  vertical-align: middle;
  cursor: pointer;
`;
/* 아이콘 > 메뉴등록 */
const BtnIconRegist = styled.button`
  width: 50px;
  height: 30px;
  border-radius: 3px;
  background:#585858 url(${RgtIcon}) no-repeat 50% 50%;
  vertical-align: middle;
  cursor: pointer;
`;

/* 아이콘 > 카테고리등록 */
const BtnIconTree = styled.button`
  width: 50px;
  height: 30px;
  border-radius: 3px;
  background:#585858 url(${TreeIcon}) no-repeat 50% 50%;
  cursor: pointer;
`;
/* 아이콘 > 앱등록 */
const BtnIconApp = styled.button`
  width: 50px;
  height: 30px;
  border-radius: 3px;
  background:#585858 url(${AppIcon}) no-repeat 50% 50%;
  cursor: pointer;
`;

/* App 등록하기 - 48p */
const BtnAppRegi = styled.button`
  width: 120px;
  height: 30px;
  border-radius: 3px;
  font-size: 13px;
  background: #333333;
  cursor: pointer;
`;

const BtnSeeMore = styled.button`
  width: 100%;
  height: 40px;
  padding: 0;
  border: 0;
  cursor: pointer;

  &.up {
    background: #ffffff url(${SeeMoreBtnUp}) no-repeat 50% 50%;
  }

  &.down {
    background: #ffffff url(${SeeMoreBtnDown}) no-repeat 50% 50%;
  }
`;

const BtnBizPreview = styled.button`
  width: 40px;
  height: 30px;
  // border-radius: 3px;
  background: url(${PreviewIcon}) no-repeat 50% 50%;
  vertical-align: middle;
  cursor: pointer;
`;

const BtnBizSettings = styled.button`
  width: 40px;
  height: 30px;
  // border-radius: 3px;
  background: url(${SettingsIcon}) no-repeat 50% 50%;
  vertical-align: middle;
  cursor: pointer;
`;

// BtnSearchDkGray = 조회 Dark Gray (검정색에 가까운 회색)
const BtnApprovalLightRed = styled.button`
  min-width:90px;
  height:30px;
  padding: 0 15px;
  background-color:#ffffff;
  border: 1px solid #ee520a;
  border-radius: 30px;
  font-size:13px;
  color:#ee520a;
  line-height: 29px;
  cursor: pointer;

  &:hover, &:focus {
    background-color:#ee520a;
    border:1px solid #ee520a;
    color:#ffffff;
    border-color:#ee520a;
  }

  &.disabled, &:disabled {
    background-color:#909090;
    border:1px solid #909090;
    color:#dadada;
    cursor: default;
  }
`;

// BtnApprovalPrev = 이전버튼 (검정색에 가까운 회색)
const BtnApprovalPrev = styled.button`
  min-width:55px;
  height:30px;
  padding: 5 15 5 15px;  
  background: #dadada url(${PrevIcon}) no-repeat 50% 50%;
  background-size:20px 20px;
  border: 1px solid #dadada;
  border-radius: 30px;
  font-size:13px;
  color:#ffffff;
  line-height: 29px;
  cursor: pointer;

  &:hover, &:focus {
    background-color:#333333;
    border:1px solid #333333;
    color:#ffffff;
    border-color:#333333;
  }

  &.disabled, &:disabled {
    background-color:#909090;
    border:1px solid #909090;
    color:#dadada;
    cursor: default;
  }
`;

// BtnApprovalPrev = 이전버튼 (검정색에 가까운 회색)
const BtnApprovalNext = styled.button`
  min-width:55px;
  height:30px;
  padding: 5 15 5 15px;  
  background: #dadada url(${NextIcon}) no-repeat 50% 50%;
  background-size:20px 20px;
  border: 1px solid #dadada;
  border-radius: 30px;
  font-size:13px;
  color:#ffffff;
  line-height: 29px;
  cursor: pointer;

  &:hover, &:focus {
    background-color:#333333;
    border:1px solid #333333;
    color:#ffffff;
    border-color:#333333;
  }

  &.disabled, &:disabled {
    background-color:#909090;
    border:1px solid #909090;
    color:#dadada;
    cursor: default;
  }
`;

const ImsiCss = styled.div`
.ui.modal{position:absolute;display:none;z-index:1001;text-align:left;background:#fff;border:none; -webkit-box-shadow:1px 3px 3px 0 rgba(0,0,0,.2),1px 3px 15px 2px rgba(0,0,0,.2);  box-shadow:1px 3px 3px 0 rgba(0,0,0,.2),1px 3px 15px 2px rgba(0,0,0,.2);  -webkit-transform-origin:50% 25%;  transform-origin:50% 25%;  -webkit-box-flex:0; -ms-flex:0 0 auto; flex:0 0 auto;  border-radius:.28571429rem;  -webkit-user-select:text; -moz-user-select:text;-ms-user-select:text; user-select:text;  will-change:top,left,margin,transform,opacity; }.ui.modal>.icon:first-child+*,.ui.modal>:first-child:not(.icon){border-top-left-radius:.28571429rem;border-top-right-radius:.28571429rem}.ui.modal>:last-child{border-bottom-left-radius:.28571429rem;border-bottom-right-radius:.28571429rem}.ui.modal>.close{cursor:pointer;position:absolute;top:-2.5rem;right:-2.5rem;z-index:1;opacity:.8;font-size:1.25em;color:#fff;width:2.25rem;height:2.25rem;padding:.625rem 0 0 0}.ui.modal>.close:hover{opacity:1}.ui.modal>.header{display:block;font-family:Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;background:#fff;margin:0;padding:1.25rem 1.5rem;-webkit-box-shadow:none;box-shadow:none;color:rgba(0,0,0,.85);border-bottom:1px solid rgba(34,36,38,.15)}.ui.modal>.header:not(.ui){font-size:1.42857143rem;line-height:1.28571429em;font-weight:700}.ui.modal>.content{display:block;width:100%;font-size:1em;line-height:1.4;padding:1.5rem;background:#fff}.ui.modal>.image.content{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.ui.modal>.content>.image{display:block;-webkit-box-flex:0;-ms-flex:0 1 auto;flex:0 1 auto;width:'';-ms-flex-item-align:top;align-self:top}.ui.modal>[class*="top aligned"]{-ms-flex-item-align:top;align-self:top}.ui.modal>[class*="middle aligned"]{-ms-flex-item-align:middle;align-self:middle}.ui.modal>[class*=stretched]{-ms-flex-item-align:stretch;align-self:stretch}.ui.modal>.content>.description{display:block;-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;min-width:0;-ms-flex-item-align:top;align-self:top}.ui.modal>.content>.icon+.description,.ui.modal>.content>.image+.description{-webkit-box-flex:0;-ms-flex:0 1 auto;flex:0 1 auto;min-width:'';width:auto;padding-left:2em}.ui.modal>.content>.image>i.icon{margin:0;opacity:1;width:auto;line-height:1;font-size:8rem}.ui.modal>.actions{background:#f9fafb;padding:1rem 1rem;border-top:1px solid rgba(34,36,38,.15);text-align:right}.ui.modal .actions>.button{margin-left:.75em}@media only screen and (max-width:767px){.ui.modal{width:95%;margin:0}}@media only screen and (min-width:768px){.ui.modal{width:88%;margin:0}}@media only screen and (min-width:992px){.ui.modal{width:850px;margin:0}}@media only screen and (min-width:1200px){.ui.modal{width:900px;margin:0}}@media only screen and (min-width:1920px){.ui.modal{width:950px;margin:0}}@media only screen and (max-width:991px){.ui.modal>.header{padding-right:2.25rem}.ui.modal>.close{top:1.0535rem;right:1rem;color:rgba(0,0,0,.87)}}@media only screen and (max-width:767px){.ui.modal>.header{padding:.75rem 1rem!important;padding-right:2.25rem!important}.ui.modal>.content{display:block;padding:1rem!important}.ui.modal>.close{top:.5rem!important;right:.5rem!important}.ui.modal .image.content{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.ui.modal .content>.image{display:block;max-width:100%;margin:0 auto!important;text-align:center;padding:0 0 1rem!important}.ui.modal>.content>.image>i.icon{font-size:5rem;text-align:center}.ui.modal .content>.description{display:block;width:100%!important;margin:0!important;padding:1rem 0!important;-webkit-box-shadow:none;box-shadow:none}.ui.modal>.actions{padding:1rem 1rem 0!important}.ui.modal .actions>.button,.ui.modal .actions>.buttons{margin-bottom:1rem}}.ui.inverted.dimmer>.ui.modal{-webkit-box-shadow:1px 3px 10px 2px rgba(0,0,0,.2);box-shadow:1px 3px 10px 2px rgba(0,0,0,.2)}.ui.basic.modal{background-color:transparent;border:none;border-radius:0;-webkit-box-shadow:none!important;box-shadow:none!important;color:#fff}.ui.basic.modal>.actions,.ui.basic.modal>.content,.ui.basic.modal>.header{background-color:transparent}.ui.basic.modal>.header{color:#fff}.ui.basic.modal>.close{top:1rem;right:1.5rem}.ui.inverted.dimmer>.basic.modal{color:rgba(0,0,0,.87)}.ui.inverted.dimmer>.ui.basic.modal>.header{color:rgba(0,0,0,.85)}.ui.legacy.modal,.ui.legacy.page.dimmer>.ui.modal{top:50%;left:50%}.ui.legacy.page.dimmer>.ui.scrolling.modal,.ui.page.dimmer>.ui.scrolling.legacy.modal,.ui.top.aligned.dimmer>.ui.legacy.modal,.ui.top.aligned.legacy.page.dimmer>.ui.modal{top:auto}@media only screen and (max-width:991px){.ui.basic.modal>.close{color:#fff}}.ui.loading.modal{display:block;visibility:hidden;z-index:-1}.ui.active.modal{display:block}.modals.dimmer[class*="top aligned"] .modal{margin:5vh auto}@media only screen and (max-width:767px){.modals.dimmer[class*="top aligned"] .modal{margin:1rem auto}}.legacy.modals.dimmer[class*="top aligned"]{padding-top:5vh}@media only screen and (max-width:767px){.legacy.modals.dimmer[class*="top aligned"]{padding-top:1rem}}.scrolling.dimmable.dimmed{overflow:hidden}.scrolling.dimmable>.dimmer{-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}.scrolling.dimmable.dimmed>.dimmer{overflow:auto;-webkit-overflow-scrolling:touch}.scrolling.dimmable>.dimmer{position:fixed}.modals.dimmer .ui.scrolling.modal{margin:1rem auto}.scrolling.undetached.dimmable.dimmed{overflow:auto;-webkit-overflow-scrolling:touch}.scrolling.undetached.dimmable.dimmed>.dimmer{overflow:hidden}.scrolling.undetached.dimmable .ui.scrolling.modal{position:absolute;left:50%;margin-top:1rem!important}.ui.modal .scrolling.content{max-height:calc(80vh - 10em);overflow:auto}.ui.fullscreen.modal{width:95%!important;margin:1em auto}.ui.fullscreen.modal>.header{padding-right:2.25rem}.ui.fullscreen.modal>.close{top:1.0535rem;right:1rem;color:rgba(0,0,0,.87)}.ui.modal{font-size:1rem}.ui.mini.modal>.header:not(.ui){font-size:1.3em}@media only screen and (max-width:767px){.ui.mini.modal{width:95%;margin:0}}@media only screen and (min-width:768px){.ui.mini.modal{width:35.2%;margin:0}}@media only screen and (min-width:992px){.ui.mini.modal{width:340px;margin:0}}@media only screen and (min-width:1200px){.ui.mini.modal{width:360px;margin:0}}@media only screen and (min-width:1920px){.ui.mini.modal{width:380px;margin:0}}.ui.small.modal>.header:not(.ui){font-size:1.3em}@media only screen and (max-width:767px){.ui.tiny.modal{width:95%;margin:0}}@media only screen and (min-width:768px){.ui.tiny.modal{width:52.8%;margin:0}}@media only screen and (min-width:992px){.ui.tiny.modal{width:510px;margin:0}}@media only screen and (min-width:1200px){.ui.tiny.modal{width:540px;margin:0}}@media only screen and (min-width:1920px){.ui.tiny.modal{width:570px;margin:0}}.ui.small.modal>.header:not(.ui){font-size:1.3em}@media only screen and (max-width:767px){.ui.small.modal{width:95%;margin:0}}@media only screen and (min-width:768px){.ui.small.modal{width:70.4%;margin:0}}@media only screen and (min-width:992px){.ui.small.modal{width:680px;margin:0}}@media only screen and (min-width:1200px){.ui.small.modal{width:720px;margin:0}}@media only screen and (min-width:1920px){.ui.small.modal{width:760px;margin:0}}.ui.large.modal>.header{font-size:1.6em}@media only screen and (max-width:767px){.ui.large.modal{width:95%;margin:0}}@media only screen and (min-width:768px){.ui.large.modal{width:88%;margin:0}}@media only screen and (min-width:992px){.ui.large.modal{width:1020px;margin:0}}@media only screen and (min-width:1200px){.ui.large.modal{width:1080px;margin:0}}@media only screen and (min-width:1920px){.ui.large.modal{width:1140px;margin:0}}
.ui.table{width:100%;background:#fff;margin:1em 0;border:1px solid rgba(34,36,38,.15);-webkit-box-shadow:none;box-shadow:none;border-radius:.28571429rem;text-align:left;color:rgba(0,0,0,.87);border-collapse:separate;border-spacing:0}.ui.table:first-child{margin-top:0}.ui.table:last-child{margin-bottom:0}.ui.table td,.ui.table th{-webkit-transition:background .1s ease,color .1s ease;transition:background .1s ease,color .1s ease}.ui.table thead{-webkit-box-shadow:none;box-shadow:none}.ui.table thead th{cursor:auto;background:#f9fafb;text-align:inherit;color:rgba(0,0,0,.87);padding:.92857143em .78571429em;vertical-align:inherit;font-style:none;font-weight:700;text-transform:none;border-bottom:1px solid rgba(34,36,38,.1);border-left:none}.ui.table thead tr>th:first-child{border-left:none}.ui.table thead tr:first-child>th:first-child{border-radius:.28571429rem 0 0 0}.ui.table thead tr:first-child>th:last-child{border-radius:0 .28571429rem 0 0}.ui.table thead tr:first-child>th:only-child{border-radius:.28571429rem .28571429rem 0 0}.ui.table tfoot{-webkit-box-shadow:none;box-shadow:none}.ui.table tfoot th{cursor:auto;border-top:1px solid rgba(34,36,38,.15);background:#f9fafb;text-align:inherit;color:rgba(0,0,0,.87);padding:.78571429em .78571429em;vertical-align:middle;font-style:normal;font-weight:400;text-transform:none}.ui.table tfoot tr>th:first-child{border-left:none}.ui.table tfoot tr:first-child>th:first-child{border-radius:0 0 0 .28571429rem}.ui.table tfoot tr:first-child>th:last-child{border-radius:0 0 .28571429rem 0}.ui.table tfoot tr:first-child>th:only-child{border-radius:0 0 .28571429rem .28571429rem}.ui.table tr td{border-top:1px solid rgba(34,36,38,.1)}.ui.table tr:first-child td{border-top:none}.ui.table tbody+tbody tr:first-child td{border-top:1px solid rgba(34,36,38,.1)}.ui.table td{padding:.78571429em .78571429em;text-align:inherit}.ui.table>.icon{vertical-align:baseline}.ui.table>.icon:only-child{margin:0}.ui.table.segment{padding:0}.ui.table.segment:after{display:none}.ui.table.segment.stacked:after{display:block}@media only screen and (max-width:767px){.ui.table:not(.unstackable){width:100%}.ui.table:not(.unstackable) tbody,.ui.table:not(.unstackable) tr,.ui.table:not(.unstackable) tr>td,.ui.table:not(.unstackable) tr>th{width:auto!important;display:block!important}.ui.table:not(.unstackable){padding:0}.ui.table:not(.unstackable) thead{display:block}.ui.table:not(.unstackable) tfoot{display:block}.ui.table:not(.unstackable) tr{padding-top:1em;padding-bottom:1em;-webkit-box-shadow:0 -1px 0 0 rgba(0,0,0,.1) inset!important;box-shadow:0 -1px 0 0 rgba(0,0,0,.1) inset!important}.ui.table:not(.unstackable) tr>td,.ui.table:not(.unstackable) tr>th{background:0 0;border:none!important;padding:.25em .75em!important;-webkit-box-shadow:none!important;box-shadow:none!important}.ui.table:not(.unstackable) td:first-child,.ui.table:not(.unstackable) th:first-child{font-weight:700}.ui.definition.table:not(.unstackable) thead th:first-child{-webkit-box-shadow:none!important;box-shadow:none!important}}.ui.table td .image,.ui.table td .image img,.ui.table th .image,.ui.table th .image img{max-width:none}.ui.structured.table{border-collapse:collapse}.ui.structured.table thead th{border-left:none;border-right:none}.ui.structured.sortable.table thead th{border-left:1px solid rgba(34,36,38,.15);border-right:1px solid rgba(34,36,38,.15)}.ui.structured.basic.table th{border-left:none;border-right:none}.ui.structured.celled.table tr td,.ui.structured.celled.table tr th{border-left:1px solid rgba(34,36,38,.1);border-right:1px solid rgba(34,36,38,.1)}.ui.definition.table thead:not(.full-width) th:first-child{pointer-events:none;background:0 0;font-weight:400;color:rgba(0,0,0,.4);-webkit-box-shadow:-1px -1px 0 1px #fff;box-shadow:-1px -1px 0 1px #fff}.ui.definition.table tfoot:not(.full-width) th:first-child{pointer-events:none;background:0 0;font-weight:rgba(0,0,0,.4);color:normal;-webkit-box-shadow:1px 1px 0 1px #fff;box-shadow:1px 1px 0 1px #fff}.ui.celled.definition.table thead:not(.full-width) th:first-child{-webkit-box-shadow:0 -1px 0 1px #fff;box-shadow:0 -1px 0 1px #fff}.ui.celled.definition.table tfoot:not(.full-width) th:first-child{-webkit-box-shadow:0 1px 0 1px #fff;box-shadow:0 1px 0 1px #fff}.ui.definition.table tr td.definition,.ui.definition.table tr td:first-child:not(.ignored){background:rgba(0,0,0,.03);font-weight:700;color:rgba(0,0,0,.95);text-transform:'';-webkit-box-shadow:'';box-shadow:'';text-align:'';font-size:1em;padding-left:'';padding-right:''}.ui.definition.table thead:not(.full-width) th:nth-child(2){border-left:1px solid rgba(34,36,38,.15)}.ui.definition.table tfoot:not(.full-width) th:nth-child(2){border-left:1px solid rgba(34,36,38,.15)}.ui.definition.table td:nth-child(2){border-left:1px solid rgba(34,36,38,.15)}.ui.table td.positive,.ui.table tr.positive{-webkit-box-shadow:0 0 0 #a3c293 inset;box-shadow:0 0 0 #a3c293 inset}.ui.table td.positive,.ui.table tr.positive{background:#fcfff5!important;color:#2c662d!important}.ui.table td.negative,.ui.table tr.negative{-webkit-box-shadow:0 0 0 #e0b4b4 inset;box-shadow:0 0 0 #e0b4b4 inset}.ui.table td.negative,.ui.table tr.negative{background:#fff6f6!important;color:#9f3a38!important}.ui.table td.error,.ui.table tr.error{-webkit-box-shadow:0 0 0 #e0b4b4 inset;box-shadow:0 0 0 #e0b4b4 inset}.ui.table td.error,.ui.table tr.error{background:#fff6f6!important;color:#9f3a38!important}.ui.table td.warning,.ui.table tr.warning{-webkit-box-shadow:0 0 0 #c9ba9b inset;box-shadow:0 0 0 #c9ba9b inset}.ui.table td.warning,.ui.table tr.warning{background:#fffaf3!important;color:#573a08!important}.ui.table td.active,.ui.table tr.active{-webkit-box-shadow:0 0 0 rgba(0,0,0,.87) inset;box-shadow:0 0 0 rgba(0,0,0,.87) inset}.ui.table td.active,.ui.table tr.active{background:#e0e0e0!important;color:rgba(0,0,0,.87)!important}.ui.table tr td.disabled,.ui.table tr.disabled td,.ui.table tr.disabled:hover,.ui.table tr:hover td.disabled{pointer-events:none;color:rgba(40,40,40,.3)}@media only screen and (max-width:991px){.ui[class*="tablet stackable"].table,.ui[class*="tablet stackable"].table tbody,.ui[class*="tablet stackable"].table tr,.ui[class*="tablet stackable"].table tr>td,.ui[class*="tablet stackable"].table tr>th{width:100%!important;display:block!important}.ui[class*="tablet stackable"].table{padding:0}.ui[class*="tablet stackable"].table thead{display:block}.ui[class*="tablet stackable"].table tfoot{display:block}.ui[class*="tablet stackable"].table tr{padding-top:1em;padding-bottom:1em;-webkit-box-shadow:0 -1px 0 0 rgba(0,0,0,.1) inset!important;box-shadow:0 -1px 0 0 rgba(0,0,0,.1) inset!important}.ui[class*="tablet stackable"].table tr>td,.ui[class*="tablet stackable"].table tr>th{background:0 0;border:none!important;padding:.25em .75em;-webkit-box-shadow:none!important;box-shadow:none!important}.ui.definition[class*="tablet stackable"].table thead th:first-child{-webkit-box-shadow:none!important;box-shadow:none!important}}.ui.table [class*="left aligned"],.ui.table[class*="left aligned"]{text-align:left}.ui.table [class*="center aligned"],.ui.table[class*="center aligned"]{text-align:center}.ui.table [class*="right aligned"],.ui.table[class*="right aligned"]{text-align:right}.ui.table [class*="top aligned"],.ui.table[class*="top aligned"]{vertical-align:top}.ui.table [class*="middle aligned"],.ui.table[class*="middle aligned"]{vertical-align:middle}.ui.table [class*="bottom aligned"],.ui.table[class*="bottom aligned"]{vertical-align:bottom}.ui.table td.collapsing,.ui.table th.collapsing{width:1px;white-space:nowrap}.ui.fixed.table{table-layout:fixed}.ui.fixed.table td,.ui.fixed.table th{overflow:hidden;text-overflow:ellipsis}.ui.selectable.table tbody tr:hover,.ui.table tbody tr td.selectable:hover{background:rgba(0,0,0,.05)!important;color:rgba(0,0,0,.95)!important}.ui.inverted.table tbody tr td.selectable:hover,.ui.selectable.inverted.table tbody tr:hover{background:rgba(255,255,255,.08)!important;color:#fff!important}.ui.table tbody tr td.selectable{padding:0}.ui.table tbody tr td.selectable>a:not(.ui){display:block;color:inherit;padding:.78571429em .78571429em}.ui.selectable.table tr.error:hover,.ui.selectable.table tr:hover td.error,.ui.table tr td.selectable.error:hover{background:#ffe7e7!important;color:#943634!important}.ui.selectable.table tr.warning:hover,.ui.selectable.table tr:hover td.warning,.ui.table tr td.selectable.warning:hover{background:#fff4e4!important;color:#493107!important}.ui.selectable.table tr.active:hover,.ui.selectable.table tr:hover td.active,.ui.table tr td.selectable.active:hover{background:#e0e0e0!important;color:rgba(0,0,0,.87)!important}.ui.selectable.table tr.positive:hover,.ui.selectable.table tr:hover td.positive,.ui.table tr td.selectable.positive:hover{background:#f7ffe6!important;color:#275b28!important}.ui.selectable.table tr.negative:hover,.ui.selectable.table tr:hover td.negative,.ui.table tr td.selectable.negative:hover{background:#ffe7e7!important;color:#943634!important}.ui.attached.table{top:0;bottom:0;border-radius:0;margin:0 -1px;width:calc(100% - (-1px * 2));max-width:calc(100% - (-1px * 2));-webkit-box-shadow:none;box-shadow:none;border:1px solid #d4d4d5}.ui.attached+.ui.attached.table:not(.top){border-top:none}.ui[class*="top attached"].table{bottom:0;margin-bottom:0;top:0;margin-top:1em;border-radius:.28571429rem .28571429rem 0 0}.ui.table[class*="top attached"]:first-child{margin-top:0}.ui[class*="bottom attached"].table{bottom:0;margin-top:0;top:0;margin-bottom:1em;-webkit-box-shadow:none,none;box-shadow:none,none;border-radius:0 0 .28571429rem .28571429rem}.ui[class*="bottom attached"].table:last-child{margin-bottom:0}.ui.striped.table tbody tr:nth-child(2n),.ui.striped.table>tr:nth-child(2n){background-color:rgba(0,0,50,.02)}.ui.inverted.striped.table tbody tr:nth-child(2n),.ui.inverted.striped.table>tr:nth-child(2n){background-color:rgba(255,255,255,.05)}.ui.striped.selectable.selectable.selectable.table tbody tr.active:hover{background:#efefef!important;color:rgba(0,0,0,.95)!important}.ui.table [class*="single line"],.ui.table[class*="single line"]{white-space:nowrap}.ui.table [class*="single line"],.ui.table[class*="single line"]{white-space:nowrap}.ui.red.table{border-top:.2em solid #db2828}.ui.inverted.red.table{background-color:#db2828!important;color:#fff!important}.ui.orange.table{border-top:.2em solid #f2711c}.ui.inverted.orange.table{background-color:#f2711c!important;color:#fff!important}.ui.yellow.table{border-top:.2em solid #fbbd08}.ui.inverted.yellow.table{background-color:#fbbd08!important;color:#fff!important}.ui.olive.table{border-top:.2em solid #b5cc18}.ui.inverted.olive.table{background-color:#b5cc18!important;color:#fff!important}.ui.green.table{border-top:.2em solid #21ba45}.ui.inverted.green.table{background-color:#21ba45!important;color:#fff!important}.ui.teal.table{border-top:.2em solid #00b5ad}.ui.inverted.teal.table{background-color:#00b5ad!important;color:#fff!important}.ui.blue.table{border-top:.2em solid #2185d0}.ui.inverted.blue.table{background-color:#2185d0!important;color:#fff!important}.ui.violet.table{border-top:.2em solid #6435c9}.ui.inverted.violet.table{background-color:#6435c9!important;color:#fff!important}.ui.purple.table{border-top:.2em solid #a333c8}.ui.inverted.purple.table{background-color:#a333c8!important;color:#fff!important}.ui.pink.table{border-top:.2em solid #e03997}.ui.inverted.pink.table{background-color:#e03997!important;color:#fff!important}.ui.brown.table{border-top:.2em solid #a5673f}.ui.inverted.brown.table{background-color:#a5673f!important;color:#fff!important}.ui.grey.table{border-top:.2em solid #767676}.ui.inverted.grey.table{background-color:#767676!important;color:#fff!important}.ui.black.table{border-top:.2em solid #1b1c1d}.ui.inverted.black.table{background-color:#1b1c1d!important;color:#fff!important}.ui.one.column.table td{width:100%}.ui.two.column.table td{width:50%}.ui.three.column.table td{width:33.33333333%}.ui.four.column.table td{width:25%}.ui.five.column.table td{width:20%}.ui.six.column.table td{width:16.66666667%}.ui.seven.column.table td{width:14.28571429%}.ui.eight.column.table td{width:12.5%}.ui.nine.column.table td{width:11.11111111%}.ui.ten.column.table td{width:10%}.ui.eleven.column.table td{width:9.09090909%}.ui.twelve.column.table td{width:8.33333333%}.ui.thirteen.column.table td{width:7.69230769%}.ui.fourteen.column.table td{width:7.14285714%}.ui.fifteen.column.table td{width:6.66666667%}.ui.sixteen.column.table td{width:6.25%}.ui.table td.one.wide,.ui.table th.one.wide{width:6.25%}.ui.table td.two.wide,.ui.table th.two.wide{width:12.5%}.ui.table td.three.wide,.ui.table th.three.wide{width:18.75%}.ui.table td.four.wide,.ui.table th.four.wide{width:25%}.ui.table td.five.wide,.ui.table th.five.wide{width:31.25%}.ui.table td.six.wide,.ui.table th.six.wide{width:37.5%}.ui.table td.seven.wide,.ui.table th.seven.wide{width:43.75%}.ui.table td.eight.wide,.ui.table th.eight.wide{width:50%}.ui.table td.nine.wide,.ui.table th.nine.wide{width:56.25%}.ui.table td.ten.wide,.ui.table th.ten.wide{width:62.5%}.ui.table td.eleven.wide,.ui.table th.eleven.wide{width:68.75%}.ui.table td.twelve.wide,.ui.table th.twelve.wide{width:75%}.ui.table td.thirteen.wide,.ui.table th.thirteen.wide{width:81.25%}.ui.table td.fourteen.wide,.ui.table th.fourteen.wide{width:87.5%}.ui.table td.fifteen.wide,.ui.table th.fifteen.wide{width:93.75%}.ui.table td.sixteen.wide,.ui.table th.sixteen.wide{width:100%}.ui.sortable.table thead th{cursor:pointer;white-space:nowrap;border-left:1px solid rgba(34,36,38,.15);color:rgba(0,0,0,.87)}.ui.sortable.table thead th:first-child{border-left:none}.ui.sortable.table thead th.sorted,.ui.sortable.table thead th.sorted:hover{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ui.sortable.table thead th:after{display:none;font-style:normal;font-weight:400;text-decoration:inherit;content:'';height:1em;width:auto;opacity:.8;margin:0 0 0 .5em;font-family:Icons}.ui.sortable.table thead th.ascending:after{content:'\f0d8'}.ui.sortable.table thead th.descending:after{content:'\f0d7'}.ui.sortable.table th.disabled:hover{cursor:auto;color:rgba(40,40,40,.3)}.ui.sortable.table thead th:hover{background:rgba(0,0,0,.05);color:rgba(0,0,0,.8)}.ui.sortable.table thead th.sorted{background:rgba(0,0,0,.05);color:rgba(0,0,0,.95)}.ui.sortable.table thead th.sorted:after{display:inline-block}.ui.sortable.table thead th.sorted:hover{background:rgba(0,0,0,.05);color:rgba(0,0,0,.95)}.ui.inverted.sortable.table thead th.sorted{background:rgba(255,255,255,.15) -webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.05)));background:rgba(255,255,255,.15) -webkit-linear-gradient(transparent,rgba(0,0,0,.05));background:rgba(255,255,255,.15) linear-gradient(transparent,rgba(0,0,0,.05));color:#fff}.ui.inverted.sortable.table thead th:hover{background:rgba(255,255,255,.08) -webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.05)));background:rgba(255,255,255,.08) -webkit-linear-gradient(transparent,rgba(0,0,0,.05));background:rgba(255,255,255,.08) linear-gradient(transparent,rgba(0,0,0,.05));color:#fff}.ui.inverted.sortable.table thead th{border-left-color:transparent;border-right-color:transparent}.ui.inverted.table{background:#333;color:rgba(255,255,255,.9);border:none}.ui.inverted.table th{background-color:rgba(0,0,0,.15);border-color:rgba(255,255,255,.1)!important;color:rgba(255,255,255,.9)!important}.ui.inverted.table tr td{border-color:rgba(255,255,255,.1)!important}.ui.inverted.table tr td.disabled,.ui.inverted.table tr.disabled td,.ui.inverted.table tr.disabled:hover td,.ui.inverted.table tr:hover td.disabled{pointer-events:none;color:rgba(225,225,225,.3)}.ui.inverted.definition.table tfoot:not(.full-width) th:first-child,.ui.inverted.definition.table thead:not(.full-width) th:first-child{background:#fff}.ui.inverted.definition.table tr td:first-child{background:rgba(255,255,255,.02);color:#fff}.ui.collapsing.table{width:auto}.ui.basic.table{background:0 0;border:1px solid rgba(34,36,38,.15);-webkit-box-shadow:none;box-shadow:none}.ui.basic.table tfoot,.ui.basic.table thead{-webkit-box-shadow:none;box-shadow:none}.ui.basic.table th{background:0 0;border-left:none}.ui.basic.table tbody tr{border-bottom:1px solid rgba(0,0,0,.1)}.ui.basic.table td{background:0 0}.ui.basic.striped.table tbody tr:nth-child(2n){background-color:rgba(0,0,0,.05)!important}.ui[class*="very basic"].table{border:none}.ui[class*="very basic"].table:not(.sortable):not(.striped) td,.ui[class*="very basic"].table:not(.sortable):not(.striped) th{padding:''}.ui[class*="very basic"].table:not(.sortable):not(.striped) td:first-child,.ui[class*="very basic"].table:not(.sortable):not(.striped) th:first-child{padding-left:0}.ui[class*="very basic"].table:not(.sortable):not(.striped) td:last-child,.ui[class*="very basic"].table:not(.sortable):not(.striped) th:last-child{padding-right:0}.ui[class*="very basic"].table:not(.sortable):not(.striped) thead tr:first-child th{padding-top:0}.ui.celled.table tr td,.ui.celled.table tr th{border-left:1px solid rgba(34,36,38,.1)}.ui.celled.table tr td:first-child,.ui.celled.table tr th:first-child{border-left:none}.ui.padded.table th{padding-left:1em;padding-right:1em}.ui.padded.table td,.ui.padded.table th{padding:1em 1em}.ui[class*="very padded"].table th{padding-left:1.5em;padding-right:1.5em}.ui[class*="very padded"].table td{padding:1.5em 1.5em}.ui.compact.table th{padding-left:.7em;padding-right:.7em}.ui.compact.table td{padding:.5em .7em}.ui[class*="very compact"].table th{padding-left:.6em;padding-right:.6em}.ui[class*="very compact"].table td{padding:.4em .6em}.ui.small.table{font-size:.9em}.ui.table{font-size:1em}.ui.large.table{font-size:1.1em}!
`;
const ImsiCss2 = styled.div`
.popup {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0,0,0, 0.5);
}
.popup_inner {
  position: absolute;
  left: 25%;
  right: 25%;
  top: 25%;
  bottom: 25%;
  margin: auto;
  background: white;
}
`;

export {
  BtnBlack, BtnDkGray, LinkBtnDkGray, BtnGray, BtnLgtGray, LinkBtnLgtGray, BtnLgtGrayRegisted,
  BtnRedMnRegist, BtnRedCgrRegist, BtnRedShare,
  BtnWhiteArr, BtnWhiteWrite, BtnWhiteRate, BtnWhiteDel, BtnWhiteAdd,
  BtnIconShare, BtnIconRegist, // BtnIconMnRegist, BtnIconCgrRegist,
  BtnSeeMore, BtnDelete, LinkBtnList, LinkBtnUpdate, BtnIconTree, BtnIconApp, BtnAppRegi,
  BtnBizPreview, BtnBizSettings, BtnWhiteAttdAdd, BtnSearchDkGray, BtnApprovalLightRed, BtnApprovalPrev, BtnApprovalNext,
  ImsiCss, ImsiCss2,
};
