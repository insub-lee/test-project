import styled from 'styled-components';

const StyledTypeSwitcher = styled.div`
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
      margin: 0 26px;
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
        width: 50%;
        height: 92px;
      }
    }
  }
`;

export default StyledTypeSwitcher;
