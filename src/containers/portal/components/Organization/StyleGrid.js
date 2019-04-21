import styled from 'styled-components';
import IconNoContent from 'images/common/icon-no-content-gray.png';

const StyleGrid = styled.div`

.react-grid-Main {
    outline: 0;
  }
  .react-grid-Grid {
    // height: 393px;
    height: ${props => `${props.gridHeight}px`};
    border: 0;
  }
  .react-grid-Header {
    background: #ffffff;
    border-bottom: 1px solid #333333;
  
    .react-grid-HeaderRow {
      width: 366px !important;
    }
  
    .react-grid-HeaderCell {
      left: 40px !important;
      border-right: 0;
      border-bottom: 1px solid #333333;
      color: #707070;
      font-size: 13px;
      background: #ffffff;
      text-align: center;

      &.react-grid-HeaderCell--locked {
        left: 0 !important;
        width: 40px !important;
      }
  
      & > .react-grid-checkbox-container {
        position: relative;
        padding: 0;
        overflow: hidden;
  
        .react-grid-checkbox-label {
          top: 10px;
          width: 13px;
          height: 13px;
          transform: none; // 흐리게 보이는 현상 해결
        }
      }
  
      &:last-child {
        padding: 0;
      }
    }
  }

  .listDivImg {
    position:relative;
    overflow:hidden;
    border-radius:50%;
    display:inline-block;
    vertical-align:middle;
    width: 25px;
    height: 25px;
    margin:0px 10px 0px 0px;
    
    .listImg {
      position:absolute;
      top:0;
      left:0;
      width: 100%;
    }
  }
  
  .react-grid-Viewport {
    // height: 353px;
    height: ${props => `${props.gridHeight - 40}px`};
    border-bottom: 1px solid #dadbdb;
  
    .react-grid-Canvas {
      top: 1px;
      // height: 353px;
      height: ${props => `${props.gridHeight - 40}px`};
      overflow-x: hidden !important;

      .react-grid-Row {
        & > .react-grid-Cell {
          text-align: left;
        }
      }
    }
  }
  
  .react-grid-Row.react-grid-Row--even, 
  .react-grid-Row.react-grid-Row--even.row-selected {
    .react-grid-Cell {
      background-color: #f7f7f7;
    }
  }
  
  .react-grid-Row.react-grid-Row--odd, 
  .react-grid-Row.react-grid-Row--odd.row-selected {
    .react-grid-Cell {
      background-color: #ffffff;
    }
  }
  
  .react-grid-Cell {
    left: 40px !important;
    padding: 0;
    border-right: 0;
    border-bottom: 0;
    color: #404040;
    font-size: 12px;
    text-align: center;

    &:focus {
      outline: 0;
    }

    &.react-grid-Cell--locked {
      left: 0 !important;
      width: 40px !important;

      &:last-of-type {
        border: 0;
      }
    }
  }

  .react-grid-Row.row-selected, 
  .react-grid-Row .row-selected {
    background-color: transparent;
  }

  .react-grid-Empty {
    width: 100%;
    height: calc(100% - 40px);  // header 높이인 40px 뺀 나머지
    color: #707070;

    span {
      display: inline-block;
      
      .noContentIcon {
        width: 100%;
        height: 16px;
        background: url(${IconNoContent}) no-repeat 50% 0;
      }
    }
  }
  
  // checkbox style
  // 1. 기존 style reset
  .radio-custom+.radio-custom-label:before,
  .react-grid-checkbox+.react-grid-checkbox-label:before {
    height: 14px;
    border: none;
    background-color: transparent;
  }
  
  .react-grid-checkbox:checked+.react-grid-checkbox-label:before {
    background-color: transparent;
    box-shadow: none;
  }
  
  .radio-custom+.radio-custom-label, 
  .react-grid-checkbox+.react-grid-checkbox-label {
    position: relative;
    width: 13px;
    height: 13px;
    margin-top: -5px;
    border: none;
    border: 1px solid #707070;
    background-color: #ffffff;
  }
  
  .react-grid-checkbox:checked+.react-grid-checkbox-label:before {
    position: absolute;
    top: 0;
    left: 3px;
    display: table;
    width: 5.71428571px;
    height: 9.14285714px;
    border: 2px solid #707070;
    border-top: 0;
    border-left: 0;
    background-color: transparent;
    transform: rotate(45deg) scale(1);
  }
`;

export default StyleGrid;
