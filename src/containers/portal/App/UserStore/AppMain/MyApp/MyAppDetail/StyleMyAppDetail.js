import styled from 'styled-components';

const StyleMyAppDetail = styled.div`
  width: 920px;
  min-height: calc(100vh - 140px);
  margin: 20px auto 10px;
  padding: 20px 30px 0;
  border: 1px solid #d1d2d3;
  background: #ffffff;

  .pageTitle {
    width: 100%;
    height: 28px;
    padding: 4px 15px 0 12px;
    color: #222222;
    font-size: 13px;
    background: #f2f2f2;

    .currentState {
      float: right;
    }
  }

  // main navigation tabs
  .ant-tabs {
    min-height: calc(100vh - 250px);

    .ant-tabs-bar {
      margin-bottom: 0;
      border-bottom-color: #d3d3d3;

      .ant-tabs-nav-container {
        height: 60px;
        color: #909090;
        font-size: 16px;

        // 좌우 스크롤 이동 화살표 숨기기
        &.ant-tabs-nav-container-scrolling {
          padding-left: 0;
          padding-right: 0;

          .ant-tabs-tab-arrow-show {
            display: none;
          }
        }

        .ant-tabs-tab {
          width: 286px;
          height: 61px;
          margin-right: 0;
          padding-top: 20px;
          text-align: center;

          &:hover {
            color: #222222;
          }

          &.ant-tabs-tab-active {
            color: #222222;
            cursor: default;
          }
        }

        .ant-tabs-ink-bar {
          background-color: #222222;
        }
      }
    }
  }

  .buttonsWrapper {
    &.top {
      padding: 15px 0;
    }
    &.bottom {
      padding: 15px 0 20px;
      border-top: 1px solid #d3d3d3;
    }
    .alignRight {
      float: right;
    }

    button {
      margin-left: 5px;
    }
  }

  // 향후 삭제
  .temp {
    display: block;
    padding: 0 10px;
    margin-bottom: 10px;
    color: pink;
    line-height: 34px;
    border: 1px dashed #efefef;
  }
`;

export default StyleMyAppDetail;
