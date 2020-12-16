import styled from 'styled-components';

const StyledMainMenu = styled.ul`
  &.gnb {
    & button,
    & .nav_link {
      cursor: pointer;
      width: 100%;
      text-align: left;
    }

    & > li > .nav_link {
      display: block;
      height: 44px;
      line-height: 44px;
      color: white;
      opacity: 0.5;
      border-bottom: 1px solid #353b43;
      position: relative;

      &.active,
      &:hover,
      &:active {
        opacity: 1;
        border-bottom: 1px solid #4491e0;
        background: #4491e0;
      }

      & > i {
        margin: 0 12px 0 22px;
        width: 18px;
      }

      & > i.fa-angle-right {
        margin: 0;
        right: 10px;
        top: 15px;
        position: absolute;
      }
    }

    @media screen and (max-width: 738px) {
      & > li > button,
      & > li > .nav_link {
        height: 36px;
        line-height: 36px;
        font-size: 13px;

        & > i {
          margin: 0 12px 0 15px;
        }
        & > i.fa-angle-right {
          right: 0;
          top: 11px;
        }
      }
    }
  }
`;

export default StyledMainMenu;
