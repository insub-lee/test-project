import styled from 'styled-components';

const StyleMyAppRegis = styled.div`
  width: 920px;
  min-height: calc(100vh - 120px);
  margin: 20px auto 0;
  padding: 0 30px 30px 30px;
  border: 1px solid #d1d2d3;
  background: #ffffff;

  // main navigation tabs
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

        &.ant-tabs-tab-active {
          color: #886ab5;
          cursor: default;
        }
      }

      .ant-tabs-ink-bar {
        background-color: #886ab5;
      }
    }
  }

`;

export default StyleMyAppRegis;
