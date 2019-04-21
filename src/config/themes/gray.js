import clone from 'clone';
// import BackgroundImage from 'images/portal/index-skin-bg-gray.png';
import basic from './basic';

const theme = clone(basic);

// 변경될 부분만 적용시키면된다

// theme.header.backgroundColor = '#222222';
theme.header.backgroundColor = '#4c4e4f';

// theme.portalContentBackground = `#74797e url(${BackgroundImage}) repeat 0 0`;
theme.portalContentBackground = '#8b9094';

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
    bgColor: '#eeeff3',
    color: '#999',
  },
  header: {
    bgColor: '#eeeff3',
    color: '#999',
  },
  box: {
    bgColor: '#eeeff3',
    color: '#999',
  },
};

theme.dock.dockitem.color = 'rgba(255, 255, 255, 0.8)';
theme.dock.dockExecItem.color = '#222222';
theme.dock.pagingBtns.bgColor = '#676a6d';

export default theme;
