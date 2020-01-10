import styled from 'styled-components';
// import iconSearch from 'images/portal/icon-search2.png';
import iconCollapseButton from 'images/portal/tree-icon-collapsed.png';
import iconExpandButton from 'images/portal/tree-icon-expand.png';
// import iconSelectArrowDw from 'images/portal/icon-select-arrow-down.png';

const StyleBoardTree = styled.div`

.rst__node {
  height: 24px !important;
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

  .boardTree {
    color: #404040;

    .rst__nodeContent {
      left: 0 !important;

      .rst__rowContents {
        border: none;
        box-shadow: none;
        background: transparent;
        color: #404040;
        font-size: 13px;

        &.rstcustom__rowWrapperDragDisabled {
          border-left: none;
          padding: 5px 0;
        }
      }
  
      .rst__ordinaryButton {
        left: -13px !important;
        top: calc(50% - 3px);
        width: 8px;
        height: 8px;
        transform: none;
      }
  }  
`;
export default StyleBoardTree;
