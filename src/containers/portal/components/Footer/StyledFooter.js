import styled from 'styled-components';

const StyledFooter = styled.footer`
  position: relative;
  display: block;  
  width: 100%;
  height: 46px;
  color: ${props => props.theme.footer.logo.fontColor};
  font-size: 12px;

  @media only screen and (max-width: 1160px) {height: 95px;}

  > div {
    position: absolute;
    left: 50%;
    width: 1640px;
    padding: 8px 0 9px;
    border-top: ${props => props.theme.footer.borderTop};
    margin-left: ${props => props.marginLeft};  // dock 큰아이콘 고정해제

    @media only screen and (max-width: 1760px) {
      width: 1310px;
      margin-left: ${props => props.marginLeft};
      // margin-left: -710px; // dock 큰아이콘 고정 calc(-665px - 45px)
      // margin-left: -686px; // dock 작은아이콘 고정 calc(-665px - 21px)
    }
  
    @media only screen and (max-width: 1460px) {
      width: 980px;
      margin-left: ${props => props.marginLeft};
    }
  
    @media only screen and (max-width: 1160px) {
      width: 650px;
      margin-left: ${props => props.marginLeft};
    }
  
    @media only screen and (max-width: 670px) {
      width: calc(100% - 20px);
      margin-left: ${props => props.marginLeft};
    }
  }

  .portalCopyright {
    position: relative;
    display: inline-block;
    height: 25px;
    padding-left: 54px;
    padding-top: 7px;

    @media only screen and (max-width: 1160px) {
      display: block;
      width: 280px;
      margin: 2px auto 0;
    }
    
    .icon-logo {
      position: absolute;
      left: 0;
      top: 0;
      font-size: 24px;

      &:before {color: ${props => props.theme.footer.logo.iconLogoColor};}
    }
  }

  .portalFooterMenu {
    display: inline-block;
    float: right;

    @media only screen and (max-width: 1160px) {display: none;}

    > li {
      position: relative;
      float: left;
      padding-left: 20px;
      padding-top: 7px;
    
      &:not(:last-child) {margin-right: 25px;}
      
      &.fmIcon01 .icon-list, &.fmIcon02 .icon-contact, &.fmIcon03 .icon-user {position: absolute;}

      .icon-list {
        left: 0;
        top: 7px
        font-size: 17px;

        &:before {color: ${props => props.theme.footer.personalInfo.iconPersonalInfoColor};}
      }

      .icon-contact, .icon-user {
        left: 0;
        top: 9px;
        font-size: 15px;
      }

      .icon-contact {
        &:before {color: ${props => props.theme.footer.helpDesk.iconHelpDeskColor};}
      }

      .icon-user {
        &:before {color: ${props => props.theme.footer.systemCharger.iconSystemChargerColor};}
      }

      button {
        display: inline-block;
        height: 18px;
        padding: 0;
        border: 0;
        font-size: 12px;
        line-height: 18px;
        text-align: left;
        background: transparent;
      }

      .personalInfo {color: ${props => props.theme.footer.personalInfo.fontColor};}
      .helpDesk {color: ${props => props.theme.footer.personalInfo.fontColor};}
      .systemCharger {color: ${props => props.theme.footer.personalInfo.fontColor};}
    }
  }
`;

export default StyledFooter;
