import styled from 'styled-components';
import iconTabs from '../../images/icon-tabs.png';

const Styled = styled.div`
  .affix-container {
    // background-color: #ffffff;
  }

  .title {
    background-color: #ffffff;
    padding-top: 0.5em;
  }

  ul.react-tabs__tab-list {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    // nav-tabs Option
    // Clean Option
    height: 32px;
    background-color: #939393;

    li.react-tabs__tab {
      margin-bottom: -1px;
      display: block;
      padding: 0.5rem 3.73rem;
      height: 32px;
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 15px;
      cursor: pointer;
      color: #fff;
      border-left: 1px solid #777;
      border-top: 1px solid #939393;
      &:last-child {
        border-right: 1px solid #777;
      }
      &.react-tabs__tab--selected {
        background-color: #fff;
        color: #000000;
        border-left: 0;
        border-right: 0;

        &:not(:hover) {
          color: #333;
        }
      }
    }

    i {
      background: url(${iconTabs}) no-repeat center;
      display: inline-block;
      width: 40px;
      height: 32px;
    }
  }

  div.react-tabs__tab-panel.react-tabs__tab-panel--selected {
    /* padding: 1rem !important; */
  }
`;

export default Styled;
