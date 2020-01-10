import styled from 'styled-components';
import iconShowMenu from 'images/bizstore/arrow-gray.png';
import iconViewTree from 'images/bizstore/icon-category-rgt4.png';
import iconViewTreeCurrent from 'images/bizstore/icon-category-rgt3.png';
import iconViewGrid from 'images/bizstore/icon-view-grid.png';
import iconViewGridCurrent from 'images/bizstore/icon-view-grid-current.png';
// import { palette } from 'styled-theme';

const StyleTopMenu = styled.div`
  height: 100%;
  padding: 25px 20px;
  border-bottom: 1px solid #dcdcdd;
  letter-spacing: -0.5px;

  .mngList {
    margin-top: 2px;
  }

  .bizGrpTitle {
    color: #000000;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }

  .openDate {
    display: inline-block;
    margin-left: 10px;
    color: #404040;
    font-size: 14px;
  }

  .viewMode {
    display: inline-block;
    width: 72px;
    height: 27px;
    margin-left: 10px;
    border: 1px solid #d2d2d2;
    border-radius: 4px;
    vertical-align: middle;
    overflow: hidden;

    .view {
      &.treeIcon,
      &.gridIcon {
        display: inline-block;
        width: 50%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: 17px 17px;
        border-radius: 0;
        background-color: #ffffff;
        &:hover,
        &.current {
          opacity: 1;
        }

        &.current {
          cursor: default;
          pointer-events: none;
        }
      }

      &.treeIcon {
        background-image: url(${iconViewTree});
        opacity: 0.7;

        &.current {
          background-image: url(${iconViewTreeCurrent});
        }
      }

      &.gridIcon {
        background-image: url(${iconViewGrid});
        opacity: 0.7;

        &.current {
          background-image: url(${iconViewGridCurrent});
        }
      }

      &.current {
        background-color: #d2d2d2;
      }
    }
  }

  .showBizTreeMobile {
    display: none;
  } //모바일용

  @media only screen and (max-width: 1024px) {
    height: auto;
    padding: 0 0 10px;

    .mngList {
      margin-top: 0;
      float: right;
    }

    .openDate {
      margin-left: 0;
      font-size: 12px;
      letter-spacing: 0;
    }

    .bizGrpTitle {
      width: 100%;
      padding: 5px 0;
      text-align: left;
    }

    .showBizTreeMobile {
      display: block;
      float: left;
      min-width: 50px;
      height: 25px;
      padding-left: 0;
      padding-right: 10px;
      color: #404040;
      font-size: 12px;
      line-height: 25px;

      .iconArrow {
        display: inline-block;
        width: 14px;
        height: 14px;
        margin-right: 5px;
        border: 1px solid #404040;
        border-radius: 7px;
        background: url(${iconShowMenu}) no-repeat 50% 50%;
        background-size: 4px 6px;
        vertical-align: middle;
      }
    }
  }
`;

export default StyleTopMenu;
