import styled from 'styled-components';
import { transition } from '../../../../config/style-util';
// import WithDirection from '../../config/withDirection';

const UserSearch = styled.div`

  .history.visible, .results.visible {
    position: relative;
    width: 330px;
    height: 100%;
    min-height: 86px;
    max-height: 360px;
    top: 14px;
    left: -83px;
    border: 1px solid #a5a5a5;
    background-color: #ffffff;
    ${transition()};
  }

  .history.visible:after, .results.visible:after {
    position: absolute;
    top: -4px;
    left: 50%;
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-left: -4px;
    background: #ffffff;
    border-top: 1px solid #a5a5a5;
    border-left: 1px solid #a5a5a5;
    content: "";
    transform: translateX(-50%) rotate(45deg);
  }

  .message {
    width: 100%;
    height: 100%;
  }

  .custom-scrollbar {
    width: 100%;
  }

  .historyTableWrapper {
    padding: 10px 0 10px 10px;

    table tr td {
      height: 31px;
      padding: 0;
      color: #404040;
      font-size: 12px;
      line-height: 31px;

      button {
        width: 24px;
        height: 21px !important;
        padding: 0;
        line-height: 21px !important;

        .deleteIcon {
          // vertical-align: baseline;
        }
      }
    }
  }

  .resultsTableWrapper {
    padding: 10px 0 10px 10px;

    table tr td {
      height: 31px;
      padding: 0;
      color: #404040;
      font-size: 12px;
      line-height: 31px;
    }

    div {
      position:relative;
      
      vertical-align:middle;
      overflow:hidden;
      border-radius:50%;
      width:25px;
      height:25px;
      
      .listImg {
        position:absolute;
        top:0;
        left:0;
        width:100%;
      }
    }
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
`;

// const UserSearchWrapper = WithDirection(UserSearchWrapper);

export default UserSearch;
