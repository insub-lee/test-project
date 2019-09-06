import styled from 'styled-components';

const StyleBizDetailContent = styled.div`
  position: relative;

  .bizDetailContentWrapper {
    display: flex;
    align-items: stretch;
    min-height: calc(100vh - 240px);
    padding: 0;
  }

  .leftContent {
    position: relative;
    width: 230px;
    min-height: calc(100vh - 200px);
    padding-left: 6px;
    padding-bottom: 6px; //히딘 버튼메뉴
    border-right: 1px solid #dfdfe0;

    // My Page와 다른 구조
    h2 {
      button {
        width: 100%;
        margin-top: 15px;
        font-size: 14px;
        text-align: left;
        background-color: #ffffff;
      }
    }

    // My Page에 있지만, 업무그룹 관리에 없음
    // .currentTreeLevel {
    //   width: 100%;
    //   padding: 0 0 0 13px;
    //   margin-top: 15px;
    //   border: none;
    //   color: #f85023;
    //   font-size: 14px;
    //   text-align: left;

    //   &:hover, &:focus {
    //     border: none;
    //     color: #f85023;
    //   }
    // }

    .bizMenuTree {
      &.sortableTreeWrapper {
        top: 5px;
        left: 8px;
        height: auto;
        color: #404040;
      }
    }

    .mypageTree {
      position: absolute;
      bottom: 45px;
      width: 100%;
      max-width: 287px;
      height: 165px;
      padding: 10px 15px 0 15px;
      background: #e9e9e9;

      .entryName {
        > li {
          padding: 3px 0;

          label {
            display: inline-block;
            width: 80px;
            height: 32px;
            float: left;
            line-height: 32px;
            color: #404040;
            font-size: 14px;
          }

          .ant-input {
            width: calc(100% - 80px);
          }
        }
      }

      .buttonWrapper {
        padding: 9px 0 14px;
        text-align: right;

        > button {
          background: transparent;
          color: #404040;
          font-size: 14px;
          font-weight: 600;
          text-decoration: underline;

          &:first-child {
            margin-right: 10px;
          }
        }
      }
    }
  }

  .rightContent {
    width: calc(100% - 298px);
    min-height: calc(100vh - 240px);
    padding: 20px;
  }
`;
export default StyleBizDetailContent;
