import styled from 'styled-components';

const StyleBizDetailContent = styled.div`
  position: relative;

  .bizDetailContentWrapper {
    width: 100%;
    display: flex;
    align-items: stretch;
    min-height: calc(100vh - 240px);
    padding: 0;
  }

  .leftContent {
    position: relative;
    width: 298px;
    min-height: calc(100vh - 200px);
    padding-left: 6px;
    border-right: 1px solid #dfdfe0;

    // .currentTreeLevel {
    //   width: 100%;
    //   padding: 0 0 0 13px;
    //   margin-top: 15px;
    //   border: none;
    //   // color: #f85023;
    //   font-size: 14px;
    //   text-align: left;
    //   border-radius: 0;

    //   &:hover, &:focus {
    //     color: #f85023;
    //   }
    // }

    h2 {
      button {
        width: 100%;
        margin-top: 15px;
        font-size: 14px;
        text-align: left;
        background-color: #ffffff;
      }
    }

    &.inPage {
      .treeWrapper2 {
        min-height: calc(100vh - 288px);

        .treeBox {
          height: 100% !important;
          padding: 0 0 0 8px !important;
    
          > div {
            height: 100% !important;

            .rstcustom__rowWrapper {
              padding: 0 !important; //업무그룹 관리와 매치
            }
          }
        }
      }

      @media only screen and (max-width: 1024px) {
        display: none;
      }
    }

    .treeBox {
      min-height: calc(100vh - 288px);
      padding: 0 0 0 8px !important;

      > div {
        min-height: calc(100vh - 288px);
      }
    }
  }

  .rightContent {
    width: calc(100% - 298px);
    min-height: calc(100vh - 240px);
    padding: 20px;

    @media only screen and (max-width: 1024px) {
      width: 100%;
      padding: 20px 0 0;
    }
  }
`;

export default StyleBizDetailContent;
