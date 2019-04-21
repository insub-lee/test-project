import clone from 'clone';
// import BackgroundImage from 'images/portal/index-skin-bg-navy.png';
import dockSettingSky from 'images/portal/dock_setting_skyblue.png';
import basic from './basic';

const theme = clone(basic);

// 변경될 부분만 적용시키면된다

// theme.header.backgroundColor = '#071935';
theme.header.backgroundColor = '#032046';

// theme.portalContentBackground = `#153667 url(${BackgroundImage}) repeat 0 0`;
theme.portalContentBackground = '#124078';

theme.footer = {
  borderTop: '1px solid rgba(255,255,255,0.2)',
  logo: {
    iconLogoColor: '#ffffff',
    fontColor: '#ffffff',
  },
  personalInfo: {
    iconPersonalInfoColor: '#ffffff',
    fontColor: '#ffffff',
  },
  helpDesk: {
    iconHelpDeskColor: '#ffffff',
    fontColor: '#ffffff',
  },
  systemCharger: {
    iconSystemChargerColor: '#ffffff',
    fontColor: '#ffffff',
  },
};

theme.widget = {
  wrapper: {
    bgColor: '#a7e2fb',
    color: '#999',
  },
  header: {
    bgColor: '#a7e2fb',
    color: '#999',
  },
  box: {
    bgColor: '#a7e2fb',
    color: '#999',
  },
};

theme.dock = {
  dockitem: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  dockExecItem: {
    color: '#222222',
  },
  pagingBtns: {
    bgColor: '#676a6d',
  },
  flottingBtnBackground: dockSettingSky,
};

export default theme;
