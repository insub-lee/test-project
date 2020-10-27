import styled from 'styled-components';

const StyledSettingMenu = styled.div`
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
      margin: 0 21px;
      list-style: none;

      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;

      -webkit-flex-flow: row wrap;
      justify-content: flex-start;
      align-content: stretch;

      .menu_option-item {
        //margin: 3px;
        width: 56px;
        height: 60px;
      }
    }

    .menu_option-toggle {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      width: 70px;
      color: #ffffff;
      border: 1px solid #ffffff;
    }
  }
`;

export default StyledSettingMenu;
