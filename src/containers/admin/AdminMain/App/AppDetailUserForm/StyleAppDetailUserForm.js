import styled from 'styled-components';
import IconOption from 'images/common/icon-option.png';
import IconRequired from 'images/common/icon-required.png';

const StyleAppDetailUserForm = styled.div`
  width: 100%;
  padding-bottom: 15px;

  .appInfo {
    padding: 35px 0 20px;
    color: #222222;
    font-size: 18px;
    text-align: center;
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

  //담당자 (그룹/담당)
  .resultsTableWrapper {
    padding: 0;
    margin-left: 10px;

    .userPic {      
      > div {
        display: inline-block;
        width: 25px;
      }

      > p {
        display: inline-block;
        vertical-align: middle;
      }
    }

    > table tr {
      cursor: default;
    }

    > table tr td:last-child {
      line-height: 25px;
    }
  }

  //담당자, 대상 목록 (StyleSiteAdminForm.js 소스 참조)
  .appManagerListBoxNoScroll {
    display: inline-block;
    width: 100%;
    height: auto;
    vertical-align: top;
    
    .resultsTableWrapper {
      @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {  
        /* IE10+ specific styles go here */
        margin-bottom: 20px;
      }

      td {
        padding: 0;
        border-bottom: none;
        cursor: default;

        &.groupName {
          width: 100%;
          height: 18px;
          padding-left: 5px;
          color: #707070;
          font-size: 11px;
          background: #ececec;
          text-align: left;
        }

        &.userPic {
          > div {
            float: left;
            margin-right: 5px;
            margin-top: 4px;
          }
          .ellipsis {
            width: calc(100% - 35px);
            line-height: 31px;
          }
        }
      }
    }

  }

  .dsrcViewText {
    margin-top: 5px;
    color: #404040;
    font-size: 13px;
    letter-spacing: -0.5px;
    white-space: pre-wrap;
  }
`;

export default StyleAppDetailUserForm;
