import styled from 'styled-components';

const StyledSettingView = styled.div`
  .title {
    position: relative;
    padding: 10px 20px;
    font-size: 19px;
    background-color: #152434;
    color: #ffffff;

    & > .button_group {
      position: absolute;
      height: 100%;
      top: 11px;
      right: 11px;
      button {
        width: 28px;
        height: 28px;
        color: #ffffff;
      }
    }
  }

  ul {
    padding: 20px 30px;
    & > li {
      width: 100%;
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      align-items: stretch;
      flex-grow: 1;
      font-size: 17px;

      & > .setting-label {
        flex: 0 0 auto;
        position: relative;
        outline: none;
        width: 100px;
        font-weight: 900;
      }

      & > .setting-control {
        flex: 1 1 0;
        position: relative;
        outline: none;

        & > label {
          display: inline-block;
          padding: 1px 3px;
          margin-right: 10px;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          -webkit-transition: all 0.3s ease;
          transition: all 0.3s ease;

          &.setting-show-title {
            position: relative;
            width: 48px;
            height: 25px;

            & > .slider {
              position: absolute;
              cursor: pointer;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: #cccccc;
              -webkit-transition: 0.4s;
              -moz-transition: 0.4s;
              -ms-transition: 0.4s;
              -o-transition: 0.4s;
              transition: 0.4s;

              &:before {
                position: absolute;
                content: '';
                height: 21px;
                width: 21px;
                left: 2px;
                bottom: 2px;
                background-color: #ffffff;
                -webkit-transition: 0.4s;
                -moz-transition: 0.4s;
                -ms-transition: 0.4s;
                -o-transition: 0.4s;
                transition: 0.4s;
              }
            }

            input:checked + .slider {
              background-color: #152434;
            }

            input:focus + .slider {
              box-shadow: 0 0 1px #152434;
            }

            input:checked + .slider:before {
              -webkit-transform: translateX(23px);
              -ms-transform: translateX(23px);
              transform: translateX(23px);
            }

            /* Rounded sliders */
            .slider.round {
              border-radius: 34px;
            }

            .slider.round:before {
              border-radius: 50%;
            }
          }

          &.setting-width {
            & > span {
              display: inline-block;
              padding: 0 5px;
              color: #152434;
              border: 1px solid #152434;
            }

            input:checked + span,
            & > span:hover {
              color: #ffffff;
              background-color: #152434;
              -webkit-transition: all 0.3s ease;
              transition: all 0.3s ease;
            }
          }

          &.setting-color {
            &.type1 {
            }
            &.type2 {
            }
            &.type3 {
            }
            &.type4 {
            }
          }

          & > input[type='radio'],
          & > input[type='checkbox'] {
            display: none;
          }
        }
      }
    }
  }

  & > .button_group {
    position: absolute;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 20px;
    width: 100%;
    text-align: center;
    left: 0;
    bottom: 0;
    > button {
      padding: 3px 30px;
      margin: 0 10px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      color: #152434;
      border: 1px solid #152434;

      &.cancel {
        color: #d50000;
        border: 1px solid #d50000;
        -webkit-transition: all 0.3s ease;
        transition: all 0.3s ease;
        &:active {
          color: #ffffff;
          background-color: #d50000;
          -webkit-transition: all 0.3s ease;
          transition: all 0.3s ease;
        }
      }

      &.save {
        color: #152434;
        border: 1px solid #152434;
        -webkit-transition: all 0.3s ease;
        transition: all 0.3s ease;
        &:active {
          color: #ffffff;
          background-color: #152434;
          -webkit-transition: all 0.3s ease;
          transition: all 0.3s ease;
        }
      }
    }
  }
`;

export default StyledSettingView;
