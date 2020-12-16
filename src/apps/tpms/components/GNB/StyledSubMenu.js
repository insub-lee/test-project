import styled from 'styled-components';
import iconDot from '../../images/icon_dot.png';

// language=LESS
const StyledSubMenu = styled.ul`
  &.gnb_sub {
    padding: 0;
    //display: none;
    max-height: 0;
    overflow: hidden;
    //display: none;
    //transition: max-height 0.15s ease-out;
    transition: all 100ms cubic-bezier(0.5, 0.05, 1, 0.5);

    &.active {
      padding: 10px 0;
      //display: block;
      max-height: 100%;
      //transition: max-height 0.25s ease-in;
    }

    & > li > button,
    & > li > .nav_link {
      height: 26px;
      line-height: 26px;
      color: white;
      opacity: 0.5;
      background: url(${iconDot}) no-repeat 40px center;
      padding-left: 54px;
      font-size: 14px;

      &.active {
        opacity: 1;
      }
    }

    .gnb_sub_depth {
      padding: 3px 0 3px 54px;
      display: none;

      &.active {
        display: block;
      }
    }
    .gnb_sub_depth > li > .nav_link {
      height: 25px;
      line-height: 25px;
      color: white;
      opacity: 0.5;
      //padding-left: 54px;
      font-size: 13px;

      &.active,
      &:hover,
      &:active {
        opacity: 1;
        //border-bottom: 1px solid #4491e0;
        //background: #4491e0;
      }

      &.on {
        opacity: 1;
      }
    }
    @media screen and (max-width: 738px) {
      & > li > button,
      & > li > .nav_link {
        height: 19px;
        line-height: 19px;
        color: white;
        opacity: 0.5;
        background: url(${iconDot}) no-repeat 30px center;
        padding-left: 46px;
        font-size: 11px;

        &.active {
          opacity: 1;
        }
      }

      .gnb_sub_depth {
        padding: 2px 0;
      }
      .gnb_sub_depth > li > button {
        height: 18px;
        line-height: 18px;
        padding-left: 46px;
        font-size: 10px;
      }
    }
  }
`;

export default StyledSubMenu;
