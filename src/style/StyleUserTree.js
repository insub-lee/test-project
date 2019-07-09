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

      > select {
        display: block;
        width: 100%;
        height: calc(1.47em + 1rem + 2px);
        padding: .5rem .875rem;
        font-size: .8125rem;
        font-weight: 400;
        line-height: 1.47;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        -webkit-transition: border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
        transition: border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
        
        /*
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background: url(${iconSelectArrowDw}) no-repeat; 
        background-position: calc(100% - 10px) 50%;
        */
        /* IE 10, 11의 네이티브 화살표 숨기기 
        &::-ms-expand { 
          display: none;
        }
        */ 

        &:focus {
          color: #495057;
          background-color: #fff;
          border-color: #886ab5;
          outline: 0;
          -webkit-box-shadow: 0 0 0 0.2rem transparent;
          box-shadow: 0 0 0 0.2rem transparent;
        }
      }
      
    }

  }
  .inputWrapper {
    position: relative;
    width: 260px;
    margin: auto;
    .ant-input {
      display: block;
      width: 100%;
      height: calc(1.47em + 1rem + 2px);
      padding: .5rem .875rem;
      font-size: .8125rem;
      font-weight: 400;
      line-height: 1.47;
      color: #495057;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      -webkit-transition: border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
      transition: border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
      transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
      transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;

      &:focus,
      &:hover {
        color: #495057;
        background-color: #fff;
        border: 1px solid #886ab5;
        outline: 0;
        -webkit-box-shadow: 0 0 0 0.2rem transparent;
        box-shadow: 0 0 0 0.2rem transparent;
      }
    }
    .searchButton {
      position: absolute;
      top: 3px;
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
    background-color: #886ab5;
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
    background: #886ab5;
  }
  
  .orgTreeWrapper .rstcustom__rowSearchFocus,
  .orgTreeWrapper .rstcustom__rowSearchMatch {
    outline: none;
  }
  
  /* 임시 */
  .orgTreeWrapper .rstcustom__rowSearchFocus .rstcustom__rowTitle,
  .orgTreeWrapper .rstcustom__rowSearchMatch .rstcustom__rowTitle {
    color: #886ab5;
  }
  
`;
export default StyleUserTree;
