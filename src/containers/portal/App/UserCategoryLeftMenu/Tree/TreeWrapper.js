import styled from 'styled-components';
import iconSearch from 'images/common/icon-search2.png';
import iconArrBtm from 'images/portal/icon-arrow-bt.png';
import iconArrTop from 'images/portal/icon-arrow-top.png';
import iconFolderOpen from 'images/portal/icon-folder-open.png';

const TreeWrapper = styled.div`
  display: flex;
  height: calc(100% - 47px);

  .tree-contents {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 110px);
    width: 100%;
    .show-noti {
      height: calc(100vh - 87px);
    }
  }

  .searchWrapper {
    position: relative;
    display: inline-block;
    /* width: 75%; */
    width: ${props => (props.visiblePersonalize ? '75%' : '90%')};
    margin-bottom: 10px;
    margin-left: 10px;
    & > span.ant-input-affix-wrapper > input.ant-input.ant-input-sm {
      position: relative;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      padding: 0.5rem 0.6rem;
      font-size: 12px;
      font-weight: 400;
      line-height: 1.47;
      color: #495057;
      background-color: #fff;
      background-clip: padding-box;
      height: calc(1em + 0.9rem + 2px);
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

  .search-box {
    position: relative;
  }

  .myMenuEdit {
    position: absolute;
    top: 6px;
    right: 20px;

    > button {
      background-color: transparent;
      i:before {
        color: ${props => (props.blackThema ? '#000' : '#fff')};
      }
    }
  }

  .ant-switch-checked {
    background-color: #1f8c02;
  }

  .rst__lineBlock,
  .rst__absoluteLineBlock {
    display: none;
  }

  /* UserMenu > Badge 오른쪽 고정하기 */
  .sortableTreeWrapper.sidebar > div > .rst__virtualScrollOverride {
    overflow: hidden !important;
  }
  .sortableTreeWrapper.sidebar .rst__nodeContent {
    width: 100%;
    .rstcustom__rowTitle {
      vertical-align: middle;
      display: inline-block;
      button {
        padding-right: 5px;
      }
    }
  }
  .sortableTreeWrapper.sidebar .rst__nodeContent.tree_open {
    .eshs_tree_depth1 {
      background: #4491e0;
      .rstcustom__rowTitle button {
        opacity: 1;
      }
    }
  }

  .sortableTreeWrapper.sidebar .rst__nodeContent:hover {
    .eshs_tree_depth1 {
      background: #4491e0;
      .rstcustom__rowTitle button {
        opacity: 1;
      }
    }
    .eshs_tree_depth2 {
      .rstcustom__rowTitle button {
        opacity: 1;
      }
    }
    .eshs_tree_depth3 {
      .rstcustom__rowTitle button {
        opacity: 1;
      }
    }
    .eshs_tree_depth4 {
      .rstcustom__rowTitle button {
        opacity: 1;
      }
    }
  }

  .sortableTreeWrapper.sidebar .rst__nodeContent {
    .eshs_tree_depth1 {
      .rstcustom__rowTitle button {
        &.active {
          opacity: 1;
        }
        i {
          &:before {
            font-size: 14px;
          }
        }
      }
    }

    .eshs_tree_depth2 {
      .rstcustom__rowTitle button {
        opacity: 0.5;
        &.active {
          opacity: 1;
          text-decoration: underline;
        }
      }
    }

    .eshs_tree_depth3 {
      .rstcustom__rowTitle button {
        opacity: 0.5;
        &.active {
          opacity: 1;
          text-decoration: underline;
        }
      }
    }

    .eshs_tree_depth4 {
      .rstcustom__rowTitle button {
        opacity: 0.5;
        &.active {
          opacity: 1;
          text-decoration: underline;
        }
      }
    }
  }

  /* .sortableTreeWrapper .rst__nodeContent {width: calc(100% - 30px);} */
  .sortableTreeWrapper.sidebar .rst__nodeContent .rstcustom__rowWrapper {
    max-width: 270px;
    overflow: hidden;
  }

  .sortableTreeWrapper.sidebar .rst__nodeContent .rstcustom__rowTitle button {
    text-align: left;
    color: #fff;
    & > i {
      margin-right: 10px;
      width: 12px;
      height: 12px;
      vertical-align: baseline;
    }
  }

  .sortableTreeWrapper.sidebar .rst__nodeContent.tree_open .eshs_tree_typeF .rstcustom__rowTitle button i {
    background: url(${iconFolderOpen}) no-repeat center;
    background-size: 100%;
  }

  .sortableTreeWrapper.sidebar .rst__nodeContent .eshs_tree_depth1 .rstcustom__rowTitle button i {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 10px;
    height: 9px;
  }

  .sortableTreeWrapper.sidebar .rst__nodeContent.tree_open .eshs_tree_typeF.eshs_tree_depth1 .rstcustom__rowTitle button i {
    background: url(${iconArrTop}) no-repeat center;
    background-size: 100%;
  }

  .rstcustom__row.eshs_tree_depth1 {
    border-top: 1px solid #223344;
  }

  .rstcustom__row.eshs_tree_depth2,
  .rstcustom__row.eshs_tree_depth3,
  .rstcustom__row.eshs_tree_depth4 {
    background: #2a3548;
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

  .sortableTreeWrapper.sidebar .rst__nodeContent .rstcustom__rowSearchMatch .rstcustom__rowTitle button {
    opacity: 1;
    color: #ff0;
  }
  .sortableTreeWrapper.sidebar .rst__nodeContent .rstcustom__rowSearchFocus .rstcustom__rowTitle button {
    opacity: 1;
    color: #ff0;
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
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
  }

  .sortableTreeWrapper .rstcustom__expandButton {
    background-image: url(${iconArrBtm});
    background-size: 12px;
    display: none;
  }
  .sortableTreeWrapper .rstcustom__collapseButton {
    background-image: url(${iconArrTop});
    background-size: 12px;
    display: none;
  }
`;

export default TreeWrapper;
