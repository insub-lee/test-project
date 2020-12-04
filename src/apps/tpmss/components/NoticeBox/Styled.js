import styled from 'styled-components';
import iconCheck from '../../images/icon_checkbox.png';

const Styled = styled.div`
  border: 1px solid #a0a2a9;
  background: white;
  padding: 0;
  box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, 0.12);
  position: relative;
  z-index: 1;

  .noti_head {
    border-bottom: 1px solid #ddd;
    padding: 15px 10px;
    position: relative;

    > p.tit {
      font-size: 14px;
      color: #666;
      margin: 0;
    }

    > .btns {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);

      button {
        font-size: 13px;
        color: #222;
        border: 1px solid #ddd;
        padding: 4px 10px;
        border-radius: 3px;

        &:first-child {
          margin-right: 5px;
        }
      }
    }
  }

  .noti_body {
    padding: 10px 0;
    height: 280px;
    overflow: auto;

    ul li button {
      padding: 10px 15px;
      display: block;
      text-align: left;
      color: #555;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      overflow: hidden;
      width: 100%;
    }

    .noti_button {
      padding: 10px 15px;
      display: block;
      text-align: left;
      color: #555;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      overflow: hidden;
      width: 100%;
      font-size: 16px;
    }

    .readNotice {
      opacity: 0.5;
    }
    .unreadNotice {
      opacity: 1;
      cursor: pointer;
    }

    .checkbox {
      display: inline-block;
      vertical-align: middle;
    }

    .checkbox input[type='checkbox'] {
      display: none;
    }

    .checkbox input[type='checkbox'] + label {
      cursor: pointer;
      color: #777;
      font-size: 16px;
    }

    .checkbox input[type='checkbox'] + label span {
      display: inline-block;
      margin-right: 6px;
      background: white;
      border: 1px solid #c5cdd6;
      width: 16px;
      height: 16px;
      margin-top: -3px;
      vertical-align: middle;
    }

    .checkbox input[type='checkbox']:checked + label span {
      background: white url(${iconCheck}) no-repeat center;
    }
  }
`;

export default Styled;
