import styled from 'styled-components';
// import IconOption from 'images/common/icon-option.png';
import IconRequired from 'images/common/icon-required.png';
import IconFileUpload from 'images/bizstore/icon-fileupload.png';
import IconFileUploadHover from 'images/bizstore/icon-fileupload-hover.png';
import IconDeleteImg from 'images/bizstore/icon-deleteImg.png';
import DelListItem from 'images/common/widget-icon-delete.png';

const StyleBizMenuAuthSetting = styled.div`
  width: 100%; /* 920px; */
  /* margin: 30px auto 0; */
  padding: 0;
  border: 1px solid #e5e5e5;
  background: #ffffff;
  margin-top: 30px;
  margin-bottom: 0;
  /* margin-left: 30px; /* 350px; */

  .pageTitle {
    height: 60px;
    border-bottom: 1px solid #e5e5e5;
    color: #404040;
    font-size: 18px;
    line-height: 60px;
    letter-spacing: -0.7px;
    padding: 0 30px;
  }

  .sectionTitle {
    padding: 32px 0;
    color: #404040;
    font-size: 18px;
    text-align: center;
    letter-spacing: -0.7px;
  }

  .formTable {
    margin: 20px 0;
    padding: 0 30px;

    table {
      width: 100%;
      color: #404040;
      font-size: 14px;
      // table 안에 antd 체크박스가 있는 경우
      border-collapse: separate;
      border-spacing: 0;

      th {
        width: 175px;
        min-height: 40px;
        padding-top: 11px;
        font-weight: 400;
        letter-spacing: -0.7px;

        &:before {
          position: absolute;
          display: inline-block;
          width: 15px;
          margin-top: 4px;
          text-indent: -15px;
        }

        //필수입력 표시
        &.required:before {
          position: absolute;
          display: inline-block;
          width: 15px;
          margin-top: 4px;
          color: #f85023;
          text-indent: -15px;
        }

        &.top {
          vertical-align: top;

          .num2,
          .num5,
          .num15 {
            display: block;
            padding-top: 6px;
          }

          .num3,
          .num4,
          .num6,
          .num7,
          .num9,
          .num10,
          .num11,
          .num12,
          .num13,
          .num14,
          .num16 {
            display: block;
            line-height: 34px;
          }

          .num8,
          .num17 {
            display: block;
            padding-top: 0;
          }
        }

        .num1 {
          display: block;
          line-height: 31px;
        }

        .grayTxt {
          display: block;
          padding: 0;
          color: #cccccc;
          line-height: 1;
        }
      }

      td {
        padding: 5px 0;
        font-size: 14px;
      }
    }
  }

  .ant-form-item {
    // 필수 입력일 때
    &.required {
      .ant-form-item-label {
        padding-left: 12px;

        &:before {
          content: url(${IconRequired});
          position: absolute;
          top: -2px;
          left: 0;
          display: inline-block;
          color: #f85023;
        }
      }

      .ant-input {
        border-color: #f85023;
      }
    }

    &.categorySelect {
      .ant-form-item-control-wrapper {
        width: 100%;
        padding-right: 80px;

        .deleteValue {
          position: absolute;
          right: 0;
          width: 30px;
          height: 32px;
          background: url(${DelListItem}) no-repeat 50% 50%;
          text-indent: -999999px;
          opacity: 0.3;

          &:hover {
            opacity: 1;
          }
        }

        .btnText.edit {
          position: absolute;
          top: 0;
        }

        .ant-form-item-children-icon {
          display: none;
        }
      }
    }
  }

  // 향후 삭제
  .temp {
    display: block;
    padding: 0 10px;
    color: pink;
    line-height: 34px;
    border: 1px dashed #efefef;
  }

  // Form.Item 스타일
  .ant-row.ant-form-item {
    min-height: 32px;
    margin-bottom: 0;
    line-height: 1;

    .ant-form-item-label {
      line-height: 32px;

      label {
        height: inherit;
        line-height: 1;

        &:after {
          content: '';
        }
      }
    }
    .ant-form-item-control {
      line-height: 1;

      //체크박스
      .ant-checkbox-group {
        line-height: 32px;
      }
    }
  }

  //radio 버튼 font 크기
  .ant-radio-wrapper {
    margin-top: 10px;
    font-size: 14px !important;

    .ant-radio + span {
      color: #404040;
    }
  }

  //Input 스타일 (나중에 빼기)
  .ant-input {
    height: 35px;
    line-height: 35px;

    &:read-only {
      background: #f5f5f5;
      cursor: default;

      &:hover {
        border-color: #cccccc;
      }
    }
  }

  textarea {
    width: 100%;
    height: 110px;
    padding: 10px;
    border: 1px solid #cccccc;
    line-height: 1.3;
    resize: none;
  }
  .btnText-wrap {
    border: 1px solid #e5e5e5;
    border-top: 0;
    text-align: center;
    .btnText {
      display: inline-block;
      color: #555555;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      & > i {
        font-size: 13px;
        color: #999;
      }
      & > span {
        margin-left: 5px;
      }

      &.pl0 {
        padding-left: 0;
      }

      &.attachFile {
        .dropzone {
          height: 23px;
          line-height: 23px;
        }
      }
    }
  }
  //색상 선택
  .typeOptions {
    vertical-align: middle;

    //radio 버튼은 투명하게
    .ant-radio-button-wrapper {
      min-width: 70px;
      height: 38px;
      margin: 0 10px 10px 0;
      padding: 0;
      border: none;
      border-radius: 0;
      font-size: 14px;
      text-align: center;

      &:hover {
        border-color: transparent;
      }

      &:not(:first-child)::before {
        background-color: transparent;
      }

      &.ant-radio-button-wrapper-checked {
        box-shadow: none;

        &:first-child {
          border-color: transparent;
        }

        > span > div {
          border-color: #000000 !important;
        }
      }

      > span > div {
        height: 38px;
        line-height: 35px;
        border: 2px solid transparent;
      }
    }
  }

  //회색 영역
  .subFormArea {
    padding: 15px 0;
    background: #f8f8f8;

    .ant-row.ant-form-item {
      padding: 5px 0;

      .ant-form-item-label {
        padding-right: 20px;
      }

      .ant-form-item-control {
        .ant-radio-group {
          line-height: 32px;
        }
      }
    }
  }

  // 안내(info) 목록
  .infoVarList {
    margin-top: 5px;
    color: #707070;
    line-height: 1.5;

    > ul {
      display: inline-block;
      width: 100%;

      > li {
        padding-left: 8px;
        letter-spacing: -0.5px;
      }
    }
  }

  .infoAuthList {
    display: inline-block;
    width: 100%;

    > li {
      color: #f85023;
      font-size: 14px;
      line-height: 1.5;
      letter-spacing: -0.5px;
    }
  }

  // 하단 버튼들
  .buttonWrapper {
    padding: 20px 30px;
    border-top: 1px solid #e5e5e5;
    text-align: right;

    button {
      // min-height: 35px;
      margin: 0 0 0 5px;
    }
  }

  //담당자, 대상 목록 (StyleSiteAdminForm.js 소스 참조)
  .appManagerListBox {
    display: inline-block;
    width: 100%;
    min-height: 43px;
    max-height: 195px;
    border: 1px solid #e5e5e5;
    border-bottom: 1px dotted #e5e5e5;
    vertical-align: top;

    // 커스터마이징

    .resultsTableWrapper {
      width: calc(100% - 17px);
      padding: 5px;
      @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
        /* IE10+ specific styles go here */
        margin-bottom: 20px;
      }

      td {
        padding: 0 5px;
        border-bottom: none;

        &.groupName {
          width: 100%;
          height: 18px;
          color: #707070;
          font-size: 12px;
          background: #f3f3f3;
          text-align: center;
        }

        &.userPic {
          > div {
            float: left;
            margin-right: 5px;
          }
          .ellipsis {
            width: calc(100% - 35px);
            line-height: 25px;
          }
        }

        &:last-child:not(.groupName) {
          text-align: right;

          > button {
            width: 30px;
            background: url(${DelListItem}) no-repeat 50% 50%;
            text-indent: -999999px;
            opacity: 0.3;

            &:hover {
              opacity: 1;
            }
          }
        }
      }
    }
  }

  // 파일 업로드
  .appIconUploadArea {
    position: relative;
    display: inline-block;
    width: 156px;
    height: 156px;
    padding: 18px;
    background: #f3f3f3;

    .dropzone > div:hover {
    }

    .readyToUpload {
      width: 120px;
      height: 120px;
      border: 1px dashed #a4a4a4;
      background: url(${IconFileUpload}) no-repeat 50% 50%;
      cursor: pointer;

      &:hover {
        border-color: #222222;
        background-image: url(${IconFileUploadHover});
      }
    }
  }

  .deleteIconWrapper,
  .deleteScreenshots {
    position: absolute;
    width: 15px;
    height: 15px;
  }

  .deleteIconWrapper {
    top: 17px;
    right: 18px;

    > button {
      width: 15px;
      height: 15px;
      background: url(${IconDeleteImg}) no-repeat 0 0;
    }
  }

  .deleteScreenshots {
    top: 0;
    right: 0;
    background: url(${IconDeleteImg}) no-repeat 0 0;
  }

  // 스크린샷 업로드
  .screenshotUploadArea {
    display: inline-block;
    margin-bottom: 25px;
    width: 100% !important;
    min-height: 135px;
    margin-left: 0 !important;
    padding: 14px;
    background: #f3f3f3;

    .defaultGuideTxt {
      display: flex;
      position: absolute;
      width: 720px;
      height: 122px;
      justify-content: center;
      align-items: center;
      color: #909090;
      font-size: 14px;
    }

    .dropzone {
      width: 100%;
      height: 100%;
      cursor: pointer;

      .ant-row {
        // IE11 이슈 해결
        max-width: 646px;
        padding: 0 !important;
        margin: 0 !important;

        > div {
          position: relative;
          padding: 0 !important;
          margin: 0 5px 5px 0 !important;
          width: 156px;
          height: 104px;

          > span {
            display: inline-block;
            width: 100%;
            height: 100%;
            overflow: hidden;

            > img {
              max-width: 156px;
              max-height: 104px;
            }
          }

          .readyToUpload {
            width: 156px;
            height: 104px;
            border: 1px dashed #a4a4a4;
            background: url(${IconFileUpload}) no-repeat 50% 50%;
            cursor: pointer;

            &:hover {
              border-color: #222222;
              background-image: url(${IconFileUploadHover});
            }
          }
        }
      }
    }
  }

  //앱추가
  .quickmenuAppUploadArea {
    display: flex;
    width: 100% !important;
    padding-bottom: 20px;
    padding-left: 5px;

    .ant-row {
      // IE11 이슈 해결
      max-width: 646px;
    }

    > div > div {
      padding-left: 0 !important;
      padding-right: 0 !important;
      margin: 5px !important;
      width: 80px;
      height: 80px;

      .borderRadius {
        height: 100%;
        overflow: hidden;
        border-radius: 18px;
      }

      img {
        width: 100%;
        max-height: 80px;
      }
    }

    .readyToUpload {
      width: 80px;
      height: 80px;
      border: 1px dashed #a4a4a4;
      background: url(${IconFileUpload}) no-repeat 50% 50%;
      cursor: pointer;

      &:hover {
        border-color: #222222;
        background-image: url(${IconFileUploadHover});
      }
    }
  }

  // 업로드할 파일 선택버튼
  section {
    &.btnText {
      display: inline-block;
      width: auto;
      height: 23px;
      float: right;
      padding-left: 15px;
      padding-right: 15px;
      border: none;
      color: #555555;
      font-size: 12px;
      font-weight: 600;
      background: #e0e0e0;
      border-radius: 11.5px;
      cursor: pointer;

      &.pl0 {
        padding-left: 0;
      }

      &.attachFile,
      &.edit {
        position: absolute;
        right: 0;

        .dropzone {
          height: 23px;
          line-height: 23px;
        }
      }

      &.attachFile {
        top: 8px;
      }

      &.edit {
        top: -38px;
      }
    }
  }
`;

const Vesions = styled.div`
  display: inline-block;
  height: 35px;

  > div {
    width: 50px;
    float: left;

    > input {
      text-align: center;
    }

    &.mark {
      width: 60px;
      padding-right: 10px;

      &:after {
        content: ' . ';
        position: absolute;
        display: inline-block;
        width: 10px;
        padding-top: 10px;
        text-align: center;
      }
    }
  }
`;

export { StyleBizMenuAuthSetting, Vesions };
