// import BackgroundImage from 'images/portal/index-skin-bg-basic.png';
import dockSettingBlack from 'images/portal/dock_setting_black.png';

const theme = {};

theme.header = {
  // backgroundColor: '#222222',
  // backgroundColor: '#4c4e4f',
  backgroundColor: '#584475',
  backgroundImage: 'linear-gradient(270deg,rgba(51,148,225,.18),transparent)',
  borderTop: 'none',
  iconMenuColor: '#ffffff' /* 사이드바 열기-닫기 아이콘 폰트 색상 */,
  iconGoBizStoreColor: '#ffffff' /* 비즈스토어 가기 아이콘 폰트 색상 */,
  userInfo: {
    fontColor: '#ffffff',
    fontSize: '13px',
  },
  memberSearch: {
    inputBackgroundColor: 'rgba(255,255,255,0.3)',
    fontColor: '#ffffff',
    fontSize: '12px',
    iconSearchButtonColor: '#ffffff' /* 구성원검색 버튼 아이콘 폰트 색상 */,
  },
  iconAlarmColor: '#ffffff' /* 알림 아이콘 폰트 색상 */,
  iconSettingColor: '#ffffff' /* 설정 아이콘 폰트 색상 */,
  iconFullScreenColor: '#ffffff' /* 풀스크린 아이콘 폰트 색상 */,
};

// theme.portalContentBackground = `#e2e7ea url(${BackgroundImage}) repeat 0 0`;
theme.portalContentBackground = '#dadfe3';

theme.footer = {
  borderTop: '1px solid rgba(128,128,128,0.3)',
  logo: {
    iconLogoColor: '#808080',
    fontColor: '#707070',
  },
  personalInfo: {
    iconPersonalInfoColor: '#808080',
    fontColor: '#707070',
  },
  helpDesk: {
    iconHelpDeskColor: '#808080',
    fontColor: '#707070',
  },
  systemCharger: {
    iconSystemChargerColor: '#808080',
    fontColor: '#707070',
  },
};

theme.widget = {
  wrapper: {
    bgColor: '#FFFFFF',
    color: '#999',
  },
  header: {
    bgColor: '#FFFFFF',
    color: '#999',
  },
  box: {
    bgColor: '#FFFFFF',
    color: '#999',
  },
};

theme.dock = {
  dockitem: {
    color: '#222222',
  },
  dockExecItem: {
    color: '#fff',
  },
  pagingBtns: {
    bgColor: '#676a6d',
  },
  flottingBtnBackground: dockSettingBlack,
};

export default theme;
