import styled from 'styled-components';

const StyleWidget = styled.div`

// 위젯 tab 스타일
.ant-tabs {
  margin: 0 10px;
  padding: 10px 0;

  .ant-tabs-bar {
    margin: 0;
    // border-bottom: 1px solid #d1d2d3;  //위젯색상테마 포함됨

    .ant-tabs-nav-container {
      height: 35px;
      line-height: 0.5em;

      &.ant-tabs-nav-container-scrolling {
        padding-left: 10px;
        padding-right: 10px;

        // 이전 버튼
        .ant-tabs-tab-prev {
          &.ant-tabs-tab-btn-disabled {display: none;}
          &.ant-tabs-tab-arrow-show {
            width: 10px;

            .ant-tabs-tab-prev-icon {
              left: 2px;
            }
          }
        }
        // 다음 버튼
        .ant-tabs-tab-next {
          &.ant-tabs-tab-btn-disabled {display: none;}
          &.ant-tabs-tab-arrow-show {
            width: 10px;

            .ant-tabs-tab-next-icon {
              right: 2px;
            }
          }
        }
        
      }

      .ant-tabs-nav {
        .ant-tabs-tab {
          height: 35px;
          margin: 0;
          padding: 0 16px;
          font-size: 13px;
          // color: #707070;  //위젯색상테마 포함됨
          line-height: 35px;

          // &.ant-tabs-tab-active {
          //   color: #222222;  //위젯색상테마 포함됨
          // }
        }

        .ant-tabs-ink-bar {
          bottom: 0;
          // background-color: #222222;  //위젯색상테마 포함됨
        }
      }
      
    }
  }
}

`;
export default StyleWidget;
