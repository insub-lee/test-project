import styled from 'styled-components';

const StyledAdminMenu = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  flex: 1 1 auto;
  width: 100%;
  height: 100vh;
  & > div {
    position: relative;
    background-image: linear-gradient(270deg, rgba(51, 148, 225, 0.18), transparent);
    background-color: #584475;
    /* width: 16.875rem;
    max-width: 16.875rem; */
    will-change: left, right;
    flex-direction: column;
    flex: 1 0 auto;
    display: flex;
    & .wrap-nav {
      overflow: auto;
      overflow-x: hidden;
      backface-visibility: hidden;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }
      .nav-menu {
        padding: 0;
        list-style: none;
        margin: 0;
        &:first-of-type {
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        &:last-of-type {
          margin-bottom: 3rem;
        }
        & a,
        & a > i {
          /* transition: all 0.3s ease-out; */
        }
        & ul {
          padding-left: 0;
          list-style: none;
          display: none;
        }
        & li {
          position: relative;
          & > ul {
            background-color: rgba(0, 0, 0, 0.1);
            padding-top: 10px;
            padding-bottom: 10px;
            & li a {
              color: #af9fc7;
              padding: 0.8125rem 2rem 0.8125rem 3rem;
              &:hover {
                color: #fff;
                background-color: rgba(0, 0, 0, 0.1);
              }
            }
            & li.active {
              & > a {
                color: #fff;
                background-color: transparent;
                box-shadow: none;
                font-weight: 400;
              }
              &:not(.open) > a:before {
                content: '';
                position: absolute;
                top: calc(50% - 5px);
                right: 11px;
                font-size: 7px;
                height: 10px;
                width: 10px;
                border-radius: 100%;
                background: #24b3a4;
                display: flex;
                align-content: center;
                align-items: center;
              }
            }
          }
          & a {
            position: relative;
            display: flex;
            align-items: center;
            outline: 0;
            padding: 0.8125rem 1rem;
            font-size: 0.875rem;
            color: #bdafd1 !important;
            font-weight: 400;
            text-decoration: none;
            & > .nav-link-text {
              flex: 1;
              display: inline-flex;
              align-items: center;
              line-height: normal;
            }
            & > i {
              margin-right: 0.25rem;
              font-size: 1.125rem;
              width: 1.75rem;
              color: #876fab;
            }
            &:hover {
              color: #fff;
              text-decoration: none;
              background-color: rgba(0, 0, 0, 0.1);
            }
          }
          &.active {
            & > a {
              color: #fff;
              background-color: rgba(255, 255, 255, 0.04);
              box-shadow: inset 5px 0 0 #886ab5;
            }
          }
          &.open {
            & > ul {
              display: block;
            }
            & > a {
              color: #fff;
            }
          }
        }
        & > li > a {
          font-size: 0.875rem;
        }
        & b.collapse-sign {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #967bbd;
          font-weight: bolder;
        }
      }
    }
  }
`;

export default StyledAdminMenu;
