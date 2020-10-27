import styled from 'styled-components';

const StyledFilterableList = styled.div`
  &.menu_option {
    margin-bottom: 10px;

    .menu_option-title {
      position: relative;
      padding: 5px 26px 20px 26px;
      //color: #ffffff;
      font-size: 14px;

      .title {
        display: inline-block;
        text-align: left;
      }

      .menu_option-title_search {
        position: absolute;
        right: 24px;
        top: 5px;
        width: 110px;
        overflow: hidden;
        border-radius: 3px;

        input {
          box-sizing: unset;
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          color: #555;
          padding: 0 25px 0 5px;
          width: calc(100% - 30px);
          background: white;
        }

        button {
          position: absolute;
          right: 0;
          top: 0;
          width: 25px;
          height: 20px;
          text-align: center;
          display: block;
          line-height: 20px;
        }
      }

      .toggle_show {
        position: absolute;
        right: 26px;
        color: #ffffff;
      }

      .button_group {
        position: absolute;
        display: inline-block;
        height: 16px;
        text-align: right;
        right: 26px;
        font-size: 10px;
        line-height: 16px;

        & > button {
          width: 54px;
        }
      }
    }

    .menu_option-container {
      padding: 0;
      margin: 0;
      list-style: none;

      .menu_option-item {
        //margin: 3px;
      }
    }
  }
`;

export default StyledFilterableList;
