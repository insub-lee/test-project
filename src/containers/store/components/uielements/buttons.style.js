import styled, { css } from 'styled-components';
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

const defaultColorSet = {
  borderColor: 'rgba(0,0,0,.15)',
  color: '#212529',
  backgroundColor: '#fff',
};

const skin = {
  primary: {
    borderColor: '#886ab5',
    color: '#ffffff',
    backgroundColor: '#886ab5',
  },
  secondary: {
    borderColor: '#868e96',
    color: '#ffffff',
    backgroundColor: '#868e96',
  },
  success: {
    borderColor: '#1dc9b7',
    color: '#ffffff',
    backgroundColor: '#1dc9b7',
  },
  info: {
    borderColor: '#2196f3',
    color: '#ffffff',
    backgroundColor: '#2196f3',
  },
  warning: {
    borderColor: '#ffc241',
    color: '#212529',
    backgroundColor: '#ffc241',
  },
  danger: {
    borderColor: '#fd3995',
    color: '#ffffff',
    backgroundColor: '#fd3995',
  },
  dark: {
    borderColor: '#505050',
    color: '#ffffff',
    backgroundColor: '#505050',
  },
  light: {
    borderColor: 'rgba(0,0,0,.15)',
    color: '#212529',
    backgroundColor: '#fff',
  },
};

const getThemeColor = (color, type) => {
  if (color && skin[color]) {
    return skin[color][type];
  }
  return defaultColorSet[type];
};

const defaultBorderRadius = css`
  border-radius: 4px;
`;

const roundedBorderRadius = css`
  border-radius: 15px;
`;

const BtnDkGray = styled.button`
  min-width:90px;
  height:30px;
  padding: 0 15px;
  background-color: ${({ color }) => getThemeColor(color, 'backgroundColor')};
  border: 1px solid ${({ color }) => getThemeColor(color, 'borderColor')};
  /* border-radius: 3px; */
  font-size:13px;
  color: ${({ color }) => getThemeColor(color, 'color')};
  line-height: 29px;
  ${({ rounded }) => (rounded ? roundedBorderRadius : defaultBorderRadius)}

  &:hover, &:focus {
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
`;

// Gray Tone 버튼
const BtnBlack = styled.button`
  
`;

//BtnDkGray = Dark Gray (검정색에 가까운 회색)
// const BtnDkGray = styled.button`
//   min-width:90px;
//   height:30px;
//   padding: 0 15px;
//   background-color:#333333;
//   border: 1px solid #333333;
//   border-radius: 3px;
//   font-size:13px;
//   color:#ffffff;
//   line-height: 29px;
//   cursor: pointer;

//   &:hover, &:focus {
//     background-color:#333333;
//     border:1px solid #333333;
//     color:#ffffff;
//     border-color:#333333;
//   }

//   &.disabled, &:disabled {
//     background-color:#909090;
//     border:1px solid #909090;
//     color:#dadada;
//     cursor: default;
//   }
// `;

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

/***** 메인 컬러(붉은 계열) 버튼들 *****/
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

/***** 흰색 버튼들 *****/
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
    min-width: 70px;
    height: 25px;
    padding: 0 5px 0 10px;
    font-size: 12px;
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

/***** 아이콘 버튼들 (Localization 영향 받지 않음) *****/
/* 아이콘 > 공유 */
const BtnIconShare = styled.button`
  width: 50px;
  height: 30px;
  border-radius: 3px;
  background:#858585 url(${ShareWhiteIcon}) no-repeat 50% 50%;
  vertical-align: middle;
  cursor: pointer;

  @media only screen and (max-width: 1024px) {
    height: 25px;
    line-height: 1;
  }
`;
/* 아이콘 > 메뉴등록 */
const BtnIconRegist = styled.button`
  width: 50px;
  height: 30px;
  border-radius: 3px;
  background:#585858 url(${RgtIcon}) no-repeat 50% 50%;
  vertical-align: middle;
  cursor: pointer;

  @media only screen and (max-width: 1024px) {
    height: 25px;
    line-height: 1;
  }
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

export { 
  BtnBlack, BtnDkGray, LinkBtnDkGray, BtnGray, BtnLgtGray, LinkBtnLgtGray, BtnLgtGrayRegisted,
  BtnRedMnRegist, BtnRedCgrRegist, BtnRedShare,
  BtnWhiteArr, BtnWhiteWrite, BtnWhiteRate, BtnWhiteDel, BtnWhiteAdd,
  BtnIconShare, BtnIconRegist, BtnIconMnRegist, BtnIconCgrRegist,
  BtnSeeMore, BtnDelete, LinkBtnList, LinkBtnUpdate, BtnIconTree, BtnIconApp, BtnAppRegi,
  BtnBizPreview, BtnBizSettings
};
