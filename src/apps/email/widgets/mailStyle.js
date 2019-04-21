import styled from 'styled-components';
// import { palette } from 'styled-theme';
// import { transition, borderRadius } from '../../../config/style-util';
// import WithDirection from '../../../config/withDirection';

const MailWrapper = styled.div`

.react-grid-Container {
  width: 100% !important;
  margin-top: 2px;
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
            
            padding-right: 10px;
            border-right: none;
            border-bottom: none;
            // color: #404040;  //위젯색상테마 포함됨
            // font-size: 13px; //위젯색상테마 포함됨
            background-color: transparent !important; //위젯 스킨 배경색 반영

            &:first-child {
              padding-left: 22px;
              // background-image: url($/*{bulletIcon});  //위젯색상테마 포함됨
              background-repeat: no-repeat;
              background-position: 10px 11px;
            }
      
            .react-grid-Cell__value {
              top: 4px;
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
                    // color: #aeaeae; //위젯색상테마 포함됨
                    font-style: normal;
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

export default MailWrapper;
