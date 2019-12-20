import styled from 'styled-components';

const ExtraMenus = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 100vh;
  background: #9ba0a8;

  .extraMenusList {
    display: inline-block;
    width: 100%;
    margin-top: 4px;

    > li {
      width: 100%;
      height: 51px;
      line-height: 50px;
      text-align: center;

      > a {
        display: inline-block;
        width: 100%;
        height: 100%;
      }

      > button {
        background: transparent;
      }

      .ant-btn {
        display: inline-block;
        width: 100%;
        height: 100%;
        padding: 0;
        border-radius: 0;
        background-color: transparent;
        border-color: transparent;
      }
    }
  }

  // bizstore 가기
  .icon-app {
    display: inline-block;
    font-size: 18px;

    &:before {
      color: ${props => props.theme.header.iconGoBizStoreColor};
    }
  }

  // home 가기
  .icon-home {
    display: inline-block;
    font-size: 18px;

    &:before {
      color: #fff;
    }
  }

  // settings 가기
  .icon-setting {
    font-size: 19px;

    &:before {
      color: ${props => props.theme.header.iconSettingColor};
    }
  }
`;

export default ExtraMenus;
