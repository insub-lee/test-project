import styled from 'styled-components';
import iconSearch from 'images/portal/icon-search.png';
import iconIn from 'images/portal/icon-in.png';
import iconDelete from 'images/common/widget-icon-delete.png';

const StyledSignLine = styled.div`
  background: #ffffff;

  .modalContents {
    position: relative;
    width: 100%;

    .orgActivityInnerBody {
      height: 100%;
      overflow: hidden;
      margin-left: 0 !important;
      margin-right: 0 !important;
      border: 1px solid #c1c1c1;

      @media only screen and (max-width: 1160px) {
        border: none;
      }

      .leftCol {
        width: 100%
        height: 500px;
        margin-top: 16px;
        padding: 3px;
        background: rgb(245, 245, 245);

        .searchOptions {
          width: 100%;
          padding: 15px;

          .inputWrapper {
            position: relative;
            width: 100% !important;
            height: 30px;
            margin: auto;
            
            .ant-input {
              height: 30px;
              border-color: #c1c1c1;
              border-radius: 4px;
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
        }

        .userList {
        }
      }

      .centerCol {
        margin-top: 16px;
      }

      .rightCol {
        width: 100%
        height: 500px;
        margin-top: 16px;
        padding: 5px;
        border: 2px solid #c1c1c1;
        overflow: hidden;
        overflow-y: auto;

        .selUser {
          width: 100%;

          li {
            width: 100%;
            padding: 5px;
          }
        }
      }
    }
  }

  .inBtn {
    background: url(${iconIn}) no-repeat 50% 50%;
    position: absolute;
    top: 50%;
    right: 10px;
    width: 29px;
    height: 36px;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
  }

  .userInfoArea {
    padding: 3px;
  }

  .userImgArea {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 25px;
    height: 25px;
    margin-right: 10px;
    border-radius: 50%;
    overflow: hidden;

    img {
      top: 0;
      left: 0;
      width: 100%;
    }
  }

  .userTextArea {
    display: inline-block;
    font-size: 12px;
    line-height: 1.3em;
    vertical-align: middle;
  }

  .btnUserDel {
    width: 20px;
    float: right;
    border: 0;

    button {
      width: 100%;
      height: 30px;
      background: url(${iconDelete}) no-repeat 0 50%;
      opacity: 0.3;

      &:hover {
        opacity: 1;
      }
    }
  }

  
`;

export default StyledSignLine;
