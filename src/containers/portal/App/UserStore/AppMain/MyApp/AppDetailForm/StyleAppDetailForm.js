import styled from 'styled-components';
import IconOption from 'images/common/icon-option.png';
import IconRequired from 'images/common/icon-required.png';

const StyleAppDetailForm = styled.div`
  width: 100%;
  padding-bottom: 15px;

  h2.appInfo,
  h3.appInfo {
    color: #222222;
    font-size: 18px;
    text-align: center;
  }

  h2.appInfo {
    padding: 44px 0 0;
  }

  h3.appInfo {
    padding: 15px 0 0;
  }

  h4 {
    position: relative;
    padding-left: 10px;
    margin-top: 19px; //여기에만 있는 속성
    margin-bottom: 6px;
    color: #707070;
    font-size: 14px;
    letter-spacing: -0.5px;

    &:before {
      content: url(${IconOption});
      position: absolute;
      top: -3px;
      left: 0;
      display: inline-block;
      width: 10px;
    }

    //필수입력 표시
    &.required:before {
      content: url(${IconRequired});
    }
  }

  .textValue {
    padding-left: 10px;
    padding-bottom: 14px;
    color: #404040;
    font-size: 14px;
  }

  .appIcon {
    display: inline-block;
    width: 80px;
    height: 80px;
    border-radius: 18px;
    overflow: hidden;

    > img {
      width: 100%;
      height: 100%;
    }
  }

  .screenShots {
    > div {
      margin-left: 0 !important;
      margin-right: 0 !important;

      .appCols {
        width: 161px;
        height: 107px;
        padding-left: 0 !important;
        padding-right: 0 !important;
        margin-right: 5px !important;
        margin-bottom: 5px !important;
        text-align: center;
        background: #f3f3f3;

        img {
          width: 100%;
          max-height: 107px;
        }
      }
    }
  }

  .noBorderBtn {
    height: 20px;
    padding: 0;
    border: 0;
    color: #404040;
    font-size: 14px;
  }

  .appColWrapper {
    display: inline-block;
    width: 100%;
    padding-left: 10px;

    .appCols {
      width: 80px;
      height: 80px;
      float: left;
      margin: 0 10px 10px 0;
      border-radius: 16px;

      > a {
        display: inline-block;
        width: 100%;

        > img {
          width: 100% !important;
          height: 100% !important;
        }
        > .appName {
          display: none;
        }
      }
    }
  }
`;

export default StyleAppDetailForm;
