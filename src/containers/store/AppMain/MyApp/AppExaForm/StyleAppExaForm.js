import styled from 'styled-components';
import IconOption from 'images/common/icon-option.png';
import IconRequired from 'images/common/icon-required.png';
import DelListItem from 'images/common/widget-icon-delete.png';
import IconCalendar from 'images/common/icon-calendar.png';
import IconComment from 'images/common/icon-comment.png';
import IconSquareGray from 'images/common/icon-square-gray.png';

const StyleAppExaForm = styled.div`

  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {  
    /* IE10+ specific styles go here */
    line-height: 1 !important;
  }

  .sectionTitle {
    padding: 44px 0 20px;
    color: #404040;
    font-size: 18px;
    text-align: center;
    letter-spacing: -0.7px;
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
          content: "";
        }
      }
    }
    .ant-form-item-control {
      line-height: 1;

      //체크박스
      .ant-checkbox-group {
        line-height: 32px;
        color: #404040;
      }
    }
  }

  //radio 버튼 font 크기
  .ant-radio-wrapper {
    font-size: 14px !important;

    .ant-radio + span {
      color: #404040;
    }
  }

  //Input 스타일 (나중에 빼기)
  .ant-input {
    height: calc(1.47em + 1rem + 2px);
    line-height: 35px;

    &:read-only {
      background: #f5f5f5;
      cursor: default;

      &:hover {
        border-color: #886ab5;
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

  // 편집 버튼
  .btnText {
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

    &.attachFile, &.edit {
      position: absolute;
      right: 0;

      .dropzone {
        height: 23px;
        line-height: 23px;
      }
    }

    &.edit {
      top: -38px;
    }
  }

  }

  // 하단 버튼들
  .buttonWrapper {
    padding-top: 15px;
    border-top: 1px solid #d3d3d3;
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
    // max-width: 500px;
    min-height: 41px;
    max-height: 195px;
    border: 1px solid #cccccc;
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
          font-size: 11px;
          background: #ececec;
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

  // 운영서비스 적용 예정일
  .openCalendar {
    display: inline-block;
    width: 25px;
    height: 35px;    
    background: url(${IconCalendar}) no-repeat 0 50%;
    vertical-align: middle;
  }

  .SingleDatePickerInput__withBorder {
    border-color: #cccccc;

    .DateInput {
      width: 100px;
      height: 35px;
      border-radius: 0;
  
      .DateInput_input {
        height: 35px;
        color: #404040;
        font-size: 13px;
        padding: 0 10px;
        border-color: transparent;
        border-bottom: none;
        background: #f5f5f5;
        text-align: center;
      }
      .DateInput_fang {
        top: 40px !important;
      //   borrom: 40px;
      }
    }
  }

  .SingleDatePicker_picker {
    top: 51px !important;
  //   bottom: 51px;
  }

  .comments {
    margin-bottom: 5px;
    color: #404040;
    font-size: 14px;
  }

  //comments
  .commentArea {
    padding: 0 10px 10px;
    border: 1px solid #d3d3d3;

    h4.comment {
      height: 41px;
      margin: 0;
      padding-top: 27px;
      color: #707070;
      font-size: 14px;
      text-align: center;

      &:before { content: none; }

      &.commentIcon {
        background-image: url(${IconComment});
        background-position: 50% 12px;
        background-repeat: no-repeat;
      }

    }

    .commentList {
      display: inline-block;
      width: 100%;
      margin-top: 20px;

      > li {
        position: relative;
        padding-left: 10px;
        margin-bottom: 12px;
        color: #404040;
        font-size: 13px;
        line-height: 24px;

        &:before {
          content: '';
          display: inline-block;
          width: 4px;
          height: 4px;
          position: absolute;
          top: 9px;
          left: 0;
          background-image: url(${IconSquareGray});
        }
      }

    }
  }

  .examinerList {
    > li {
      padding-left: 10px;
      padding-bottom: 5px;
      color: #404040;
      font-size: 13px;
      line-height: 24px;
    }
  }

  // 심사자, comment 공통
  .authorItem {
    flex: 0 1 auto;

    .memPic {
      display: inline-block;
      width: 25px;
      height: 25px;
      margin-right: 5px;
      border-radius: 15px;
      overflow: hidden;
      vertical-align: middle;

      > img {
        width: 100%;
      }
    }
  }
  
`;

export default StyleAppExaForm;
