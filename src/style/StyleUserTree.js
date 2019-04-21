import styled from 'styled-components';
import iconSearch from 'images/portal/icon-search2.png';
import iconCollapseButton from 'images/portal/tree-icon-collapsed.png';
import iconExpandButton from 'images/portal/tree-icon-expand.png';
import iconSelectArrowDw from 'images/portal/icon-select-arrow-down.png';

const StyleUserTree = styled.div`
  .searchOptions {
    width: 100%;
    padding: 15px 15px 0 15px;

    .selectWrapper {
      width: 100%;
      height: 30px;
      border: 1px solid #c1c1c1;
      color: #404040;
      font-size: 13px;
      line-height: 30px;
      background-color: #ffffff;
      border-radius: 4px;

      > select {
        width: 100%;
        padding: 0 10px;
        border: 0;

        -webkit-appearance: none; /* 네이티브 외형 감추기 */
        -moz-appearance: none;
        appearance: none;
        background: url(${iconSelectArrowDw}) no-repeat; /* 화살표 모양의 이미지 */ 
        background-position: calc(100% - 10px) 50%;

        /* IE 10, 11의 네이티브 화살표 숨기기 */ 
        &::-ms-expand { 
          display: none;
        }
      }
      
    }

  }
  .inputWrapper {
    position: relative;
    width: 260px;
    height: 30px;
    margin: auto;
    .ant-input {
      height: 30px;
      border-color: #c1c1c1;
    }
    .searchButton {
      position: absolute;
      top: 0;
      right: 0;
      width: 30px;
      height: 30px;
      border: 0;
      background: url(${iconSearch}) no-repeat 50% 50%;
      background-size: 50% 50%;
      cursor: pointer;
    }
  }

  .rst__node {
    height: 24px !important;

    // .rst__lineBlock {
    //   width: 20px !important;
    // }
  }
  
  .rst__rowWrapper {
    padding: 0;
  }
  
  .rst__lineHalfHorizontalRight::before {
    height: 0;
  }
  
  .rst__lineFullVertical::after, 
  .rst__lineHalfVerticalTop::after, 
  .rst__lineHalfVerticalBottom::after,
  .rst__lineChildren::after {
    width: 0;
  }
  
  .rst__moveHandle {
    display: none;
  }

  .orgTreeWrapper {
    color: #404040;
  }
  
  .orgTreeWrapper .rst__nodeContent {
    left: 0;

    .rstcustom__ordinaryButton {
      left: -16px !important;
      top: calc(50% - 3px);
      width: 8px;
      height: 8px;
      transform: none;
    }
  }
  
  .orgTreeWrapper .rstcustom__rowWrapper.rstcustom__rowWrapperDragDisabled {
    padding: 5px 0;
  }
  
  .orgTreeWrapper .rstcustom__rowTitle {
    margin-left: ${props => props.pl};
  }
  
  .orgTreeWrapper .rstcustom__rowTitle > button,
  .orgTreeWrapper .rstcustom__rowTitle > button:active,
  .orgTreeWrapper .rstcustom__rowTitle > button:focus {
    padding: 2px 4px 4px;
    font-size: 12px;
    line-height: 12px;
  }

  .orgTreeWrapper .rstcustom__rowTitle > button.active {
    color: #ffffff;
    background-color: #f85023;
  }
  
  .orgTreeWrapper button:focus,
  .orgTreeWrapper button.active:focus {
    outline: 0;
  }
  
  .orgTreeWrapper .rstcustom__rowToolbar {
    position: absolute;
    left: 2px;
    top: -2px;
  }

  // 가상그룹인 경우
  .orgTreeWrapper.grp .ReactVirtualized__Grid.ReactVirtualized__List.rst__virtualScrollOverride {
    height: 396px !important;
  }
  
  /* Organization Tree Customization */
  .orgTreeWrapper .rst__lineHalfHorizontalRight::before,
  .orgTreeWrapper .rst__lineFullVertical::after, 
  .orgTreeWrapper .rst__lineHalfVerticalTop::after, 
  .orgTreeWrapper .rst__lineHalfVerticalBottom::after {
    left: calc(50% - 3px) !important;
    width: 2px;
    background-color: #dedede;
    // height: 0 !important;
  }
  
  .orgTreeWrapper .rstcustom__expandButton,
  .orgTreeWrapper .rstcustom__collapseButton {
    left: -12px !important;
    top: calc(50% + 2px);
  }
  
  .orgTreeWrapper .rstcustom__expandButton {
    background: url(${iconExpandButton}) no-repeat 50% 50%;
  }
  
  .orgTreeWrapper .rstcustom__collapseButton {
    background: url(${iconCollapseButton}) no-repeat 50% 50%;
  }
  
  .orgTreeWrapper .rstcustom__rowWrapperDragDisabled .rstcustom__row {
    color: #404040 !important;
  }

  /* 마지막 노드 표시 */
  .orgTreeWrapper .rstcustom__ordinaryButton,
  .orgTreeWrapper .rstcustom__ordinaryButton.active {
    background: #f85023;
  }
  
  .orgTreeWrapper .rstcustom__rowSearchFocus,
  .orgTreeWrapper .rstcustom__rowSearchMatch {
    outline: none;
  }
  
  /* 임시 */
  .orgTreeWrapper .rstcustom__rowSearchFocus .rstcustom__rowTitle,
  .orgTreeWrapper .rstcustom__rowSearchMatch .rstcustom__rowTitle {
    color: #f85023;
  }
  
`;
export default StyleUserTree;
