import styled from 'styled-components';
import iconSearch from 'images/common/icon-search2.png';

const TreeWrapper = styled.div`
  display: flex;
  height: calc(100% - 47px);

  .tree-contents {
    display: flex;
    flex-direction: column;
    height: cacl(100vh - 45px);
    width: 100%;
    .show-noti {
      height: calc(100vh - 87px);
    }
  }

  .searchWrapper {
    position: relative;
    display: inline-block;
    width: 80%;
    margin-bottom: 9px;
    margin-left: 9px;
    height: 32px;

    & > span.ant-input-affix-wrapper > input.ant-input.ant-input-sm {
      position: relative;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      padding: 0.5rem 0.875rem;
      font-size: 0.8125rem;
      font-weight: 400;
      line-height: 1.47;
      color: #495057;
      background-color: #fff;
      background-clip: padding-box;
      height: calc(1.47em + 0.9rem + 2px);
      &:focus {
        color: #495057;
        background-color: #fff;
        border-color: #886ab5;
        outline: 0;
        box-shadow: 0 0 0 0.2rem transparent;
      }
    }

    > .searchBtn {
      position: absolute;
      top: 2px;
      right: 0;
      width: 30px;
      height: 30px;
      border: 0;
      background: url(${iconSearch}) no-repeat 50% 50%;
      background-size: 50% 50%;
      cursor: pointer;
    }
  }

  .searchResult {
    color: #ea002c;
    font-size: 12px;
  }

  .searchResultMessage {
    margin-left: 9px;
    margin-top: 3px;
  }

  .myMenuEdit {
    // position: absolute;
    display: inline-block;
    //width: 10%;
    //height: 32px;
    padding: 3px;
    text-align: right;
    vertical-align: middle;
    margin: 0 15px;

    > button {
      background-color: transparent;
    }
  }

  .ant-switch-checked {
    background-color: #1f8c02;
  }

  /* UserMenu > Badge 오른쪽 고정하기 */
  .sortableTreeWrapper.sidebar > div > .rst__virtualScrollOverride {
    overflow: hidden !important;
  }
  /* .sortableTreeWrapper .rst__nodeContent {width: calc(100% - 30px);} */
  .sortableTreeWrapper.sidebar .rst__nodeContent .rstcustom__rowWrapper {
    max-width: 270px;
    overflow: hidden;
  }
  .sortableTreeWrapper.sidebar .rst__nodeContent .rstcustom__rowTitle button {
    width: 320px;
    text-align: left;
    & > i {
      margin-right: 5px;
      height: 23px;
      margin-top: 0;
    }
  }
  .sortableTreeWrapper.sidebar .rst__nodeContent .inTree.ant-badge .ant-badge-count {
    width: 28px;
    height: 17px;
    margin-left: 10px;
    margin-top: -3px;
    border-radius: 8.5px;
    color: #ea002c;
    font-size: 11px;
    font-weight: 600;
    line-height: 17px;
    background: #e6e6e6;
  }
  .sortableTreeWrapper.sidebar .rst__nodeContent .rstcustom__ordinaryButton {
    width: 5px;
    height: 5px;
    left: -10px !important;
  }
  /* .sortableTreeWrapper.sidebar .rstcustom__rowTitle button.active {color: #e6e6e6; background-color: #f85023;} */
  .sortableTreeWrapper.sidebar .rstcustom__rowSearchFocus,
  .sortableTreeWrapper.sidebar .rstcustom__rowSearchMatch {
    outline: none;
  }

  .sortableTreeWrapper .rstcustom__rowSearchMatch .rstcustom__rowTitle button {
    color: #ff0000;
  }
  .sortableTreeWrapper .rstcustom__rowSearchFocus .rstcustom__rowTitle button {
    color: #ff0000;
  }

  /* 임시 */
  .sortableTreeWrapper.sidebar .rstcustom__rowSearchFocus .rstcustom__rowTitle,
  .sortableTreeWrapper.sidebar .rstcustom__rowSearchMatch .rstcustom__rowTitle {
    color: #249433;
  }

  .tree-scrollbar {
    width: 100%;
    height: 100%;
    overflow-x: hidden !important;
  }
`;

export default TreeWrapper;
