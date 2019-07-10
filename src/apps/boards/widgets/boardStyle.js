import styled from 'styled-components';

const boardStyle = styled.div`

// 위젯 tab 스타일
.ant-tabs {
  margin: 0 10px;

  .ant-tabs-bar {
    margin: 0;
    // border-bottom: 1px solid #d1d2d3;  //위젯색상테마 포함됨

    .ant-tabs-nav-container {
      height: 45px;
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
          height: 45px;
          margin: 0;
          padding: 0 16px;
          font-size: 13px;
          // color: #707070;  //위젯색상테마 포함됨
          line-height: 45px;

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


// 하단 data grid
.react-grid-Container {
  width: 100% !important;
  padding-top: 5px;

  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {  
    /* IE10+ specific styles go here */
    width: calc(100% - 7px);
  }   

  .react-grid-Main {
    outline: none;
    background-color: transparent !important; //위젯 스킨 배경색 반영
  
    .react-grid-Grid {
      width: 100%;
      height: 100% !important;
      border: none;
      background-color: transparent !important; //위젯 스킨 배경색 반영
    
      // 값이 없을 때
      .react-grid-Empty {
        display: table;
        width: 100%;
        min-height: 200px;
    
        > p {
          display: table-cell;
          color: #707070;
          font-size: 16px;
          text-align: center;
          vertical-align: middle;
        }
      }
    
      .react-grid-Header {
        display: none;
      }
      
      .react-grid-Viewport {
        top: 0 !important;
        width: 100% !important;
        height: 100%;
  
        .react-grid-Canvas {
          width: 100% !important;               
          overflow: hidden auto !important;
          background-color: transparent !important; //위젯 스킨 배경색 반영
  
          .react-grid-Cell {
            width: 100% !important;
            @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {  
              /* IE10+ specific styles go here */
              width: 95% !important;
            }
            
            padding-left: 3px;
            padding-right: 0;
            border-right: none;
            border-bottom: none;
            color: #404040;
            font-size: 13px;
            background-color: transparent !important; //위젯 스킨 배경색 반영

            &:first-child {
              padding-left: 12px;
              // background-image: url($/*{bulletIcon});  //위젯색상테마 포함됨
              background-repeat: no-repeat;
              background-position: 0 11px;
            }
      
            .react-grid-Cell__value {
              //top: 4px;
              top: 0;
              transform: none;

              .titleText {
                // 생략부호 적용 
                display: inline-block;
                max-width: 100%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }

              .empInfo {
                margin-top: -2px;
                line-height: 12px;

                .subInfo {
                  // color: #707070;  //위젯색상테마 포함됨
                  // font-size: 11px;  //위젯색상테마 포함됨
  
                  .div {
                    // color: #aeaeae;  //위젯색상테마 포함됨
                    font-style: normal;
                  }
  
                  .replyIcon {
                    display: inline-block;
                    width: 16px;
                    height: 12px;
                    margin-bottom: -1px;
                    // background-image: url($/*{replyGrayIcon});  //위젯색상테마 포함됨
                    background-repeat: no-repeat;
                    background-position: 50% 2px;
                  }
                }

                //더보기 버튼
                .more {
                  display: inline-block;
                  padding-left: 5px;
                  margin-left: 10px;
                  background: transparent;
                  //color: #404040; //위젯색상테마 포함됨
                  font-size: 10px;

                  > span {
                    display: inline-block;
                    //border-bottom: 1px solid #404040; //위젯색상테마 포함됨
                  }
                }
              }

            }
          }
        }
      }
    }  
  }
}

`;

export default boardStyle;
