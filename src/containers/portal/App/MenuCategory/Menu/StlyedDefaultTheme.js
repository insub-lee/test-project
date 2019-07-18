import styled from 'styled-components';

const colorTheme = {
  colorBlueDarkest: '#1a2226',
  colorBlueDark: '#222d32',
  colorGreyLight: '#b8c7ce',
  colorGreyDark: '#4a636e',
  colorBlueLight: '#c4eaf2',
};

const StlyedDefaultTheme = styled.div`
  .Side-menu {
    width: auto;

    .children {
      transition: max-height 0.7s ease-in;
      overflow: hidden;

      &.active {
        transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
        max-height: 9999px;
      }

      &.inactive {
        transition: max-height 0.6s cubic-bezier(0, 1, 0, 1) -0.15s;
        max-height: 0;
      }
    }

    * {
      box-sizing: border-box;
    }

    max-width: 400px;
    width: 100%;

    .divider {
      height: 42px;
      padding-top: 14px;
      padding-left: 14px;
      padding-right: 14px;
      font-size: 12px;
    }

    &.rtl {
      .divider {
        text-align: right;
      }

      .item {
        .item-title {
          .item-label {
            float: right;
          }

          .item-icon {
            margin-right: 0px;
            margin-left: 10px;
            margin-top: 3px;
            float: right;
          }

          .fa-chevron-down,
          .fa-chevron-left,
          .fa-chevron-right {
            float: left;
            font-weight: lighter;
          }
        }

        .children {
          padding-left: 0;
          padding-right: 25px;
        }
      }
    }

    .item {
      .item-title {
        height: 40px;
        padding-top: 14px;
        padding-left: 18px;
        padding-right: 18px;
        font-size: 14px;
        cursor: pointer !important;

        .item-icon {
          margin-right: 10px;
        }

        .fa-chevron-down,
        .fa-chevron-left,
        .fa-chevron-right {
          float: right;
          position: relative;
          font-size: 12px;
          padding-top: 3px;
        }
      }

      &:hover {
        > .item-title {
          cursor: pointer;
        }
      }

      &.item-level-1 {
        > .item-title {
          height: 45px;
        }
      }

      .children {
        padding-left: 25px;
      }
    }
  }

  .Side-menu-default {
    *:not(i) {
      font-weight: 300;
    }

    .divider {
      background-color: rgba(255, 255, 255, 0.04);
      color: #fff;
      text-transform: uppercase;
    }

    .item {
      a {
        text-decoration: none;
        color: #af9fc7;
      }

      &.active {
        color: white;

        .children {
          color: #af9fc7;
        }

        > .item-title {
          > a {
            color: white;
          }
        }
      }

      &:hover {
        > .item-title {
          color: white;
          background-color: rgba(0, 0, 0, 0.1);
          a {
            color: white;
          }
        }
      }

      &.item-level-1 {
        color: #bdafd1;

        &:hover {
          > .item-title {
            background-color: lighten(${colorTheme.colorBlueDarkest}, 20%);
          }
        }

        &:hover,
        &.active {
          background-color: rgba(255, 255, 255, 0.04);
          box-shadow: inset 3px 0 0 #886ab5;
        }
      }
    }
  }
`;

export default StlyedDefaultTheme;
