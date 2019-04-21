import styled from 'styled-components';
// import { transition } from '../../../../config/style-util';
// import WithDirection from '../../config/withDirection';

const UserSearch = styled.div`

  .history.visible, .results.visible {
    position: relative;
    width: 350px;
    height: 100%;
    min-height: 86px;
    max-height: 380px;
    top: 7px;
    left: -65px;
    background-color: #ffffff;
    box-shadow: 0px 2px 7px 0px rgba(0,0,0,0.3);

    @media only screen and (max-width: 1024px) {
      left: -101px;
    }

    @media only screen and (max-width: 414px) {
      width: 320px;
      left: -161px;
    }
  }

  .history.visible:after, .results.visible:after {
    position: absolute;
    top: -4px;
    left: 50%;
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-left: 0;
    background: #ffffff;
    content: "";
    transform: translateX(-50%) rotate(45deg);

    @media only screen and (max-width: 1024px) {
      left: 58%;
    }

    @media only screen and (max-width: 414px) {
      left: 68%;
    }
  }

  .message {
    width: 100%;
    height: 100%;
  }

  .custom-scrollbar {
    width: 100%;

    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {  
      /* IE10+ specific styles go here */
      padding-bottom: 15px; 
    }
  }

  .historyTableWrapper {
    display: inline-block;
    width: 100%;
    padding: 10px 0 0 15px;
    max-width: 350px;

    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {  
      /* IE10+ specific styles go here */
      padding: 10px 0 15px 15px;
    }

    table tr td {
      height: 42px;
      padding: 0;
      color: #404040;
      font-size: 12px;
      line-height: 1.3em;
      vertical-align: middle;

      button.delRow {
        width: 24px;
        height: 24px !important;
        padding: 0;
        line-height: 6px !important;
      }

      .listDivImg {
        position:relative;
        width:25px;
        height:25px;
        border-radius:50%;
        overflow:hidden;
      }
    }
  }

  .resultsTableWrapper {
    padding: 10px 0 10px 15px;

    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {  
      /* IE10+ specific styles go here */
      padding: 10px 0 15px 15px;
    }

    table tr td {
      height: 42px;
      padding: 0;
      color: #404040;
      font-size: 12px;
      line-height: 1.3em;
    }

    .listDivImg {
      position:relative;
      width:25px;
      height:25px;
      border-radius:50%;
      vertical-align:middle;
      overflow:hidden;
    }
  }

  .listImg {
    position:absolute;
    top:0;
    left:0;
    width:100%;
  }

  .ellipsis {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .controlBtns {
    width: 100%;
    height: 36px;
    line-height: 1;
    background-color: #f4f4f4;

    .deleteHistoryAllBtn, .closeBtn {
      height:36px !important;
      padding: 0 15px;
      color: #404040;
      font-size: 12px !important;
      background: transparent;
    }

    .divBar {
      color: #cccccc;
    }
  }

  .icon-search {
    &:before {
      color: ${props => props.theme.header.memberSearch.iconSearchButtonColor};
    }
  }
`;

// const UserSearchWrapper = WithDirection(UserSearchWrapper);

export default UserSearch;
