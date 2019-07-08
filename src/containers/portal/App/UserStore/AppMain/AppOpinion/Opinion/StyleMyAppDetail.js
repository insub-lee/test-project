import styled from 'styled-components';
import IconOption from 'images/common/icon-option.png';
import IconRequired from 'images/common/icon-required.png';

const StyleMyAppDetail = styled.div`
  width: 920px;
  margin: 20px auto;
  padding: 0 30px;
  border: 1px solid #d1d2d3;
  background: #ffffff;

  .pageTitle {
    width: 100%;
    height: 60px;
    color: #222222;
    font-size: 17px;
    line-height: 59px;
    border-bottom: 1px solid #222222;
  } 

  h4 {
    position: relative;
    padding-left: 10px;
    margin-top: 30px; //여기에만 있는 속성
    margin-bottom: 9px;
    color: #707070;
    font-size: 14px;
    letter-spacing: -0.5px;

    &:before {
      content:url(${IconOption});
      position: absolute;
      top: -3px;
      left: 0;
      display: inline-block;
      width: 10px;
    }

    //필수입력 표시
    &.required:before {
      content:url(${IconRequired});
    }
  }

  .textValue {
    padding-left: 10px;
    padding-bottom: 14px;
    color: #404040;
    font-size: 14px;

    . {

    }
  }

  .buttonsWrapper {
    display: inline-block;
    width: 100%;

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
`;

export default StyleMyAppDetail;
