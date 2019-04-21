import styled from 'styled-components';


const AppWrapper = styled.div`
min-height: 100vh;
padding-bottom: 0px;
background: ${props => props.theme.portalContentBackground};

@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {  
  /* IE10+ specific styles go here */
  padding-bottom: 65px;
}

//커스텀 스크롤로 오른쪽에 치우친 화면 중앙으로 이동
.FullScreen {
  position: relative;
  left: -9px;
  z-index: 1;
  min-height: calc(100vh - 50px); //위젯 개수가 적을 때 footer가 하단에 위치하도록

  @media only screen and (max-width: 1024px) {
    left: 0;
  }
}

//풀스크린 활성화 된 상태
.FullScreen.Active {
  background: ${props => props.theme.portalContentBackground};
  overflow-x: hidden;

  .portalContent {
    padding-top: 0;
  }

  .gridWrapper {
    height: 100vh;
    display: table;

    > .activeMenu {
      // position: absolute !important;
      // top: 50%;
      // transform: translateY(-50%);
      display: table-cell !important;
      vertical-align: middle;
    }

    .portalContent {
      // 내용을 중앙에 위치
      display: flex;
      align-items:center;
      // min-height: 100vh;
      padding-top: 0;

      @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {  
        /* IE10+ specific styles go here */
        display: table-cell;
        // min-height: 100vh;
        vertical-align: middle;
      }

      // 설정 페이지가 화면에 차도록
      .userSetting {
        top: 0;
        min-height: 100vh;
        z-index: 1011; //header의 z-index보다 1크게
      }
    }
  }

  iframe {
    width: 100vw !important;
    height: 100vh !important;
    left: 0;
  }
  
}

// 브라우저 좌측에 생기는 Sidebar shadow 없앰
> div > div > div {
  box-shadow: none;

  @media only screen and (max-width: 320px) {
    width: 320px !important;

    .unreadNotiContent {
      padding-top: 13px;
      border-bottom: 1px solid #9ba0a8 !important;

      > div > div > div {padding-bottom: 0;}

      table tr td {
        &:first-child {width: 100%;}
        &:last-child {
          sup.ant-badge-count {right: 18px;}
        }
      }
    }
  }
}

.portalContent {
  padding-top: 42px;
  position: relative;

  iframe {
    height: calc(100vh - 42px) !important;
  }
}

.gridWrapper {
  padding: 0;
  position: relative;
  width: 1660px;
  margin: 0 auto;

  @media only screen and (max-width: 1760px) {
    width: 1330px;
  }

  @media only screen and (max-width: 1460px) {
    width: 1000px;
  }

  // TabletView와 MobileView일 때
  @media only screen and (max-width: 1160px) {
    width: 670px;
    min-height: calc(100vh - 230px);
  }

  @media only screen and (max-width: 650px) {
    width: 100% !important;
    min-height: calc(100vh - 190px);
  }
}
`;

export default AppWrapper;
