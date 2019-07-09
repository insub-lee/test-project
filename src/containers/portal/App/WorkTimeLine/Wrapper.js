import styled from 'styled-components';

const WorkTimeListWrapper = styled.div`
  padding: 10px;

  .react-grid-Container {
    width: 100% !important;
    margin-right: 0 !important; // custom-scrollbar너비 17px 뺀 값 적용
  
    .react-grid-Main {
      background-color: transparent !important; //위젯 스킨 배경색 반영
      outline: none;
    
      .react-grid-Grid {
        // height: 515px;
        border: none;
        background-color: transparent !important; //위젯 스킨 배경색 반영
    
        .react-grid-Canvas {
          width: 100% !important; // custom scrollbar 너비(17px)만큼 빼줌
          overflow: hidden;
          overflow:-moz-scrollbars-none;
          &::-webkit-scrollbar {width: 0 !important;}
          background-color: transparent !important; //위젯 스킨 배경색 반영
    
          .react-grid-Row {
    
            &:last-child {
              .react-grid-Cell {
                border-bottom: none;
              }
            }
    
            .react-grid-Cell {
              width: 100% !important;
              @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {  
                /* IE10+ specific styles go here */
                width: 95% !important;
              }
  
              border-right: none;
              // border-bottom: 1px dashed #d9d9d9; //위젯색상테마 포함됨
              background-color: transparent !important; //위젯 스킨 배경색 반영
      
              &:focus {
                outline-color: transparent;
              }
      
              .contentWrapper {
                padding-top: 3px;
                // color: #707070; //위젯색상테마 포함됨
                font-size: 11px;
      
                small {
                  display: block;
                  // color: #808080; //위젯색상테마 포함됨
                  font-size: 11px;
                }
      
                .titleText {
                  display: inline-block;
                  max-width: 100%;
                  padding-bottom: 5px;
                  // color: #000000; //위젯색상테마 포함됨
                  font-size: 14px;
                  // font-weight: 600;
                  letter-spacing: -0.5px;
                  cursor: pointer;
                }
          
                .empPicWrapper {
                  position: relative;
                  overflow: hidden;
                  float: left;
                  width: 25px;
                  height: 25px;
                  margin-top: 4px;
                  margin-right: 10px;
                  border-radius: 12.5px;
                  vertical-align: middle;
      
                  img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                  }
                }
      
                .subInfo {
                  display: inline-block;
                  width: calc(100% - 30px);
      
                  .br {
                    display: block;
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

export default WorkTimeListWrapper;
