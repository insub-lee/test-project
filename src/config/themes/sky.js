import clone from 'clone';
// import BackgroundImage from 'images/portal/index-skin-bg-sky.png';
import basic from './basic';

const theme = clone(basic);

// 변경될 부분만 적용시키면된다

// theme.header.backgroundColor = '#477ca7';
theme.header.backgroundColor = '#406687';

// theme.portalContentBackground = `#85b0d3 url(${BackgroundImage}) repeat 0 0`;
// theme.portalContentBackground = '#8db0cd';
theme.portalContentBackground = '#faf8fb';

theme.footer = {
  borderTop: '1px solid rgba(255,255,255,0.3)',
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
    bgColor: '#d0f3ff',
    color: '#999',
  },
  header: {
    bgColor: '#d0f3ff',
    color: '#999',
  },
  box: {
    bgColor: '#d0f3ff',
    color: '#999',
  },
};

theme.formstuff = {
  ckRadio: {
    borderColor: '#3a6488',
    checkedBgColor: '#406687',
    checkedBorder: '1px solid #3a6488',
    afterBgColor: '#406687',
  },
};

export default theme;
