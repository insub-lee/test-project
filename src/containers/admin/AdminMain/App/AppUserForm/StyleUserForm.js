import styled from 'styled-components';
import IconOption from 'images/common/icon-option.png';
import IconRequired from 'images/common/icon-required.png';
import DelListItem from 'images/common/widget-icon-delete.png';

const StyleUserForm = styled.div`
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    /* IE10+ specific styles go here */
    line-height: 1 !important;
  }

  h4 {
    position: relative;
    padding-left: 10px;
    margin-top: 30px; //여기에만 있는 속성
    margin-bottom: 9px;
    color: #404040;
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

  .ant-form-item {
    margin-bottom: 20px;
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
      top: 0;
    }

    &.edit {
      top: -31px;
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
`;

export default StyleUserForm;
